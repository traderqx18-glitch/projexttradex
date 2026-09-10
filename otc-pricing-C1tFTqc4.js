var le = {
    EURUSD: "EUR/USD",
    GBPUSD: "GBP/USD",
    USDJPY: "USD/JPY",
    USDCHF: "USD/CHF",
    USDCAD: "USD/CAD",
    AUDUSD: "AUD/USD",
    NZDUSD: "NZD/USD",
    EURGBP: "EUR/GBP",
    EURJPY: "EUR/JPY",
    EURCHF: "EUR/CHF",
    EURAUD: "EUR/AUD",
    EURCAD: "EUR/CAD",
    GBPJPY: "GBP/JPY",
    GBPAUD: "GBP/AUD",
    GBPCAD: "GBP/CAD",
    GBPCHF: "GBP/CHF",
    AUDJPY: "AUD/JPY",
    AUDCAD: "AUD/CAD",
    AUDNZD: "AUD/NZD",
    CADJPY: "CAD/JPY",
    CHFJPY: "CHF/JPY",
    NZDJPY: "NZD/JPY"
};

function z(o) {
    return Object.prototype.hasOwnProperty.call(le, o)
}

function he(o) {
    return o >= 86400 ? {
        interval: "1day",
        range: "max",
        barSec: 86400
    } : o >= 14400 ? {
        interval: "4h",
        range: "max",
        barSec: 14400
    } : o >= 3600 ? {
        interval: "1h",
        range: "max",
        barSec: 3600
    } : o >= 1800 ? {
        interval: "30min",
        range: "max",
        barSec: 1800
    } : o >= 900 ? {
        interval: "15min",
        range: "max",
        barSec: 900
    } : o >= 300 ? {
        interval: "5min",
        range: "max",
        barSec: 300
    } : {
        interval: "1min",
        range: "max",
        barSec: 60
    }
}
var Q = new Map,
    _ = new Map,
    vt = (o, s) => `${o}|${s}`;

function ke(o, s, n) {
    n.length && Q.set(vt(o, s), n)
}

function X(o, s) {
    return Q.get(vt(o, s)) ? ? null
}

function Ue(o, s) {
    if (!Number.isFinite(s.price) || s.price <= 0) return;
    const n = _.get(o) ? ? [],
        i = n[n.length - 1];
    i && i.ts === s.ts ? n[n.length - 1] = s : n.push(s);
    const t = s.ts - 36 * 3600;
    for (; n.length && n[0].ts < t;) n.shift();
    _.set(o, n)
}

function Re(o, s) {
    const n = [...s].filter(i => Number.isFinite(i.price) && i.price > 0).sort((i, t) => i.ts - t.ts);
    n.length && _.set(o, n)
}

function J(o) {
    return _.get(o) ? ? []
}

function ye(o) {
    if (J(o).length > 0) return !0;
    for (const s of Q.keys())
        if (s.startsWith(`${o}|`)) return !0;
    return !1
}

function Be(o) {
    const s = J(o);
    if (s.length) return s[s.length - 1].price;
    for (const n of [60, 300, 900, 1800, 3600, 86400]) {
        const i = X(o, n);
        if (i && i.length) return i[i.length - 1].close
    }
    return null
}

function me(o, s) {
    const n = J(o);
    if (n.length) {
        if (s <= n[0].ts) return n[0].price;
        const i = n[n.length - 1];
        if (s >= i.ts) return i.price;
        let t = 0,
            a = n.length - 1;
        for (; a - t > 1;) {
            const m = t + a >> 1;
            n[m].ts <= s ? t = m : a = m
        }
        const r = n[t],
            e = n[a],
            c = e.ts - r.ts;
        if (c <= 0) return e.price;
        const f = (s - r.ts) / c;
        return r.price + (e.price - r.price) * f
    }
    for (const i of [60, 300, 900, 1800, 3600, 86400]) {
        const t = X(o, i);
        if (!(!t || !t.length)) {
            if (s >= t[t.length - 1].time) return t[t.length - 1].close;
            for (let a = t.length - 1; a >= 0; a--)
                if (t[a].time <= s) {
                    const r = t[a],
                        e = Math.min(1, Math.max(0, (s - r.time) / i));
                    return r.open + (r.close - r.open) * e
                }
            return t[0].open
        }
    }
    return null
}

