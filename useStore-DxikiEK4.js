import {
    i as ae,
    n as U,
    t as le
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as V
} from "./react-D8T8de5F.js";
import {
    t as fe
} from "./invariant-DIU4jf1L.js";

function B(e) {
    return e[e.length - 1]
}

function ue(e) {
    return typeof e == "function"
}

function Ue(e, n) {
    return ue(e) ? e(n) : e
}
var te = Object.prototype.hasOwnProperty,
    H = Object.prototype.propertyIsEnumerable;

function We(e) {
    for (const n in e)
        if (te.call(e, n)) return !0;
    return !1
}
var de = () => Object.create(null),
    Ne = (e, n) => ie(e, n, de);

function ie(e, n, t = () => ({}), r = 0) {
    if (e === n) return e;
    if (r > 500) return n;
    const i = n,
        s = Y(e) && Y(i);
    if (!s && !(M(e) && M(i))) return i;
    const u = s ? e : K(e);
    if (!u) return i;
    const l = s ? i : K(i);
    if (!l) return i;
    const o = u.length,
        x = l.length,
        f = s ? new Array(x) : t();
    let a = 0;
    for (let d = 0; d < x; d++) {
        const c = s ? d : l[d],
            h = e[c],
            g = i[c];
        if (h === g) {
            f[c] = h, (s ? d < o : te.call(e, c)) && a++;
            continue
        }
        if (h === null || g === null || typeof h != "object" || typeof g != "object") {
            f[c] = g;
            continue
        }
        const y = ie(h, g, t, r + 1);
        f[c] = y, y === h && a++
    }
    return o === x && a === o ? e : f
}

function K(e) {
    const n = Object.getOwnPropertyNames(e);
    for (const i of n)
        if (!H.call(e, i)) return !1;
    const t = Object.getOwnPropertySymbols(e);
    if (t.length === 0) return n;
    const r = n;
    for (const i of t) {
        if (!H.call(e, i)) return !1;
        r.push(i)
    }
    return r
}

function M(e) {
    if (!X(e)) return !1;
    const n = e.constructor;
    if (typeof n > "u") return !0;
    const t = n.prototype;
    return !(!X(t) || !t.hasOwnProperty("isPrototypeOf"))
}

