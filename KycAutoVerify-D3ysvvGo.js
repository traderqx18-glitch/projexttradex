import {
    i as A,
    t as P
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as T
} from "./react-D8T8de5F.js";
import {
    t as B
} from "./useServerFn-CEPyiRv4.js";
import {
    r as Y
} from "./portal-client-CV1s4BnW.js";
import {
    t as K
} from "./createLucideIcon-salqAbnG.js";
import {
    t as z
} from "./camera-CN5DMFcd.js";
import {
    t as L
} from "./circle-check-BOqJS-UD.js";
import {
    t as R
} from "./circle-x-DXfpF8B9.js";
import {
    t as g
} from "./loader-circle-Bbd-wqZ4.js";
import {
    t as X
} from "./refresh-cw-DJyyNEyp.js";
import {
    t as U
} from "./shield-check-CZHDphXU.js";
import {
    Fn as G,
    Rn as H,
    f as J,
    tt as E
} from "./index-dGs9i_Jo.js";
var Q = [
        ["path", {
            d: "M16 10h2",
            key: "8sgtl7"
        }],
        ["path", {
            d: "M16 14h2",
            key: "epxaof"
        }],
        ["path", {
            d: "M6.17 15a3 3 0 0 1 5.66 0",
            key: "n6f512"
        }],
        ["circle", {
            cx: "9",
            cy: "11",
            r: "2",
            key: "yxgjnd"
        }],
        ["rect", {
            x: "2",
            y: "5",
            width: "20",
            height: "14",
            rx: "2",
            key: "qneu4z"
        }]
    ],
    q = K("id-card", Q),
    d = A(T(), 1),
    W = G({
        method: "POST"
    }).middleware([J]).handler(H("4618c7d0d89050dd5a43d8bf552a322154dab1fa5171f1982a502bbce892185d")),
    e = P(),
    y = [{
        key: "id_front",
        label: "ID front",
        hint: "Front side of your ID card (CNIC). All four corners visible, sharp focus, no glare — original card only, no photocopy or screen photo.",
        facing: "environment",
        icon: q
    }, {
        key: "id_back",
        label: "ID back",
        hint: "Back side of the same card. Text and barcode must be clearly readable.",
        facing: "environment",
        icon: q
    }];