function ue(o, s) {
    const n = J(o);
    if (n.length < 2) return [];
    const i = [];
    let t = null;
    for (const a of n) {
        const r = Math.floor(a.ts / s) * s;
        !t || t.time !== r ? (t && i.push(t), t = {
            time: r,
            open: a.price,
            high: a.price,
            low: a.price,
            close: a.price
        }) : (t.high = Math.max(t.high, a.price), t.low = Math.min(t.low, a.price), t.close = a.price)
    }
    return t && i.push(t), i
}

function fe(o, s, n, i) {
    const {
        barSec: t
    } = he(n), a = X(o, t);
    let r = a && a.length ? t === n ? a : pe(a, n) : [];
    const e = ue(o, n);
    if (e.length)
        if (!r.length) r = e;
        else {
            const l = r[r.length - 1].time;
            r = Me(r, e.filter(h => h.time >= l))
        }
    if (!r.length || r.length < 2) return null;
    const c = Math.floor(s / n) * n,
        f = c - (i - 1) * n,
        m = r.filter(l => l.time >= f && l.time <= c).filter(l => Number.isFinite(l.open) && Number.isFinite(l.high) && Number.isFinite(l.low) && Number.isFinite(l.close) && l.open > 0 && l.close > 0).map(l => ({
            time: l.time,
            open: l.open,
            close: l.close,
            high: Math.max(l.high, l.open, l.close),
            low: Math.min(l.low, l.open, l.close)
        }));
    return m.length < 2 ? null : m
}

function Me(o, s) {
    const n = new Map;
    for (const i of o) n.set(i.time, i);
    for (const i of s) {
        const t = n.get(i.time);
        n.set(i.time, t ? {
            time: i.time,
            open: t.open,
            high: Math.max(t.high, i.high),
            low: Math.min(t.low, i.low),
            close: i.close
        } : i)
    }
    return [...n.values()].sort((i, t) => i.time - t.time)
}

function pe(o, s) {
    const n = [];
    let i = null;
    for (const t of o) {
        const a = Math.floor(t.time / s) * s;
        !i || i.time !== a ? (i && n.push(i), i = {
            time: a,
            open: t.open,
            high: t.high,
            low: t.low,
            close: t.close
        }) : (i.high = Math.max(i.high, t.high), i.low = Math.min(i.low, t.low), i.close = t.close)
    }
    return i && n.push(i), n
}

function O(o) {
    let s = 2166136261;
    for (let n = 0; n < o.length; n++) s ^= o.charCodeAt(n), s = Math.imul(s, 16777619);
    return s >>> 0
}

function w(o, s) {
    let n = (o ^ Math.imul(s | 0, 2654435761)) >>> 0;
    return n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, (n >>> 0) / 4294967295
}

function x(o, s, n) {
    Number.isFinite(n) || (n = 0);
    const i = Math.floor(n),
        t = n - i,
        a = t * t * (3 - 2 * t),
        r = w(o ^ Math.imul(s | 0, 374761393), i) * 2 - 1;
    return r + (w(o ^ Math.imul(s | 0, 374761393), i + 1) * 2 - 1 - r) * a
}

function ft(o, s, n, i) {
    if (!Number.isFinite(n)) return 0;
    const t = n / Math.max(2, i),
        a = Math.floor(t),
        r = t - a,
        e = Math.imul(s | 0, 374761393),
        c = w(o ^ e, a) * 2 - 1,
        f = w(o ^ e, a + 1) * 2 - 1,
        m = .1 + w(o ^ e ^ 5370206, a) * .48,
        l = .06 + w(o ^ e ^ 2968433, a) * .24,
        h = Math.max(.08, 1 - m - l),
        u = Math.max(0, Math.min(1, (r - m) / h)),
        M = u * u * u * (u * (u * 6 - 15) + 10);
    return c + (f - c) * M
}

