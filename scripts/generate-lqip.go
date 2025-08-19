package main

import (
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"log"
	"math"
	"os"
	"path/filepath"

	"strings"

	"golang.org/x/image/webp"
	"gopkg.in/yaml.v3"
)

// LQIP represents the low-quality image placeholder data
type LQIP struct {
	Value int `yaml:"value"`
}

// LQIPData holds all LQIP values keyed by relative path
type LQIPData map[string]LQIP

func main() {
	// Change to project root if we're in the scripts directory
	if _, err := os.Stat("scripts"); err == nil {
		// We're in project root
	} else if _, err := os.Stat("../assets"); err == nil {
		// We're in scripts directory, go up one level
		os.Chdir("..")
	}

	mediaDir := "assets/media"
	outputFile := "data/lqip.yaml"

	lqipData := make(LQIPData)

	err := filepath.Walk(mediaDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		// Only process image files
		ext := strings.ToLower(filepath.Ext(path))
		if !isImageFile(ext) {
			return nil
		}

		relPath := strings.TrimPrefix(path, "assets/")
		fmt.Printf("Processing: %s\n", relPath)

		lqipValue, err := generateLQIP(path)
		if err != nil {
			log.Printf("Error processing %s: %v\n", path, err)
			return nil // Continue processing other files
		}

		lqipData[relPath] = LQIP{Value: lqipValue}
		return nil
	})

	if err != nil {
		log.Fatalf("Error walking directory: %v", err)
	}

	// Write YAML file
	yamlData, err := yaml.Marshal(lqipData)
	if err != nil {
		log.Fatalf("Error marshaling YAML: %v", err)
	}

	err = os.WriteFile(outputFile, yamlData, 0644)
	if err != nil {
		log.Fatalf("Error writing YAML file: %v", err)
	}

	fmt.Printf("Generated LQIP data for %d images in %s\n", len(lqipData), outputFile)
}

func isImageFile(ext string) bool {
	imageExts := []string{".jpg", ".jpeg", ".png", ".webp"}
	for _, validExt := range imageExts {
		if ext == validExt {
			return true
		}
	}
	return false
}

func generateLQIP(imagePath string) (int, error) {
	file, err := os.Open(imagePath)
	if err != nil {
		return 0, err
	}
	defer file.Close()

	var img image.Image
	ext := strings.ToLower(filepath.Ext(imagePath))

	switch ext {
	case ".jpg", ".jpeg":
		img, err = jpeg.Decode(file)
	case ".png":
		img, err = png.Decode(file)
	case ".webp":
		img, err = webp.Decode(file)
	default:
		return 0, fmt.Errorf("unsupported image format: %s", ext)
	}

	if err != nil {
		return 0, err
	}

	return encodeLQIP(img), nil
}

func encodeLQIP(img image.Image) int {
	// Downsample to 3x2 grid
	bounds := img.Bounds()
	width, height := bounds.Dx(), bounds.Dy()

	const gridW, gridH = 3, 2
	grays := make([]float64, gridW*gridH)
	var sumR, sumG, sumB, count float64

	for y := 0; y < gridH; y++ {
		for x := 0; x < gridW; x++ {
			// Sample pixel from corresponding region
			px := int(float64(x) * float64(width) / float64(gridW))
			py := int(float64(y) * float64(height) / float64(gridH))

			r, g, b, a := img.At(px, py).RGBA()
			// Convert from 16-bit to 8-bit
			r8, g8, b8, a8 := r>>8, g>>8, b>>8, a>>8

			alpha := float64(a8) / 255.0
			sumR += float64(r8) * alpha
			sumG += float64(g8) * alpha
			sumB += float64(b8) * alpha
			count += alpha

			// Compute perceived luminance using Rec.709 luma
			lr := srgbToLinear(float64(r8))
			lg := srgbToLinear(float64(g8))
			lb := srgbToLinear(float64(b8))
			Y := 0.2126*lr + 0.7152*lg + 0.0722*lb

			grays[y*gridW+x] = Y
		}
	}

	if count == 0 {
		sumR, sumG, sumB, count = 128, 128, 128, 1
	}
	avgR := sumR / count
	avgG := sumG / count
	avgB := sumB / count

	// Convert average color to Oklab
	lr := srgbToLinear(avgR)
	lg := srgbToLinear(avgG)
	lb := srgbToLinear(avgB)
	x, y, z := linearToXYZ(lr, lg, lb)
	L, a, b := xyzToOklab(x, y, z)

	// Quantize base color
	ll := clamp(int(math.Round(((L-0.2)/0.6)*3)), 0, 3)
	aaa := clamp(int(math.Round(((a+0.35)/0.7)*8)), 0, 7)
	bbb := clamp(int(math.Round((8*(b+0.35))/0.7-1)), 0, 7)

	// Quantize grayscale cells
	var ca, cb, cc, cd, ce, cf int
	ca = clamp(int(math.Round(grays[0]*3)), 0, 3)
	cb = clamp(int(math.Round(grays[1]*3)), 0, 3)
	cc = clamp(int(math.Round(grays[2]*3)), 0, 3)
	cd = clamp(int(math.Round(grays[3]*3)), 0, 3)
	ce = clamp(int(math.Round(grays[4]*3)), 0, 3)
	cf = clamp(int(math.Round(grays[5]*3)), 0, 3)

	// Pack bits according to the spec
	packed := (ca << 18) | (cb << 16) | (cc << 14) | (cd << 12) | (ce << 10) | (cf << 8) | (ll << 6) | (aaa << 3) | bbb

	// Return CSS value (packed - 2^19)
	return packed - (1 << 19)
}

func clamp(v, min, max int) int {
	if v < min {
		return min
	}
	if v > max {
		return max
	}
	return v
}

func srgbToLinear(v float64) float64 {
	v = v / 255.0
	if v <= 0.04045 {
		return v / 12.92
	}
	return math.Pow((v+0.055)/1.055, 2.4)
}

func linearToXYZ(r, g, b float64) (float64, float64, float64) {
	// sRGB -> XYZ matrix (D65)
	x := 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
	y := 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
	z := 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
	return x, y, z
}

func xyzToOklab(x, y, z float64) (float64, float64, float64) {
	// XYZ -> Oklab conversion
	l := math.Cbrt(0.8189330101*x + 0.3618667424*y - 0.1288597137*z)
	m := math.Cbrt(0.0329845436*x + 0.9293118715*y + 0.0361456387*z)
	s := math.Cbrt(0.0482003018*x + 0.2643662691*y + 0.6338517070*z)

	L := 0.2104542553*l + 0.7936177850*m - 0.0040720468*s
	a := 1.9779984951*l - 2.4285922050*m + 0.4505937099*s
	b := 0.0259040371*l + 0.7827717662*m - 0.8086757660*s

	return L, a, b
}