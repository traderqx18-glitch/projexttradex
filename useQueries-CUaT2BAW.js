import {
    i as E
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as Q
} from "./react-D8T8de5F.js";
import {
    An as C,
    Cn as w,
    Dn as O,
    Mn as S,
    On as y,
    Pn as M,
    Sn as x,
    Tn as k,
    _n as q,
    bn as H,
    jn as P,
    vn as _,
    wn as B,
    xn as T,
    yn as v
} from "./index-dGs9i_Jo.js";

function R(r, e) {
    const s = new Set(e);
    return r.filter(t => !s.has(t))
}

function L(r, e, s) {
    const t = r.slice(0);
    return t[e] = s, t
}
var j = class extends M {#
        r;#
        e;#
        i;#
        n;#
        s;#
        t;#
        o;#
        u;#
        h;#
        a = [];
        constructor(r, e, s) {
            super(), this.#r = r, this.#n = s, this.#i = [], this.#s = [], this.#e = [], this.setQueries(e)
        }
        onSubscribe() {
            this.listeners.size === 1 && this.#s.forEach(r => {
                r.subscribe(e => {
                    this.#p(r, e)
                })
            })
        }
        onUnsubscribe() {
            this.listeners.size || this.destroy()
        }
        destroy() {
            this.listeners = new Set, this.#s.forEach(r => {
                r.destroy()
            })
        }
        setQueries(r, e) {
            this.#i = r, this.#n = e, y.batch(() => {
                const s = this.#s,
                    t = this.#f(this.#i);
                t.forEach(o => o.observer.setOptions(o.defaultedQueryOptions));
                const i = t.map(o => o.observer),
                    n = i.map(o => o.getCurrentResult()),
                    u = s.length !== i.length,
                    a = i.some((o, f) => o !== s[f]),
                    l = u || a,
                    g = l ? !0 : n.some((o, f) => {
                        const d = this.#e[f];
                        return !d || !S(o, d)
                    });
                !l && !g || (l && (this.#a = t, this.#s = i), this.#e = n, this.hasListeners() && (l && (R(s, i).forEach(o => {
                    o.destroy()
                }), R(i, s).forEach(o => {
                    o.subscribe(f => {
                        this.#p(o, f)
                    })
                })), this.#d()))
            })
        }
        getCurrentResult() {
            return this.#e
        }
        getQueries() {
            return this.#s.map(r => r.getCurrentQuery())
        }
        getObservers() {
            return this.#s
        }
        getOptimisticResult(r, e) {
            const s = this.#f(r),
                t = s.map(n => n.observer.getOptimisticResult(n.defaultedQueryOptions)),
                i = s.map(n => n.defaultedQueryOptions.queryHash);
            return [t, n => this.#l(n ? ? t, e, i), () => this.#c(t, s)]
        }#
        c(r, e) {
            return e.map((s, t) => {
                const i = r[t];
                return s.defaultedQueryOptions.notifyOnChangeProps ? i : s.observer.trackResult(i, n => {
                    e.forEach(u => {
                        u.observer.trackProp(n)
                    })
                })
            })
        }#
        l(r, e, s) {
            if (e) {
                const t = this.#h,
                    i = s !== void 0 && t !== void 0 && (t.length !== s.length || s.some((n, u) => n !== t[u]));
                return (!this.#t || this.#e !== this.#u || i || e !== this.#o) && (this.#o = e, this.#u = this.#e, s !== void 0 && (this.#h = s), this.#t = P(this.#t, e(r))), this.#t
            }
            return r
        }#
        f(r) {
            const e = new Map;
            this.#s.forEach(t => {
                const i = t.options.queryHash;
                if (!i) return;
                const n = e.get(i);
                n ? n.push(t) : e.set(i, [t])
            });
            const s = [];
            return r.forEach(t => {
                const i = this.#r.defaultQueryOptions(t),
                    n = e.get(i.queryHash) ? .shift() ? ? new O(this.#r, i);
                s.push({
                    defaultedQueryOptions: i,
                    observer: n
                })
            }), s
        }#
        p(r, e) {
            const s = this.#s.indexOf(r);
            s !== -1 && (this.#e = L(this.#e, s, e), this.#d())
        }#
        d() {
            if (this.hasListeners()) {
                const r = this.#t,
                    e = this.#c(this.#e, this.#a);
                r !== this.#l(e, this.#n ? .combine) && y.batch(() => {
                    this.listeners.forEach(s => {
                        s(this.#e)
                    })
                })
            }
        }
    },
    b = E(Q(), 1);

function I({
    queries: r,
    ...e
}, s) {
    const t = k(s),
        i = B(),
        n = w(),
        u = b.useMemo(() => r.map(h => {
            const p = t.defaultQueryOptions(h);
            return p._optimisticResults = i ? "isRestoring" : "optimistic", p
        }), [r, t, i]);
    u.forEach(h => {
        q(h), H(h, n, t.getQueryCache().get(h.queryHash))
    }), x(n);
    const [a] = b.useState(() => new j(t, u, e)), [l, g, o] = a.getOptimisticResult(u, e.combine), f = !i && e.subscribed !== !1;
    b.useSyncExternalStore(b.useCallback(h => f ? a.subscribe(y.batchCalls(h)) : C, [a, f]), () => a.getCurrentResult(), () => a.getCurrentResult()), b.useEffect(() => {
        a.setQueries(u, e)
    }, [u, e, a]);
    const d = l.some((h, p) => v(u[p], h)) ? l.flatMap((h, p) => {
        const c = u[p];
        return c && v(c, h) ? _(c, new O(t, c), n) : []
    }) : [];
    if (d.length > 0) throw Promise.all(d);
    const m = l.find((h, p) => {
        const c = u[p];
        return c && T({
            result: h,
            errorResetBoundary: n,
            throwOnError: c.throwOnError,
            query: t.getQueryCache().get(c.queryHash),
            suspense: c.suspense
        })
    });
    if (m ? .error) throw m.error;
    return g(o())
}
export {
    I as t
};