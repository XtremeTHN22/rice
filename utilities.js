import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

export const toTitle = (str) => {
    return str.split('')[0].toUpperCase() + str.slice(1);
}

export const Separator = (...extra) => {
    return Widget.Box({hexpand: true, ...extra})
}

export const toggleWindow = (name) => {
    return Utils.execAsync(`ags -t ${name}`)
}