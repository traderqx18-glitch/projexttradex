var e = "okb:snap:";

function r(t, n) {
    return `${e}${t}:${n??"anon"}`
}

function a(t, n) {
    if (!(typeof window > "u" || !n)) try {
        const o = window.localStorage.getItem(r(t, n));
        return o ? JSON.parse(o) : void 0
    } catch {
        return
    }
}

function i(t, n, o) {
    if (!(typeof window > "u" || !n || o == null)) try {
        window.localStorage.setItem(r(t, n), JSON.stringify(o))
    } catch {}
}

function c() {
    if (!(typeof window > "u")) try {
        Object.keys(window.localStorage).filter(t => t.startsWith(e)).forEach(t => window.localStorage.removeItem(t))
    } catch {}
}
export {
    a as n, i as r, c as t
};