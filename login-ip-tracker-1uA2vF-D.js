import {
    i as at,
    t as jn
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as Fn
} from "./react-D8T8de5F.js";
import {
    t as Ln
} from "./react-dom-CyvodVTt.js";
import {
    r as _e
} from "./portal-client-CV1s4BnW.js";
import {
    t as Oe
} from "./createLucideIcon-salqAbnG.js";
import {
    t as kn
} from "./chevron-right-DXbAj7Iv.js";
import {
    t as $n
} from "./circle-DyxDENte.js";
import {
    t as G
} from "./utils-BiE0AtIH.js";
import {
    a as Un,
    c as Kn,
    i as Gn,
    l as Bn,
    n as Wn,
    o as zn,
    r as Vn,
    s as Hn,
    t as Yn
} from "./floating-ui.react-dom-DIiFlcad.js";
import {
    n as Xn,
    t as Zn
} from "./Combination-i6Q_M3aT.js";
import {
    J as qn,
    c as ze,
    kt as Jn
} from "./index-dGs9i_Jo.js";
import {
    t as Qn
} from "./ip-guard.functions-CWWofRr7.js";
var eo = [
        ["path", {
            d: "M12 2v2",
            key: "tus03m"
        }],
        ["path", {
            d: "m4.93 4.93 1.41 1.41",
            key: "149t6j"
        }],
        ["path", {
            d: "M20 12h2",
            key: "1q8mjw"
        }],
        ["path", {
            d: "m19.07 4.93-1.41 1.41",
            key: "1shlcs"
        }],
        ["path", {
            d: "M15.947 12.65a4 4 0 0 0-5.925-4.128",
            key: "dpwdj0"
        }],
        ["path", {
            d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z",
            key: "s09mg5"
        }]
    ],
    ea = Oe("cloud-sun", eo),
    to = [
        ["path", {
            d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
            key: "kfwtm"
        }]
    ],
    ta = Oe("moon", to),
    no = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "4",
            key: "4exip2"
        }],
        ["path", {
            d: "M12 2v2",
            key: "tus03m"
        }],
        ["path", {
            d: "M12 20v2",
            key: "1lh1kg"
        }],
        ["path", {
            d: "m4.93 4.93 1.41 1.41",
            key: "149t6j"
        }],
        ["path", {
            d: "m17.66 17.66 1.41 1.41",
            key: "ptbguv"
        }],
        ["path", {
            d: "M2 12h2",
            key: "1t8f8n"
        }],
        ["path", {
            d: "M20 12h2",
            key: "1q8mjw"
        }],
        ["path", {
            d: "m6.34 17.66-1.41 1.41",
            key: "1m8zz5"
        }],
        ["path", {
            d: "m19.07 4.93-1.41 1.41",
            key: "1shlcs"
        }]
    ],
    na = Oe("sun", no),
    r = at(Fn(), 1),
    oa = !!(typeof window < "u" && window.document && window.document.createElement);

function x(e, t, {
    checkForDefaultPrevented: n = !0
} = {}) {
    return function(s) {
        if (e ? .(s), n === !1 || !s.defaultPrevented) return t ? .(s)
    }
}

function Ve(e, t) {
    if (typeof e == "function") return e(t);
    e != null && (e.current = t)
}

function De(...e) {
    return t => {
        let n = !1;
        const o = e.map(s => {
            const a = Ve(s, t);
            return !n && typeof a == "function" && (n = !0), a
        });
        if (n) return () => {
            for (let s = 0; s < o.length; s++) {
                const a = o[s];
                typeof a == "function" ? a() : Ve(e[s], null)
            }
        }
    }
}

function _(...e) {
    return r.useCallback(De(...e), e)
}
var u = jn();

function ae(e, t = []) {
    let n = [];

    function o(a, c) {
        const i = r.createContext(c);
        i.displayName = a + "Context";
        const p = n.length;
        n = [...n, c];
        const d = l => {
            const {
                scope: m,
                children: v,
                ...h
            } = l, y = m ? .[e] ? .[p] || i, g = r.useMemo(() => h, Object.values(h));
            return (0, u.jsx)(y.Provider, {
                value: g,
                children: v
            })
        };
        d.displayName = a + "Provider";

        function f(l, m) {
            const v = m ? .[e] ? .[p] || i,
                h = r.useContext(v);
            if (h) return h;
            if (c !== void 0) return c;
            throw new Error(`\`${l}\` must be used within \`${a}\``)
        }
        return [d, f]
    }
    const s = () => {
        const a = n.map(c => r.createContext(c));
        return function(i) {
            const p = i ? .[e] || a;
            return r.useMemo(() => ({
                [`__scope${e}`]: { ...i,
                    [e]: p
                }
            }), [i, p])
        }
    };
    return s.scopeName = e, [o, oo(s, ...t)]
}

function oo(...e) {
    const t = e[0];
    if (e.length === 1) return t;
    const n = () => {
        const o = e.map(s => ({
            useScope: s(),
            scopeName: s.scopeName
        }));
        return function(a) {
            const c = o.reduce((i, {
                useScope: p,
                scopeName: d
            }) => {
                const f = p(a)[`__scope${d}`];
                return { ...i,
                    ...f
                }
            }, {});
            return r.useMemo(() => ({
                [`__scope${t.scopeName}`]: c
            }), [c])
        }
    };
    return n.scopeName = t.scopeName, n
}
var ro = globalThis ? .document ? r.useLayoutEffect : () => {},
    so = r[" useInsertionEffect ".trim().toString()] || ro;

function it({
    prop: e,
    defaultProp: t,
    onChange: n = () => {},
    caller: o
}) {
    const [s, a, c] = ao({
        defaultProp: t,
        onChange: n
    }), i = e !== void 0, p = i ? e : s; {
        const d = r.useRef(e !== void 0);
        r.useEffect(() => {
            const f = d.current;
            d.current = i
        }, [i, o])
    }
    return [p, r.useCallback(d => {
        if (i) {
            const f = io(d) ? d(e) : d;
            f !== e && c.current ? .(f)
        } else a(d)
    }, [i, e, a, c])]
}

function ao({
    defaultProp: e,
    onChange: t
}) {
    const [n, o] = r.useState(e), s = r.useRef(n), a = r.useRef(t);
    return so(() => {
        a.current = t
    }, [t]), r.useEffect(() => {
        s.current !== n && (a.current ? .(n), s.current = n)
    }, [n, s]), [n, o, a]
}

function io(e) {
    return typeof e == "function"
}
var ct = at(Ln(), 1);

function co(e) {
    const t = r.forwardRef((n, o) => {
        let {
            children: s,
            ...a
        } = n, c = null, i = !1;
        const p = [];
        He(s) && typeof ve == "function" && (s = ve(s._payload)), r.Children.forEach(s, m => {
            if (mo(m)) {
                i = !0;
                const v = m;
                let h = "child" in v.props ? v.props.child : v.props.children;
                He(h) && typeof ve == "function" && (h = ve(h._payload)), c = lo(v, h), p.push(c ? .props ? .children)
            } else p.push(m)
        }), c ? c = r.cloneElement(c, void 0, p) : !i && r.Children.count(s) === 1 && r.isValidElement(s) && (c = s);
        const d = c ? po(c) : void 0,
            f = _(o, d);
        if (!c) {
            if (s || s === 0) throw new Error(i ? yo(e) : go(e));
            return s
        }
        const l = fo(a, c.props ? ? {});
        return c.type !== r.Fragment && (l.ref = o ? f : d), r.cloneElement(c, l)
    });
    return t.displayName = `${e}.Slot`, t
}
var uo = Symbol.for("radix.slottable"),
    lo = (e, t) => {
        if ("child" in e.props) {
            const n = e.props.child;
            return r.isValidElement(n) ? r.cloneElement(n, void 0, e.props.children(n.props.children)) : null
        }
        return r.isValidElement(t) ? t : null
    };

function fo(e, t) {
    const n = { ...t
    };
    for (const o in t) {
        const s = e[o],
            a = t[o];
        /^on[A-Z]/.test(o) ? s && a ? n[o] = (...c) => {
            const i = a(...c);
            return s(...c), i
        } : s && (n[o] = s) : o === "style" ? n[o] = { ...s,
            ...a
        } : o === "className" && (n[o] = [s, a].filter(Boolean).join(" "))
    }
    return { ...e,
        ...n
    }
}

function po(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, "ref") ? .get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref") ? .get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}

function mo(e) {
    return r.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === uo
}
var vo = Symbol.for("react.lazy");

function He(e) {
    return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === vo && "_payload" in e && ho(e._payload)
}

function ho(e) {
    return typeof e == "object" && e !== null && "then" in e
}
var go = e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
    yo = e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
    ve = r[" use ".trim().toString()],
    P = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, t) => {
        const n = co(`Primitive.${t}`),
            o = r.forwardRef((s, a) => {
                const {
                    asChild: c,
                    ...i
                } = s, p = c ? n : t;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), (0, u.jsx)(p, { ...i,
                    ref: a
                })
            });
        return o.displayName = `Primitive.${t}`, { ...e,
            [t]: o
        }
    }, {});

