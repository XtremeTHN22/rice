import Widget from 'resource:///com/github/Aylur/ags/widget.js'

export const CButton = (icon, label, connect_func) => {
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