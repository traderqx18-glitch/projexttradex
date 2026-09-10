import {
    i as $,
    t as W
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as H
} from "./react-D8T8de5F.js";
import {
    t as D
} from "./react-dom-CyvodVTt.js";
import {
    t as P
} from "./utils-BiE0AtIH.js";
var i = $(H(), 1),
    Ce = !!(typeof window < "u" && window.document && window.document.createElement);

function U(e, t, {
    checkForDefaultPrevented: o = !0
} = {}) {
    return function(r) {
        if (e ? .(r), o === !1 || !r.defaultPrevented) return t ? .(r)
    }
}

function j(e, t) {
    if (typeof e == "function") return e(t);
    e != null && (e.current = t)
}

function V(...e) {
    return t => {
        let o = !1;
        const c = e.map(r => {
            const n = j(r, t);
            return !o && typeof n == "function" && (o = !0), n
        });
        if (o) return () => {
            for (let r = 0; r < c.length; r++) {
                const n = c[r];
                typeof n == "function" ? n() : j(e[r], null)
            }
        }
    }
}

function _(...e) {
    return i.useCallback(V(...e), e)
}
var b = W();

function G(e, t = []) {
    let o = [];

    function c(n, s) {
        const a = i.createContext(s);
        a.displayName = n + "Context";
        const u = o.length;
        o = [...o, s];
        const l = h => {
            const {
                scope: p,
                children: m,
                ...f
            } = h, v = p ? .[e] ? .[u] || a, g = i.useMemo(() => f, Object.values(f));
            return (0, b.jsx)(v.Provider, {
                value: g,
                children: m
            })
        };
        l.displayName = n + "Provider";

        function d(h, p) {
            const m = p ? .[e] ? .[u] || a,
                f = i.useContext(m);
            if (f) return f;
            if (s !== void 0) return s;
            throw new Error(`\`${h}\` must be used within \`${n}\``)
        }
        return [l, d]
    }
    const r = () => {
        const n = o.map(s => i.createContext(s));
        return function(a) {
            const u = a ? .[e] || n;
            return i.useMemo(() => ({
                [`__scope${e}`]: { ...a,
                    [e]: u
                }
            }), [a, u])
        }
    };
    return r.scopeName = e, [c, Y(r, ...t)]
}

function Y(...e) {
    const t = e[0];
    if (e.length === 1) return t;
    const o = () => {
        const c = e.map(r => ({
            useScope: r(),
            scopeName: r.scopeName
        }));
        return function(n) {
            const s = c.reduce((a, {
                useScope: u,
                scopeName: l
            }) => {
                const d = u(n)[`__scope${l}`];
                return { ...a,
                    ...d
                }
            }, {});
            return i.useMemo(() => ({
                [`__scope${t.scopeName}`]: s
            }), [s])
        }
    };
    return o.scopeName = t.scopeName, o
}
var Z = globalThis ? .document ? i.useLayoutEffect : () => {},
    X = i[" useInsertionEffect ".trim().toString()] || Z;

function J({
    prop: e,
    defaultProp: t,
    onChange: o = () => {},
    caller: c
}) {
    const [r, n, s] = K({
        defaultProp: t,
        onChange: o
    }), a = e !== void 0, u = a ? e : r; {
        const l = i.useRef(e !== void 0);
        i.useEffect(() => {
            const d = l.current;
            l.current = a
        }, [a, c])
    }
    return [u, i.useCallback(l => {
        if (a) {
            const d = Q(l) ? l(e) : l;
            d !== e && s.current ? .(d)
        } else n(l)
    }, [a, e, n, s])]
}

function K({
    defaultProp: e,
    onChange: t
}) {
    const [o, c] = i.useState(e), r = i.useRef(o), n = i.useRef(t);
    return X(() => {
        n.current = t
    }, [t]), i.useEffect(() => {
        r.current !== o && (n.current ? .(o), r.current = o)
    }, [o, r]), [o, c, n]
}

function Q(e) {
    return typeof e == "function"
}

function ee(e) {
    const t = i.useRef({
        value: e,
        previous: e
    });
    return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e])
}
var te = globalThis ? .document ? i.useLayoutEffect : () => {};