function ut(e, t) {
    e && ct.flushSync(() => e.dispatchEvent(t))
}

function Pe(e) {
    const t = r.forwardRef((n, o) => {
        let {
            children: s,
            ...a
        } = n, c = null, i = !1;
        const p = [];
        Ye(s) && typeof he == "function" && (s = he(s._payload)), r.Children.forEach(s, m => {
            if (Co(m)) {
                i = !0;
                const v = m;
                let h = "child" in v.props ? v.props.child : v.props.children;
                Ye(h) && typeof he == "function" && (h = he(h._payload)), c = Eo(v, h), p.push(c ? .props ? .children)
            } else p.push(m)
        }), c ? c = r.cloneElement(c, void 0, p) : !i && r.Children.count(s) === 1 && r.isValidElement(s) && (c = s);
        const d = c ? bo(c) : void 0,
            f = _(o, d);
        if (!c) {
            if (s || s === 0) throw new Error(i ? _o(e) : Ro(e));
            return s
        }
        const l = xo(a, c.props ? ? {});
        return c.type !== r.Fragment && (l.ref = o ? f : d), r.cloneElement(c, l)
    });
    return t.displayName = `${e}.Slot`, t
}
var wo = Symbol.for("radix.slottable"),
    Eo = (e, t) => {
        if ("child" in e.props) {
            const n = e.props.child;
            return r.isValidElement(n) ? r.cloneElement(n, void 0, e.props.children(n.props.children)) : null
        }
        return r.isValidElement(t) ? t : null
    };

function xo(e, t) {
    const n = { ...t
    };
    for (const o in t) {
        const s = e[o],
            a = t[o];
        /^on[A-Z]/.test(o) ? s && a ? n[o] = (...c) => {
            const i = a(...c);
            return s(...c), i
        } : s && (n[o] = s) : o === "style" ? n[o] = { ...s,
            ...a
        } : o === "className" && (n[o] = [s, a].filter(Boolean).join(" "))
    }
    return { ...e,
        ...n
    }
}

function bo(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, "ref") ? .get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref") ? .get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}

function Co(e) {
    return r.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === wo
}
var Mo = Symbol.for("react.lazy");

function Ye(e) {
    return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Mo && "_payload" in e && So(e._payload)
}

function So(e) {
    return typeof e == "object" && e !== null && "then" in e
}
var Ro = e => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
    _o = e => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
    he = r[" use ".trim().toString()];

function lt(e) {
    const t = e + "CollectionProvider",
        [n, o] = ae(t),
        [s, a] = n(t, {
            collectionRef: {
                current: null
            },
            itemMap: new Map
        }),
        c = y => {
            const {
                scope: g,
                children: E
            } = y, b = r.useRef(null), C = r.useRef(new Map).current;
            return (0, u.jsx)(s, {
                scope: g,
                itemMap: C,
                collectionRef: b,
                children: E
            })
        };
    c.displayName = t;
    const i = e + "CollectionSlot",
        p = Pe(i),
        d = r.forwardRef((y, g) => {
            const {
                scope: E,
                children: b
            } = y;
            return (0, u.jsx)(p, {
                ref: _(g, a(i, E).collectionRef),
                children: b
            })
        });
    d.displayName = i;
    const f = e + "CollectionItemSlot",
        l = "data-radix-collection-item",
        m = Pe(f),
        v = r.forwardRef((y, g) => {
            const {
                scope: E,
                children: b,
                ...C
            } = y, M = r.useRef(null), j = _(g, M), N = a(f, E);
            return r.useEffect(() => (N.itemMap.set(M, {
                ref: M,
                ...C
            }), () => void N.itemMap.delete(M))), (0, u.jsx)(m, {
                [l]: "",
                ref: j,
                children: b
            })
        });
    v.displayName = f;

    function h(y) {
        const g = a(e + "CollectionConsumer", y);
        return r.useCallback(() => {
            const E = g.collectionRef.current;
            if (!E) return [];
            const b = Array.from(E.querySelectorAll(`[${l}]`));
            return Array.from(g.itemMap.values()).sort((C, M) => b.indexOf(C.ref.current) - b.indexOf(M.ref.current))
        }, [g.collectionRef, g.itemMap])
    }
    return [{
        Provider: c,
        Slot: d,
        ItemSlot: v
    }, h, o]
}
var Po = r.createContext(void 0);

function dt(e) {
    const t = r.useContext(Po);
    return e || t || "ltr"
}

function $(e) {
    const t = r.useRef(e);
    return r.useEffect(() => {
        t.current = e
    }), r.useMemo(() => ((...n) => t.current ? .(...n)), [])
}

function Io(e, t = globalThis ? .document) {
    const n = $(e);
    r.useEffect(() => {
        const o = s => {
            s.key === "Escape" && n(s)
        };
        return t.addEventListener("keydown", o, {
            capture: !0
        }), () => t.removeEventListener("keydown", o, {
            capture: !0
        })
    }, [n, t])
}
var No = "DismissableLayer",
    Ie = "dismissableLayer.update",
    Ao = "dismissableLayer.pointerDownOutside",
    Oo = "dismissableLayer.focusOutside",
    Xe, ft = r.createContext({
        layers: new Set,
        layersWithOutsidePointerEventsDisabled: new Set,
        branches: new Set
    }),
    pt = r.forwardRef((e, t) => {
        const {
            disableOutsidePointerEvents: n = !1,
            onEscapeKeyDown: o,
            onPointerDownOutside: s,
            onFocusOutside: a,
            onInteractOutside: c,
            onDismiss: i,
            ...p
        } = e, d = r.useContext(ft), [f, l] = r.useState(null), m = f ? .ownerDocument ? ? globalThis ? .document, [, v] = r.useState({}), h = _(t, S => l(S)), y = Array.from(d.layers), [g] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), E = y.indexOf(g), b = f ? y.indexOf(f) : -1, C = d.layersWithOutsidePointerEventsDisabled.size > 0, M = b >= E, j = jo(S => {
            const R = S.target,
                D = [...d.branches].some(F => F.contains(R));
            !M || D || (s ? .(S), c ? .(S), S.defaultPrevented || i ? .())
        }, m), N = Fo(S => {
            const R = S.target;
            [...d.branches].some(D => D.contains(R)) || (a ? .(S), c ? .(S), S.defaultPrevented || i ? .())
        }, m);
        return Io(S => {
            b === d.layers.size - 1 && (o ? .(S), !S.defaultPrevented && i && (S.preventDefault(), i()))
        }, m), r.useEffect(() => {
            if (f) return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Xe = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), Ze(), () => {
                n && (d.layersWithOutsidePointerEventsDisabled.delete(f), d.layersWithOutsidePointerEventsDisabled.size === 0 && (m.body.style.pointerEvents = Xe))
            }
        }, [f, m, n, d]), r.useEffect(() => () => {
            f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), Ze())
        }, [f, d]), r.useEffect(() => {
            const S = () => v({});
            return document.addEventListener(Ie, S), () => document.removeEventListener(Ie, S)
        }, []), (0, u.jsx)(P.div, { ...p,
            ref: h,
            style: {
                pointerEvents: C ? M ? "auto" : "none" : void 0,
                ...e.style
            },
            onFocusCapture: x(e.onFocusCapture, N.onFocusCapture),
            onBlurCapture: x(e.onBlurCapture, N.onBlurCapture),
            onPointerDownCapture: x(e.onPointerDownCapture, j.onPointerDownCapture)
        })
    });
pt.displayName = No;
var Do = "DismissableLayerBranch",
    To = r.forwardRef((e, t) => {
        const n = r.useContext(ft),
            o = r.useRef(null),
            s = _(t, o);
        return r.useEffect(() => {
            const a = o.current;
            if (a) return n.branches.add(a), () => {
                n.branches.delete(a)
            }
        }, [n.branches]), (0, u.jsx)(P.div, { ...e,
            ref: s
        })
    });
To.displayName = Do;

function jo(e, t = globalThis ? .document) {
    const n = $(e),
        o = r.useRef(!1),
        s = r.useRef(() => {});
    return r.useEffect(() => {
        const a = i => {
                if (i.target && !o.current) {
                    let p = function() {
                        mt(Ao, n, d, {
                            discrete: !0
                        })
                    };
                    const d = {
                        originalEvent: i
                    };
                    i.pointerType === "touch" ? (t.removeEventListener("click", s.current), s.current = p, t.addEventListener("click", s.current, {
                        once: !0
                    })) : p()
                } else t.removeEventListener("click", s.current);
                o.current = !1
            },
            c = window.setTimeout(() => {
                t.addEventListener("pointerdown", a)
            }, 0);
        return () => {
            window.clearTimeout(c), t.removeEventListener("pointerdown", a), t.removeEventListener("click", s.current)
        }
    }, [t, n]), {
        onPointerDownCapture: () => o.current = !0
    }
}

function Fo(e, t = globalThis ? .document) {
    const n = $(e),
        o = r.useRef(!1);
    return r.useEffect(() => {
        const s = a => {
            a.target && !o.current && mt(Oo, n, {
                originalEvent: a
            }, {
                discrete: !1
            })
        };
        return t.addEventListener("focusin", s), () => t.removeEventListener("focusin", s)
    }, [t, n]), {
        onFocusCapture: () => o.current = !0,
        onBlurCapture: () => o.current = !1
    }
}

