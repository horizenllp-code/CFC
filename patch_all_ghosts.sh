#!/bin/bash
set -e

# Step 1: Extract clean 530x941 slice centered at the bulb
# Central bulb is at x=685, y=434. Crop 530x941 from x=420 to 950.
convert public/assets/images/cfc_supply_chain_interactive.png -crop 530x941+420+0 +repage /tmp/crop_base.png

# Step 2: Extract clean donor patches from the full 1672x941 image:
# - Clean roof/ceiling donor from x=590..670, y=140..220 (away from transport icon)
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+600+140 +repage /tmp/donor_ceiling.png

# - Clean floor donor from x=600..680, y=740..820 (away from operations icon)
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+600+740 +repage /tmp/donor_floor.png

# - Clean upper-right rack from x=1050..1130, y=260..340 (clean rack shelf)
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+1050+260 +repage /tmp/donor_rack_ur.png

# - Clean lower-right rack from x=1050..1130, y=540..620
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+1050+540 +repage /tmp/donor_rack_lr.png

# - Clean upper-left rack from x=200..280, y=260..340
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+200+260 +repage /tmp/donor_rack_ul.png

# - Clean lower-left rack from x=200..280, y=540..620
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+200+540 +repage /tmp/donor_rack_ll.png

# - Clean mid-left rack from x=280..360, y=400..480
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+280+400 +repage /tmp/donor_rack_ml.png

# - Clean mid-right rack from x=1150..1230, y=400..480
convert public/assets/images/cfc_supply_chain_interactive.png -crop 80x80+1150+400 +repage /tmp/donor_rack_mr.png

# Step 3: Composite patches with feathered circular alpha masks to flawlessly remove the ghost icons
# Create a 80x80 feathered circle mask
convert -size 80x80 xc:black -fill white -draw "circle 40,40 40,5" -blur 0x8 /tmp/feather_mask.png

# Apply mask to each donor
for donor in ceiling floor rack_ur rack_lr rack_ul rack_ll rack_ml rack_mr; do
    convert /tmp/donor_${donor}.png /tmp/feather_mask.png -alpha off -compose CopyOpacity -composite /tmp/masked_${donor}.png
done

# Step 4: Blend onto /tmp/crop_base.png
# 1. Transport ghost at crop_x = 265, crop_y = 230 -> center at 265,230 (top-left 225, 190)
convert /tmp/crop_base.png /tmp/masked_ceiling.png -geometry +225+190 -composite /tmp/step1.png

# 2. Operations ghost at crop_x = 265.5, crop_y = 663 -> top-left 225, 623
convert /tmp/step1.png /tmp/masked_floor.png -geometry +225+623 -composite /tmp/step2.png

# 3. Warehousing ghost at crop_x = 449, crop_y = 296 -> top-left 409, 256
convert /tmp/step2.png /tmp/masked_rack_ur.png -geometry +409+256 -composite /tmp/step3.png

# 4. Compliance ghost at crop_x = 424, crop_y = 574 -> top-left 384, 534
convert /tmp/step3.png /tmp/masked_rack_lr.png -geometry +384+534 -composite /tmp/step4.png

# 5. Distribution ghost at crop_x = 78, crop_y = 296 -> top-left 38, 256
convert /tmp/step4.png /tmp/masked_rack_ul.png -geometry +38+256 -composite /tmp/step5.png

# 6. Security ghost at crop_x = 98, crop_y = 588 -> top-left 58, 548
convert /tmp/step5.png /tmp/masked_rack_ll.png -geometry +58+548 -composite /tmp/step6.png

# 7. Network ghost at crop_x = 6, crop_y = 437 -> top-left -34, 397 (0, 397)
convert /tmp/step6.png /tmp/masked_rack_ml.png -geometry -34+397 -composite /tmp/step7.png

# 8. Airfreight ghost at crop_x = 516, crop_y = 428 -> top-left 476, 388
convert /tmp/step7.png /tmp/masked_rack_mr.png -geometry +476+388 -composite /tmp/step8.png

# Also let's remove the desktop connector line traces that connected to the bulb:
# The bulb itself is at 265, 434. Lines radiated out to these 8 spots.
# Let's clean the small rays around the bulb using feathered patches:
# Ceiling/bulb top: 265, 330..390
convert /tmp/step8.png -region 40x80+245+310 -blur 0x3 /tmp/step9.png
# Floor/bulb bottom: 265, 490..560
convert /tmp/step9.png -region 40x80+245+510 -blur 0x3 /tmp/step10.png

echo "All 8 ghost icons seamlessly eradicated!"