function ge(o, s) {
    if (!Number.isFinite(s)) return 0;
    const n = .55,
        i = Math.floor(s / n);
    let t = -1 / 0;
    for (let a = i - 3; a <= i + 3; a++) {
        const r = (w(o ^ 1791398085, a) - .5) * n * .64,
            e = a * n + r;
        e <= s && e > t && (t = e)
    }
    return Number.isFinite(t) ? t : s
}

function b(o, s, n, i, t, a) {
    let r = 1,
        e = 1,
        c = 0,
        f = 0;
    for (let m = 0; m < i; m++) c += x(o, s + m, n * r) * e, f += e, r *= t, e *= a;
    return f > 0 ? c / f : 0
}

function de(o, s, n) {
    const i = x(o, 911, s / n);
    return i * i * i * 1.6
}

function Mt(o, s, n, i, t) {
    if (!Number.isFinite(n)) return 0;
    const a = Math.max(1, i),
        r = Math.max(a, t),
        e = n / a,
        c = (n - r) / a,
        f = Math.floor(c),
        m = Math.floor(e),
        l = Math.imul(s | 0, 374761393);
    let h = 0;
    for (let u = f; u <= m; u++) {
        const M = w(o ^ l, u) * 2 - 1,
            d = w(o ^ l, u + 1) * 2 - 1,
            p = Math.max(c - u, 0),
            g = Math.min(e - u, 1);
        if (g <= p) continue;
        const v = M * g + (d - M) * (g * g * g - .5 * g * g * g * g),
            S = M * p + (d - M) * (p * p * p - .5 * p * p * p * p);
        h += v - S
    }
    return h * a / r
}

function pt(o, s, n, i, t, a, r, e, c = 2.6) {
    if (!Number.isFinite(n)) return 0;
    let f = 0,
        m = Math.max(.5, i);
    for (let l = 0; l < t; l++) {
        if (l >= r && l < e) {
            const h = Math.pow(m / Math.max(.5, i), a);
            f += x(o, s + l * 9, n / m) * h
        }
        m *= c
    }
    return f
}

function be(o, s, n, i) {
    const t = b(o, 820, s / n, 3, 2, .6),
        a = b(o, 840, s / (n / 6.5), 3, 2, .55),
        r = x(o, 860, s / (900 + i * 1200)),
        e = Math.max(0, Math.abs(r) - .74) / .26,
        c = t * .55 + a * .35 + e * e * (.8 + i);
    return Math.exp(Math.max(-1.3, Math.min(1.6, c)))
}
var gt = .13,
    Y = .35,
    dt = new Map;

function we(o) {
    const s = String(o ? ? ""),
        n = dt.get(s);
    if (n) return n;
    const i = O(s || "UNKNOWN"),
        t = r => w(i, r),
        a = {
            seed: i,
            pFast: 95 + t(13) * 120,
            pMid: 260 + t(12) * 380,
            pSlow: 900 + t(11) * 1500,
            phFast: t(23) * Math.PI * 2,
            phMid: t(22) * Math.PI * 2,
            phSlow: t(21) * Math.PI * 2,
            pTick: .4 + t(31) * .8,
            pSecFast: 4 + t(37) * 10,
            pSecond: 30 + t(32) * 90,
            pMinute: 240 + t(33) * 660,
            pHour: 2400 + t(34) * 8400,
            pSession: 21600 + t(35) * 36e3,
            pMultiDay: 86400 + t(36) * 345600,
            ampOsc: .4 + t(41) * .55,
            ampNoise: .45 + t(42) * .65,
            ampMicro: .05 + t(43) * .18,
            ampTrend: .55 + t(44) * 1.1,
            ampMacro: .4 + t(45) * 1.4,
            regimePeriod: 150 + t(46) * 750,
            volBoost: .45 + t(47) * .85,
            trendBoost: .35 + t(48) * 1.25,
            reversalRate: .25 + t(49) * 1.45,
            chopBias: t(50),
            shockRate: .04 + t(51) * .55,
            momCell1: 6 + t(61) * 8,
            momWin1: 30 + t(62) * 60,
            momCell2: 20 + t(63) * 40,
            momWin2: 180 + t(64) * 240,
            ampMom: .9 + t(65) * .9,
            phMacro: t(52) * Math.PI * 2,
            phSession: t(53) * Math.PI * 2
        };
    return dt.set(s, a), a
}