function re(e) {
    const [t, o] = i.useState(void 0);
    return te(() => {
        if (e) {
            o({
                width: e.offsetWidth,
                height: e.offsetHeight
            });
            const c = new ResizeObserver(r => {
                if (!Array.isArray(r) || !r.length) return;
                const n = r[0];
                let s, a;
                if ("borderBoxSize" in n) {
                    const u = n.borderBoxSize,
                        l = Array.isArray(u) ? u[0] : u;
                    s = l.inlineSize, a = l.blockSize
                } else s = e.offsetWidth, a = e.offsetHeight;
                o({
                    width: s,
                    height: a
                })
            });
            return c.observe(e, {
                box: "border-box"
            }), () => c.unobserve(e)
        } else o(void 0)
    }, [e]), t
}
var _e = $(D(), 1);

function oe(e) {
    const t = i.forwardRef((o, c) => {
        let {
            children: r,
            ...n
        } = o, s = null, a = !1;
        const u = [];
        I(r) && typeof y == "function" && (r = y(r._payload)), i.Children.forEach(r, p => {
            if (ae(p)) {
                a = !0;
                const m = p;
                let f = "child" in m.props ? m.props.child : m.props.children;
                I(f) && typeof y == "function" && (f = y(f._payload)), s = se(m, f), u.push(s ? .props ? .children)
            } else u.push(p)
        }), s ? s = i.cloneElement(s, void 0, u) : !a && i.Children.count(r) === 1 && i.isValidElement(r) && (s = r);
        const l = s ? ce(s) : void 0,
            d = _(c, l);
        if (!s) {
            if (r || r === 0) throw new Error(a ? fe(e) : de(e));
            return r
        }
        const h = ie(n, s.props ? ? {});
        return s.type !== i.Fragment && (h.ref = c ? d : l), i.cloneElement(s, h)
    });
    return t.displayName = `${e}.Slot`, t
}
var ne = Symbol.for("radix.slottable"),
    se = (e, t) => {
        if ("child" in e.props) {
            const o = e.props.child;
            return i.isValidElement(o) ? i.cloneElement(o, void 0, e.props.children(o.props.children)) : null
        }
        return i.isValidElement(t) ? t : null
    };

function ie(e, t) {
    const o = { ...t
    };
    for (const c in t) {
        const r = e[c],
            n = t[c];
        /^on[A-Z]/.test(c) ? r && n ? o[c] = (...s) => {
            const a = n(...s);
            return r(...s), a
        } : r && (o[c] = r) : c === "style" ? o[c] = { ...r,
            ...n
        } : c === "className" && (o[c] = [r, n].filter(Boolean).join(" "))
    }
    return { ...e,
        ...o
    }
}

function ce(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, "ref") ? .get,
        o = t && "isReactWarning" in t && t.isReactWarning;
    return o ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref") ? .get, o = t && "isReactWarning" in t && t.isReactWarning, o ? e.props.ref : e.props.ref || e.ref)
}

function ae(e) {
    return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ne
}
var ue = Symbol.for("react.lazy");

function I(e) {
    return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === ue && "_payload" in e && le(e._payload)
}

function le(e) {
    return typeof e == "object" && e !== null && "then" in e
}
var de = e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
    fe = e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
    y = i[" use ".trim().toString()],
    E = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, t) => {
        const o = oe(`Primitive.${t}`),
            c = i.forwardRef((r, n) => {
                const {
                    asChild: s,
                    ...a
                } = r, u = s ? o : t;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), (0, b.jsx)(u, { ...a,
                    ref: n
                })
            });
        return c.displayName = `Primitive.${t}`, { ...e,
            [t]: c
        }
    }, {}),
    w = "Switch",
    [pe, Ee] = G(w),
    [he, x] = pe(w);

