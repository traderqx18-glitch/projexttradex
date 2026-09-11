import {
    i as Wt
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as Kt
} from "./react-D8T8de5F.js";
import {
    t as Gt
} from "./react-dom-CyvodVTt.js";
var Jt = ["top", "right", "bottom", "left"],
    U = Math.min,
    F = Math.max,
    st = Math.round,
    ot = Math.floor,
    z = t => ({
        x: t,
        y: t
    }),
    Qt = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

function wt(t, e, n) {
    return F(t, U(e, n))
}

function I(t, e) {
    return typeof t == "function" ? t(e) : t
}

function X(t) {
    return t.split("-")[0]
}

function tt(t) {
    return t.split("-")[1]
}

function vt(t) {
    return t === "x" ? "y" : "x"
}

function bt(t) {
    return t === "y" ? "height" : "width"
}

function V(t) {
    const e = t[0];
    return e === "t" || e === "b" ? "y" : "x"
}

function Rt(t) {
    return vt(V(t))
}

function Zt(t, e, n) {
    n === void 0 && (n = !1);
    const i = tt(t),
        o = Rt(t),
        r = bt(o);
    let s = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
    return e.reference[r] > e.floating[r] && (s = ct(s)), [s, ct(s)]
}

function te(t) {
    const e = ct(t);
    return [xt(t), e, xt(e)]
}

function xt(t) {
    return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start")
}
var Ct = ["left", "right"],
    Et = ["right", "left"],
    ee = ["top", "bottom"],
    ne = ["bottom", "top"];

function ie(t, e, n) {
    switch (t) {
        case "top":
        case "bottom":
            return n ? e ? Et : Ct : e ? Ct : Et;
        case "left":
        case "right":
            return e ? ee : ne;
        default:
            return []
    }
}

function oe(t, e, n, i) {
    const o = tt(t);
    let r = ie(X(t), n === "start", i);
    return o && (r = r.map(s => s + "-" + o), e && (r = r.concat(r.map(xt)))), r
}

function ct(t) {
    const e = X(t);
    return Qt[e] + t.slice(e.length)
}

function re(t) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...t
    }
}

function Bt(t) {
    return typeof t != "number" ? re(t) : {
        top: t,
        right: t,
        bottom: t,
        left: t
    }
}

function lt(t) {
    const {
        x: e,
        y: n,
        width: i,
        height: o
    } = t;
    return {
        width: i,
        height: o,
        top: n,
        left: e,
        right: e + i,
        bottom: n + o,
        x: e,
        y: n
    }
}

