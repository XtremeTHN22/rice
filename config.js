import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { ControlCenter } from './control_center.js'
import { Bar } from './bar.js';
import { toggleWindow } from './misc.js';
import { MusicCtl } from './lib/music_ctl.js';

const bar_window = Widget.Window({
    name: 'topbar',
    layer: 'top',
    margin: [5, 5, 5, 5],
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    className: 'topbar-window',
    child: Widget.Box({
        className: 'topbar-box',
        children: [
            Bar()
        ],
    })
})

const ctl_center = Widget.Window({
    name: 'ctl_center',
    className: 'control-center-window',
    focusable: true,
    popup: true,
    anchor: ['top', 'right'],
    child: Widget.Box({
        className: 'topbar-box',
        children: [
            ControlCenter(),
        ],
    })
})

const mctl = MusicCtl();

export default {
    style: App.configDir + '/styles' + '/style.css',
    stackTraceOnError: true,
    windows: [
        // NOTE: the window will still render if you don't pass it here,
        // but if you don't, the window can't be toggled through App or cli
        bar_window,
        ctl_center,
        mctl
    ],
};

toggleWindow('ctl_center')