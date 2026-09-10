function xe(e) {
    var t, o, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var n = e.length;
            for (t = 0; t < n; t++) e[t] && (o = xe(e[t])) && (r && (r += " "), r += o)
        } else
            for (o in e) e[o] && (r && (r += " "), r += o);
    return r
}

function Ee() {
    for (var e, t, o = 0, r = "", n = arguments.length; o < n; o++)(e = arguments[o]) && (t = xe(e)) && (r && (r += " "), r += t);
    return r
}
var Le = (e, t) => {
        const o = new Array(e.length + t.length);
        for (let r = 0; r < e.length; r++) o[r] = e[r];
        for (let r = 0; r < t.length; r++) o[e.length + r] = t[r];
        return o
    },
    Ve = (e, t) => ({
        classGroupId: e,
        validator: t
    }),
    ye = (e = new Map, t = null, o) => ({
        nextPart: e,
        validators: t,
        classGroupId: o
    }),
    K = "-",
    fe = [],
    Fe = "arbitrary..",
    We = e => {
        const t = Be(e),
            {
                conflictingClassGroups: o,
                conflictingClassGroupModifiers: r
            } = e;
        return {
            getClassGroupId: i => {
                if (i.startsWith("[") && i.endsWith("]")) return _e(i);
                const b = i.split(K);
                return ze(b, b[0] === "" && b.length > 1 ? 1 : 0, t)
            },
            getConflictingClassGroupIds: (i, b) => {
                if (b) {
                    const d = r[i],
                        u = o[i];
                    return d ? u ? Le(u, d) : d : u || fe
                }
                return o[i] || fe
            }
        }
    },
    ze = (e, t, o) => {
        if (e.length - t === 0) return o.classGroupId;
        const r = e[t],
            n = o.nextPart.get(r);
        if (n) {
            const d = ze(e, t + 1, n);
            if (d) return d
        }
        const m = o.validators;
        if (m === null) return;
        const i = t === 0 ? e.join(K) : e.slice(t).join(K),
            b = m.length;
        for (let d = 0; d < b; d++) {
            const u = m[d];
            if (u.validator(i)) return u.classGroupId
        }
    },
    _e = e => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
        const t = e.slice(1, -1),
            o = t.indexOf(":"),
            r = t.slice(0, o);
        return r ? Fe + r : void 0
    })(),
    Be = e => {
        const {
            theme: t,
            classGroups: o
        } = e;
        return $e(o, t)
    },
    $e = (e, t) => {
        const o = ye();
        for (const r in e) {
            const n = e[r];
            ae(n, o, r, t)
        }
        return o
    },
    ae = (e, t, o, r) => {
        const n = e.length;
        for (let m = 0; m < n; m++) {
            const i = e[m];
            Ue(i, t, o, r)
        }
    },
    Ue = (e, t, o, r) => {
        if (typeof e == "string") {
            De(e, t, o);
            return
        }
        if (typeof e == "function") {
            Ye(e, t, o, r);
            return
        }
        qe(e, t, o, r)
    },
    De = (e, t, o) => {
        const r = e === "" ? t : Ce(t, e);
        r.classGroupId = o
    },
    Ye = (e, t, o, r) => {
        if (Xe(e)) {
            ae(e(r), t, o, r);
            return
        }
        t.validators === null && (t.validators = []), t.validators.push(Ve(o, e))
    },
    qe = (e, t, o, r) => {
        const n = Object.entries(e),
            m = n.length;
        for (let i = 0; i < m; i++) {
            const [b, d] = n[i];
            ae(d, Ce(t, b), o, r)
        }
    },
    Ce = (e, t) => {
        let o = e;
        const r = t.split(K),
            n = r.length;
        for (let m = 0; m < n; m++) {
            const i = r[m];
            let b = o.nextPart.get(i);
            b || (b = ye(), o.nextPart.set(i, b)), o = b
        }
        return o
    },
    Xe = e => "isThemeGetter" in e && e.isThemeGetter === !0,
    Je = e => {
        if (e < 1) return {
            get: () => {},
            set: () => {}
        };
        let t = 0,
            o = Object.create(null),
            r = Object.create(null);
        const n = (m, i) => {
            o[m] = i, t++, t > e && (t = 0, r = o, o = Object.create(null))
        };
        return {
            get(m) {
                let i = o[m];
                if (i !== void 0) return i;
                if ((i = r[m]) !== void 0) return n(m, i), i
            },
            set(m, i) {
                m in o ? o[m] = i : n(m, i)
            }
        }
    },
    se = "!",
    ge = ":",
    He = [],
    he = (e, t, o, r, n) => ({
        modifiers: e,
        hasImportantModifier: t,
        baseClassName: o,
        maybePostfixModifierPosition: r,
        isExternal: n
    }),
    Ke = e => {
        const {
            prefix: t,
            experimentalParseClassName: o
        } = e;
        let r = n => {
            const m = [];
            let i = 0,
                b = 0,
                d = 0,
                u;
            const w = n.length;
            for (let y = 0; y < w; y++) {
                const k = n[y];
                if (i === 0 && b === 0) {
                    if (k === ge) {
                        m.push(n.slice(d, y)), d = y + 1;
                        continue
                    }
                    if (k === "/") {
                        u = y;
                        continue
                    }
                }
                k === "[" ? i++ : k === "]" ? i-- : k === "(" ? b++ : k === ")" && b--
            }
            const A = m.length === 0 ? n : n.slice(d);
            let C = A,
                G = !1;
            A.endsWith(se) ? (C = A.slice(0, -1), G = !0) : A.startsWith(se) && (C = A.slice(1), G = !0);
            const P = u && u > d ? u - d : void 0;
            return he(m, G, C, P)
        };
        if (t) {
            const n = t + ge,
                m = r;
            r = i => i.startsWith(n) ? m(i.slice(n.length)) : he(He, !1, i, void 0, !0)
        }
        if (o) {
            const n = r;
            r = m => o({
                className: m,
                parseClassName: n
            })
        }
        return r
    },
    Qe = e => {
        const t = new Map;
        return e.orderSensitiveModifiers.forEach((o, r) => {
            t.set(o, 1e6 + r)
        }), o => {
            const r = [];
            let n = [];
            for (let m = 0; m < o.length; m++) {
                const i = o[m],
                    b = i[0] === "[",
                    d = t.has(i);
                b || d ? (n.length > 0 && (n.sort(), r.push(...n), n = []), r.push(i)) : n.push(i)
            }
            return n.length > 0 && (n.sort(), r.push(...n)), r
        }
    },
    Ze = e => ({
        cache: Je(e.cacheSize),
        parseClassName: Ke(e),
        sortModifiers: Qe(e),
        ...We(e)
    }),
    er = /\s+/,
    rr = (e, t) => {
        const {
            parseClassName: o,
            getClassGroupId: r,
            getConflictingClassGroupIds: n,
            sortModifiers: m
        } = t, i = [], b = e.trim().split(er);
        let d = "";
        for (let u = b.length - 1; u >= 0; u -= 1) {
            const w = b[u],
                {
                    isExternal: A,
                    modifiers: C,
                    hasImportantModifier: G,
                    baseClassName: P,
                    maybePostfixModifierPosition: y
                } = o(w);
            if (A) {
                d = w + (d.length > 0 ? " " + d : d);
                continue
            }
            let k = !!y,
                T = r(k ? P.substring(0, y) : P);
            if (!T) {
                if (!k) {
                    d = w + (d.length > 0 ? " " + d : d);
                    continue
                }
                if (T = r(P), !T) {
                    d = w + (d.length > 0 ? " " + d : d);
                    continue
                }
                k = !1
            }
            const $ = C.length === 0 ? "" : C.length === 1 ? C[0] : m(C).join(":"),
                W = G ? $ + se : $,
                L = W + T;
            if (i.indexOf(L) > -1) continue;
            i.push(L);
            const V = n(T, k);
            for (let O = 0; O < V.length; ++O) {
                const _ = V[O];
                i.push(W + _)
            }
            d = w + (d.length > 0 ? " " + d : d)
        }
        return d
    },
    or = (...e) => {
        let t = 0,
            o, r, n = "";
        for (; t < e.length;)(o = e[t++]) && (r = Ae(o)) && (n && (n += " "), n += r);
        return n
    },
    Ae = e => {
        if (typeof e == "string") return e;
        let t, o = "";
        for (let r = 0; r < e.length; r++) e[r] && (t = Ae(e[r])) && (o && (o += " "), o += t);
        return o
    },
    tr = (e, ...t) => {
        let o, r, n, m;
        const i = d => (o = Ze(t.reduce((u, w) => w(u), e())), r = o.cache.get, n = o.cache.set, m = b, b(d)),
            b = d => {
                const u = r(d);
                if (u) return u;
                const w = rr(d, o);
                return n(d, w), w
            };
        return m = i, (...d) => m(or(...d))
    },
    sr = [],
    f = e => {
        const t = o => o[e] || sr;
        return t.isThemeGetter = !0, t
    },
    Se = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
    Re = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
    ar = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
    nr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    ir = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    lr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
    cr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    dr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    R = e => ar.test(e),
    p = e => !!e && !Number.isNaN(Number(e)),
    I = e => !!e && Number.isInteger(Number(e)),
    te = e => e.endsWith("%") && p(e.slice(0, -1)),
    S = e => nr.test(e),
    Ie = () => !0,
    mr = e => ir.test(e) && !lr.test(e),
    ne = () => !1,
    pr = e => cr.test(e),
    br = e => dr.test(e),
    ur = e => !s(e) && !a(e),
    fr = e => M(e, Pe, ne),
    s = e => Se.test(e),
    N = e => M(e, Te, mr),
    ve = e => M(e, zr, p),
    gr = e => M(e, je, Ie),
    hr = e => M(e, Oe, ne),
    we = e => M(e, Me, ne),
    vr = e => M(e, Ge, br),
    J = e => M(e, Ne, pr),
    a = e => Re.test(e),
    B = e => E(e, Te),
    wr = e => E(e, Oe),
    ke = e => E(e, Me),
    kr = e => E(e, Pe),
    xr = e => E(e, Ge),
    H = e => E(e, Ne, !0),
    yr = e => E(e, je, !0),
    M = (e, t, o) => {
        const r = Se.exec(e);
        return r ? r[1] ? t(r[1]) : o(r[2]) : !1
    },
    E = (e, t, o = !1) => {
        const r = Re.exec(e);
        return r ? r[1] ? t(r[1]) : o : !1
    },
    Me = e => e === "position" || e === "percentage",
    Ge = e => e === "image" || e === "url",
    Pe = e => e === "length" || e === "size" || e === "bg-size",
    Te = e => e === "length",
    zr = e => e === "number",
    Oe = e => e === "family-name",
    je = e => e === "number" || e === "weight",
    Ne = e => e === "shadow",
    Cr = () => {
        const e = f("color"),
            t = f("font"),
            o = f("text"),
            r = f("font-weight"),
            n = f("tracking"),
            m = f("leading"),
            i = f("breakpoint"),
            b = f("container"),
            d = f("spacing"),
            u = f("radius"),
            w = f("shadow"),
            A = f("inset-shadow"),
            C = f("text-shadow"),
            G = f("drop-shadow"),
            P = f("blur"),
            y = f("perspective"),
            k = f("aspect"),
            T = f("ease"),
            $ = f("animate"),
            W = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
            L = () => ["center", "top", "bottom", "left", "right", "top-left", "left-top", "top-right", "right-top", "bottom-right", "right-bottom", "bottom-left", "left-bottom"],
            V = () => [...L(), a, s],
            O = () => ["auto", "hidden", "clip", "visible", "scroll"],
            _ = () => ["auto", "contain", "none"],
            l = () => [a, s, d],
            x = () => [R, "full", "auto", ...l()],
            ie = () => [I, "none", "subgrid", a, s],
            le = () => ["auto", {
                span: ["full", I, a, s]
            }, I, a, s],
            U = () => [I, "auto", a, s],
            ce = () => ["auto", "min", "max", "fr", a, s],
            Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"],
            F = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
            z = () => ["auto", ...l()],
            j = () => [R, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...l()],
            Z = () => [R, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...l()],
            ee = () => [R, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...l()],
            c = () => [e, a, s],
            de = () => [...L(), ke, we, {
                position: [a, s]
            }],
            me = () => ["no-repeat", {
                repeat: ["", "x", "y", "space", "round"]
            }],
            pe = () => ["auto", "cover", "contain", kr, fr, {
                size: [a, s]
            }],
            re = () => [te, B, N],
            h = () => ["", "none", "full", u, a, s],
            v = () => ["", p, B, N],
            D = () => ["solid", "dashed", "dotted", "double"],
            be = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
            g = () => [p, te, ke, we],
            ue = () => ["", "none", P, a, s],
            Y = () => ["none", p, a, s],
            q = () => ["none", p, a, s],
            oe = () => [p, a, s],
            X = () => [R, "full", ...l()];
        return {
            cacheSize: 500,
            theme: {
                animate: ["spin", "ping", "pulse", "bounce"],
                aspect: ["video"],
                blur: [S],
                breakpoint: [S],
                color: [Ie],
                container: [S],
                "drop-shadow": [S],
                ease: ["in", "out", "in-out"],
                font: [ur],
                "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
                "inset-shadow": [S],
                leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
                perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
                radius: [S],
                shadow: [S],
                spacing: ["px", p],
                text: [S],
                "text-shadow": [S],
                tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
            },
            classGroups: {
                aspect: [{
                    aspect: ["auto", "square", R, s, a, k]
                }],
                container: ["container"],
                columns: [{
                    columns: [p, s, a, b]
                }],
                "break-after": [{
                    "break-after": W()
                }],
                "break-before": [{
                    "break-before": W()
                }],
                "break-inside": [{
                    "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                }],
                "box-decoration": [{
                    "box-decoration": ["slice", "clone"]
                }],
                box: [{
                    box: ["border", "content"]
                }],
                display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                sr: ["sr-only", "not-sr-only"],
                float: [{
                    float: ["right", "left", "none", "start", "end"]
                }],
                clear: [{
                    clear: ["left", "right", "both", "none", "start", "end"]
                }],
                isolation: ["isolate", "isolation-auto"],
                "object-fit": [{
                    object: ["contain", "cover", "fill", "none", "scale-down"]
                }],
                "object-position": [{
                    object: V()
                }],
                overflow: [{
                    overflow: O()
                }],
                "overflow-x": [{
                    "overflow-x": O()
                }],
                "overflow-y": [{
                    "overflow-y": O()
                }],
                overscroll: [{
                    overscroll: _()
                }],
                "overscroll-x": [{
                    "overscroll-x": _()
                }],
                "overscroll-y": [{
                    "overscroll-y": _()
                }],
                position: ["static", "fixed", "absolute", "relative", "sticky"],
                inset: [{
                    inset: x()
                }],
                "inset-x": [{
                    "inset-x": x()
                }],
                "inset-y": [{
                    "inset-y": x()
                }],
                start: [{
                    "inset-s": x(),
                    start: x()
                }],
                end: [{
                    "inset-e": x(),
                    end: x()
                }],
                "inset-bs": [{
                    "inset-bs": x()
                }],
                "inset-be": [{
                    "inset-be": x()
                }],
                top: [{
                    top: x()
                }],
                right: [{
                    right: x()
                }],
                bottom: [{
                    bottom: x()
                }],
                left: [{
                    left: x()
                }],
                visibility: ["visible", "invisible", "collapse"],
                z: [{
                    z: [I, "auto", a, s]
                }],
                basis: [{
                    basis: [R, "full", "auto", b, ...l()]
                }],
                "flex-direction": [{
                    flex: ["row", "row-reverse", "col", "col-reverse"]
                }],
                "flex-wrap": [{
                    flex: ["nowrap", "wrap", "wrap-reverse"]
                }],
                flex: [{
                    flex: [p, R, "auto", "initial", "none", s]
                }],
                grow: [{
                    grow: ["", p, a, s]
                }],
                shrink: [{
                    shrink: ["", p, a, s]
                }],
                order: [{
                    order: [I, "first", "last", "none", a, s]
                }],
                "grid-cols": [{
                    "grid-cols": ie()
                }],
                "col-start-end": [{
                    col: le()
                }],
                "col-start": [{
                    "col-start": U()
                }],
                "col-end": [{
                    "col-end": U()
                }],
                "grid-rows": [{
                    "grid-rows": ie()
                }],
                "row-start-end": [{
                    row: le()
                }],
                "row-start": [{
                    "row-start": U()
                }],
                "row-end": [{
                    "row-end": U()
                }],
                "grid-flow": [{
                    "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                }],
                "auto-cols": [{
                    "auto-cols": ce()
                }],
                "auto-rows": [{
                    "auto-rows": ce()
                }],
                gap: [{
                    gap: l()
                }],
                "gap-x": [{
                    "gap-x": l()
                }],
                "gap-y": [{
                    "gap-y": l()
                }],
                "justify-content": [{
                    justify: [...Q(), "normal"]
                }],
                "justify-items": [{
                    "justify-items": [...F(), "normal"]
                }],
                "justify-self": [{
                    "justify-self": ["auto", ...F()]
                }],
                "align-content": [{
                    content: ["normal", ...Q()]
                }],
                "align-items": [{
                    items: [...F(), {
                        baseline: ["", "last"]
                    }]
                }],
                "align-self": [{
                    self: ["auto", ...F(), {
                        baseline: ["", "last"]
                    }]
                }],
                "place-content": [{
                    "place-content": Q()
                }],
                "place-items": [{
                    "place-items": [...F(), "baseline"]
                }],
                "place-self": [{
                    "place-self": ["auto", ...F()]
                }],
                p: [{
                    p: l()
                }],
                px: [{
                    px: l()
                }],
                py: [{
                    py: l()
                }],
                ps: [{
                    ps: l()
                }],
                pe: [{
                    pe: l()
                }],
                pbs: [{
                    pbs: l()
                }],
                pbe: [{
                    pbe: l()
                }],
                pt: [{
                    pt: l()
                }],
                pr: [{
                    pr: l()
                }],
                pb: [{
                    pb: l()
                }],
                pl: [{
                    pl: l()
                }],
                m: [{
                    m: z()
                }],
                mx: [{
                    mx: z()
                }],
                my: [{
                    my: z()
                }],
                ms: [{
                    ms: z()
                }],
                me: [{
                    me: z()
                }],
                mbs: [{
                    mbs: z()
                }],
                mbe: [{
                    mbe: z()
                }],
                mt: [{
                    mt: z()
                }],
                mr: [{
                    mr: z()
                }],
                mb: [{
                    mb: z()
                }],
                ml: [{
                    ml: z()
                }],
                "space-x": [{
                    "space-x": l()
                }],
                "space-x-reverse": ["space-x-reverse"],
                "space-y": [{
                    "space-y": l()
                }],
                "space-y-reverse": ["space-y-reverse"],
                size: [{
                    size: j()
                }],
                "inline-size": [{
                    inline: ["auto", ...Z()]
                }],
                "min-inline-size": [{
                    "min-inline": ["auto", ...Z()]
                }],
                "max-inline-size": [{
                    "max-inline": ["none", ...Z()]
                }],
                "block-size": [{
                    block: ["auto", ...ee()]
                }],
                "min-block-size": [{
                    "min-block": ["auto", ...ee()]
                }],
                "max-block-size": [{
                    "max-block": ["none", ...ee()]
                }],
                w: [{
                    w: [b, "screen", ...j()]
                }],
                "min-w": [{
                    "min-w": [b, "screen", "none", ...j()]
                }],
                "max-w": [{
                    "max-w": [b, "screen", "none", "prose", {
                        screen: [i]
                    }, ...j()]
                }],
                h: [{
                    h: ["screen", "lh", ...j()]
                }],
                "min-h": [{
                    "min-h": ["screen", "lh", "none", ...j()]
                }],
                "max-h": [{
                    "max-h": ["screen", "lh", ...j()]
                }],
                "font-size": [{
                    text: ["base", o, B, N]
                }],
                "font-smoothing": ["antialiased", "subpixel-antialiased"],
                "font-style": ["italic", "not-italic"],
                "font-weight": [{
                    font: [r, yr, gr]
                }],
                "font-stretch": [{
                    "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", te, s]
                }],
                "font-family": [{
                    font: [wr, hr, t]
                }],
                "font-features": [{
                    "font-features": [s]
                }],
                "fvn-normal": ["normal-nums"],
                "fvn-ordinal": ["ordinal"],
                "fvn-slashed-zero": ["slashed-zero"],
                "fvn-figure": ["lining-nums", "oldstyle-nums"],
                "fvn-spacing": ["proportional-nums", "tabular-nums"],
                "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                tracking: [{
                    tracking: [n, a, s]
                }],
                "line-clamp": [{
                    "line-clamp": [p, "none", a, ve]
                }],
                leading: [{
                    leading: [m, ...l()]
                }],
                "list-image": [{
                    "list-image": ["none", a, s]
                }],
                "list-style-position": [{
                    list: ["inside", "outside"]
                }],
                "list-style-type": [{
                    list: ["disc", "decimal", "none", a, s]
                }],
                "text-alignment": [{
                    text: ["left", "center", "right", "justify", "start", "end"]
                }],
                "placeholder-color": [{
                    placeholder: c()
                }],
                "text-color": [{
                    text: c()
                }],
                "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                "text-decoration-style": [{
                    decoration: [...D(), "wavy"]
                }],
                "text-decoration-thickness": [{
                    decoration: [p, "from-font", "auto", a, N]
                }],
                "text-decoration-color": [{
                    decoration: c()
                }],
                "underline-offset": [{
                    "underline-offset": [p, "auto", a, s]
                }],
                "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                "text-wrap": [{
                    text: ["wrap", "nowrap", "balance", "pretty"]
                }],
                indent: [{
                    indent: l()
                }],
                "vertical-align": [{
                    align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", a, s]
                }],
                whitespace: [{
                    whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                }],
                break: [{
                    break: ["normal", "words", "all", "keep"]
                }],
                wrap: [{
                    wrap: ["break-word", "anywhere", "normal"]
                }],
                hyphens: [{
                    hyphens: ["none", "manual", "auto"]
                }],
                content: [{
                    content: ["none", a, s]
                }],
                "bg-attachment": [{
                    bg: ["fixed", "local", "scroll"]
                }],
                "bg-clip": [{
                    "bg-clip": ["border", "padding", "content", "text"]
                }],
                "bg-origin": [{
                    "bg-origin": ["border", "padding", "content"]
                }],
                "bg-position": [{
                    bg: de()
                }],
                "bg-repeat": [{
                    bg: me()
                }],
                "bg-size": [{
                    bg: pe()
                }],
                "bg-image": [{
                    bg: ["none", {
                        linear: [{
                            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                        }, I, a, s],
                        radial: ["", a, s],
                        conic: [I, a, s]
                    }, xr, vr]
                }],
                "bg-color": [{
                    bg: c()
                }],
                "gradient-from-pos": [{
                    from: re()
                }],
                "gradient-via-pos": [{
                    via: re()
                }],
                "gradient-to-pos": [{
                    to: re()
                }],
                "gradient-from": [{
                    from: c()
                }],
                "gradient-via": [{
                    via: c()
                }],
                "gradient-to": [{
                    to: c()
                }],
                rounded: [{
                    rounded: h()
                }],
                "rounded-s": [{
                    "rounded-s": h()
                }],
                "rounded-e": [{
                    "rounded-e": h()
                }],
                "rounded-t": [{
                    "rounded-t": h()
                }],
                "rounded-r": [{
                    "rounded-r": h()
                }],
                "rounded-b": [{
                    "rounded-b": h()
                }],
                "rounded-l": [{
                    "rounded-l": h()
                }],
                "rounded-ss": [{
                    "rounded-ss": h()
                }],
                "rounded-se": [{
                    "rounded-se": h()
                }],
                "rounded-ee": [{
                    "rounded-ee": h()
                }],
                "rounded-es": [{
                    "rounded-es": h()
                }],
                "rounded-tl": [{
                    "rounded-tl": h()
                }],
                "rounded-tr": [{
                    "rounded-tr": h()
                }],
                "rounded-br": [{
                    "rounded-br": h()
                }],
                "rounded-bl": [{
                    "rounded-bl": h()
                }],
                "border-w": [{
                    border: v()
                }],
                "border-w-x": [{
                    "border-x": v()
                }],
                "border-w-y": [{
                    "border-y": v()
                }],
                "border-w-s": [{
                    "border-s": v()
                }],
                "border-w-e": [{
                    "border-e": v()
                }],
                "border-w-bs": [{
                    "border-bs": v()
                }],
                "border-w-be": [{
                    "border-be": v()
                }],
                "border-w-t": [{
                    "border-t": v()
                }],
                "border-w-r": [{
                    "border-r": v()
                }],
                "border-w-b": [{
                    "border-b": v()
                }],
                "border-w-l": [{
                    "border-l": v()
                }],
                "divide-x": [{
                    "divide-x": v()
                }],
                "divide-x-reverse": ["divide-x-reverse"],
                "divide-y": [{
                    "divide-y": v()
                }],
                "divide-y-reverse": ["divide-y-reverse"],
                "border-style": [{
                    border: [...D(), "hidden", "none"]
                }],
                "divide-style": [{
                    divide: [...D(), "hidden", "none"]
                }],
                "border-color": [{
                    border: c()
                }],
                "border-color-x": [{
                    "border-x": c()
                }],
                "border-color-y": [{
                    "border-y": c()
                }],
                "border-color-s": [{
                    "border-s": c()
                }],
                "border-color-e": [{
                    "border-e": c()
                }],
                "border-color-bs": [{
                    "border-bs": c()
                }],
                "border-color-be": [{
                    "border-be": c()
                }],
                "border-color-t": [{
                    "border-t": c()
                }],
                "border-color-r": [{
                    "border-r": c()
                }],
                "border-color-b": [{
                    "border-b": c()
                }],
                "border-color-l": [{
                    "border-l": c()
                }],
                "divide-color": [{
                    divide: c()
                }],
                "outline-style": [{
                    outline: [...D(), "none", "hidden"]
                }],
                "outline-offset": [{
                    "outline-offset": [p, a, s]
                }],
                "outline-w": [{
                    outline: ["", p, B, N]
                }],
                "outline-color": [{
                    outline: c()
                }],
                shadow: [{
                    shadow: ["", "none", w, H, J]
                }],
                "shadow-color": [{
                    shadow: c()
                }],
                "inset-shadow": [{
                    "inset-shadow": ["none", A, H, J]
                }],
                "inset-shadow-color": [{
                    "inset-shadow": c()
                }],
                "ring-w": [{
                    ring: v()
                }],
                "ring-w-inset": ["ring-inset"],
                "ring-color": [{
                    ring: c()
                }],
                "ring-offset-w": [{
                    "ring-offset": [p, N]
                }],
                "ring-offset-color": [{
                    "ring-offset": c()
                }],
                "inset-ring-w": [{
                    "inset-ring": v()
                }],
                "inset-ring-color": [{
                    "inset-ring": c()
                }],
                "text-shadow": [{
                    "text-shadow": ["none", C, H, J]
                }],
                "text-shadow-color": [{
                    "text-shadow": c()
                }],
                opacity: [{
                    opacity: [p, a, s]
                }],
                "mix-blend": [{
                    "mix-blend": [...be(), "plus-darker", "plus-lighter"]
                }],
                "bg-blend": [{
                    "bg-blend": be()
                }],
                "mask-clip": [{
                    "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
                }, "mask-no-clip"],
                "mask-composite": [{
                    mask: ["add", "subtract", "intersect", "exclude"]
                }],
                "mask-image-linear-pos": [{
                    "mask-linear": [p]
                }],
                "mask-image-linear-from-pos": [{
                    "mask-linear-from": g()
                }],
                "mask-image-linear-to-pos": [{
                    "mask-linear-to": g()
                }],
                "mask-image-linear-from-color": [{
                    "mask-linear-from": c()
                }],
                "mask-image-linear-to-color": [{
                    "mask-linear-to": c()
                }],
                "mask-image-t-from-pos": [{
                    "mask-t-from": g()
                }],
                "mask-image-t-to-pos": [{
                    "mask-t-to": g()
                }],
                "mask-image-t-from-color": [{
                    "mask-t-from": c()
                }],
                "mask-image-t-to-color": [{
                    "mask-t-to": c()
                }],
                "mask-image-r-from-pos": [{
                    "mask-r-from": g()
                }],
                "mask-image-r-to-pos": [{
                    "mask-r-to": g()
                }],
                "mask-image-r-from-color": [{
                    "mask-r-from": c()
                }],
                "mask-image-r-to-color": [{
                    "mask-r-to": c()
                }],
                "mask-image-b-from-pos": [{
                    "mask-b-from": g()
                }],
                "mask-image-b-to-pos": [{
                    "mask-b-to": g()
                }],
                "mask-image-b-from-color": [{
                    "mask-b-from": c()
                }],
                "mask-image-b-to-color": [{
                    "mask-b-to": c()
                }],
                "mask-image-l-from-pos": [{
                    "mask-l-from": g()
                }],
                "mask-image-l-to-pos": [{
                    "mask-l-to": g()
                }],
                "mask-image-l-from-color": [{
                    "mask-l-from": c()
                }],
                "mask-image-l-to-color": [{
                    "mask-l-to": c()
                }],
                "mask-image-x-from-pos": [{
                    "mask-x-from": g()
                }],
                "mask-image-x-to-pos": [{
                    "mask-x-to": g()
                }],
                "mask-image-x-from-color": [{
                    "mask-x-from": c()
                }],
                "mask-image-x-to-color": [{
                    "mask-x-to": c()
                }],
                "mask-image-y-from-pos": [{
                    "mask-y-from": g()
                }],
                "mask-image-y-to-pos": [{
                    "mask-y-to": g()
                }],
                "mask-image-y-from-color": [{
                    "mask-y-from": c()
                }],
                "mask-image-y-to-color": [{
                    "mask-y-to": c()
                }],
                "mask-image-radial": [{
                    "mask-radial": [a, s]
                }],
                "mask-image-radial-from-pos": [{
                    "mask-radial-from": g()
                }],
                "mask-image-radial-to-pos": [{
                    "mask-radial-to": g()
                }],
                "mask-image-radial-from-color": [{
                    "mask-radial-from": c()
                }],
                "mask-image-radial-to-color": [{
                    "mask-radial-to": c()
                }],
                "mask-image-radial-shape": [{
                    "mask-radial": ["circle", "ellipse"]
                }],
                "mask-image-radial-size": [{
                    "mask-radial": [{
                        closest: ["side", "corner"],
                        farthest: ["side", "corner"]
                    }]
                }],
                "mask-image-radial-pos": [{
                    "mask-radial-at": L()
                }],
                "mask-image-conic-pos": [{
                    "mask-conic": [p]
                }],
                "mask-image-conic-from-pos": [{
                    "mask-conic-from": g()
                }],
                "mask-image-conic-to-pos": [{
                    "mask-conic-to": g()
                }],
                "mask-image-conic-from-color": [{
                    "mask-conic-from": c()
                }],
                "mask-image-conic-to-color": [{
                    "mask-conic-to": c()
                }],
                "mask-mode": [{
                    mask: ["alpha", "luminance", "match"]
                }],
                "mask-origin": [{
                    "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
                }],
                "mask-position": [{
                    mask: de()
                }],
                "mask-repeat": [{
                    mask: me()
                }],
                "mask-size": [{
                    mask: pe()
                }],
                "mask-type": [{
                    "mask-type": ["alpha", "luminance"]
                }],
                "mask-image": [{
                    mask: ["none", a, s]
                }],
                filter: [{
                    filter: ["", "none", a, s]
                }],
                blur: [{
                    blur: ue()
                }],
                brightness: [{
                    brightness: [p, a, s]
                }],
                contrast: [{
                    contrast: [p, a, s]
                }],
                "drop-shadow": [{
                    "drop-shadow": ["", "none", G, H, J]
                }],
                "drop-shadow-color": [{
                    "drop-shadow": c()
                }],
                grayscale: [{
                    grayscale: ["", p, a, s]
                }],
                "hue-rotate": [{
                    "hue-rotate": [p, a, s]
                }],
                invert: [{
                    invert: ["", p, a, s]
                }],
                saturate: [{
                    saturate: [p, a, s]
                }],
                sepia: [{
                    sepia: ["", p, a, s]
                }],
                "backdrop-filter": [{
                    "backdrop-filter": ["", "none", a, s]
                }],
                "backdrop-blur": [{
                    "backdrop-blur": ue()
                }],
                "backdrop-brightness": [{
                    "backdrop-brightness": [p, a, s]
                }],
                "backdrop-contrast": [{
                    "backdrop-contrast": [p, a, s]
                }],
                "backdrop-grayscale": [{
                    "backdrop-grayscale": ["", p, a, s]
                }],
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [p, a, s]
                }],
                "backdrop-invert": [{
                    "backdrop-invert": ["", p, a, s]
                }],
                "backdrop-opacity": [{
                    "backdrop-opacity": [p, a, s]
                }],
                "backdrop-saturate": [{
                    "backdrop-saturate": [p, a, s]
                }],
                "backdrop-sepia": [{
                    "backdrop-sepia": ["", p, a, s]
                }],
                "border-collapse": [{
                    border: ["collapse", "separate"]
                }],
                "border-spacing": [{
                    "border-spacing": l()
                }],
                "border-spacing-x": [{
                    "border-spacing-x": l()
                }],
                "border-spacing-y": [{
                    "border-spacing-y": l()
                }],
                "table-layout": [{
                    table: ["auto", "fixed"]
                }],
                caption: [{
                    caption: ["top", "bottom"]
                }],
                transition: [{
                    transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", a, s]
                }],
                "transition-behavior": [{
                    transition: ["normal", "discrete"]
                }],
                duration: [{
                    duration: [p, "initial", a, s]
                }],
                ease: [{
                    ease: ["linear", "initial", T, a, s]
                }],
                delay: [{
                    delay: [p, a, s]
                }],
                animate: [{
                    animate: ["none", $, a, s]
                }],
                backface: [{
                    backface: ["hidden", "visible"]
                }],
                perspective: [{
                    perspective: [y, a, s]
                }],
                "perspective-origin": [{
                    "perspective-origin": V()
                }],
                rotate: [{
                    rotate: Y()
                }],
                "rotate-x": [{
                    "rotate-x": Y()
                }],
                "rotate-y": [{
                    "rotate-y": Y()
                }],
                "rotate-z": [{
                    "rotate-z": Y()
                }],
                scale: [{
                    scale: q()
                }],
                "scale-x": [{
                    "scale-x": q()
                }],
                "scale-y": [{
                    "scale-y": q()
                }],
                "scale-z": [{
                    "scale-z": q()
                }],
                "scale-3d": ["scale-3d"],
                skew: [{
                    skew: oe()
                }],
                "skew-x": [{
                    "skew-x": oe()
                }],
                "skew-y": [{
                    "skew-y": oe()
                }],
                transform: [{
                    transform: [a, s, "", "none", "gpu", "cpu"]
                }],
                "transform-origin": [{
                    origin: V()
                }],
                "transform-style": [{
                    transform: ["3d", "flat"]
                }],
                translate: [{
                    translate: X()
                }],
                "translate-x": [{
                    "translate-x": X()
                }],
                "translate-y": [{
                    "translate-y": X()
                }],
                "translate-z": [{
                    "translate-z": X()
                }],
                "translate-none": ["translate-none"],
                accent: [{
                    accent: c()
                }],
                appearance: [{
                    appearance: ["none", "auto"]
                }],
                "caret-color": [{
                    caret: c()
                }],
                "color-scheme": [{
                    scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
                }],
                cursor: [{
                    cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", a, s]
                }],
                "field-sizing": [{
                    "field-sizing": ["fixed", "content"]
                }],
                "pointer-events": [{
                    "pointer-events": ["auto", "none"]
                }],
                resize: [{
                    resize: ["none", "", "y", "x"]
                }],
                "scroll-behavior": [{
                    scroll: ["auto", "smooth"]
                }],
                "scroll-m": [{
                    "scroll-m": l()
                }],
                "scroll-mx": [{
                    "scroll-mx": l()
                }],
                "scroll-my": [{
                    "scroll-my": l()
                }],
                "scroll-ms": [{
                    "scroll-ms": l()
                }],
                "scroll-me": [{
                    "scroll-me": l()
                }],
                "scroll-mbs": [{
                    "scroll-mbs": l()
                }],
                "scroll-mbe": [{
                    "scroll-mbe": l()
                }],
                "scroll-mt": [{
                    "scroll-mt": l()
                }],
                "scroll-mr": [{
                    "scroll-mr": l()
                }],
                "scroll-mb": [{
                    "scroll-mb": l()
                }],
                "scroll-ml": [{
                    "scroll-ml": l()
                }],
                "scroll-p": [{
                    "scroll-p": l()
                }],
                "scroll-px": [{
                    "scroll-px": l()
                }],
                "scroll-py": [{
                    "scroll-py": l()
                }],
                "scroll-ps": [{
                    "scroll-ps": l()
                }],
                "scroll-pe": [{
                    "scroll-pe": l()
                }],
                "scroll-pbs": [{
                    "scroll-pbs": l()
                }],
                "scroll-pbe": [{
                    "scroll-pbe": l()
                }],
                "scroll-pt": [{
                    "scroll-pt": l()
                }],
                "scroll-pr": [{
                    "scroll-pr": l()
                }],
                "scroll-pb": [{
                    "scroll-pb": l()
                }],
                "scroll-pl": [{
                    "scroll-pl": l()
                }],
                "snap-align": [{
                    snap: ["start", "end", "center", "align-none"]
                }],
                "snap-stop": [{
                    snap: ["normal", "always"]
                }],
                "snap-type": [{
                    snap: ["none", "x", "y", "both"]
                }],
                "snap-strictness": [{
                    snap: ["mandatory", "proximity"]
                }],
                touch: [{
                    touch: ["auto", "none", "manipulation"]
                }],
                "touch-x": [{
                    "touch-pan": ["x", "left", "right"]
                }],
                "touch-y": [{
                    "touch-pan": ["y", "up", "down"]
                }],
                "touch-pz": ["touch-pinch-zoom"],
                select: [{
                    select: ["none", "text", "all", "auto"]
                }],
                "will-change": [{
                    "will-change": ["auto", "scroll", "contents", "transform", a, s]
                }],
                fill: [{
                    fill: ["none", ...c()]
                }],
                "stroke-w": [{
                    stroke: [p, B, N, ve]
                }],
                stroke: [{
                    stroke: ["none", ...c()]
                }],
                "forced-color-adjust": [{
                    "forced-color-adjust": ["auto", "none"]
                }]
            },
            conflictingClassGroups: {
                overflow: ["overflow-x", "overflow-y"],
                overscroll: ["overscroll-x", "overscroll-y"],
                inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
                "inset-x": ["right", "left"],
                "inset-y": ["top", "bottom"],
                flex: ["basis", "grow", "shrink"],
                gap: ["gap-x", "gap-y"],
                p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
                px: ["pr", "pl"],
                py: ["pt", "pb"],
                m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
                mx: ["mr", "ml"],
                my: ["mt", "mb"],
                size: ["w", "h"],
                "font-size": ["leading"],
                "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                "fvn-ordinal": ["fvn-normal"],
                "fvn-slashed-zero": ["fvn-normal"],
                "fvn-figure": ["fvn-normal"],
                "fvn-spacing": ["fvn-normal"],
                "fvn-fraction": ["fvn-normal"],
                "line-clamp": ["display", "overflow"],
                rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                "rounded-s": ["rounded-ss", "rounded-es"],
                "rounded-e": ["rounded-se", "rounded-ee"],
                "rounded-t": ["rounded-tl", "rounded-tr"],
                "rounded-r": ["rounded-tr", "rounded-br"],
                "rounded-b": ["rounded-br", "rounded-bl"],
                "rounded-l": ["rounded-tl", "rounded-bl"],
                "border-spacing": ["border-spacing-x", "border-spacing-y"],
                "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                "border-w-x": ["border-w-r", "border-w-l"],
                "border-w-y": ["border-w-t", "border-w-b"],
                "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                "border-color-x": ["border-color-r", "border-color-l"],
                "border-color-y": ["border-color-t", "border-color-b"],
                translate: ["translate-x", "translate-y", "translate-none"],
                "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
                "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                "scroll-mx": ["scroll-mr", "scroll-ml"],
                "scroll-my": ["scroll-mt", "scroll-mb"],
                "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                "scroll-px": ["scroll-pr", "scroll-pl"],
                "scroll-py": ["scroll-pt", "scroll-pb"],
                touch: ["touch-x", "touch-y", "touch-pz"],
                "touch-x": ["touch"],
                "touch-y": ["touch"],
                "touch-pz": ["touch"]
            },
            conflictingClassGroupModifiers: {
                "font-size": ["leading"]
            },
            orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
        }
    },
    Ar = tr(Cr);

function Sr(...e) {
    return Ar(Ee(e))
}
export {
    Ee as n, Sr as t
};