function Ze() {
    const e = new CustomEvent(Ie);
    document.dispatchEvent(e)
}

function mt(e, t, n, {
    discrete: o
}) {
    const s = n.originalEvent.target,
        a = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && s.addEventListener(e, t, {
        once: !0
    }), o ? ut(s, a) : s.dispatchEvent(a)
}
var ge = 0,
    q = null;

function Lo() {
    r.useEffect(() => {
        q || (q = {
            start: qe(),
            end: qe()
        });
        const {
            start: e,
            end: t
        } = q;
        return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), ge++, () => {
            ge === 1 && (q ? .start.remove(), q ? .end.remove(), q = null), ge = Math.max(0, ge - 1)
        }
    }, [])
}

function qe() {
    const e = document.createElement("span");
    return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
}
var Me = "focusScope.autoFocusOnMount",
    Se = "focusScope.autoFocusOnUnmount",
    Je = {
        bubbles: !1,
        cancelable: !0
    },
    ko = "FocusScope",
    vt = r.forwardRef((e, t) => {
        const {
            loop: n = !1,
            trapped: o = !1,
            onMountAutoFocus: s,
            onUnmountAutoFocus: a,
            ...c
        } = e, [i, p] = r.useState(null), d = $(s), f = $(a), l = r.useRef(null), m = _(t, y => p(y)), v = r.useRef({
            paused: !1,
            pause() {
                this.paused = !0
            },
            resume() {
                this.paused = !1
            }
        }).current;
        r.useEffect(() => {
            if (o) {
                let y = function(C) {
                        if (v.paused || !i) return;
                        const M = C.target;
                        i.contains(M) ? l.current = M : W(l.current, {
                            select: !0
                        })
                    },
                    g = function(C) {
                        if (v.paused || !i) return;
                        const M = C.relatedTarget;
                        M !== null && (i.contains(M) || W(l.current, {
                            select: !0
                        }))
                    },
                    E = function(C) {
                        if (document.activeElement === document.body)
                            for (const M of C) M.removedNodes.length > 0 && W(i)
                    };
                document.addEventListener("focusin", y), document.addEventListener("focusout", g);
                const b = new MutationObserver(E);
                return i && b.observe(i, {
                    childList: !0,
                    subtree: !0
                }), () => {
                    document.removeEventListener("focusin", y), document.removeEventListener("focusout", g), b.disconnect()
                }
            }
        }, [o, i, v.paused]), r.useEffect(() => {
            if (i) {
                et.add(v);
                const y = document.activeElement;
                if (!i.contains(y)) {
                    const g = new CustomEvent(Me, Je);
                    i.addEventListener(Me, d), i.dispatchEvent(g), g.defaultPrevented || ($o(Wo(ht(i)), {
                        select: !0
                    }), document.activeElement === y && W(i))
                }
                return () => {
                    i.removeEventListener(Me, d), setTimeout(() => {
                        const g = new CustomEvent(Se, Je);
                        i.addEventListener(Se, f), i.dispatchEvent(g), g.defaultPrevented || W(y ? ? document.body, {
                            select: !0
                        }), i.removeEventListener(Se, f), et.remove(v)
                    }, 0)
                }
            }
        }, [i, d, f, v]);
        const h = r.useCallback(y => {
            if (!n && !o || v.paused) return;
            const g = y.key === "Tab" && !y.altKey && !y.ctrlKey && !y.metaKey,
                E = document.activeElement;
            if (g && E) {
                const b = y.currentTarget,
                    [C, M] = Uo(b);
                C && M ? !y.shiftKey && E === M ? (y.preventDefault(), n && W(C, {
                    select: !0
                })) : y.shiftKey && E === C && (y.preventDefault(), n && W(M, {
                    select: !0
                })) : E === b && y.preventDefault()
            }
        }, [n, o, v.paused]);
        return (0, u.jsx)(P.div, {
            tabIndex: -1,
            ...c,
            ref: m,
            onKeyDown: h
        })
    });
vt.displayName = ko;

function $o(e, {
    select: t = !1
} = {}) {
    const n = document.activeElement;
    for (const o of e)
        if (W(o, {
                select: t
            }), document.activeElement !== n) return
}

function Uo(e) {
    const t = ht(e);
    return [Qe(t, e), Qe(t.reverse(), e)]
}

function ht(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: o => {
                const s = o.tagName === "INPUT" && o.type === "hidden";
                return o.disabled || o.hidden || s ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
}

function Qe(e, t) {
    for (const n of e)
        if (!Ko(n, {
                upTo: t
            })) return n
}

function Ko(e, {
    upTo: t
}) {
    if (getComputedStyle(e).visibility === "hidden") return !0;
    for (; e;) {
        if (t !== void 0 && e === t) return !1;
        if (getComputedStyle(e).display === "none") return !0;
        e = e.parentElement
    }
    return !1
}

function Go(e) {
    return e instanceof HTMLInputElement && "select" in e
}

function W(e, {
    select: t = !1
} = {}) {
    if (e && e.focus) {
        const n = document.activeElement;
        e.focus({
            preventScroll: !0
        }), e !== n && Go(e) && t && e.select()
    }
}
var et = Bo();

function Bo() {
    let e = [];
    return {
        add(t) {
            const n = e[0];
            t !== n && n ? .pause(), e = tt(e, t), e.unshift(t)
        },
        remove(t) {
            e = tt(e, t), e[0] ? .resume()
        }
    }
}

function tt(e, t) {
    const n = [...e],
        o = n.indexOf(t);
    return o !== -1 && n.splice(o, 1), n
}

function Wo(e) {
    return e.filter(t => t.tagName !== "A")
}
var zo = globalThis ? .document ? r.useLayoutEffect : () => {},
    Vo = r[" useId ".trim().toString()] || (() => {}),
    Ho = 0;

function oe(e) {
    const [t, n] = r.useState(Vo());
    return zo(() => {
        e || n(o => o ? ? String(Ho++))
    }, [e]), e || (t ? `radix-${t}` : "")
}
var Yo = "Arrow",
    gt = r.forwardRef((e, t) => {
        const {
            children: n,
            width: o = 10,
            height: s = 5,
            ...a
        } = e;
        return (0, u.jsx)(P.svg, { ...a,
            ref: t,
            width: o,
            height: s,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild ? n : (0, u.jsx)("polygon", {
                points: "0,0 30,0 15,10"
            })
        })
    });
gt.displayName = Yo;
var Xo = gt,
    we = globalThis ? .document ? r.useLayoutEffect : () => {};

function Zo(e) {
    const [t, n] = r.useState(void 0);
    return we(() => {
        if (e) {
            n({
                width: e.offsetWidth,
                height: e.offsetHeight
            });
            const o = new ResizeObserver(s => {
                if (!Array.isArray(s) || !s.length) return;
                const a = s[0];
                let c, i;
                if ("borderBoxSize" in a) {
                    const p = a.borderBoxSize,
                        d = Array.isArray(p) ? p[0] : p;
                    c = d.inlineSize, i = d.blockSize
                } else c = e.offsetWidth, i = e.offsetHeight;
                n({
                    width: c,
                    height: i
                })
            });
            return o.observe(e, {
                box: "border-box"
            }), () => o.unobserve(e)
        } else n(void 0)
    }, [e]), t
}
var Te = "Popper",
    [yt, wt] = ae(Te),
    [qo, Et] = yt(Te),
    xt = e => {
        const {
            __scopePopper: t,
            children: n
        } = e, [o, s] = r.useState(null), [a, c] = r.useState(void 0);
        return (0, u.jsx)(qo, {
            scope: t,
            anchor: o,
            onAnchorChange: s,
            placementState: a,
            setPlacementState: c,
            children: n
        })
    };
xt.displayName = Te;
var bt = "PopperAnchor",
    Ct = r.forwardRef((e, t) => {
        const {
            __scopePopper: n,
            virtualRef: o,
            ...s
        } = e, a = Et(bt, n), c = r.useRef(null), i = a.onAnchorChange, p = _(t, r.useCallback(v => {
            c.current = v, v && i(v)
        }, [i])), d = r.useRef(null);
        r.useEffect(() => {
            if (!o) return;
            const v = d.current;
            d.current = o.current, v !== d.current && i(d.current)
        });
        const f = a.placementState && Fe(a.placementState),
            l = f ? .[0],
            m = f ? .[1];
        return o ? null : (0, u.jsx)(P.div, {
            "data-radix-popper-side": l,
            "data-radix-popper-align": m,
            ...s,
            ref: p
        })
    });
Ct.displayName = bt;
var je = "PopperContent",
    [Jo, Qo] = yt(je),
    Mt = r.forwardRef((e, t) => {
        const {
            __scopePopper: n,
            side: o = "bottom",
            sideOffset: s = 0,
            align: a = "center",
            alignOffset: c = 0,
            arrowPadding: i = 0,
            avoidCollisions: p = !0,
            collisionBoundary: d,
            collisionPadding: f = 0,
            sticky: l = "partial",
            hideWhenDetached: m = !1,
            updatePositionStrategy: v = "optimized",
            onPlaced: h,
            ...y
        } = e, g = Et(je, n), [E, b] = r.useState(null), C = _(t, te => b(te)), [M, j] = r.useState(null), N = Zo(M), S = N ? .width ? ? 0, R = N ? .height ? ? 0, D = o + (a !== "center" ? "-" + a : ""), F = typeof f == "number" ? f : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...f
        }, U = d ? Array.isArray(d) ? d : [d] : void 0, A = U !== void 0 && U.length > 0, V = {
            padding: F,
            boundary: U ? .filter(tr),
            altBoundary: A
        }, {
            refs: J,
            floatingStyles: fe,
            placement: Q,
            isPositioned: Y,
            middlewareData: O
        } = Kn({
            strategy: "fixed",
            placement: D,
            whileElementsMounted: (...te) => Bn(...te, {
                animationFrame: v === "always"
            }),
            elements: {
                reference: g.anchor
            },
            middleware: [Un({
                mainAxis: s + R,
                alignmentAxis: c
            }), p && zn({
                mainAxis: !0,
                crossAxis: !1,
                limiter: l === "partial" ? Gn() : void 0,
                ...V
            }), p && Wn({ ...V
            }), Hn({ ...V,
                apply: ({
                    elements: te,
                    rects: Nn,
                    availableWidth: An,
                    availableHeight: On
                }) => {
                    const {
                        width: Dn,
                        height: Tn
                    } = Nn.reference, me = te.floating.style;
                    me.setProperty("--radix-popper-available-width", `${An}px`), me.setProperty("--radix-popper-available-height", `${On}px`), me.setProperty("--radix-popper-anchor-width", `${Dn}px`), me.setProperty("--radix-popper-anchor-height", `${Tn}px`)
                }
            }), M && Yn({
                element: M,
                padding: i
            }), nr({
                arrowWidth: S,
                arrowHeight: R
            }), m && Vn({
                strategy: "referenceHidden",
                ...V
            })]
        }), w = g.setPlacementState;
        we(() => (w(Q), () => {
            w(void 0)
        }), [Q, w]);
        const [K, k] = Fe(Q), X = $(h);
        we(() => {
            Y && X ? .()
        }, [Y, X]);
        const ee = O.arrow ? .x,
            Z = O.arrow ? .y,
            B = O.arrow ? .centerOffset !== 0,
            [L, pe] = r.useState();
        return we(() => {
            E && pe(window.getComputedStyle(E).zIndex)
        }, [E]), (0, u.jsx)("div", {
            ref: J.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: { ...fe,
                transform: Y ? fe.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: L,
                "--radix-popper-transform-origin": [O.transformOrigin ? .x, O.transformOrigin ? .y].join(" "),
                ...O.hide ? .referenceHidden && {
                    visibility: "hidden",
                    pointerEvents: "none"
                }
            },
            dir: e.dir,
            children: (0, u.jsx)(Jo, {
                scope: n,
                placedSide: K,
                placedAlign: k,
                onArrowChange: j,
                arrowX: ee,
                arrowY: Z,
                shouldHideArrow: B,
                children: (0, u.jsx)(P.div, {
                    "data-side": K,
                    "data-align": k,
                    ...y,
                    ref: C,
                    style: { ...y.style,
                        animation: Y ? void 0 : "none"
                    }
                })
            })
        })
    });
