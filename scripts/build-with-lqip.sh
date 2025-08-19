#!/bin/bash

# Complete build script for Hugo site with LQIP generation
# This script generates LQIP values for all images and builds the Hugo site

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_status "Starting Hugo build with LQIP generation..."
print_status "Project root: $PROJECT_ROOT"

# Change to project root
cd "$PROJECT_ROOT"

# Check if required directories exist
if [ ! -d "assets/media" ]; then
    print_error "assets/media directory not found!"
    print_error "Expected structure: assets/media/ with image files"
    exit 1
fi

if [ ! -d "scripts" ]; then
    print_error "scripts directory not found!"
    exit 1
fi

# Count images to process
IMAGE_COUNT=$(find assets/media -name "*.webp" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
print_status "Found $IMAGE_COUNT images to process"

if [ "$IMAGE_COUNT" -eq 0 ]; then
    print_warning "No images found in assets/media/"
    print_warning "LQIP generation will be skipped"
else
    # Generate LQIP values
    print_status "Generating LQIP values for images..."
    
    cd scripts
    
    # Initialize Go module if needed
    if [ ! -f "go.sum" ]; then
        print_status "Initializing Go dependencies..."
        go mod tidy
    fi
    
    # Run LQIP generator
    print_status "Running LQIP generator..."
    if go run generate-lqip.go; then
        print_success "LQIP generation completed successfully!"
    else
        print_error "LQIP generation failed!"
        exit 1
    fi
    
    cd "$PROJECT_ROOT"
    
    # Check if LQIP data was generated
    if [ -f "data/lqip.yaml" ]; then
        LQIP_COUNT=$(grep -c "value:" data/lqip.yaml || echo "0")
        print_success "Generated LQIP data for $LQIP_COUNT images"
    else
        print_warning "LQIP data file not found, continuing without LQIP"
    fi
fi

# Check for Hugo
if ! command -v hugo &> /dev/null; then
    print_error "Hugo is not installed or not in PATH"
    print_error "Please install Hugo: https://gohugo.io/installation/"
    exit 1
fi

# Get Hugo version
HUGO_VERSION=$(hugo version)
print_status "Using $HUGO_VERSION"

# Build Hugo site
print_status "Building Hugo site..."

# Clean previous build
if [ -d "public" ]; then
    print_status "Cleaning previous build..."
    rm -rf public/*
fi

# Build with different options based on environment
if [ "$1" = "--dev" ] || [ "$1" = "-d" ]; then
    print_status "Building in development mode..."
    hugo --buildDrafts --buildFuture
elif [ "$1" = "--minify" ] || [ "$1" = "-m" ]; then
    print_status "Building with minification..."
    hugo --minify
else
    print_status "Building for production..."
    hugo --minify --gc
fi

# Check build success
if [ $? -eq 0 ]; then
    print_success "Hugo build completed successfully!"
    
    # Show build statistics
    if [ -d "public" ]; then
        PAGE_COUNT=$(find public -name "*.html" | wc -l)
        ASSET_COUNT=$(find public -type f ! -name "*.html" | wc -l)
        TOTAL_SIZE=$(du -sh public | cut -f1)
        
        print_success "Build statistics:"
        echo "  📄 HTML pages: $PAGE_COUNT"
        echo "  📦 Assets: $ASSET_COUNT"
        echo "  💾 Total size: $TOTAL_SIZE"
        
        # Check for LQIP integration
        LQIP_IMAGES=$(grep -r "style.*--lqip" public/ | wc -l || echo "0")
        if [ "$LQIP_IMAGES" -gt 0 ]; then
            print_success "🎨 LQIP placeholders active on $LQIP_IMAGES images"
        else
            print_warning "No LQIP placeholders found in generated HTML"
        fi
    fi
else
    print_error "Hugo build failed!"
    exit 1
fi

# Optional: Start local server
if [ "$1" = "--serve" ] || [ "$1" = "-s" ]; then
    print_status "Starting Hugo development server..."
    print_status "Site will be available at: http://localhost:1313"
    print_status "Press Ctrl+C to stop the server"
    hugo server --buildDrafts --buildFuture
fi

print_success "Build process completed! 🚀"

# Show next steps
echo ""
print_status "Next steps:"
echo "  🌐 Deploy the 'public' directory to your web server"
echo "  🔍 Test LQIP functionality at: /lqip-test.html"
echo "  🔧 To serve locally: hugo server"
echo "  📝 To rebuild: $0"