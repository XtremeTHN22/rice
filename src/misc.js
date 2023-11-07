import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

export const toTitle = (str) => {
    return str.split('')[0].toUpperCase() + str.slice(1);
}

export const Separator = (...extra) => {
    return Widget.Box({...extra,hexpand: true, })
}

export const toggleWindow = (name) => {
    return Utils.execAsync(`ags -t ${name}`)
}

export const truncateMusicName = (str, max_length_left, max_length_right) => {
    print(str)
    let nose = str.split('-').map(str => str.trim());
    if (nose[1] || nose[2] === undefined)
        return nose.join(' ');
    if (nose[1].length > max_length_left)
        nose[1] = nose[1].substring(0, max_length_left) + '...';
    
    if (nose[2].length > max_length_right)
        print("if reached")
        nose[2] = nose[2].substring(0, max_length_right) + '...';
    return nose.join(' - ');
}

export const truncateTitle = (str) => {
    let lastDash = -1;
    let found = -1; // 0: em dash, 1: en dash, 2: minus, 3: vertical bar, 4: middle dot
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === '—') {
            found = 0;
            lastDash = i;
        }
        else if (str[i] === '–' && found < 1) {
            found = 1;
            lastDash = i;
        }
        else if (str[i] === '-' && found < 2) {
            found = 2;
            lastDash = i;
        }
        else if (str[i] === '|' && found < 3) {
            found = 3;
            lastDash = i;
        }
        else if (str[i] === '·' && found < 4) {
            found = 4;
            lastDash = i;
        }
    }
    if (lastDash === -1) return str;
    return str.substring(0, lastDash);
}

export const truncateWindowName = (str, len) => {
    if (str.length > len)
        return str.substring(0, len) + '...';
    else
        return str
}