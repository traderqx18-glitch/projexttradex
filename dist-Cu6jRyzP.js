import {
    i as H,
    t as Y
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as J
} from "./react-D8T8de5F.js";
import {
    t as Q
} from "./react-dom-CyvodVTt.js";
import {
    n as x
} from "./dist-BGr8f1uC.js";
import {
    a as C,
    i as F,
    l as w,
    o as Z,
    r as $
} from "./dist-iN9wdwzB.js";
var o = H(J(), 1);

function ee(e, t = globalThis ?.document) {
    const n = F(e);
    o.useEffect(() => {
        const s = i => {
            i.key === "Escape" && n(i)
        };
        return t.addEventListener("keydown", s, {
            capture: !0
        }), () => t.removeEventListener("keydown", s, {
            capture: !0
        })
    }, [n, t])
}
var T = Y(),
    te = "DismissableLayer",
    A = "dismissableLayer.update",
    ne = "dismissableLayer.pointerDownOutside",
    se = "dismissableLayer.focusOutside",
    U, q = o.createContext({
        layers: new Set,
        layersWithOutsidePointerEventsDisabled: new Set,
        branches: new Set
    }),
    re = o.forwardRef((e, t) => {
        const {
            disableOutsidePointerEvents: n = !1,
            onEscapeKeyDown: s,
            onPointerDownOutside: i,
            onFocusOutside: c,
            onInteractOutside: p,
            onDismiss: r,
            ...P
        } = e, a = o.useContext(q), [l, L] = o.useState(null), y = l ?.ownerDocument ?? globalThis ?.document, [, v] = o.useState({}), D = x(t, d => L(d)), u = Array.from(a.layers), [m] = [...a.layersWithOutsidePointerEventsDisabled].slice(-1), b = u.indexOf(m), h = l ? u.indexOf(l) : -1, E = a.layersWithOutsidePointerEventsDisabled.size > 0, f = h >= b, V = ue(d => {
            const g = d.target,
                S = [...a.branches].some(X => X.contains(g));
            !f || S || (i ?.(d), p ?.(d), d.defaultPrevented || r ?.())
        }, y), I = ae(d => {
            const g = d.target;
            [...a.branches].some(S => S.contains(g)) || (c ?.(d), p ?.(d), d.defaultPrevented || r ?.())
        }, y);
        return ee(d => {
            h === a.layers.size - 1 && (s ?.(d), !d.defaultPrevented && r && (d.preventDefault(), r()))
        }, y), o.useEffect(() => {
            if (l) return n && (a.layersWithOutsidePointerEventsDisabled.size === 0 && (U = y.body.style.pointerEvents, y.body.style.pointerEvents = "none"), a.layersWithOutsidePointerEventsDisabled.add(l)), a.layers.add(l), k(), () => {
                n && a.layersWithOutsidePointerEventsDisabled.size === 1 && (y.body.style.pointerEvents = U)
            }
        }, [l, y, n, a]), o.useEffect(() => () => {
            l && (a.layers.delete(l), a.layersWithOutsidePointerEventsDisabled.delete(l), k())
        }, [l, a]), o.useEffect(() => {
            const d = () => v({});
            return document.addEventListener(A, d), () => document.removeEventListener(A, d)
        }, []), (0, T.jsx)(C.div, { ...P,
            ref: D,
            style: {
                pointerEvents: E ? f ? "auto" : "none" : void 0,
                ...e.style
            },
            onFocusCapture: w(e.onFocusCapture, I.onFocusCapture),
            onBlurCapture: w(e.onBlurCapture, I.onBlurCapture),
            onPointerDownCapture: w(e.onPointerDownCapture, V.onPointerDownCapture)
        })
    });
re.displayName = te;
var oe = "DismissableLayerBranch",
    ie = o.forwardRef((e, t) => {
        const n = o.useContext(q),
            s = o.useRef(null),
            i = x(t, s);
        return o.useEffect(() => {
            const c = s.current;
            if (c) return n.branches.add(c), () => {
                n.branches.delete(c)
            }
        }, [n.branches]), (0, T.jsx)(C.div, { ...e,
            ref: i
        })
    });
ie.displayName = oe;

function ue(e, t = globalThis ?.document) {
    const n = F(e),
        s = o.useRef(!1),
        i = o.useRef(() => {});
    return o.useEffect(() => {
        const c = r => {
                if (r.target && !s.current) {
                    let P = function() {
                        z(ne, n, a, {
                            discrete: !0
                        })
                    };
                    const a = {
                        originalEvent: r
                    };
                    r.pointerType === "touch" ? (t.removeEventListener("click", i.current), i.current = P, t.addEventListener("click", i.current, {
                        once: !0
                    })) : P()
                } else t.removeEventListener("click", i.current);
                s.current = !1
            },
            p = window.setTimeout(() => {
                t.addEventListener("pointerdown", c)
            }, 0);
        return () => {
            window.clearTimeout(p), t.removeEventListener("pointerdown", c), t.removeEventListener("click", i.current)
        }
    }, [t, n]), {
        onPointerDownCapture: () => s.current = !0
    }
}

function ae(e, t = globalThis ?.document) {
    const n = F(e),
        s = o.useRef(!1);
    return o.useEffect(() => {
        const i = c => {
            c.target && !s.current && z(se, n, {
                originalEvent: c
            }, {
                discrete: !1
            })
        };
        return t.addEventListener("focusin", i), () => t.removeEventListener("focusin", i)
    }, [t, n]), {
        onFocusCapture: () => s.current = !0,
        onBlurCapture: () => s.current = !1
    }
}

function k() {
    const e = new CustomEvent(A);
    document.dispatchEvent(e)
}

