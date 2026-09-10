var u = function() {
    return u = Object.assign || function(r) {
        for (var n, t = 1, a = arguments.length; t < a; t++) {
            n = arguments[t];
            for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (r[e] = n[e])
        }
        return r
    }, u.apply(this, arguments)
};

function s(o, r) {
    var n = {};
    for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && r.indexOf(t) < 0 && (n[t] = o[t]);
    if (o != null && typeof Object.getOwnPropertySymbols == "function")
        for (var a = 0, t = Object.getOwnPropertySymbols(o); a < t.length; a++) r.indexOf(t[a]) < 0 && Object.prototype.propertyIsEnumerable.call(o, t[a]) && (n[t[a]] = o[t[a]]);
    return n
}

function O(o, r, n, t) {
    function a(e) {
        return e instanceof n ? e : new n(function(f) {
            f(e)
        })
    }
    return new(n || (n = Promise))(function(e, f) {
        function p(c) {
            try {
                l(t.next(c))
            } catch (i) {
                f(i)
            }
        }

        function y(c) {
            try {
                l(t.throw(c))
            } catch (i) {
                f(i)
            }
        }

        function l(c) {
            c.done ? e(c.value) : a(c.value).then(p, y)
        }
        l((t = t.apply(o, r || [])).next())
    })
}

function h(o, r, n) {
    if (n || arguments.length === 2)
        for (var t = 0, a = r.length, e; t < a; t++)(e || !(t in r)) && (e || (e = Array.prototype.slice.call(r, 0, t)), e[t] = r[t]);
    return o.concat(e || Array.prototype.slice.call(r))
}
export {
    h as i, O as n, s as r, u as t
};