import { Widget, Notifications, Utils } from '../imports.js';

// From example file in ags official repository
const NotificationIcon = ({ appEntry, appIcon, image }) => {
    if (image) {
        return Widget.Box({
            valign: 'start',
            hexpand: false,
            className: 'icon img',
            style: `
                background-image: url("${image}");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                min-width: 78px;
                min-height: 78px;
            `,
        });
    }

    let icon = 'dialog-information-symbolic';
    if (Utils.lookUpIcon(appIcon))
        icon = appIcon;

    if (Utils.lookUpIcon(appEntry))
        icon = appEntry;

    return Widget.Box({
        valign: 'start',
        hexpand: false,
        className: 'icon',
        style: `
            min-width: 78px;
            min-height: 78px;
        `,
        children: [Widget.Icon({
            icon, size: 58,
            halign: 'center', hexpand: true,
            valign: 'center', vexpand: true,
        })],
    });
};

const Notification = n => {
    return Widget.Box({
        className: `notification-box notification-urgency-${n.urgency}`,
        // onPrimaryClick: () => n.dismiss(),
        // onHover: self => {
        //     if (self._hovered)
        //         return;
    
        //     // if there are action buttons and they are hovered
        //     // EventBox onHoverLost will fire off immediately,
        //     // so to prevent this we delay it
        //     Utils.timeout(300, () => self._hovered = true);
        // },
        // onHoverLost: self => {
        //     if (!self._hovered)
        //         return;
    
        //     self._hovered = false;
        //     n.dismiss();
        // },
        // vexpand: true, hexpand: true,
        vertical: true,
        spacing: 10,
        children: [
            Widget.Box({
                spacing: 10,
                children: [
                    NotificationIcon(n),
                    Widget.Box({
                        vertical: true,
                        children: [
                            Widget.Box({
                                spacing: 10,
                                children: [
                                    Widget.Label({
                                        className: 'notification-title',
                                        xalign: 0,
                                        justification: 'left',
                                        hexpand: true,
                                        // maxWidthChars: 24,
                                        // truncate: 'end',
                                        wrap: true,
                                        label: n.summary,
                                        useMarkup: true,
                                    }),
                                    Widget.Button({
                                        className: 'notification-close-button',
                                        valign: 'start',
                                        child: Widget.Icon('window-close-symbolic'),
                                        onClicked: n.close.bind(n),
                                    }),
                                ],
                            }),
                            Widget.Scrollable({
                                class_name: 'notification-description-box',
                                hscroll: 'never',
                                vscroll: 'automatic',
                                child: Widget.Label({
                                    className: 'notification-description-label',
                                    hexpand: true,
                                    useMarkup: true,
                                    xalign: 0,
                                    justification: 'left',
                                    label: n.body,
                                    wrap: true,
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            Widget.Box({
                className: 'notification-action',
                spacing: 10,
                children: n.actions.map(({ id, label }) => Widget.Button({
                    className: 'notification-action-button',
                    onClicked: () => n.invoke(id),
                    hexpand: true,
                    child: Widget.Label(label),
                })),
            }),
        ],
    });
}



const List = () => Widget.Box({
    vertical: true,
    spacing: 10,
    connections: [[Notifications, self => {
        self.children = Notifications.notifications.reverse().map(Notification);
        self.visible = Notifications.notifications.length > 0
    }]],
})

const Placeholder = () => Widget.Box({
    class_name: 'placeholder',
    vertical: true,
    vexpand: true,
    valign: 'center',
    children: [
        Widget.Label({label: "Inbox empty..."}),
    ],
    binds: [
        ['visible', Notifications, 'notifications', n => n.length === 0],
    ],
})



const PopupList = () => Widget.Box({
    className: 'notification-popup-box',
    vertical: true,
    spacing: 20,
    binds: [
        ['children', Notifications, 'popups',popups => popups.map(Notification)],
    ],
    connections: [
        [Notifications, self => {
            self.style = self.children.length > 0 ? 'padding: 15px' : 'padding: 1px'
        }],
    ]
});

export const NotificationList = (classname) => Widget.Scrollable({
    class_name: classname,
    hscroll: 'never',
    vexpand: true, hexpand: true,
    vscroll: 'automatic',
    child: Widget.Box({
        vertical: true,
        hexpand: true,
        vexpand: true,
        children: [
            List(),
            Placeholder(),
        ],
    })
})

export const PopupNotifications = () => Widget.Window({
    name: 'notification-popup-window',
    class_name: 'notification-popup-window',
    anchor: ['top', 'right'],
    // @ts-ignore
    // margin: [0,10,10,0],
    child: PopupList(),
});