Mt.displayName = je;
var St = "PopperArrow",
    er = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
    },
    Rt = r.forwardRef(function(t, n) {
        const {
            __scopePopper: o,
            ...s
        } = t, a = Qo(St, o), c = er[a.placedSide];
        return (0, u.jsx)("span", {
            ref: a.onArrowChange,
            style: {
                position: "absolute",
                left: a.arrowX,
                top: a.arrowY,
                [c]: 0,
                transformOrigin: {
                    top: "",
                    right: "0 0",
                    bottom: "center 0",
                    left: "100% 0"
                }[a.placedSide],
                transform: {
                    top: "translateY(100%)",
                    right: "translateY(50%) rotate(90deg) translateX(-50%)",
                    bottom: "rotate(180deg)",
                    left: "translateY(50%) rotate(-90deg) translateX(50%)"
                }[a.placedSide],
                visibility: a.shouldHideArrow ? "hidden" : void 0
            },
            children: (0, u.jsx)(Xo, { ...s,
                ref: n,
                style: { ...s.style,
                    display: "block"
                }
            })
        })
    });
Rt.displayName = St;

function tr(e) {
    return e !== null
}
var nr = e => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
        const {
            placement: n,
            rects: o,
            middlewareData: s
        } = t, a = s.arrow ? .centerOffset !== 0, c = a ? 0 : e.arrowWidth, i = a ? 0 : e.arrowHeight, [p, d] = Fe(n), f = {
            start: "0%",
            center: "50%",
            end: "100%"
        }[d], l = (s.arrow ? .x ? ? 0) + c / 2, m = (s.arrow ? .y ? ? 0) + i / 2;
        let v = "",
            h = "";
        return p === "bottom" ? (v = a ? f : `${l}px`, h = `${-i}px`) : p === "top" ? (v = a ? f : `${l}px`, h = `${o.floating.height+i}px`) : p === "right" ? (v = `${-i}px`, h = a ? f : `${m}px`) : p === "left" && (v = `${o.floating.width+i}px`, h = a ? f : `${m}px`), {
            data: {
                x: v,
                y: h
            }
        }
    }
});

function Fe(e) {
    const [t, n = "center"] = e.split("-");
    return [t, n]
}
var _t = xt,
    or = Ct,
    rr = Mt,
    sr = Rt,
    ar = globalThis ? .document ? r.useLayoutEffect : () => {},
    ir = "Portal",
    Pt = r.forwardRef((e, t) => {
        const {
            container: n,
            ...o
        } = e, [s, a] = r.useState(!1);
        ar(() => a(!0), []);
        const c = n || s && globalThis ? .document ? .body;
        return c ? ct.createPortal((0, u.jsx)(P.div, { ...o,
            ref: t
        }), c) : null
    });
Pt.displayName = ir;
var nt = globalThis ? .document ? r.useLayoutEffect : () => {};

function cr(e, t) {
    return r.useReducer((n, o) => t[n][o] ? ? n, e)
}
var ie = e => {
    const {
        present: t,
        children: n
    } = e, o = ur(t), s = typeof n == "function" ? n({
        present: o.isPresent
    }) : r.Children.only(n), a = lr(o.ref, dr(s));
    return typeof n == "function" || o.isPresent ? r.cloneElement(s, {
        ref: a
    }) : null
};
ie.displayName = "Presence";

function ur(e) {
    const [t, n] = r.useState(), o = r.useRef(null), s = r.useRef(e), a = r.useRef("none"), [c, i] = cr(e ? "mounted" : "unmounted", {
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
    return r.useEffect(() => {
        const p = ye(o.current);
        a.current = c === "mounted" ? p : "none"
    }, [c]), nt(() => {
        const p = o.current,
            d = s.current;
        if (d !== e) {
            const f = a.current,
                l = ye(p);
            e ? i("MOUNT") : l === "none" || p ? .display === "none" ? i("UNMOUNT") : i(d && f !== l ? "ANIMATION_OUT" : "UNMOUNT"), s.current = e
        }
    }, [e, i]), nt(() => {
        if (t) {
            let p;
            const d = t.ownerDocument.defaultView ? ? window,
                f = m => {
                    const v = ye(o.current).includes(CSS.escape(m.animationName));
                    if (m.target === t && v && (i("ANIMATION_END"), !s.current)) {
                        const h = t.style.animationFillMode;
                        t.style.animationFillMode = "forwards", p = d.setTimeout(() => {
                            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = h)
                        })
                    }
                },
                l = m => {
                    m.target === t && (a.current = ye(o.current))
                };
            return t.addEventListener("animationstart", l), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
                d.clearTimeout(p), t.removeEventListener("animationstart", l), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f)
            }
        } else i("ANIMATION_END")
    }, [t, i]), {
        isPresent: ["mounted", "unmountSuspended"].includes(c),
        ref: r.useCallback(p => {
            o.current = p ? getComputedStyle(p) : null, n(p)
        }, [])
    }
}

function ot(e, t) {
    if (typeof e == "function") return e(t);
    e != null && (e.current = t)
}

function lr(...e) {
    const t = r.useRef(e);
    return t.current = e, r.useCallback(n => {
        const o = t.current;
        let s = !1;
        const a = o.map(c => {
            const i = ot(c, n);
            return !s && typeof i == "function" && (s = !0), i
        });
        if (s) return () => {
            for (let c = 0; c < a.length; c++) {
                const i = a[c];
                typeof i == "function" ? i() : ot(o[c], null)
            }
        }
    }, [])
}

function ye(e) {
    return e ? .animationName || "none"
}

function dr(e) {
    let t = Object.getOwnPropertyDescriptor(e.props, "ref") ? .get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref") ? .get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
var Re = "rovingFocusGroup.onEntryFocus",
    fr = {
        bubbles: !1,
        cancelable: !0
    },
    ce = "RovingFocusGroup",
    [Ne, It, pr] = lt(ce),
    [mr, Nt] = ae(ce, [pr]),
    [vr, hr] = mr(ce),
    At = r.forwardRef((e, t) => (0, u.jsx)(Ne.Provider, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, u.jsx)(Ne.Slot, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, u.jsx)(gr, { ...e,
                ref: t
            })
        })
    }));
