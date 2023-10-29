import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { subprocess, exec } from 'resource:///com/github/Aylur/ags/utils.js'
import ControlCenter from './widgets/control_center.js'



const window = Widget.Window({
    name: 'example',
    className: 'ags-window',
    child: ControlCenter(),
})

export default {
    style: App.configDir + '/style.css',
    windows: [
        // NOTE: the window will still render, if you don't pass it here
        // but if you don't, the window can't be toggled through App or cli
    ],
};

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