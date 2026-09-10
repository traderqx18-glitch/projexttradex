import {
    i as m
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as h
} from "./react-D8T8de5F.js";
import {
    F as f,
    t as l
} from "./useStore-DxikiEK4.js";
import {
    t as d
} from "./invariant-DIU4jf1L.js";
import {
    t as S
} from "./useRouter-DuDv8g77.js";
import {
    n as v,
    t as g
} from "./matchContext-C9kSnMZw.js";
var c = m(h(), 1),
    M = {
        get: () => {},
        subscribe: () => ({
            unsubscribe: () => {}
        })
    };

function b(r) {
    const t = S(),
        n = c.useContext(r.from ? g : v),
        o = r.from ? ? n,
        i = o ? r.from ? t.stores.getRouteMatchStore(o) : t.stores.matchStores.get(o) : void 0,
        s = c.useRef(void 0);
    return l(i ? ? M, e => {
        if ((r.shouldThrow ? ? !0) && !e && d(), e === void 0) return;
        const u = r.select ? r.select(e) : e;
        if (r.structuralSharing ? ? t.options.defaultStructuralSharing) {
            const a = f(s.current, u);
            return s.current = a, a
        }
        return u
    })
}

function y(r) {
    return b({
        from: r.from,
        strict: r.strict,
        shouldThrow: r.shouldThrow,
        structuralSharing: r.structuralSharing,
        select: t => r.select ? r.select(t.search) : t.search
    })
}
export {
    b as n, y as t
};