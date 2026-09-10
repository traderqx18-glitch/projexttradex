import {
    l as a,
    u as r
} from "./otc-pricing-C1tFTqc4.js";

function m(n) {
    return n === "fast" || n === "volatile" ? n : "normal"
}

function s(n) {
    return Array.isArray(n) ? n.map(e => ({
        at: Math.floor(Number(e ? .at)),
        mode: m(e ? .mode)
    })).filter(e => Number.isFinite(e.at) && e.at > 0).sort((e, o) => e.at - o.at).slice(-40) : []
}
var l = 8e3,
    t = null;
async function d(n) {
    if (t && Date.now() - t.at < l) return r(t.timeline), a(t.mode), t.mode;
    try {
        const {
            data: e
        } = await n.from("market_movement_settings").select("mode, history").eq("id", 1).maybeSingle(), o = m(e ? .mode), i = s(e ? .history);
        return t = {
            mode: o,
            timeline: i,
            at: Date.now()
        }, r(i), a(o), o
    } catch {
        const e = t ? .mode ? ? "normal";
        return t && r(t.timeline), a(e), e
    }
}
export {
    d as n, m as t
};