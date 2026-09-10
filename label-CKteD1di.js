import {
    i as s,
    t as c
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as v
} from "./react-D8T8de5F.js";
import {
    t as _
} from "./react-dom-CyvodVTt.js";
import {
    t as b
} from "./utils-BiE0AtIH.js";
import {
    it as w,
    rt as x
} from "./index-dGs9i_Jo.js";
var a = s(v(), 1),
    q = s(_(), 1),
    i = c(),
    y = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((t, e) => {
        const r = w(`Primitive.${e}`),
            o = a.forwardRef((n, d) => {
                const {
                    asChild: u,
                    ...f
                } = n, p = u ? r : e;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), (0, i.jsx)(p, { ...f,
                    ref: d
                })
            });
        return o.displayName = `Primitive.${e}`, { ...t,
            [e]: o
        }
    }, {}),
    N = "Label",
    m = a.forwardRef((t, e) => (0, i.jsx)(y.label, { ...t,
        ref: e,
        onMouseDown: r => {
            r.target.closest("button, input, select, textarea") || (t.onMouseDown ? .(r), !r.defaultPrevented && r.detail > 1 && r.preventDefault())
        }
    }));
m.displayName = N;
var l = m,
    j = x("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),
    P = a.forwardRef(({
        className: t,
        ...e
    }, r) => (0, i.jsx)(l, {
        ref: r,
        className: b(j(), t),
        ...e
    }));
P.displayName = l.displayName;
export {
    P as t
};