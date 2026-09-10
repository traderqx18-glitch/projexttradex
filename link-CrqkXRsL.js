import {
    i as me,
    t as Ae
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as Ce
} from "./react-D8T8de5F.js";
import {
    t as Ie
} from "./react-dom-CyvodVTt.js";
import {
    A as R,
    O as H,
    T as ie,
    k as ce,
    l as D,
    o as le,
    r as Oe,
    t as Ee
} from "./useStore-DxikiEK4.js";
import {
    n as Re,
    r as we
} from "./utils-By9ITnTw.js";
import {
    t as Ne
} from "./useRouter-DuDv8g77.js";
var h = me(Ce(), 1),
    rt = Ae(),
    Me = me(Ie(), 1);

function He(t, v) {
    const e = Ne(),
        l = Re(v),
        Y = !1,
        {
            activeProps: x,
            inactiveProps: A,
            activeOptions: f,
            to: s,
            preload: ve,
            preloadDelay: ye,
            preloadIntentProximity: je,
            hashScrollIntoView: _e,
            replace: ge,
            startTransition: Se,
            resetScroll: Te,
            viewTransition: xe,
            children: g,
            target: p,
            disabled: n,
            style: y,
            className: _,
            onClick: U,
            onBlur: B,
            onFocus: j,
            onMouseEnter: q,
            onMouseLeave: K,
            onTouchStart: W,
            ignoreBlocker: be,
            params: qe,
            search: Ke,
            hash: We,
            state: Fe,
            mask: $e,
            reloadDocument: Ve,
            unsafeRelative: Je,
            from: ze,
            _fromLocation: Ge,
            ...b
        } = t;
    if (Y) {
        const a = pe(s);
        if (typeof s == "string" && !a && s.indexOf(":") > -1) try {
            return new URL(s), R(s, e.protocolAllowlist) ? { ...b,
                ref: l,
                href: void 0,
                ...g && {
                    children: g
                },
                ...p && {
                    target: p
                },
                ...n && {
                    disabled: n
                },
                ...y && {
                    style: y
                },
                ..._ && {
                    className: _
                }
            } : { ...b,
                ref: l,
                href: s,
                ...g && {
                    children: g
                },
                ...p && {
                    target: p
                },
                ...n && {
                    disabled: n
                },
                ...y && {
                    style: y
                },
                ..._ && {
                    className: _
                }
            }
        } catch {}
        const r = e.buildLocation({ ...t,
                from: t.from
            }),
            m = he(r.maskedLocation ? r.maskedLocation.publicHref : r.publicHref, r.maskedLocation ? r.maskedLocation.external : r.external, e.history, n),
            E = (() => {
                if (m ? .external) return R(m.href, e.protocolAllowlist) ? void 0 : m.href;
                if (!a && typeof s == "string" && s.indexOf(":") > -1) try {
                    return new URL(s), R(s, e.protocolAllowlist) ? void 0 : s
                } catch {}
            })(),
            J = (() => {
                if (E) return !1;
                const o = e.stores.location.get(),
                    u = f ? .exact ? ? !1;
                if (u) {
                    if (!le(o.pathname, r.pathname, e.basepath)) return !1
                } else {
                    const i = D(o.pathname, e.basepath),
                        d = D(r.pathname, e.basepath);
                    if (!(i.startsWith(d) && (i.length === d.length || i[d.length] === "/"))) return !1
                }
                if ((f ? .includeSearch ? ? !0) && o.search !== r.search) {
                    const i = !o.search || typeof o.search == "object" && !ce(o.search),
                        d = !r.search || typeof r.search == "object" && !ce(r.search);
                    if (!(i && d) && !ie(o.search, r.search, {
                            partial: !u,
                            ignoreUndefined: !f ? .explicitUndefined
                        })) return !1
                }
                return !f ? .includeHash
            })();
        if (E) return { ...b,
            ref: l,
            href: E,
            ...g && {
                children: g
            },
            ...p && {
                target: p
            },
            ...n && {
                disabled: n
            },
            ...y && {
                style: y
            },
            ..._ && {
                className: _
            }
        };
        const z = J ? H(x, {}) ? ? fe : L,
            G = J ? L : H(A, {}) ? ? L,
            se = (() => {
                const o = y,
                    u = z.style,
                    i = G.style;
                if (!(!o && !u && !i)) return o && !u && !i ? o : !o && u && !i ? u : !o && !u && i ? i : { ...o,
                    ...u,
                    ...i
                }
            })(),
            oe = (() => {
                const o = _,
                    u = z.className,
                    i = G.className;
                if (!o && !u && !i) return "";
                let d = "";
                return o && (d = o), u && (d = d ? `${d} ${u}` : u), i && (d = d ? `${d} ${i}` : i), d
            })();
        return { ...b,
            ...z,
            ...G,
            href: m ? .href,
            ref: l,
            disabled: !!n,
            target: p,
            ...se && {
                style: se
            },
            ...oe && {
                className: oe
            },
            ...n && ue,
            ...J && de
        }
    }
    const F = Oe(),
        C = h.useMemo(() => t, [e, t.from, t._fromLocation, t.hash, t.to, t.search, t.params, t.state, t.mask, t.unsafeRelative]),
        S = Ee(e.stores.location, a => a, (a, r) => a.href === r.href),
        c = h.useMemo(() => {
            const a = {
                _fromLocation: S,
                ...C
            };
            return e.buildLocation(a)
        }, [e, S, C]),
        Q = c.maskedLocation ? c.maskedLocation.publicHref : c.publicHref,
        X = c.maskedLocation ? c.maskedLocation.external : c.external,
        I = h.useMemo(() => he(Q, X, e.history, n), [n, X, Q, e.history]),
        O = h.useMemo(() => {
            if (I ? .external) return R(I.href, e.protocolAllowlist) ? void 0 : I.href;
            if (!pe(s) && !(typeof s != "string" || s.indexOf(":") === -1)) try {
                return new URL(s), R(s, e.protocolAllowlist) ? void 0 : s
            } catch {}
        }, [s, I, e.protocolAllowlist]),
        $ = h.useMemo(() => {
            if (O) return !1;
            if (f ? .exact) {
                if (!le(S.pathname, c.pathname, e.basepath)) return !1
            } else {
                const a = D(S.pathname, e.basepath),
                    r = D(c.pathname, e.basepath);
                if (!(a.startsWith(r) && (a.length === r.length || a[r.length] === "/"))) return !1
            }
            return (f ? .includeSearch ? ? !0) && !ie(S.search, c.search, {
                partial: !f ? .exact,
                ignoreUndefined: !f ? .explicitUndefined
            }) ? !1 : f ? .includeHash ? F && S.hash === c.hash : !0
        }, [f ? .exact, f ? .explicitUndefined, f ? .includeHash, f ? .includeSearch, S, O, F, c.hash, c.pathname, c.search, e.basepath]),
        N = $ ? H(x, {}) ? ? fe : L,
        M = $ ? L : H(A, {}) ? ? L,
        Z = [_, N.className, M.className].filter(Boolean).join(" "),
        ee = (y || N.style || M.style) && { ...y,
            ...N.style,
            ...M.style
        },
        [Pe, te] = h.useState(!1),
        re = h.useRef(!1),
        P = t.reloadDocument || O ? !1 : ve ? ? e.options.defaultPreload,
        V = ye ? ? e.options.defaultPreloadDelay ? ? 0,
        T = h.useCallback(() => {
            e.preloadRoute({ ...C,
                _builtLocation: c
            }).catch(a => {})
        }, [e, C, c]);
    we(l, h.useCallback(a => {
        a ? .isIntersecting && T()
    }, [T]), Ue, {
        disabled: !!n || P !== "viewport"
    }), h.useEffect(() => {
        re.current || !n && P === "render" && (T(), re.current = !0)
    }, [n, T, P]);
    const Le = a => {
        const r = a.currentTarget.getAttribute("target"),
            m = p !== void 0 ? p : r;
        if (!n && !Be(a) && !a.defaultPrevented && (!m || m === "_self") && a.button === 0) {
            a.preventDefault(), (0, Me.flushSync)(() => {
                te(!0)
            });
            const E = e.subscribe("onResolved", () => {
                E(), te(!1)
            });
            e.navigate({ ...C,
                replace: ge,
                resetScroll: Te,
                hashScrollIntoView: _e,
                startTransition: Se,
                viewTransition: xe,
                ignoreBlocker: be
            })
        }
    };
    if (O) return { ...b,
        ref: l,
        href: O,
        ...g && {
            children: g
        },
        ...p && {
            target: p
        },
        ...n && {
            disabled: n
        },
        ...y && {
            style: y
        },
        ..._ && {
            className: _
        },
        ...U && {
            onClick: U
        },
        ...B && {
            onBlur: B
        },
        ...j && {
            onFocus: j
        },
        ...q && {
            onMouseEnter: q
        },
        ...K && {
            onMouseLeave: K
        },
        ...W && {
            onTouchStart: W
        }
    };
    const ae = a => {
            if (n || P !== "intent") return;
            if (!V) {
                T();
                return
            }
            const r = a.currentTarget;
            if (w.has(r)) return;
            const m = setTimeout(() => {
                w.delete(r), T()
            }, V);
            w.set(r, m)
        },
        ke = a => {
            n || P !== "intent" || T()
        },
        ne = a => {
            if (n || !P || !V) return;
            const r = a.currentTarget,
                m = w.get(r);
            m && (clearTimeout(m), w.delete(r))
        };
    return { ...b,
        ...N,
        ...M,
        href: I ? .href,
        ref: l,
        onClick: k([U, Le]),
        onBlur: k([B, ne]),
        onFocus: k([j, ae]),
        onMouseEnter: k([q, ae]),
        onMouseLeave: k([K, ne]),
        onTouchStart: k([W, ke]),
        disabled: !!n,
        target: p,
        ...ee && {
            style: ee
        },
        ...Z && {
            className: Z
        },
        ...n && ue,
        ...$ && de,
        ...F && Pe && De
    }
}
var L = {},
    fe = {
        className: "active"
    },
    ue = {
        role: "link",
        "aria-disabled": !0
    },
    de = {
        "data-status": "active",
        "aria-current": "page"
    },
    De = {
        "data-transitioning": "transitioning"
    },
    w = new WeakMap,
    Ue = {
        rootMargin: "100px"
    },
    k = t => v => {
        for (const e of t)
            if (e) {
                if (v.defaultPrevented) return;
                e(v)
            }
    };

function he(t, v, e, l) {
    if (!l) return v ? {
        href: t,
        external: !0
    } : {
        href: e.createHref(t) || "/",
        external: !1
    }
}

function pe(t) {
    if (typeof t != "string") return !1;
    const v = t.charCodeAt(0);
    return v === 47 ? t.charCodeAt(1) !== 47 : v === 46
}
var at = h.forwardRef((t, v) => {
    const {
        _asChild: e,
        ...l
    } = t, {
        type: Y,
        ...x
    } = He(l, v), A = typeof l.children == "function" ? l.children({
        isActive: x["data-status"] === "active"
    }) : l.children;
    if (!e) {
        const {
            disabled: f,
            ...s
        } = x;
        return h.createElement("a", s, A)
    }
    return h.createElement(e, x, A)
});

function Be(t) {
    return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey)
}
export {
    at as t
};