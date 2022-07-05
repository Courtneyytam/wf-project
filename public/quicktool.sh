#!/bin/bash

# magick $1 -colorspace RGB +sigmoidal-contrast 11.6933 -define filter:filter=Sinc -define filter:window=Jinc -define filter:lobes=3 dd-resize 400% -sigmoidal-contrast 11.6933 -colorspace sRGB $2');
# convert $1 -resize 417x200 $2
convert $1 -resize 417x200 $1
