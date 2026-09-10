import {
    i as Ee,
    t as Ae
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as Fe
} from "./react-D8T8de5F.js";
import {
    t as he
} from "./link-CrqkXRsL.js";
import {
    t as De
} from "./useNavigate-4EALhmsS.js";
import {
    t as I
} from "./useServerFn-CEPyiRv4.js";
import {
    r as F
} from "./portal-client-CV1s4BnW.js";
import {
    t as Pe
} from "./camera-CN5DMFcd.js";
import {
    t as Te
} from "./chevron-down-iYjIhesx.js";
import {
    t as Re
} from "./circle-alert-DVOFa-Qj.js";
import {
    t as Le
} from "./KycAutoVerify-D3ysvvGo.js";
import {
    t as X
} from "./lock-57lR6e-H.js";
import {
    t as Oe
} from "./x-CDsSwOcD.js";
import {
    E as Ue,
    Fn as te,
    H as Be,
    J as C,
    O as We,
    R as Ke,
    Rn as ae,
    Tn as J,
    U as Ie,
    dt as de,
    f as se,
    gn as U,
    st as Qe,
    tt as O,
    v as Ve,
    y as Ye,
    z as He
} from "./index-dGs9i_Jo.js";
import {
    r as ye
} from "./otc-pricing-C1tFTqc4.js";
import {
    t as L
} from "./input-CbStj2CK.js";
import {
    n as pe,
    r as ee
} from "./ui-snapshot-D_gTOR2w.js";
import {
    t as G
} from "./label-CKteD1di.js";
import {
    t as ze
} from "./trader-id-CFeqFSYT.js";
import {
    t as Ge
} from "./use-auth-a-YuX6oV.js";
import {
    t as Je
} from "./useActiveAccountKind-wD5dwXWV.js";
import {
    t as ne
} from "./use-is-funded-account-D2HXKtsv.js";
import {
    n as ce,
    t as je
} from "./FundedLocked-CMVnVgvT.js";
import {
    a as Ze
} from "./deposits.functions-CW0AdK8S.js";
import {
    n as Xe
} from "./server-clock-VDNFtlYK.js";
import {
    i as et,
    t as tt
} from "./auth-otp.functions-DtmnGILV.js";
var f = Ee(Fe()),
    at = te({
        method: "POST"
    }).middleware([se]).handler(ae("6252668e8645aba8292fa15550c40ba39dc31611afbc1d7bad667403ff1bf9e7")),
    st = te({
        method: "POST"
    }).middleware([se]).handler(ae("c1ae47c13bbd8751f7c59169554bce902b4a8ae3e959beb3921374b6123b30a1")),
    Z = t => t.replace(/\s+/g, ""),
    nt = /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
    ve = /^0x[0-9a-fA-F]{40}$/,
    rt = /^\d{7,15}$/,
    Y = {
        "USDT TRC20": {
            label: "USDT TRC20 (Tron) wallet address",
            placeholder: "T… (34 characters, starts with T)",
            hint: "Enter your USDT TRC20 (Tron) address. It always starts with “T” and is exactly 34 characters (letters and numbers, no spaces).",
            example: "TQmZ8vN1s9rG4bYkP2wLxD7cHfJ6uAe3Rt",
            clean: Z,
            validate: t => nt.test(t),
            error: "Invalid destination address. A USDT TRC20 (Tron) address starts with “T” and is exactly 34 characters."
        },
        "USDT BEP20": {
            label: "USDT BEP20 (BNB Smart Chain) wallet address",
            placeholder: "0x… (42 characters)",
            hint: "Enter your USDT BEP20 (BNB Smart Chain) address. It starts with “0x” followed by 40 hexadecimal characters (0-9, a-f).",
            example: "0x3a1f9c4b7d2e58a06f19cb43d7e0821b5c6d94ef",
            clean: Z,
            validate: t => ve.test(t),
            error: "Invalid destination address. A USDT BEP20 address starts with “0x” and has exactly 40 hex characters after it."
        },
        "USDT ERC20": {
            label: "USDT ERC20 (Ethereum) wallet address",
            placeholder: "0x… (42 characters)",
            hint: "Enter your USDT ERC20 (Ethereum) address. It starts with “0x” followed by 40 hexadecimal characters (0-9, a-f).",
            example: "0x9f27bd6c85e134a70d5c2fb81e4a3097c6d5182b",
            clean: Z,
            validate: t => ve.test(t),
            error: "Invalid destination address. A USDT ERC20 address starts with “0x” and has exactly 40 hex characters after it."
        },
        "Binance Pay": {
            label: "Binance Pay ID",
            placeholder: "e.g. 123456789 (numbers only)",
            hint: "Enter your Binance Pay ID (Binance ID) — numbers only, usually 8-12 digits. Do not enter an email, phone number or wallet address.",
            example: "406819193",
            clean: t => Z(t).replace(/[^\d]/g, ""),
            validate: t => rt.test(t),
            error: "Invalid Binance Pay ID. It must be numbers only (8-12 digits) — no email, phone number or wallet address."
        }
    },
    we = {
        label: "Destination address / account",
        placeholder: "Wallet address or account",
        hint: "Enter the destination address exactly as it appears in your wallet.",
        example: "",
        clean: t => t.trim(),
        validate: t => t.length >= 6,
        error: "Invalid destination address."
    };

function Me(t) {
    const a = String(t ? ? "").toLowerCase();
    return a ? Y[String(t)] ? Y[String(t)] : a.includes("binance") ? Y["Binance Pay"] : a.includes("trc") ? Y["USDT TRC20"] : a.includes("bep") ? Y["USDT BEP20"] : a.includes("erc") ? Y["USDT ERC20"] : we : we
}

function me(t, a) {
    const m = Me(t),
        d = m.clean(a ? ? "");
    return d ? m.validate(d) ? {
        ok: !0,
        value: d
    } : {
        ok: !1,
        error: m.error
    } : {
        ok: !1,
        error: "Enter a destination address"
    }
}
var it = te({
        method: "POST"
    }).middleware([se]).handler(ae("e224d6c4ad16f5848c52a259a286f2b6a94842020f93a91f0714f525d3d1b478")),
    lt = te({
        method: "POST"
    }).middleware([se]).handler(ae("5e232423c064b147a7328407fb5305ec8e850b196cd78e52f291accad52077dc")),
    e = Ae(),
    ue = [{
        key: "withdrawal",
        label: "Withdrawal"
    }, {
        key: "transactions",
        label: "Transactions"
    }, {
        key: "trades",
        label: "Trades"
    }, {
        key: "my_account",
        label: "My account"
    }, {
        key: "tournaments",
        label: "Tournaments"
    }, {
        key: "analytics",
        label: "Analytics"
    }];

function zt() {
    const {
        user: t
    } = Ge(), a = J(), m = I(Ze), d = Ue.useSearch(), g = De(), [c, s] = (0, f.useState)(d.tab ? ? "my_account"), [l, i] = (0, f.useState)(!1), k = (0, f.useRef)(null), h = (0, f.useRef)(!1), b = t ? .user_metadata ? ? {}, y = b.email_verified_at ? !0 : !("email_verified_at" in b) && !!t ? .email_confirmed_at, _ = r => {
        s(r), g({
            to: "/wallet",
            search: {
                tab: r
            },
            replace: !0
        })
    };
    (0, f.useEffect)(() => {
        d.tab && d.tab !== c && s(d.tab)
    }, [d.tab]), (0, f.useEffect)(() => {
        if (!t ? .id || h.current || typeof window > "u") return;
        h.current = !0;
        let r = !1;
        return (async () => {
            try {
                const N = await m();
                if (r) return;
                N.confirmed > 0 && (await Promise.all([a.invalidateQueries({
                    queryKey: ["deposits", t.id]
                }), a.invalidateQueries({
                    queryKey: ["wallet-balances", t.id]
                }), a.invalidateQueries({
                    queryKey: ["balances", t.id]
                })]), C.success("Deposit credited to your live account"))
            } catch {}
        })(), () => {
            r = !0
        }
    }, [t ? .id, m, a]), (0, f.useEffect)(() => {
        if (!l) return;
        const r = S => {
                k.current && !k.current.contains(S.target) && i(!1)
            },
            N = S => {
                S.key === "Escape" && i(!1)
            };
        return window.addEventListener("mousedown", r), window.addEventListener("keydown", N), () => {
            window.removeEventListener("mousedown", r), window.removeEventListener("keydown", N)
        }
    }, [l]);
    const {
        data: n
    } = U({
        queryKey: ["profile-full", t ? .id],
        enabled: !!t ? .id,
        placeholderData: () => pe("profile-full", t ? .id),
        queryFn: async () => {
            const {
                data: r
            } = await F.from("profiles").select("*").eq("id", t.id).maybeSingle();
            return ee("profile-full", t ? .id, r), r
        }
    }), {
        data: p
    } = U({
        queryKey: ["wallet-balances", t ? .id],
        enabled: !!t ? .id,
        refetchInterval: 5e3,
        placeholderData: () => pe("balances", t ? .id),
        queryFn: async () => {
            const {
                data: r
            } = await F.from("accounts").select("kind, balance").eq("user_id", t.id), N = {
                demo: 0,
                live: 0
            };
            return r ? .forEach(S => N[S.kind] = Number(S.balance)), ee("balances", t ? .id, N), N
        }
    }), o = n ? .active_account ? ? "demo", x = p ? .[o] ? ? 0, w = ue.find(r => r.key === c) ? .label ? ? "My account", {
        isFunded: M
    } = ne(), u = ["withdrawal", "transactions", "tournaments"], j = r => M && u.includes(r);
    return (0, e.jsxs)("div", {
        className: "p-4 md:p-6",
        children: [(0, e.jsxs)("div", {
            className: "mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
            children: [(0, e.jsx)("div", {
                className: "hidden flex-wrap items-center gap-1 rounded-lg bg-panel-2 p-1 ring-1 ring-border/60 md:flex",
                children: ue.map(r => (0, e.jsxs)("button", {
                    type: "button",
                    onClick: () => _(r.key),
                    className: `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${r.key===c?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-panel hover:text-foreground"}`,
                    children: [r.label, j(r.key) && (0, e.jsx)(je, {})]
                }, r.key))
            }), (0, e.jsxs)("div", {
                ref: k,
                className: "relative w-full md:hidden",
                children: [(0, e.jsxs)("button", {
                    type: "button",
                    onClick: () => i(r => !r),
                    "aria-haspopup": "listbox",
                    "aria-expanded": l,
                    className: "flex w-full items-center justify-between rounded-lg bg-panel-2 px-4 py-3.5 text-left text-base font-semibold text-foreground shadow-sm ring-1 ring-border/60 transition-colors hover:bg-panel",
                    children: [(0, e.jsx)("span", {
                        className: "truncate",
                        children: w
                    }), (0, e.jsx)(Te, {
                        className: `h-5 w-5 shrink-0 text-muted-foreground transition-transform ${l?"rotate-180":""}`
                    })]
                }), l && (0, e.jsx)("div", {
                    role: "listbox",
                    className: "absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg bg-panel-2 shadow-xl ring-1 ring-border/60",
                    children: ue.map((r, N) => {
                        const S = r.key === c;
                        return (0, e.jsx)("button", {
                            role: "option",
                            "aria-selected": S,
                            onClick: () => {
                                _(r.key), i(!1)
                            },
                            className: `flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-panel ${S?"text-primary":"text-foreground"} ${N>0?"border-t border-border/60":""}`,
                            children: (0, e.jsxs)("span", {
                                className: "flex items-center gap-2",
                                children: [r.label, j(r.key) && (0, e.jsx)(je, {})]
                            })
                        }, r.key)
                    })
                })]
            }), (0, e.jsxs)("div", {
                className: "hidden flex-wrap items-center gap-6 text-right md:flex",
                children: [(0, e.jsxs)("div", {
                    children: [(0, e.jsx)("div", {
                        className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                        children: "My current currency"
                    }), (0, e.jsx)("div", {
                        className: "mt-0.5 flex items-center justify-end gap-2",
                        children: (0, e.jsx)("span", {
                            className: "font-bold",
                            children: "$ USD"
                        })
                    })]
                }), (0, e.jsxs)("div", {
                    children: [(0, e.jsx)("div", {
                        className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                        children: "Available for withdrawal"
                    }), (0, e.jsxs)("div", {
                        className: "font-mono font-bold",
                        children: ["$", (p ? .live ? ? 0).toFixed(2)]
                    })]
                }), (0, e.jsxs)("div", {
                    children: [(0, e.jsxs)("div", {
                        className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                        children: ["In the account (", o, ")"]
                    }), (0, e.jsxs)("div", {
                        className: "font-mono font-bold",
                        children: ["$", x.toFixed(2)]
                    })]
                })]
            })]
        }), c === "my_account" && (0, e.jsx)(ot, {
            profile: n,
            userId: t ? .id,
            userEmail: t ? .email,
            emailVerified: y
        }), c === "withdrawal" && (j("withdrawal") ? (0, e.jsx)(ce, {
            title: "Withdrawals are locked"
        }) : (0, e.jsx)(ut, {
            live: p ? .live ? ? 0,
            userId: t ? .id,
            emailVerified: y,
            kycVerified: n ? .kyc_status === "verified"
        })), c === "transactions" && (j("transactions") ? (0, e.jsx)(ce, {
            title: "Transactions are locked"
        }) : (0, e.jsx)(gt, {
            userId: t ? .id
        })), c === "trades" && (0, e.jsx)(yt, {
            userId: t ? .id
        }), c === "tournaments" && (j("tournaments") ? (0, e.jsx)(ce, {
            title: "Tournaments are locked"
        }) : (0, e.jsx)(jt, {})), c === "analytics" && (0, e.jsx)(wt, {
            userId: t ? .id
        })]
    })
}

