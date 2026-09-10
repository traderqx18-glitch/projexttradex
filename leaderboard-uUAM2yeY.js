import {
    i as h,
    t as b
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as g
} from "./react-D8T8de5F.js";
import {
    t as v
} from "./clock-7F-kh4wV.js";
import {
    t as j
} from "./info-Da8z7dkW.js";
import {
    st as u
} from "./index-dGs9i_Jo.js";
import {
    t as y
} from "./use-is-funded-account-D2HXKtsv.js";
import {
    n as N
} from "./FundedLocked-CMVnVgvT.js";
var l = h(g()),
    e = b(),
    a = Date.now(),
    d = 3600 * 1e3,
    n = 24 * d,
    x = [{
        id: "crazy-wed",
        name: "Crazy Wednesday",
        prizePool: 7500,
        entryFee: 10,
        durationLabel: "1 day",
        startsAt: a + 13 * d + 120 * 1e3,
        endsAt: a + 13 * d + n,
        status: "active"
    }, {
        id: "free-friday",
        name: "Free Friday",
        prizePool: 1e3,
        entryFee: 0,
        durationLabel: "1 day",
        startsAt: a + 2 * n,
        endsAt: a + 3 * n,
        status: "active"
    }, {
        id: "weekend-battle",
        name: "Weekend Battle",
        prizePool: 5e3,
        entryFee: 1,
        durationLabel: "2 days",
        startsAt: a + 3 * n,
        endsAt: a + 5 * n,
        status: "active"
    }, {
        id: "monday-mayhem",
        name: "Monday Mayhem",
        prizePool: 3e3,
        entryFee: 5,
        durationLabel: "1 day",
        startsAt: a - 5 * n,
        endsAt: a - 4 * n,
        status: "completed"
    }, {
        id: "trader-cup",
        name: "Trader Cup",
        prizePool: 1e4,
        entryFee: 20,
        durationLabel: "3 days",
        startsAt: a - 10 * n,
        endsAt: a - 7 * n,
        status: "completed"
    }];

function w(t = 1e3) {
    const [, r] = (0, l.useState)(0);
    (0, l.useEffect)(() => {
        const i = setInterval(() => r(o => o + 1), t);
        return () => clearInterval(i)
    }, [t])
}

function A(t) {
    const r = t - Date.now();
    if (r <= 0) return "STARTED";
    const i = Math.floor(r / n);
    if (i >= 1) return `${i} DAY(S)`;
    const o = Math.floor(r / d),
        s = Math.floor(r % d / 6e4),
        c = Math.floor(r % 6e4 / 1e3);
    return `${String(o).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(c).padStart(2,"0")}`
}

