import { Widget } from 'resource:///com/github/Aylur/ags/widget.js';
import { App } from 'resource:///com/github/Aylur/ags/app.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

import { Separator, toggleWindow } from './utilities.js';

imports.gi.versions.Gtk = "4.0";
const { Gtk } = imports.gi;

// ALL CLASSNAMES
// topbar-left-widgets
// topbar-center-widgets
// topbar-right-widgets


// export const focusedTitle = () => Widget.Label({
//     className: 'ags-title',
//     binds: [
//         ['label', Hyprland.active.client, 'title'],
//         ['visible', Hyprland.active.client, 'address', addr => !!addr],
//     ],
// });

function truncateTitle(str) {
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

const truncateWindowName = (str, len) => {
    if (str.length > len)
        return str.substring(0, len) + '...';
    else
        return str
}

const truncateMusicName = (str, max_length_left, max_length_right) => {
    print(str)
    let nose = truncateTitle(str).split('-').map(str => str.trim());
    if (nose[1] || nose[2] === undefined)
        return nose.join(' ');
    if (nose.length === 1)
        return "Play some music!"
    if (nose[1].length > max_length_left)
        nose[1] = nose[1].substring(0, max_length_left) + '...';
    
    if (nose[2].length > max_length_right)
        print("if reached")
        nose[2] = nose[2].substring(0, max_length_right) + '...';
    return nose.join(' - ');
}

const Logo = () => {
    return Widget.Icon({
        icon: "archlinux-logo",
        size: 30,
    })
}

const WindowName = () => {
    // return Widget.Label({
    //     xalign: 0,
    //     connections: [[Hyprland, label => { // Hyprland.active.client
    //         label.label = Hyprland.active.client._class.length === 0 ? 'Desktop' : Hyprland.active.client._class;
    //     }]],
    // })

    // From: https://github.com/end-4/dots-hyprland/blob/illogical-impulse/.config/ags/windows/bar/leftspace.js
    return Widget.Scrollable({
        hscroll: 'never', vscroll: 'never',
        child: Widget.Box({
            vertical: true,
            children: [
                Widget.Label({
                    xalign: 0,
                    useMarkup: true,
                    connections: [[Hyprland, label => { // Hyprland.active.client
                        label.label = `<span size="small">${Hyprland.active.client._class.length === 0 ? 'Desktop' : Hyprland.active.client._class}</span>`
                    }]],
                }),
                Widget.Label({
                    xalign: 0,
                    className: 'window-name',
                    connections: [
                        [Hyprland, label => { // Hyprland.active.client
                            label.label = truncateWindowName(Hyprland.active.client._title.length === 0 ? `Workspace ${Hyprland.active.workspace.id}` : truncateTitle(Hyprland.active.client._title), 26)
                        }]
                    ],
                })
            ]
        })
    })

}

const dispatch = ws => Utils.execAsync(`hyprctl dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        className: 'topbar-workspaces',
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            className: 'topbar-workspace-button',
            setup: btn => btn.id = i,
            label: `${i}`,
            onClicked: () => dispatch(i),
        })),

        // remove this connection if you want fixed number of buttons
        connections: [[Hyprland, box => box.children.forEach(btn => {
            btn.visible = Hyprland.workspaces.some(ws => ws.id === btn.id);
        })]],
    }),
});

const MusicCtl = () => {
    return Widget.EventBox({
        className: 'music-ctl',
        onPrimaryClick: () => Mpris.players[0]?.playPause(),
        child: Widget.Label({className: 'music-ctl-label',}),
        visible: false,
        connections: [[Mpris, self => {
            const player = Mpris.players[0];
            self.visible = player;
            print(player)
            if (!player)
                return;
    
            const { trackArtists, trackTitle } = player;
            self.child.label = `  ${truncateMusicName(`${trackArtists.join(', ')} - ${trackTitle}`, 15, 15)}  `
        }]],
    });
}

const Clock = () => {
    return Widget.Button({
        className: 'clock',
        child: Widget.Label(""),
        connections: [[5000, self => {
            Utils.execAsync([`date`, "+%D, %I:%M"]).then(dateString => {
                self.child.label = dateString;
            }).catch(print);
        }]],
    })
}

const LeftWidgets = () => {
    return Widget.Box({
        className: 'topbar-left-widgets',
        spacing: 10,
        children: [
            WindowName(),
            Workspaces(),
        ]
    })
}

const CenterWidgets = () => {
    return Widget.Box({
        className: 'topbar-center-widgets',
        spacing: 10,
        children: [
            MusicCtl(),
        ]
    })
}

const RightWidgets = () => {
    return Widget.Box({
        className: 'topbar-control-buttons',
        hexpand: true,
        spacing: 10,
        children: [
            Separator(),
            Clock(),
            Widget.Button({
                className: "topbar-control-buttons-toggler",
                onPrimaryClickRelease: () => {
                    toggleWindow("ctl_center")
                },
                child: Widget.Box({
                    spacing: 10,
                    children: [
                        Widget.Icon({icon: "network-wireless-symbolic", size: 10}),
                        Widget.Icon({icon: "bluetooth-active-symbolic", size: 10}),
                        Widget.Icon({icon: "audio-volume-high-symbolic", size: 10}),
                    ],
                })
            }),
        ]
    })
}

export const Bar = () => {
    return Widget.CenterBox({
        className: 'topbar-centerbox',
        homogeneous: true,
        vertical: false,
        hexpand: true,
        halign: 'fill',
        startWidget: LeftWidgets(),
        centerWidget: CenterWidgets(),
        endWidget: RightWidgets(),

        // setup: (self) => {
        //     const styleContext = self.get_style_context();
        //     const minHeight = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL);
        //     // execAsync(['bash', '-c', `hyprctl keyword monitor ,addreserved,${minHeight},0,0,0`]).catch(print);
        // }

    })
}