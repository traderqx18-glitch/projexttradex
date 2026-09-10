function c() {
    const s = new Date,
        t = s.getUTCHours(),
        e = 7,
        n = 15,
        i = t >= e && t < n,
        o = new Date(s);
    return o.setUTCHours(e, 0, 0, 0), t >= n ? o.setUTCDate(o.getUTCDate() + 1) : t < e, {
        isOpen: i,
        opensAtLocal: o.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
        opensAtUTC: e,
        closesAtUTC: n
    }
}
export {
    c as getRealMarketSession
};