At.displayName = ce;
var gr = r.forwardRef((e, t) => {
        const {
            __scopeRovingFocusGroup: n,
            orientation: o,
            loop: s = !1,
            dir: a,
            currentTabStopId: c,
            defaultCurrentTabStopId: i,
            onCurrentTabStopIdChange: p,
            onEntryFocus: d,
            preventScrollOnEntryFocus: f = !1,
            ...l
        } = e, m = r.useRef(null), v = _(t, m), h = dt(a), [y, g] = it({
            prop: c,
            defaultProp: i ? ? null,
            onChange: p,
            caller: ce
        }), [E, b] = r.useState(!1), C = $(d), M = It(n), j = r.useRef(!1), [N, S] = r.useState(0);
        return r.useEffect(() => {
            const R = m.current;
            if (R) return R.addEventListener(Re, C), () => R.removeEventListener(Re, C)
        }, [C]), (0, u.jsx)(vr, {
            scope: n,
            orientation: o,
            dir: h,
            loop: s,
            currentTabStopId: y,
            onItemFocus: r.useCallback(R => g(R), [g]),
            onItemShiftTab: r.useCallback(() => b(!0), []),
            onFocusableItemAdd: r.useCallback(() => S(R => R + 1), []),
            onFocusableItemRemove: r.useCallback(() => S(R => R - 1), []),
            children: (0, u.jsx)(P.div, {
                tabIndex: E || N === 0 ? -1 : 0,
                "data-orientation": o,
                ...l,
                ref: v,
                style: {
                    outline: "none",
                    ...e.style
                },
                onMouseDown: x(e.onMouseDown, () => {
                    j.current = !0
                }),
                onFocus: x(e.onFocus, R => {
                    const D = !j.current;
                    if (R.target === R.currentTarget && D && !E) {
                        const F = new CustomEvent(Re, fr);
                        if (R.currentTarget.dispatchEvent(F), !F.defaultPrevented) {
                            const U = M().filter(A => A.focusable);
                            Tt([U.find(A => A.active), U.find(A => A.id === y), ...U].filter(Boolean).map(A => A.ref.current), f)
                        }
                    }
                    j.current = !1
                }),
                onBlur: x(e.onBlur, () => b(!1))
            })
        })
    }),
    Ot = "RovingFocusGroupItem",
    Dt = r.forwardRef((e, t) => {
        const {
            __scopeRovingFocusGroup: n,
            focusable: o = !0,
            active: s = !1,
            tabStopId: a,
            children: c,
            ...i
        } = e, p = oe(), d = a || p, f = hr(Ot, n), l = f.currentTabStopId === d, m = It(n), {
            onFocusableItemAdd: v,
            onFocusableItemRemove: h,
            currentTabStopId: y
        } = f;
        return r.useEffect(() => {
            if (o) return v(), () => h()
        }, [o, v, h]), (0, u.jsx)(Ne.ItemSlot, {
            scope: n,
            id: d,
            focusable: o,
            active: s,
            children: (0, u.jsx)(P.span, {
                tabIndex: l ? 0 : -1,
                "data-orientation": f.orientation,
                ...i,
                ref: t,
                onMouseDown: x(e.onMouseDown, g => {
                    o ? f.onItemFocus(d) : g.preventDefault()
                }),
                onFocus: x(e.onFocus, () => f.onItemFocus(d)),
                onKeyDown: x(e.onKeyDown, g => {
                    if (g.key === "Tab" && g.shiftKey) {
                        f.onItemShiftTab();
                        return
                    }
                    if (g.target !== g.currentTarget) return;
                    const E = Er(g, f.orientation, f.dir);
                    if (E !== void 0) {
                        if (g.metaKey || g.ctrlKey || g.altKey || g.shiftKey) return;
                        g.preventDefault();
                        let b = m().filter(C => C.focusable).map(C => C.ref.current);
                        if (E === "last") b.reverse();
                        else if (E === "prev" || E === "next") {
                            E === "prev" && b.reverse();
                            const C = b.indexOf(g.currentTarget);
                            b = f.loop ? xr(b, C + 1) : b.slice(C + 1)
                        }
                        setTimeout(() => Tt(b))
                    }
                }),
                children: typeof c == "function" ? c({
                    isCurrentTabStop: l,
                    hasTabStop: y != null
                }) : c
            })
        })
    });
Dt.displayName = Ot;
var yr = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
};

function wr(e, t) {
    return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e
}

function Er(e, t, n) {
    const o = wr(e.key, n);
    if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))) return yr[o]
}

function Tt(e, t = !1) {
    const n = document.activeElement;
    for (const o of e)
        if (o === n || (o.focus({
                preventScroll: t
            }), document.activeElement !== n)) return
}

function xr(e, t) {
    return e.map((n, o) => e[(t + o) % e.length])
}
var br = At,
    Cr = Dt,
    Ae = ["Enter", " "],
    Mr = ["ArrowDown", "PageUp", "Home"],
    jt = ["ArrowUp", "PageDown", "End"],
    Sr = [...Mr, ...jt],
    Rr = {
        ltr: [...Ae, "ArrowRight"],
        rtl: [...Ae, "ArrowLeft"]
    },
    _r = {
        ltr: ["ArrowLeft"],
        rtl: ["ArrowRight"]
    },
    ue = "Menu",
    [re, Pr, Ir] = lt(ue),
    [H, Ft] = ae(ue, [Ir, wt, Nt]),
    le = wt(),
    Lt = Nt(),
    [kt, z] = H(ue),
    [Nr, de] = H(ue),
    $t = e => {
        const {
            __scopeMenu: t,
            open: n = !1,
            children: o,
            dir: s,
            onOpenChange: a,
            modal: c = !0
        } = e, i = le(t), [p, d] = r.useState(null), f = r.useRef(!1), l = $(a), m = dt(s);
        return r.useEffect(() => {
            const v = () => {
                    f.current = !0, document.addEventListener("pointerdown", h, {
                        capture: !0,
                        once: !0
                    }), document.addEventListener("pointermove", h, {
                        capture: !0,
                        once: !0
                    })
                },
                h = () => f.current = !1;
            return document.addEventListener("keydown", v, {
                capture: !0
            }), () => {
                document.removeEventListener("keydown", v, {
                    capture: !0
                }), document.removeEventListener("pointerdown", h, {
                    capture: !0
                }), document.removeEventListener("pointermove", h, {
                    capture: !0
                })
            }
        }, []), (0, u.jsx)(_t, { ...i,
            children: (0, u.jsx)(kt, {
                scope: t,
                open: n,
                onOpenChange: l,
                content: p,
                onContentChange: d,
                children: (0, u.jsx)(Nr, {
                    scope: t,
                    onClose: r.useCallback(() => l(!1), [l]),
                    isUsingKeyboardRef: f,
                    dir: m,
                    modal: c,
                    children: o
                })
            })
        })
    };
$t.displayName = ue;
var Ar = "MenuAnchor",
    Le = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            ...o
        } = e, s = le(n);
        return (0, u.jsx)(or, { ...s,
            ...o,
            ref: t
        })
    });
Le.displayName = Ar;
var ke = "MenuPortal",
    [Or, Ut] = H(ke, {
        forceMount: void 0
    }),
    Kt = e => {
        const {
            __scopeMenu: t,
            forceMount: n,
            children: o,
            container: s
        } = e, a = z(ke, t);
        return (0, u.jsx)(Or, {
            scope: t,
            forceMount: n,
            children: (0, u.jsx)(ie, {
                present: n || a.open,
                children: (0, u.jsx)(Pt, {
                    asChild: !0,
                    container: s,
                    children: o
                })
            })
        })
    };
