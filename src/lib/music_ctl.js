import * as Misc from '../misc.js';
import { Mpris, Widget } from "../imports.js"
import { Utils } from '../imports.js';

export const MusicStatus = () => {
    return Widget.EventBox({
        className: 'music-status',
        onPrimaryClick: () => Utils.execAsync("ags -t music-ctl"),
        child: Widget.Label({className: 'music-status-label',}),
        visible: false,
        connections: [[Mpris, self => {
            const player = Mpris.players[0];
            self.visible = player;
            print(player)
            if (!player)
                return;
    
            const { trackArtists, trackTitle } = player;
            let name = `${trackArtists.join(', ')} - ${trackTitle}`
            if (name == "")
                self.child.label = "Play some music!"
            else
                self.child.label = `  ${Misc.truncateMusicName(name, 15, 15)}  `
        }]],
    });
}

const truncatePlayerName = (name) => {
    let array = name.split(".")
    let real_length = array.length - 1
    return array[real_length].charAt(0).toUpperCase() + array[real_length].slice(1)
}

const MusicInfo = () => {
    return Widget.Box({
        className: 'music-ctl-info',
        vertical: true,
        spacing: 6,
        children: [
            Widget.Label({
                xalign: 0,
                className: 'music-ctl-info-title',
                connections: [[Mpris, self => {
                    const { trackTitle } = Mpris.players[0];
                    if (trackTitle.length < 15) {
                        self.toggleClassName('truncated', true)
                    }
                    self.label = trackTitle
                }]]
            }),
            Widget.Label({
                xalign: 0,
                className: 'music-ctl-info-artist',
                connections: [[Mpris, self => {
                    const { trackArtists } = Mpris.players[0];
                    self.label = trackArtists.join(', ')
                }]]
            }),
        ],
    })
}

const MusicControllers = () => {
    return Widget.Box({
        className:"music-ctl-controller",
        vertical: true,
        children: [
            Widget.CenterBox({
                class_name: "music-ctl-controller-box",
                spacing: 2,
                center_widget: Widget.Box({
                    children: [
                        Widget.Button({
                            className: "music-ctl-controller-button",
                            onPrimaryClick: () => Mpris.players[0]?.previous(),
                            child: Widget.Icon({icon: "media-seek-backward-symbolic", size: 10}),
                        }),
                        Widget.Button({
                            className: "music-ctl-controller-button",
                            onPrimaryClick: () => Mpris.players[0]?.playPause(),
                            child: Widget.Icon({icon: "media-playback-pause-symbolic", size: 10}),
                        }),
                        Widget.Button({
                            className: "music-ctl-controller-button",
                            onPrimaryClick: () => Mpris.players[0]?.next(),
                            child: Widget.Icon({icon: "media-seek-forward-symbolic", size: 10}),
                        })
                    ]
                }),
            }),
            Widget.Slider({
                className: 'music-ctl-position-slider',
                drawValue: false,
                onChange: ({ value }) => {
                    if (!Mpris.players[0])
                        return;
                    const player = Mpris.players[0];
                    player.position = player.length * value;
                },
                properties: [['update', slider => {
                    if (slider.dragging)
                        return;
                    const player = Mpris.players;
                    slider.visible = player.length > 0;
                    if (player.length > 0)
                        slider.value = player[0].position / player[0].length;
                }]],
                connections: [
                    [Mpris.players[0], s => s._update(s)],
                    [Mpris.players[0], s => s._update(s), 'position'],
                    [1000, s => s._update(s)],
                ],
            }),
        ]
    })
}

export const MusicCtl = () => {
    print(Mpris.instance)
    return Widget.Window({
        name: 'music-ctl',
        anchor: ['top'],
        layer: 'top',
        className: 'music-ctl-window',
        // focusable: true,
        // popup: true,
        child: Widget.Box({
            className: 'music-ctl-box',
            spacing: 10,
            vertical: true,
            children: [
                MusicInfo(),
                MusicControllers(),
            ],
            connections: [[Mpris, self => {
                const player = Mpris.players[0];
                if (!player)
                    return;
                self.style = `background-image: url('${player.coverPath}'); background-size: cover; border-radius: 10px;`;
            }]]
        }),
    })
}