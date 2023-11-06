import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { toTitle, Separator } from './misc.js';
import { NetworkCtl } from './lib/network_ctl.js';

const CButton = (icon, label, connect_func) => {
    let toggledLabel = Widget.Label({
        label: "",
        useMarkup: true,
    })

    let btt = Widget.Button({
        child: Widget.CenterBox({
            centerWidget: Widget.Box({
                spacing: 8,
                children: [
                    Widget.Icon({
                        icon: icon,
                        size: 16,
                    }),
                    Widget.Label({
                        label: label,
                        useMarkup: true,
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

const CButtonBox = (vertical, widgets) => {
    return Widget.Box({
        className: 'ags-control-buttons',
        vexpand: true,
        vertical: vertical,
        spacing: 8,
        homogeneous: true,
        children: widgets
    })
}

const ControlButtons = () => {
    return Widget.Box({
        className: 'ags-control-buttons-box',
        vertical: true,
        vexpand: true,
        homogeneous: true,
        spacing: 8,
        children: [
            
           NetworkCtl(),CButton("bluetooth-active-symbolic", "Bluetooth"),
           CButtonBox(false, [CButton("audio-volume-high-symbolic", "Audio")]),
        ]
    })
}

export const ControlCenter = () => {
    return Widget.CenterBox({
        className: 'control-center-box',
        spacing: 10,
        vertical: true,
        startWidget: ControlButtons(),
        centerWidget: Separator(),
    })
}