Kt.displayName = ke;
var T = "MenuContent",
    [Dr, $e] = H(T),
    Gt = r.forwardRef((e, t) => {
        const n = Ut(T, e.__scopeMenu),
            {
                forceMount: o = n.forceMount,
                ...s
            } = e,
            a = z(T, e.__scopeMenu),
            c = de(T, e.__scopeMenu);
        return (0, u.jsx)(re.Provider, {
            scope: e.__scopeMenu,
            children: (0, u.jsx)(ie, {
                present: o || a.open,
                children: (0, u.jsx)(re.Slot, {
                    scope: e.__scopeMenu,
                    children: c.modal ? (0, u.jsx)(Tr, { ...s,
                        ref: t
                    }) : (0, u.jsx)(jr, { ...s,
                        ref: t
                    })
                })
            })
        })
    }),
    Tr = r.forwardRef((e, t) => {
        const n = z(T, e.__scopeMenu),
            o = r.useRef(null),
            s = _(t, o);
        return r.useEffect(() => {
            const a = o.current;
            if (a) return Xn(a)
        }, []), (0, u.jsx)(Ue, { ...e,
            ref: s,
            trapFocus: n.open,
            disableOutsidePointerEvents: n.open,
            disableOutsideScroll: !0,
            onFocusOutside: x(e.onFocusOutside, a => a.preventDefault(), {
                checkForDefaultPrevented: !1
            }),
            onDismiss: () => n.onOpenChange(!1)
        })
    }),
    jr = r.forwardRef((e, t) => {
        const n = z(T, e.__scopeMenu);
        return (0, u.jsx)(Ue, { ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            onDismiss: () => n.onOpenChange(!1)
        })
    }),
    Fr = Pe("MenuContent.ScrollLock"),
    Ue = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            loop: o = !1,
            trapFocus: s,
            onOpenAutoFocus: a,
            onCloseAutoFocus: c,
            disableOutsidePointerEvents: i,
            onEntryFocus: p,
            onEscapeKeyDown: d,
            onPointerDownOutside: f,
            onFocusOutside: l,
            onInteractOutside: m,
            onDismiss: v,
            disableOutsideScroll: h,
            ...y
        } = e, g = z(T, n), E = de(T, n), b = le(n), C = Lt(n), M = Pr(n), [j, N] = r.useState(null), S = r.useRef(null), R = _(t, S, g.onContentChange), D = r.useRef(0), F = r.useRef(""), U = r.useRef(0), A = r.useRef(null), V = r.useRef("right"), J = r.useRef(0), fe = h ? Zn : r.Fragment, Q = h ? {
            as: Fr,
            allowPinchZoom: !0
        } : void 0, Y = w => {
            const K = F.current + w,
                k = M().filter(L => !L.disabled),
                X = document.activeElement,
                ee = k.find(L => L.ref.current === X) ? .textValue,
                Z = Xr(k.map(L => L.textValue), K, ee),
                B = k.find(L => L.textValue === Z) ? .ref.current;
            (function L(pe) {
                F.current = pe, window.clearTimeout(D.current), pe !== "" && (D.current = window.setTimeout(() => L(""), 1e3))
            })(K), B && setTimeout(() => B.focus())
        };
        r.useEffect(() => () => window.clearTimeout(D.current), []), Lo();
        const O = r.useCallback(w => V.current === A.current ? .side && qr(w, A.current ? .area), []);
        return (0, u.jsx)(Dr, {
            scope: n,
            searchRef: F,
            onItemEnter: r.useCallback(w => {
                O(w) && w.preventDefault()
            }, [O]),
            onItemLeave: r.useCallback(w => {
                O(w) || (S.current ? .focus(), N(null))
            }, [O]),
            onTriggerLeave: r.useCallback(w => {
                O(w) && w.preventDefault()
            }, [O]),
            pointerGraceTimerRef: U,
            onPointerGraceIntentChange: r.useCallback(w => {
                A.current = w
            }, []),
            children: (0, u.jsx)(fe, { ...Q,
                children: (0, u.jsx)(vt, {
                    asChild: !0,
                    trapped: s,
                    onMountAutoFocus: x(a, w => {
                        w.preventDefault(), S.current ? .focus({
                            preventScroll: !0
                        })
                    }),
                    onUnmountAutoFocus: c,
                    children: (0, u.jsx)(pt, {
                        asChild: !0,
                        disableOutsidePointerEvents: i,
                        onEscapeKeyDown: d,
                        onPointerDownOutside: f,
                        onFocusOutside: l,
                        onInteractOutside: m,
                        onDismiss: v,
                        children: (0, u.jsx)(br, {
                            asChild: !0,
                            ...C,
                            dir: E.dir,
                            orientation: "vertical",
                            loop: o,
                            currentTabStopId: j,
                            onCurrentTabStopIdChange: N,
                            onEntryFocus: x(p, w => {
                                E.isUsingKeyboardRef.current || w.preventDefault()
                            }),
                            preventScrollOnEntryFocus: !0,
                            children: (0, u.jsx)(rr, {
                                role: "menu",
                                "aria-orientation": "vertical",
                                "data-state": rn(g.open),
                                "data-radix-menu-content": "",
                                dir: E.dir,
                                ...b,
                                ...y,
                                ref: R,
                                style: {
                                    outline: "none",
                                    ...y.style
                                },
                                onKeyDown: x(y.onKeyDown, w => {
                                    const K = w.target.closest("[data-radix-menu-content]") === w.currentTarget,
                                        k = w.ctrlKey || w.altKey || w.metaKey,
                                        X = w.key.length === 1;
                                    K && (w.key === "Tab" && w.preventDefault(), !k && X && Y(w.key));
                                    const ee = S.current;
                                    if (w.target !== ee || !Sr.includes(w.key)) return;
                                    w.preventDefault();
                                    const Z = M().filter(B => !B.disabled).map(B => B.ref.current);
                                    jt.includes(w.key) && Z.reverse(), Hr(Z)
                                }),
                                onBlur: x(e.onBlur, w => {
                                    w.currentTarget.contains(w.target) || (window.clearTimeout(D.current), F.current = "")
                                }),
                                onPointerMove: x(e.onPointerMove, se(w => {
                                    const K = w.target,
                                        k = J.current !== w.clientX;
                                    w.currentTarget.contains(K) && k && (V.current = w.clientX > J.current ? "right" : "left", J.current = w.clientX)
                                }))
                            })
                        })
                    })
                })
            })
        })
    });
Gt.displayName = T;
var Lr = "MenuGroup",
    Ke = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            ...o
        } = e;
        return (0, u.jsx)(P.div, {
            role: "group",
            ...o,
            ref: t
        })
    });
Ke.displayName = Lr;
var kr = "MenuLabel",
    Bt = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            ...o
        } = e;
        return (0, u.jsx)(P.div, { ...o,
            ref: t
        })
    });
Bt.displayName = kr;
var Ee = "MenuItem",
    rt = "menu.itemSelect",
    be = r.forwardRef((e, t) => {
        const {
            disabled: n = !1,
            onSelect: o,
            ...s
        } = e, a = r.useRef(null), c = de(Ee, e.__scopeMenu), i = $e(Ee, e.__scopeMenu), p = _(t, a), d = r.useRef(!1), f = () => {
            const l = a.current;
            if (!n && l) {
                const m = new CustomEvent(rt, {
                    bubbles: !0,
                    cancelable: !0
                });
                l.addEventListener(rt, v => o ? .(v), {
                    once: !0
                }), ut(l, m), m.defaultPrevented ? d.current = !1 : c.onClose()
            }
        };
        return (0, u.jsx)(Wt, { ...s,
            ref: p,
            disabled: n,
            onClick: x(e.onClick, f),
            onPointerDown: l => {
                e.onPointerDown ? .(l), d.current = !0
            },
            onPointerUp: x(e.onPointerUp, l => {
                d.current || l.currentTarget ? .click()
            }),
            onKeyDown: x(e.onKeyDown, l => {
                const m = i.searchRef.current !== "";
                n || m && l.key === " " || Ae.includes(l.key) && (l.currentTarget.click(), l.preventDefault())
            })
        })
    });
be.displayName = Ee;
var Wt = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            disabled: o = !1,
            textValue: s,
            ...a
        } = e, c = $e(Ee, n), i = Lt(n), p = r.useRef(null), d = _(t, p), [f, l] = r.useState(!1), [m, v] = r.useState("");
        return r.useEffect(() => {
            const h = p.current;
            h && v((h.textContent ? ? "").trim())
        }, [a.children]), (0, u.jsx)(re.ItemSlot, {
            scope: n,
            disabled: o,
            textValue: s ? ? m,
            children: (0, u.jsx)(Cr, {
                asChild: !0,
                ...i,
                focusable: !o,
                children: (0, u.jsx)(P.div, {
                    role: "menuitem",
                    "data-highlighted": f ? "" : void 0,
                    "aria-disabled": o || void 0,
                    "data-disabled": o ? "" : void 0,
                    ...a,
                    ref: d,
                    onPointerMove: x(e.onPointerMove, se(h => {
                        o ? c.onItemLeave(h) : (c.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({
                            preventScroll: !0
                        }))
                    })),
                    onPointerLeave: x(e.onPointerLeave, se(h => c.onItemLeave(h))),
                    onFocus: x(e.onFocus, () => l(!0)),
                    onBlur: x(e.onBlur, () => l(!1))
                })
            })
        })
    }),
    $r = "MenuCheckboxItem",
    zt = r.forwardRef((e, t) => {
        const {
            checked: n = !1,
            onCheckedChange: o,
            ...s
        } = e;
        return (0, u.jsx)(Zt, {
            scope: e.__scopeMenu,
            checked: n,
            children: (0, u.jsx)(be, {
                role: "menuitemcheckbox",
                "aria-checked": xe(n) ? "mixed" : n,
                ...s,
                ref: t,
                "data-state": We(n),
                onSelect: x(s.onSelect, () => o ? .(xe(n) ? !0 : !n), {
                    checkForDefaultPrevented: !1
                })
            })
        })
    });
zt.displayName = $r;
var Vt = "MenuRadioGroup",
    [Ur, Kr] = H(Vt, {
        value: void 0,
        onValueChange: () => {}
    }),
    Ht = r.forwardRef((e, t) => {
        const {
            value: n,
            onValueChange: o,
            ...s
        } = e, a = $(o);
        return (0, u.jsx)(Ur, {
            scope: e.__scopeMenu,
            value: n,
            onValueChange: a,
            children: (0, u.jsx)(Ke, { ...s,
                ref: t
            })
        })
    });
