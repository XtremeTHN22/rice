#!/bin/bash

while inotifywait --recursive --event modify ~/.config/ags; do
    echo "Reloading ags"
    pkill ags
    ags &
done