// Unused

import { Widget } from 'resource:///com/github/Aylur/ags/widget.js';
imports.gi.versions.Gtk = "4.0";
const { Gtk } = imports.gi;

const draw = (self, cr) => {
    const color = self.get_style_context().get_property('background-color', Gtk.StateFlags.NORMAL)
    const size = self.get_style_context().get_property('border-radius', Gtk.StateFlags.NORMAL)
    cr.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
    cr.closePath()
    cr.setSourceRGBA(color.red, color.green, color.blue, color.alpha)
    cr.fill()
}

export const Circle = (classname, ...props) => Widget({
    ...props,
    className: classname,
    type: Gtk.DrawingArea,
    setup: (widget) => {
        widget.connect('draw', draw.bind(widget))
    }
})