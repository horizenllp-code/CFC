#!/bin/bash
set -e

# /tmp/step10.png is 530x941 with all 8 ghost icons and lines removed!
# To make it a true 9:16 aspect ratio:
# Width: 530, Required height for 9:16: 530 * 16 / 9 = 942.222 (942px)
# Or in 1080x1920:
# Resize 530x941 with filter Lanczos to 1080x1920:
convert /tmp/step10.png -resize 1080x1920\! -quality 92 -strip public/assets/images/cfc_supply_chain_portrait_1080.png

# Also copy to src/assets/images and dist/assets/images
cp public/assets/images/cfc_supply_chain_portrait_1080.png src/assets/images/cfc_supply_chain_portrait_1080.png
mkdir -p dist/assets/images
cp public/assets/images/cfc_supply_chain_portrait_1080.png dist/assets/images/cfc_supply_chain_portrait_1080.png

echo "Clean portrait background successfully created and updated in all target folders!"
