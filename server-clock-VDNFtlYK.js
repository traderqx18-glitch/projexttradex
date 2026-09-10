var t = 0,
    i = !1,
    u = 1440 * 60 * 1e3;

function s(e, n, a) {
    if (!Number.isFinite(e)) return;
    const r = e - (n + Math.max(0, a - n) / 2);
    !Number.isFinite(r) || Math.abs(r) > u || (t = r, i = !0)
}

function f() {
    return Date.now() + t
}

function o(e) {
    return e + t
}
export {
    f as n, o as r, s as t
};