function ot({
    profile: t,
    userId: a,
    userEmail: m,
    emailVerified: d = !1
}) {
    const g = J(),
        {
            isFunded: c
        } = ne(),
        s = c,
        [l, i] = (0, f.useState)({
            nickname: "",
            first_name: "",
            last_name: "",
            date_of_birth: "",
            country: "",
            address: ""
        }),
        [k, h] = (0, f.useState)(!1),
        [b, y] = (0, f.useState)(!1),
        _ = t ? .avatar_url ? ? null;
    (0, f.useEffect)(() => {
        t && i({
            nickname: t.nickname ? ? "",
            first_name: t.first_name ? ? "",
            last_name: t.last_name ? ? "",
            date_of_birth: t.date_of_birth ? ? "",
            country: t.country ? ? "",
            address: t.address ? ? ""
        })
    }, [t]);
    const {
        data: n = null
    } = U({
        queryKey: ["avatar-signed-url", _],
        enabled: !!_,
        staleTime: 50 * 6e4,
        gcTime: 60 * 6e4,
        placeholderData: () => {
            const v = pe("avatar-url", a);
            return v && v.path === _ && v.exp > Date.now() ? v.url : void 0
        },
        queryFn: async () => {
            if (!_) return null;
            const {
                data: v
            } = await F.storage.from("avatars").createSignedUrl(_, 3600), q = v ? .signedUrl ? ? null;
            if (q && typeof window < "u") {
                const le = new Image;
                le.src = q, ee("avatar-url", a, {
                    path: _,
                    url: q,
                    exp: Date.now() + 55 * 6e4
                })
            }
            return q
        }
    }), p = async v => {
        if (a) {
            if (s) {
                C.error("This is a Funded account — profile editing is locked");
                return
            }
            if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(v.type)) {
                C.error("Only JPG, PNG, or WEBP images are allowed");
                return
            }
            if (v.size > 5 * 1024 * 1024) {
                C.error("Image must be under 5MB");
                return
            }
            y(!0);
            try {
                const q = await mt(v, 512),
                    le = v.type === "image/png" ? "png" : v.type === "image/webp" ? "webp" : "jpg",
                    z = `${a}/avatar-${Date.now()}.${le}`,
                    {
                        error: be
                    } = await F.storage.from("avatars").upload(z, q, {
                        contentType: q.type,
                        upsert: !0
                    });
                if (be) throw be;
                const {
                    error: ge
                } = await F.from("profiles").update({
                    avatar_url: z
                }).eq("id", a);
                if (ge) throw ge;
                const {
                    data: qe
                } = await F.storage.from("avatars").createSignedUrl(z, 3600), oe = qe ? .signedUrl ? ? null;
                oe && (g.setQueryData(["avatar-signed-url", z], oe), ee("avatar-url", a, {
                    path: z,
                    url: oe,
                    exp: Date.now() + 55 * 6e4
                })), C.success("Profile photo updated"), g.invalidateQueries({
                    queryKey: ["profile-full", a]
                }), g.invalidateQueries({
                    queryKey: ["profile", a]
                }), g.invalidateQueries({
                    queryKey: ["leaderboard-top"]
                })
            } catch (q) {
                C.error(q.message ? ? "Upload failed")
            } finally {
                y(!1)
            }
        }
    }, o = !!t ? .first_name, x = !!t ? .last_name, w = !!t ? .date_of_birth, M = !!t ? .country, u = !!t ? .address, j = o && x && w && M && u, r = async () => {
        if (!a) return;
        if (s) {
            C.error("This is a Funded account — profile editing is locked");
            return
        }
        h(!0);
        const v = {
            nickname: l.nickname || null
        };
        o || (v.first_name = l.first_name || null), x || (v.last_name = l.last_name || null), w || (v.date_of_birth = l.date_of_birth || null), M || (v.country = l.country || null), u || (v.address = l.address || null);
        const {
            error: q
        } = await F.from("profiles").update(v).eq("id", a);
        h(!1), q ? C.error(q.message) : (C.success("Profile saved"), g.invalidateQueries({
            queryKey: ["profile-full", a]
        }), g.invalidateQueries({
            queryKey: ["profile", a]
        }))
    }, [N, S] = (0, f.useState)(!1), [E, D] = (0, f.useState)(""), [T, R] = (0, f.useState)(!1), [A, B] = (0, f.useState)(!1), H = I(tt), Q = I(et), re = async () => {
        if (m) {
            R(!0);
            try {
                await H({
                    data: {
                        email: m
                    }
                }), S(!0), C.success("We sent a 6-digit code to your email")
            } catch (v) {
                C.error(v instanceof Error ? v.message : "Could not send code")
            } finally {
                R(!1)
            }
        }
    }, ie = async () => {
        if (!(!m || !a || E.length !== 6)) {
            B(!0);
            try {
                await Q({
                    data: {
                        email: m,
                        userId: a,
                        code: E
                    }
                });
                const {
                    data: v,
                    error: q
                } = await F.auth.refreshSession();
                if (q || !v.user ? .user_metadata ? .email_verified_at) throw new Error("Email was verified, but your session could not refresh. Please sign in again.");
                D(""), S(!1), C.success("Email verified"), await g.invalidateQueries({
                    queryKey: ["profile-full", a]
                })
            } catch (v) {
                C.error(v instanceof Error ? v.message : "Invalid code")
            } finally {
                B(!1)
            }
        }
    }, $ = t ? .kyc_status === "verified", P = !t, V = d && $, fe = (0, f.useMemo)(() => ze(a, void 0, m), [a, m]);
    return (0, e.jsxs)("div", {
        className: "grid gap-5 lg:grid-cols-[1fr_1fr]",
        children: [(0, e.jsxs)("div", {
            className: "panel p-5",
            children: [(0, e.jsx)("h2", {
                className: "mb-4 text-lg font-bold",
                children: "Personal data:"
            }), (0, e.jsxs)("div", {
                className: "mb-5 flex items-center gap-4",
                children: [(0, e.jsxs)("div", {
                    className: "relative",
                    children: [(0, e.jsx)("div", {
                        className: "flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-panel-2 text-2xl",
                        children: n ? (0, e.jsx)("img", {
                            src: n,
                            alt: "Avatar",
                            className: "h-full w-full object-cover"
                        }) : (l.first_name ? .[0] || m ? .[0] || "?").toUpperCase()
                    }), (0, e.jsxs)("label", {
                        className: `absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full ${s?"cursor-not-allowed bg-muted text-muted-foreground":"cursor-pointer bg-primary text-primary-foreground"}`,
                        "aria-label": s ? "Locked" : "Change avatar",
                        children: [s ? (0, e.jsx)(X, {
                            className: "h-3 w-3"
                        }) : (0, e.jsx)(Pe, {
                            className: "h-3 w-3"
                        }), (0, e.jsx)("input", {
                            type: "file",
                            accept: "image/jpeg,image/jpg,image/png,image/webp",
                            className: "hidden",
                            disabled: b || s,
                            onChange: v => {
                                const q = v.target.files ? .[0];
                                v.target.value = "", q && p(q)
                            }
                        })]
                    })]
                }), (0, e.jsxs)("div", {
                    className: "min-w-0 flex-1",
                    children: [(0, e.jsx)("div", {
                        className: "truncate text-sm font-semibold",
                        children: m ? ? "—"
                    }), (0, e.jsxs)("div", {
                        className: "text-xs text-muted-foreground",
                        children: ["ID: ", fe]
                    }), (0, e.jsxs)("div", {
                        className: "mt-1",
                        children: [(0, e.jsx)("span", {
                            className: `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${P?"animate-pulse bg-muted text-muted-foreground":V?"bg-bull/15 text-bull":"bg-bear/15 text-bear"}`,
                            children: P ? "Checking…" : V ? "Verified" : "✕ Not verified"
                        }), b && (0, e.jsx)("span", {
                            className: "ml-2 text-[10px] text-muted-foreground",
                            children: "Uploading…"
                        })]
                    })]
                })]
            }), s && (0, e.jsxs)("div", {
                className: "mb-4 flex items-start gap-3 rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3",
                children: [(0, e.jsx)(X, {
                    className: "mt-0.5 h-4 w-4 shrink-0 text-yellow-500"
                }), (0, e.jsx)("p", {
                    className: "text-xs leading-relaxed",
                    children: "This is a Funded trading account. Profile details and documents are managed by OK Broker, so editing is locked here."
                })]
            }), (0, e.jsxs)("div", {
                className: "space-y-3",
                children: [(0, e.jsx)(W, {
                    label: "Nickname",
                    children: (0, e.jsx)(L, {
                        value: l.nickname,
                        disabled: s,
                        onChange: v => i({ ...l,
                            nickname: v.target.value
                        }),
                        placeholder: `#${fe}`
                    })
                }), (0, e.jsx)(W, {
                    label: "First Name",
                    children: (0, e.jsx)(L, {
                        value: l.first_name,
                        disabled: s || o,
                        onChange: v => i({ ...l,
                            first_name: v.target.value
                        }),
                        placeholder: "Empty"
                    })
                }), (0, e.jsx)(W, {
                    label: "Last Name",
                    children: (0, e.jsx)(L, {
                        value: l.last_name,
                        disabled: s || x,
                        onChange: v => i({ ...l,
                            last_name: v.target.value
                        }),
                        placeholder: "Empty"
                    })
                }), (0, e.jsx)(W, {
                    label: "Date of birth",
                    children: (0, e.jsx)(L, {
                        type: "date",
                        disabled: s || w,
                        value: l.date_of_birth,
                        onChange: v => i({ ...l,
                            date_of_birth: v.target.value
                        })
                    })
                }), (0, e.jsxs)(W, {
                    label: "Email",
                    right: (0, e.jsx)("div", {
                        className: "flex items-center gap-2",
                        children: d ? (0, e.jsx)("span", {
                            className: "text-[10px] font-bold uppercase text-bull",
                            children: "Verified"
                        }) : (0, e.jsxs)(e.Fragment, {
                            children: [(0, e.jsx)("span", {
                                className: "text-[10px] text-bear",
                                children: "Unverified"
                            }), (0, e.jsx)("button", {
                                type: "button",
                                onClick: re,
                                disabled: T,
                                className: "rounded bg-panel-2 px-2 py-0.5 text-[10px] font-bold uppercase text-foreground hover:bg-accent disabled:opacity-60",
                                children: T ? "Sending…" : N ? "Resend code" : "Verify email"
                            })]
                        })
                    }),
                    children: [(0, e.jsx)(L, {
                        value: m ? ? "",
                        readOnly: !0,
                        disabled: !0
                    }), !d && N && (0, e.jsxs)("div", {
                        className: "mt-2 flex items-center gap-2",
                        children: [(0, e.jsx)(L, {
                            value: E,
                            onChange: v => D(v.target.value.replace(/\D/g, "").slice(0, 6)),
                            placeholder: "6-digit code",
                            inputMode: "numeric",
                            className: "font-mono tracking-widest"
                        }), (0, e.jsx)(O, {
                            type: "button",
                            size: "sm",
                            onClick: ie,
                            disabled: A || E.length !== 6,
                            children: A ? "Verifying…" : "Confirm"
                        })]
                    })]
                }), (0, e.jsx)(W, {
                    label: "Country",
                    children: (0, e.jsx)(We, {
                        value: l.country,
                        onChange: v => i({ ...l,
                            country: v
                        }),
                        disabled: s || M
                    })
                }), (0, e.jsx)(W, {
                    label: "Address",
                    children: (0, e.jsx)(L, {
                        value: l.address,
                        disabled: s || u,
                        onChange: v => i({ ...l,
                            address: v.target.value
                        }),
                        placeholder: "Empty"
                    })
                })]
            }), !s && !j && (0, e.jsx)("p", {
                className: "mt-3 text-[11px] leading-relaxed text-muted-foreground",
                children: "Your name, date of birth, country and address are saved permanently and cannot be changed afterwards. If they differ from your ID card, verification will simply update them from your document automatically."
            }), (0, e.jsx)(O, {
                className: "mt-5 w-full",
                onClick: r,
                disabled: k || s,
                children: s ? "Locked — Funded account" : k ? "Saving…" : "Save changes"
            })]
        }), (0, e.jsxs)("div", {
            className: "panel p-5",
            children: [(0, e.jsx)("h2", {
                className: "mb-4 text-lg font-bold",
                children: "Documents verification:"
            }), (0, e.jsx)(ct, {
                userId: a,
                profile: t,
                locked: s,
                onChanged: () => g.invalidateQueries({
                    queryKey: ["profile-full", a]
                })
            })]
        }), !s && (0, e.jsx)(dt, {})]
    })
}

