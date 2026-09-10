import {
    t as i
} from "./dist-CWMIw2fl.js";

function r() {
    return i("https://skqfapqbqbrbuageiyea.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcWZhcHFicWJyYnVhZ2VpeWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1OTM2MzEsImV4cCI6MjA5NzE2OTYzMX0.5e9nFi_cd9HTepY-eCRnMnEz4MduaXDVoHHx0wbToiY", {
        auth: {
            storage: typeof window > "u" ? void 0 : localStorage,
            storageKey: "okaybroker-funded-auth",
            persistSession: !0,
            autoRefreshToken: !0,
            detectSessionInUrl: !0
        }
    })
}
var e, s = new Proxy({}, {
    get(n, t, a) {
        return e || (e = r()), Reflect.get(e, t, e)
    }
});
export {
    s as t
};