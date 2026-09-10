import {
    i as N,
    t as S
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as W
} from "./react-D8T8de5F.js";
import {
    n as b,
    o as D,
    r as w
} from "./otc-pricing-C1tFTqc4.js";
var k = N(W(), 1),
    e = S(),
    c = 300,
    i = 112,
    O = 14,
    $ = i - 14;

function p({
    params: s,
    openMs: t,
    expireMs: o,
    openPrice: r,
    closePrice: n
}) {
    return (0, k.useMemo)(() => {
        if (!s) return null;
        const l = Math.max(1e3, o - t),
            x = t - l * 1.6,
            d = o + l * 1.2,
            f = 130,
            a = [];
        for (let h = 0; h <= f; h++) {
            const M = x + (d - x) * h / f;
            a.push({
                x: h / f,
                p: D(s, M / 1e3)
            })
        }
        const j = a.map(h => h.p).concat([r, n ? ? r]),
            y = Math.min(...j),
            C = Math.max(...j),
            v = C - y || 1,
            u = h => $ - (h - y) / v * ($ - O);
        return {
            pts: a.map(h => ({
                x: h.x * c,
                y: u(h.p),
                p: h.p
            })),
            y: u,
            lo: y,
            hi: C,
            yOpen: u(r),
            yClose: u(n ? ? r),
            xStart: (t - x) / (d - x) * c,
            xEnd: (o - x) / (d - x) * c,
            from: x,
            to: d
        }
    }, [s, t, o, r, n])
}

function g(s) {
    if (s.length < 2) return "";
    let t = `M${s[0].x.toFixed(2)},${s[0].y.toFixed(2)}`;
    for (let o = 0; o < s.length - 1; o++) {
        const r = s[o - 1] ? ? s[o],
            n = s[o],
            l = s[o + 1],
            x = s[o + 2] ? ? l;
        t += ` C${(n.x+(l.x-r.x)/6).toFixed(2)},${(n.y+(l.y-r.y)/6).toFixed(2)} ${(l.x-(x.x-n.x)/6).toFixed(2)},${(l.y-(x.y-n.y)/6).toFixed(2)} ${l.x.toFixed(2)},${l.y.toFixed(2)}`
    }
    return t
}

function m(s) {
    return s.isDraw ? "var(--color-muted-foreground, #8b8f9e)" : s.isWin ? "var(--color-bull)" : "var(--color-bear)"
}

function E(s) {
    return `${s}-${Math.random().toString(36).slice(2,8)}`
}