function dt() {
    const t = De(),
        a = I(it),
        m = I(lt),
        [d, g] = (0, f.useState)(!1),
        [c, s] = (0, f.useState)("confirm"),
        [l, i] = (0, f.useState)(!1),
        [k, h] = (0, f.useState)(!1),
        [b, y] = (0, f.useState)(""),
        [_, n] = (0, f.useState)(null),
        p = () => {
            s("confirm"), y(""), g(!0)
        },
        o = async () => {
            i(!0);
            try {
                n((await a({
                    data: void 0
                })) ? .email ? ? null), s("code"), C.success("Confirmation code sent to your email")
            } catch (w) {
                C.error(w ? .message ? ? "Could not send confirmation code")
            } finally {
                i(!1)
            }
        },
        x = async () => {
            if (!/^\d{6}$/.test(b)) {
                C.error("Enter the 6-digit code from your email");
                return
            }
            h(!0);
            try {
                await m({
                    data: {
                        code: b
                    }
                }), C.success("Your account has been deleted permanently");
                try {
                    await F.auth.signOut()
                } catch {}
                t({
                    to: "/"
                })
            } catch (w) {
                C.error(w ? .message ? ? "Could not delete the account")
            } finally {
                h(!1)
            }
        };
    return (0, e.jsxs)("div", {
        className: "panel p-5",
        children: [(0, e.jsx)("div", {
            className: "border-t border-dashed border-border pb-4"
        }), (0, e.jsxs)("button", {
            onClick: p,
            className: "flex items-center gap-3 text-base font-bold text-destructive transition-opacity hover:opacity-80",
            children: [(0, e.jsx)(Oe, {
                className: "h-5 w-5"
            }), "Delete My account"]
        }), (0, e.jsx)("p", {
            className: "mt-3 text-[11px] leading-relaxed text-muted-foreground",
            children: "Deleting your trading account removes your profile, balances, trades and personal data permanently. We email you a confirmation code before anything is deleted."
        }), (0, e.jsx)(Ke, {
            open: d,
            onOpenChange: g,
            children: (0, e.jsxs)(He, {
                className: "max-w-md",
                children: [(0, e.jsx)(Be, {
                    children: (0, e.jsx)(Ie, {
                        className: "text-xl font-bold",
                        children: "Deletion of My Account and Personal Data"
                    })
                }), (0, e.jsx)("div", {
                    className: "border-t border-border"
                }), c === "confirm" ? (0, e.jsxs)("div", {
                    className: "space-y-4",
                    children: [(0, e.jsx)("p", {
                        className: "text-sm leading-relaxed text-muted-foreground",
                        children: "By deleting your account and personal data, you will lose access to your account on the Okay Broker platform permanently. Remember that your data will be deleted irretrievably and it is impossible to restore your account later!"
                    }), (0, e.jsx)("p", {
                        className: "text-sm leading-relaxed text-muted-foreground",
                        children: "NOTE: Please complete all open trades and pending orders before you delete your account."
                    }), (0, e.jsx)("div", {
                        className: "border-t border-border"
                    }), (0, e.jsx)(O, {
                        className: "h-11 w-full bg-destructive text-sm font-bold text-destructive-foreground hover:bg-destructive/90",
                        onClick: o,
                        disabled: l,
                        children: l ? "Sending code…" : "Request Deletion"
                    })]
                }) : (0, e.jsxs)("div", {
                    className: "space-y-4",
                    children: [(0, e.jsxs)("p", {
                        className: "text-sm leading-relaxed text-muted-foreground",
                        children: ["We sent a 6-digit confirmation code to", " ", (0, e.jsx)("span", {
                            className: "font-medium text-foreground",
                            children: _ ? ? "your email"
                        }), ". Enter it below to permanently delete your account."]
                    }), (0, e.jsx)(L, {
                        value: b,
                        onChange: w => y(w.target.value.replace(/\D/g, "").slice(0, 6)),
                        inputMode: "numeric",
                        placeholder: "000000",
                        className: "text-center text-lg tracking-[0.5em]"
                    }), (0, e.jsx)(O, {
                        className: "h-11 w-full bg-destructive text-sm font-bold text-destructive-foreground hover:bg-destructive/90",
                        onClick: x,
                        disabled: k || b.length !== 6,
                        children: k ? "Deleting…" : "Delete my account permanently"
                    }), (0, e.jsx)("button", {
                        className: "w-full text-xs text-muted-foreground underline",
                        onClick: o,
                        disabled: l,
                        children: l ? "Sending…" : "Resend code"
                    })]
                })]
            })
        })]
    })
}

function W({
    label: t,
    children: a,
    right: m
}) {
    return (0, e.jsxs)("div", {
        className: "rounded-md border border-border bg-panel-2 px-3 py-2",
        children: [(0, e.jsxs)("div", {
            className: "flex items-center justify-between",
            children: [(0, e.jsx)(G, {
                className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                children: t
            }), m]
        }), (0, e.jsx)("div", {
            className: "mt-1 [&>input]:border-0 [&>input]:bg-transparent [&>input]:p-0 [&>input]:focus-visible:ring-0",
            children: a
        })]
    })
}

function ct({
    userId: t,
    profile: a,
    onChanged: m,
    locked: d = !1
}) {
    const g = a ? .kyc_status ? ? "not_verified",
        c = a ? .kyc_rejection_reason ? ? null,
        [s, l] = (0, f.useState)(!1);
    return d ? (0, e.jsxs)("div", {
        className: "flex items-start gap-3 rounded-md border border-yellow-500/40 bg-yellow-500/10 p-3",
        children: [(0, e.jsx)(X, {
            className: "mt-0.5 h-4 w-4 shrink-0 text-yellow-500"
        }), (0, e.jsx)("p", {
            className: "text-xs leading-relaxed",
            children: "Document verification is locked for Funded trading accounts. Your identity is verified on your main Funded dashboard account."
        })]
    }) : a ? .first_name && a ? .last_name && a ? .date_of_birth && a ? .country ? !s && g !== "verified" ? (0, e.jsxs)("div", {
        className: "rounded-xl border border-primary/40 bg-panel-2 p-4",
        children: [(0, e.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [(0, e.jsx)("span", {
                className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground",
                children: (0, e.jsx)(Re, {
                    className: "h-5 w-5"
                })
            }), (0, e.jsx)("h3", {
                className: "text-base font-bold",
                children: "Verification of documents"
            })]
        }), (0, e.jsx)("div", {
            className: "my-3 border-t border-dashed border-border"
        }), (0, e.jsx)("p", {
            className: "text-sm leading-relaxed text-muted-foreground",
            children: "Please upload a colour photo or scanned image of your National Identity card (CNIC) — original card only, front and back."
        }), (0, e.jsx)(O, {
            className: "mt-4 h-11 w-full text-sm font-bold",
            onClick: () => l(!0),
            children: "Upload Documents"
        }), (0, e.jsx)("p", {
            className: "mt-3 text-[11px] leading-relaxed text-muted-foreground",
            children: "Account verification means the provision of an official document certifying the client's identity. This procedure can be initiated by the company's security department at any time."
        })]
    }) : (0, e.jsx)(Le, {
        userId: t,
        status: g,
        reason: c,
        source: "trading",
        onChanged: m
    }) : (0, e.jsxs)("div", {
        className: "flex items-start gap-3 rounded-md border border-border bg-panel-2 p-3",
        children: [(0, e.jsx)(X, {
            className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
        }), (0, e.jsx)("p", {
            className: "text-xs leading-relaxed text-muted-foreground",
            children: "Please fill in your personal details above — first name, last name, date of birth and country — and save them first. Document verification unlocks after that, and your ID card must match those details."
        })]
    })
}
async function mt(t, a) {
    const m = URL.createObjectURL(t);
    try {
        const d = await new Promise((h, b) => {
                const y = new Image;
                y.onload = () => h(y), y.onerror = b, y.src = m
            }),
            g = Math.min(d.width, d.height),
            c = (d.width - g) / 2,
            s = (d.height - g) / 2,
            l = document.createElement("canvas");
        l.width = a, l.height = a;
        const i = l.getContext("2d");
        i.imageSmoothingEnabled = !0, i.imageSmoothingQuality = "high", i.drawImage(d, c, s, g, g, 0, 0, a, a);
        const k = t.type === "image/png" ? "image/png" : t.type === "image/webp" ? "image/webp" : "image/jpeg";
        return await new Promise((h, b) => l.toBlob(y => y ? h(y) : b(new Error("Canvas error")), k, .9))
    } finally {
        URL.revokeObjectURL(m)
    }
}

