import {
    i as O
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as y
} from "./react-D8T8de5F.js";
import {
    n as E
} from "./dist-BGr8f1uC.js";
import {
    r as p
} from "./dist-iN9wdwzB.js";
var i = O(y(), 1);

function T(n, e) {
    return i.useReducer((t, r) => e[t][r] ? ? t, n)
}
var g = n => {
    const {
        present: e,
        children: t
    } = n, r = v(e), a = typeof t == "function" ? t({
        present: r.isPresent
    }) : i.Children.only(t), c = E(r.ref, R(a));
    return typeof t == "function" || r.isPresent ? i.cloneElement(a, {
        ref: c
    }) : null
};
g.displayName = "Presence";

function v(n) {
    const [e, t] = i.useState(), r = i.useRef(null), a = i.useRef(n), c = i.useRef("none"), [N, s] = T(n ? "mounted" : "unmounted", {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    return i.useEffect(() => {
        const o = l(r.current);
        c.current = N === "mounted" ? o : "none"
    }, [N]), p(() => {
        const o = r.current,
            m = a.current;
        if (m !== n) {
            const u = c.current,
                d = l(o);
            n ? s("MOUNT") : d === "none" || o ? .display === "none" ? s("UNMOUNT") : s(m && u !== d ? "ANIMATION_OUT" : "UNMOUNT"), a.current = n
        }
    }, [n, s]), p(() => {
        if (e) {
            let o;
            const m = e.ownerDocument.defaultView ? ? window,
                u = f => {
                    const A = l(r.current).includes(CSS.escape(f.animationName));
                    if (f.target === e && A && (s("ANIMATION_END"), !a.current)) {
                        const M = e.style.animationFillMode;
                        e.style.animationFillMode = "forwards", o = m.setTimeout(() => {
                            e.style.animationFillMode === "forwards" && (e.style.animationFillMode = M)
                        })
                    }
                },
                d = f => {
                    f.target === e && (c.current = l(r.current))
                };
            return e.addEventListener("animationstart", d), e.addEventListener("animationcancel", u), e.addEventListener("animationend", u), () => {
                m.clearTimeout(o), e.removeEventListener("animationstart", d), e.removeEventListener("animationcancel", u), e.removeEventListener("animationend", u)
            }
        } else s("ANIMATION_END")
    }, [e, s]), {
        isPresent: ["mounted", "unmountSuspended"].includes(N),
        ref: i.useCallback(o => {
            r.current = o ? getComputedStyle(o) : null, t(o)
        }, [])
    }
}

function l(n) {
    return n ? .animationName || "none"
}

function R(n) {
    let e = Object.getOwnPropertyDescriptor(n.props, "ref") ? .get,
        t = e && "isReactWarning" in e && e.isReactWarning;
    return t ? n.ref : (e = Object.getOwnPropertyDescriptor(n, "ref") ? .get, t = e && "isReactWarning" in e && e.isReactWarning, t ? n.props.ref : n.props.ref || n.ref)
}
export {
    g as t
};