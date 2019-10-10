git config merge.merge-pixels-driver.name "A custom merge driver for the pixels.json file"
git config merge.merge-pixels-driver.driver "node scripts/mergePixels.js %O %A %B"