function Lt(t, e, n) {
    let {
        reference: i,
        floating: o
    } = t;
    const r = V(e),
        s = Rt(e),
        c = bt(s),
        a = X(e),
        u = r === "y",
        l = i.x + i.width / 2 - o.width / 2,
        f = i.y + i.height / 2 - o.height / 2,
        m = i[c] / 2 - o[c] / 2;
    let d;
    switch (a) {
        case "top":
            d = {
                x: l,
                y: i.y - o.height
            };
            break;
        case "bottom":
            d = {
                x: l,
                y: i.y + i.height
            };
            break;
        case "right":
            d = {
                x: i.x + i.width,
                y: f
            };
            break;
        case "left":
            d = {
                x: i.x - o.width,
                y: f
            };
            break;
        default:
            d = {
                x: i.x,
                y: i.y
            }
    }
    switch (tt(e)) {
        case "start":
            d[s] -= m * (n && u ? -1 : 1);
            break;
        case "end":
            d[s] += m * (n && u ? -1 : 1);
            break
    }
    return d
}
async function se(t, e) {
    var n;
    e === void 0 && (e = {});
    const {
        x: i,
        y: o,
        platform: r,
        rects: s,
        elements: c,
        strategy: a
    } = t, {
        boundary: u = "clippingAncestors",
        rootBoundary: l = "viewport",
        elementContext: f = "floating",
        altBoundary: m = !1,
        padding: d = 0
    } = I(e, t), h = Bt(d), g = c[m ? f === "floating" ? "reference" : "floating" : f], p = lt(await r.getClippingRect({
        element: (n = await (r.isElement == null ? void 0 : r.isElement(g))) == null || n ? g : g.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
        boundary: u,
        rootBoundary: l,
        strategy: a
    })), w = f === "floating" ? {
        x: i,
        y: o,
        width: s.floating.width,
        height: s.floating.height
    } : s.reference, y = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), v = await (r.isElement == null ? void 0 : r.isElement(y)) ? await (r.getScale == null ? void 0 : r.getScale(y)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    }, x = lt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: c,
        rect: w,
        offsetParent: y,
        strategy: a
    }) : w);
    return {
        top: (p.top - x.top + h.top) / v.y,
        bottom: (x.bottom - p.bottom + h.bottom) / v.y,
        left: (p.left - x.left + h.left) / v.x,
        right: (x.right - p.right + h.right) / v.x
    }
}
var ce = 50,
    le = async (t, e, n) => {
        const {
            placement: i = "bottom",
            strategy: o = "absolute",
            middleware: r = [],
            platform: s
        } = n, c = s.detectOverflow ? s : { ...s,
            detectOverflow: se
        }, a = await (s.isRTL == null ? void 0 : s.isRTL(e));
        let u = await s.getElementRects({
                reference: t,
                floating: e,
                strategy: o
            }),
            {
                x: l,
                y: f
            } = Lt(u, i, a),
            m = i,
            d = 0;
        const h = {};
        for (let g = 0; g < r.length; g++) {
            const p = r[g];
            if (!p) continue;
            const {
                name: w,
                fn: y
            } = p, {
                x: v,
                y: x,
                data: R,
                reset: b
            } = await y({
                x: l,
                y: f,
                initialPlacement: i,
                placement: m,
                strategy: o,
                middlewareData: h,
                rects: u,
                platform: c,
                elements: {
                    reference: t,
                    floating: e
                }
            });
            l = v ?? l, f = x ?? f, h[w] = { ...h[w],
                ...R
            }, b && d < ce && (d++, typeof b == "object" && (b.placement && (m = b.placement), b.rects && (u = b.rects === !0 ? await s.getElementRects({
                reference: t,
                floating: e,
                strategy: o
            }) : b.rects), {
                x: l,
                y: f
            } = Lt(u, m, a)), g = -1)
        }
        return {
            x: l,
            y: f,
            placement: m,
            strategy: o,
            middlewareData: h
        }
    },
    fe = t => ({
        name: "arrow",
        options: t,
        async fn(e) {
            const {
                x: n,
                y: i,
                placement: o,
                rects: r,
                platform: s,
                elements: c,
                middlewareData: a
            } = e, {
                element: u,
                padding: l = 0
            } = I(t, e) || {};
            if (u == null) return {};
            const f = Bt(l),
                m = {
                    x: n,
                    y: i
                },
                d = Rt(o),
                h = bt(d),
                g = await s.getDimensions(u),
                p = d === "y",
                w = p ? "top" : "left",
                y = p ? "bottom" : "right",
                v = p ? "clientHeight" : "clientWidth",
                x = r.reference[h] + r.reference[d] - m[d] - r.floating[h],
                R = m[d] - r.reference[d],
                b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
            let S = b ? b[v] : 0;
            (!S || !await (s.isElement == null ? void 0 : s.isElement(b))) && (S = c.floating[v] || r.floating[h]);
            const T = x / 2 - R / 2,
                $ = S / 2 - g[h] / 2 - 1,
                L = U(f[w], $),
                W = U(f[y], $),
                M = L,
                D = S - g[h] - W,
                O = S / 2 - g[h] / 2 + T,
                N = wt(M, O, D),
                C = !a.arrow && tt(o) != null && O !== N && r.reference[h] / 2 - (O < M ? L : W) - g[h] / 2 < 0,
                P = C ? O < M ? O - M : O - D : 0;
            return {
                [d]: m[d] + P,
                data: {
                    [d]: N,
                    centerOffset: O - N - P,
                    ...C && {
                        alignmentOffset: P
                    }
                },
                reset: C
            }
        }
    }),
    ae = function(t) {
        return t === void 0 && (t = {}), {
            name: "flip",
            options: t,
            async fn(e) {
                var n, i;
                const {
                    placement: o,
                    middlewareData: r,
                    rects: s,
                    initialPlacement: c,
                    platform: a,
                    elements: u
                } = e, {
                    mainAxis: l = !0,
                    crossAxis: f = !0,
                    fallbackPlacements: m,
                    fallbackStrategy: d = "bestFit",
                    fallbackAxisSideDirection: h = "none",
                    flipAlignment: g = !0,
                    ...p
                } = I(t, e);
                if ((n = r.arrow) != null && n.alignmentOffset) return {};
                const w = X(o),
                    y = V(c),
                    v = X(c) === c,
                    x = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)),
                    R = m || (v || !g ? [ct(c)] : te(c)),
                    b = h !== "none";
                !m && b && R.push(...oe(c, g, h, x));
                const S = [c, ...R],
                    T = await a.detectOverflow(e, p),
                    $ = [];
                let L = ((i = r.flip) == null ? void 0 : i.overflows) || [];
                if (l && $.push(T[w]), f) {
                    const O = Zt(o, s, x);
                    $.push(T[O[0]], T[O[1]])
                }
                if (L = [...L, {
                        placement: o,
                        overflows: $
                    }], !$.every(O => O <= 0)) {
                    var W, M;
                    const O = (((W = r.flip) == null ? void 0 : W.index) || 0) + 1,
                        N = S[O];
                    if (N && (!(f === "alignment" && y !== V(N)) || L.every(P => V(P.placement) === y ? P.overflows[0] > 0 : !0))) return {
                        data: {
                            index: O,
                            overflows: L
                        },
                        reset: {
                            placement: N
                        }
                    };
                    let C = (M = L.filter(P => P.overflows[0] <= 0).sort((P, A) => P.overflows[1] - A.overflows[1])[0]) == null ? void 0 : M.placement;
                    if (!C) switch (d) {
                        case "bestFit":
                            {
                                var D;
                                const P = (D = L.filter(A => {
                                    if (b) {
                                        const k = V(A.placement);
                                        return k === y || k === "y"
                                    }
                                    return !0
                                }).map(A => [A.placement, A.overflows.filter(k => k > 0).reduce((k, Y) => k + Y, 0)]).sort((A, k) => A[1] - k[1])[0]) == null ? void 0 : D[0];P && (C = P);
                                break
                            }
                        case "initialPlacement":
                            C = c;
                            break
                    }
                    if (o !== C) return {
                        reset: {
                            placement: C
                        }
                    }
                }
                return {}
            }
        }
    };

