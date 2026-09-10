function c(r) {
    if (!r) return "—";
    let t = 0 n;
    for (let n = 0; n < r.length; n++) t = (t * 131 n + BigInt(r.charCodeAt(n))) % 100000000 n;
    return t.toString().padStart(8, "0")
}

function d(r, t) {
    const n = String(r ? .account_number ? ? "").trim();
    if (/^\d{6,12}$/.test(n)) return n;
    const e = String(t ? ? "").trim().toLowerCase().split("@")[0] ? ? "",
        o = String(t ? ? "").trim().toLowerCase().split("@")[1] ? ? "",
        i = r ? .source === "funded_challenge" || !!r ? .funded_owner_id;
    return /^\d{6,12}$/.test(e) && (o === "okaybroker.com" || o === "okaybroker.com" || i) ? e : null
}

function s(r, t, n) {
    return d(t, n) ? ? c(r)
}
export {
    d as n, c as r, s as t
};