function z(e, t, n, {
    discrete: s
}) {
    const i = n.originalEvent.target,
        c = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && i.addEventListener(e, t, {
        once: !0
    }), s ? Z(i, c) : i.dispatchEvent(c)
}
var N = 0;

function Te() {
    o.useEffect(() => {
        const e = document.querySelectorAll("[data-radix-focus-guard]");
        return document.body.insertAdjacentElement("afterbegin", e[0] ?? M()), document.body.insertAdjacentElement("beforeend", e[1] ?? M()), N++, () => {
            N === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach(t => t.remove()), N--
        }
    }, [])
}

function M() {
    const e = document.createElement("span");
    return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
}
var _ = "focusScope.autoFocusOnMount",
    R = "focusScope.autoFocusOnUnmount",
    K = {
        bubbles: !1,
        cancelable: !0
    },
    ce = "FocusScope",
    de = o.forwardRef((e, t) => {
        const {
            loop: n = !1,
            trapped: s = !1,
            onMountAutoFocus: i,
            onUnmountAutoFocus: c,
            ...p
        } = e, [r, P] = o.useState(null), a = F(i), l = F(c), L = o.useRef(null), y = x(t, u => P(u)), v = o.useRef({
            paused: !1,
            pause() {
                this.paused = !0
            },
            resume() {
                this.paused = !1
            }
        }).current;
        o.useEffect(() => {
            if (s) {
                let u = function(E) {
                        if (v.paused || !r) return;
                        const f = E.target;
                        r.contains(f) ? L.current = f : O(L.current, {
                            select: !0
                        })
                    },
                    m = function(E) {
                        if (v.paused || !r) return;
                        const f = E.relatedTarget;
                        f !== null && (r.contains(f) || O(L.current, {
                            select: !0
                        }))
                    },
                    b = function(E) {
                        if (document.activeElement === document.body)
                            for (const f of E) f.removedNodes.length > 0 && O(r)
                    };
                document.addEventListener("focusin", u), document.addEventListener("focusout", m);
                const h = new MutationObserver(b);
                return r && h.observe(r, {
                    childList: !0,
                    subtree: !0
                }), () => {
                    document.removeEventListener("focusin", u), document.removeEventListener("focusout", m), h.disconnect()
                }
            }
        }, [s, r, v.paused]), o.useEffect(() => {
            if (r) {
                B.add(v);
                const u = document.activeElement;
                if (!r.contains(u)) {
                    const m = new CustomEvent(_, K);
                    r.addEventListener(_, a), r.dispatchEvent(m), m.defaultPrevented || (le(pe(G(r)), {
                        select: !0
                    }), document.activeElement === u && O(r))
                }
                return () => {
                    r.removeEventListener(_, a), setTimeout(() => {
                        const m = new CustomEvent(R, K);
                        r.addEventListener(R, l), r.dispatchEvent(m), m.defaultPrevented || O(u ?? document.body, {
                            select: !0
                        }), r.removeEventListener(R, l), B.remove(v)
                    }, 0)
                }
            }
        }, [r, a, l, v]);
        const D = o.useCallback(u => {
            if (!n && !s || v.paused) return;
            const m = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey,
                b = document.activeElement;
            if (m && b) {
                const h = u.currentTarget,
                    [E, f] = fe(h);
                E && f ? !u.shiftKey && b === f ? (u.preventDefault(), n && O(E, {
                    select: !0
                })) : u.shiftKey && b === E && (u.preventDefault(), n && O(f, {
                    select: !0
                })) : b === h && u.preventDefault()
            }
        }, [n, s, v.paused]);
        return (0, T.jsx)(C.div, {
            tabIndex: -1,
            ...p,
            ref: y,
            onKeyDown: D
        })
    });
de.displayName = ce;

function le(e, {
    select: t = !1
} = {}) {
    const n = document.activeElement;
    for (const s of e)
        if (O(s, {
                select: t
            }), document.activeElement !== n) return
}

function fe(e) {
    const t = G(e);
    return [W(t, e), W(t.reverse(), e)]
}

function G(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: s => {
                const i = s.tagName === "INPUT" && s.type === "hidden";
                return s.disabled || s.hidden || i ? NodeFilter.FILTER_SKIP : s.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
}

function W(e, t) {
    for (const n of e)
        if (!me(n, {
                upTo: t
            })) return n
}

function me(e, {
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

function Ee(e) {
    return e instanceof HTMLInputElement && "select" in e
}

function O(e, {
    select: t = !1
} = {}) {
    if (e && e.focus) {
        const n = document.activeElement;
        e.focus({
            preventScroll: !0
        }), e !== n && Ee(e) && t && e.select()
    }
}
var B = ve();

function ve() {
    let e = [];
    return {
        add(t) {
            const n = e[0];
            t !== n && n ?.pause(), e = j(e, t), e.unshift(t)
        },
        remove(t) {
            e = j(e, t), e[0] ?.resume()
        }
    }
}

function j(e, t) {
    const n = [...e],
        s = n.indexOf(t);
    return s !== -1 && n.splice(s, 1), n
}

function pe(e) {
    return e.filter(t => t.tagName !== "A")
}
var ye = H(Q(), 1),
    be = "Portal",
    he = o.forwardRef((e, t) => {
        const {
            container: n,
            ...s
        } = e, [i, c] = o.useState(!1);
        $(() => c(!0), []);
        const p = n || i && globalThis ?.document ?.body;
        return p ? ye.createPortal((0, T.jsx)(C.div, { ...s,
            ref: t
        }), p) : null
    });
he.displayName = be;
export {
    re as i, de as n, Te as r, he as t
};