function ut({
    live: t,
    userId: a,
    emailVerified: m = !1,
    kycVerified: d = !1
}) {
    const g = J(),
        {
            isFunded: c
        } = ne(),
        [s, l] = (0, f.useState)(""),
        [i, k] = (0, f.useState)(""),
        [h, b] = (0, f.useState)(""),
        [y, _] = (0, f.useState)(!1),
        [n, p] = (0, f.useState)(!1),
        [o, x] = (0, f.useState)(!1),
        [w, M] = (0, f.useState)(""),
        [u, j] = (0, f.useState)(""),
        [r, N] = (0, f.useState)(!1),
        S = m && d,
        E = I(at),
        D = I(st),
        {
            data: T = [],
            isLoading: R
        } = U({
            queryKey: ["my-deposit-methods", a],
            enabled: !!a,
            staleTime: 3e4,
            queryFn: async () => {
                const {
                    data: $,
                    error: P
                } = await F.rpc("get_my_deposit_methods");
                if (P) throw P;
                return ($ ? ? []).map(V => V.method).filter(Boolean)
            }
        });
    (0, f.useEffect)(() => {
        T.length && !T.includes(i) && k(T[0])
    }, [T, i]);
    const A = Me(i),
        B = me(i, h).ok,
        H = async () => {
            if (c) return C.error("This is a Funded Trading Account. Withdrawals are not available for funded accounts.");
            if (!S) return C.error("Please complete Email and ID (CNIC) verification before withdrawing.");
            if (!a) return;
            const $ = Number(s);
            if (!$ || $ <= 0) return C.error("Enter a valid amount");
            if ($ < 10) return C.error("Minimum withdrawal is $10");
            if ($ > t) return C.error("Amount exceeds live balance");
            const P = me(i, h);
            if (!P.ok) return C.error(P.error);
            if (T.length === 0) return C.error("You can only withdraw using the method you deposited with. No completed deposit found yet.");
            if (!i || !T.includes(i)) return C.error(`You can only withdraw via ${T.join(", ")} — the method you deposited with.`);
            _(!0);
            try {
                M((await E({
                    data: {
                        amount: $,
                        method: i
                    }
                })) ? .email ? ? ""), j(""), x(!0), C.success("Verification code sent to your email")
            } catch (V) {
                C.error(V ? .message ? ? "Could not send verification code")
            } finally {
                _(!1)
            }
        },
        Q = async () => {
            const $ = Number(s);
            N(!0);
            try {
                M((await E({
                    data: {
                        amount: $,
                        method: i
                    }
                })) ? .email ? ? w), C.success("New code sent")
            } catch (P) {
                C.error(P ? .message ? ? "Could not resend code")
            } finally {
                N(!1)
            }
        },
        re = async () => {
            if (!/^\d{6}$/.test(u)) return C.error("Enter the 6-digit code from your email");
            const $ = me(i, h);
            if (!$.ok) return C.error($.error);
            _(!0);
            try {
                await D({
                    data: {
                        amount: Number(s),
                        method: i,
                        destination: $.value,
                        code: u
                    }
                }), C.success("Withdrawal request submitted"), l(""), b(""), j(""), x(!1), p(!1), g.invalidateQueries({
                    queryKey: ["withdrawals", a]
                }), g.invalidateQueries({
                    queryKey: ["account"]
                })
            } catch (P) {
                C.error(P ? .message ? ? "Could not submit withdrawal")
            } finally {
                _(!1)
            }
        },
        ie = t > 0;
    return (0, e.jsxs)("div", {
        className: "space-y-6",
        children: [(0, e.jsxs)("div", {
            className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
            children: [(0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h2", {
                    className: "mb-5 text-lg font-semibold",
                    children: "Account:"
                }), (0, e.jsxs)("div", {
                    className: "space-y-5",
                    children: [(0, e.jsxs)("div", {
                        children: [(0, e.jsx)("div", {
                            className: "text-xs text-muted-foreground",
                            children: "In the account:"
                        }), (0, e.jsxs)("div", {
                            className: "mt-1 font-mono text-2xl font-bold",
                            children: ["$", t.toFixed(2)]
                        })]
                    }), (0, e.jsx)("div", {
                        className: "h-px bg-border"
                    }), (0, e.jsxs)("div", {
                        children: [(0, e.jsx)("div", {
                            className: "text-xs text-muted-foreground",
                            children: "Available for withdrawal:"
                        }), (0, e.jsxs)("div", {
                            className: "mt-1 font-mono text-2xl font-bold",
                            children: ["$", t.toFixed(2)]
                        })]
                    })]
                })]
            }), (0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h2", {
                    className: "mb-4 text-lg font-semibold",
                    children: "Withdrawal:"
                }), c ? (0, e.jsx)("div", {
                    className: "rounded-md border border-amber-500/40 bg-amber-500/10 p-4",
                    children: (0, e.jsxs)("div", {
                        className: "flex gap-3",
                        children: [(0, e.jsx)(de, {
                            className: "mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                        }), (0, e.jsx)("div", {
                            className: "text-sm leading-relaxed",
                            children: "This is a Funded Trading Account. Withdrawals are not available for funded accounts."
                        })]
                    })
                }) : !S || !ie ? (0, e.jsxs)("div", {
                    className: "space-y-3",
                    children: [!S && (0, e.jsx)("div", {
                        className: "rounded-lg border border-amber-500/30 bg-amber-500/[0.07] p-4",
                        children: (0, e.jsxs)("div", {
                            className: "flex gap-3",
                            children: [(0, e.jsx)("span", {
                                className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-500/15",
                                children: (0, e.jsx)(de, {
                                    className: "h-4 w-4 text-amber-400"
                                })
                            }), (0, e.jsxs)("div", {
                                className: "min-w-0 flex-1 space-y-2.5",
                                children: [(0, e.jsx)("div", {
                                    className: "text-sm font-semibold",
                                    children: "Verification required"
                                }), (0, e.jsx)("p", {
                                    className: "text-[13px] leading-relaxed text-muted-foreground",
                                    children: "For your security, withdrawals unlock once your email and identity (CNIC) are verified."
                                }), (0, e.jsxs)("div", {
                                    className: "grid gap-2 sm:grid-cols-2",
                                    children: [(0, e.jsx)($e, {
                                        label: "Email verification",
                                        done: m
                                    }), (0, e.jsx)($e, {
                                        label: "ID (CNIC) verification",
                                        done: d
                                    })]
                                }), (0, e.jsx)(he, {
                                    to: "/wallet",
                                    search: {
                                        tab: "my_account"
                                    },
                                    className: "inline-flex items-center gap-1 text-[13px] font-semibold text-bull hover:underline",
                                    children: "Complete verification →"
                                })]
                            })]
                        })
                    }), (0, e.jsx)("div", {
                        className: "rounded-lg border border-border bg-panel-2/60 p-4",
                        children: (0, e.jsxs)("div", {
                            className: "flex gap-3",
                            children: [(0, e.jsx)("span", {
                                className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bear/15",
                                children: (0, e.jsx)(de, {
                                    className: "h-4 w-4 text-bear"
                                })
                            }), (0, e.jsxs)("div", {
                                className: "min-w-0 flex-1 space-y-2.5",
                                children: [(0, e.jsx)("div", {
                                    className: "text-sm font-semibold",
                                    children: "Withdrawals"
                                }), (0, e.jsx)("p", {
                                    className: "text-[13px] leading-relaxed text-muted-foreground",
                                    children: "You can withdraw funds to the same card or electronic wallet you used for depositing. Requests can be placed any time and are processed within 3 business days."
                                }), (0, e.jsx)("button", {
                                    onClick: () => {
                                        window.dispatchEvent(new CustomEvent("open-deposit-modal"))
                                    },
                                    className: "text-[13px] font-semibold text-bull hover:underline",
                                    children: "Make a deposit →"
                                })]
                            })]
                        })
                    })]
                }) : n ? o ? (0, e.jsxs)("div", {
                    className: "space-y-3",
                    children: [(0, e.jsxs)("div", {
                        className: "rounded-lg border border-border bg-panel-2/60 p-4",
                        children: [(0, e.jsx)("div", {
                            className: "text-sm font-semibold",
                            children: "Email verification"
                        }), (0, e.jsxs)("p", {
                            className: "mt-1 text-[13px] leading-relaxed text-muted-foreground",
                            children: ["We sent a 6-digit code to ", w || "your email", ". Enter it below to confirm your withdrawal of $", Number(s || 0).toFixed(2), " via ", i, "."]
                        })]
                    }), (0, e.jsxs)("div", {
                        children: [(0, e.jsx)(G, {
                            className: "text-xs",
                            children: "Verification code"
                        }), (0, e.jsx)(L, {
                            inputMode: "numeric",
                            autoFocus: !0,
                            maxLength: 6,
                            value: u,
                            onChange: $ => j($.target.value.replace(/\D/g, "").slice(0, 6)),
                            placeholder: "000000",
                            className: "text-center font-mono text-lg tracking-[0.4em]"
                        })]
                    }), (0, e.jsxs)("div", {
                        className: "flex gap-2",
                        children: [(0, e.jsx)(O, {
                            onClick: re,
                            disabled: y || u.length !== 6,
                            className: "flex-1",
                            children: y ? "Verifying…" : "Verify & submit"
                        }), (0, e.jsx)(O, {
                            variant: "outline",
                            onClick: () => x(!1),
                            disabled: y,
                            children: "Back"
                        })]
                    }), (0, e.jsx)("button", {
                        onClick: Q,
                        disabled: r,
                        className: "text-[13px] font-semibold text-bull hover:underline disabled:opacity-60",
                        children: r ? "Sending…" : "Resend code"
                    })]
                }) : (0, e.jsxs)("div", {
                    className: "space-y-3",
                    children: [(0, e.jsxs)("div", {
                        children: [(0, e.jsx)(G, {
                            className: "text-xs",
                            children: "Amount (USD)"
                        }), (0, e.jsx)(L, {
                            type: "number",
                            min: 10,
                            value: s,
                            onChange: $ => l($.target.value),
                            placeholder: "0.00"
                        })]
                    }), (0, e.jsxs)("div", {
                        children: [(0, e.jsx)(G, {
                            className: "text-xs",
                            children: "Method"
                        }), (0, e.jsx)("select", {
                            value: i,
                            onChange: $ => k($.target.value),
                            disabled: R || T.length === 0,
                            className: "mt-1 h-10 w-full rounded-md border border-border bg-panel-2 px-3 text-sm disabled:opacity-60",
                            children: R ? (0, e.jsx)("option", {
                                value: "",
                                children: "Loading…"
                            }) : T.length === 0 ? (0, e.jsx)("option", {
                                value: "",
                                children: "No deposit method found"
                            }) : T.map($ => (0, e.jsx)("option", {
                                value: $,
                                children: $
                            }, $))
                        }), (0, e.jsx)("p", {
                            className: "mt-1 text-[11px] text-muted-foreground",
                            children: T.length === 0 ? "Withdrawals are only available through the method you deposited with. Make a deposit first." : `You can withdraw only via ${T.join(", ")} — the method you deposited with.`
                        })]
                    }), (0, e.jsxs)("div", {
                        children: [(0, e.jsx)(G, {
                            className: "text-xs",
                            children: A.label
                        }), (0, e.jsx)(L, {
                            value: h,
                            onChange: $ => b($.target.value),
                            placeholder: A.placeholder,
                            spellCheck: !1,
                            autoComplete: "off",
                            inputMode: i.toLowerCase().includes("binance") ? "numeric" : "text",
                            className: h.trim() && !B ? "border-destructive focus-visible:ring-destructive" : void 0
                        }), (0, e.jsxs)("p", {
                            className: "mt-1 text-[11px] text-muted-foreground",
                            children: [A.hint, A.example ? ` Example: ${A.example}` : ""]
                        }), h.trim() && !B && (0, e.jsx)("p", {
                            className: "mt-1 text-[11px] font-medium text-destructive",
                            children: A.error
                        })]
                    }), (0, e.jsxs)("div", {
                        className: "flex gap-2",
                        children: [(0, e.jsx)(O, {
                            onClick: H,
                            disabled: y,
                            className: "flex-1",
                            children: y ? "Submitting…" : "Submit withdrawal"
                        }), (0, e.jsx)(O, {
                            variant: "outline",
                            onClick: () => p(!1),
                            children: "Cancel"
                        })]
                    })]
                }) : (0, e.jsxs)("div", {
                    className: "space-y-4",
                    children: [(0, e.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Request a withdrawal to your bank card or electronic purse used for depositing. Processed within 3 business days."
                    }), (0, e.jsx)(O, {
                        onClick: () => p(!0),
                        className: "w-full md:w-auto",
                        children: "Request withdrawal"
                    })]
                })]
            })]
        }), (0, e.jsxs)("div", {
            className: "panel p-5",
            children: [(0, e.jsxs)("div", {
                className: "mb-4 flex items-center justify-between",
                children: [(0, e.jsx)("h3", {
                    className: "font-semibold",
                    children: "Some of your latest requests:"
                }), (0, e.jsxs)(he, {
                    to: "/wallet",
                    search: {
                        tab: "transactions"
                    },
                    className: "flex items-center gap-1 text-sm font-medium text-primary hover:underline",
                    children: ["All financial history", (0, e.jsx)("span", {
                        className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
                        children: "›"
                    })]
                })]
            }), (0, e.jsx)(pt, {
                userId: a
            })]
        }), (0, e.jsxs)("div", {
            className: "panel p-5",
            children: [(0, e.jsxs)("div", {
                className: "mb-4 flex items-center justify-between",
                children: [(0, e.jsx)("h3", {
                    className: "font-semibold",
                    children: "FAQ:"
                }), (0, e.jsxs)("a", {
                    href: "#",
                    className: "flex items-center gap-1 text-sm font-medium text-primary hover:underline",
                    children: ["Check out full FAQ", (0, e.jsx)("span", {
                        className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
                        children: "›"
                    })]
                })]
            }), (0, e.jsx)("div", {
                className: "grid gap-x-8 gap-y-2 md:grid-cols-2",
                children: xt.map(($, P) => (0, e.jsx)(ht, {
                    q: $.q,
                    a: $.a
                }, P))
            })]
        }), (0, e.jsx)("div", {
            className: "panel p-5",
            children: (0, e.jsxs)("div", {
                className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
                children: [(0, e.jsxs)("div", {
                    className: "space-y-2 text-sm",
                    children: [(0, e.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0, e.jsx)("span", {
                            className: "text-bull",
                            children: "🏦"
                        }), (0, e.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Minimum deposit amount:"
                        }), (0, e.jsx)("span", {
                            className: "font-semibold text-bull",
                            children: "$10"
                        })]
                    }), (0, e.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0, e.jsx)("span", {
                            className: "text-bull",
                            children: "💳"
                        }), (0, e.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Minimum withdrawal amount:"
                        }), (0, e.jsx)("span", {
                            className: "font-semibold text-bull",
                            children: "$10"
                        })]
                    }), (0, e.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0, e.jsx)("span", {
                            className: "text-bull",
                            children: "»"
                        }), (0, e.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Quick withdrawal from your account"
                        })]
                    }), (0, e.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0, e.jsx)("span", {
                            className: "text-bull",
                            children: "%"
                        }), (0, e.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "First 2 withdrawals in 24 hours are commission-free; then a 3% fee applies"
                        })]
                    })]
                }), (0, e.jsx)("div", {
                    className: "flex flex-wrap items-stretch justify-center gap-2",
                    children: [{
                        label: "VISA",
                        sub: "Verified by"
                    }, {
                        label: "SECURE",
                        sub: "Payment"
                    }, {
                        label: "MasterCard",
                        sub: "SecureCode"
                    }, {
                        label: "3D Secure",
                        sub: "Safer online"
                    }, {
                        label: "SSL",
                        sub: "Secure Encryption"
                    }].map($ => (0, e.jsxs)("div", {
                        className: "flex min-w-[92px] flex-col items-center justify-center rounded-lg border border-border bg-panel-2 px-3 py-2 text-center shadow-sm",
                        children: [(0, e.jsx)("div", {
                            className: "text-[9px] uppercase tracking-wide text-muted-foreground",
                            children: $.sub
                        }), (0, e.jsx)("div", {
                            className: "mt-0.5 text-xs font-bold tracking-tight",
                            children: $.label
                        })]
                    }, $.label))
                })]
            })
        })]
    })
}
var xt = [{
    q: "How to withdraw money from the account?",
    a: "Go to the Withdrawal tab, click Request withdrawal, choose a method, enter the amount and destination, then confirm."
}, {
    q: "What is account verification?",
    a: "Account verification confirms your identity to protect your funds and comply with regulations."
}, {
    q: "How long does it take to withdraw funds?",
    a: "Withdrawal requests are processed within 3 business days after approval."
}, {
    q: "How to understand that I need to go through account verification?",
    a: "You will receive a notification in your account if verification is required before withdrawal."
}, {
    q: "What is the minimum withdrawal amount?",
    a: "The minimum withdrawal amount is $10."
}, {
    q: "How long does the verification process take?",
    a: "Verification usually takes up to 24 hours after submitting all required documents."
}, {
    q: "Is there any fee for depositing or withdrawing funds from the account?",
    a: "The first 2 withdrawals within 24 hours are commission-free. After that, a 3% fee applies. Deposits are free."
}, {
    q: "How do I know that I successfully passed verification?",
    a: "You will receive a confirmation message and your account status will be updated to Verified."
}, {
    q: "Do I need to provide any documents to make a withdrawal?",
    a: "Yes, a government-issued ID and proof of address may be required depending on the amount."
}];

