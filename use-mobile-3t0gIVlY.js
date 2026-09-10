import {
    i as a
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as s
} from "./react-D8T8de5F.js";
var r = a(s(), 1),
    e = 768;

function m() {
    const [o, t] = r.useState(void 0);
    return r.useEffect(() => {
        const i = window.matchMedia(`(max-width: ${e-1}px)`),
            n = () => {
                t(window.innerWidth < e)
            };
        return i.addEventListener("change", n), t(window.innerWidth < e), () => i.removeEventListener("change", n)
    }, []), !!o
}
export {
    m as t
};