function Pt(o) {
    const s = String(o ? .symbol ? ? "UNKNOWN"),
        n = O(s || "UNKNOWN"),
        i = Number(o ? .basePrice),
        t = Number(o ? .volatility),
        a = Number(o ? .trend),
        r = 1 + w(n, 91) * 100,
        e = Number.isFinite(i) && i > 0 ? i : r,
        c = e * .0025;
    return {
        symbol: s,
        basePrice: e,
        volatility: Math.min(Number.isFinite(t) && t > 0 ? t : c, e * .02),
        trend: Number.isFinite(a) ? Math.max(-1, Math.min(1, a)) : 0
    }
}
var F = {
        normal: {
            speed: 1,
            amp: 1,
            label: "Normal"
        },
        fast: {
            speed: 1.9,
            amp: 1.7,
            label: "Fast"
        },
        volatile: {
            speed: 3.2,
            amp: 3.1,
            label: "Super Fast (Volatile)"
        }
    },
    k = "normal";

function Te(o) {
    F[o] && (k = o)
}

function Ee() {
    return k
}
var N = [];

function He(o) {
    const s = (Array.isArray(o) ? o : []).filter(i => !!i && Number.isFinite(i.at) && !!F[i.mode]).map(i => ({
        at: Math.floor(i.at),
        mode: i.mode
    })).sort((i, t) => i.at - t.at).slice(-40);
    N = s;
    const n = s[s.length - 1];
    n && (k = n.mode)
}
var j = 240;

function ve(o) {
    if (N.length === 0) return o * F[k].speed;
    const s = N[0],
        n = F[s.mode].speed;
    if (o <= s.at) return o * n;
    let i = s.at * n,
        t = s.at,
        a = n;
    for (let r = 1; r < N.length; r++) {
        const e = N[r];
        if (e.at >= o) break;
        i += (e.at - t) * a, t = e.at, a = F[e.mode].speed
    }
    return i + (o - t) * a
}

function Pe(o) {
    if (N.length === 0) return F[k].amp;
    let s = F[N[0].mode].amp;
    for (let n = 1; n < N.length; n++) {
        const i = N[n];
        if (i.at > o) break;
        const t = F[i.mode].amp,
            a = Math.min(1, (o - i.at) / j);
        if (a < 1) return s + (t - s) * a;
        const r = N[n + 1];
        if (r && r.at < i.at + j) {
            const e = Math.min(1, (r.at - i.at) / j);
            s = s + (t - s) * e
        } else s = t
    }
    return s
}