function ht({
    q: t,
    a
}) {
    const [m, d] = (0, f.useState)(!1);
    return (0, e.jsxs)("div", {
        className: "border-b border-border/60 py-2",
        children: [(0, e.jsxs)("button", {
            onClick: () => d(g => !g),
            className: "flex w-full items-start gap-2 text-left text-sm font-medium hover:text-primary",
            children: [(0, e.jsx)("span", {
                className: `mt-0.5 inline-block transition-transform ${m?"rotate-180":""}`,
                children: "⌄"
            }), (0, e.jsx)("span", {
                children: t
            })]
        }), m && (0, e.jsx)("p", {
            className: "mt-2 pl-5 text-xs leading-relaxed text-muted-foreground",
            children: a
        })]
    })
}

function pt({
    userId: t
}) {
    const a = J(),
        [m, d] = (0, f.useState)(null),
        {
            data: g = []
        } = U({
            queryKey: ["withdrawals", t],
            enabled: !!t,
            queryFn: async () => {
                const {
                    data: h
                } = await F.from("withdrawals").select("*").eq("user_id", t).order("created_at", {
                    ascending: !1
                }).limit(10);
                return h ? ? []
            }
        }),
        c = g;
    if (!c.length) return (0, e.jsx)("div", {
        className: "py-10 text-center",
        children: (0, e.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "No withdrawal history found."
        })
    });
    const s = h => h.replace(/-/g, "").slice(0, 9).toUpperCase(),
        l = h => {
            const b = new Date(h),
                y = _ => String(_).padStart(2, "0");
            return `${y(b.getDate())}.${y(b.getMonth()+1)}.${b.getFullYear()}`
        },
        i = h => {
            const b = new Date(h),
                y = _ => String(_).padStart(2, "0");
            return `${y(b.getHours())}:${y(b.getMinutes())}:${y(b.getSeconds())}`
        };
    async function k(h) {
        d(h);
        try {
            const {
                error: b
            } = await F.rpc("cancel_my_withdrawal", {
                _w_id: h
            });
            if (b) throw new Error(b.message);
            C.success("Withdrawal cancelled — funds returned to your balance"), a.invalidateQueries({
                queryKey: ["withdrawals"]
            }), a.invalidateQueries({
                queryKey: ["accounts"]
            }), a.invalidateQueries({
                queryKey: ["my-accounts"]
            })
        } catch (b) {
            C.error(b ? .message ? ? "Could not cancel withdrawal")
        } finally {
            d(null)
        }
    }
    return (0, e.jsx)("div", {
        className: "space-y-0",
        children: c.map(h => {
            const b = String(h.status || "").toLowerCase(),
                y = b === "pending" || b === "processing";
            return (0, e.jsxs)("div", {
                className: "border-b border-border/50 py-3.5",
                children: [(0, e.jsxs)("div", {
                    className: "flex items-start justify-between gap-3",
                    children: [(0, e.jsx)("span", {
                        className: "font-mono text-sm font-semibold tracking-wide text-foreground",
                        children: s(h.id)
                    }), (0, e.jsxs)("span", {
                        className: "font-mono text-base font-bold text-bear",
                        children: ["−$", Math.abs(Number(h.amount)).toFixed(2), (0, e.jsx)("span", {
                            className: "ml-1 text-[11px] font-medium text-muted-foreground",
                            children: "USD"
                        })]
                    })]
                }), (0, e.jsxs)("div", {
                    className: "mt-1 flex items-center justify-between gap-3",
                    children: [(0, e.jsxs)("span", {
                        className: "font-mono text-[11px] text-muted-foreground",
                        children: [l(h.created_at), " ", i(h.created_at)]
                    }), (0, e.jsx)("span", {
                        className: "text-xs font-medium text-foreground/80",
                        children: h.method
                    })]
                }), (0, e.jsxs)("div", {
                    className: "mt-1.5 flex items-center justify-between gap-3",
                    children: [(0, e.jsx)(bt, {
                        status: h.status
                    }), (0, e.jsx)("span", {
                        className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
                        children: "Withdrawal"
                    })]
                }), y && (0, e.jsx)(ft, {
                    createdAt: h.created_at,
                    cancelling: m === h.id,
                    onCancel: () => k(h.id)
                })]
            }, h.id)
        })
    })
}
var Ne = 2880 * 60 * 1e3;

function ft({
    createdAt: t,
    cancelling: a,
    onCancel: m
}) {
    const [, d] = (0, f.useState)(0);
    (0, f.useEffect)(() => {
        const _ = setInterval(() => d(n => n + 1), 1e3);
        return () => clearInterval(_)
    }, []);
    const g = new Date(t).getTime(),
        c = Xe(),
        s = Math.max(0, c - g),
        l = Math.max(0, Ne - s),
        i = Math.min(100, Math.max(0, l / Ne * 100)),
        k = Math.floor(l / 36e5),
        h = Math.floor(l % 36e5 / 6e4),
        b = Math.floor(l % 6e4 / 1e3),
        y = _ => String(_).padStart(2, "0");
    return (0, e.jsxs)("div", {
        className: "mt-3",
        children: [(0, e.jsx)("div", {
            className: "h-1.5 w-full overflow-hidden rounded-full bg-border/60",
            children: (0, e.jsx)("div", {
                className: "h-full rounded-full bg-bull transition-[width] duration-1000 ease-linear",
                style: {
                    width: `${i}%`
                }
            })
        }), (0, e.jsxs)("div", {
            className: "mt-2 flex items-center justify-between gap-2",
            children: [(0, e.jsxs)("p", {
                className: "font-mono text-[10px] text-muted-foreground",
                children: [k > 0 ? `${k}h ${y(h)}m ${y(b)}s` : `${y(h)}m ${y(b)}s`, " ", "remaining · processed within 48h"]
            }), (0, e.jsx)("button", {
                type: "button",
                disabled: a,
                onClick: m,
                className: "rounded-full border border-bear/40 px-2.5 py-1 text-[11px] font-semibold text-bear transition-colors hover:bg-bear/10 disabled:opacity-50",
                children: a ? "Cancelling…" : "Cancel"
            })]
        })]
    })
}

function bt({
    status: t
}) {
    const a = (t || "").toLowerCase();
    let m = t,
        d = "text-muted-foreground",
        g = "●";
    return a === "pending" || a === "processing" ? (m = "Pending", d = "text-muted-foreground", g = "◔") : a === "completed" || a === "success" || a === "approved" ? (m = "Approved", d = "text-bull", g = "✓") : a === "failed" || a === "rejected" ? (m = "Rejected", d = "text-bear", g = "✕") : a === "cancelled" && (m = "Cancelled", d = "text-bear", g = "✕"), (0, e.jsxs)("span", {
        className: `inline-flex items-center gap-1.5 text-xs ${d}`,
        children: [(0, e.jsx)("span", {
            children: g
        }), (0, e.jsx)("span", {
            children: m
        })]
    })
}

