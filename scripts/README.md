# LQIP (Low Quality Image Placeholder) Implementation

This directory contains the implementation of blobhash-style image placeholders for the Hugo site. The system generates tiny, CSS-only image previews that display while full images are loading.

## Overview

The LQIP system consists of three parts:

1. **Go script** (`generate-lqip.go`) - Analyzes images and generates 20-bit LQIP values
2. **Hugo template** (`layouts/_default/_markup/render-image.html`) - Embeds LQIP values in image elements
3. **CSS decoder** (`static/classlessspearmint.css`) - Renders the LQIP as background gradients

## How it works

Each LQIP encodes a 3×2 grid of grayscale values plus a base color in just 20 bits:
- 6 grayscale components (2 bits each) = 12 bits
- Base color in Oklab space (L=2 bits, a=3 bits, b=3 bits) = 8 bits
- Total: 20 bits packed into a single integer

The CSS decoder unpacks these bits using `calc()`, `mod()`, and `round()` functions and renders the preview using stacked radial gradients.

## Usage

### Generating LQIP data

Run the generator script to process all images in `assets/media/`:

```bash
cd scripts
./generate-lqip.sh
```

Or run the Go program directly:

```bash
cd scripts
go run generate-lqip.go
```

This creates/updates `data/lqip.yaml` with LQIP values for all supported image formats (JPEG, PNG, WebP).

### Hugo integration

The LQIP system works automatically with Hugo's image rendering. When you use markdown image syntax:

```markdown
![Alt text](~/image.webp "Caption")
```

The render-image hook will:
1. Look up the LQIP value in `data/lqip.yaml`
2. Add it as a CSS custom property: `style="--lqip: -123456"`
3. Include background sizing properties for proper display

### CSS rendering

The CSS in `classlessspearmint.css` automatically detects elements with `--lqip` properties and:
1. Decodes the 20-bit integer into color components
2. Creates 6 radial gradients positioned in a 3×2 grid
3. Applies a base color background
4. Displays this as the element's background until the image loads

## File structure

```
scripts/
├── README.md              # This file
├── generate-lqip.go       # Go program to generate LQIP values
├── generate-lqip.sh       # Shell script wrapper
├── go.mod                 # Go module definition
└── go.sum                 # Go module checksums

data/
└── lqip.yaml             # Generated LQIP values (auto-generated)

layouts/_default/_markup/
└── render-image.html     # Hugo template with LQIP integration

static/
└── classlessspearmint.css # CSS with LQIP decoder and renderer
```

## Dependencies

The Go script requires:
- Go 1.21+
- `golang.org/x/image` (for WebP support)
- `gopkg.in/yaml.v3` (for YAML output)

Dependencies are automatically downloaded when running `go mod tidy`.

## Supported formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

Other formats (SVG, GIF, videos) are ignored and won't have LQIP placeholders.

## Performance

- **Generation**: Processing ~70 images takes about 15 seconds
- **Runtime**: Zero JavaScript overhead, pure CSS rendering
- **Size**: Each LQIP adds only one CSS custom property per image
- **Quality**: Very low fidelity but provides visual continuity during loading

## Regenerating LQIP data

Re-run the generator script whenever you:
- Add new images to `assets/media/`
- Modify existing images
- Want to update the LQIP values

The script will process all images and update the YAML file. Hugo will pick up the changes on the next build.

## Technical details

The implementation follows the blobhash specification from [Leanrada](https://leanrada.com/notes/css-only-lqip/):

- Uses Oklab color space for better perceptual accuracy
- Packs bits according to the specified layout
- Applies the +2^19 offset for CSS compatibility
- Uses bilinear-approximated radial gradients for smooth rendering

## Troubleshooting

**"No such file or directory" error**: Make sure you're running the script from the correct directory. The Go program automatically detects whether it's run from the project root or scripts directory.

**Import errors**: Run `go mod tidy` to download dependencies.

**Images not showing placeholders**: Check that:
1. The image path exists in `data/lqip.yaml`
2. The image is referenced correctly in markdown (`~/image.webp`)
3. The CSS includes the LQIP styles
4. The browser supports the CSS functions used (`mod()`, `round()`, `pow()`)

**Corrupted image errors**: Some images may fail to process (like corrupted WebP files). The script continues processing other images and logs errors for problematic files.