function G(o, s) {
    const n = Pt(o),
        i = Number.isFinite(s) ? s : 0,
        t = me(n.symbol, i);
    if (t != null && Number.isFinite(t) && t > 0) return t;
    if (z(n.symbol)) return n.basePrice;
    const a = Pe(i),
        r = a === 1 ? n : { ...n,
            volatility: n.volatility * a
        },
        e = we(r.symbol),
        c = ge(e.seed, ve(i)),
        f = e.chopBias,
        m = e.volBoost,
        l = e.trendBoost,
        h = e.shockRate,
        u = e.reversalRate * 1.15,
        M = e.regimePeriod / 1.3,
        d = 1 - f,
        p = x(e.seed, 307, c / e.pTick),
        g = b(e.seed, 140, c / e.pSecFast, 3, 2.05, .55),
        v = b(e.seed, 110, c / e.pSecond, 4, 2.05, .55),
        S = b(e.seed, 220, c / e.pMinute, 4, 2, .55),
        U = b(e.seed, 330, c / e.pHour, 4, 2, .6),
        W = b(e.seed, 440, c / e.pSession, 3, 2.1, .6),
        K = b(e.seed, 550, c / e.pMultiDay, 3, 2, .65),
        R = Math.sin(2 * Math.PI * c / e.pMid + e.phMid),
        V = Math.sin(2 * Math.PI * c / e.pSlow + e.phSlow) * .62 + R * .38,
        Z = .6 + .4 * (x(e.seed, 401, c / M) * .55 + Math.sin(2 * Math.PI * c / (M * 2.7) + e.phMid) * .45),
        A = c / (M * 5 + 400),
        Nt = .5 + .5 * b(e.seed, 610, A + .13, 4, 2, .55),
        Ft = .5 + .5 * b(e.seed, 620, A + 1.71, 4, 2, .55),
        Dt = .5 + .5 * b(e.seed, 630, A + 3.29, 4, 2, .55),
        xt = .5 + .5 * b(e.seed, 640, A + 5.47, 4, 2, .55),
        St = Nt * (.7 + (1 - f) * 1.5) * (.8 + l * .6),
        At = Math.min(Ft * (.45 + f * 1.15), 1.4),
        Ct = Dt * (.6 + m * 1 + h * .8),
        kt = xt * (.5 + Math.max(0, 1 - m) * .8),
        y = 3.1,
        tt = Math.exp(St * y),
        et = Math.exp(At * y),
        nt = Math.exp(Ct * y),
        ot = Math.exp(kt * y),
        B = tt + et + nt + ot + 1e-9,
        D = tt / B,
        T = et / B,
        C = nt / B,
        E = ot / B,
        Ut = D * .55 + T * 1.1 + C * 1.85 + E * .3,
        Rt = D * 1.85 + T * .35 + C * 1.3 + E * .5,
        yt = D * 1.55 + T * .45 + C * 1.15 + E * .55,
        Bt = D * .7 + T * .75 + C * 2.1 + E * .2,
        Tt = Math.tanh(b(e.seed, 660, A * .6 + 7.91, 3, 2, .55) * 1.7),
        Et = b(e.seed, 670, c / (e.pSession * 1.3 + 9e3), 3, 2, .55),
        Ht = de(e.seed, c, 420 + h * 600) * h,
        st = x(e.seed, 720, c / (260 + u * 180)),
        it = Math.max(0, Math.abs(st) - .72) / .28,
        It = Math.sign(st) * it * it * (D + C),
        H = 1.3,
        Lt = Mt(e.seed, 710, c, e.momCell1 / Math.sqrt(H), e.momWin1 / H),
        Yt = Mt(e.seed, 730, c, e.momCell2 / Math.sqrt(H), e.momWin2 / H),
        Gt = Lt * .75 + Yt * .25,
        _t = ft(e.seed, 705, c, e.momCell1 * 1.3),
        Jt = ft(e.seed, 715, c, 2.2 + e.momCell1 * .2),
        Ot = e.ampNoise * (_t * .16 + Jt * .1 + g * .22 + v * .08 + S * .1) + e.ampMom * Gt * .08 + e.ampOsc * V * .07 + (.12 + e.ampMicro) * p * 1.5,
        Wt = U * .55 + W * .35 + Math.sin(2 * Math.PI * c / (e.pHour * 1.7) + e.phMacro) * .2 + Tt * .45 * D,
        Kt = K * .7 + Math.sin(2 * Math.PI * c / (e.pMultiDay * .7) + e.phSession) * .3,
        I = be(e.seed, c, 5400 + e.regimePeriod * 12, h),
        L = Math.max(1e-9, r.volatility / r.basePrice),
        at = L * (.34 + m * .3) * (.75 + l * .35),
        q = 20,
        rt = 1.05,
        ct = 13,
        Vt = pt(e.seed, 900, c, rt, q, .5, 0, ct, 2),
        Zt = pt(e.seed, 900, c, rt, q, .5, ct, q, 2),
        lt = at * (.55 + d * .75),
        qt = lt * gt * Vt * I,
        $t = lt * gt * Zt,
        ht = c / (e.pHour * 1.4 + 1800),
        jt = b(e.seed, 690, ht, 4, 2, .6),
        zt = b(e.seed, 695, ht * 3.3 + 2.13, 3, 2, .55),
        Qt = Y * at * 26 * (.5 + l * .8) * Math.tanh((jt * 1.5 + zt * .55) * (.55 + d * .7)) * (.3 + D * 1.5),
        mt = .28,
        P = r.basePrice * Math.exp(qt + Qt + mt * Math.tanh($t / mt)),
        Xt = P * L * .62 * m * Z * I * Ut * Ot,
        te = Y * P * .0022 * l * e.ampTrend * (.6 + d * .8) * Rt * Wt,
        ee = Y * P * .0035 * l * e.ampMacro * yt * Kt,
        ne = P * L * 5 * m * I * Bt * Ht,
        oe = P * .0028 * m * 1.15 * I * It,
        se = Y * P * .0018 * (.6 + l * .6) * Et,
        ie = c / (e.pSession * 1.8 + 7200),
        ae = P * .004 * r.trend * Math.tanh(b(e.seed, 780, ie, 3, 2, .55) * 1.4),
        re = Xt + ne + oe,
        ut = Math.max(1e-9, P * L * 6 + P * .0015),
        ce = ut * Math.tanh(re / ut),
        $ = P + ae + ce + te + ee + se;
    return !Number.isFinite($) || $ <= 0 ? r.basePrice : $
}