function L(s) {
    const t = p(s),
        o = (0, k.useMemo)(() => E("aurora"), []);
    if (!t) return null;
    const r = m(s),
        n = g(t.pts);
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [(0, e.jsxs)("defs", {
            children: [(0, e.jsxs)("linearGradient", {
                id: `${o}f`,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [(0, e.jsx)("stop", {
                    offset: "0%",
                    stopColor: r,
                    stopOpacity: .4
                }), (0, e.jsx)("stop", {
                    offset: "55%",
                    stopColor: r,
                    stopOpacity: .12
                }), (0, e.jsx)("stop", {
                    offset: "100%",
                    stopColor: r,
                    stopOpacity: 0
                })]
            }), (0, e.jsxs)("filter", {
                id: `${o}g`,
                x: "-20%",
                y: "-40%",
                width: "140%",
                height: "180%",
                children: [(0, e.jsx)("feGaussianBlur", {
                    stdDeviation: "3.2",
                    result: "b"
                }), (0, e.jsxs)("feMerge", {
                    children: [(0, e.jsx)("feMergeNode", { in: "b"
                    }), (0, e.jsx)("feMergeNode", { in: "SourceGraphic"
                    })]
                })]
            })]
        }), [.2, .45, .7, .95].map(l => (0, e.jsx)("line", {
            x1: 0,
            x2: c,
            y1: i * l,
            y2: i * l,
            stroke: "currentColor",
            className: "text-border",
            strokeWidth: .6,
            opacity: .45,
            vectorEffect: "non-scaling-stroke"
        }, l)), (0, e.jsx)("path", {
            d: `${n} L${c},${i} L0,${i} Z`,
            fill: `url(#${o}f)`
        }), (0, e.jsx)("line", {
            x1: 0,
            x2: c,
            y1: t.yOpen,
            y2: t.yOpen,
            stroke: "currentColor",
            className: "text-muted-foreground",
            strokeDasharray: "3 4",
            strokeWidth: 1,
            opacity: .6,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("path", {
            d: n,
            fill: "none",
            stroke: r,
            strokeWidth: 1.9,
            strokeLinecap: "round",
            filter: `url(#${o}g)`,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("circle", {
            cx: t.xStart,
            cy: t.yOpen,
            r: 2.6,
            fill: "currentColor",
            className: "text-foreground"
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 7,
            fill: r,
            opacity: .2
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 3,
            fill: r
        })]
    })
}

function B(s) {
    const t = p(s),
        o = (0, k.useMemo)(() => {
            if (!s.params || !t) return [];
            const a = Math.max(1, Math.round((t.to - t.from) / 1e3 / 34));
            return b(s.params, Math.floor(t.to / 1e3), a, 34)
        }, [s.params, t ? .from, t ? .to]);
    if (!t || !o.length) return null;
    const r = m(s),
        n = Math.min(...o.map(a => a.low)),
        l = Math.max(...o.map(a => a.high)) - n || 1,
        x = a => $ - (a - n) / l * ($ - O),
        d = c / o.length,
        f = Math.max(2, d * .58);
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [
            [.25, .5, .75].map(a => (0, e.jsx)("line", {
                x1: 0,
                x2: c,
                y1: i * a,
                y2: i * a,
                stroke: "currentColor",
                className: "text-border",
                strokeWidth: .5,
                opacity: .4,
                vectorEffect: "non-scaling-stroke"
            }, a)), (0, e.jsx)("rect", {
                x: t.xStart,
                y: 0,
                width: Math.max(1, t.xEnd - t.xStart),
                height: i,
                fill: r,
                opacity: .07
            }), o.map((a, j) => {
                const y = j * d + d / 2,
                    C = a.close >= a.open ? "var(--color-bull)" : "var(--color-bear)",
                    v = x(a.open),
                    u = x(a.close);
                return (0, e.jsxs)("g", {
                    children: [(0, e.jsx)("line", {
                        x1: y,
                        x2: y,
                        y1: x(a.high),
                        y2: x(a.low),
                        stroke: C,
                        strokeWidth: 1,
                        opacity: .85,
                        vectorEffect: "non-scaling-stroke"
                    }), (0, e.jsx)("rect", {
                        x: y - f / 2,
                        y: Math.min(v, u),
                        width: f,
                        height: Math.max(1, Math.abs(u - v)),
                        fill: C,
                        rx: .6
                    })]
                }, a.time)
            }), (0, e.jsx)("line", {
                x1: 0,
                x2: c,
                y1: t.yOpen,
                y2: t.yOpen,
                stroke: "currentColor",
                className: "text-foreground",
                strokeDasharray: "4 4",
                strokeWidth: .9,
                opacity: .55,
                vectorEffect: "non-scaling-stroke"
            }), (0, e.jsx)("line", {
                x1: t.xEnd,
                x2: t.xEnd,
                y1: 0,
                y2: i,
                stroke: r,
                strokeWidth: 1,
                strokeDasharray: "2 3",
                opacity: .8,
                vectorEffect: "non-scaling-stroke"
            })
        ]
    })
}

