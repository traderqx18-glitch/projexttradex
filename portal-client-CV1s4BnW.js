import {
    t as n
} from "./dist-CWMIw2fl.js";
import {
    t as a
} from "./client-DWXl3mm6.js";
import {
    t as o
} from "./funded-client-CVhX_QT0.js";

function f() {
    return n("https://skqfapqbqbrbuageiyea.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcWZhcHFicWJyYnVhZ2VpeWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTM2MzEsImV4cCI6MjA5NzE2OTYzMX0.5e9nFi_cd9HTepY-eCRnMnEz4MduaXDVoHHx0wbToiY", {
        auth: {
            storage: typeof window > "u" ? void 0 : localStorage,
            storageKey: "okaybroker-affiliate-auth",
            persistSession: !0,
            autoRefreshToken: !0,
            detectSessionInUrl: !0
        }
    })
}
var i, u = new Proxy({}, {
    get(t, e) {
        return i || (i = f()), Reflect.get(i, e, i)
    }
});

function s(t) {
    const e = t ? ? (typeof window > "u" ? "" : window.location.pathname);
    return e.startsWith("/funded") ? "funded" : e.startsWith("/affiliate") || e.startsWith("/subaffiliate") ? "affiliate" : "trading"
}

function c(t) {
    return t === "funded" ? o : t === "affiliate" ? u : a
}

function d() {
    return typeof window > "u" ? a : c(s())
}
var b = new Proxy({}, {
    get(t, e) {
        const r = d();
        return Reflect.get(r, e, r)
    }
});
export {
    d as n, b as r, s as t
};