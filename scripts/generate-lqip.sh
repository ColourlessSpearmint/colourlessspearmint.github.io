#!/bin/bash

# Script to generate LQIP values for all images in the media directory

set -e

echo "Generating LQIP values for images..."

# Change to the scripts directory
cd "$(dirname "$0")"

# Initialize Go module if go.sum doesn't exist
if [ ! -f "go.sum" ]; then
    echo "Initializing Go dependencies..."
    go mod tidy
fi

# Run the LQIP generator
echo "Running LQIP generator..."
go run generate-lqip.go

echo "LQIP generation complete!"
echo "The generated data has been saved to data/lqip.yaml"
echo "You can now build your Hugo site to see the image placeholders in action."