function F(s) {
    const t = p(s),
        o = (0, k.useMemo)(() => E("split"), []);
    if (!t) return null;
    const r = m(s),
        n = g(t.pts);
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [(0, e.jsxs)("defs", {
            children: [(0, e.jsx)("clipPath", {
                id: `${o}c`,
                children: (0, e.jsx)("rect", {
                    x: t.xStart,
                    y: 0,
                    width: Math.max(1, t.xEnd - t.xStart),
                    height: i
                })
            }), (0, e.jsxs)("linearGradient", {
                id: `${o}f`,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [(0, e.jsx)("stop", {
                    offset: "0%",
                    stopColor: r,
                    stopOpacity: .3
                }), (0, e.jsx)("stop", {
                    offset: "100%",
                    stopColor: r,
                    stopOpacity: 0
                })]
            })]
        }), (0, e.jsx)("rect", {
            x: t.xStart,
            y: 0,
            width: Math.max(1, t.xEnd - t.xStart),
            height: i,
            fill: r,
            opacity: .05
        }), (0, e.jsx)("path", {
            d: n,
            fill: "none",
            stroke: "currentColor",
            className: "text-muted-foreground",
            strokeWidth: 1.2,
            opacity: .5,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsxs)("g", {
            clipPath: `url(#${o}c)`,
            children: [(0, e.jsx)("path", {
                d: `${n} L${c},${i} L0,${i} Z`,
                fill: `url(#${o}f)`
            }), (0, e.jsx)("path", {
                d: n,
                fill: "none",
                stroke: r,
                strokeWidth: 2.4,
                strokeLinecap: "round",
                vectorEffect: "non-scaling-stroke"
            })]
        }), (0, e.jsx)("line", {
            x1: 0,
            x2: c,
            y1: t.yOpen,
            y2: t.yOpen,
            stroke: "currentColor",
            className: "text-muted-foreground",
            strokeDasharray: "2 3",
            strokeWidth: .9,
            opacity: .6,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("circle", {
            cx: t.xStart,
            cy: t.yOpen,
            r: 3,
            fill: "currentColor",
            className: "text-foreground"
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 3.4,
            fill: r
        })]
    })
}

function A(s) {
    const t = p(s);
    if (!t) return null;
    const o = m(s),
        r = g(t.pts),
        n = Math.min(c - 52, Math.max(2, t.xEnd - 26));
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [
            [.15, .38, .61, .84].map(l => (0, e.jsx)("line", {
                x1: 0,
                x2: c,
                y1: i * l,
                y2: i * l,
                stroke: "currentColor",
                className: "text-border",
                strokeDasharray: "1 5",
                strokeWidth: 1,
                opacity: .7,
                vectorEffect: "non-scaling-stroke"
            }, l)), (0, e.jsx)("path", {
                d: r,
                fill: "none",
                stroke: o,
                strokeWidth: 1.7,
                strokeLinecap: "round",
                vectorEffect: "non-scaling-stroke"
            }), (0, e.jsx)("line", {
                x1: 0,
                x2: c,
                y1: t.yOpen,
                y2: t.yOpen,
                stroke: "currentColor",
                className: "text-muted-foreground",
                strokeDasharray: "4 4",
                strokeWidth: 1,
                opacity: .7,
                vectorEffect: "non-scaling-stroke"
            }), (0, e.jsx)("circle", {
                cx: t.xStart,
                cy: t.yOpen,
                r: 3,
                fill: "currentColor",
                className: "text-foreground"
            }), (0, e.jsx)("circle", {
                cx: t.xEnd,
                cy: t.yClose,
                r: 3.4,
                fill: o
            }), (0, e.jsxs)("g", {
                children: [(0, e.jsx)("rect", {
                    x: 2,
                    y: t.yOpen - 8,
                    width: 50,
                    height: 14,
                    rx: 3,
                    className: "fill-muted",
                    opacity: .9
                }), (0, e.jsx)("text", {
                    x: 27,
                    y: t.yOpen + 2,
                    textAnchor: "middle",
                    className: "fill-foreground",
                    style: {
                        fontSize: 9,
                        fontFamily: "ui-monospace, monospace"
                    },
                    children: w(s.openPrice)
                })]
            }), (0, e.jsxs)("g", {
                children: [(0, e.jsx)("rect", {
                    x: n,
                    y: t.yClose - 17,
                    width: 52,
                    height: 14,
                    rx: 3,
                    fill: o,
                    opacity: .9
                }), (0, e.jsx)("text", {
                    x: n + 26,
                    y: t.yClose - 7,
                    textAnchor: "middle",
                    style: {
                        fontSize: 9,
                        fontFamily: "ui-monospace, monospace",
                        fill: "#0b0d14"
                    },
                    children: w(s.closePrice ? ? s.openPrice)
                })]
            })
        ]
    })
}