function X(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function Y(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function D(e, n, t) {
    if (e === n) return !0;
    if (typeof e != typeof n) return !1;
    if (Array.isArray(e) && Array.isArray(n)) {
        if (e.length !== n.length) return !1;
        for (let r = 0, i = e.length; r < i; r++)
            if (!D(e[r], n[r], t)) return !1;
        return !0
    }
    if (M(e) && M(n)) {
        const r = t ? .ignoreUndefined ? ? !0;
        if (t ? .partial) {
            for (const u in n)
                if ((!r || n[u] !== void 0) && !D(e[u], n[u], t)) return !1;
            return !0
        }
        let i = 0;
        if (!r) i = Object.keys(e).length;
        else
            for (const u in e) e[u] !== void 0 && i++;
        let s = 0;
        for (const u in n)
            if ((!r || n[u] !== void 0) && (s++, s > i || !D(e[u], n[u], t))) return !1;
        return i === s
    }
    return !1
}

function De(e) {
    let n, t;
    const r = new Promise((i, s) => {
        n = i, t = s
    });
    return r.status = "pending", r.resolve = i => {
        r.status = "resolved", r.value = i, n(i), e ? .(i)
    }, r.reject = i => {
        r.status = "rejected", t(i)
    }, r
}

function Fe(e) {
    return typeof e ? .message != "string" ? !1 : e.message.startsWith("Failed to fetch dynamically imported module") || e.message.startsWith("error loading dynamically imported module") || e.message.startsWith("Importing a module script failed")
}

function $e(e) {
    return !!(e && typeof e == "object" && typeof e.then == "function")
}

function he(e) {
    return e.replace(/[\x00-\x1f\x7f]/g, "")
}

function J(e) {
    let n;
    try {
        n = decodeURI(e)
    } catch {
        n = e.replaceAll(/%[0-9A-F]{2}/gi, t => {
            try {
                return decodeURI(t)
            } catch {
                return t
            }
        })
    }
    return he(n)
}
var Te = ["http:", "https:", "mailto:", "tel:"];

function Be(e, n) {
    if (!e) return !1;
    try {
        const t = new URL(e);
        return !n.has(t.protocol)
    } catch {
        return !1
    }
}
var pe = {
        "&": "\\u0026",
        ">": "\\u003e",
        "<": "\\u003c",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
    },
    ge = /[&><\u2028\u2029]/g;

function ze(e) {
    return e.replace(ge, n => pe[n])
}

function Ve(e) {
    if (!e) return {
        path: e,
        handledProtocolRelativeURL: !1
    };
    if (!/[%\\\x00-\x1f\x7f]/.test(e) && !e.startsWith("//")) return {
        path: e,
        handledProtocolRelativeURL: !1
    };
    const n = /%25|%5C/gi;
    let t = 0,
        r = "",
        i;
    for (;
        (i = n.exec(e)) !== null;) r += J(e.slice(t, i.index)) + i[0], t = n.lastIndex;
    r = r + J(t ? e.slice(t) : e);
    let s = !1;
    return r.startsWith("//") && (s = !0, r = "/" + r.replace(/^\/+/, "")), {
        path: r,
        handledProtocolRelativeURL: s
    }
}

function qe(e) {
    return /\s|[^\u0000-\u007F]/.test(e) ? e.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent) : e
}

function Ge(e, n) {
    if (e === n) return !0;
    if (e.length !== n.length) return !1;
    for (let t = 0; t < e.length; t++)
        if (e[t] !== n[t]) return !1;
    return !0
}

function z(e) {
    const n = new Map;
    let t, r;
    const i = s => {
        s.next && (s.prev ? (s.prev.next = s.next, s.next.prev = s.prev, s.next = void 0, r && (r.next = s, s.prev = r)) : (s.next.prev = void 0, t = s.next, s.next = void 0, r && (s.prev = r, r.next = s)), r = s)
    };
    return {
        get(s) {
            const u = n.get(s);
            if (u) return i(u), u.value
        },
        set(s, u) {
            if (n.size >= e && t) {
                const o = t;
                n.delete(o.key), o.next && (t = o.next, o.next.prev = void 0), o === r && (r = void 0)
            }
            const l = n.get(s);
            if (l) l.value = u, i(l);
            else {
                const o = {
                    key: s,
                    value: u,
                    prev: r
                };
                r && (r.next = o), r = o, t || (t = o), n.set(s, o)
            }
        },
        clear() {
            n.clear(), t = void 0, r = void 0
        }
    }
}
var I = 4,
    se = 5;

function me(e) {
    const n = e.indexOf("{");
    if (n === -1) return null;
    const t = e.indexOf("}", n);
    return t === -1 || n + 1 >= e.length ? null : [n, t]
}

function re(e, n, t = new Uint16Array(6)) {
    const r = e.indexOf("/", n),
        i = r === -1 ? e.length : r,
        s = e.substring(n, i);
    if (!s || !s.includes("$")) return t[0] = 0, t[1] = n, t[2] = n, t[3] = i, t[4] = i, t[5] = i, t;
    if (s === "$") {
        const l = e.length;
        return t[0] = 2, t[1] = n, t[2] = n, t[3] = l, t[4] = l, t[5] = l, t
    }
    if (s.charCodeAt(0) === 36) return t[0] = 1, t[1] = n, t[2] = n + 1, t[3] = i, t[4] = i, t[5] = i, t;
    const u = me(s);
    if (u) {
        const [l, o] = u, x = s.charCodeAt(l + 1);
        if (x === 45) {
            if (l + 2 < s.length && s.charCodeAt(l + 2) === 36) {
                const f = l + 3,
                    a = o;
                if (f < a) return t[0] = 3, t[1] = n + l, t[2] = n + f, t[3] = n + a, t[4] = n + o + 1, t[5] = i, t
            }
        } else if (x === 36) {
            const f = l + 1,
                a = l + 2;
            return a === o ? (t[0] = 2, t[1] = n + l, t[2] = n + f, t[3] = n + a, t[4] = n + o + 1, t[5] = e.length, t) : (t[0] = 1, t[1] = n + l, t[2] = n + a, t[3] = n + o, t[4] = n + o + 1, t[5] = i, t)
        }
    }
    return t[0] = 0, t[1] = n, t[2] = n, t[3] = i, t[4] = i, t[5] = i, t
}

function W(e, n, t, r, i, s, u) {
    u ? .(t);
    let l = r; {
        const o = t.fullPath ? ? t.from,
            x = o.length,
            f = t.options ? .caseSensitive ? ? e,
            a = t.options ? .params ? .parse ? ? t.options ? .parseParams;
        for (; l < x;) {
            const c = re(o, l, n);
            let h;
            const g = l,
                y = c[5];
            switch (l = y + 1, s++, c[0]) {
                case 0:
                    {
                        const m = o.substring(c[2], c[3]);
                        if (f) {
                            const P = i.static ? .get(m);
                            if (P) h = P;
                            else {
                                i.static ? ? = new Map;
                                const v = O(t.fullPath ? ? t.from);
                                v.parent = i, v.depth = s, h = v, i.static.set(m, v)
                            }
                        } else {
                            const P = m.toLowerCase(),
                                v = i.staticInsensitive ? .get(P);
                            if (v) h = v;
                            else {
                                i.staticInsensitive ? ? = new Map;
                                const w = O(t.fullPath ? ? t.from);
                                w.parent = i, w.depth = s, h = w, i.staticInsensitive.set(P, w)
                            }
                        }
                        break
                    }
                case 1:
                    {
                        const m = o.substring(g, c[1]),
                            P = o.substring(c[4], y),
                            v = f && !!(m || P),
                            w = m ? v ? m : m.toLowerCase() : void 0,
                            S = P ? v ? P : P.toLowerCase() : void 0,
                            b = !a && i.dynamic ? .find(p => !p.parse && p.caseSensitive === v && p.prefix === w && p.suffix === S);
                        if (b) h = b;
                        else {
                            const p = $(1, t.fullPath ? ? t.from, v, w, S);
                            h = p, p.depth = s, p.parent = i, i.dynamic ? ? = [], i.dynamic.push(p)
                        }
                        break
                    }
                case 3:
                    {
                        const m = o.substring(g, c[1]),
                            P = o.substring(c[4], y),
                            v = f && !!(m || P),
                            w = m ? v ? m : m.toLowerCase() : void 0,
                            S = P ? v ? P : P.toLowerCase() : void 0,
                            b = !a && i.optional ? .find(p => !p.parse && p.caseSensitive === v && p.prefix === w && p.suffix === S);
                        if (b) h = b;
                        else {
                            const p = $(3, t.fullPath ? ? t.from, v, w, S);
                            h = p, p.parent = i, p.depth = s, i.optional ? ? = [], i.optional.push(p)
                        }
                        break
                    }
                case 2:
                    {
                        const m = o.substring(g, c[1]),
                            P = o.substring(c[4], y),
                            v = f && !!(m || P),
                            w = m ? v ? m : m.toLowerCase() : void 0,
                            S = P ? v ? P : P.toLowerCase() : void 0,
                            b = $(2, t.fullPath ? ? t.from, v, w, S);h = b,
                        b.parent = i,
                        b.depth = s,
                        i.wildcard ? ? = [],
                        i.wildcard.push(b)
                    }
            }
            i = h
        }
        if (a && t.children && !t.isRoot && t.id && t.id.charCodeAt(t.id.lastIndexOf("/") + 1) === 95) {
            const c = O(t.fullPath ? ? t.from);
            c.kind = se, c.parent = i, s++, c.depth = s, i.pathless ? ? = [], i.pathless.push(c), i = c
        }
        const d = (t.path || !t.children) && !t.isRoot;
        if (d && o.endsWith("/")) {
            const c = O(t.fullPath ? ? t.from);
            c.kind = I, c.parent = i, s++, c.depth = s, i.index = c, i = c
        }
        i.parse = a ? ? null, i.priority = t.options ? .params ? .priority ? ? 0, d && !i.route && (i.route = t, i.fullPath = t.fullPath ? ? t.from)
    }
    if (t.children)
        for (const o of t.children) W(e, n, o, l, i, s, u)
}

function F(e, n) {
    if (e.parse && !n.parse) return -1;
    if (!e.parse && n.parse) return 1;
    if (e.parse && n.parse && (e.priority || n.priority)) return n.priority - e.priority;
    if (e.prefix && n.prefix && e.prefix !== n.prefix) {
        if (e.prefix.startsWith(n.prefix)) return -1;
        if (n.prefix.startsWith(e.prefix)) return 1
    }
    if (e.suffix && n.suffix && e.suffix !== n.suffix) {
        if (e.suffix.endsWith(n.suffix)) return -1;
        if (n.suffix.endsWith(e.suffix)) return 1
    }
    return e.prefix && !n.prefix ? -1 : !e.prefix && n.prefix ? 1 : e.suffix && !n.suffix ? -1 : !e.suffix && n.suffix ? 1 : e.caseSensitive && !n.caseSensitive ? -1 : !e.caseSensitive && n.caseSensitive ? 1 : 0
}

function E(e) {
    if (e.pathless)
        for (const n of e.pathless) E(n);
    if (e.static)
        for (const n of e.static.values()) E(n);
    if (e.staticInsensitive)
        for (const n of e.staticInsensitive.values()) E(n);
    if (e.dynamic ? .length) {
        e.dynamic.sort(F);
        for (const n of e.dynamic) E(n)
    }
    if (e.optional ? .length) {
        e.optional.sort(F);
        for (const n of e.optional) E(n)
    }
    if (e.wildcard ? .length) {
        e.wildcard.sort(F);
        for (const n of e.wildcard) E(n)
    }
}

function O(e) {
    return {
        kind: 0,
        depth: 0,
        pathless: null,
        index: null,
        static: null,
        staticInsensitive: null,
        dynamic: null,
        optional: null,
        wildcard: null,
        route: null,
        fullPath: e,
        parent: null,
        parse: null,
        priority: 0
    }
}

function $(e, n, t, r, i) {
    return {
        kind: e,
        depth: 0,
        pathless: null,
        index: null,
        static: null,
        staticInsensitive: null,
        dynamic: null,
        optional: null,
        wildcard: null,
        route: null,
        fullPath: n,
        parent: null,
        parse: null,
        priority: 0,
        caseSensitive: t,
        prefix: r,
        suffix: i
    }
}

function He(e, n) {
    const t = O("/"),
        r = new Uint16Array(6);
    for (const i of e) W(!1, r, i, 1, t, 0);
    E(t), n.masksTree = t, n.flatCache = z(1e3)
}

function Ke(e, n) {
    e || = "/";
    const t = n.flatCache.get(e);
    if (t) return t;
    const r = q(e, n.masksTree);
    return n.flatCache.set(e, r), r
}

function Xe(e, n, t, r, i) {
    e || = "/", r || = "/";
    const s = n ? `case\0${e}` : e;
    let u = i.singleCache.get(s);
    return u || (u = O("/"), W(n, new Uint16Array(6), {
        from: e
    }, 1, u, 0), i.singleCache.set(s, u)), q(r, u, t)
}

function Ye(e, n, t = !1) {
    const r = t ? e : `nofuzz\0${e}`,
        i = n.matchCache.get(r);
    if (i !== void 0) return i;
    e || = "/";
    let s;
    try {
        s = q(e, n.segmentTree, t)
    } catch (u) {
        if (u instanceof URIError) s = null;
        else throw u
    }
    return s && (s.branch = ye(s.route)), n.matchCache.set(r, s), s
}

function xe(e) {
    return e === "/" ? e : e.replace(/\/{1,}$/, "")
}

function Je(e, n = !1, t) {
    const r = O(e.fullPath),
        i = new Uint16Array(6),
        s = {},
        u = {};
    let l = 0;
    return W(n, i, e, 1, r, 0, o => {
        if (t ? .(o, l), o.id in s && fe(), s[o.id] = o, l !== 0 && o.path) {
            const x = xe(o.fullPath);
            (!u[x] || o.fullPath.endsWith("/")) && (u[x] = o)
        }
        l++
    }), E(r), {
        processedTree: {
            segmentTree: r,
            singleCache: z(1e3),
            matchCache: z(1e3),
            flatCache: null,
            masksTree: null
        },
        routesById: s,
        routesByPath: u
    }
}

function q(e, n, t = !1) {
    const r = e.split("/"),
        i = Pe(e, r, n, t);
    if (!i) return null;
    const [s] = ce(e, r, i);
    return {
        route: i.node.route,
        rawParams: s
    }
}

function ce(e, n, t) {
    const r = ve(t.node);
    let i = null;
    const s = Object.create(null);
    let u = t.extract ? .part ? ? 0,
        l = t.extract ? .node ? ? 0,
        o = t.extract ? .path ? ? 0,
        x = t.extract ? .segment ? ? 0;
    for (; l < r.length; u++, l++, o++, x++) {
        const f = r[l];
        if (f.kind === I) break;
        if (f.kind === se) {
            x--, u--, o--;
            continue
        }
        const a = n[u],
            d = o;
        if (a && (o += a.length), f.kind === 1) {
            i ? ? = t.node.fullPath.split("/");
            const c = i[x],
                h = f.prefix ? .length ? ? 0;
            if (c.charCodeAt(h) === 123) {
                const g = f.suffix ? .length ? ? 0,
                    y = c.substring(h + 2, c.length - g - 1),
                    m = a.substring(h, a.length - g);
                s[y] = decodeURIComponent(m)
            } else {
                const g = c.substring(1);
                s[g] = decodeURIComponent(a)
            }
        } else if (f.kind === 3) {
            if (t.skipped & 1 << l) {
                u--, o = d - 1;
                continue
            }
            i ? ? = t.node.fullPath.split("/");
            const c = i[x],
                h = f.prefix ? .length ? ? 0,
                g = f.suffix ? .length ? ? 0,
                y = c.substring(h + 3, c.length - g - 1),
                m = f.suffix || f.prefix ? a.substring(h, a.length - g) : a;
            m && (s[y] = decodeURIComponent(m))
        } else if (f.kind === 2) {
            const c = f,
                h = e.substring(d + (c.prefix ? .length ? ? 0), e.length - (c.suffix ? .length ? ? 0)),
                g = decodeURIComponent(h);
            s["*"] = g, s._splat = g;
            break
        }
    }
    return t.rawParams && Object.assign(s, t.rawParams), [s, {
        part: u,
        node: l,
        path: o,
        segment: x
    }]
}

function ye(e) {
    const n = [e];
    for (; e.parentRoute;) e = e.parentRoute, n.push(e);
    return n.reverse(), n
}

function ve(e) {
    const n = Array(e.depth + 1);
    do n[e.depth] = e, e = e.parent; while (e);
    return n
}

function Pe(e, n, t, r) {
    if (e === "/" && t.index) return {
        node: t.index,
        skipped: 0
    };
    const i = !B(n),
        s = i && e !== "/",
        u = n.length - (i ? 1 : 0),
        l = [{
            node: t,
            index: 1,
            skipped: 0,
            depth: 1,
            statics: 0,
            dynamics: 0,
            optionals: 0
        }];
    let o = null,
        x = null;
    for (; l.length;) {
        const f = l.pop(),
            {
                node: a,
                index: d,
                skipped: c,
                depth: h,
                statics: g,
                dynamics: y,
                optionals: m
            } = f;
        let {
            extract: P,
            rawParams: v
        } = f;
        if (a.kind === 2 && a.route && !A(x, f)) continue;
        if (a.parse) {
            if (!Z(e, n, f)) continue;
            v = f.rawParams, P = f.extract
        }
        r && a.route && a.kind !== I && A(o, f) && (o = f);
        const w = d === u;
        if (w && (a.route && (!s || a.kind === I || a.kind === 2) && A(x, f) && (x = f), !a.optional && !a.wildcard && !a.index && !a.pathless)) continue;
        const S = w ? void 0 : n[d];
        let b;
        if (w && a.index) {
            const p = {
                node: a.index,
                index: d,
                skipped: c,
                depth: h + 1,
                statics: g,
                dynamics: y,
                optionals: m,
                extract: P,
                rawParams: v
            };
            let C = !0;
            if (a.index.parse && (Z(e, n, p) || (C = !1)), C) {
                if (!y && !m && !c && we(g, u)) return p;
                A(x, p) && (x = p)
            }
        }
        if (a.wildcard)
            for (let p = a.wildcard.length - 1; p >= 0; p--) {
                const C = a.wildcard[p],
                    {
                        prefix: k,
                        suffix: _
                    } = C;
                if (!(k && (w || !(C.caseSensitive ? S : b ? ? = S.toLowerCase()).startsWith(k)))) {
                    if (_) {
                        if (w) continue;
                        const j = n.slice(d).join("/").slice(-_.length);
                        if ((C.caseSensitive ? j : j.toLowerCase()) !== _) continue
                    }
                    l.push({
                        node: C,
                        index: u,
                        skipped: c,
                        depth: h + 1,
                        statics: g,
                        dynamics: y,
                        optionals: m,
                        extract: P,
                        rawParams: v
                    })
                }
            }
        if (a.optional) {
            const p = c | 1 << h,
                C = h + 1;
            for (let k = a.optional.length - 1; k >= 0; k--) {
                const _ = a.optional[k];
                l.push({
                    node: _,
                    index: d,
                    skipped: p,
                    depth: C,
                    statics: g,
                    dynamics: y,
                    optionals: m,
                    extract: P,
                    rawParams: v
                })
            }
            if (!w)
                for (let k = a.optional.length - 1; k >= 0; k--) {
                    const _ = a.optional[k],
                        {
                            prefix: j,
                            suffix: N
                        } = _;
                    if (j || N) {
                        const G = _.caseSensitive ? S : b ? ? = S.toLowerCase();
                        if (j && !G.startsWith(j) || N && !G.endsWith(N)) continue
                    }
                    l.push({
                        node: _,
                        index: d + 1,
                        skipped: c,
                        depth: C,
                        statics: g,
                        dynamics: y,
                        optionals: m + R(u, d),
                        extract: P,
                        rawParams: v
                    })
                }
        }
        if (!w && a.dynamic && S)
            for (let p = a.dynamic.length - 1; p >= 0; p--) {
                const C = a.dynamic[p],
                    {
                        prefix: k,
                        suffix: _
                    } = C;
                if (k || _) {
                    const j = C.caseSensitive ? S : b ? ? = S.toLowerCase();
                    if (k && !j.startsWith(k) || _ && !j.endsWith(_)) continue
                }
                l.push({
                    node: C,
                    index: d + 1,
                    skipped: c,
                    depth: h + 1,
                    statics: g,
                    dynamics: y + R(u, d),
                    optionals: m,
                    extract: P,
                    rawParams: v
                })
            }
        if (!w && a.staticInsensitive) {
            const p = a.staticInsensitive.get(b ? ? = S.toLowerCase());
            p && l.push({
                node: p,
                index: d + 1,
                skipped: c,
                depth: h + 1,
                statics: g + R(u, d),
                dynamics: y,
                optionals: m,
                extract: P,
                rawParams: v
            })
        }
        if (!w && a.static) {
            const p = a.static.get(S);
            p && l.push({
                node: p,
                index: d + 1,
                skipped: c,
                depth: h + 1,
                statics: g + R(u, d),
                dynamics: y,
                optionals: m,
                extract: P,
                rawParams: v
            })
        }
        if (a.pathless) {
            const p = h + 1;
            for (let C = a.pathless.length - 1; C >= 0; C--) {
                const k = a.pathless[C];
                l.push({
                    node: k,
                    index: d,
                    skipped: c,
                    depth: p,
                    statics: g,
                    dynamics: y,
                    optionals: m,
                    extract: P,
                    rawParams: v
                })
            }
        }
    }
    if (x) return x;
    if (r && o) {
        let f = o.index;
        for (let d = 0; d < o.index; d++) f += n[d].length;
        const a = f === e.length ? "/" : e.slice(f);
        return o.rawParams ? ? = Object.create(null), o.rawParams["**"] = decodeURIComponent(a), o
    }
    return null
}

function R(e, n) {
    return 2 ** (e - n - 1)
}

function we(e, n) {
    return e === 2 ** (n - 1) - 1
}

function Z(e, n, t) {
    let r, i;
    try {
        [r, i] = ce(e, n, t)
    } catch {
        return null
    }
    if (t.rawParams = r, t.extract = i, !t.node.parse) return !0;
    try {
        if (t.node.parse(r) === !1) return null
    } catch {}
    return !0
}

function A(e, n) {
    return e ? n.statics > e.statics || n.statics === e.statics && (n.dynamics > e.dynamics || n.dynamics === e.dynamics && (n.optionals > e.optionals || n.optionals === e.optionals && ((n.node.kind === I) > (e.node.kind === I) || n.node.kind === I == (e.node.kind === I) && n.depth > e.depth))) : !0
}

function Ze(e) {
    return oe(e.filter(n => n !== void 0).join("/"))
}

function oe(e) {
    return e.replace(/\/{2,}/g, "/")
}

function Ce(e) {
    return e === "/" ? e : e.replace(/^\/{1,}/, "")
}

function Se(e) {
    const n = e.length;
    return n > 1 && e[n - 1] === "/" ? e.replace(/\/{1,}$/, "") : e
}

function Qe(e) {
    return Se(Ce(e))
}

function Q(e, n) {
    return e ? .endsWith("/") && e !== "/" && e !== `${n}/` ? e.slice(0, -1) : e
}

function en(e, n, t) {
    return Q(e, t) === Q(n, t)
}

function nn({
    base: e,
    to: n,
    trailingSlash: t = "never",
    cache: r
}) {
    const i = n.startsWith("/"),
        s = !i && n === ".";
    let u;
    if (r) {
        u = i ? n : s ? e : e + "\0" + n;
        const x = r.get(u);
        if (x) return x
    }
    let l;
    if (s) l = e.split("/");
    else if (i) l = n.split("/");
    else {
        for (l = e.split("/"); l.length > 1 && B(l) === "";) l.pop();
        const x = n.split("/");
        for (let f = 0, a = x.length; f < a; f++) {
            const d = x[f];
            d === "" ? f ? f === a - 1 && l.push(d) : l = [d] : d === ".." ? l.pop() : d === "." || l.push(d)
        }
    }
    l.length > 1 && (B(l) === "" ? t === "never" && l.pop() : t === "always" && l.push(""));
    const o = oe(l.join("/")) || "/";
    return u && r && r.set(u, o), o
}

function tn(e) {
    const n = new Map(e.map(i => [encodeURIComponent(i), i])),
        t = Array.from(n.keys()).map(i => i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
        r = new RegExp(t, "g");
    return i => i.replace(r, s => n.get(s) ? ? s)
}

function T(e, n, t) {
    const r = n[e];
    return typeof r != "string" ? r : e === "_splat" ? /^[a-zA-Z0-9\-._~!/]*$/.test(r) ? r : r.split("/").map(i => ee(i, t)).join("/") : ee(r, t)
}

function sn({
    path: e,
    params: n,
    decoder: t,
    ...r
}) {
    let i = !1;
    const s = Object.create(null);
    if (!e || e === "/") return {
        interpolatedPath: "/",
        usedParams: s,
        isMissingParams: i
    };
    if (!e.includes("$")) return {
        interpolatedPath: e,
        usedParams: s,
        isMissingParams: i
    };
    const u = e.length;
    let l = 0,
        o, x = "";
    for (; l < u;) {
        const f = l;
        o = re(e, f, o);
        const a = o[5];
        if (l = a + 1, f === a) continue;
        const d = o[0];
        if (d === 0) {
            x += "/" + e.substring(f, a);
            continue
        }
        if (d === 2) {
            const c = n._splat;
            s._splat = c, s["*"] = c;
            const h = e.substring(f, o[1]),
                g = e.substring(o[4], a);
            if (!c) {
                i = !0, (h || g) && (x += "/" + h + g);
                continue
            }
            const y = T("_splat", n, t);
            x += "/" + h + y + g;
            continue
        }
        if (d === 1) {
            const c = e.substring(o[2], o[3]);
            !i && !(c in n) && (i = !0), s[c] = n[c];
            const h = e.substring(f, o[1]),
                g = e.substring(o[4], a),
                y = T(c, n, t) ? ? "undefined";
            x += "/" + h + y + g;
            continue
        }
        if (d === 3) {
            const c = e.substring(o[2], o[3]),
                h = n[c];
            if (h == null) continue;
            s[c] = h;
            const g = e.substring(f, o[1]),
                y = e.substring(o[4], a),
                m = T(c, n, t) ? ? "";
            x += "/" + g + m + y;
            continue
        }
    }
    return e.endsWith("/") && (x += "/"), {
        usedParams: s,
        interpolatedPath: x || "/",
        isMissingParams: i
    }
}

function ee(e, n) {
    const t = encodeURIComponent(e);
    return n ? .(t) ? ? t
}
var L = ae(V(), 1),
    ne = le();

function rn({
    children: e,
    fallback: n = null
}) {
    return ke() ? (0, ne.jsx)(L.Fragment, {
        children: e
    }) : (0, ne.jsx)(L.Fragment, {
        children: n
    })
}

function ke() {
    return L.useSyncExternalStore(be, () => !0, () => !1)
}

function be() {
    return () => {}
}
var _e = U((e => {
        var n = V();

        function t(d, c) {
            return d === c && (d !== 0 || 1 / d === 1 / c) || d !== d && c !== c
        }
        var r = typeof Object.is == "function" ? Object.is : t,
            i = n.useState,
            s = n.useEffect,
            u = n.useLayoutEffect,
            l = n.useDebugValue;

        function o(d, c) {
            var h = c(),
                g = i({
                    inst: {
                        value: h,
                        getSnapshot: c
                    }
                }),
                y = g[0].inst,
                m = g[1];
            return u(function() {
                y.value = h, y.getSnapshot = c, x(y) && m({
                    inst: y
                })
            }, [d, h, c]), s(function() {
                return x(y) && m({
                    inst: y
                }), d(function() {
                    x(y) && m({
                        inst: y
                    })
                })
            }, [d]), l(h), h
        }

        function x(d) {
            var c = d.getSnapshot;
            d = d.value;
            try {
                var h = c();
                return !r(d, h)
            } catch {
                return !0
            }
        }

        function f(d, c) {
            return c()
        }
        var a = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f : o;
        e.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : a
    })),
    je = U(((e, n) => {
        n.exports = _e()
    })),
    Ee = U((e => {
        var n = V(),
            t = je();

        function r(f, a) {
            return f === a && (f !== 0 || 1 / f === 1 / a) || f !== f && a !== a
        }
        var i = typeof Object.is == "function" ? Object.is : r,
            s = t.useSyncExternalStore,
            u = n.useRef,
            l = n.useEffect,
            o = n.useMemo,
            x = n.useDebugValue;
        e.useSyncExternalStoreWithSelector = function(f, a, d, c, h) {
            var g = u(null);
            if (g.current === null) {
                var y = {
                    hasValue: !1,
                    value: null
                };
                g.current = y
            } else y = g.current;
            g = o(function() {
                function P(p) {
                    if (!v) {
                        if (v = !0, w = p, p = c(p), h !== void 0 && y.hasValue) {
                            var C = y.value;
                            if (h(C, p)) return S = C
                        }
                        return S = p
                    }
                    if (C = S, i(w, p)) return C;
                    var k = c(p);
                    return h !== void 0 && h(C, k) ? (w = p, C) : (w = p, S = k)
                }
                var v = !1,
                    w, S, b = d === void 0 ? null : d;
                return [function() {
                    return P(a())
                }, b === null ? void 0 : function() {
                    return P(b())
                }]
            }, [a, d, c, h]);
            var m = s(f, g[0], g[1]);
            return l(function() {
                y.hasValue = !0, y.value = m
            }, [m]), x(m), m
        }
    })),
    Ie = U(((e, n) => {
        n.exports = Ee()
    })),
    Oe = Ie();

function Le(e, n) {
    return e === n
}

function cn(e, n, t = Le) {
    const r = (0, L.useCallback)(s => {
            if (!e) return () => {};
            const {
                unsubscribe: u
            } = e.subscribe(s);
            return u
        }, [e]),
        i = (0, L.useCallback)(() => e ? .get(), [e]);
    return (0, Oe.useSyncExternalStoreWithSelector)(r, i, i, n, t)
}
export {
    Be as A, De as C, ze as D, qe as E, ie as F, $e as M, B as N, Ue as O, Ne as P, Ge as S, D as T, Xe as _, tn as a, z as b, Ze as c, Qe as d, Ce as f, Ye as g, Ke as h, oe as i, Fe as j, We as k, Q as l, ye as m, rn as n, en as o, Se as p, ke as r, sn as s, cn as t, nn as u, He as v, Ve as w, Te as x, Je as y
};