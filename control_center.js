import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { toTitle, Separator } from './utilities.js';
import { CButton } from './lib/control_buttons.js';

// const greetingMsg = () => {
//     return ["How are you today?", "Ready to watch ur notifications?", "Renember to do all your homework!"][Math.floor(Math.random() * 3)];
// }

// const USER = toTitle(exec('whoami').trim());

// const Header = () => {
//     let msg = greetingMsg()
//     return Widget.CenterBox({
//         className: 'ags-centerbox-header',
//         vertical: false,
//         spacing: 150 + msg.length,
//         startWidget: 
//             Widget.Box({
//                 className: 'ags-header',
//                 vexpand: true,
//                 vertical: true,
//                 children: 
//                     [
//                         Widget.Box({
//                             children: [
//                                 Widget.Label({
//                                     label: `<span size="larger"><b>Hi ${USER}!</b></span>`,
//                                     useMarkup: true,
//                                     justification: "left",
//                                     wrap: true,
//                                 })
//                             ]
//                         }),
//                         Widget.Label(
//                             { maxWidthChars: 33, label: `<span size='smaller'>${msg}</span>`, useMarkup: true }
//                         )
//                     ],
//             }),
//         endWidget: Widget.Box({
            
//         }) 
//         // Widget.Icon({
//         //     icon: "user-available-symbolic",
//         //     size: 32,
//         // })
//     })
// }

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
            
           CButtonBox(false, [CButton("network-wireless-symbolic", "Internet"),CButton("bluetooth-active-symbolic", "Bluetooth")]),
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

