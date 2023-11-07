import { Widget } from './imports.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { toTitle, Separator } from './misc.js';
import { NetworkCtl } from './lib/network_ctl.js';

import { SystemTray } from './imports.js';
import { NotificationList } from './lib/notifications.js';

const QButton = (icon, label, connect_func) => {
    let toggledLabel = Widget.Label({
        label: "",
        use_markup: true,
    })

    let btt = Widget.Button({
        class_name: 'control-center-button',
        child: Widget.CenterBox({
            center_widget: Widget.Box({
                spacing: 8,
                children: [
                    Widget.Icon({
                        icon: icon,
                        size: 16,
                    }),
                    Widget.Label({
                        label: label,
                        use_markup: true,
                    }),
                    toggledLabel,
                ]
            }),
        })
    })

    if (connect_func) {
        connect_func(toggledLabel)
    }
    return btt
}

const QButtonBox = (vertical, widgets) => {
    return Widget.Box({
        class_name: 'ags-control-buttons',
        vertical: vertical,
        spacing: 8,
        homogeneous: true,
        children: widgets
    })
}

const QuickSettingsButtons = () => {
    return Widget.Box({
        class_name: 'ags-control-buttons-box',
        vertical: true,
        spacing: 8,
        children: [
            
           QButtonBox(false, [NetworkCtl(),QButton("bluetooth-active-symbolic", "Bluetooth")]),
           QButtonBox(false, [QButton("audio-volume-high-symbolic", "Audio")]),
        ]
    })
}

const SysTrayItem = item => Widget.Button({
    child: Widget.Icon({ binds: [['icon', item, 'icon']] }),
    binds: [['tooltip-markup', item, 'tooltip-markup']],
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

const SysTray = () => Widget.Box({
    vertical:true,
    children: [
        Widget.Label({
            label: "Programs and Services:",
            xalign: 0,
        }),
        Widget.Box({
            spacing: 5,
            binds: [['children', SystemTray, 'items', i => i.map(SysTrayItem)]],
        }),
    ]
})

const ControlCenterContent = () => {
    return Widget.Box({
        class_name: 'control-center-box',
        spacing: 10,
        vertical: true,
        valign: 'fill',
        children: [
            Widget.Box({
                class_name: 'control-center-box-top',
                vertical: true,
                spacing: 10,
                children: [
                    QuickSettingsButtons(),
                    SysTray(),
                ]
            }),
            NotificationList('control-center-box-center'),
            Separator(),
        ]
    })
}

export const ControlCenter = () => Widget.Window({
    name: 'ctl_center',
    class_name: 'control-center-window',
    focusable: true,
    popup: true,
    anchor: ['top', 'right', 'bottom'],
    // @ts-ignore
    margin: [5, 5, 5, 5],
    child: Widget.Box({
        class_name: 'topbar-box',
        children: [
            ControlCenterContent(),
        ],
    })
})



