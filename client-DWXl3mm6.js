import {
    t as R
} from "./dist-CWMIw2fl.js";

function z() {
    if (typeof window > "u") return;
    const o = location.hostname,
        r = ["lovableproject.com", "lovableproject-dev.com", "lovable.app", "gpt-eng.com", "gptengineer.run"].some(e => o === e || o.endsWith("." + e)) ? o.match(new RegExp("^(?:id-preview(?:-[a-z0-9]+)?|project)--([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?:-dev)?(?=\\.|$)", "i")) ?.[1] ?? o.match(new RegExp("^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?=[.-])", "i")) ?.[1] : void 0,
        c = window.parent && window.parent !== window;
    if (!r || !c) return localStorage;
    const u = o.endsWith(".lovableproject-dev.com") || o.endsWith(".gpt-eng.com"),
        b = u ? /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$|^http:\/\/localhost:3000$/ : /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$/,
        l = location.ancestorOrigins && location.ancestorOrigins[0] || (document.referrer ? new URL(document.referrer).origin : ""),
        d = l && b.test(l) ? [l] : u ? ["https://lovable.dev", "http://localhost:3000"] : ["https://lovable.dev"],
        E = "lovable-preview-auth:result",
        S = 2e3,
        T = () => Math.random().toString(36).slice(2) + Date.now().toString(36),
        a = (e, t, i) => new Promise(M => {
            const g = T();
            let m = !1,
                f;
            const w = n => {
                    m || (m = !0, clearTimeout(f), window.removeEventListener("message", h), M(n))
                },
                h = n => {
                    if (d.indexOf(n.origin) < 0) return;
                    const s = n.data;
                    s && s.type === E && s.requestId === g && w(s)
                };
            window.addEventListener("message", h);
            const I = {
                type: e,
                requestId: g,
                projectId: r,
                key: t
            };
            i !== void 0 && (I.value = i);
            for (const n of d) window.parent.postMessage(I, n);
            f = setTimeout(() => w(null), S)
        });
    let v = !0;
    const O = 250;
    return {
        getItem: async e => {
            let t = await a("lovable-preview-auth:get", e);
            return !t && v && (await new Promise(i => setTimeout(i, O)), t = await a("lovable-preview-auth:get", e)), v = !1, t && t.ok && typeof t.value == "string" ? t.value === "" ? (localStorage.removeItem(e), null) : t.value : localStorage.getItem(e)
        },
        setItem: (e, t) => (localStorage.setItem(e, t), a("lovable-preview-auth:set", e, t).then(() => {})),
        removeItem: e => (localStorage.removeItem(e), a("lovable-preview-auth:remove", e).then(() => {}))
    }
}

function J() {
    return R("https://skqfapqbqbrbuageiyea.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcWZhcHFicWJyYnVhZ2VpeWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTM2MzEsImV4cCI6MjA5NzE2OTYzMX0.5e9nFi_cd9HTepY-eCRnMnEz4MduaXDVoHHx0wbToiY", {
        auth: {
            storage: z(),
            persistSession: !0,
            autoRefreshToken: !0
        }
    })
}
var p, j = new Proxy({}, {
    get(o, r, c) {
        return p || (p = J()), Reflect.get(p, r, c)
    }
});
export {
    j as t
};