import {
    t as i
} from "./createLucideIcon-salqAbnG.js";
var c = [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["path", {
            d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
            key: "1u773s"
        }],
        ["path", {
            d: "M12 17h.01",
            key: "p32p05"
        }]
    ],
    d = i("circle-question-mark", c),
    w = "support_seen_v1",
    r = "support-seen-changed";

function a(e) {
    return `${w}:${e}`
}

function s(e) {
    if (typeof window > "u" || !e) return {};
    try {
        const n = window.localStorage.getItem(a(e));
        return n ? JSON.parse(n) : {}
    } catch {
        return {}
    }
}

function f(e, n, o = new Date().toISOString()) {
    if (!(typeof window > "u" || !e || !n)) try {
        const t = s(e);
        if (t[n] && new Date(t[n]).getTime() >= new Date(o).getTime()) return;
        t[n] = o, window.localStorage.setItem(a(e), JSON.stringify(t)), window.dispatchEvent(new Event(r))
    } catch {}
}

function p(e) {
    return typeof window > "u" ? () => {} : (window.addEventListener(r, e), () => window.removeEventListener(r, e))
}
export {
    d as i, p as n, s as r, f as t
};