function ue({
    userId: m,
    status: n,
    reason: p,
    source: v = "trading",
    onChanged: x
}) {
    const b = B(W),
        [s, o] = (0, d.useState)(0),
        [c, S] = (0, d.useState)({}),
        [F, C] = (0, d.useState)({}),
        [f, N] = (0, d.useState)(null),
        [_, h] = (0, d.useState)(null),
        [t, k] = (0, d.useState)(null),
        u = y[s],
        w = !!c.id_front && !!c.id_back,
        V = n === "verified";
    (0, d.useEffect)(() => () => {
        Object.values(c).forEach(r => r && URL.revokeObjectURL(r.url))
    }, []);
    const M = () => {
            Object.values(c).forEach(r => r && URL.revokeObjectURL(r.url)), S({}), C({}), o(0), k(null), h(null)
        },
        O = r => {
            const i = URL.createObjectURL(r);
            S(a => {
                const l = a[u.key];
                return l && URL.revokeObjectURL(l.url), { ...a,
                    [u.key]: {
                        blob: r,
                        url: i
                    }
                }
            }), h(null), s < y.length - 1 && o(s + 1)
        },
        D = async () => {
            if (!(!m || !w)) {
                h(null), k(null), N("uploading");
                try {
                    const r = { ...F
                        },
                        i = async (a, l) => {
                            const I = `${m}/${a}-${Date.now()}-${Math.random().toString(36).slice(2,8)}.jpg`,
                                {
                                    error: $
                                } = await Y.storage.from("kyc-documents").upload(I, l, {
                                    contentType: "image/jpeg",
                                    upsert: !0
                                });
                            if ($) throw new Error($.message);
                            return I
                        };
                    for (const a of ["id_front", "id_back"]) r[a] = await i(a, c[a].blob);
                    C(r), N("verifying"), k(await b({
                        data: {
                            front: r.id_front,
                            back: r.id_back,
                            source: v
                        }
                    })), x()
                } catch (r) {
                    h(r instanceof Error ? r.message : "Verification failed. Please try again.")
                } finally {
                    N(null)
                }
            }
        };
    if (V && !t) return (0, e.jsxs)("div", {
        className: "flex items-start gap-3 rounded-lg border border-bull/40 bg-bull/10 p-4",
        children: [(0, e.jsx)(U, {
            className: "mt-0.5 h-5 w-5 shrink-0 text-bull"
        }), (0, e.jsxs)("div", {
            children: [(0, e.jsx)("p", {
                className: "text-sm font-bold",
                children: "Identity verified"
            }), (0, e.jsx)("p", {
                className: "mt-1 text-xs text-muted-foreground",
                children: "Your ID document has been approved. No further action is needed."
            })]
        })]
    });
    if (t) {
        const r = t.decision === "approved" ? {
            box: "border-bull/40 bg-bull/10",
            icon: "text-bull",
            Icon: L,
            title: "Verification approved"
        } : t.decision === "needs_review" ? {
            box: "border-yellow-500/40 bg-yellow-500/10",
            icon: "text-yellow-500",
            Icon: g,
            title: "Under quick review"
        } : {
            box: "border-bear/40 bg-bear/10",
            icon: "text-bear",
            Icon: R,
            title: "Verification failed"
        };
        return (0, e.jsxs)("div", {
            className: "space-y-4",
            children: [(0, e.jsxs)("div", {
                className: `flex items-start gap-3 rounded-lg border p-4 ${r.box}`,
                children: [(0, e.jsx)(r.Icon, {
                    className: `mt-0.5 h-5 w-5 shrink-0 ${r.icon}`
                }), (0, e.jsxs)("div", {
                    className: "min-w-0",
                    children: [(0, e.jsx)("p", {
                        className: "text-sm font-bold",
                        children: r.title
                    }), (0, e.jsx)("p", {
                        className: "mt-1 text-xs text-muted-foreground",
                        children: t.reason
                    }), t.failures.length > 1 && (0, e.jsx)("ul", {
                        className: "mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground",
                        children: t.failures.slice(1).map(i => (0, e.jsx)("li", {
                            children: i
                        }, i))
                    })]
                })]
            }), (0, e.jsxs)("div", {
                className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
                children: [(0, e.jsx)(j, {
                    label: "Document",
                    value: t.scores.authenticity
                }), (0, e.jsx)(j, {
                    label: "Readability",
                    value: t.scores.readability
                }), !t.faceSkipped && (0, e.jsx)(j, {
                    label: "Face match",
                    value: t.scores.faceMatch
                }), !t.faceSkipped && (0, e.jsx)(j, {
                    label: "Liveness",
                    value: t.scores.liveness
                })]
            }), t.decision !== "approved" && (0, e.jsxs)(E, {
                variant: "outline",
                className: "w-full",
                onClick: M,
                children: [(0, e.jsx)(X, {
                    className: "mr-2 h-4 w-4"
                }), " Start a new verification"]
            })]
        })
    }
    return (0, e.jsxs)("div", {
        className: "space-y-4",
        children: [n === "rejected" && p && (0, e.jsxs)("div", {
            className: "flex items-start gap-3 rounded-lg border border-bear/40 bg-bear/10 p-3",
            children: [(0, e.jsx)(R, {
                className: "mt-0.5 h-4 w-4 shrink-0 text-bear"
            }), (0, e.jsx)("p", {
                className: "text-xs",
                children: p
            })]
        }), n === "pending" && (0, e.jsxs)("div", {
            className: "flex items-start gap-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-3",
            children: [(0, e.jsx)(g, {
                className: "mt-0.5 h-4 w-4 shrink-0 text-yellow-500"
            }), (0, e.jsx)("p", {
                className: "text-xs",
                children: "Your previous submission is under review. You can submit a clearer set of images if you like."
            })]
        }), (0, e.jsx)("div", {
            className: "grid grid-cols-2 gap-2",
            children: y.map((r, i) => {
                const a = !!c[r.key],
                    l = i === s;
                return (0, e.jsxs)("button", {
                    type: "button",
                    onClick: () => o(i),
                    className: `flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors ${l?"border-primary/70 bg-primary/10":a?"border-bull/40 bg-bull/5":"border-border bg-panel-2"}`,
                    children: [(0, e.jsx)("span", {
                        className: `grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${a?"bg-bull/20 text-bull":l?"bg-primary/20 text-primary":"bg-muted text-muted-foreground"}`,
                        children: a ? (0, e.jsx)(L, {
                            className: "h-3.5 w-3.5"
                        }) : i + 1
                    }), (0, e.jsx)("span", {
                        className: `truncate text-[11.5px] font-semibold tracking-[-0.01em] ${l||a?"text-foreground":"text-muted-foreground"}`,
                        children: r.label
                    })]
                }, r.key)
            })
        }), (0, e.jsx)(Z, {
            hint: u.hint,
            facing: u.facing,
            preview: c[u.key] ?.url ?? null,
            aspect: "card",
            disabled: !!f,
            onCapture: O
        }, u.key), _ && (0, e.jsx)("p", {
            className: "rounded-lg border border-bear/40 bg-bear/10 p-3 text-[11.5px] text-bear",
            children: _
        }), (0, e.jsx)(E, {
            className: "w-full font-semibold",
            disabled: !w || !!f,
            onClick: D,
            children: f === "uploading" ? (0, e.jsxs)(e.Fragment, {
                children: [(0, e.jsx)(g, {
                    className: "mr-2 h-4 w-4 animate-spin"
                }), " Uploading images…"]
            }) : f === "verifying" ? (0, e.jsxs)(e.Fragment, {
                children: [(0, e.jsx)(g, {
                    className: "mr-2 h-4 w-4 animate-spin"
                }), " Verifying your identity…"]
            }) : w ? (0, e.jsxs)(e.Fragment, {
                children: [(0, e.jsx)(U, {
                    className: "mr-2 h-4 w-4"
                }), " Verify my identity"]
            }) : `Step ${s+1} of ${y.length} — capture to continue`
        }), (0, e.jsx)("p", {
            className: "text-[11px] leading-relaxed tracking-[-0.005em] text-muted-foreground",
            children: "Automated checks run in seconds — document reading, photocopy and screen-photo detection, tamper analysis and a duplicate-document check. Live face verification is currently not required. Images are stored privately and used only for verification."
        })]
    })
}