function gt({
    userId: t
}) {
    const {
        data: a = []
    } = U({
        queryKey: ["deposits", t],
        enabled: !!t,
        queryFn: async () => {
            const {
                data: s
            } = await F.from("deposits").select("*").eq("user_id", t).order("created_at", {
                ascending: !1
            }).limit(100);
            return s ? ? []
        }
    }), {
        data: m = []
    } = U({
        queryKey: ["withdrawals", t],
        enabled: !!t,
        queryFn: async () => {
            const {
                data: s
            } = await F.from("withdrawals").select("*").eq("user_id", t).order("created_at", {
                ascending: !1
            }).limit(100);
            return s ? ? []
        }
    }), d = (0, f.useMemo)(() => {
        const s = a.map(i => ({
                id: i.id,
                date: i.created_at,
                status: i.status,
                type: "Deposit",
                method: i.method,
                amount: Number(i.amount),
                sign: 1
            })),
            l = m.map(i => ({
                id: i.id,
                date: i.created_at,
                status: i.status,
                type: "Withdrawal",
                method: i.method,
                amount: Number(i.amount),
                sign: -1
            }));
        return [...s, ...l].sort((i, k) => +new Date(k.date) - +new Date(i.date))
    }, [a, m]), g = s => {
        const l = new Date(s),
            i = k => String(k).padStart(2, "0");
        return `${i(l.getDate())}/${i(l.getMonth()+1)}/${l.getFullYear()}, ${i(l.getHours())}:${i(l.getMinutes())}:${i(l.getSeconds())}`
    }, c = ({
        status: s
    }) => {
        const l = s.toLowerCase();
        return l === "completed" || l === "success" || l === "approved" ? (0, e.jsxs)("span", {
            className: "inline-flex items-center gap-1.5 text-bull",
            children: [(0, e.jsx)("span", {
                className: "h-2 w-2 rounded-full bg-bull"
            }), " Completed"]
        }) : l === "failed" || l === "rejected" || l === "cancelled" ? (0, e.jsxs)("span", {
            className: "inline-flex items-center gap-1.5 text-bear",
            children: [(0, e.jsx)("span", {
                className: "h-2 w-2 rounded-full bg-bear"
            }), " Failed"]
        }) : (0, e.jsxs)("span", {
            className: "inline-flex items-center gap-1.5 text-amber-500",
            children: [(0, e.jsx)("span", {
                className: "h-2 w-2 rounded-full bg-amber-500 animate-pulse"
            }), " Processing"]
        })
    };
    return d.length ? (0, e.jsxs)(e.Fragment, {
        children: [(0, e.jsx)("div", {
            className: "space-y-3 md:hidden",
            children: d.map(s => (0, e.jsxs)("div", {
                className: "rounded-xl border border-border bg-panel p-3.5 shadow-sm",
                children: [(0, e.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [(0, e.jsx)("span", {
                        className: "font-mono text-xs text-muted-foreground",
                        children: s.id.slice(0, 9).toUpperCase()
                    }), (0, e.jsxs)("span", {
                        className: `font-mono text-sm font-bold ${s.sign>0?"text-bull":"text-bear"}`,
                        children: [s.sign > 0 ? "+" : "-", "$", s.amount.toFixed(2)]
                    })]
                }), (0, e.jsxs)("div", {
                    className: "mt-2 flex items-center justify-between text-xs",
                    children: [(0, e.jsx)("span", {
                        className: "text-muted-foreground",
                        children: g(s.date)
                    }), (0, e.jsx)("span", {
                        className: "text-muted-foreground",
                        children: s.method
                    })]
                }), (0, e.jsxs)("div", {
                    className: "mt-2.5 flex items-center justify-between border-t border-border pt-2.5",
                    children: [(0, e.jsx)(c, {
                        status: s.status
                    }), (0, e.jsx)("span", {
                        className: "text-xs font-medium text-muted-foreground",
                        children: s.type
                    })]
                })]
            }, s.id))
        }), (0, e.jsx)("div", {
            className: "hidden overflow-x-auto md:block panel",
            children: (0, e.jsxs)("table", {
                className: "w-full text-sm",
                children: [(0, e.jsx)("thead", {
                    className: "bg-panel-2 text-[11px] uppercase tracking-widest text-muted-foreground",
                    children: (0, e.jsxs)("tr", {
                        children: [(0, e.jsx)("th", {
                            className: "px-4 py-3 text-left font-normal",
                            children: "Transaction ID"
                        }), (0, e.jsx)("th", {
                            className: "px-4 py-3 text-left font-normal",
                            children: "Date and time"
                        }), (0, e.jsx)("th", {
                            className: "px-4 py-3 text-left font-normal",
                            children: "Status"
                        }), (0, e.jsx)("th", {
                            className: "px-4 py-3 text-left font-normal",
                            children: "Transaction type"
                        }), (0, e.jsx)("th", {
                            className: "px-4 py-3 text-left font-normal",
                            children: "Payment system"
                        }), (0, e.jsx)("th", {
                            className: "px-4 py-3 text-right font-normal",
                            children: "Amount"
                        })]
                    })
                }), (0, e.jsx)("tbody", {
                    children: d.map(s => (0, e.jsxs)("tr", {
                        className: "border-t border-border",
                        children: [(0, e.jsx)("td", {
                            className: "px-4 py-4 font-mono text-xs text-muted-foreground",
                            children: s.id.slice(0, 9).toUpperCase()
                        }), (0, e.jsx)("td", {
                            className: "px-4 py-4 text-muted-foreground",
                            children: g(s.date)
                        }), (0, e.jsx)("td", {
                            className: "px-4 py-4",
                            children: (0, e.jsx)(c, {
                                status: s.status
                            })
                        }), (0, e.jsx)("td", {
                            className: "px-4 py-4",
                            children: s.type
                        }), (0, e.jsx)("td", {
                            className: "px-4 py-4 text-muted-foreground",
                            children: s.method
                        }), (0, e.jsxs)("td", {
                            className: `px-4 py-4 text-right font-mono ${s.sign>0?"text-bull":"text-bear"}`,
                            children: [s.sign > 0 ? "+" : "-", "$", s.amount.toFixed(2)]
                        })]
                    }, s.id))
                })]
            })
        })]
    }) : (0, e.jsx)("div", {
        className: "panel p-10 text-center text-sm text-muted-foreground",
        children: "No deposits or withdrawals yet. Your transaction history will appear here in real time."
    })
}

function yt({
    userId: t
}) {
    const {
        isFunded: a
    } = ne(), m = new Date, d = new Date;
    d.setFullYear(m.getFullYear() - 1);
    const g = u => u.toISOString().slice(0, 10),
        [c, s] = (0, f.useState)("history"),
        {
            ready: l
        } = Je(),
        i = "live",
        [k, h] = (0, f.useState)(g(d)),
        [b, y] = (0, f.useState)(g(m)),
        [_, n] = (0, f.useState)(0),
        p = 10,
        {
            data: o = []
        } = U({
            queryKey: ["account-trades-all", t, c, i, k, b],
            enabled: !!t && l,
            refetchInterval: 5e3,
            queryFn: async () => {
                let u = F.from("trades").select("*").eq("user_id", t).gte("created_at", `${k}T00:00:00`).lte("created_at", `${b}T23:59:59`).order("created_at", {
                    ascending: !1
                }).limit(500);
                u = u.eq("account_kind", "live"), c === "pending" ? u = u.eq("status", "open") : u = u.neq("status", "open");
                const {
                    data: j
                } = await u;
                return j ? ? []
            }
        }),
        x = Math.max(1, Math.ceil(o.length / p)),
        w = o.slice(_ * p, _ * p + p),
        M = () => {
            const u = [
                ["Asset", "Account", "Direction", "Payout %", "Opening quote", "Opening time", "Closing quote", "Closing time", "Amount", "Profit", "Status", "Trade ID"].join(",")
            ];
            for (const S of o) u.push([S.asset_symbol, S.account_kind, S.direction, S.payout_pct, S.open_price, S.open_time ? ? S.created_at, S.close_price ? ? "", S.expire_time ? ? "", S.amount, S.pnl, S.status, S.id].map(E => `"${String(E??"").replace(/"/g,'""')}"`).join(","));
            const j = new Blob([u.join(`
`)], {
                    type: "text/csv"
                }),
                r = URL.createObjectURL(j),
                N = document.createElement("a");
            N.href = r, N.download = `trades_${k}_to_${b}.csv`, N.click(), URL.revokeObjectURL(r)
        };
    return (0, e.jsxs)("div", {
        className: "panel p-4",
        children: [(0, e.jsx)("div", {
            className: "mb-4 flex gap-6 border-b border-border",
            children: [{
                k: "history",
                label: "Trade history"
            }, {
                k: "pending",
                label: "Pending trades"
            }].map(u => (0, e.jsx)("button", {
                onClick: () => {
                    s(u.k), n(0)
                },
                className: `-mb-px border-b-2 px-1 pb-2 text-sm font-semibold transition-colors ${c===u.k?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`,
                children: u.label
            }, u.k))
        }), (0, e.jsxs)("div", {
            className: "mb-4 flex flex-wrap items-end gap-3",
            children: [(0, e.jsxs)("div", {
                className: "rounded-md border border-border bg-panel-2 px-3 py-1.5",
                children: [(0, e.jsx)("div", {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "Date Range"
                }), (0, e.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [(0, e.jsx)("input", {
                        type: "date",
                        value: k,
                        onChange: u => {
                            h(u.target.value), n(0)
                        },
                        className: "bg-transparent text-sm outline-none"
                    }), (0, e.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "–"
                    }), (0, e.jsx)("input", {
                        type: "date",
                        value: b,
                        onChange: u => {
                            y(u.target.value), n(0)
                        },
                        className: "bg-transparent text-sm outline-none"
                    })]
                })]
            }), (0, e.jsxs)("div", {
                className: "rounded-md border border-border bg-panel-2 px-3 py-1.5",
                children: [(0, e.jsx)("div", {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "Account Type"
                }), (0, e.jsx)("div", {
                    className: "text-sm",
                    children: a ? "Funded Account" : "Live Account"
                })]
            }), (0, e.jsxs)("div", {
                className: "ml-auto flex items-center gap-2",
                children: [(0, e.jsx)("button", {
                    onClick: M,
                    className: "rounded-md border border-border bg-panel-2 px-3 py-2 text-sm font-semibold hover:bg-accent",
                    children: "⤓ Export CSV"
                }), (0, e.jsx)("button", {
                    onClick: () => n(u => Math.max(0, u - 1)),
                    disabled: _ === 0,
                    className: "rounded-md border border-border bg-panel-2 px-3 py-2 text-sm disabled:opacity-40",
                    children: "‹ Prev"
                }), (0, e.jsxs)("span", {
                    className: "text-sm text-muted-foreground",
                    children: [_ + 1, "/", x]
                }), (0, e.jsx)("button", {
                    onClick: () => n(u => Math.min(x - 1, u + 1)),
                    disabled: _ >= x - 1,
                    className: "rounded-md border border-border bg-panel-2 px-3 py-2 text-sm disabled:opacity-40",
                    children: "Next ›"
                })]
            })]
        }), w.length ? (0, e.jsx)("div", {
            className: "overflow-x-auto",
            children: (0, e.jsxs)("table", {
                className: "w-full text-xs",
                children: [(0, e.jsx)("thead", {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: (0, e.jsxs)("tr", {
                        children: [(0, e.jsx)("th", {
                            className: "px-3 py-2 text-left",
                            children: "Asset"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-left",
                            children: "Info"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-center",
                            children: "Dir"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-left",
                            children: "Opening quote"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-left",
                            children: "Closing quote"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-center",
                            children: "Account"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-right",
                            children: "Amount"
                        }), (0, e.jsx)("th", {
                            className: "px-3 py-2 text-right",
                            children: "Profit"
                        })]
                    })
                }), (0, e.jsx)("tbody", {
                    children: w.map(u => {
                        const j = Number(u.pnl),
                            r = u.status === "open";
                        return (0, e.jsxs)("tr", {
                            className: "border-t border-border align-top font-mono",
                            children: [(0, e.jsx)("td", {
                                className: "px-3 py-3",
                                children: (0, e.jsxs)("div", {
                                    className: "text-sm font-semibold",
                                    children: [u.asset_symbol.replace("_OTC", ""), " ", u.asset_symbol.includes("OTC") && (0, e.jsx)("span", {
                                        className: "text-muted-foreground",
                                        children: "(OTC)"
                                    })]
                                })
                            }), (0, e.jsxs)("td", {
                                className: "px-3 py-3",
                                children: [(0, e.jsxs)("div", {
                                    className: "text-bull",
                                    children: [Number(u.payout_pct), "%"]
                                }), (0, e.jsx)("div", {
                                    className: "text-[10px] text-muted-foreground",
                                    children: u.id
                                })]
                            }), (0, e.jsx)("td", {
                                className: `px-3 py-3 text-center text-sm font-bold ${u.direction==="up"?"text-bull":"text-bear"}`,
                                children: u.direction === "up" ? "▲" : "▼"
                            }), (0, e.jsxs)("td", {
                                className: "px-3 py-3",
                                children: [(0, e.jsx)("div", {
                                    children: ye(Number(u.open_price))
                                }), (0, e.jsx)("div", {
                                    className: "text-[10px] text-muted-foreground",
                                    children: new Date(u.open_time ? ? u.created_at).toLocaleString()
                                })]
                            }), (0, e.jsxs)("td", {
                                className: "px-3 py-3",
                                children: [(0, e.jsx)("div", {
                                    children: u.close_price ? ye(Number(u.close_price)) : "—"
                                }), (0, e.jsx)("div", {
                                    className: "text-[10px] text-muted-foreground",
                                    children: u.expire_time ? new Date(u.expire_time).toLocaleString() : ""
                                })]
                            }), (0, e.jsx)("td", {
                                className: "px-3 py-3 text-center",
                                children: (0, e.jsx)("span", {
                                    className: `rounded px-1.5 py-0.5 text-[10px] uppercase ${u.account_kind==="live"?"bg-bear/15 text-bear":"bg-amber-500/15 text-amber-400"}`,
                                    children: u.account_kind
                                })
                            }), (0, e.jsxs)("td", {
                                className: "px-3 py-3 text-right text-bull",
                                children: ["$", Number(u.amount).toFixed(2)]
                            }), (0, e.jsx)("td", {
                                className: `px-3 py-3 text-right font-semibold ${r?"text-muted-foreground":j>0?"text-bull":j<0?"text-bear":""}`,
                                children: r ? "—" : `${j>0?"+":""}$${j.toFixed(2)}`
                            })]
                        }, u.id)
                    })
                })]
            })
        }) : (0, e.jsx)("div", {
            className: "p-8 text-center text-sm text-muted-foreground",
            children: "No trades for the selected filters."
        })]
    })
}

function jt() {
    return (0, e.jsxs)("div", {
        className: "panel flex flex-col items-center gap-3 p-10 text-center",
        children: [(0, e.jsx)(Qe, {
            className: "h-10 w-10 text-primary"
        }), (0, e.jsx)("h2", {
            className: "text-lg font-bold",
            children: "Tournaments"
        }), (0, e.jsx)("p", {
            className: "max-w-md text-sm text-muted-foreground",
            children: "Compete with other traders for prizes. View the live leaderboard and join the action."
        }), (0, e.jsx)(he, {
            to: "/leaderboard",
            className: "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90",
            children: "Open leaderboard"
        })]
    })
}
var ke = [{
    key: "today",
    label: "Today"
}, {
    key: "yesterday",
    label: "Yesterday"
}, {
    key: "week",
    label: "Week"
}, {
    key: "month",
    label: "Month"
}, {
    key: "all",
    label: "All"
}];