function _(s) {
    const t = p(s),
        o = (0, k.useMemo)(() => E("neon"), []);
    if (!t) return null;
    const r = m(s),
        n = g(t.pts);
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [(0, e.jsxs)("defs", {
            children: [(0, e.jsx)("filter", {
                id: `${o}b`,
                x: "-30%",
                y: "-50%",
                width: "160%",
                height: "200%",
                children: (0, e.jsx)("feGaussianBlur", {
                    stdDeviation: "4"
                })
            }), (0, e.jsx)("pattern", {
                id: `${o}p`,
                width: 25,
                height: 22,
                patternUnits: "userSpaceOnUse",
                children: (0, e.jsx)("path", {
                    d: "M25 0 L0 0 0 22",
                    fill: "none",
                    stroke: "currentColor",
                    className: "text-border",
                    strokeWidth: .5,
                    opacity: .5
                })
            })]
        }), (0, e.jsx)("rect", {
            width: c,
            height: i,
            fill: `url(#${o}p)`
        }), (0, e.jsx)("path", {
            d: n,
            fill: "none",
            stroke: r,
            strokeWidth: 4,
            opacity: .35,
            filter: `url(#${o}b)`
        }), (0, e.jsx)("path", {
            d: n,
            fill: "none",
            stroke: r,
            strokeWidth: 1.6,
            strokeLinecap: "round",
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("line", {
            x1: t.xStart,
            x2: t.xStart,
            y1: 0,
            y2: i,
            stroke: "currentColor",
            className: "text-muted-foreground",
            strokeDasharray: "2 4",
            strokeWidth: 1,
            opacity: .5,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("line", {
            x1: t.xEnd,
            x2: t.xEnd,
            y1: 0,
            y2: i,
            stroke: r,
            strokeDasharray: "2 4",
            strokeWidth: 1,
            opacity: .8,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 9,
            fill: r,
            opacity: .18
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 3,
            fill: r
        })]
    })
}

function G(s) {
    const t = p(s);
    if (!t) return null;
    const o = m(s),
        r = 42,
        n = c / r,
        l = Math.max(1.5, n * .5),
        x = Array.from({
            length: r
        }, (d, f) => t.pts[Math.floor(f * (t.pts.length - 1) / (r - 1))]);
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [(0, e.jsx)("rect", {
            x: t.xStart,
            y: 0,
            width: Math.max(1, t.xEnd - t.xStart),
            height: i,
            fill: o,
            opacity: .06
        }), x.map((d, f) => {
            const a = f * n + n / 2,
                j = d.y <= t.yOpen ? "var(--color-bull)" : "var(--color-bear)",
                y = a >= t.xStart && a <= t.xEnd;
            return (0, e.jsx)("rect", {
                x: a - l / 2,
                y: Math.min(d.y, t.yOpen),
                width: l,
                height: Math.max(1, Math.abs(d.y - t.yOpen)),
                fill: j,
                opacity: y ? .95 : .35,
                rx: 1
            }, f)
        }), (0, e.jsx)("line", {
            x1: 0,
            x2: c,
            y1: t.yOpen,
            y2: t.yOpen,
            stroke: "currentColor",
            className: "text-foreground",
            strokeWidth: 1,
            opacity: .7,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("path", {
            d: g(t.pts),
            fill: "none",
            stroke: "currentColor",
            className: "text-foreground",
            strokeWidth: 1,
            opacity: .35,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 3.2,
            fill: o
        })]
    })
}
var Z = [{
    id: 1,
    name: "Aurora Glow",
    Comp: L,
    note: "Soft gradient mountain with glowing line"
}, {
    id: 2,
    name: "Mini Candles",
    Comp: B,
    note: "Real candlestick miniature"
}, {
    id: 3,
    name: "Focus Split",
    Comp: F,
    note: "Trade window highlighted, rest muted"
}, {
    id: 4,
    name: "Quote Chips",
    Comp: A,
    note: "Entry/exit prices labelled on chart"
}, {
    id: 5,
    name: "Neon Grid",
    Comp: _,
    note: "Terminal-style glow line on grid"
}, {
    id: 6,
    name: "Momentum Bars",
    Comp: G,
    note: "Columns above/below entry level"
}];

function q(s) {
    const t = p(s),
        o = (0, k.useMemo)(() => E("an"), []);
    if (!t) return null;
    const r = m(s),
        n = g(t.pts);
    return (0, e.jsxs)("svg", {
        viewBox: `0 0 ${c} ${i}`,
        className: "h-28 w-full",
        children: [(0, e.jsxs)("defs", {
            children: [(0, e.jsxs)("linearGradient", {
                id: `${o}f`,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [(0, e.jsx)("stop", {
                    offset: "0%",
                    stopColor: r,
                    stopOpacity: .38
                }), (0, e.jsx)("stop", {
                    offset: "55%",
                    stopColor: r,
                    stopOpacity: .12
                }), (0, e.jsx)("stop", {
                    offset: "100%",
                    stopColor: r,
                    stopOpacity: 0
                })]
            }), (0, e.jsx)("filter", {
                id: `${o}b`,
                x: "-30%",
                y: "-50%",
                width: "160%",
                height: "200%",
                children: (0, e.jsx)("feGaussianBlur", {
                    stdDeviation: "3.4"
                })
            }), (0, e.jsx)("pattern", {
                id: `${o}p`,
                width: 25,
                height: 22,
                patternUnits: "userSpaceOnUse",
                children: (0, e.jsx)("path", {
                    d: "M25 0 L0 0 0 22",
                    fill: "none",
                    stroke: "currentColor",
                    className: "text-border",
                    strokeWidth: .5,
                    opacity: .45
                })
            })]
        }), (0, e.jsx)("rect", {
            width: c,
            height: i,
            fill: `url(#${o}p)`
        }), (0, e.jsx)("rect", {
            x: t.xStart,
            y: 0,
            width: Math.max(1, t.xEnd - t.xStart),
            height: i,
            fill: r,
            opacity: .06
        }), (0, e.jsx)("line", {
            x1: 0,
            x2: c,
            y1: t.yOpen,
            y2: t.yOpen,
            stroke: "currentColor",
            className: "text-muted-foreground",
            strokeDasharray: "3 4",
            strokeWidth: 1,
            opacity: .6,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("path", {
            d: `${n} L${c},${i} L0,${i} Z`,
            fill: `url(#${o}f)`
        }), (0, e.jsx)("path", {
            d: n,
            fill: "none",
            stroke: r,
            strokeWidth: 4,
            opacity: .3,
            filter: `url(#${o}b)`
        }), (0, e.jsx)("path", {
            d: n,
            fill: "none",
            stroke: r,
            strokeWidth: 1.7,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("line", {
            x1: t.xStart,
            x2: t.xStart,
            y1: 0,
            y2: i,
            stroke: "currentColor",
            className: "text-muted-foreground",
            strokeDasharray: "2 4",
            strokeWidth: 1,
            opacity: .45,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("line", {
            x1: t.xEnd,
            x2: t.xEnd,
            y1: 0,
            y2: i,
            stroke: r,
            strokeDasharray: "2 4",
            strokeWidth: 1,
            opacity: .75,
            vectorEffect: "non-scaling-stroke"
        }), (0, e.jsx)("circle", {
            cx: t.xStart,
            cy: t.yOpen,
            r: 2.6,
            fill: "currentColor",
            className: "text-foreground"
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 8,
            fill: r,
            opacity: .18
        }), (0, e.jsx)("circle", {
            cx: t.xEnd,
            cy: t.yClose,
            r: 3.2,
            fill: r
        })]
    })
}
export {
    q as n, Z as t
};