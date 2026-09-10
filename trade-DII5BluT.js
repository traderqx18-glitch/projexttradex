import {
    i as s,
    t as a
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as c
} from "./react-D8T8de5F.js";
import {
    t as u
} from "./useRouter-DuDv8g77.js";
import {
    tt as m
} from "./index-dGs9i_Jo.js";
var l = s(c()),
    t = a();

function _({
    reset: o
}) {
    const i = u(),
        [r, e] = (0, l.useState)(!1),
        n = async () => {
            if (!r) {
                e(!0);
                try {
                    await i.invalidate(), o()
                } finally {
                    e(!1)
                }
            }
        };
    return (0, t.jsx)("div", {
        className: "flex h-full min-h-0 w-full items-center justify-center bg-background p-4",
        children: (0, t.jsx)(m, {
            type: "button",
            onClick: () => void n(),
            disabled: r,
            children: r ? "Restoring…" : "Restore trading screen"
        })
    })
}
export {
    _ as errorComponent
};