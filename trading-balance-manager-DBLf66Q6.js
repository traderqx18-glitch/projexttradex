import {
    t as u
} from "./gem-Dvlk-jzR.js";
import {
    t as g
} from "./send-uZQ72Fai.js";
import {
    Fn as a,
    Rn as d,
    Tt as b,
    f as i
} from "./index-dGs9i_Jo.js";
var m = [{
    key: "standard",
    name: "STANDARD",
    tagline: "Level for beginners",
    minBalance: 0,
    bonusPct: 0,
    description: "Basic percentage of profitability for all instruments",
    promoText: "Standard platform access",
    icon: g,
    accent: {
        text: "text-bull",
        bg: "bg-bull/15",
        border: "border-bull/30",
        chip: "bg-bull/20 text-bull"
    }
}, {
    key: "pro",
    name: "PRO",
    tagline: "Level for casual traders",
    minBalance: 5e3,
    bonusPct: 2,
    description: "Increased percentage of profitability for all instruments",
    promoText: "Promo codes from the market in mailings and promotions",
    icon: u,
    accent: {
        text: "text-amber-400",
        bg: "bg-amber-500/15",
        border: "border-amber-500/30",
        chip: "bg-amber-500/20 text-amber-400"
    }
}, {
    key: "vip",
    name: "VIP",
    tagline: "Level for professional traders",
    minBalance: 1e4,
    bonusPct: 4,
    description: "Increased percentage of profitability for all instruments",
    promoText: "Promo codes from the market in mailings and promotions",
    icon: b,
    accent: {
        text: "text-purple-400",
        bg: "bg-purple-500/15",
        border: "border-purple-500/30",
        chip: "bg-purple-500/20 text-purple-400"
    }
}];

function x(e) {
    const n = Number.isFinite(e) ? e : 0;
    let r = m[0];
    for (const t of m) n >= t.minBalance && (r = t);
    return r
}
var L = a({
        method: "POST"
    }).middleware([i]).handler(d("aaed0b06985cbf8ac19c8177bc0ec365fa8861b105c9c6ff09db42e2ceca84f6")),
    w = a({
        method: "POST"
    }).middleware([i]).handler(d("fd9ad4ea4400677a46b9e06b3f265245ce548afec66405a08cdd913c3458493d")),
    S = a({
        method: "POST"
    }).middleware([i]).handler(d("c495dac30180ffc4e7ed26f29de16493e7ceb2311ec49ad642f3808c7c565d9b")),
    T = a({
        method: "POST"
    }).middleware([i]).handler(d("8ffde84fd79e2a36e2005d3915a5a94ae989df97e1a1d6d715d7c63a31acab27")),
    y = a({
        method: "POST"
    }).middleware([i]).handler(d("6182ccd1e91a6af5cf161ef9a0ebc476f54421d12de7c91d364970f8adf26f78")),
    P = a({
        method: "POST"
    }).middleware([i]).handler(d("96a7f3f1e7f402f7c1e3c18d1548adf78f09ced470a1a82e6c5a6a2138f6bcc0")),
    l = () => ({
        confirmedCents: null,
        pendingCents: 0
    }),
    s = e => Math.max(0, Math.round((Number(e) || 0) * 100)),
    f = e => Math.max(0, e) / 100,
    p = class {
        userId = null;
        ledgers = {
            demo: l(),
            live: l()
        };
        setUser(e) {
            if (typeof window > "u") return;
            const n = e ? ? null;
            this.userId !== n && (this.userId = n, this.ledgers = {
                demo: l(),
                live: l()
            })
        }
        syncServerBalance(e, n) {
            if (typeof window > "u") return Number(n ? ? 0);
            const r = this.ledgers[e];
            return (r.confirmedCents === null || r.pendingCents === 0) && (r.confirmedCents = s(n)), this.availableFromLedger(r)
        }
        syncServerBalances(e) {
            return typeof window > "u" ? e : { ...e,
                demo: this.syncServerBalance("demo", e.demo ? ? 0),
                live: this.syncServerBalance("live", e.live ? ? 0)
            }
        }
        getAvailable(e, n = 0) {
            if (typeof window > "u") return Number(n ? ? 0);
            const r = this.ensureLedger(e, n);
            return this.availableFromLedger(r)
        }
        reserve(e, n, r = 0) {
            const t = s(n),
                o = this.ensureLedger(e, r),
                c = Math.max(0, (o.confirmedCents ? ? 0) - o.pendingCents);
            return t <= 0 || c < t ? {
                ok: !1,
                available: f(c)
            } : (o.pendingCents += t, {
                ok: !0,
                available: this.availableFromLedger(o)
            })
        }
        confirm(e, n) {
            const r = s(n),
                t = this.ensureLedger(e, 0);
            return t.confirmedCents = Math.max(0, (t.confirmedCents ? ? 0) - r), t.pendingCents = Math.max(0, t.pendingCents - r), this.availableFromLedger(t)
        }
        release(e, n) {
            const r = s(n),
                t = this.ensureLedger(e, 0);
            return t.pendingCents = Math.max(0, t.pendingCents - r), this.availableFromLedger(t)
        }
        hasPending(e) {
            return e ? this.ledgers[e].pendingCents > 0 : this.ledgers.demo.pendingCents > 0 || this.ledgers.live.pendingCents > 0
        }
        ensureLedger(e, n) {
            const r = this.ledgers[e];
            return r.confirmedCents === null && (r.confirmedCents = s(n)), r
        }
        availableFromLedger(e) {
            return f((e.confirmedCents ? ? 0) - e.pendingCents)
        }
    },
    F = new p;
export {
    S as a, m as c, P as i, x as l, L as n, w as o, y as r, T as s, F as t
};