function j({
    label: m,
    value: n
}) {
    return (0, e.jsxs)("div", {
        className: "rounded-md border border-border bg-panel-2 px-3 py-2",
        children: [(0, e.jsx)("div", {
            className: "text-[10px] uppercase tracking-widest text-muted-foreground",
            children: m
        }), (0, e.jsxs)("div", {
            className: `text-sm font-bold ${n>=70?"text-bull":n>=55?"text-yellow-500":"text-bear"}`,
            children: [Math.round(n), "%"]
        })]
    })
}

function Z({
    hint: m,
    facing: n,
    preview: p,
    aspect: v,
    disabled: x,
    onCapture: b
}) {
    return (0, e.jsxs)("div", {
        className: "rounded-xl border border-border bg-panel-2 p-3.5",
        children: [(0, e.jsx)("p", {
            className: "text-[11.5px] leading-relaxed tracking-[-0.005em] text-muted-foreground",
            children: m
        }), p && (0, e.jsx)("div", {
            className: `relative mt-3 w-full overflow-hidden rounded-lg bg-panel ring-1 ring-border ${v==="square"?"aspect-square max-w-xs":"aspect-[16/10]"}`,
            children: (0, e.jsx)("img", {
                src: p,
                alt: "Captured document",
                className: "h-full w-full object-cover"
            })
        }), (0, e.jsxs)("div", {
            className: "mt-3 flex flex-wrap items-center gap-2",
            children: [(0, e.jsxs)("label", {
                className: "inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-primary/60 bg-primary/10 px-3 text-[11.5px] font-semibold text-primary hover:bg-primary/15",
                children: [(0, e.jsx)(z, {
                    className: "h-3.5 w-3.5"
                }), " Use device camera", (0, e.jsx)("input", {
                    type: "file",
                    accept: "image/*",
                    capture: n,
                    className: "hidden",
                    disabled: x,
                    onChange: s => {
                        const o = s.target.files ?.[0];
                        s.target.value = "", o && b(o)
                    }
                })]
            }), (0, e.jsxs)("label", {
                className: "inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-border bg-panel px-3 text-[11.5px] font-semibold hover:bg-accent",
                children: ["Upload from device", (0, e.jsx)("input", {
                    type: "file",
                    accept: "image/jpeg,image/png,image/webp",
                    className: "hidden",
                    disabled: x,
                    onChange: s => {
                        const o = s.target.files ?.[0];
                        s.target.value = "", o && b(o)
                    }
                })]
            })]
        })]
    })
}
export {
    ue as t
};