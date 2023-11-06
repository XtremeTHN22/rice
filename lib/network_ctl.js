import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { Widget, Network } from '../imports.js';

const GenericControlCenterButton = (icon_bind, label_bind) => {
    return Widget.Button({
        child: Widget.Box({
            className: 'network-ctl',
            spacing: 10,
            children: [
                Widget.Icon({
                    size: 16,
                    binds: icon_bind,
                }),
                Widget.Label({binds:[['label', Network.wifi, 'ssid']]}),
            ],
        })
    })
}

export const NetworkCtl = () => {
    if (Network.primary === "wifi") {
        return GenericControlCenterButton([['icon', Network.wifi, 'icon-name']], [['label', Network.wifi, 'ssid']])
    } else if (Network.primary === "wired") {
        return GenericControlCenterButton([['icon', Network.wired, 'icon-name']], [['label', Network.wired, 'internet']])
    }
}