function Ne(o) {
    return !!o && Number.isFinite(o.time) && Number.isFinite(o.open) && Number.isFinite(o.high) && Number.isFinite(o.low) && Number.isFinite(o.close) && o.open > 0 && o.high > 0 && o.low > 0 && o.close > 0 && o.high >= Math.max(o.open, o.close) && o.low <= Math.min(o.open, o.close)
}

function Fe(o, s, n, i) {
    const t = Math.max(20, Math.min(96, Math.round(Math.sqrt(n) * 6) + 12), Math.min(80, Math.ceil(n / .15))),
        a = Math.floor(s / n) * n,
        r = [];
    for (let e = i - 1; e >= 0; e--) {
        const c = a - e * n;
        let f = 0,
            m = -1 / 0,
            l = 1 / 0,
            h = 0;
        const u = Math.max(c, Math.min(c + n, s)),
            M = n / (t - 1);
        for (let d = 0; d < t; d++) {
            const p = c + d * M;
            if (p > u) break;
            const g = wt(o, p);
            d === 0 && (f = g), g > m && (m = g), g < l && (l = g)
        }
        h = wt(o, u), m = Math.max(m, h), l = Math.min(l, h), r.push({
            time: c,
            open: f,
            high: m,
            low: l,
            close: h
        })
    }
    return r
}

