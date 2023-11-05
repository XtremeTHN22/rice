import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { ControlCenter } from './control_center.js'
import { Bar } from './bar.js';
import { toggleWindow } from './utilities.js';

// const window = Widget.Window({
//     name: 'example',
//     layer: 'top',
//     className: 'ags-window',
//     child: Widget.Box({
//         children: [
//             ControlCenter(),
//         ],
//     }),
// })

const bar_window = Widget.Window({
    name: 'topbar',
    layer: 'top',
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

export default {
    style: App.configDir + '/styles' + '/style.css',
    stackTraceOnError: true,
    windows: [
        // NOTE: the window will still render if you don't pass it here,
        // but if you don't, the window can't be toggled through App or cli
        bar_window,
        ctl_center
    ],
};

toggleWindow('ctl_center')

// subprocess([
//     'inotifywait',
//     '--recursive',
//     '--event', 'create,modify',
//     '-m', App.configDir + '/scss',
// ], () => {
//     const scss = App.configDir + '/style.scss';
//     const css = App.configDir + '/style.css';
//     exec(`sassc ${scss} ${css}`);
//     App.resetCss();
//     App.applyCss(`${tmp}/style.css`);
// });