Ht.displayName = Vt;
var Yt = "MenuRadioItem",
    Xt = r.forwardRef((e, t) => {
        const {
            value: n,
            ...o
        } = e, s = Kr(Yt, e.__scopeMenu), a = n === s.value;
        return (0, u.jsx)(Zt, {
            scope: e.__scopeMenu,
            checked: a,
            children: (0, u.jsx)(be, {
                role: "menuitemradio",
                "aria-checked": a,
                ...o,
                ref: t,
                "data-state": We(a),
                onSelect: x(o.onSelect, () => s.onValueChange ? .(n), {
                    checkForDefaultPrevented: !1
                })
            })
        })
    });
Xt.displayName = Yt;
var Ge = "MenuItemIndicator",
    [Zt, Gr] = H(Ge, {
        checked: !1
    }),
    qt = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            forceMount: o,
            ...s
        } = e, a = Gr(Ge, n);
        return (0, u.jsx)(ie, {
            present: o || xe(a.checked) || a.checked === !0,
            children: (0, u.jsx)(P.span, { ...s,
                ref: t,
                "data-state": We(a.checked)
            })
        })
    });
qt.displayName = Ge;
var Br = "MenuSeparator",
    Jt = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            ...o
        } = e;
        return (0, u.jsx)(P.div, {
            role: "separator",
            "aria-orientation": "horizontal",
            ...o,
            ref: t
        })
    });
Jt.displayName = Br;
var Wr = "MenuArrow",
    Qt = r.forwardRef((e, t) => {
        const {
            __scopeMenu: n,
            ...o
        } = e, s = le(n);
        return (0, u.jsx)(sr, { ...s,
            ...o,
            ref: t
        })
    });
Qt.displayName = Wr;
var Be = "MenuSub",
    [zr, en] = H(Be),
    Vr = e => {
        const {
            __scopeMenu: t,
            children: n,
            open: o = !1,
            onOpenChange: s
        } = e, a = z(Be, t), c = le(t), [i, p] = r.useState(null), [d, f] = r.useState(null), l = $(s);
        return r.useEffect(() => (a.open === !1 && l(!1), () => l(!1)), [a.open, l]), (0, u.jsx)(_t, { ...c,
            children: (0, u.jsx)(kt, {
                scope: t,
                open: o,
                onOpenChange: l,
                content: d,
                onContentChange: f,
                children: (0, u.jsx)(zr, {
                    scope: t,
                    contentId: oe(),
                    triggerId: oe(),
                    trigger: i,
                    onTriggerChange: p,
                    children: n
                })
            })
        })
    };
Vr.displayName = Be;
var ne = "MenuSubTrigger",
    tn = r.forwardRef((e, t) => {
        const n = z(ne, e.__scopeMenu),
            o = de(ne, e.__scopeMenu),
            s = en(ne, e.__scopeMenu),
            a = $e(ne, e.__scopeMenu),
            c = r.useRef(null),
            {
                pointerGraceTimerRef: i,
                onPointerGraceIntentChange: p
            } = a,
            d = {
                __scopeMenu: e.__scopeMenu
            },
            f = r.useCallback(() => {
                c.current && window.clearTimeout(c.current), c.current = null
            }, []);
        return r.useEffect(() => f, [f]), r.useEffect(() => {
            const l = i.current;
            return () => {
                window.clearTimeout(l), p(null)
            }
        }, [i, p]), (0, u.jsx)(Le, {
            asChild: !0,
            ...d,
            children: (0, u.jsx)(Wt, {
                id: s.triggerId,
                "aria-haspopup": "menu",
                "aria-expanded": n.open,
                "aria-controls": n.open ? s.contentId : void 0,
                "data-state": rn(n.open),
                ...e,
                ref: De(t, s.onTriggerChange),
                onClick: l => {
                    e.onClick ? .(l), !(e.disabled || l.defaultPrevented) && (l.currentTarget.focus(), n.open || n.onOpenChange(!0))
                },
                onPointerMove: x(e.onPointerMove, se(l => {
                    a.onItemEnter(l), !l.defaultPrevented && !e.disabled && !n.open && !c.current && (a.onPointerGraceIntentChange(null), c.current = window.setTimeout(() => {
                        n.onOpenChange(!0), f()
                    }, 100))
                })),
                onPointerLeave: x(e.onPointerLeave, se(l => {
                    f();
                    const m = n.content ? .getBoundingClientRect();
                    if (m) {
                        const v = n.content ? .dataset.side,
                            h = v === "right",
                            y = h ? -5 : 5,
                            g = m[h ? "left" : "right"],
                            E = m[h ? "right" : "left"];
                        a.onPointerGraceIntentChange({
                            area: [{
                                x: l.clientX + y,
                                y: l.clientY
                            }, {
                                x: g,
                                y: m.top
                            }, {
                                x: E,
                                y: m.top
                            }, {
                                x: E,
                                y: m.bottom
                            }, {
                                x: g,
                                y: m.bottom
                            }],
                            side: v
                        }), window.clearTimeout(i.current), i.current = window.setTimeout(() => a.onPointerGraceIntentChange(null), 300)
                    } else {
                        if (a.onTriggerLeave(l), l.defaultPrevented) return;
                        a.onPointerGraceIntentChange(null)
                    }
                })),
                onKeyDown: x(e.onKeyDown, l => {
                    const m = a.searchRef.current !== "";
                    e.disabled || m && l.key === " " || Rr[o.dir].includes(l.key) && (n.onOpenChange(!0), n.content ? .focus(), l.preventDefault())
                })
            })
        })
    });
tn.displayName = ne;
var nn = "MenuSubContent",
    on = r.forwardRef((e, t) => {
        const n = Ut(T, e.__scopeMenu),
            {
                forceMount: o = n.forceMount,
                align: s = "start",
                ...a
            } = e,
            c = z(T, e.__scopeMenu),
            i = de(T, e.__scopeMenu),
            p = en(nn, e.__scopeMenu),
            d = r.useRef(null),
            f = _(t, d);
        return (0, u.jsx)(re.Provider, {
            scope: e.__scopeMenu,
            children: (0, u.jsx)(ie, {
                present: o || c.open,
                children: (0, u.jsx)(re.Slot, {
                    scope: e.__scopeMenu,
                    children: (0, u.jsx)(Ue, {
                        id: p.contentId,
                        "aria-labelledby": p.triggerId,
                        ...a,
                        ref: f,
                        align: s,
                        side: i.dir === "rtl" ? "left" : "right",
                        disableOutsidePointerEvents: !1,
                        disableOutsideScroll: !1,
                        trapFocus: !1,
                        onOpenAutoFocus: l => {
                            i.isUsingKeyboardRef.current && d.current ? .focus(), l.preventDefault()
                        },
                        onCloseAutoFocus: l => l.preventDefault(),
                        onFocusOutside: x(e.onFocusOutside, l => {
                            l.target !== p.trigger && c.onOpenChange(!1)
                        }),
                        onEscapeKeyDown: x(e.onEscapeKeyDown, l => {
                            i.onClose(), l.preventDefault()
                        }),
                        onKeyDown: x(e.onKeyDown, l => {
                            const m = l.currentTarget.contains(l.target),
                                v = _r[i.dir].includes(l.key);
                            m && v && (c.onOpenChange(!1), p.trigger ? .focus(), l.preventDefault())
                        })
                    })
                })
            })
        })
    });
on.displayName = nn;

function rn(e) {
    return e ? "open" : "closed"
}

function xe(e) {
    return e === "indeterminate"
}

function We(e) {
    return xe(e) ? "indeterminate" : e ? "checked" : "unchecked"
}

function Hr(e) {
    const t = document.activeElement;
    for (const n of e)
        if (n === t || (n.focus(), document.activeElement !== t)) return
}

function Yr(e, t) {
    return e.map((n, o) => e[(t + o) % e.length])
}

function Xr(e, t, n) {
    const o = t.length > 1 && Array.from(t).every(i => i === t[0]) ? t[0] : t,
        s = n ? e.indexOf(n) : -1;
    let a = Yr(e, Math.max(s, 0));
    o.length === 1 && (a = a.filter(i => i !== n));
    const c = a.find(i => i.toLowerCase().startsWith(o.toLowerCase()));
    return c !== n ? c : void 0
}

function Zr(e, t) {
    const {
        x: n,
        y: o
    } = e;
    let s = !1;
    for (let a = 0, c = t.length - 1; a < t.length; c = a++) {
        const i = t[a],
            p = t[c],
            d = i.x,
            f = i.y,
            l = p.x,
            m = p.y;
        f > o != m > o && n < (l - d) * (o - f) / (m - f) + d && (s = !s)
    }
    return s
}

function qr(e, t) {
    return t ? Zr({
        x: e.clientX,
        y: e.clientY
    }, t) : !1
}