function De(o, s, n) {
    if (n < 3600 || s.length < 4) return s;
    const i = Math.max(0, Math.min(1, Math.log(n / 3600) / Math.log(24))),
        t = 1 + 2.1 * i,
        a = O(o.symbol) ^ 10369009,
        r = s.map(h => h.close),
        e = [r[0]];
    for (let h = 1; h < r.length; h++) e.push(e[h - 1] + (r[h] - r[h - 1]) * t);
    const c = r[r.length - 1] - e[e.length - 1];
    for (let h = 0; h < e.length; h++) e[h] += c;
    const f = e.map((h, u) => u === 0 ? 0 : Math.abs(h - e[u - 1])).slice(1).sort((h, u) => h - u),
        m = f[Math.floor(f.length / 2)] || Math.abs(o.volatility) * 4,
        l = [];
    for (let h = 0; h < s.length; h++) {
        const u = e[h],
            M = (h === 0 ? e[0] - (e[1] - e[0]) : e[h - 1]) + (w(a, h * 7 + 1) - .5) * m * .22,
            d = Math.max(M, u),
            p = Math.min(M, u),
            g = d - p,
            v = Math.max(g, m * .45),
            S = w(a, h * 7 + 3),
            U = w(a, h * 7 + 5),
            W = (.05 + S * .45) * (S > .88 ? 3.2 : 1),
            K = (.05 + U * .45) * (U > .88 ? 3.2 : 1),
            R = 1 - .35 * i,
            V = d + v * W * R,
            Z = Math.max(1e-7, p - v * K * R);
        l.push({
            time: s[h].time,
            open: M,
            high: V,
            low: Z,
            close: u
        })
    }
    return l
}

function xe(o, s, n) {
    return s
}

function Ie(o, s, n) {
    return s
}

function Le(o, s, n, i) {
    const t = Number.isFinite(n) && n > 0 ? Math.floor(n) : 60,
        a = Number.isFinite(i) && i > 0 ? Math.floor(i) : 300,
        r = Number.isFinite(s) && s > 0 ? Math.floor(s) : Math.floor(Date.now() / 1e3),
        e = Pt(o),
        c = fe(e.symbol, r, t, a);
    if (c && c.length >= 2) return c;
    if (z(e.symbol)) return [];
    let f = Fe(e, r, t, a);
    z(e.symbol) || (f = xe(e, De(e, f, t), t));
    const m = new Set;
    let l = e.basePrice;
    const h = Math.floor(r / t) * t - (a - 1) * t;
    for (let u = 0; u < f.length; u++) {
        let M = f[u];
        const d = h + u * t;
        if (!Ne(M) || m.has(M.time) || M.time !== d) {
            const p = Math.abs(e.volatility) * 2,
                g = l,
                v = l + (w(O(e.symbol), u) - .5) * p;
            M = {
                time: d,
                open: g,
                high: Math.max(g, v) + p * .6,
                low: Math.max(1e-7, Math.min(g, v) - p * .6),
                close: v
            }, f[u] = M
        }
        m.add(M.time), l = M.close
    }
    if (f.length === 0) {
        const u = e.basePrice,
            M = [];
        for (let d = a - 1; d >= 0; d--) {
            const p = Math.floor(r / t) * t - d * t;
            M.push({
                time: p,
                open: u,
                high: u,
                low: u,
                close: u
            })
        }
        return M
    }
    return f
}

function bt(o) {
    if (!Number.isFinite(o)) return "0.00000";
    const s = Math.max(1, Math.floor(Math.log10(Math.abs(o) || 1)) + 1);
    return o.toFixed(Math.min(5, Math.max(0, 6 - s)))
}

function Ye(o, s) {
    return bt(o) === bt(s)
}
var Se = .14,
    Ae = .04,
    Ce = 15;

function wt(o, s) {
    if (!Number.isFinite(s)) return G(o, s);
    let n = 0,
        i = 0;
    for (let a = 0; a < Ce; a++) {
        const r = a * Ae,
            e = Math.exp(-r / Se);
        n += G(o, s - r) * e, i += e
    }
    const t = i > 0 ? n / i : G(o, s);
    return Number.isFinite(t) && t > 0 ? t : G(o, s)
}
export {
    Ie as a, Ye as c, le as d, ye as f, Re as g, ke as h, Ee as i, Te as l, Ue as m, Le as n, G as o, Be as p, bt as r, wt as s, F as t, He as u
};