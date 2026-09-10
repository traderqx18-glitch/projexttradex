var p = Object.create,
    s = Object.defineProperty,
    i = Object.getOwnPropertyDescriptor,
    O = Object.getOwnPropertyNames,
    P = Object.getPrototypeOf,
    j = Object.prototype.hasOwnProperty,
    v = (r, e) => () => (e || (r((e = {
        exports: {}
    }).exports, e), r = null), e.exports),
    f = (r, e) => {
        let a = {};
        for (var l in r) s(a, l, {
            get: r[l],
            enumerable: !0
        });
        return e || s(a, Symbol.toStringTag, {
            value: "Module"
        }), a
    },
    c = (r, e, a, l) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (var o = O(e), t = 0, n = o.length, _; t < n; t++) _ = o[t], !j.call(r, _) && _ !== a && s(r, _, {
                get: (u => e[u]).bind(null, _),
                enumerable: !(l = i(e, _)) || l.enumerable
            });
        return r
    },
    E = (r, e, a) => (a = r != null ? p(P(r)) : {}, c(e || !r || !r.__esModule ? s(a, "default", {
        value: r,
        enumerable: !0
    }) : a, r)),
    x = v((r => {
        var e = Symbol.for("react.transitional.element"),
            a = Symbol.for("react.fragment");

        function l(o, t, n) {
            var _ = null;
            if (n !== void 0 && (_ = "" + n), t.key !== void 0 && (_ = "" + t.key), "key" in t) {
                n = {};
                for (var u in t) u !== "key" && (n[u] = t[u])
            } else n = t;
            return t = n.ref, {
                $$typeof: e,
                type: o,
                key: _,
                ref: t !== void 0 ? t : null,
                props: n
            }
        }
        r.Fragment = a, r.jsx = l, r.jsxs = l
    })),
    b = v(((r, e) => {
        e.exports = x()
    }));
export {
    E as i, v as n, f as r, b as t
};