function vt({
    period: t,
    onChange: a
}) {
    const [m, d] = (0, f.useState)(!1), g = (0, f.useRef)(null);
    return (0, f.useEffect)(() => {
        if (!m) return;
        const c = s => {
            g.current && !g.current.contains(s.target) && d(!1)
        };
        return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c)
    }, [m]), (0, e.jsxs)("div", {
        ref: g,
        className: "relative w-full sm:w-48",
        children: [(0, e.jsxs)("button", {
            type: "button",
            onClick: () => d(c => !c),
            "aria-haspopup": "listbox",
            "aria-expanded": m,
            className: "flex w-full items-center justify-between rounded-lg bg-panel-2 px-4 py-3 text-left text-sm font-bold text-foreground ring-1 ring-border/60 transition-colors hover:bg-panel",
            children: [(0, e.jsx)("span", {
                className: "truncate",
                children: ke.find(c => c.key === t) ? .label ? ? "Month"
            }), (0, e.jsx)(Te, {
                className: `h-4 w-4 shrink-0 text-muted-foreground transition-transform ${m?"rotate-180":""}`
            })]
        }), m && (0, e.jsx)("div", {
            role: "listbox",
            className: "absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg bg-panel-2 shadow-xl ring-1 ring-border/60",
            children: ke.map((c, s) => {
                const l = c.key === t;
                return (0, e.jsx)("button", {
                    role: "option",
                    "aria-selected": l,
                    onClick: () => {
                        a(c.key), d(!1)
                    },
                    className: `flex w-full items-center px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-panel ${l?"text-muted-foreground":"text-foreground"} ${s>0?"border-t border-border/60":""}`,
                    children: c.label
                }, c.key)
            })
        })]
    })
}

function _e(t) {
    const a = new Date,
        m = new Date(a),
        d = new Date(a);
    return t === "today" ? d.setHours(0, 0, 0, 0) : t === "yesterday" ? (d.setDate(d.getDate() - 1), d.setHours(0, 0, 0, 0), m.setHours(0, 0, 0, 0)) : t === "week" ? d.setDate(d.getDate() - 7) : t === "month" ? d.setMonth(d.getMonth() - 1) : (d.setFullYear(2e3, 0, 1), d.setHours(0, 0, 0, 0)), {
        from: d.toISOString(),
        to: m.toISOString(),
        start: d,
        end: m
    }
}

function wt({
    userId: t
}) {
    const [a, m] = (0, f.useState)("all"), d = J(), g = (0, f.useMemo)(() => ["analytics-trades", t, a], [t, a]), {
        data: c = []
    } = U({
        queryKey: g,
        enabled: !!t,
        refetchOnWindowFocus: !0,
        staleTime: 0,
        queryFn: async () => {
            const n = _e(a);
            let p = F.from("trades").select("id, user_id, account_kind, status, amount, pnl, direction, asset_symbol, created_at").eq("user_id", t).eq("account_kind", "live").neq("status", "open").gte("created_at", n.from).order("created_at", {
                ascending: !0
            }).limit(2e3);
            a === "yesterday" && (p = p.lte("created_at", n.to));
            const {
                data: o
            } = await p;
            return o ? ? []
        }
    });
    (0, f.useEffect)(() => {
        if (!t) return;
        const n = o => {
                if (!o || o.user_id !== t || o.account_kind !== "live" || o.status === "open") return;
                const x = new Date(o.created_at).getTime(),
                    w = _e(a);
                if (x < w.start.getTime() || a === "yesterday" && x > w.end.getTime()) return;
                const M = {
                    id: o.id,
                    user_id: o.user_id,
                    account_kind: o.account_kind,
                    status: o.status,
                    amount: o.amount,
                    pnl: o.pnl,
                    direction: o.direction,
                    asset_symbol: o.asset_symbol,
                    created_at: o.created_at
                };
                d.setQueryData(g, (u = []) => [...u.filter(j => j.id !== M.id), M].sort((j, r) => new Date(j.created_at).getTime() - new Date(r.created_at).getTime()))
            },
            p = Ve(`analytics-trades-${t}`).on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "trades",
                filter: `user_id=eq.${t}`
            }, o => n(o.new)).on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "trades",
                filter: `user_id=eq.${t}`
            }, o => n(o.new)).on("postgres_changes", {
                event: "DELETE",
                schema: "public",
                table: "trades",
                filter: `user_id=eq.${t}`
            }, o => {
                const x = o.old ? .id;
                x && d.setQueryData(g, (w = []) => w.filter(M => M.id !== x))
            }).subscribe();
        return () => {
            Ye(p)
        }
    }, [g, a, d, t]);
    const s = (0, f.useMemo)(() => {
            const n = c.length,
                p = c.filter(D => D.status === "won").length,
                o = c.filter(D => D.status === "lost").length,
                x = c.reduce((D, T) => D + Number(T.pnl ? ? 0), 0),
                w = c.filter(D => Number(D.pnl) > 0).map(D => Number(D.pnl)),
                M = w.reduce((D, T) => D + T, 0),
                u = c.reduce((D, T) => D + Number(T.amount ? ? 0), 0),
                j = c.map(D => Number(D.amount ? ? 0)),
                r = j.length ? Math.min(...j) : 0,
                N = j.length ? Math.max(...j) : 0,
                S = w.length ? Math.max(...w) : 0,
                E = n ? x / n : 0;
            return {
                total: n,
                wins: p,
                losses: o,
                pnl: x,
                volume: u,
                winRate: n ? p / n * 100 : 0,
                tradesProfit: M,
                minAmt: r,
                maxAmt: N,
                maxProfit: S,
                avgProfit: E
            }
        }, [c]),
        l = (0, f.useMemo)(() => {
            let n = 0;
            const p = new Map;
            for (const o of c) {
                const x = new Date(o.created_at),
                    w = `${x.getMonth()+1}/${x.getDate()}`;
                n += Number(o.pnl ? ? 0), p.set(w, n)
            }
            return Array.from(p.entries()).map(([o, x]) => ({
                date: o,
                value: x
            }))
        }, [c]),
        i = (0, f.useMemo)(() => {
            const n = new Map;
            for (const p of c) {
                const o = new Date(p.created_at),
                    x = `${o.getMonth()+1}/${o.getDate()}`,
                    w = n.get(x) ? ? {
                        w: 0,
                        t: 0
                    };
                w.t += 1, p.status === "won" && (w.w += 1), n.set(x, w)
            }
            return Array.from(n.entries()).map(([p, o]) => ({
                date: p,
                value: o.t ? o.w / o.t * 100 : 0
            }))
        }, [c]),
        k = (0, f.useMemo)(() => {
            const n = new Map;
            for (const x of c) n.set(x.asset_symbol, (n.get(x.asset_symbol) ? ? 0) + 1);
            const p = Array.from(n.entries()).map(([x, w]) => ({
                    name: x,
                    value: w
                })).sort((x, w) => w.value - x.value).slice(0, 5),
                o = p.reduce((x, w) => x + w.value, 0) || 1;
            return p.map(x => ({ ...x,
                pct: x.value / o * 100
            }))
        }, [c]),
        h = (0, f.useMemo)(() => {
            const n = new Map;
            for (const o of c) n.set(o.asset_symbol, (n.get(o.asset_symbol) ? ? 0) + 1);
            const p = c.length || 1;
            return Array.from(n.entries()).map(([o, x]) => ({
                name: o,
                count: x,
                pct: x / p * 100
            })).sort((o, x) => x.count - o.count)
        }, [c]),
        b = (0, f.useMemo)(() => {
            const n = new Map;
            for (const p of c) n.set(p.asset_symbol, (n.get(p.asset_symbol) ? ? 0) + Number(p.pnl ? ? 0));
            return Array.from(n.entries()).map(([p, o]) => ({
                name: p,
                value: o
            })).sort((p, o) => Math.abs(o.value) - Math.abs(p.value)).slice(0, 8)
        }, [c]),
        y = (0, f.useMemo)(() => {
            const n = {
                lt0: 0,
                mid: 0,
                gt1k: 0
            };
            for (const o of c) {
                const x = Number(o.pnl ? ? 0);
                x < 0 ? n.lt0 += 1 : x <= 1e3 ? n.mid += 1 : n.gt1k += 1
            }
            const p = c.length || 1;
            return {
                lt0: n.lt0 / p * 100,
                mid: n.mid / p * 100,
                gt1k: n.gt1k / p * 100
            }
        }, [c]),
        _ = ["#22c55e", "#3b82f6", "#fb7185", "#b91c1c", "#f97316"];
    return (0, e.jsxs)("div", {
        className: "space-y-4",
        children: [(0, e.jsxs)("div", {
            className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
            children: [(0, e.jsx)("div", {
                className: "text-xs text-muted-foreground uppercase font-semibold tracking-wider",
                children: "Live account "
            }), (0, e.jsx)(vt, {
                period: a,
                onChange: m
            })]
        }), (0, e.jsxs)("div", {
            className: "grid gap-4 lg:grid-cols-2",
            children: [(0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h3", {
                    className: "mb-4 text-base font-bold",
                    children: "General data"
                }), (0, e.jsxs)("div", {
                    className: "grid grid-cols-3 gap-y-6",
                    children: [(0, e.jsx)(Se, {
                        value: s.total,
                        label: "Trades count"
                    }), (0, e.jsx)(K, {
                        value: `${s.pnl>=0?"+":""}${s.pnl.toFixed(0)} $`,
                        label: "Trades profit",
                        accent: s.pnl > 0 ? "bull" : s.pnl < 0 ? "bear" : void 0
                    }), (0, e.jsx)(Se, {
                        value: `${s.winRate.toFixed(0)}%`,
                        label: "Profitable trades",
                        small: s.winRate.toFixed(0) + "%"
                    }), (0, e.jsx)(K, {
                        value: `${s.avgProfit>=0?"+":""}${s.avgProfit.toFixed(0)} $`,
                        label: "Average profit",
                        accent: s.avgProfit > 0 ? "bull" : s.avgProfit < 0 ? "bear" : void 0
                    }), (0, e.jsx)(K, {
                        value: `${s.volume.toFixed(0)} $`,
                        label: "Net turnover"
                    }), (0, e.jsx)(K, {
                        value: "0 $",
                        label: "Hedged trades"
                    }), (0, e.jsx)(K, {
                        value: `${s.minAmt.toFixed(0)} $`,
                        label: "Min trade amount"
                    }), (0, e.jsx)(K, {
                        value: `${s.maxAmt.toFixed(0)} $`,
                        label: "Max trade amount"
                    }), (0, e.jsx)(K, {
                        value: `${s.maxProfit>=0?"+":""}${s.maxProfit.toFixed(0)} $`,
                        label: "Max trade profit",
                        accent: s.maxProfit > 0 ? "bull" : void 0
                    })]
                }), (0, e.jsxs)("div", {
                    className: "mt-6 border-t border-border/40 pt-4",
                    children: [(0, e.jsxs)("div", {
                        className: "flex h-3 w-56 overflow-hidden rounded-sm",
                        children: [(0, e.jsx)("div", {
                            className: "flex-1 bg-bear",
                            style: {
                                flex: y.lt0 || 1
                            }
                        }), (0, e.jsx)("div", {
                            className: "flex-1 bg-amber-500",
                            style: {
                                flex: y.mid || 1
                            }
                        }), (0, e.jsx)("div", {
                            className: "flex-1 bg-bull",
                            style: {
                                flex: y.gt1k || 1
                            }
                        })]
                    }), (0, e.jsxs)("div", {
                        className: "mt-2 flex w-56 justify-between text-[10px] text-muted-foreground",
                        children: [(0, e.jsx)("span", {
                            children: "-1K—0"
                        }), (0, e.jsx)("span", {
                            children: "0—1K"
                        }), (0, e.jsx)("span", {
                            children: "+1K"
                        })]
                    })]
                })]
            }), (0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h3", {
                    className: "mb-4 text-base font-bold",
                    children: "Statistics of profitable trades"
                }), (0, e.jsx)(Ce, {
                    data: l,
                    color: "#22c55e",
                    format: n => `${n>=0?"+":""}${n.toFixed(2)} $`
                })]
            }), (0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h3", {
                    className: "mb-4 text-base font-bold",
                    children: "Top 5 most traded instruments"
                }), k.length === 0 ? (0, e.jsx)(xe, {}) : (0, e.jsxs)("div", {
                    className: "flex items-center gap-6",
                    children: [(0, e.jsx)(Nt, {
                        data: k,
                        colors: _
                    }), (0, e.jsx)("div", {
                        className: "flex flex-col gap-2 text-sm",
                        children: k.map((n, p) => (0, e.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [(0, e.jsx)("span", {
                                className: "h-3 w-3 rounded-full",
                                style: {
                                    background: _[p]
                                }
                            }), (0, e.jsxs)("span", {
                                children: [n.name, " ", n.pct.toFixed(0), "%"]
                            })]
                        }, n.name))
                    })]
                })]
            }), (0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h3", {
                    className: "mb-4 text-base font-bold",
                    children: "Percentage % of profitable trades"
                }), (0, e.jsx)(Ce, {
                    data: i,
                    color: "#22c55e",
                    yMax: 100,
                    format: n => `${n.toFixed(0)}%`
                })]
            }), (0, e.jsxs)("div", {
                className: "panel p-5",
                children: [(0, e.jsx)("h3", {
                    className: "mb-4 text-base font-bold",
                    children: "Statistics Profit & Loss by instruments"
                }), b.length === 0 ? (0, e.jsx)(xe, {}) : (0, e.jsx)("div", {
                    className: "space-y-2",
                    children: b.map(n => (0, e.jsxs)("div", {
                        className: "flex items-center gap-3 text-sm",
                        children: [(0, e.jsx)("span", {
                            className: "w-24 truncate",
                            children: n.name
                        }), (0, e.jsx)("div", {
                            className: "relative h-2 flex-1 overflow-hidden rounded-sm bg-muted/40",
                            children: (0, e.jsx)("div", {
                                className: `absolute inset-y-0 ${n.value>=0?"bg-bull":"bg-bear"}`,
                                style: {
                                    width: `${Math.min(100,Math.abs(n.value))}%`
                                }
                            })
                        }), (0, e.jsxs)("span", {
                            className: `w-20 text-right font-mono ${n.value>=0?"text-bull":"text-bear"}`,
                            children: [n.value >= 0 ? "+" : "", n.value.toFixed(0), "$"]
                        })]
                    }, n.name))
                })]
            }), (0, e.jsxs)("div", {
                className: "panel p-5 lg:col-span-2",
                children: [(0, e.jsx)("h3", {
                    className: "mb-4 text-base font-bold",
                    children: "Distribution of trades by instruments, %"
                }), h.length === 0 ? (0, e.jsx)(xe, {}) : (0, e.jsx)("div", {
                    className: "space-y-2",
                    children: h.map(n => (0, e.jsxs)("div", {
                        className: "flex items-center gap-3 text-sm",
                        children: [(0, e.jsx)("span", {
                            className: "w-24 truncate",
                            children: n.name
                        }), (0, e.jsx)("div", {
                            className: "relative h-2 flex-1 overflow-hidden rounded-sm bg-muted/40",
                            children: (0, e.jsx)("div", {
                                className: "absolute inset-y-0 bg-primary",
                                style: {
                                    width: `${n.pct}%`
                                }
                            })
                        }), (0, e.jsxs)("span", {
                            className: "w-16 text-right font-mono",
                            children: [n.pct.toFixed(1), "%"]
                        })]
                    }, n.name))
                })]
            })]
        })]
    })
}

