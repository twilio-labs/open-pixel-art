git config merge.pixels.name "A custom merge driver for the pixels file"
git config merge.pixels.driver "node scripts/mergePixels.js %O %A %B"