import { Widget, App, Hyprland } from "./imports.js";
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import * as Misc from './misc.js';
import { MusicStatus /*,MusicCtl*/ } from './lib/music_ctl.js';

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
    return Widget.Box({
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
                            label.label = Misc.truncateWindowName(Hyprland.active.client._title.length === 0 ? `Workspace ${Hyprland.active.workspace.id}` : Misc.truncateTitle(Hyprland.active.client._title), 26)
                        }]
                    ],
                })
            ]
        })
}

const dispatch = ws => Utils.execAsync(`hyprctl dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
    className: 'topbar-workspaces-box',
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        className: 'topbar-workspaces',
        spacing: 3,
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
            halign: 'fill',
            className: 'topbar-workspace-button',
            setup: btn => btn.id = i,
            child: Widget.Box({className: 'btt-circle',}),
            onClicked: () => dispatch(i),
        })),

        // connections: [[Hyprland, btn => {
        //     const { workspaces, active } = Hyprland;
        //     const occupied = workspaces.has(i) && workspaces.get(i).windows > 0;
        //     btn.toggleClassName('active', active.workspace.id === i);
        //     btn.toggleClassName('occupied', occupied);
        //     btn.toggleClassName('empty', !occupied);
        // }]],

        connections: [[Hyprland, box => box.children.forEach(btn => {
            const workspaces = Hyprland.workspaces;
            const current_ws = Hyprland.active.workspace.id;
            btn.visible = workspaces.some(ws => ws.id === btn.id);
            btn.child.toggleClassName('active', current_ws === btn.id);
        })]],
    }),
});



const Clock = () => {
    return Widget.Box({
        className: 'clock',
        children: [Widget.Label("")],
        connections: [[5000, self => {
            Utils.execAsync([`date`, "+%D, %I:%M"]).then(dateString => {
                self.children[0].label = dateString;
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
            MusicStatus(),
        ]
    })
}

const RightWidgets = () => {
    return Widget.Box({
        className: 'topbar-control-buttons',
        hexpand: true,
        spacing: 10,
        children: [
            Misc.Separator(),
            Clock(),
            Widget.Button({
                className: "topbar-control-buttons-toggler",
                onPrimaryClickRelease: () => {
                    Misc.toggleWindow("ctl_center")
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