function se(e) {
    return t => t.pointerType === "mouse" ? e(t) : void 0
}
var Jr = $t,
    Qr = Le,
    es = Kt,
    ts = Gt,
    ns = Ke,
    os = Bt,
    rs = be,
    ss = zt,
    as = Ht,
    is = Xt,
    cs = qt,
    us = Jt,
    ls = Qt,
    ds = tn,
    fs = on,
    Ce = "DropdownMenu",
    [ps, ra] = ae(Ce, [Ft]),
    I = Ft(),
    [ms, sn] = ps(Ce),
    an = e => {
        const {
            __scopeDropdownMenu: t,
            children: n,
            dir: o,
            open: s,
            defaultOpen: a,
            onOpenChange: c,
            modal: i = !0
        } = e, p = I(t), d = r.useRef(null), [f, l] = it({
            prop: s,
            defaultProp: a ? ? !1,
            onChange: c,
            caller: Ce
        });
        return (0, u.jsx)(ms, {
            scope: t,
            triggerId: oe(),
            triggerRef: d,
            contentId: oe(),
            open: f,
            onOpenChange: l,
            onOpenToggle: r.useCallback(() => l(m => !m), [l]),
            modal: i,
            children: (0, u.jsx)(Jr, { ...p,
                open: f,
                onOpenChange: l,
                dir: o,
                modal: i,
                children: n
            })
        })
    };
an.displayName = Ce;
var cn = "DropdownMenuTrigger",
    un = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            disabled: o = !1,
            ...s
        } = e, a = sn(cn, n), c = I(n);
        return (0, u.jsx)(Qr, {
            asChild: !0,
            ...c,
            children: (0, u.jsx)(P.button, {
                type: "button",
                id: a.triggerId,
                "aria-haspopup": "menu",
                "aria-expanded": a.open,
                "aria-controls": a.open ? a.contentId : void 0,
                "data-state": a.open ? "open" : "closed",
                "data-disabled": o ? "" : void 0,
                disabled: o,
                ...s,
                ref: De(t, a.triggerRef),
                onPointerDown: x(e.onPointerDown, i => {
                    !o && i.button === 0 && i.ctrlKey === !1 && (a.onOpenToggle(), a.open || i.preventDefault())
                }),
                onKeyDown: x(e.onKeyDown, i => {
                    o || (["Enter", " "].includes(i.key) && a.onOpenToggle(), i.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault())
                })
            })
        })
    });
un.displayName = cn;
var vs = "DropdownMenuPortal",
    ln = e => {
        const {
            __scopeDropdownMenu: t,
            ...n
        } = e, o = I(t);
        return (0, u.jsx)(es, { ...o,
            ...n
        })
    };
ln.displayName = vs;
var dn = "DropdownMenuContent",
    fn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = sn(dn, n), a = I(n), c = r.useRef(!1);
        return (0, u.jsx)(ts, {
            id: s.contentId,
            "aria-labelledby": s.triggerId,
            ...a,
            ...o,
            ref: t,
            onCloseAutoFocus: x(e.onCloseAutoFocus, i => {
                c.current || s.triggerRef.current ? .focus(), c.current = !1, i.preventDefault()
            }),
            onInteractOutside: x(e.onInteractOutside, i => {
                const p = i.detail.originalEvent,
                    d = p.button === 0 && p.ctrlKey === !0,
                    f = p.button === 2 || d;
                (!s.modal || f) && (c.current = !0)
            }),
            style: { ...e.style,
                "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
        })
    });
fn.displayName = dn;
var hs = "DropdownMenuGroup",
    gs = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(ns, { ...s,
            ...o,
            ref: t
        })
    });
gs.displayName = hs;
var ys = "DropdownMenuLabel",
    pn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(os, { ...s,
            ...o,
            ref: t
        })
    });
pn.displayName = ys;
var ws = "DropdownMenuItem",
    mn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(rs, { ...s,
            ...o,
            ref: t
        })
    });
mn.displayName = ws;
var Es = "DropdownMenuCheckboxItem",
    vn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(ss, { ...s,
            ...o,
            ref: t
        })
    });
vn.displayName = Es;
var xs = "DropdownMenuRadioGroup",
    bs = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(as, { ...s,
            ...o,
            ref: t
        })
    });
bs.displayName = xs;
var Cs = "DropdownMenuRadioItem",
    hn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(is, { ...s,
            ...o,
            ref: t
        })
    });
hn.displayName = Cs;
var Ms = "DropdownMenuItemIndicator",
    gn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(cs, { ...s,
            ...o,
            ref: t
        })
    });
gn.displayName = Ms;
var Ss = "DropdownMenuSeparator",
    yn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(us, { ...s,
            ...o,
            ref: t
        })
    });
yn.displayName = Ss;
var Rs = "DropdownMenuArrow",
    _s = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(ls, { ...s,
            ...o,
            ref: t
        })
    });
_s.displayName = Rs;
var Ps = "DropdownMenuSubTrigger",
    wn = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(ds, { ...s,
            ...o,
            ref: t
        })
    });
wn.displayName = Ps;
var Is = "DropdownMenuSubContent",
    En = r.forwardRef((e, t) => {
        const {
            __scopeDropdownMenu: n,
            ...o
        } = e, s = I(n);
        return (0, u.jsx)(fs, { ...s,
            ...o,
            ref: t,
            style: { ...e.style,
                "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
                "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
                "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
        })
    });
En.displayName = Is;
var Ns = an,
    As = un,
    Os = ln,
    xn = fn,
    bn = pn,
    Cn = mn,
    Mn = vn,
    Sn = hn,
    Rn = gn,
    _n = yn,
    Pn = wn,
    In = En,
    sa = Ns,
    aa = As,
    Ds = r.forwardRef(({
        className: e,
        inset: t,
        children: n,
        ...o
    }, s) => (0, u.jsxs)(Pn, {
        ref: s,
        className: G("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", t && "pl-8", e),
        ...o,
        children: [n, (0, u.jsx)(kn, {
            className: "ml-auto"
        })]
    }));
Ds.displayName = Pn.displayName;
var Ts = r.forwardRef(({
    className: e,
    ...t
}, n) => (0, u.jsx)(In, {
    ref: n,
    className: G("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", e),
    ...t
}));
Ts.displayName = In.displayName;
var js = r.forwardRef(({
    className: e,
    sideOffset: t = 4,
    ...n
}, o) => (0, u.jsx)(Os, {
    children: (0, u.jsx)(xn, {
        ref: o,
        sideOffset: t,
        className: G("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", e),
        ...n
    })
}));
js.displayName = xn.displayName;
var Fs = r.forwardRef(({
    className: e,
    inset: t,
    ...n
}, o) => (0, u.jsx)(Cn, {
    ref: o,
    className: G("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", t && "pl-8", e),
    ...n
}));
Fs.displayName = Cn.displayName;
var Ls = r.forwardRef(({
    className: e,
    children: t,
    checked: n,
    ...o
}, s) => (0, u.jsxs)(Mn, {
    ref: s,
    className: G("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
    checked: n,
    ...o,
    children: [(0, u.jsx)("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: (0, u.jsx)(Rn, {
            children: (0, u.jsx)(Jn, {
                className: "h-4 w-4"
            })
        })
    }), t]
}));
Ls.displayName = Mn.displayName;
var ks = r.forwardRef(({
    className: e,
    children: t,
    ...n
}, o) => (0, u.jsxs)(Sn, {
    ref: o,
    className: G("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
    ...n,
    children: [(0, u.jsx)("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: (0, u.jsx)(Rn, {
            children: (0, u.jsx)($n, {
                className: "h-2 w-2 fill-current"
            })
        })
    }), t]
}));
ks.displayName = Sn.displayName;
var $s = r.forwardRef(({
    className: e,
    inset: t,
    ...n
}, o) => (0, u.jsx)(bn, {
    ref: o,
    className: G("px-2 py-1.5 text-sm font-semibold", t && "pl-8", e),
    ...n
}));
$s.displayName = bn.displayName;
var Us = r.forwardRef(({
    className: e,
    ...t
}, n) => (0, u.jsx)(_n, {
    ref: n,
    className: G("-mx-1 my-1 h-px bg-muted", e),
    ...t
}));
Us.displayName = _n.displayName;
var Ks = ({
    className: e,
    ...t
}) => (0, u.jsx)("span", {
    className: G("ml-auto text-xs tracking-widest opacity-60", e),
    ...t
});
Ks.displayName = "DropdownMenuShortcut";
async function st() {
    try {
        const e = await Qn({
            data: {}
        });
        return e ? .blocked ? (await _e.auth.signOut(), qn.error(e.message ? ? "Access from your network has been blocked."), !0) : !1
    } catch {
        return !1
    }
}

function ia() {
    (0, r.useEffect)(() => {
        let e = !0;
        _e.auth.getUser().then(async ({
            data: n
        }) => {
            !e || !n.user || await st() || ze(n.user).catch(() => {})
        });
        const {
            data: t
        } = _e.auth.onAuthStateChange(async (n, o) => {
            n !== "SIGNED_IN" || !o ? .user || await st() || ze(o.user).catch(() => {})
        });
        return () => {
            e = !1, t.subscription.unsubscribe()
        }
    }, [])
}
export {
    $s as a, na as c, Fs as i, ta as l, sa as n, Us as o, js as r, aa as s, ia as t, ea as u
};