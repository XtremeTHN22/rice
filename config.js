import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { ControlCenter } from './src/control_center.js'
import { Bar } from './src/bar.js';
import { toggleWindow } from './src/misc.js';
import { MusicCtl } from './src/lib/music_ctl.js';
import { PopupNotifications } from './src/lib/notifications.js';

export default {
    style: App.configDir + '/src' + '/styles' + '/style.css',
    stackTraceOnError: true,
    notificationPopupTimeout: 5000,
    windows: [
        // NOTE: the window will still render if you don't pass it here,
        // but if you don't, the window can't be toggled through App or cli
        Bar(),
        ControlCenter(),
        MusicCtl(),
        PopupNotifications(),
        // NotificationsPopupWindow(),
    ],
};

toggleWindow('ctl_center')
toggleWindow('music-ctl')