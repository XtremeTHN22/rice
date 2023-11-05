#!/bin/bash

while inotifywait --recursive --event modify ~/.config/ags --exclude ~/.config/ags/.git; do
    echo "Reloading ags"
    pkill ags &
    echo $?
    ags &
    echo $?
done