function L() {
    const [t, r] = (0, l.useState)("active");
    w(1e3);
    const {
        isFunded: i
    } = y(), o = (0, l.useMemo)(() => x.filter(s => s.status === t), [t]);
    return i ? (0, e.jsxs)("div", {
        className: "p-4 md:p-6",
        children: [(0, e.jsxs)("h1", {
            className: "mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight",
            children: [(0, e.jsx)(u, {
                className: "h-6 w-6 text-primary"
            }), " Tournaments"]
        }), (0, e.jsx)(N, {
            title: "Tournaments are locked"
        })]
    }) : (0, e.jsxs)("div", {
        className: "relative p-4 md:p-6",
        children: [(0, e.jsxs)("div", {
            className: "pointer-events-none select-none blur-sm",
            children: [(0, e.jsxs)("h1", {
                className: "mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight",
                children: [(0, e.jsx)(u, {
                    className: "h-6 w-6 text-primary"
                }), " Tournaments"]
            }), (0, e.jsx)("div", {
                className: "mb-6 flex items-center gap-8 border-b border-border",
                children: ["active", "completed"].map(s => {
                    const c = x.filter(f => f.status === s).length,
                        m = t === s;
                    return (0, e.jsxs)("button", {
                        onClick: () => r(s),
                        className: `relative flex items-center gap-2 px-1 pb-3 text-sm font-semibold uppercase tracking-wider transition ${m?"text-primary":"text-muted-foreground hover:text-foreground"}`,
                        children: [s, (0, e.jsx)("span", {
                            className: `inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] ${m?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`,
                            children: c
                        }), m && (0, e.jsx)("span", {
                            className: "absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                        })]
                    }, s)
                })
            }), (0, e.jsxs)("div", {
                className: "mb-5 text-center text-base font-medium text-foreground/90",
                children: [t === "active" ? "Available for participation" : "Completed tournaments", " (", o.length, ")"]
            }), o.length === 0 ? (0, e.jsxs)("div", {
                className: "panel p-10 text-center text-sm text-muted-foreground",
                children: ["No ", t, " tournaments right now."]
            }) : (0, e.jsx)("div", {
                className: "grid gap-5 md:grid-cols-2",
                children: o.map(s => (0, e.jsx)(S, {
                    t: s
                }, s.id))
            })]
        }), (0, e.jsx)("div", {
            className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center",
            children: (0, e.jsxs)("div", {
                className: "rounded-xl border border-border/60 bg-panel/80 px-8 py-5 text-center shadow-lg backdrop-blur-md",
                children: [(0, e.jsx)("div", {
                    className: "text-3xl font-extrabold uppercase tracking-[0.3em] text-foreground/90",
                    children: "Coming Soon"
                }), (0, e.jsx)("div", {
                    className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Stay tuned"
                })]
            })
        })]
    })
}

function S({
    t
}) {
    const r = t.status === "active",
        i = r ? A(t.startsAt) : "FINISHED";
    return (0, e.jsxs)("div", {
        className: "relative overflow-hidden rounded-xl border border-border bg-panel p-5 md:p-6",
        children: [(0, e.jsx)("div", {
            className: "pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]",
            children: (0, e.jsx)(u, {
                className: "h-64 w-64"
            })
        }), (0, e.jsx)("div", {
            className: "relative mb-8 flex",
            children: (0, e.jsxs)("span", {
                className: `inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${r?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"}`,
                children: [(0, e.jsx)(v, {
                    className: "h-3.5 w-3.5"
                }), r ? `Until start: ${i}` : "Tournament ended"]
            })
        }), (0, e.jsxs)("div", {
            className: "relative mb-8 flex items-start justify-between gap-4",
            children: [(0, e.jsx)("h3", {
                className: "text-2xl font-bold tracking-tight",
                children: t.name
            }), (0, e.jsxs)("div", {
                className: "text-right",
                children: [(0, e.jsx)("div", {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "Prize pool"
                }), (0, e.jsxs)("div", {
                    className: "text-2xl font-bold text-bull",
                    children: [t.prizePool.toLocaleString(), " $"]
                })]
            })]
        }), (0, e.jsxs)("div", {
            className: "relative mb-6 grid grid-cols-2 gap-4",
            children: [(0, e.jsx)(p, {
                value: `${t.entryFee} $`,
                label: "Entry fee"
            }), (0, e.jsx)(p, {
                value: t.durationLabel,
                label: "Duration"
            })]
        }), (0, e.jsxs)("button", {
            className: "relative flex w-full items-center justify-center gap-2 rounded-md bg-muted/50 py-3 text-sm font-medium text-foreground transition hover:bg-muted",
            children: ["Details", (0, e.jsx)("span", {
                className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
                children: (0, e.jsx)(j, {
                    className: "h-3 w-3"
                })
            })]
        })]
    })
}

function p({
    value: t,
    label: r
}) {
    return (0, e.jsxs)("div", {
        children: [(0, e.jsx)("div", {
            className: "text-xl font-bold",
            children: t
        }), (0, e.jsx)("div", {
            className: "text-xs text-muted-foreground",
            children: r
        })]
    })
}
export {
    L as component
};