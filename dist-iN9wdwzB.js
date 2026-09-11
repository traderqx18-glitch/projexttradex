import {
    i as S,
    t as E
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as w
} from "./react-D8T8de5F.js";
import {
    t as _
} from "./react-dom-CyvodVTt.js";
import {
    t as g
} from "./dist-BGr8f1uC.js";
var B = !!(typeof window < "u" && window.document && window.document.createElement);

function F(e, t, {
    checkForDefaultPrevented: n = !0
} = {}) {
    return function(o) {
        if (e ?.(o), n === !1 || !o.defaultPrevented) return t ?.(o)
    }
}
var r = S(w(), 1),
    m = E();

function U(e, t) {
    const n = r.createContext(t),
        s = c => {
            const {
                children: i,
                ...u
            } = c, a = r.useMemo(() => u, Object.values(u));
            return (0, m.jsx)(n.Provider, {
                value: a,
                children: i
            })
        };
    s.displayName = e + "Provider";

    function o(c) {
        const i = r.useContext(n);
        if (i) return i;
        if (t !== void 0) return t;
        throw new Error(`\`${c}\` must be used within \`${e}\``)
    }
    return [s, o]
}

function H(e, t = []) {
    let n = [];

    function s(c, i) {
        const u = r.createContext(i),
            a = n.length;
        n = [...n, i];
        const l = d => {
            const {
                scope: v,
                children: C,
                ...p
            } = d, x = v ?.[e] ?.[a] || u, y = r.useMemo(() => p, Object.values(p));
            return (0, m.jsx)(x.Provider, {
                value: y,
                children: C
            })
        };
        l.displayName = c + "Provider";

        function f(d, v) {
            const C = v ?.[e] ?.[a] || u,
                p = r.useContext(C);
            if (p) return p;
            if (i !== void 0) return i;
            throw new Error(`\`${d}\` must be used within \`${c}\``)
        }
        return [l, f]
    }
    const o = () => {
        const c = n.map(i => r.createContext(i));
        return function(u) {
            const a = u ?.[e] || c;
            return r.useMemo(() => ({
                [`__scope${e}`]: { ...u,
                    [e]: a
                }
            }), [u, a])
        }
    };
    return o.scopeName = e, [s, R(o, ...t)]
}

function R(...e) {
    const t = e[0];
    if (e.length === 1) return t;
    const n = () => {
        const s = e.map(o => ({
            useScope: o(),
            scopeName: o.scopeName
        }));
        return function(c) {
            const i = s.reduce((u, {
                useScope: a,
                scopeName: l
            }) => {
                const f = a(c)[`__scope${l}`];
                return { ...u,
                    ...f
                }
            }, {});
            return r.useMemo(() => ({
                [`__scope${t.scopeName}`]: i
            }), [i])
        }
    };
    return n.scopeName = t.scopeName, n
}
var b = S(_(), 1);

function P(e) {
    const t = $(e),
        n = r.forwardRef((s, o) => {
            const {
                children: c,
                ...i
            } = s, u = r.Children.toArray(c), a = u.find(I);
            if (a) {
                const l = a.props.children,
                    f = u.map(d => d === a ? r.Children.count(l) > 1 ? r.Children.only(null) : r.isValidElement(l) ? l.props.children : null : d);
                return (0, m.jsx)(t, { ...i,
                    ref: o,
                    children: r.isValidElement(l) ? r.cloneElement(l, void 0, f) : null
                })
            }
            return (0, m.jsx)(t, { ...i,
                ref: o,
                children: c
            })
        });
    return n.displayName = `${e}.Slot`, n
}

function $(e) {
    const t = r.forwardRef((n, s) => {
        const {
            children: o,
            ...c
        } = n;
        if (r.isValidElement(o)) {
            const i = M(o),
                u = O(c, o.props);
            return o.type !== r.Fragment && (u.ref = s ? g(s, i) : i), r.cloneElement(o, u)
        }
        return r.Children.count(o) > 1 ? r.Children.only(null) : null
    });
    return t.displayName = `${e}.SlotClone`, t
}
var j = Symbol("radix.slottable");

function I(e) {
    return r.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === j
}

function O(e, t) {
    const n = { ...t
    };
    for (const s in t) {
        const o = e[s],
            c = t[s];
        /^on[A-Z]/.test(s) ? o && c ? n[s] = (...i) => {
            const u = c(...i);
            return o(...i), u
        } : o && (n[s] = o) : s === "style" ? n[s] = { ...o,
            ...c
        } : s === "className" && (n[s] = [o, c].filter(Boolean).join(" "))
    }
    return { ...e,
        ...n
    }
}

function M(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, "ref") ?.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref") ?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
var Z = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, t) => {
    const n = P(`Primitive.${t}`),
        s = r.forwardRef((o, c) => {
            const {
                asChild: i,
                ...u
            } = o, a = i ? n : t;
            return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), (0, m.jsx)(a, { ...u,
                ref: c
            })
        });
    return s.displayName = `Primitive.${t}`, { ...e,
        [t]: s
    }
}, {});

function z(e, t) {
    e && b.flushSync(() => e.dispatchEvent(t))
}

function G(e) {
    const t = r.useRef(e);
    return r.useEffect(() => {
        t.current = e
    }), r.useMemo(() => (...n) => t.current ?.(...n), [])
}
var h = globalThis ?.document ? r.useLayoutEffect : () => {},
    N = r[" useId ".trim().toString()] || (() => {}),
    D = 0;

function J(e) {
    const [t, n] = r.useState(N());
    return h(() => {
        e || n(s => s ?? String(D++))
    }, [e]), e || (t ? `radix-${t}` : "")
}
var V = r[" useInsertionEffect ".trim().toString()] || h;

function K({
    prop: e,
    defaultProp: t,
    onChange: n = () => {},
    caller: s
}) {
    const [o, c, i] = W({
        defaultProp: t,
        onChange: n
    }), u = e !== void 0, a = u ? e : o; {
        const l = r.useRef(e !== void 0);
        r.useEffect(() => {
            const f = l.current;
            l.current = u
        }, [u, s])
    }
    return [a, r.useCallback(l => {
        if (u) {
            const f = A(l) ? l(e) : l;
            f !== e && i.current ?.(f)
        } else c(l)
    }, [u, e, c, i])]
}

function W({
    defaultProp: e,
    onChange: t
}) {
    const [n, s] = r.useState(e), o = r.useRef(n), c = r.useRef(t);
    return V(() => {
        c.current = t
    }, [t]), r.useEffect(() => {
        o.current !== n && (c.current ?.(n), o.current = n)
    }, [n, o]), [n, s, c]
}

function A(e) {
    return typeof e == "function"
}
export {
    Z as a, H as c, G as i, F as l, J as n, z as o, h as r, U as s, K as t
};