import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';

const greetingMsg = () => {
    return ["How are you today?", "Ready to watch ur notifications?", "Renember to do all your tasks!"][Math.floor(Math.random() * 3)];
}

const toTitle = (str) => {
    let result = str.split('')[0].toUpperCase();
    return result + str.slice(1);
}


const USER = toTitle(exec('whoami').trim());

const Header = () => {
    return Widget.CenterBox({
        className: 'ags-centerbox-header',
        vertical: false,
        spacing: 200,
        startWidget: 
            Widget.Box({
                className: 'ags-header',
                vexpand: true,
                vertical: true,
                children: 
                    [
                        Widget.Box({
                            children: [
                                Widget.Label({
                                    label: `<span size="larger"><b>Hi ${USER}!</b></span>`,
                                    useMarkup: true,
                                    justification: "left",
                                    wrap: true,
                                })
                            ]
                        }),
                        Widget.Label(
                            { label: `<span size='smaller'>${greetingMsg()}</span>`, useMarkup: true }
                        )
                    ],
            }),
        endWidget: Widget.Icon({
            icon: "user-available-symbolic",
            size: 32,
        })
    })
}

export const ControlCenter = () => {
    return Widget.CenterBox({
        className: 'ags-control-center-box',
        vertical: true,
        startWidget: Header(),
        centerWidget: Widget.Box({
            vexpand: true,
        }),
        endWidget: Widget.Box({
            className: 'ags-control-center-footer',
            homogeneous: true,
            children: [
                Widget.Button({
                    child: Widget.CenterBox({
                        centerWidget: Widget.Box({
                                spacing: 8,
                                children: [
                                Widget.Icon({
                                    icon: "edit-clear-all-symbolic",
                                    size: 16,
                                }),
                                Widget.Label({
                                    label: 'Clear notifications',
                                    useMarkup: true,
                                })
                            ]
                        })
                    })
                }),
            ],
        }),
    })
}