function Pt(t, e) {
    return {
        top: t.top - e.height,
        right: t.right - e.width,
        bottom: t.bottom - e.height,
        left: t.left - e.width
    }
}

function Tt(t) {
    return Jt.some(e => t[e] >= 0)
}
var ue = function(t) {
        return t === void 0 && (t = {}), {
            name: "hide",
            options: t,
            async fn(e) {
                const {
                    rects: n,
                    platform: i
                } = e, {
                    strategy: o = "referenceHidden",
                    ...r
                } = I(t, e);
                switch (o) {
                    case "referenceHidden":
                        {
                            const s = Pt(await i.detectOverflow(e, { ...r,
                                elementContext: "reference"
                            }), n.reference);
                            return {
                                data: {
                                    referenceHiddenOffsets: s,
                                    referenceHidden: Tt(s)
                                }
                            }
                        }
                    case "escaped":
                        {
                            const s = Pt(await i.detectOverflow(e, { ...r,
                                altBoundary: !0
                            }), n.floating);
                            return {
                                data: {
                                    escapedOffsets: s,
                                    escaped: Tt(s)
                                }
                            }
                        }
                    default:
                        return {}
                }
            }
        }
    },
    Ht = new Set(["left", "top"]);
async function de(t, e) {
    const {
        placement: n,
        platform: i,
        elements: o
    } = t, r = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), s = X(n), c = tt(n), a = V(n) === "y", u = Ht.has(s) ? -1 : 1, l = r && a ? -1 : 1, f = I(e, t);
    let {
        mainAxis: m,
        crossAxis: d,
        alignmentAxis: h
    } = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: f.mainAxis || 0,
        crossAxis: f.crossAxis || 0,
        alignmentAxis: f.alignmentAxis
    };
    return c && typeof h == "number" && (d = c === "end" ? h * -1 : h), a ? {
        x: d * l,
        y: m * u
    } : {
        x: m * u,
        y: d * l
    }
}
var me = function(t) {
        return t === void 0 && (t = 0), {
            name: "offset",
            options: t,
            async fn(e) {
                var n, i;
                const {
                    x: o,
                    y: r,
                    placement: s,
                    middlewareData: c
                } = e, a = await de(e, t);
                return s === ((n = c.offset) == null ? void 0 : n.placement) && (i = c.arrow) != null && i.alignmentOffset ? {} : {
                    x: o + a.x,
                    y: r + a.y,
                    data: { ...a,
                        placement: s
                    }
                }
            }
        }
    },
    he = function(t) {
        return t === void 0 && (t = {}), {
            name: "shift",
            options: t,
            async fn(e) {
                const {
                    x: n,
                    y: i,
                    placement: o,
                    platform: r
                } = e, {
                    mainAxis: s = !0,
                    crossAxis: c = !1,
                    limiter: a = {
                        fn: w => {
                            let {
                                x: y,
                                y: v
                            } = w;
                            return {
                                x: y,
                                y: v
                            }
                        }
                    },
                    ...u
                } = I(t, e), l = {
                    x: n,
                    y: i
                }, f = await r.detectOverflow(e, u), m = V(X(o)), d = vt(m);
                let h = l[d],
                    g = l[m];
                if (s) {
                    const w = d === "y" ? "top" : "left",
                        y = d === "y" ? "bottom" : "right",
                        v = h + f[w],
                        x = h - f[y];
                    h = wt(v, h, x)
                }
                if (c) {
                    const w = m === "y" ? "top" : "left",
                        y = m === "y" ? "bottom" : "right",
                        v = g + f[w],
                        x = g - f[y];
                    g = wt(v, g, x)
                }
                const p = a.fn({ ...e,
                    [d]: h,
                    [m]: g
                });
                return { ...p,
                    data: {
                        x: p.x - n,
                        y: p.y - i,
                        enabled: {
                            [d]: s,
                            [m]: c
                        }
                    }
                }
            }
        }
    },
    ge = function(t) {
        return t === void 0 && (t = {}), {
            options: t,
            fn(e) {
                const {
                    x: n,
                    y: i,
                    placement: o,
                    rects: r,
                    middlewareData: s
                } = e, {
                    offset: c = 0,
                    mainAxis: a = !0,
                    crossAxis: u = !0
                } = I(t, e), l = {
                    x: n,
                    y: i
                }, f = V(o), m = vt(f);
                let d = l[m],
                    h = l[f];
                const g = I(c, e),
                    p = typeof g == "number" ? {
                        mainAxis: g,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...g
                    };
                if (a) {
                    const v = m === "y" ? "height" : "width",
                        x = r.reference[m] - r.floating[v] + p.mainAxis,
                        R = r.reference[m] + r.reference[v] - p.mainAxis;
                    d < x ? d = x : d > R && (d = R)
                }
                if (u) {
                    var w, y;
                    const v = m === "y" ? "width" : "height",
                        x = Ht.has(X(o)),
                        R = r.reference[f] - r.floating[v] + (x && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (x ? 0 : p.crossAxis),
                        b = r.reference[f] + r.reference[v] + (x ? 0 : ((y = s.offset) == null ? void 0 : y[f]) || 0) - (x ? p.crossAxis : 0);
                    h < R ? h = R : h > b && (h = b)
                }
                return {
                    [m]: d,
                    [f]: h
                }
            }
        }
    },
    pe = function(t) {
        return t === void 0 && (t = {}), {
            name: "size",
            options: t,
            async fn(e) {
                var n, i;
                const {
                    placement: o,
                    rects: r,
                    platform: s,
                    elements: c
                } = e, {
                    apply: a = () => {},
                    ...u
                } = I(t, e), l = await s.detectOverflow(e, u), f = X(o), m = tt(o), d = V(o) === "y", {
                    width: h,
                    height: g
                } = r.floating;
                let p, w;
                f === "top" || f === "bottom" ? (p = f, w = m === (await (s.isRTL == null ? void 0 : s.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (w = f, p = m === "end" ? "top" : "bottom");
                const y = g - l.top - l.bottom,
                    v = h - l.left - l.right,
                    x = U(g - l[p], y),
                    R = U(h - l[w], v),
                    b = !e.middlewareData.shift;
                let S = x,
                    T = R;
                if ((n = e.middlewareData.shift) != null && n.enabled.x && (T = v), (i = e.middlewareData.shift) != null && i.enabled.y && (S = y), b && !m) {
                    const L = F(l.left, 0),
                        W = F(l.right, 0),
                        M = F(l.top, 0),
                        D = F(l.bottom, 0);
                    d ? T = h - 2 * (L !== 0 || W !== 0 ? L + W : F(l.left, l.right)) : S = g - 2 * (M !== 0 || D !== 0 ? M + D : F(l.top, l.bottom))
                }
                await a({ ...e,
                    availableWidth: T,
                    availableHeight: S
                });
                const $ = await s.getDimensions(c.floating);
                return h !== $.width || g !== $.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };

function at() {
    return typeof window < "u"
}

function et(t) {
    return Nt(t) ? (t.nodeName || "").toLowerCase() : "#document"
}

function _(t) {
    var e;
    return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window
}

function j(t) {
    var e;
    return (e = (Nt(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement
}

function Nt(t) {
    return at() ? t instanceof Node || t instanceof _(t).Node : !1
}

function B(t) {
    return at() ? t instanceof Element || t instanceof _(t).Element : !1
}

function q(t) {
    return at() ? t instanceof HTMLElement || t instanceof _(t).HTMLElement : !1
}

function Dt(t) {
    return !at() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof _(t).ShadowRoot
}

function it(t) {
    const {
        overflow: e,
        overflowX: n,
        overflowY: i,
        display: o
    } = H(t);
    return /auto|scroll|overlay|hidden|clip/.test(e + i + n) && o !== "inline" && o !== "contents"
}

function we(t) {
    return /^(table|td|th)$/.test(et(t))
}

function ut(t) {
    try {
        if (t.matches(":popover-open")) return !0
    } catch {}
    try {
        return t.matches(":modal")
    } catch {
        return !1
    }
}
var xe = /transform|translate|scale|rotate|perspective|filter/,
    ye = /paint|layout|strict|content/,
    G = t => !!t && t !== "none",
    ht;

function At(t) {
    const e = B(t) ? H(t) : t;
    return G(e.transform) || G(e.translate) || G(e.scale) || G(e.rotate) || G(e.perspective) || !Ot() && (G(e.backdropFilter) || G(e.filter)) || xe.test(e.willChange || "") || ye.test(e.contain || "")
}

function ve(t) {
    let e = K(t);
    for (; q(e) && !Z(e);) {
        if (At(e)) return e;
        if (ut(e)) return null;
        e = K(e)
    }
    return null
}

function Ot() {
    return ht == null && (ht = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), ht
}

function Z(t) {
    return /^(html|body|#document)$/.test(et(t))
}

function H(t) {
    return _(t).getComputedStyle(t)
}

function dt(t) {
    return B(t) ? {
        scrollLeft: t.scrollLeft,
        scrollTop: t.scrollTop
    } : {
        scrollLeft: t.scrollX,
        scrollTop: t.scrollY
    }
}

function K(t) {
    if (et(t) === "html") return t;
    const e = t.assignedSlot || t.parentNode || Dt(t) && t.host || j(t);
    return Dt(e) ? e.host : e
}

function Vt(t) {
    const e = K(t);
    return Z(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : q(e) && it(e) ? e : Vt(e)
}

function nt(t, e, n) {
    var i;
    e === void 0 && (e = []), n === void 0 && (n = !0);
    const o = Vt(t),
        r = o === ((i = t.ownerDocument) == null ? void 0 : i.body),
        s = _(o);
    if (r) {
        const c = yt(s);
        return e.concat(s, s.visualViewport || [], it(o) ? o : [], c && n ? nt(c) : [])
    } else return e.concat(o, nt(o, [], n))
}

function yt(t) {
    return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null
}

function zt(t) {
    const e = H(t);
    let n = parseFloat(e.width) || 0,
        i = parseFloat(e.height) || 0;
    const o = q(t),
        r = o ? t.offsetWidth : n,
        s = o ? t.offsetHeight : i,
        c = st(n) !== r || st(i) !== s;
    return c && (n = r, i = s), {
        width: n,
        height: i,
        $: c
    }
}

function St(t) {
    return B(t) ? t : t.contextElement
}

function Q(t) {
    const e = St(t);
    if (!q(e)) return z(1);
    const n = e.getBoundingClientRect(),
        {
            width: i,
            height: o,
            $: r
        } = zt(e);
    let s = (r ? st(n.width) : n.width) / i,
        c = (r ? st(n.height) : n.height) / o;
    return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
        x: s,
        y: c
    }
}
var be = z(0);

function jt(t) {
    const e = _(t);
    return !Ot() || !e.visualViewport ? be : {
        x: e.visualViewport.offsetLeft,
        y: e.visualViewport.offsetTop
    }
}

function Re(t, e, n) {
    return e === void 0 && (e = !1), !n || e && n !== _(t) ? !1 : e
}

function J(t, e, n, i) {
    e === void 0 && (e = !1), n === void 0 && (n = !1);
    const o = t.getBoundingClientRect(),
        r = St(t);
    let s = z(1);
    e && (i ? B(i) && (s = Q(i)) : s = Q(t));
    const c = Re(r, n, i) ? jt(r) : z(0);
    let a = (o.left + c.x) / s.x,
        u = (o.top + c.y) / s.y,
        l = o.width / s.x,
        f = o.height / s.y;
    if (r) {
        const m = _(r),
            d = i && B(i) ? _(i) : i;
        let h = m,
            g = yt(h);
        for (; g && i && d !== h;) {
            const p = Q(g),
                w = g.getBoundingClientRect(),
                y = H(g),
                v = w.left + (g.clientLeft + parseFloat(y.paddingLeft)) * p.x,
                x = w.top + (g.clientTop + parseFloat(y.paddingTop)) * p.y;
            a *= p.x, u *= p.y, l *= p.x, f *= p.y, a += v, u += x, h = _(g), g = yt(h)
        }
    }
    return lt({
        width: l,
        height: f,
        x: a,
        y: u
    })
}

function mt(t, e) {
    const n = dt(t).scrollLeft;
    return e ? e.left + n : J(j(t)).left + n
}

function It(t, e) {
    const n = t.getBoundingClientRect();
    return {
        x: n.left + e.scrollLeft - mt(t, n),
        y: n.top + e.scrollTop
    }
}

function Ae(t) {
    let {
        elements: e,
        rect: n,
        offsetParent: i,
        strategy: o
    } = t;
    const r = o === "fixed",
        s = j(i),
        c = e ? ut(e.floating) : !1;
    if (i === s || c && r) return n;
    let a = {
            scrollLeft: 0,
            scrollTop: 0
        },
        u = z(1);
    const l = z(0),
        f = q(i);
    if ((f || !f && !r) && ((et(i) !== "body" || it(s)) && (a = dt(i)), f)) {
        const d = J(i);
        u = Q(i), l.x = d.x + i.clientLeft, l.y = d.y + i.clientTop
    }
    const m = s && !f && !r ? It(s, a) : z(0);
    return {
        width: n.width * u.x,
        height: n.height * u.y,
        x: n.x * u.x - a.scrollLeft * u.x + l.x + m.x,
        y: n.y * u.y - a.scrollTop * u.y + l.y + m.y
    }
}

function Oe(t) {
    return Array.from(t.getClientRects())
}

function Se(t) {
    const e = j(t),
        n = dt(t),
        i = t.ownerDocument.body,
        o = F(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
        r = F(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
    let s = -n.scrollLeft + mt(t);
    const c = -n.scrollTop;
    return H(i).direction === "rtl" && (s += F(e.clientWidth, i.clientWidth) - o), {
        width: o,
        height: r,
        x: s,
        y: c
    }
}
var Mt = 25;

function Ce(t, e) {
    const n = _(t),
        i = j(t),
        o = n.visualViewport;
    let r = i.clientWidth,
        s = i.clientHeight,
        c = 0,
        a = 0;
    if (o) {
        r = o.width, s = o.height;
        const l = Ot();
        (!l || l && e === "fixed") && (c = o.offsetLeft, a = o.offsetTop)
    }
    const u = mt(i);
    if (u <= 0) {
        const l = i.ownerDocument,
            f = l.body,
            m = getComputedStyle(f),
            d = l.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0,
            h = Math.abs(i.clientWidth - f.clientWidth - d);
        h <= Mt && (r -= h)
    } else u <= Mt && (r += u);
    return {
        width: r,
        height: s,
        x: c,
        y: a
    }
}

function Ee(t, e) {
    const n = J(t, !0, e === "fixed"),
        i = n.top + t.clientTop,
        o = n.left + t.clientLeft,
        r = q(t) ? Q(t) : z(1);
    return {
        width: t.clientWidth * r.x,
        height: t.clientHeight * r.y,
        x: o * r.x,
        y: i * r.y
    }
}

function kt(t, e, n) {
    let i;
    if (e === "viewport") i = Ce(t, n);
    else if (e === "document") i = Se(j(t));
    else if (B(e)) i = Ee(e, n);
    else {
        const o = jt(t);
        i = {
            x: e.x - o.x,
            y: e.y - o.y,
            width: e.width,
            height: e.height
        }
    }
    return lt(i)
}

function Xt(t, e) {
    const n = K(t);
    return n === e || !B(n) || Z(n) ? !1 : H(n).position === "fixed" || Xt(n, e)
}

function Le(t, e) {
    const n = e.get(t);
    if (n) return n;
    let i = nt(t, [], !1).filter(c => B(c) && et(c) !== "body"),
        o = null;
    const r = H(t).position === "fixed";
    let s = r ? K(t) : t;
    for (; B(s) && !Z(s);) {
        const c = H(s),
            a = At(s);
        !a && c.position === "fixed" && (o = null), (r ? !a && !o : !a && c.position === "static" && o && (o.position === "absolute" || o.position === "fixed") || it(s) && !a && Xt(t, s)) ? i = i.filter(u => u !== s) : o = c, s = K(s)
    }
    return e.set(t, i), i
}

function Pe(t) {
    let {
        element: e,
        boundary: n,
        rootBoundary: i,
        strategy: o
    } = t;
    const r = [...n === "clippingAncestors" ? ut(e) ? [] : Le(e, this._c) : [].concat(n), i],
        s = kt(e, r[0], o);
    let c = s.top,
        a = s.right,
        u = s.bottom,
        l = s.left;
    for (let f = 1; f < r.length; f++) {
        const m = kt(e, r[f], o);
        c = F(m.top, c), a = U(m.right, a), u = U(m.bottom, u), l = F(m.left, l)
    }
    return {
        width: a - l,
        height: u - c,
        x: l,
        y: c
    }
}

function Te(t) {
    const {
        width: e,
        height: n
    } = zt(t);
    return {
        width: e,
        height: n
    }
}

function De(t, e, n) {
    const i = q(e),
        o = j(e),
        r = n === "fixed",
        s = J(t, !0, r, e);
    let c = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const a = z(0);

    function u() {
        a.x = mt(o)
    }
    if (i || !i && !r)
        if ((et(e) !== "body" || it(o)) && (c = dt(e)), i) {
            const f = J(e, !0, r, e);
            a.x = f.x + e.clientLeft, a.y = f.y + e.clientTop
        } else o && u();
    r && !i && o && u();
    const l = o && !i && !r ? It(o, c) : z(0);
    return {
        x: s.left + c.scrollLeft - a.x - l.x,
        y: s.top + c.scrollTop - a.y - l.y,
        width: s.width,
        height: s.height
    }
}

function gt(t) {
    return H(t).position === "static"
}

function Ft(t, e) {
    if (!q(t) || H(t).position === "fixed") return null;
    if (e) return e(t);
    let n = t.offsetParent;
    return j(t) === n && (n = n.ownerDocument.body), n
}

function qt(t, e) {
    const n = _(t);
    if (ut(t)) return n;
    if (!q(t)) {
        let o = K(t);
        for (; o && !Z(o);) {
            if (B(o) && !gt(o)) return o;
            o = K(o)
        }
        return n
    }
    let i = Ft(t, e);
    for (; i && we(i) && gt(i);) i = Ft(i, e);
    return i && Z(i) && gt(i) && !At(i) ? n : i || ve(t) || n
}
var Me = async function(t) {
    const e = this.getOffsetParent || qt,
        n = this.getDimensions,
        i = await n(t.floating);
    return {
        reference: De(t.reference, await e(t.floating), t.strategy),
        floating: {
            x: 0,
            y: 0,
            width: i.width,
            height: i.height
        }
    }
};

function ke(t) {
    return H(t).direction === "rtl"
}
var Fe = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Ae,
    getDocumentElement: j,
    getClippingRect: Pe,
    getOffsetParent: qt,
    getElementRects: Me,
    getClientRects: Oe,
    getDimensions: Te,
    getScale: Q,
    isElement: B,
    isRTL: ke
};

function Yt(t, e) {
    return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height
}

function _e(t, e) {
    let n = null,
        i;
    const o = j(t);

    function r() {
        var c;
        clearTimeout(i), (c = n) == null || c.disconnect(), n = null
    }

    function s(c, a) {
        c === void 0 && (c = !1), a === void 0 && (a = 1), r();
        const u = t.getBoundingClientRect(),
            {
                left: l,
                top: f,
                width: m,
                height: d
            } = u;
        if (c || e(), !m || !d) return;
        const h = ot(f),
            g = ot(o.clientWidth - (l + m)),
            p = ot(o.clientHeight - (f + d)),
            w = ot(l),
            y = {
                rootMargin: -h + "px " + -g + "px " + -p + "px " + -w + "px",
                threshold: F(0, U(1, a)) || 1
            };
        let v = !0;

        function x(R) {
            const b = R[0].intersectionRatio;
            if (b !== a) {
                if (!v) return s();
                b ? s(!1, b) : i = setTimeout(() => {
                    s(!1, 1e-7)
                }, 1e3)
            }
            b === 1 && !Yt(u, t.getBoundingClientRect()) && s(), v = !1
        }
        try {
            n = new IntersectionObserver(x, { ...y,
                root: o.ownerDocument
            })
        } catch {
            n = new IntersectionObserver(x, y)
        }
        n.observe(t)
    }
    return s(!0), r
}

function Ue(t, e, n, i) {
    i === void 0 && (i = {});
    const {
        ancestorScroll: o = !0,
        ancestorResize: r = !0,
        elementResize: s = typeof ResizeObserver == "function",
        layoutShift: c = typeof IntersectionObserver == "function",
        animationFrame: a = !1
    } = i, u = St(t), l = o || r ? [...u ? nt(u) : [], ...e ? nt(e) : []] : [];
    l.forEach(w => {
        o && w.addEventListener("scroll", n, {
            passive: !0
        }), r && w.addEventListener("resize", n)
    });
    const f = u && c ? _e(u, n) : null;
    let m = -1,
        d = null;
    s && (d = new ResizeObserver(w => {
        let [y] = w;
        y && y.target === u && d && e && (d.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
            var v;
            (v = d) == null || v.observe(e)
        })), n()
    }), u && !a && d.observe(u), e && d.observe(e));
    let h, g = a ? J(t) : null;
    a && p();

    function p() {
        const w = J(t);
        g && !Yt(g, w) && n(), g = w, h = requestAnimationFrame(p)
    }
    return n(), () => {
        var w;
        l.forEach(y => {
            o && y.removeEventListener("scroll", n), r && y.removeEventListener("resize", n)
        }), f ?.(), (w = d) == null || w.disconnect(), d = null, a && cancelAnimationFrame(h)
    }
}
var $e = me,
    We = he,
    Be = ae,
    He = pe,
    Ne = ue,
    _t = fe,
    Ve = ge,
    ze = (t, e, n) => {
        const i = new Map,
            o = {
                platform: Fe,
                ...n
            },
            r = { ...o.platform,
                _c: i
            };
        return le(t, e, { ...o,
            platform: r
        })
    },
    E = Wt(Kt(), 1),
    je = Wt(Gt(), 1),
    rt = typeof document < "u" ? E.useLayoutEffect : function() {};

function ft(t, e) {
    if (t === e) return !0;
    if (typeof t != typeof e) return !1;
    if (typeof t == "function" && t.toString() === e.toString()) return !0;
    let n, i, o;
    if (t && e && typeof t == "object") {
        if (Array.isArray(t)) {
            if (n = t.length, n !== e.length) return !1;
            for (i = n; i-- !== 0;)
                if (!ft(t[i], e[i])) return !1;
            return !0
        }
        if (o = Object.keys(t), n = o.length, n !== Object.keys(e).length) return !1;
        for (i = n; i-- !== 0;)
            if (!{}.hasOwnProperty.call(e, o[i])) return !1;
        for (i = n; i-- !== 0;) {
            const r = o[i];
            if (!(r === "_owner" && t.$$typeof) && !ft(t[r], e[r])) return !1
        }
        return !0
    }
    return t !== t && e !== e
}

function Ut(t) {
    return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1
}

function $t(t, e) {
    const n = Ut(t);
    return Math.round(e * n) / n
}

function pt(t) {
    const e = E.useRef(t);
    return rt(() => {
        e.current = t
    }), e
}

function Ke(t) {
    t === void 0 && (t = {});
    const {
        placement: e = "bottom",
        strategy: n = "absolute",
        middleware: i = [],
        platform: o,
        elements: {
            reference: r,
            floating: s
        } = {},
        transform: c = !0,
        whileElementsMounted: a,
        open: u
    } = t, [l, f] = E.useState({
        x: 0,
        y: 0,
        strategy: n,
        placement: e,
        middlewareData: {},
        isPositioned: !1
    }), [m, d] = E.useState(i);
    ft(m, i) || d(i);
    const [h, g] = E.useState(null), [p, w] = E.useState(null), y = E.useCallback(A => {
        A !== b.current && (b.current = A, g(A))
    }, []), v = E.useCallback(A => {
        A !== S.current && (S.current = A, w(A))
    }, []), x = r || h, R = s || p, b = E.useRef(null), S = E.useRef(null), T = E.useRef(l), $ = a != null, L = pt(a), W = pt(o), M = pt(u), D = E.useCallback(() => {
        if (!b.current || !S.current) return;
        const A = {
            placement: e,
            strategy: n,
            middleware: m
        };
        W.current && (A.platform = W.current), ze(b.current, S.current, A).then(k => {
            const Y = { ...k,
                isPositioned: M.current !== !1
            };
            O.current && !ft(T.current, Y) && (T.current = Y, je.flushSync(() => {
                f(Y)
            }))
        })
    }, [m, e, n, W, M]);
    rt(() => {
        u === !1 && T.current.isPositioned && (T.current.isPositioned = !1, f(A => ({ ...A,
            isPositioned: !1
        })))
    }, [u]);
    const O = E.useRef(!1);
    rt(() => (O.current = !0, () => {
        O.current = !1
    }), []), rt(() => {
        if (x && (b.current = x), R && (S.current = R), x && R) {
            if (L.current) return L.current(x, R, D);
            D()
        }
    }, [x, R, D, L, $]);
    const N = E.useMemo(() => ({
            reference: b,
            floating: S,
            setReference: y,
            setFloating: v
        }), [y, v]),
        C = E.useMemo(() => ({
            reference: x,
            floating: R
        }), [x, R]),
        P = E.useMemo(() => {
            const A = {
                position: n,
                left: 0,
                top: 0
            };
            if (!C.floating) return A;
            const k = $t(C.floating, l.x),
                Y = $t(C.floating, l.y);
            return c ? { ...A,
                transform: "translate(" + k + "px, " + Y + "px)",
                ...Ut(C.floating) >= 1.5 && {
                    willChange: "transform"
                }
            } : {
                position: n,
                left: k,
                top: Y
            }
        }, [n, c, C.floating, l.x, l.y]);
    return E.useMemo(() => ({ ...l,
        update: D,
        refs: N,
        elements: C,
        floatingStyles: P
    }), [l, D, N, C, P])
}
var Ie = t => {
        function e(n) {
            return {}.hasOwnProperty.call(n, "current")
        }
        return {
            name: "arrow",
            options: t,
            fn(n) {
                const {
                    element: i,
                    padding: o
                } = typeof t == "function" ? t(n) : t;
                return i && e(i) ? i.current != null ? _t({
                    element: i.current,
                    padding: o
                }).fn(n) : {} : i ? _t({
                    element: i,
                    padding: o
                }).fn(n) : {}
            }
        }
    },
    Ge = (t, e) => {
        const n = $e(t);
        return {
            name: n.name,
            fn: n.fn,
            options: [t, e]
        }
    },
    Je = (t, e) => {
        const n = We(t);
        return {
            name: n.name,
            fn: n.fn,
            options: [t, e]
        }
    },
    Qe = (t, e) => ({
        fn: Ve(t).fn,
        options: [t, e]
    }),
    Ze = (t, e) => {
        const n = Be(t);
        return {
            name: n.name,
            fn: n.fn,
            options: [t, e]
        }
    },
    tn = (t, e) => {
        const n = He(t);
        return {
            name: n.name,
            fn: n.fn,
            options: [t, e]
        }
    },
    en = (t, e) => {
        const n = Ne(t);
        return {
            name: n.name,
            fn: n.fn,
            options: [t, e]
        }
    },
    nn = (t, e) => {
        const n = Ie(t);
        return {
            name: n.name,
            fn: n.fn,
            options: [t, e]
        }
    };
export {
    Ge as a, Ke as c, Qe as i, Ue as l, Ze as n, Je as o, en as r, tn as s, nn as t
};