function Se({
    value: t,
    label: a,
    small: m
}) {
    return (0, e.jsxs)("div", {
        className: "flex flex-col items-start gap-2",
        children: [(0, e.jsxs)("div", {
            className: "flex h-14 w-14 flex-col items-center justify-center rounded-full border border-border/60",
            children: [(0, e.jsx)("div", {
                className: "text-base font-bold",
                children: t
            }), m && (0, e.jsx)("div", {
                className: "text-[9px] text-muted-foreground",
                children: m
            })]
        }), (0, e.jsx)("div", {
            className: "text-xs text-muted-foreground",
            children: a
        })]
    })
}

function K({
    value: t,
    label: a,
    accent: m
}) {
    return (0, e.jsxs)("div", {
        className: "flex flex-col gap-1",
        children: [(0, e.jsx)("div", {
            className: `text-lg font-bold ${m==="bull"?"text-bull":m==="bear"?"text-bear":""}`,
            children: t
        }), (0, e.jsx)("div", {
            className: "h-1 w-20 rounded bg-muted/50"
        }), (0, e.jsx)("div", {
            className: "mt-1 text-xs text-muted-foreground",
            children: a
        })]
    })
}

function xe() {
    return (0, e.jsx)("div", {
        className: "flex h-40 items-center justify-center text-2xl font-semibold text-muted-foreground",
        children: "No data"
    })
}

function Ce({
    data: t,
    color: a,
    yMax: m,
    format: d
}) {
    const l = `grad-${a.replace("#","")}-${m??"auto"}`,
        [i, k] = (0, f.useState)(null),
        h = d ? ? (r => `${r>=0?"+":""}${r.toFixed(2)} $`);
    if (!t.length) return (0, e.jsx)("div", {
        className: "h-48 w-full",
        children: (0, e.jsxs)("svg", {
            viewBox: "0 0 400 160",
            className: "h-full w-full",
            children: [(0, e.jsx)("line", {
                x1: "0",
                y1: 160 / 2,
                x2: 400,
                y2: 160 / 2,
                stroke: a,
                strokeOpacity: "0.4",
                strokeDasharray: "4 4",
                strokeWidth: "1.5"
            }), (0, e.jsx)("text", {
                x: 400 / 2,
                y: 160 / 2 - 8,
                textAnchor: "middle",
                fontSize: "11",
                fill: "currentColor",
                opacity: "0.5",
                children: "No data"
            })]
        })
    });
    const b = t.length === 1 ? [{ ...t[0],
            date: t[0].date
        }, t[0]] : t,
        y = m ? ? Math.max(...b.map(r => r.value), 1),
        _ = Math.min(...b.map(r => r.value), 0),
        n = y - _ || 1,
        p = 384 / Math.max(1, b.length - 1),
        o = b.map((r, N) => ({
            x: 8 + N * p,
            y: 152 - (r.value - _) / n * 144
        })),
        x = o.map(r => `${r.x},${r.y}`).join(" "),
        w = `8,152 ${x} 392,152`,
        M = r => {
            const N = r.currentTarget,
                S = N.getScreenCTM();
            if (S) try {
                const E = S.inverse(),
                    D = N.createSVGPoint();
                D.x = r.clientX, D.y = r.clientY;
                const T = D.matrixTransform(E);
                let R = 0,
                    A = 1 / 0;
                o.forEach((B, H) => {
                    const Q = Math.abs(B.x - T.x);
                    Q < A && (A = Q, R = H)
                }), k(R)
            } catch {}
        },
        u = i,
        j = (() => {
            if (u == null) return null;
            const r = o[u],
                N = b[u],
                S = N.date,
                E = h(N.value),
                D = Math.max(S.length, E.length) * 6 + 16,
                T = 30;
            let R = r.x - D / 2;
            R = Math.max(8, Math.min(R, 392 - D));
            let A = r.y - T - 6;
            return A < 8 && (A = r.y + 8), {
                c: r,
                label: S,
                val: E,
                tx: R,
                ty: A,
                tw: D,
                th: T
            }
        })();
    return (0, e.jsxs)("div", {
        children: [(0, e.jsxs)("svg", {
            viewBox: "0 0 400 160",
            className: "h-48 w-full",
            onMouseMove: M,
            onMouseLeave: () => k(null),
            children: [(0, e.jsx)("defs", {
                children: (0, e.jsxs)("linearGradient", {
                    id: l,
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [(0, e.jsx)("stop", {
                        offset: "0%",
                        stopColor: a,
                        stopOpacity: "0.4"
                    }), (0, e.jsx)("stop", {
                        offset: "100%",
                        stopColor: a,
                        stopOpacity: "0"
                    })]
                })
            }), [.25, .5, .75].map(r => (0, e.jsx)("line", {
                x1: 8,
                x2: 392,
                y1: 8 + r * 144,
                y2: 8 + r * 144,
                stroke: "currentColor",
                strokeOpacity: "0.08"
            }, r)), (0, e.jsx)("polygon", {
                fill: `url(#${l})`,
                points: w
            }), (0, e.jsx)("polyline", {
                fill: "none",
                stroke: a,
                strokeWidth: "2",
                points: x,
                strokeLinejoin: "round",
                strokeLinecap: "round"
            }), o.map((r, N) => (0, e.jsx)("circle", {
                cx: r.x,
                cy: r.y,
                r: i === N ? 4.5 : 3,
                fill: a,
                stroke: i === N ? "rgba(255,255,255,0.9)" : "none",
                strokeWidth: i === N ? 1.5 : 0
            }, N)), j && (0, e.jsxs)("g", {
                pointerEvents: "none",
                children: [(0, e.jsx)("line", {
                    x1: j.c.x,
                    y1: 8,
                    x2: j.c.x,
                    y2: 152,
                    stroke: a,
                    strokeOpacity: "0.35",
                    strokeDasharray: "3 3"
                }), (0, e.jsx)("rect", {
                    x: j.tx,
                    y: j.ty,
                    width: j.tw,
                    height: j.th,
                    rx: 5,
                    fill: "rgba(15,17,26,0.92)",
                    stroke: a,
                    strokeOpacity: "0.6"
                }), (0, e.jsx)("text", {
                    x: j.tx + j.tw / 2,
                    y: j.ty + 12,
                    textAnchor: "middle",
                    fontSize: "9",
                    fill: "rgba(255,255,255,0.65)",
                    children: j.label
                }), (0, e.jsx)("text", {
                    x: j.tx + j.tw / 2,
                    y: j.ty + 24,
                    textAnchor: "middle",
                    fontSize: "11",
                    fontWeight: "700",
                    fill: a,
                    children: j.val
                })]
            })]
        }), (0, e.jsx)("div", {
            className: "mt-1 flex justify-between text-[10px] text-muted-foreground",
            children: t.filter((r, N) => N % Math.max(1, Math.ceil(t.length / 5)) === 0).map((r, N) => (0, e.jsx)("span", {
                children: r.date
            }, `${r.date}-${N}`))
        })]
    })
}

function Nt({
    data: t,
    colors: a
}) {
    let s = 0;
    const l = t.map((i, k) => {
        const h = s / 100 * Math.PI * 2 - Math.PI / 2;
        s += i.pct;
        const b = s / 100 * Math.PI * 2 - Math.PI / 2,
            y = i.pct > 50 ? 1 : 0,
            _ = 90 + 70 * Math.cos(h),
            n = 90 + 70 * Math.sin(h),
            p = 90 + 70 * Math.cos(b),
            o = 90 + 70 * Math.sin(b),
            x = (h + b) / 2,
            w = 90 + 70 * .6 * Math.cos(x),
            M = 90 + 70 * .6 * Math.sin(x);
        return {
            path: `M 90 90 L ${_} ${n} A 70 70 0 ${y} 1 ${p} ${o} Z`,
            color: a[k % a.length],
            pct: i.pct,
            lx: w,
            ly: M
        }
    });
    return (0, e.jsxs)("svg", {
        width: 180,
        height: 180,
        viewBox: "0 0 180 180",
        children: [l.map((i, k) => (0, e.jsxs)("g", {
            children: [(0, e.jsx)("path", {
                d: i.path,
                fill: i.color
            }), (0, e.jsxs)("text", {
                x: i.lx,
                y: i.ly,
                textAnchor: "middle",
                fontSize: "10",
                fill: "rgba(255,255,255,0.85)",
                children: [i.pct.toFixed(0), "%"]
            })]
        }, k)), (0, e.jsx)("circle", {
            cx: 90,
            cy: 90,
            r: 20,
            fill: "hsl(var(--background))"
        })]
    })
}

function $e({
    label: t,
    done: a
}) {
    return (0, e.jsxs)("div", {
        className: "flex items-center gap-2 rounded-md border border-border bg-panel-2/60 px-2.5 py-2",
        children: [(0, e.jsx)("span", {
            className: `grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-bold ${a?"bg-bull text-white":"bg-amber-500/20 text-amber-400"}`,
            children: a ? "✓" : "!"
        }), (0, e.jsx)("span", {
            className: "truncate text-[12px] text-foreground",
            children: t
        }), (0, e.jsx)("span", {
            className: `ml-auto text-[11px] font-semibold ${a?"text-bull":"text-amber-400"}`,
            children: a ? "Verified" : "Pending"
        })]
    })
}
export {
    zt as component
};