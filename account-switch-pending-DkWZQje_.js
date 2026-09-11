var e = null,
    r = 0,
    u = 12e3;

function l(n) {
    e = n, r = n ? Date.now() + u : 0
}

function i() {
    return e ? Date.now() > r ? (e = null, null) : e : null
}

function f(n) {
    const t = i();
    return t && n === t && l(null), i()
}

function o(n) {
    return f(n) ?? n
}
export {
    l as n, o as t
};