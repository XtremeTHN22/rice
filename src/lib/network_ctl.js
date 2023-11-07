import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { toTitle } from '../misc.js';
import { Widget, Network } from '../imports.js';

const is_connected = () => {
    return Network.connectivity !== "unknown" || "none"
}

const NetworkButton = (/** @type {boolean} */ wired, /** @type {string} */ className) => {
    const net_obj = wired ? Network.wired : Network.wifi
    const label = Widget.Label({xalign:0, binds:[['label', net_obj, wired ? 'internet' : 'ssid']], class_name: className})
    return Widget.Button({
        class_name: 'control-center-button',
        child: Widget.Box({
            className: 'network-ctl-button-box',
            spacing: 8,
            children:[
                Widget.Icon({
                    size: 16,
                    binds: [['icon', net_obj, 'icon-name']],
                }),
                Widget.Box({
                    vertical: true,
                    children: [
                        Widget.Label({label:"Internet", class_name: 'network-ctl-button-label'}),
                        label,
                    ]
                })
            ]
        }),
        connections: [[Network, self => {
            self.toggleClassName('connected', is_connected())
        }]]
    })
}

export const NetworkCtl = () => {
    return NetworkButton(Network.primary === 'wired', 'network-ctl-connected')
}