function me(e) {
    const {
        __scopeSwitch: t,
        checked: o,
        children: c,
        defaultChecked: r,
        disabled: n,
        form: s,
        name: a,
        onCheckedChange: u,
        required: l,
        value: d = "on",
        internal_do_not_use_render: h
    } = e, [p, m] = J({
        prop: o,
        defaultProp: r ? ? !1,
        onChange: u,
        caller: w
    }), [f, v] = i.useState(null), [g, C] = i.useState(null), S = {
        checked: p,
        setChecked: m,
        disabled: n,
        control: f,
        setControl: v,
        name: a,
        form: s,
        value: d,
        hasConsumerStoppedPropagationRef: i.useRef(!1),
        required: l,
        defaultChecked: r,
        isFormControl: f ? !!s || !!f.closest("form") : !0,
        bubbleInput: g,
        setBubbleInput: C
    };
    return (0, b.jsx)(he, {
        scope: t,
        ...S,
        children: be(h) ? h(S) : c
    })
}
var N = "SwitchTrigger",
    T = i.forwardRef(({
        __scopeSwitch: e,
        onClick: t,
        ...o
    }, c) => {
        const {
            value: r,
            disabled: n,
            checked: s,
            required: a,
            setControl: u,
            setChecked: l,
            hasConsumerStoppedPropagationRef: d,
            isFormControl: h,
            bubbleInput: p
        } = x(N, e), m = _(c, u);
        return (0, b.jsx)(E.button, {
            type: "button",
            role: "switch",
            "aria-checked": s,
            "aria-required": a,
            "data-state": L(s),
            "data-disabled": n ? "" : void 0,
            disabled: n,
            value: r,
            ...o,
            ref: m,
            onClick: U(t, f => {
                l(v => !v), p && h && (d.current = f.isPropagationStopped(), d.current || f.stopPropagation())
            })
        })
    });
T.displayName = N;
var k = i.forwardRef((e, t) => {
    const {
        __scopeSwitch: o,
        name: c,
        checked: r,
        defaultChecked: n,
        required: s,
        disabled: a,
        value: u,
        onCheckedChange: l,
        form: d,
        ...h
    } = e;
    return (0, b.jsx)(me, {
        __scopeSwitch: o,
        checked: r,
        defaultChecked: n,
        disabled: a,
        required: s,
        onCheckedChange: l,
        name: c,
        form: d,
        value: u,
        internal_do_not_use_render: ({
            isFormControl: p
        }) => (0, b.jsxs)(b.Fragment, {
            children: [(0, b.jsx)(T, { ...h,
                ref: t,
                __scopeSwitch: o
            }), p && (0, b.jsx)(M, {
                __scopeSwitch: o
            })]
        })
    })
});
k.displayName = w;
var z = "SwitchThumb",
    B = i.forwardRef((e, t) => {
        const {
            __scopeSwitch: o,
            ...c
        } = e, r = x(z, o);
        return (0, b.jsx)(E.span, {
            "data-state": L(r.checked),
            "data-disabled": r.disabled ? "" : void 0,
            ...c,
            ref: t
        })
    });
B.displayName = z;
var A = "SwitchBubbleInput",
    M = i.forwardRef(({
        __scopeSwitch: e,
        ...t
    }, o) => {
        const {
            control: c,
            hasConsumerStoppedPropagationRef: r,
            checked: n,
            defaultChecked: s,
            required: a,
            disabled: u,
            name: l,
            value: d,
            form: h,
            bubbleInput: p,
            setBubbleInput: m
        } = x(A, e), f = _(o, m), v = ee(n), g = re(c);
        i.useEffect(() => {
            const S = p;
            if (!S) return;
            const O = window.HTMLInputElement.prototype,
                R = Object.getOwnPropertyDescriptor(O, "checked").set,
                q = !r.current;
            if (v !== n && R) {
                const F = new Event("click", {
                    bubbles: q
                });
                R.call(S, n), S.dispatchEvent(F)
            }
        }, [p, v, n, r]);
        const C = i.useRef(n);
        return (0, b.jsx)(E.input, {
            type: "checkbox",
            "aria-hidden": !0,
            defaultChecked: s ? ? C.current,
            required: a,
            disabled: u,
            name: l,
            value: d,
            form: h,
            ...t,
            tabIndex: -1,
            ref: f,
            style: { ...t.style,
                ...g,
                position: "absolute",
                pointerEvents: "none",
                opacity: 0,
                margin: 0,
                transform: "translateX(-100%)"
            }
        })
    });
M.displayName = A;

function be(e) {
    return typeof e == "function"
}

function L(e) {
    return e ? "checked" : "unchecked"
}
var ve = i.forwardRef(({
    className: e,
    ...t
}, o) => (0, b.jsx)(k, {
    className: P("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=unchecked]:border-border data-[state=unchecked]:bg-muted", e),
    ...t,
    ref: o,
    children: (0, b.jsx)(B, {
        className: P("pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-foreground/60")
    })
}));
ve.displayName = k.displayName;
export {
    ve as t
};