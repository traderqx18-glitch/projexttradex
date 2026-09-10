import {
    n as pr,
    r as He
} from "./tslib.es6-CWLy2mN6.js";
import {
    t as vr
} from "./preload-helper-BrnWUoxD.js";
var yr = t => t ? (...e) => t(...e) : (...e) => fetch(...e),
    lt = class extends Error {
        constructor(t, e = "FunctionsError", r) {
            super(t), this.name = e, this.context = r
        }
        toJSON() {
            return {
                name: this.name,
                message: this.message,
                context: this.context
            }
        }
    },
    mr = class extends lt {
        constructor(t) {
            super("Failed to send a request to the Edge Function", "FunctionsFetchError", t)
        }
    },
    ct = class extends lt {
        constructor(t) {
            super("Relay Error invoking the Edge Function", "FunctionsRelayError", t)
        }
    },
    ht = class extends lt {
        constructor(t) {
            super("Edge Function returned a non-2xx status code", "FunctionsHttpError", t)
        }
    },
    Xe;
(function(t) {
    t.Any = "any", t.ApNortheast1 = "ap-northeast-1", t.ApNortheast2 = "ap-northeast-2", t.ApSouth1 = "ap-south-1", t.ApSoutheast1 = "ap-southeast-1", t.ApSoutheast2 = "ap-southeast-2", t.CaCentral1 = "ca-central-1", t.EuCentral1 = "eu-central-1", t.EuWest1 = "eu-west-1", t.EuWest2 = "eu-west-2", t.EuWest3 = "eu-west-3", t.SaEast1 = "sa-east-1", t.UsEast1 = "us-east-1", t.UsWest1 = "us-west-1", t.UsWest2 = "us-west-2"
})(Xe || (Xe = {}));
var wr = class {
        constructor(t, {
            headers: e = {},
            customFetch: r,
            region: s = Xe.Any
        } = {}) {
            this.url = t, this.headers = e, this.region = s, this.fetch = yr(r)
        }
        setAuth(t) {
            this.headers.Authorization = `Bearer ${t}`
        }
        invoke(t) {
            return pr(this, arguments, void 0, function*(e, r = {}) {
                var s;
                let i, n;
                try {
                    const {
                        headers: a,
                        method: o,
                        body: l,
                        signal: c,
                        timeout: u
                    } = r;
                    let h = {},
                        {
                            region: d
                        } = r;
                    d || (d = this.region);
                    const f = new URL(`${this.url}/${e}`);
                    d && d !== "any" && (h["x-region"] = d, f.searchParams.set("forceFunctionRegion", d));
                    let g;
                    const v = !!a && Object.keys(a).some(I => I.toLowerCase() === "content-type");
                    l && !v ? typeof Blob < "u" && l instanceof Blob || l instanceof ArrayBuffer ? (h["Content-Type"] = "application/octet-stream", g = l) : typeof l == "string" ? (h["Content-Type"] = "text/plain", g = l) : typeof FormData < "u" && l instanceof FormData ? g = l : (h["Content-Type"] = "application/json", g = JSON.stringify(l)) : l && typeof l != "string" && !(typeof Blob < "u" && l instanceof Blob) && !(l instanceof ArrayBuffer) && !(typeof FormData < "u" && l instanceof FormData) ? g = JSON.stringify(l) : g = l;
                    let m = c;
                    u && (n = new AbortController, i = setTimeout(() => n.abort(), u), c ? (m = n.signal, c.addEventListener("abort", () => n.abort())) : m = n.signal);
                    const _ = yield this.fetch(f.toString(), {
                        method: o || "POST",
                        headers: Object.assign(Object.assign(Object.assign({}, h), this.headers), a),
                        body: g,
                        signal: m
                    }).catch(I => {
                        throw new mr(I)
                    }), k = _.headers.get("x-relay-error");
                    if (k && k === "true") throw new ct(_);
                    if (!_.ok) throw new ht(_);
                    let w = ((s = _.headers.get("Content-Type")) !== null && s !== void 0 ? s : "text/plain").split(";")[0].trim(),
                        S;
                    return w === "application/json" ? S = yield _.json(): w === "application/octet-stream" || w === "application/pdf" ? S = yield _.blob(): w === "text/event-stream" ? S = _ : w === "multipart/form-data" ? S = yield _.formData(): S = yield _.text(), {
                        data: S,
                        error: null,
                        response: _
                    }
                } catch (a) {
                    return {
                        data: null,
                        error: a,
                        response: a instanceof ht || a instanceof ct ? a.context : void 0
                    }
                } finally {
                    i && clearTimeout(i)
                }
            })
        }
    },
    Ft = 3,
    ut = t => Math.min(1e3 * 2 ** t, 3e4),
    _r = [520, 503],
    Wt = ["GET", "HEAD", "OPTIONS"],
    dt = class extends Error {
        constructor(t) {
            super(t.message), this.name = "PostgrestError", this.details = t.details, this.hint = t.hint, this.code = t.code
        }
        toJSON() {
            return {
                name: this.name,
                message: this.message,
                details: this.details,
                hint: this.hint,
                code: this.code
            }
        }
    };

function ft(t, e) {
    return new Promise(r => {
        if (e ? .aborted) {
            r();
            return
        }
        const s = setTimeout(() => {
            e ? .removeEventListener("abort", i), r()
        }, t);

        function i() {
            clearTimeout(s), r()
        }
        e ? .addEventListener("abort", i)
    })
}

function br(t, e, r, s) {
    return !(!s || r >= Ft || !Wt.includes(t) || !_r.includes(e))
}
var kr = class {
        constructor(t) {
            var e, r, s, i, n;
            this.shouldThrowOnError = !1, this.retryEnabled = !0, this.method = t.method, this.url = t.url, this.headers = new Headers(t.headers), this.schema = t.schema, this.body = t.body, this.shouldThrowOnError = (e = t.shouldThrowOnError) !== null && e !== void 0 ? e : !1, this.signal = t.signal, this.isMaybeSingle = (r = t.isMaybeSingle) !== null && r !== void 0 ? r : !1, this.shouldStripNulls = (s = t.shouldStripNulls) !== null && s !== void 0 ? s : !1, this.urlLengthLimit = (i = t.urlLengthLimit) !== null && i !== void 0 ? i : 8e3, this.retryEnabled = (n = t.retry) !== null && n !== void 0 ? n : !0, t.fetch ? this.fetch = t.fetch : this.fetch = fetch
        }
        throwOnError() {
            return this.shouldThrowOnError = !0, this
        }
        stripNulls() {
            if (this.headers.get("Accept") === "text/csv") throw new Error("stripNulls() cannot be used with csv()");
            return this.shouldStripNulls = !0, this
        }
        setHeader(t, e) {
            return this.headers = new Headers(this.headers), this.headers.set(t, e), this
        }
        retry(t) {
            return this.retryEnabled = t, this
        }
        then(t, e) {
            var r = this;
            if (this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json"), this.shouldStripNulls) {
                const a = this.headers.get("Accept");
                a === "application/vnd.pgrst.object+json" ? this.headers.set("Accept", "application/vnd.pgrst.object+json;nulls=stripped") : (!a || a === "application/json") && this.headers.set("Accept", "application/vnd.pgrst.array+json;nulls=stripped")
            }
            const s = this.fetch;
            let n = (async () => {
                let a = 0;
                for (;;) {
                    const c = {};
                    r.headers.forEach((h, d) => {
                        c[d] = h
                    }), a > 0 && (c["X-Retry-Count"] = String(a));
                    let u;
                    try {
                        u = await s(r.url.toString(), {
                            method: r.method,
                            headers: c,
                            body: JSON.stringify(r.body, (h, d) => typeof d == "bigint" ? d.toString() : d),
                            signal: r.signal
                        })
                    } catch (h) {
                        if (h ? .name === "AbortError" || h ? .code === "ABORT_ERR" || !Wt.includes(r.method)) throw h;
                        if (r.retryEnabled && a < Ft) {
                            const d = ut(a);
                            a++, await ft(d, r.signal);
                            continue
                        }
                        throw h
                    }
                    if (br(r.method, u.status, a, r.retryEnabled)) {
                        var o, l;
                        const h = (o = (l = u.headers) === null || l === void 0 ? void 0 : l.get("Retry-After")) !== null && o !== void 0 ? o : null,
                            d = h !== null ? Math.max(0, parseInt(h, 10) || 0) * 1e3 : ut(a);
                        await u.text(), a++, await ft(d, r.signal);
                        continue
                    }
                    return await r.processResponse(u)
                }
            })();
            return this.shouldThrowOnError || (n = n.catch(a => {
                var o;
                let l = "",
                    c = "",
                    u = "";
                const h = a ? .cause;
                if (h) {
                    var d, f, g, v;
                    const k = (d = h ? .message) !== null && d !== void 0 ? d : "",
                        w = (f = h ? .code) !== null && f !== void 0 ? f : "";
                    l = `${(g=a?.name)!==null&&g!==void 0?g:"FetchError"}: ${a?.message}`, l += `

Caused by: ${(v=h?.name)!==null&&v!==void 0?v:"Error"}: ${k}`, w && (l += ` (${w})`), h ? .stack && (l += `
${h.stack}`)
                } else {
                    var m;
                    l = (m = a ? .stack) !== null && m !== void 0 ? m : ""
                }
                const _ = this.url.toString().length;
                return a ? .name === "AbortError" || a ? .code === "ABORT_ERR" ? (u = "", c = "Request was aborted (timeout or manual cancellation)", _ > this.urlLengthLimit && (c += `. Note: Your request URL is ${_} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)) : (h ? .name === "HeadersOverflowError" || h ? .code === "UND_ERR_HEADERS_OVERFLOW") && (u = "", c = "HTTP headers exceeded server limits (typically 16KB)", _ > this.urlLengthLimit && (c += `. Your request URL is ${_} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)), {
                    success: !1,
                    error: {
                        message: `${(o=a?.name)!==null&&o!==void 0?o:"FetchError"}: ${a?.message}`,
                        details: l,
                        hint: c,
                        code: u
                    },
                    data: null,
                    count: null,
                    status: 0,
                    statusText: ""
                }
            })), n.then(t, e)
        }
        async processResponse(t) {
            var e = this;
            let r = null,
                s = null,
                i = null,
                n = t.status,
                a = t.statusText;
            if (t.ok) {
                var o, l;
                if (e.method !== "HEAD") {
                    var c;
                    const d = await t.text();
                    if (d !== "")
                        if (e.headers.get("Accept") === "text/csv") s = d;
                        else if (e.headers.get("Accept") && (!((c = e.headers.get("Accept")) === null || c === void 0) && c.includes("application/vnd.pgrst.plan+text"))) s = d;
                    else try {
                        s = JSON.parse(d)
                    } catch {
                        if (r = {
                                message: d
                            }, s = null, e.shouldThrowOnError) throw new dt({
                            message: d,
                            details: "",
                            hint: "",
                            code: ""
                        })
                    }
                }
                const u = (o = e.headers.get("Prefer")) === null || o === void 0 ? void 0 : o.match(/count=(exact|planned|estimated)/),
                    h = (l = t.headers.get("content-range")) === null || l === void 0 ? void 0 : l.split("/");
                u && h && h.length > 1 && (i = parseInt(h[1])), e.isMaybeSingle && Array.isArray(s) && (s.length > 1 ? (r = {
                    code: "PGRST116",
                    details: `Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                    hint: null,
                    message: "JSON object requested, multiple (or no) rows returned"
                }, s = null, i = null, n = 406, a = "Not Acceptable") : s.length === 1 ? s = s[0] : s = null)
            } else {
                const u = await t.text();
                try {
                    r = JSON.parse(u), Array.isArray(r) && t.status === 404 && (s = [], r = null, n = 200, a = "OK")
                } catch {
                    t.status === 404 && u === "" ? (n = 204, a = "No Content") : r = {
                        message: u
                    }
                }
                if (r && e.shouldThrowOnError) throw new dt(r)
            }
            return {
                success: r === null,
                error: r,
                data: s,
                count: i,
                status: n,
                statusText: a
            }
        }
        returns() {
            return this
        }
        overrideTypes() {
            return this
        }
    },
    Sr = class extends kr {
        throwOnError() {
            return super.throwOnError()
        }
        select(t) {
            let e = !1;
            const r = (t ? ? "*").split("").map(s => /\s/.test(s) && !e ? "" : (s === '"' && (e = !e), s)).join("");
            return this.url.searchParams.set("select", r), this.headers.append("Prefer", "return=representation"), this
        }
        order(t, {
            ascending: e = !0,
            nullsFirst: r,
            foreignTable: s,
            referencedTable: i = s
        } = {}) {
            const n = i ? `${i}.order` : "order",
                a = this.url.searchParams.get(n);
            return this.url.searchParams.set(n, `${a?`${a},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`), this
        }
        limit(t, {
            foreignTable: e,
            referencedTable: r = e
        } = {}) {
            const s = typeof r > "u" ? "limit" : `${r}.limit`;
            return this.url.searchParams.set(s, `${t}`), this
        }
        range(t, e, {
            foreignTable: r,
            referencedTable: s = r
        } = {}) {
            const i = typeof s > "u" ? "offset" : `${s}.offset`,
                n = typeof s > "u" ? "limit" : `${s}.limit`;
            return this.url.searchParams.set(i, `${t}`), this.url.searchParams.set(n, `${e-t+1}`), this
        }
        abortSignal(t) {
            return this.signal = t, this
        }
        single() {
            return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this
        }
        maybeSingle() {
            return this.isMaybeSingle = !0, this
        }
        csv() {
            return this.headers.set("Accept", "text/csv"), this
        }
        geojson() {
            return this.headers.set("Accept", "application/geo+json"), this
        }
        explain({
            analyze: t = !1,
            verbose: e = !1,
            settings: r = !1,
            buffers: s = !1,
            wal: i = !1,
            format: n = "text"
        } = {}) {
            var a;
            const o = [t ? "analyze" : null, e ? "verbose" : null, r ? "settings" : null, s ? "buffers" : null, i ? "wal" : null].filter(Boolean).join("|"),
                l = (a = this.headers.get("Accept")) !== null && a !== void 0 ? a : "application/json";
            return this.headers.set("Accept", `application/vnd.pgrst.plan+${n}; for="${l}"; options=${o};`), n === "json" ? this : this
        }
        rollback() {
            return this.headers.append("Prefer", "tx=rollback"), this
        }
        returns() {
            return this
        }
        maxAffected(t) {
            return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${t}`), this
        }
    },
    gt = new RegExp("[,()]"),
    ie = class extends Sr {
        throwOnError() {
            return super.throwOnError()
        }
        eq(t, e) {
            return this.url.searchParams.append(t, `eq.${e}`), this
        }
        neq(t, e) {
            return this.url.searchParams.append(t, `neq.${e}`), this
        }
        gt(t, e) {
            return this.url.searchParams.append(t, `gt.${e}`), this
        }
        gte(t, e) {
            return this.url.searchParams.append(t, `gte.${e}`), this
        }
        lt(t, e) {
            return this.url.searchParams.append(t, `lt.${e}`), this
        }
        lte(t, e) {
            return this.url.searchParams.append(t, `lte.${e}`), this
        }
        like(t, e) {
            return this.url.searchParams.append(t, `like.${e}`), this
        }
        likeAllOf(t, e) {
            return this.url.searchParams.append(t, `like(all).{${e.join(",")}}`), this
        }
        likeAnyOf(t, e) {
            return this.url.searchParams.append(t, `like(any).{${e.join(",")}}`), this
        }
        ilike(t, e) {
            return this.url.searchParams.append(t, `ilike.${e}`), this
        }
        ilikeAllOf(t, e) {
            return this.url.searchParams.append(t, `ilike(all).{${e.join(",")}}`), this
        }
        ilikeAnyOf(t, e) {
            return this.url.searchParams.append(t, `ilike(any).{${e.join(",")}}`), this
        }
        regexMatch(t, e) {
            return this.url.searchParams.append(t, `match.${e}`), this
        }
        regexIMatch(t, e) {
            return this.url.searchParams.append(t, `imatch.${e}`), this
        }
        is(t, e) {
            return this.url.searchParams.append(t, `is.${e}`), this
        }
        isDistinct(t, e) {
            return this.url.searchParams.append(t, `isdistinct.${e}`), this
        } in (t, e) {
            const r = Array.from(new Set(e)).map(s => typeof s == "string" && gt.test(s) ? `"${s}"` : `${s}`).join(",");
            return this.url.searchParams.append(t, `in.(${r})`), this
        }
        notIn(t, e) {
            const r = Array.from(new Set(e)).map(s => typeof s == "string" && gt.test(s) ? `"${s}"` : `${s}`).join(",");
            return this.url.searchParams.append(t, `not.in.(${r})`), this
        }
        contains(t, e) {
            return typeof e == "string" ? this.url.searchParams.append(t, `cs.${e}`) : Array.isArray(e) ? this.url.searchParams.append(t, `cs.{${e.join(",")}}`) : this.url.searchParams.append(t, `cs.${JSON.stringify(e)}`), this
        }
        containedBy(t, e) {
            return typeof e == "string" ? this.url.searchParams.append(t, `cd.${e}`) : Array.isArray(e) ? this.url.searchParams.append(t, `cd.{${e.join(",")}}`) : this.url.searchParams.append(t, `cd.${JSON.stringify(e)}`), this
        }
        rangeGt(t, e) {
            return this.url.searchParams.append(t, `sr.${e}`), this
        }
        rangeGte(t, e) {
            return this.url.searchParams.append(t, `nxl.${e}`), this
        }
        rangeLt(t, e) {
            return this.url.searchParams.append(t, `sl.${e}`), this
        }
        rangeLte(t, e) {
            return this.url.searchParams.append(t, `nxr.${e}`), this
        }
        rangeAdjacent(t, e) {
            return this.url.searchParams.append(t, `adj.${e}`), this
        }
        overlaps(t, e) {
            return typeof e == "string" ? this.url.searchParams.append(t, `ov.${e}`) : this.url.searchParams.append(t, `ov.{${e.join(",")}}`), this
        }
        textSearch(t, e, {
            config: r,
            type: s
        } = {}) {
            let i = "";
            s === "plain" ? i = "pl" : s === "phrase" ? i = "ph" : s === "websearch" && (i = "w");
            const n = r === void 0 ? "" : `(${r})`;
            return this.url.searchParams.append(t, `${i}fts${n}.${e}`), this
        }
        match(t) {
            return Object.entries(t).filter(([e, r]) => r !== void 0).forEach(([e, r]) => {
                this.url.searchParams.append(e, `eq.${r}`)
            }), this
        }
        not(t, e, r) {
            return this.url.searchParams.append(t, `not.${e}.${r}`), this
        }
        or(t, {
            foreignTable: e,
            referencedTable: r = e
        } = {}) {
            const s = r ? `${r}.or` : "or";
            return this.url.searchParams.append(s, `(${t})`), this
        }
        filter(t, e, r) {
            return this.url.searchParams.append(t, `${e}.${r}`), this
        }
    },
    Er = class {
        constructor(t, {
            headers: e = {},
            schema: r,
            fetch: s,
            urlLengthLimit: i = 8e3,
            retry: n
        }) {
            this.url = t, this.headers = new Headers(e), this.schema = r, this.fetch = s, this.urlLengthLimit = i, this.retry = n
        }
        cloneRequestState() {
            return {
                url: new URL(this.url.toString()),
                headers: new Headers(this.headers)
            }
        }
        select(t, e) {
            const {
                head: r = !1,
                count: s
            } = e ? ? {}, i = r ? "HEAD" : "GET";
            let n = !1;
            const a = (t ? ? "*").split("").map(c => /\s/.test(c) && !n ? "" : (c === '"' && (n = !n), c)).join(""),
                {
                    url: o,
                    headers: l
                } = this.cloneRequestState();
            return o.searchParams.set("select", a), s && l.append("Prefer", `count=${s}`), new ie({
                method: i,
                url: o,
                headers: l,
                schema: this.schema,
                fetch: this.fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
        insert(t, {
            count: e,
            defaultToNull: r = !0
        } = {}) {
            var s;
            const i = "POST",
                {
                    url: n,
                    headers: a
                } = this.cloneRequestState();
            if (e && a.append("Prefer", `count=${e}`), r || a.append("Prefer", "missing=default"), Array.isArray(t)) {
                const o = t.reduce((l, c) => l.concat(Object.keys(c)), []);
                if (o.length > 0) {
                    const l = [...new Set(o)].map(c => `"${c}"`);
                    n.searchParams.set("columns", l.join(","))
                }
            }
            return new ie({
                method: i,
                url: n,
                headers: a,
                schema: this.schema,
                body: t,
                fetch: (s = this.fetch) !== null && s !== void 0 ? s : fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
        upsert(t, {
            onConflict: e,
            ignoreDuplicates: r = !1,
            count: s,
            defaultToNull: i = !0
        } = {}) {
            var n;
            const a = "POST",
                {
                    url: o,
                    headers: l
                } = this.cloneRequestState();
            if (l.append("Prefer", `resolution=${r?"ignore":"merge"}-duplicates`), e !== void 0 && o.searchParams.set("on_conflict", e), s && l.append("Prefer", `count=${s}`), i || l.append("Prefer", "missing=default"), Array.isArray(t)) {
                const c = t.reduce((u, h) => u.concat(Object.keys(h)), []);
                if (c.length > 0) {
                    const u = [...new Set(c)].map(h => `"${h}"`);
                    o.searchParams.set("columns", u.join(","))
                }
            }
            return new ie({
                method: a,
                url: o,
                headers: l,
                schema: this.schema,
                body: t,
                fetch: (n = this.fetch) !== null && n !== void 0 ? n : fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
        update(t, {
            count: e
        } = {}) {
            var r;
            const s = "PATCH",
                {
                    url: i,
                    headers: n
                } = this.cloneRequestState();
            return e && n.append("Prefer", `count=${e}`), new ie({
                method: s,
                url: i,
                headers: n,
                schema: this.schema,
                body: t,
                fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
        delete({
            count: t
        } = {}) {
            var e;
            const r = "DELETE",
                {
                    url: s,
                    headers: i
                } = this.cloneRequestState();
            return t && i.append("Prefer", `count=${t}`), new ie({
                method: r,
                url: s,
                headers: i,
                schema: this.schema,
                fetch: (e = this.fetch) !== null && e !== void 0 ? e : fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
    };

function ge(t) {
    "@babel/helpers - typeof";
    return ge = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e
    } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, ge(t)
}

function Tr(t, e) {
    if (ge(t) != "object" || !t) return t;
    var r = t[Symbol.toPrimitive];
    if (r !== void 0) {
        var s = r.call(t, e || "default");
        if (ge(s) != "object") return s;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (e === "string" ? String : Number)(t)
}

function Ar(t) {
    var e = Tr(t, "string");
    return ge(e) == "symbol" ? e : e + ""
}

function Rr(t, e, r) {
    return (e = Ar(e)) in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t
}

function pt(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(t);
        e && (s = s.filter(function(i) {
            return Object.getOwnPropertyDescriptor(t, i).enumerable
        })), r.push.apply(r, s)
    }
    return r
}

function ke(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e] != null ? arguments[e] : {};
        e % 2 ? pt(Object(r), !0).forEach(function(s) {
            Rr(t, s, r[s])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : pt(Object(r)).forEach(function(s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s))
        })
    }
    return t
}
var Or = class Kt {
        constructor(e, {
            headers: r = {},
            schema: s,
            fetch: i,
            timeout: n,
            urlLengthLimit: a = 8e3,
            retry: o
        } = {}) {
            this.url = e, this.headers = new Headers(r), this.schemaName = s, this.urlLengthLimit = a;
            const l = i ? ? globalThis.fetch;
            n !== void 0 && n > 0 ? this.fetch = (c, u) => {
                const h = new AbortController,
                    d = setTimeout(() => h.abort(), n),
                    f = u ? .signal;
                if (f) {
                    if (f.aborted) return clearTimeout(d), l(c, u);
                    const g = () => {
                        clearTimeout(d), h.abort()
                    };
                    return f.addEventListener("abort", g, {
                        once: !0
                    }), l(c, ke(ke({}, u), {}, {
                        signal: h.signal
                    })).finally(() => {
                        clearTimeout(d), f.removeEventListener("abort", g)
                    })
                }
                return l(c, ke(ke({}, u), {}, {
                    signal: h.signal
                })).finally(() => clearTimeout(d))
            } : this.fetch = l, this.retry = o
        }
        from(e) {
            if (!e || typeof e != "string" || e.trim() === "") throw new Error("Invalid relation name: relation must be a non-empty string.");
            return new Er(new URL(`${this.url}/${e}`), {
                headers: new Headers(this.headers),
                schema: this.schemaName,
                fetch: this.fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
        schema(e) {
            return new Kt(this.url, {
                headers: this.headers,
                schema: e,
                fetch: this.fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
        rpc(e, r = {}, {
            head: s = !1,
            get: i = !1,
            count: n
        } = {}) {
            var a;
            let o;
            const l = new URL(`${this.url}/rpc/${e}`);
            let c;
            const u = f => f !== null && typeof f == "object" && (!Array.isArray(f) || f.some(u)),
                h = s && Object.values(r).some(u);
            h ? (o = "POST", c = r) : s || i ? (o = s ? "HEAD" : "GET", Object.entries(r).filter(([f, g]) => g !== void 0).map(([f, g]) => [f, Array.isArray(g) ? `{${g.join(",")}}` : `${g}`]).forEach(([f, g]) => {
                l.searchParams.append(f, g)
            })) : (o = "POST", c = r);
            const d = new Headers(this.headers);
            return h ? d.set("Prefer", n ? `count=${n},return=minimal` : "return=minimal") : n && d.set("Prefer", `count=${n}`), new ie({
                method: o,
                url: l,
                headers: d,
                schema: this.schemaName,
                body: c,
                fetch: (a = this.fetch) !== null && a !== void 0 ? a : fetch,
                urlLengthLimit: this.urlLengthLimit,
                retry: this.retry
            })
        }
    },
    Cr = class {
        constructor() {}
        static detectEnvironment() {
            var t;
            if (typeof WebSocket < "u") return {
                type: "native",
                wsConstructor: WebSocket
            };
            const e = globalThis;
            if (typeof globalThis < "u" && typeof e.WebSocket < "u") return {
                type: "native",
                wsConstructor: e.WebSocket
            };
            const r = typeof global < "u" ? global : void 0;
            if (r && typeof r.WebSocket < "u") return {
                type: "native",
                wsConstructor: r.WebSocket
            };
            if (typeof globalThis < "u" && typeof e.WebSocketPair < "u" && typeof globalThis.WebSocket > "u") return {
                type: "cloudflare",
                error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
                workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
            };
            if (typeof globalThis < "u" && e.EdgeRuntime || typeof navigator < "u" && (!((t = navigator.userAgent) === null || t === void 0) && t.includes("Vercel-Edge"))) return {
                type: "unsupported",
                error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
                workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
            };
            const s = globalThis.process;
            if (s) {
                const i = s.versions;
                if (i && i.node) return {
                    type: "unsupported",
                    error: "Node.js detected but native WebSocket not found.",
                    workaround: "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."
                }
            }
            return {
                type: "unsupported",
                error: "Unknown JavaScript runtime without WebSocket support.",
                workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
            }
        }
        static getWebSocketConstructor() {
            const t = this.detectEnvironment();
            if (t.wsConstructor) return t.wsConstructor;
            let e = t.error || "WebSocket not supported in this environment.";
            throw t.workaround && (e += `

Suggested solution: ${t.workaround}`), new Error(e)
        }
        static isWebSocketSupported() {
            try {
                return this.detectEnvironment().type === "native"
            } catch {
                return !1
            }
        }
    },
    Pr = "2.110.0",
    jr = `realtime-js/${Pr}`,
    Ir = "1.0.0",
    Vt = "2.0.0",
    $r = Vt,
    xr = 1e4,
    V = {
        closed: "closed",
        errored: "errored",
        joined: "joined",
        joining: "joining",
        leaving: "leaving"
    },
    Jt = {
        close: "phx_close",
        error: "phx_error",
        join: "phx_join",
        reply: "phx_reply",
        leave: "phx_leave",
        access_token: "access_token"
    },
    Qe = {
        connecting: "connecting",
        open: "open",
        closing: "closing",
        closed: "closed"
    },
    Nr = class {
        constructor(t) {
            this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = {
                userBroadcastPush: 3,
                userBroadcast: 4
            }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = t ? ? []
        }
        encode(t, e) {
            if (t.event === this.BROADCAST_EVENT && !(t.payload instanceof ArrayBuffer) && typeof t.payload.event == "string") return e(this._binaryEncodeUserBroadcastPush(t));
            let r = [t.join_ref, t.ref, t.topic, t.event, t.payload];
            return e(JSON.stringify(r))
        }
        _binaryEncodeUserBroadcastPush(t) {
            var e;
            return this._isArrayBuffer((e = t.payload) === null || e === void 0 ? void 0 : e.payload) ? this._encodeBinaryUserBroadcastPush(t) : this._encodeJsonUserBroadcastPush(t)
        }
        _encodeBinaryUserBroadcastPush(t) {
            var e, r;
            const s = (r = (e = t.payload) === null || e === void 0 ? void 0 : e.payload) !== null && r !== void 0 ? r : new ArrayBuffer(0);
            return this._encodeUserBroadcastPush(t, this.BINARY_ENCODING, s)
        }
        _encodeJsonUserBroadcastPush(t) {
            var e, r;
            const s = (r = (e = t.payload) === null || e === void 0 ? void 0 : e.payload) !== null && r !== void 0 ? r : {},
                i = new TextEncoder().encode(JSON.stringify(s)).buffer;
            return this._encodeUserBroadcastPush(t, this.JSON_ENCODING, i)
        }
        _encodeUserBroadcastPush(t, e, r) {
            var s, i;
            const n = t.topic,
                a = (s = t.ref) !== null && s !== void 0 ? s : "",
                o = (i = t.join_ref) !== null && i !== void 0 ? i : "",
                l = t.payload.event,
                c = this.allowedMetadataKeys ? this._pick(t.payload, this.allowedMetadataKeys) : {},
                u = Object.keys(c).length === 0 ? "" : JSON.stringify(c);
            if (o.length > 255) throw new Error(`joinRef length ${o.length} exceeds maximum of 255`);
            if (a.length > 255) throw new Error(`ref length ${a.length} exceeds maximum of 255`);
            if (n.length > 255) throw new Error(`topic length ${n.length} exceeds maximum of 255`);
            if (l.length > 255) throw new Error(`userEvent length ${l.length} exceeds maximum of 255`);
            if (u.length > 255) throw new Error(`metadata length ${u.length} exceeds maximum of 255`);
            const h = this.USER_BROADCAST_PUSH_META_LENGTH + o.length + a.length + n.length + l.length + u.length,
                d = new ArrayBuffer(this.HEADER_LENGTH + h);
            let f = new DataView(d),
                g = 0;
            f.setUint8(g++, this.KINDS.userBroadcastPush), f.setUint8(g++, o.length), f.setUint8(g++, a.length), f.setUint8(g++, n.length), f.setUint8(g++, l.length), f.setUint8(g++, u.length), f.setUint8(g++, e), Array.from(o, m => f.setUint8(g++, m.charCodeAt(0))), Array.from(a, m => f.setUint8(g++, m.charCodeAt(0))), Array.from(n, m => f.setUint8(g++, m.charCodeAt(0))), Array.from(l, m => f.setUint8(g++, m.charCodeAt(0))), Array.from(u, m => f.setUint8(g++, m.charCodeAt(0)));
            var v = new Uint8Array(d.byteLength + r.byteLength);
            return v.set(new Uint8Array(d), 0), v.set(new Uint8Array(r), d.byteLength), v.buffer
        }
        decode(t, e) {
            if (this._isArrayBuffer(t)) return e(this._binaryDecode(t));
            if (typeof t == "string") {
                const [r, s, i, n, a] = JSON.parse(t);
                return e({
                    join_ref: r,
                    ref: s,
                    topic: i,
                    event: n,
                    payload: a
                })
            }
            return e({})
        }
        _binaryDecode(t) {
            const e = new DataView(t),
                r = e.getUint8(0),
                s = new TextDecoder;
            switch (r) {
                case this.KINDS.userBroadcast:
                    return this._decodeUserBroadcast(t, e, s)
            }
        }
        _decodeUserBroadcast(t, e, r) {
            const s = e.getUint8(1),
                i = e.getUint8(2),
                n = e.getUint8(3),
                a = e.getUint8(4);
            let o = this.HEADER_LENGTH + 4;
            const l = r.decode(t.slice(o, o + s));
            o = o + s;
            const c = r.decode(t.slice(o, o + i));
            o = o + i;
            const u = r.decode(t.slice(o, o + n));
            o = o + n;
            const h = t.slice(o, t.byteLength),
                d = a === this.JSON_ENCODING ? JSON.parse(r.decode(h)) : h,
                f = {
                    type: this.BROADCAST_EVENT,
                    event: c,
                    payload: d
                };
            return n > 0 && (f.meta = JSON.parse(u)), {
                join_ref: null,
                ref: null,
                topic: l,
                event: this.BROADCAST_EVENT,
                payload: f
            }
        }
        _isArrayBuffer(t) {
            var e;
            return t instanceof ArrayBuffer || ((e = t ? .constructor) === null || e === void 0 ? void 0 : e.name) === "ArrayBuffer"
        }
        _pick(t, e) {
            return !t || typeof t != "object" ? {} : Object.fromEntries(Object.entries(t).filter(([r]) => e.includes(r)))
        }
    },
    E;
(function(t) {
    t.abstime = "abstime", t.bool = "bool", t.date = "date", t.daterange = "daterange", t.float4 = "float4", t.float8 = "float8", t.int2 = "int2", t.int4 = "int4", t.int4range = "int4range", t.int8 = "int8", t.int8range = "int8range", t.json = "json", t.jsonb = "jsonb", t.money = "money", t.numeric = "numeric", t.oid = "oid", t.reltime = "reltime", t.text = "text", t.time = "time", t.timestamp = "timestamp", t.timestamptz = "timestamptz", t.timetz = "timetz", t.tsrange = "tsrange", t.tstzrange = "tstzrange"
})(E || (E = {}));
var vt = (t, e, r = {}) => {
        var s;
        const i = (s = r.skipTypes) !== null && s !== void 0 ? s : [];
        return e ? Object.keys(e).reduce((n, a) => (n[a] = Ur(a, t, e, i), n), {}) : {}
    },
    Ur = (t, e, r, s) => {
        const i = e.find(o => o.name === t),
            n = i ? .type,
            a = r[t];
        return n && !s.includes(n) ? Gt(n, a) : Ze(a)
    },
    Gt = (t, e) => {
        if (t.charAt(0) === "_") return qr(e, t.slice(1, t.length));
        switch (t) {
            case E.bool:
                return Lr(e);
            case E.float4:
            case E.float8:
            case E.int2:
            case E.int4:
            case E.int8:
            case E.numeric:
            case E.oid:
                return Dr(e);
            case E.json:
            case E.jsonb:
                return Br(e);
            case E.timestamp:
                return Hr(e);
            case E.abstime:
            case E.date:
            case E.daterange:
            case E.int4range:
            case E.int8range:
            case E.money:
            case E.reltime:
            case E.text:
            case E.time:
            case E.timestamptz:
            case E.timetz:
            case E.tsrange:
            case E.tstzrange:
                return Ze(e);
            default:
                return Ze(e)
        }
    },
    Ze = t => t,
    Lr = t => {
        switch (t) {
            case "t":
                return !0;
            case "f":
                return !1;
            default:
                return t
        }
    },
    Dr = t => {
        if (typeof t == "string") {
            const e = parseFloat(t);
            if (!Number.isNaN(e)) return e
        }
        return t
    },
    Br = t => {
        if (typeof t == "string") try {
            return JSON.parse(t)
        } catch {
            return t
        }
        return t
    },
    qr = (t, e) => {
        if (typeof t != "string") return t;
        const r = t.length - 1,
            s = t[r];
        if (t[0] === "{" && s === "}") {
            let i;
            const n = t.slice(1, r);
            try {
                i = JSON.parse("[" + n + "]")
            } catch {
                i = n ? n.split(",") : []
            }
            return i.map(a => Gt(e, a))
        }
        return t
    },
    Hr = t => typeof t == "string" ? t.replace(" ", "T") : t,
    zt = t => {
        const e = new URL(t);
        return e.protocol = e.protocol.replace(/^ws/i, "http"), e.pathname = e.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), e.pathname === "" || e.pathname === "/" ? e.pathname = "/api/broadcast" : e.pathname = e.pathname + "/api/broadcast", e.href
    },
    fe = t => typeof t == "function" ? t : function() {
        return t
    },
    Mr = typeof self < "u" ? self : null,
    ne = typeof window < "u" ? window : null,
    q = Mr || ne || globalThis,
    Fr = "2.0.0",
    Wr = 1e4,
    Kr = 1e3,
    H = {
        connecting: 0,
        open: 1,
        closing: 2,
        closed: 3
    },
    $ = {
        closed: "closed",
        errored: "errored",
        joined: "joined",
        joining: "joining",
        leaving: "leaving"
    },
    W = {
        close: "phx_close",
        error: "phx_error",
        join: "phx_join",
        reply: "phx_reply",
        leave: "phx_leave"
    },
    et = {
        longpoll: "longpoll",
        websocket: "websocket"
    },
    Vr = {
        complete: 4
    },
    tt = "base64url.bearer.phx.",
    Se = class {
        constructor(t, e, r, s) {
            this.channel = t, this.event = e, this.payload = r || function() {
                return {}
            }, this.receivedResp = null, this.timeout = s, this.timeoutTimer = null, this.recHooks = [], this.sent = !1, this.ref = void 0
        }
        resend(t) {
            this.timeout = t, this.reset(), this.send()
        }
        send() {
            this.hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
                topic: this.channel.topic,
                event: this.event,
                payload: this.payload(),
                ref: this.ref,
                join_ref: this.channel.joinRef()
            }))
        }
        receive(t, e) {
            return this.hasReceived(t) && e(this.receivedResp.response), this.recHooks.push({
                status: t,
                callback: e
            }), this
        }
        reset() {
            this.cancelRefEvent(), this.ref = null, this.refEvent = null, this.receivedResp = null, this.sent = !1
        }
        destroy() {
            this.cancelRefEvent(), this.cancelTimeout()
        }
        matchReceive({
            status: t,
            response: e,
            _ref: r
        }) {
            this.recHooks.filter(s => s.status === t).forEach(s => s.callback(e))
        }
        cancelRefEvent() {
            this.refEvent && this.channel.off(this.refEvent)
        }
        cancelTimeout() {
            clearTimeout(this.timeoutTimer), this.timeoutTimer = null
        }
        startTimeout() {
            this.timeoutTimer && this.cancelTimeout(), this.ref = this.channel.socket.makeRef(), this.refEvent = this.channel.replyEventName(this.ref), this.channel.on(this.refEvent, t => {
                this.cancelRefEvent(), this.cancelTimeout(), this.receivedResp = t, this.matchReceive(t)
            }), this.timeoutTimer = setTimeout(() => {
                this.trigger("timeout", {})
            }, this.timeout)
        }
        hasReceived(t) {
            return this.receivedResp && this.receivedResp.status === t
        }
        trigger(t, e) {
            this.channel.trigger(this.refEvent, {
                status: t,
                response: e
            })
        }
    },
    Yt = class {
        constructor(t, e) {
            this.callback = t, this.timerCalc = e, this.timer = void 0, this.tries = 0
        }
        reset() {
            this.tries = 0, clearTimeout(this.timer)
        }
        scheduleTimeout() {
            clearTimeout(this.timer), this.timer = setTimeout(() => {
                this.tries = this.tries + 1, this.callback()
            }, this.timerCalc(this.tries + 1))
        }
    },
    Jr = class {
        constructor(t, e, r) {
            this.state = $.closed, this.topic = t, this.params = fe(e || {}), this.socket = r, this.bindings = [], this.bindingRef = 0, this.timeout = this.socket.timeout, this.joinedOnce = !1, this.joinPush = new Se(this, W.join, this.params, this.timeout), this.pushBuffer = [], this.stateChangeRefs = [], this.rejoinTimer = new Yt(() => {
                this.socket.isConnected() && this.rejoin()
            }, this.socket.rejoinAfterMs), this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())), this.stateChangeRefs.push(this.socket.onOpen(() => {
                this.rejoinTimer.reset(), this.isErrored() && this.rejoin()
            })), this.joinPush.receive("ok", () => {
                this.state = $.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach(s => s.send()), this.pushBuffer = []
            }), this.joinPush.receive("error", s => {
                this.state = $.errored, this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, s), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout()
            }), this.onClose(() => {
                this.rejoinTimer.reset(), this.socket.hasLogger() && this.socket.log("channel", `close ${this.topic}`), this.state = $.closed, this.socket.remove(this)
            }), this.onError(s => {
                this.socket.hasLogger() && this.socket.log("channel", `error ${this.topic}`, s), this.isJoining() && this.joinPush.reset(), this.state = $.errored, this.socket.isConnected() && this.rejoinTimer.scheduleTimeout()
            }), this.joinPush.receive("timeout", () => {
                this.socket.hasLogger() && this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), new Se(this, W.leave, fe({}), this.timeout).send(), this.state = $.errored, this.joinPush.reset(), this.socket.isConnected() && this.rejoinTimer.scheduleTimeout()
            }), this.on(W.reply, (s, i) => {
                this.trigger(this.replyEventName(i), s)
            })
        }
        join(t = this.timeout) {
            if (this.joinedOnce) throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
            return this.timeout = t, this.joinedOnce = !0, this.rejoin(), this.joinPush
        }
        teardown() {
            this.pushBuffer.forEach(t => t.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = $.closed, this.bindings = []
        }
        onClose(t) {
            this.on(W.close, t)
        }
        onError(t) {
            return this.on(W.error, e => t(e))
        }
        on(t, e) {
            let r = this.bindingRef++;
            return this.bindings.push({
                event: t,
                ref: r,
                callback: e
            }), r
        }
        off(t, e) {
            this.bindings = this.bindings.filter(r => !(r.event === t && (typeof e > "u" || e === r.ref)))
        }
        canPush() {
            return this.socket.isConnected() && this.isJoined()
        }
        push(t, e, r = this.timeout) {
            if (e = e || {}, !this.joinedOnce) throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
            let s = new Se(this, t, function() {
                return e
            }, r);
            return this.canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s
        }
        leave(t = this.timeout) {
            this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), this.state = $.leaving;
            let e = () => {
                    this.socket.hasLogger() && this.socket.log("channel", `leave ${this.topic}`), this.trigger(W.close, "leave")
                },
                r = new Se(this, W.leave, fe({}), t);
            return r.receive("ok", () => e()).receive("timeout", () => e()), r.send(), this.canPush() || r.trigger("ok", {}), r
        }
        onMessage(t, e, r) {
            return e
        }
        filterBindings(t, e, r) {
            return !0
        }
        isMember(t, e, r, s) {
            return this.topic !== t ? !1 : s && s !== this.joinRef() ? (this.socket.hasLogger() && this.socket.log("channel", "dropping outdated message", {
                topic: t,
                event: e,
                payload: r,
                joinRef: s
            }), !1) : !0
        }
        joinRef() {
            return this.joinPush.ref
        }
        rejoin(t = this.timeout) {
            this.isLeaving() || (this.socket.leaveOpenTopic(this.topic), this.state = $.joining, this.joinPush.resend(t))
        }
        trigger(t, e, r, s) {
            let i = this.onMessage(t, e, r, s);
            if (e && !i) throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
            let n = this.bindings.filter(a => a.event === t && this.filterBindings(a, e, r));
            for (let a = 0; a < n.length; a++) n[a].callback(i, r, s || this.joinRef())
        }
        replyEventName(t) {
            return `chan_reply_${t}`
        }
        isClosed() {
            return this.state === $.closed
        }
        isErrored() {
            return this.state === $.errored
        }
        isJoined() {
            return this.state === $.joined
        }
        isJoining() {
            return this.state === $.joining
        }
        isLeaving() {
            return this.state === $.leaving
        }
    },
    $e = class {
        static request(t, e, r, s, i, n, a) {
            if (q.XDomainRequest) {
                let o = new q.XDomainRequest;
                return this.xdomainRequest(o, t, e, s, i, n, a)
            } else if (q.XMLHttpRequest) {
                let o = new q.XMLHttpRequest;
                return this.xhrRequest(o, t, e, r, s, i, n, a)
            } else {
                if (q.fetch && q.AbortController) return this.fetchRequest(t, e, r, s, i, n, a);
                throw new Error("No suitable XMLHttpRequest implementation found")
            }
        }
        static fetchRequest(t, e, r, s, i, n, a) {
            let o = {
                    method: t,
                    headers: r,
                    body: s
                },
                l = null;
            return i && (l = new AbortController, setTimeout(() => l.abort(), i), o.signal = l.signal), q.fetch(e, o).then(c => c.text()).then(c => this.parseJSON(c)).then(c => a && a(c)).catch(c => {
                c.name === "AbortError" && n ? n() : a && a(null)
            }), l
        }
        static xdomainRequest(t, e, r, s, i, n, a) {
            return t.timeout = i, t.open(e, r), t.onload = () => {
                let o = this.parseJSON(t.responseText);
                a && a(o)
            }, n && (t.ontimeout = n), t.onprogress = () => {}, t.send(s), t
        }
        static xhrRequest(t, e, r, s, i, n, a, o) {
            t.open(e, r, !0), t.timeout = n;
            for (let [l, c] of Object.entries(s)) t.setRequestHeader(l, c);
            return t.onerror = () => o && o(null), t.onreadystatechange = () => {
                t.readyState === Vr.complete && o && o(this.parseJSON(t.responseText))
            }, a && (t.ontimeout = a), t.send(i), t
        }
        static parseJSON(t) {
            if (!t || t === "") return null;
            try {
                return JSON.parse(t)
            } catch {
                return null
            }
        }
        static serialize(t, e) {
            let r = [];
            for (var s in t) {
                if (!Object.prototype.hasOwnProperty.call(t, s)) continue;
                let i = e ? `${e}[${s}]` : s,
                    n = t[s];
                typeof n == "object" ? r.push(this.serialize(n, i)) : r.push(encodeURIComponent(i) + "=" + encodeURIComponent(n))
            }
            return r.join("&")
        }
        static appendParams(t, e) {
            return Object.keys(e).length === 0 ? t : `${t}${t.match(/\?/)?"&":"?"}${this.serialize(e)}`
        }
    },
    Gr = t => {
        let e = "",
            r = new Uint8Array(t),
            s = r.byteLength;
        for (let i = 0; i < s; i++) e += String.fromCharCode(r[i]);
        return btoa(e)
    },
    ee = class {
        constructor(t, e) {
            e && e.length === 2 && e[1].startsWith(tt) && (this.authToken = atob(e[1].slice(tt.length))), this.endPoint = null, this.token = null, this.skipHeartbeat = !0, this.reqs = new Set, this.awaitingBatchAck = !1, this.currentBatch = null, this.currentBatchTimer = null, this.batchBuffer = [], this.onopen = function() {}, this.onerror = function() {}, this.onmessage = function() {}, this.onclose = function() {}, this.pollEndpoint = this.normalizeEndpoint(t), this.readyState = H.connecting, setTimeout(() => this.poll(), 0)
        }
        normalizeEndpoint(t) {
            return t.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + et.websocket), "$1/" + et.longpoll)
        }
        endpointURL() {
            return $e.appendParams(this.pollEndpoint, {
                token: this.token
            })
        }
        closeAndRetry(t, e, r) {
            this.close(t, e, r), this.readyState = H.connecting
        }
        ontimeout() {
            this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1)
        }
        isActive() {
            return this.readyState === H.open || this.readyState === H.connecting
        }
        poll() {
            const t = {
                Accept: "application/json"
            };
            this.authToken && (t["X-Phoenix-AuthToken"] = this.authToken), this.ajax("GET", t, null, () => this.ontimeout(), e => {
                if (e) {
                    var {
                        status: r,
                        token: s,
                        messages: i
                    } = e;
                    if (r === 410 && this.token !== null) {
                        this.onerror(410), this.closeAndRetry(3410, "session_gone", !1);
                        return
                    }
                    this.token = s
                } else r = 0;
                switch (r) {
                    case 200:
                        i.forEach(n => {
                            setTimeout(() => this.onmessage({
                                data: n
                            }), 0)
                        }), this.poll();
                        break;
                    case 204:
                        this.poll();
                        break;
                    case 410:
                        this.readyState = H.open, this.onopen({}), this.poll();
                        break;
                    case 403:
                        this.onerror(403), this.close(1008, "forbidden", !1);
                        break;
                    case 0:
                    case 500:
                        this.onerror(500), this.closeAndRetry(1011, "internal server error", 500);
                        break;
                    default:
                        throw new Error(`unhandled poll status ${r}`)
                }
            })
        }
        send(t) {
            typeof t != "string" && (t = Gr(t)), this.currentBatch ? this.currentBatch.push(t) : this.awaitingBatchAck ? this.batchBuffer.push(t) : (this.currentBatch = [t], this.currentBatchTimer = setTimeout(() => {
                this.batchSend(this.currentBatch), this.currentBatch = null
            }, 0))
        }
        batchSend(t) {
            this.awaitingBatchAck = !0, this.ajax("POST", {
                "Content-Type": "application/x-ndjson"
            }, t.join(`
`), () => this.onerror("timeout"), e => {
                this.awaitingBatchAck = !1, !e || e.status !== 200 ? (this.onerror(e && e.status), this.closeAndRetry(1011, "internal server error", !1)) : this.batchBuffer.length > 0 && (this.batchSend(this.batchBuffer), this.batchBuffer = [])
            })
        }
        close(t, e, r) {
            for (let i of this.reqs) i.abort();
            this.readyState = H.closed;
            let s = Object.assign({
                code: 1e3,
                reason: void 0,
                wasClean: !0
            }, {
                code: t,
                reason: e,
                wasClean: r
            });
            this.batchBuffer = [], clearTimeout(this.currentBatchTimer), this.currentBatchTimer = null, typeof CloseEvent < "u" ? this.onclose(new CloseEvent("close", s)) : this.onclose(s)
        }
        ajax(t, e, r, s, i) {
            let n, a = () => {
                this.reqs.delete(n), s()
            };
            n = $e.request(t, this.endpointURL(), e, r, this.timeout, a, o => {
                this.reqs.delete(n), this.isActive() && i(o)
            }), this.reqs.add(n)
        }
    },
    zr = class ue {
        constructor(e, r = {}) {
            let s = r.events || {
                state: "presence_state",
                diff: "presence_diff"
            };
            this.state = {}, this.pendingDiffs = [], this.channel = e, this.joinRef = null, this.caller = {
                onJoin: function() {},
                onLeave: function() {},
                onSync: function() {}
            }, this.channel.on(s.state, i => {
                let {
                    onJoin: n,
                    onLeave: a,
                    onSync: o
                } = this.caller;
                this.joinRef = this.channel.joinRef(), this.state = ue.syncState(this.state, i, n, a), this.pendingDiffs.forEach(l => {
                    this.state = ue.syncDiff(this.state, l, n, a)
                }), this.pendingDiffs = [], o()
            }), this.channel.on(s.diff, i => {
                let {
                    onJoin: n,
                    onLeave: a,
                    onSync: o
                } = this.caller;
                this.inPendingSyncState() ? this.pendingDiffs.push(i) : (this.state = ue.syncDiff(this.state, i, n, a), o())
            })
        }
        onJoin(e) {
            this.caller.onJoin = e
        }
        onLeave(e) {
            this.caller.onLeave = e
        }
        onSync(e) {
            this.caller.onSync = e
        }
        list(e) {
            return ue.list(this.state, e)
        }
        inPendingSyncState() {
            return !this.joinRef || this.joinRef !== this.channel.joinRef()
        }
        static syncState(e, r, s, i) {
            let n = this.clone(e),
                a = {},
                o = {};
            return this.map(n, (l, c) => {
                r[l] || (o[l] = c)
            }), this.map(r, (l, c) => {
                let u = n[l];
                if (u) {
                    let h = c.metas.map(v => v.phx_ref),
                        d = u.metas.map(v => v.phx_ref),
                        f = c.metas.filter(v => d.indexOf(v.phx_ref) < 0),
                        g = u.metas.filter(v => h.indexOf(v.phx_ref) < 0);
                    f.length > 0 && (a[l] = c, a[l].metas = f), g.length > 0 && (o[l] = this.clone(u), o[l].metas = g)
                } else a[l] = c
            }), this.syncDiff(n, {
                joins: a,
                leaves: o
            }, s, i)
        }
        static syncDiff(e, r, s, i) {
            let {
                joins: n,
                leaves: a
            } = this.clone(r);
            return s || (s = function() {}), i || (i = function() {}), this.map(n, (o, l) => {
                let c = e[o];
                if (e[o] = this.clone(l), c) {
                    let u = e[o].metas.map(d => d.phx_ref),
                        h = c.metas.filter(d => u.indexOf(d.phx_ref) < 0);
                    e[o].metas.unshift(...h)
                }
                s(o, c, l)
            }), this.map(a, (o, l) => {
                let c = e[o];
                if (!c) return;
                let u = l.metas.map(h => h.phx_ref);
                c.metas = c.metas.filter(h => u.indexOf(h.phx_ref) < 0), i(o, c, l), c.metas.length === 0 && delete e[o]
            }), e
        }
        static list(e, r) {
            return r || (r = function(s, i) {
                return i
            }), this.map(e, (s, i) => r(s, i))
        }
        static map(e, r) {
            return Object.getOwnPropertyNames(e).map(s => r(s, e[s]))
        }
        static clone(e) {
            return JSON.parse(JSON.stringify(e))
        }
    },
    Ee = {
        HEADER_LENGTH: 1,
        META_LENGTH: 4,
        KINDS: {
            push: 0,
            reply: 1,
            broadcast: 2
        },
        encode(t, e) {
            if (t.payload.constructor === ArrayBuffer) return e(this.binaryEncode(t)); {
                let r = [t.join_ref, t.ref, t.topic, t.event, t.payload];
                return e(JSON.stringify(r))
            }
        },
        decode(t, e) {
            if (t.constructor === ArrayBuffer) return e(this.binaryDecode(t)); {
                let [r, s, i, n, a] = JSON.parse(t);
                return e({
                    join_ref: r,
                    ref: s,
                    topic: i,
                    event: n,
                    payload: a
                })
            }
        },
        binaryEncode(t) {
            let {
                join_ref: e,
                ref: r,
                event: s,
                topic: i,
                payload: n
            } = t, a = this.META_LENGTH + e.length + r.length + i.length + s.length, o = new ArrayBuffer(this.HEADER_LENGTH + a), l = new DataView(o), c = 0;
            l.setUint8(c++, this.KINDS.push), l.setUint8(c++, e.length), l.setUint8(c++, r.length), l.setUint8(c++, i.length), l.setUint8(c++, s.length), Array.from(e, h => l.setUint8(c++, h.charCodeAt(0))), Array.from(r, h => l.setUint8(c++, h.charCodeAt(0))), Array.from(i, h => l.setUint8(c++, h.charCodeAt(0))), Array.from(s, h => l.setUint8(c++, h.charCodeAt(0)));
            var u = new Uint8Array(o.byteLength + n.byteLength);
            return u.set(new Uint8Array(o), 0), u.set(new Uint8Array(n), o.byteLength), u.buffer
        },
        binaryDecode(t) {
            let e = new DataView(t),
                r = e.getUint8(0),
                s = new TextDecoder;
            switch (r) {
                case this.KINDS.push:
                    return this.decodePush(t, e, s);
                case this.KINDS.reply:
                    return this.decodeReply(t, e, s);
                case this.KINDS.broadcast:
                    return this.decodeBroadcast(t, e, s)
            }
        },
        decodePush(t, e, r) {
            let s = e.getUint8(1),
                i = e.getUint8(2),
                n = e.getUint8(3),
                a = this.HEADER_LENGTH + this.META_LENGTH - 1,
                o = r.decode(t.slice(a, a + s));
            a = a + s;
            let l = r.decode(t.slice(a, a + i));
            a = a + i;
            let c = r.decode(t.slice(a, a + n));
            return a = a + n, {
                join_ref: o,
                ref: null,
                topic: l,
                event: c,
                payload: t.slice(a, t.byteLength)
            }
        },
        decodeReply(t, e, r) {
            let s = e.getUint8(1),
                i = e.getUint8(2),
                n = e.getUint8(3),
                a = e.getUint8(4),
                o = this.HEADER_LENGTH + this.META_LENGTH,
                l = r.decode(t.slice(o, o + s));
            o = o + s;
            let c = r.decode(t.slice(o, o + i));
            o = o + i;
            let u = r.decode(t.slice(o, o + n));
            o = o + n;
            let h = r.decode(t.slice(o, o + a));
            o = o + a;
            let d = {
                status: h,
                response: t.slice(o, t.byteLength)
            };
            return {
                join_ref: l,
                ref: c,
                topic: u,
                event: W.reply,
                payload: d
            }
        },
        decodeBroadcast(t, e, r) {
            let s = e.getUint8(1),
                i = e.getUint8(2),
                n = this.HEADER_LENGTH + 2,
                a = r.decode(t.slice(n, n + s));
            n = n + s;
            let o = r.decode(t.slice(n, n + i));
            return n = n + i, {
                join_ref: null,
                ref: null,
                topic: a,
                event: o,
                payload: t.slice(n, t.byteLength)
            }
        }
    },
    Yr = class {
        constructor(t, e = {}) {
            this.stateChangeCallbacks = {
                open: [],
                close: [],
                error: [],
                message: []
            }, this.channels = [], this.sendBuffer = [], this.ref = 0, this.fallbackRef = null, this.timeout = e.timeout || Wr, this.transport = e.transport || q.WebSocket || ee, this.conn = void 0, this.primaryPassedHealthCheck = !1, this.longPollFallbackMs = e.longPollFallbackMs, this.fallbackTimer = null;
            let r = null;
            try {
                r = q && q.sessionStorage
            } catch {}
            this.sessionStore = e.sessionStorage || r, this.establishedConnections = 0, this.defaultEncoder = Ee.encode.bind(Ee), this.defaultDecoder = Ee.decode.bind(Ee), this.closeWasClean = !0, this.disconnecting = !1, this.binaryType = e.binaryType || "arraybuffer", this.connectClock = 1, this.pageHidden = !1, this.encode = void 0, this.decode = void 0, this.transport !== ee ? (this.encode = e.encode || this.defaultEncoder, this.decode = e.decode || this.defaultDecoder) : (this.encode = this.defaultEncoder, this.decode = this.defaultDecoder);
            let s = null;
            ne && ne.addEventListener && (ne.addEventListener("pagehide", i => {
                this.conn && (this.disconnect(), s = this.connectClock)
            }), ne.addEventListener("pageshow", i => {
                s === this.connectClock && (s = null, this.connect())
            }), ne.addEventListener("visibilitychange", () => {
                document.visibilityState === "hidden" ? this.pageHidden = !0 : (this.pageHidden = !1, !this.isConnected() && !this.closeWasClean && this.teardown(() => this.connect()))
            })), this.heartbeatIntervalMs = e.heartbeatIntervalMs || 3e4, this.autoSendHeartbeat = e.autoSendHeartbeat ? ? !0, this.heartbeatCallback = e.heartbeatCallback ? ? (() => {}), this.rejoinAfterMs = i => e.rejoinAfterMs ? e.rejoinAfterMs(i) : [1e3, 2e3, 5e3][i - 1] || 1e4, this.reconnectAfterMs = i => e.reconnectAfterMs ? e.reconnectAfterMs(i) : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][i - 1] || 5e3, this.logger = e.logger || null, !this.logger && e.debug && (this.logger = (i, n, a) => {}), this.longpollerTimeout = e.longpollerTimeout || 2e4, this.params = fe(e.params || {}), this.endPoint = `${t}/${et.websocket}`, this.vsn = e.vsn || Fr, this.heartbeatTimeoutTimer = null, this.heartbeatTimer = null, this.heartbeatSentAt = null, this.pendingHeartbeatRef = null, this.reconnectTimer = new Yt(() => {
                if (this.pageHidden) {
                    this.log("Not reconnecting as page is hidden!"), this.teardown();
                    return
                }
                this.teardown(async () => {
                    e.beforeReconnect && await e.beforeReconnect(), this.connect()
                })
            }, this.reconnectAfterMs), this.authToken = e.authToken
        }
        getLongPollTransport() {
            return ee
        }
        replaceTransport(t) {
            this.connectClock++, this.closeWasClean = !0, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.conn && (this.conn.close(), this.conn = null), this.transport = t
        }
        protocol() {
            return location.protocol.match(/^https/) ? "wss" : "ws"
        }
        endPointURL() {
            let t = $e.appendParams($e.appendParams(this.endPoint, this.params()), {
                vsn: this.vsn
            });
            return t.charAt(0) !== "/" ? t : t.charAt(1) === "/" ? `${this.protocol()}:${t}` : `${this.protocol()}://${location.host}${t}`
        }
        disconnect(t, e, r) {
            this.connectClock++, this.disconnecting = !0, this.closeWasClean = !0, clearTimeout(this.fallbackTimer), this.reconnectTimer.reset(), this.teardown(() => {
                this.disconnecting = !1, t && t()
            }, e, r)
        }
        connect(t) {
            t && (this.params = fe(t)), !(this.conn && !this.disconnecting) && (this.longPollFallbackMs && this.transport !== ee ? this.connectWithFallback(ee, this.longPollFallbackMs) : this.transportConnect())
        }
        log(t, e, r) {
            this.logger && this.logger(t, e, r)
        }
        hasLogger() {
            return this.logger !== null
        }
        onOpen(t) {
            let e = this.makeRef();
            return this.stateChangeCallbacks.open.push([e, t]), e
        }
        onClose(t) {
            let e = this.makeRef();
            return this.stateChangeCallbacks.close.push([e, t]), e
        }
        onError(t) {
            let e = this.makeRef();
            return this.stateChangeCallbacks.error.push([e, t]), e
        }
        onMessage(t) {
            let e = this.makeRef();
            return this.stateChangeCallbacks.message.push([e, t]), e
        }
        onHeartbeat(t) {
            this.heartbeatCallback = t
        }
        ping(t) {
            if (!this.isConnected()) return !1;
            let e = this.makeRef(),
                r = Date.now();
            this.push({
                topic: "phoenix",
                event: "heartbeat",
                payload: {},
                ref: e
            });
            let s = this.onMessage(i => {
                i.ref === e && (this.off([s]), t(Date.now() - r))
            });
            return !0
        }
        transportName(t) {
            switch (t) {
                case ee:
                    return "LongPoll";
                default:
                    return t.name
            }
        }
        transportConnect() {
            this.connectClock++, this.closeWasClean = !1;
            let t;
            this.authToken && (t = ["phoenix", `${tt}${btoa(this.authToken).replace(/=/g,"")}`]), this.conn = new this.transport(this.endPointURL(), t), this.conn.binaryType = this.binaryType, this.conn.timeout = this.longpollerTimeout, this.conn.onopen = () => this.onConnOpen(), this.conn.onerror = e => this.onConnError(e), this.conn.onmessage = e => this.onConnMessage(e), this.conn.onclose = e => this.onConnClose(e)
        }
        getSession(t) {
            return this.sessionStore && this.sessionStore.getItem(t)
        }
        storeSession(t, e) {
            this.sessionStore && this.sessionStore.setItem(t, e)
        }
        connectWithFallback(t, e = 2500) {
            clearTimeout(this.fallbackTimer);
            let r = !1,
                s = !0,
                i, n, a = this.transportName(t),
                o = l => {
                    this.log("transport", `falling back to ${a}...`, l), this.off([i, n]), s = !1, this.replaceTransport(t), this.transportConnect()
                };
            if (this.getSession(`phx:fallback:${a}`)) return o("memorized");
            this.fallbackTimer = setTimeout(o, e), n = this.onError(l => {
                this.log("transport", "error", l), s && !r && (clearTimeout(this.fallbackTimer), o(l))
            }), this.fallbackRef && this.off([this.fallbackRef]), this.fallbackRef = this.onOpen(() => {
                if (r = !0, !s) {
                    let l = this.transportName(t);
                    return this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${l}`, "true"), this.log("transport", `established ${l} fallback`)
                }
                clearTimeout(this.fallbackTimer), this.fallbackTimer = setTimeout(o, e), this.ping(l => {
                    this.log("transport", "connected to primary after", l), this.primaryPassedHealthCheck = !0, clearTimeout(this.fallbackTimer)
                })
            }), this.transportConnect()
        }
        clearHeartbeats() {
            clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer)
        }
        onConnOpen() {
            this.hasLogger() && this.log("transport", `connected to ${this.endPointURL()}`), this.closeWasClean = !1, this.disconnecting = !1, this.establishedConnections++, this.flushSendBuffer(), this.reconnectTimer.reset(), this.autoSendHeartbeat && this.resetHeartbeat(), this.triggerStateCallbacks("open")
        }
        heartbeatTimeout() {
            if (this.pendingHeartbeatRef) {
                this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.hasLogger() && this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
                try {
                    this.heartbeatCallback("timeout")
                } catch (t) {
                    this.log("error", "error in heartbeat callback", t)
                }
                this.triggerChanError(new Error("heartbeat timeout")), this.closeWasClean = !1, this.teardown(() => this.reconnectTimer.scheduleTimeout(), Kr, "heartbeat timeout")
            }
        }
        resetHeartbeat() {
            this.conn && this.conn.skipHeartbeat || (this.pendingHeartbeatRef = null, this.clearHeartbeats(), this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs))
        }
        teardown(t, e, r) {
            if (!this.conn) return t && t();
            const s = this.conn;
            this.waitForBufferDone(s, () => {
                e ? s.close(e, r || "") : s.close(), this.waitForSocketClosed(s, () => {
                    this.conn === s && (this.conn.onopen = function() {}, this.conn.onerror = function() {}, this.conn.onmessage = function() {}, this.conn.onclose = function() {}, this.conn = null), t && t()
                })
            })
        }
        waitForBufferDone(t, e, r = 1) {
            if (r === 5 || !t.bufferedAmount) {
                e();
                return
            }
            setTimeout(() => {
                this.waitForBufferDone(t, e, r + 1)
            }, 150 * r)
        }
        waitForSocketClosed(t, e, r = 1) {
            if (r === 5 || t.readyState === H.closed) {
                e();
                return
            }
            setTimeout(() => {
                this.waitForSocketClosed(t, e, r + 1)
            }, 150 * r)
        }
        onConnClose(t) {
            this.conn && (this.conn.onclose = () => {}), this.hasLogger() && this.log("transport", "close", t), this.triggerChanError(t), this.clearHeartbeats(), this.closeWasClean || this.reconnectTimer.scheduleTimeout(), this.triggerStateCallbacks("close", t)
        }
        onConnError(t) {
            this.hasLogger() && this.log("transport", "error", t);
            let e = this.transport,
                r = this.establishedConnections;
            this.triggerStateCallbacks("error", t, e, r), (e === this.transport || r > 0) && this.triggerChanError(t)
        }
        triggerChanError(t) {
            this.channels.forEach(e => {
                e.isErrored() || e.isLeaving() || e.isClosed() || e.trigger(W.error, t)
            })
        }
        connectionState() {
            switch (this.conn && this.conn.readyState) {
                case H.connecting:
                    return "connecting";
                case H.open:
                    return "open";
                case H.closing:
                    return "closing";
                default:
                    return "closed"
            }
        }
        isConnected() {
            return this.connectionState() === "open"
        }
        remove(t) {
            this.off(t.stateChangeRefs), this.channels = this.channels.filter(e => e !== t)
        }
        off(t) {
            for (let e in this.stateChangeCallbacks) this.stateChangeCallbacks[e] = this.stateChangeCallbacks[e].filter(([r]) => t.indexOf(r) === -1)
        }
        channel(t, e = {}) {
            let r = new Jr(t, e, this);
            return this.channels.push(r), r
        }
        push(t) {
            if (this.hasLogger()) {
                let {
                    topic: e,
                    event: r,
                    payload: s,
                    ref: i,
                    join_ref: n
                } = t;
                this.log("push", `${e} ${r} (${n}, ${i})`, s)
            }
            this.isConnected() ? this.encode(t, e => this.conn.send(e)) : this.sendBuffer.push(() => this.encode(t, e => this.conn.send(e)))
        }
        makeRef() {
            let t = this.ref + 1;
            return t === this.ref ? this.ref = 0 : this.ref = t, this.ref.toString()
        }
        sendHeartbeat() {
            if (!this.isConnected()) {
                try {
                    this.heartbeatCallback("disconnected")
                } catch (t) {
                    this.log("error", "error in heartbeat callback", t)
                }
                return
            }
            if (this.pendingHeartbeatRef) {
                this.heartbeatTimeout();
                return
            }
            this.pendingHeartbeatRef = this.makeRef(), this.heartbeatSentAt = Date.now(), this.push({
                topic: "phoenix",
                event: "heartbeat",
                payload: {},
                ref: this.pendingHeartbeatRef
            });
            try {
                this.heartbeatCallback("sent")
            } catch (t) {
                this.log("error", "error in heartbeat callback", t)
            }
            this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs)
        }
        flushSendBuffer() {
            this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach(t => t()), this.sendBuffer = [])
        }
        onConnMessage(t) {
            this.decode(t.data, e => {
                let {
                    topic: r,
                    event: s,
                    payload: i,
                    ref: n,
                    join_ref: a
                } = e;
                if (n && n === this.pendingHeartbeatRef) {
                    const o = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
                    this.clearHeartbeats();
                    try {
                        this.heartbeatCallback(i.status === "ok" ? "ok" : "error", o)
                    } catch (l) {
                        this.log("error", "error in heartbeat callback", l)
                    }
                    this.pendingHeartbeatRef = null, this.heartbeatSentAt = null, this.autoSendHeartbeat && (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs))
                }
                this.hasLogger() && this.log("receive", `${i.status||""} ${r} ${s} ${n&&"("+n+")"||""}`.trim(), i);
                for (let o = 0; o < this.channels.length; o++) {
                    const l = this.channels[o];
                    l.isMember(r, s, i, a) && l.trigger(s, i, n, a)
                }
                this.triggerStateCallbacks("message", e)
            })
        }
        triggerStateCallbacks(t, ...e) {
            try {
                this.stateChangeCallbacks[t].forEach(([r, s]) => {
                    try {
                        s(...e)
                    } catch (i) {
                        this.log("error", `error in ${t} callback`, i)
                    }
                })
            } catch (r) {
                this.log("error", `error triggering ${t} callbacks`, r)
            }
        }
        leaveOpenTopic(t) {
            let e = this.channels.find(r => r.topic === t && (r.isJoined() || r.isJoining()));
            e && (this.hasLogger() && this.log("transport", `leaving duplicate topic "${t}"`), e.leave())
        }
    },
    Xr = class Pe {
        constructor(e, r) {
            const s = Zr(r);
            this.presence = new zr(e.getChannel(), s), this.presence.onJoin((i, n, a) => {
                const o = Pe.onJoinPayload(i, n, a);
                e.getChannel().trigger("presence", o)
            }), this.presence.onLeave((i, n, a) => {
                const o = Pe.onLeavePayload(i, n, a);
                e.getChannel().trigger("presence", o)
            }), this.presence.onSync(() => {
                e.getChannel().trigger("presence", {
                    event: "sync"
                })
            })
        }
        get state() {
            return Pe.transformState(this.presence.state)
        }
        static transformState(e) {
            return e = Qr(e), Object.getOwnPropertyNames(e).reduce((r, s) => {
                const i = e[s];
                return r[s] = je(i), r
            }, {})
        }
        static onJoinPayload(e, r, s) {
            return {
                event: "join",
                key: e,
                currentPresences: yt(r),
                newPresences: je(s)
            }
        }
        static onLeavePayload(e, r, s) {
            return {
                event: "leave",
                key: e,
                currentPresences: yt(r),
                leftPresences: je(s)
            }
        }
    };

function je(t) {
    return t.metas.map(e => (e.presence_ref = e.phx_ref, delete e.phx_ref, delete e.phx_ref_prev, e))
}

function Qr(t) {
    return JSON.parse(JSON.stringify(t))
}

function Zr(t) {
    return t ? .events && {
        events: t.events
    }
}

function yt(t) {
    return t ? .metas ? je(t) : []
}
var mt;
(function(t) {
    t.SYNC = "sync", t.JOIN = "join", t.LEAVE = "leave"
})(mt || (mt = {}));
var es = class {
    get state() {
        return this.presenceAdapter.state
    }
    constructor(t, e) {
        this.channel = t, this.presenceAdapter = new Xr(this.channel.channelAdapter, e)
    }
};

function ts(t) {
    if (t instanceof Error) return t;
    if (typeof t == "string") return new Error(t);
    if (t && typeof t == "object") {
        const e = t;
        if (typeof e.code == "number") {
            const r = typeof e.reason == "string" && e.reason ? ` (${e.reason})` : "";
            return new Error(`socket closed: ${e.code}${r}`, {
                cause: t
            })
        }
        return new Error("channel error: transport failure", {
            cause: t
        })
    }
    return new Error("channel error: connection lost")
}
var rs = class {
    constructor(t, e, r) {
        const s = ss(r);
        this.channel = t.getSocket().channel(e, s), this.socket = t
    }
    get state() {
        return this.channel.state
    }
    set state(t) {
        this.channel.state = t
    }
    get joinedOnce() {
        return this.channel.joinedOnce
    }
    get joinPush() {
        return this.channel.joinPush
    }
    get rejoinTimer() {
        return this.channel.rejoinTimer
    }
    on(t, e) {
        return this.channel.on(t, e)
    }
    off(t, e) {
        this.channel.off(t, e)
    }
    subscribe(t) {
        return this.channel.join(t)
    }
    unsubscribe(t) {
        return this.channel.leave(t)
    }
    teardown() {
        this.channel.teardown()
    }
    onClose(t) {
        this.channel.onClose(t)
    }
    onError(t) {
        return this.channel.onError(t)
    }
    push(t, e, r) {
        let s;
        try {
            s = this.channel.push(t, e, r)
        } catch {
            throw new Error(`tried to push '${t}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)
        }
        if (this.channel.pushBuffer.length > 100) {
            const i = this.channel.pushBuffer.shift();
            i.cancelTimeout(), this.socket.log("channel", `discarded push due to buffer overflow: ${i.event}`, i.payload())
        }
        return s
    }
    updateJoinPayload(t) {
        const e = this.channel.joinPush.payload();
        this.channel.joinPush.payload = () => Object.assign(Object.assign({}, e), t)
    }
    canPush() {
        return this.socket.isConnected() && this.state === V.joined
    }
    isJoined() {
        return this.state === V.joined
    }
    isJoining() {
        return this.state === V.joining
    }
    isClosed() {
        return this.state === V.closed
    }
    isLeaving() {
        return this.state === V.leaving
    }
    updateFilterBindings(t) {
        this.channel.filterBindings = t
    }
    updatePayloadTransform(t) {
        this.channel.onMessage = t
    }
    getChannel() {
        return this.channel
    }
};

function ss(t) {
    return {
        config: Object.assign({
            broadcast: {
                ack: !1,
                self: !1
            },
            presence: {
                key: "",
                enabled: !1
            },
            private: !1
        }, t.config)
    }
}
var is = /[,()"\\]/,
    ns = t => is.test(t) || t !== t.trim(),
    as = t => `"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,
    wt = t => {
        const e = t === null ? "null" : String(t);
        return ns(e) ? as(e) : e
    },
    os = t => t === null ? "null" : String(t),
    ls = (t, e) => {
        if (t === "in") {
            const r = Array.isArray(e) ? e : [e];
            if (r.length === 0) throw new Error("Realtime `in` filter requires at least one value.");
            return `in.(${Array.from(new Set(r)).map(s=>wt(s)).join(",")})`
        }
        return t === "is" ? `is.${os(e)}` : `${t}.${wt(e)}`
    },
    cs = class {
        constructor() {
            this.filters = []
        }
        add(t, e, r, s = !1) {
            const i = s ? "not." : "";
            return this.filters.push(`${t}=${i}${ls(e,r)}`), this
        }
        eq(t, e) {
            return this.add(t, "eq", e)
        }
        neq(t, e) {
            return this.add(t, "neq", e)
        }
        gt(t, e) {
            return this.add(t, "gt", e)
        }
        gte(t, e) {
            return this.add(t, "gte", e)
        }
        lt(t, e) {
            return this.add(t, "lt", e)
        }
        lte(t, e) {
            return this.add(t, "lte", e)
        } in (t, e) {
            return this.add(t, "in", e)
        }
        like(t, e) {
            return this.add(t, "like", e)
        }
        ilike(t, e) {
            return this.add(t, "ilike", e)
        }
        match(t, e) {
            return this.add(t, "match", e)
        }
        imatch(t, e) {
            return this.add(t, "imatch", e)
        }
        is(t, e) {
            return this.add(t, "is", e)
        }
        isDistinct(t, e) {
            return this.add(t, "isdistinct", e)
        }
        not(t, e, r) {
            return this.add(t, e, r, !0)
        }
        build() {
            return this.filters.join(",")
        }
        toString() {
            return this.build()
        }
    },
    _t;
(function(t) {
    t.ALL = "*", t.INSERT = "INSERT", t.UPDATE = "UPDATE", t.DELETE = "DELETE"
})(_t || (_t = {}));
var oe;
(function(t) {
    t.BROADCAST = "broadcast", t.PRESENCE = "presence", t.POSTGRES_CHANGES = "postgres_changes", t.SYSTEM = "system"
})(oe || (oe = {}));
var K;
(function(t) {
    t.SUBSCRIBED = "SUBSCRIBED", t.TIMED_OUT = "TIMED_OUT", t.CLOSED = "CLOSED", t.CHANNEL_ERROR = "CHANNEL_ERROR"
})(K || (K = {}));
var hs = class Ie {
        get state() {
            return this.channelAdapter.state
        }
        set state(e) {
            this.channelAdapter.state = e
        }
        get joinedOnce() {
            return this.channelAdapter.joinedOnce
        }
        get timeout() {
            return this.socket.timeout
        }
        get joinPush() {
            return this.channelAdapter.joinPush
        }
        get rejoinTimer() {
            return this.channelAdapter.rejoinTimer
        }
        constructor(e, r = {
            config: {}
        }, s) {
            var i, n;
            if (this.topic = e, this.params = r, this.socket = s, this.bindings = {}, this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
                    broadcast: {
                        ack: !1,
                        self: !1
                    },
                    presence: {
                        key: "",
                        enabled: !1
                    },
                    private: !1
                }, r.config), this.channelAdapter = new rs(this.socket.socketAdapter, e, this.params), this.presence = new es(this), this._onClose(() => {
                    this.socket._remove(this)
                }), this._updateFilterTransform(), this.broadcastEndpointURL = zt(this.socket.socketAdapter.endPointURL()), this.private = this.params.config.private || !1, !this.private && (!((n = (i = this.params.config) === null || i === void 0 ? void 0 : i.broadcast) === null || n === void 0) && n.replay)) throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)
        }
        subscribe(e, r = this.timeout) {
            var s, i, n;
            if (this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed()) {
                const {
                    config: {
                        broadcast: a,
                        presence: o,
                        private: l
                    }
                } = this.params, c = (i = (s = this.bindings.postgres_changes) === null || s === void 0 ? void 0 : s.map(f => f.filter)) !== null && i !== void 0 ? i : [], u = !!this.bindings[oe.PRESENCE] && this.bindings[oe.PRESENCE].length > 0 || ((n = this.params.config.presence) === null || n === void 0 ? void 0 : n.enabled) === !0, h = {}, d = {
                    broadcast: a,
                    presence: Object.assign(Object.assign({}, o), {
                        enabled: u
                    }),
                    postgres_changes: c,
                    private: l
                };
                this.socket.accessTokenValue && (h.access_token = this.socket.accessTokenValue), this._onError(f => {
                    e ? .(K.CHANNEL_ERROR, ts(f))
                }), this._onClose(() => e ? .(K.CLOSED)), this.updateJoinPayload(Object.assign({
                    config: d
                }, h)), this._updateFilterMessage(), this.channelAdapter.subscribe(r).receive("ok", async ({
                    postgres_changes: f
                }) => {
                    if (this.socket._isManualToken() || this.socket.setAuth(), f === void 0) {
                        e ? .(K.SUBSCRIBED);
                        return
                    }
                    this._updatePostgresBindings(f, e)
                }).receive("error", f => {
                    this.state = V.errored;
                    const g = Object.values(f).join(", ") || "error";
                    e ? .(K.CHANNEL_ERROR, new Error(g, {
                        cause: f
                    }))
                }).receive("timeout", () => {
                    e ? .(K.TIMED_OUT)
                })
            }
            return this
        }
        _updatePostgresBindings(e, r) {
            var s;
            const i = this.bindings.postgres_changes,
                n = (s = i ? .length) !== null && s !== void 0 ? s : 0,
                a = [];
            for (let o = 0; o < n; o++) {
                const l = i[o],
                    {
                        filter: {
                            event: c,
                            schema: u,
                            table: h,
                            filter: d
                        }
                    } = l,
                    f = e && e[o];
                if (f && f.event === c && Ie.isFilterValueEqual(f.schema, u) && Ie.isFilterValueEqual(f.table, h) && Ie.isFilterValueEqual(f.filter, d)) a.push(Object.assign(Object.assign({}, l), {
                    id: f.id
                }));
                else {
                    this.unsubscribe(), this.state = V.errored, r ? .(K.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
                    return
                }
            }
            this.bindings.postgres_changes = a, this.state != V.errored && r && r(K.SUBSCRIBED)
        }
        presenceState() {
            return this.presence.state
        }
        async track(e, r = {}) {
            return await this.send({
                type: "presence",
                event: "track",
                payload: e
            }, r.timeout || this.timeout)
        }
        async untrack(e = {}) {
            return await this.send({
                type: "presence",
                event: "untrack"
            }, e)
        }
        on(e, r, s) {
            const i = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(),
                n = e === oe.PRESENCE || e === oe.POSTGRES_CHANGES;
            if (i && n) throw this.socket.log("channel", `cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`), new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);
            return this._on(e, r, s)
        }
        async httpSend(e, r, s = {}) {
            var i;
            if (r == null) return Promise.reject(new Error("Payload is required for httpSend()"));
            const n = r instanceof ArrayBuffer || ArrayBuffer.isView(r),
                a = {
                    apikey: this.socket.apiKey ? this.socket.apiKey : "",
                    "Content-Type": n ? "application/octet-stream" : "application/json"
                };
            this.socket.accessTokenValue && (a.Authorization = `Bearer ${this.socket.accessTokenValue}`);
            const o = new URL(this.broadcastEndpointURL);
            o.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`, this.private && o.searchParams.set("private", "true");
            const l = {
                    method: "POST",
                    headers: a,
                    body: n ? r : JSON.stringify(r)
                },
                c = await this._fetchWithTimeout(o.toString(), l, (i = s.timeout) !== null && i !== void 0 ? i : this.timeout);
            if (c.status === 202) return {
                success: !0
            };
            if (c.status === 404) return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));
            let u = c.statusText;
            try {
                const h = await c.json();
                u = h.error || h.message || u
            } catch {}
            return Promise.reject(new Error(u))
        }
        async send(e, r = {}) {
            var s, i;
            if (!this.channelAdapter.canPush() && e.type === "broadcast") {
                const {
                    event: n,
                    payload: a
                } = e, o = {
                    apikey: this.socket.apiKey ? this.socket.apiKey : "",
                    "Content-Type": "application/json"
                };
                this.socket.accessTokenValue && (o.Authorization = `Bearer ${this.socket.accessTokenValue}`);
                const l = {
                    method: "POST",
                    headers: o,
                    body: JSON.stringify({
                        messages: [{
                            topic: this.subTopic,
                            event: n,
                            payload: a,
                            private: this.private
                        }]
                    })
                };
                try {
                    const c = await this._fetchWithTimeout(this.broadcastEndpointURL, l, (s = r.timeout) !== null && s !== void 0 ? s : this.timeout);
                    return await ((i = c.body) === null || i === void 0 ? void 0 : i.cancel()), c.ok ? "ok" : "error"
                } catch (c) {
                    return c instanceof Error && c.name === "AbortError" ? "timed out" : "error"
                }
            } else return new Promise(n => {
                var a, o, l;
                const c = this.channelAdapter.push(e.type, e, r.timeout || this.timeout);
                e.type === "broadcast" && !(!((l = (o = (a = this.params) === null || a === void 0 ? void 0 : a.config) === null || o === void 0 ? void 0 : o.broadcast) === null || l === void 0) && l.ack) && n("ok"), c.receive("ok", () => n("ok")), c.receive("error", () => n("error")), c.receive("timeout", () => n("timed out"))
            })
        }
        updateJoinPayload(e) {
            this.channelAdapter.updateJoinPayload(e)
        }
        async unsubscribe(e = this.timeout) {
            return new Promise(r => {
                this.channelAdapter.unsubscribe(e).receive("ok", () => r("ok")).receive("timeout", () => r("timed out")).receive("error", () => r("error"))
            })
        }
        teardown() {
            this.channelAdapter.teardown()
        }
        async _fetchWithTimeout(e, r, s) {
            const i = new AbortController,
                n = setTimeout(() => i.abort(), s),
                a = await this.socket.fetch(e, Object.assign(Object.assign({}, r), {
                    signal: i.signal
                }));
            return clearTimeout(n), a
        }
        _on(e, r, s) {
            const i = e.toLocaleLowerCase(),
                n = r ? .filter;
            (n instanceof cs || typeof n == "object" && n !== null && typeof n.build == "function") && (r = Object.assign(Object.assign({}, r), {
                filter: n.build()
            }));
            const a = this.channelAdapter.on(e, s),
                o = {
                    type: i,
                    filter: r,
                    callback: s,
                    ref: a
                };
            return this.bindings[i] ? this.bindings[i].push(o) : this.bindings[i] = [o], this._updateFilterMessage(), this
        }
        _onClose(e) {
            this.channelAdapter.onClose(e)
        }
        _onError(e) {
            this.channelAdapter.onError(e)
        }
        _updateFilterMessage() {
            this.channelAdapter.updateFilterBindings((e, r, s) => {
                var i, n, a, o, l, c, u;
                const h = e.event.toLocaleLowerCase();
                if (this._notThisChannelEvent(h, s)) return !1;
                const d = (i = this.bindings[h]) === null || i === void 0 ? void 0 : i.find(f => f.ref === e.ref);
                if (!d) return !0;
                if (["broadcast", "presence", "postgres_changes"].includes(h))
                    if ("id" in d) {
                        const f = d.id,
                            g = (n = d.filter) === null || n === void 0 ? void 0 : n.event;
                        return f && ((a = r.ids) === null || a === void 0 ? void 0 : a.includes(f)) && (g === "*" || g ? .toLocaleLowerCase() === ((o = r.data) === null || o === void 0 ? void 0 : o.type.toLocaleLowerCase()))
                    } else {
                        const f = (c = (l = d ? .filter) === null || l === void 0 ? void 0 : l.event) === null || c === void 0 ? void 0 : c.toLocaleLowerCase();
                        return f === "*" || f === ((u = r ? .event) === null || u === void 0 ? void 0 : u.toLocaleLowerCase())
                    }
                else return d.type.toLocaleLowerCase() === h
            })
        }
        _notThisChannelEvent(e, r) {
            const {
                close: s,
                error: i,
                leave: n,
                join: a
            } = Jt;
            return r && [s, i, n, a].includes(e) && r !== this.joinPush.ref
        }
        _updateFilterTransform() {
            this.channelAdapter.updatePayloadTransform((e, r, s) => {
                if (typeof r == "object" && "ids" in r) {
                    const i = r.data,
                        {
                            schema: n,
                            table: a,
                            commit_timestamp: o,
                            type: l,
                            errors: c
                        } = i;
                    return Object.assign(Object.assign({}, {
                        schema: n,
                        table: a,
                        commit_timestamp: o,
                        eventType: l,
                        new: {},
                        old: {},
                        errors: c
                    }), this._getPayloadRecords(i))
                }
                return r
            })
        }
        copyBindings(e) {
            if (this.joinedOnce) throw new Error("cannot copy bindings into joined channel");
            for (const r in e.bindings)
                for (const s of e.bindings[r]) this._on(s.type, s.filter, s.callback)
        }
        static isFilterValueEqual(e, r) {
            return (e ? ? void 0) === (r ? ? void 0)
        }
        _getPayloadRecords(e) {
            const r = {
                new: {},
                old: {}
            };
            return (e.type === "INSERT" || e.type === "UPDATE") && (r.new = vt(e.columns, e.record)), (e.type === "UPDATE" || e.type === "DELETE") && (r.old = vt(e.columns, e.old_record)), r
        }
    },
    us = class {
        constructor(t, e) {
            this.socket = new Yr(t, e)
        }
        get timeout() {
            return this.socket.timeout
        }
        get endPoint() {
            return this.socket.endPoint
        }
        get transport() {
            return this.socket.transport
        }
        get heartbeatIntervalMs() {
            return this.socket.heartbeatIntervalMs
        }
        get heartbeatCallback() {
            return this.socket.heartbeatCallback
        }
        set heartbeatCallback(t) {
            this.socket.heartbeatCallback = t
        }
        get heartbeatTimer() {
            return this.socket.heartbeatTimer
        }
        get pendingHeartbeatRef() {
            return this.socket.pendingHeartbeatRef
        }
        get reconnectTimer() {
            return this.socket.reconnectTimer
        }
        get vsn() {
            return this.socket.vsn
        }
        get encode() {
            return this.socket.encode
        }
        get decode() {
            return this.socket.decode
        }
        get reconnectAfterMs() {
            return this.socket.reconnectAfterMs
        }
        get sendBuffer() {
            return this.socket.sendBuffer
        }
        get stateChangeCallbacks() {
            return this.socket.stateChangeCallbacks
        }
        connect() {
            this.socket.connect()
        }
        disconnect(t, e, r, s = 1e4) {
            return new Promise(i => {
                setTimeout(() => i("timeout"), s), this.socket.disconnect(() => {
                    t(), i("ok")
                }, e, r)
            })
        }
        push(t) {
            this.socket.push(t)
        }
        log(t, e, r) {
            this.socket.log(t, e, r)
        }
        makeRef() {
            return this.socket.makeRef()
        }
        onOpen(t) {
            this.socket.onOpen(t)
        }
        onClose(t) {
            this.socket.onClose(t)
        }
        onError(t) {
            this.socket.onError(t)
        }
        onMessage(t) {
            this.socket.onMessage(t)
        }
        isConnected() {
            return this.socket.isConnected()
        }
        isConnecting() {
            return this.socket.connectionState() == Qe.connecting
        }
        isDisconnecting() {
            return this.socket.connectionState() == Qe.closing
        }
        connectionState() {
            return this.socket.connectionState()
        }
        endPointURL() {
            return this.socket.endPointURL()
        }
        sendHeartbeat() {
            this.socket.sendHeartbeat()
        }
        getSocket() {
            return this.socket
        }
    },
    bt = {
        HEARTBEAT_INTERVAL: 25e3,
        RECONNECT_DELAY: 10,
        HEARTBEAT_TIMEOUT_FALLBACK: 100
    },
    ds = [1e3, 2e3, 5e3, 1e4],
    fs = 1e4;

function gs() {
    const t = new Map;
    return {
        get length() {
            return t.size
        },
        clear() {
            t.clear()
        },
        getItem(e) {
            return t.has(e) ? t.get(e) : null
        },
        key(e) {
            var r;
            return (r = Array.from(t.keys())[e]) !== null && r !== void 0 ? r : null
        },
        removeItem(e) {
            t.delete(e)
        },
        setItem(e, r) {
            t.set(e, String(r))
        }
    }
}

function ps() {
    try {
        if (typeof globalThis < "u" && globalThis.sessionStorage) return globalThis.sessionStorage
    } catch {}
    return gs()
}
var vs = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,
    ys = class {
        get endPoint() {
            return this.socketAdapter.endPoint
        }
        get timeout() {
            return this.socketAdapter.timeout
        }
        get transport() {
            return this.socketAdapter.transport
        }
        get heartbeatCallback() {
            return this.socketAdapter.heartbeatCallback
        }
        get heartbeatIntervalMs() {
            return this.socketAdapter.heartbeatIntervalMs
        }
        get heartbeatTimer() {
            return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer
        }
        get pendingHeartbeatRef() {
            return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef
        }
        get reconnectTimer() {
            return this.socketAdapter.reconnectTimer
        }
        get vsn() {
            return this.socketAdapter.vsn
        }
        get encode() {
            return this.socketAdapter.encode
        }
        get decode() {
            return this.socketAdapter.decode
        }
        get reconnectAfterMs() {
            return this.socketAdapter.reconnectAfterMs
        }
        get sendBuffer() {
            return this.socketAdapter.sendBuffer
        }
        get stateChangeCallbacks() {
            return this.socketAdapter.stateChangeCallbacks
        }
        constructor(t, e) {
            var r;
            if (this.channels = new Array, this.accessTokenValue = null, this.accessToken = null, this.apiKey = null, this.httpEndpoint = "", this.headers = {}, this.params = {}, this.ref = 0, this.serializer = new Nr, this._manuallySetToken = !1, this._authPromise = null, this._workerHeartbeatTimer = void 0, this._pendingWorkerHeartbeatRef = null, this._pendingDisconnectTimer = null, this._disconnectOnEmptyChannelsAfterMs = 0, this._resolveFetch = i => i ? (...n) => i(...n) : (...n) => fetch(...n), !(!((r = e ? .params) === null || r === void 0) && r.apikey)) throw new Error("API key is required to connect to Realtime");
            this.apiKey = e.params.apikey;
            const s = this._initializeOptions(e);
            this.socketAdapter = new us(t, s), this.httpEndpoint = zt(t), this.fetch = this._resolveFetch(e ? .fetch)
        }
        connect() {
            if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
                this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this._setupConnectionHandlers();
                try {
                    this.socketAdapter.connect()
                } catch (t) {
                    const e = t.message;
                    throw new Error(`WebSocket not available: ${e}`)
                }
                this._handleNodeJsRaceCondition()
            }
        }
        endpointURL() {
            return this.socketAdapter.endPointURL()
        }
        async disconnect(t, e) {
            return this._cancelPendingDisconnect(), this.isDisconnecting() ? "ok" : await this.socketAdapter.disconnect(() => {
                clearInterval(this._workerHeartbeatTimer), this._terminateWorker()
            }, t, e)
        }
        getChannels() {
            return this.channels
        }
        async removeChannel(t) {
            const e = await t.unsubscribe();
            return e === "ok" && t.teardown(), e
        }
        async removeAllChannels() {
            const t = this.channels.map(async r => {
                    const s = await r.unsubscribe();
                    return r.teardown(), s
                }),
                e = await Promise.all(t);
            return await this.disconnect(), e
        }
        log(t, e, r) {
            this.socketAdapter.log(t, e, r)
        }
        connectionState() {
            return this.socketAdapter.connectionState() || Qe.closed
        }
        isConnected() {
            return this.socketAdapter.isConnected()
        }
        isConnecting() {
            return this.socketAdapter.isConnecting()
        }
        isDisconnecting() {
            return this.socketAdapter.isDisconnecting()
        }
        channel(t, e = {
            config: {}
        }) {
            const r = `realtime:${t}`,
                s = this.getChannels().find(i => i.topic === r);
            if (s) return s; {
                const i = new hs(`realtime:${t}`, e, this);
                return this._cancelPendingDisconnect(), this.channels.push(i), i
            }
        }
        push(t) {
            this.socketAdapter.push(t)
        }
        async setAuth(t = null) {
            this._authPromise = this._performAuth(t);
            try {
                await this._authPromise
            } finally {
                this._authPromise = null
            }
        }
        _isManualToken() {
            return this._manuallySetToken
        }
        async sendHeartbeat() {
            this.socketAdapter.sendHeartbeat()
        }
        onHeartbeat(t) {
            this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(t)
        }
        _makeRef() {
            return this.socketAdapter.makeRef()
        }
        _remove(t) {
            this.channels = this.channels.filter(e => e.topic !== t.topic), this.channels.length === 0 && (this.log("transport", "no channels remaining, scheduling disconnect"), this._schedulePendingDisconnect())
        }
        _schedulePendingDisconnect() {
            if (this._cancelPendingDisconnect(), this._disconnectOnEmptyChannelsAfterMs === 0) {
                this.log("transport", "disconnecting immediately - no channels"), this.disconnect();
                return
            }
            this._pendingDisconnectTimer = setTimeout(() => {
                this._pendingDisconnectTimer = null, this.channels.length === 0 && (this.log("transport", "deferred disconnect fired - no channels, disconnecting"), this.disconnect())
            }, this._disconnectOnEmptyChannelsAfterMs), this.log("transport", `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)
        }
        _cancelPendingDisconnect() {
            this._pendingDisconnectTimer !== null && (this.log("transport", "pending disconnect cancelled - channel activity detected"), clearTimeout(this._pendingDisconnectTimer), this._pendingDisconnectTimer = null)
        }
        async _performAuth(t = null) {
            let e, r = !1;
            if (t) e = t, r = !0;
            else if (this.accessToken) try {
                e = await this.accessToken()
            } catch (s) {
                this.log("error", "Error fetching access token from callback", s), e = this.accessTokenValue
            } else e = this.accessTokenValue;
            r ? this._manuallySetToken = !0 : this.accessToken && (this._manuallySetToken = !1), this.accessTokenValue != e && (this.accessTokenValue = e, this.channels.forEach(s => {
                const i = {
                    access_token: e,
                    version: jr
                };
                e && s.updateJoinPayload(i), s.joinedOnce && s.channelAdapter.isJoined() && s.channelAdapter.push(Jt.access_token, {
                    access_token: e
                })
            }))
        }
        async _waitForAuthIfNeeded() {
            this._authPromise && await this._authPromise
        }
        _setAuthSafely(t = "general") {
            this._isManualToken() || this.setAuth().catch(e => {
                this.log("error", `Error setting auth in ${t}`, e)
            })
        }
        _setupConnectionHandlers() {
            this.socketAdapter.onOpen(() => {
                (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).catch(t => {
                    this.log("error", "error waiting for auth on connect", t)
                }), this.worker && !this.workerRef && this._startWorkerHeartbeat()
            }), this.socketAdapter.onClose(() => {
                this.worker && this.workerRef && this._terminateWorker()
            }), this.socketAdapter.onMessage(t => {
                t.ref && t.ref === this._pendingWorkerHeartbeatRef && (this._pendingWorkerHeartbeatRef = null)
            })
        }
        _handleNodeJsRaceCondition() {
            this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen()
        }
        _wrapHeartbeatCallback(t) {
            return (e, r) => {
                e == "sent" && this._setAuthSafely(), t && t(e, r)
            }
        }
        _startWorkerHeartbeat() {
            this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
            const t = this._workerObjectUrl(this.workerUrl);
            this.workerRef = new Worker(t), this.workerRef.onerror = e => {
                this.log("worker", "worker error", e.message), this._terminateWorker(), this.disconnect()
            }, this.workerRef.onmessage = e => {
                e.data.event === "keepAlive" && this.sendHeartbeat()
            }, this.workerRef.postMessage({
                event: "start",
                interval: this.heartbeatIntervalMs
            })
        }
        _terminateWorker() {
            this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0)
        }
        _workerObjectUrl(t) {
            let e;
            if (t) e = t;
            else {
                const r = new Blob([vs], {
                    type: "application/javascript"
                });
                e = URL.createObjectURL(r)
            }
            return e
        }
        _initializeOptions(t) {
            var e, r, s, i, n, a, o, l, c, u, h, d;
            this.worker = (e = t ? .worker) !== null && e !== void 0 ? e : !1, this.accessToken = (r = t ? .accessToken) !== null && r !== void 0 ? r : null;
            const f = {};
            f.timeout = (s = t ? .timeout) !== null && s !== void 0 ? s : xr, f.heartbeatIntervalMs = (i = t ? .heartbeatIntervalMs) !== null && i !== void 0 ? i : bt.HEARTBEAT_INTERVAL, this._disconnectOnEmptyChannelsAfterMs = (n = t ? .disconnectOnEmptyChannelsAfterMs) !== null && n !== void 0 ? n : 2 * ((a = t ? .heartbeatIntervalMs) !== null && a !== void 0 ? a : bt.HEARTBEAT_INTERVAL), f.transport = (o = t ? .transport) !== null && o !== void 0 ? o : Cr.getWebSocketConstructor(), f.params = t ? .params, f.logger = t ? .logger, f.heartbeatCallback = this._wrapHeartbeatCallback(t ? .heartbeatCallback), f.sessionStorage = (l = t ? .sessionStorage) !== null && l !== void 0 ? l : ps(), f.reconnectAfterMs = (c = t ? .reconnectAfterMs) !== null && c !== void 0 ? c : (_ => ds[_ - 1] || fs);
            let g, v;
            const m = (u = t ? .vsn) !== null && u !== void 0 ? u : $r;
            switch (m) {
                case Ir:
                    g = (_, k) => k(JSON.stringify(_)), v = (_, k) => k(JSON.parse(_));
                    break;
                case Vt:
                    g = this.serializer.encode.bind(this.serializer), v = this.serializer.decode.bind(this.serializer);
                    break;
                default:
                    throw new Error(`Unsupported serializer version: ${f.vsn}`)
            }
            if (f.vsn = m, f.encode = (h = t ? .encode) !== null && h !== void 0 ? h : g, f.decode = (d = t ? .decode) !== null && d !== void 0 ? d : v, f.beforeReconnect = this._reconnectAuth.bind(this), (t ? .logLevel || t ? .log_level) && (this.logLevel = t.logLevel || t.log_level, f.params = Object.assign(Object.assign({}, f.params), {
                    log_level: this.logLevel
                })), this.worker) {
                if (typeof window < "u" && !window.Worker) throw new Error("Web Worker is not supported");
                this.workerUrl = t ? .workerUrl, f.autoSendHeartbeat = !this.worker
            }
            return f
        }
        async _reconnectAuth() {
            await this._waitForAuthIfNeeded(), this.isConnected() || this.connect()
        }
    },
    pe = class extends Error {
        constructor(t, e) {
            super(t), this.name = "IcebergError", this.status = e.status, this.icebergType = e.icebergType, this.icebergCode = e.icebergCode, this.details = e.details, this.isCommitStateUnknown = e.icebergType === "CommitStateUnknownException" || [500, 502, 504].includes(e.status) && e.icebergType ? .includes("CommitState") === !0
        }
        isNotFound() {
            return this.status === 404
        }
        isConflict() {
            return this.status === 409
        }
        isAuthenticationTimeout() {
            return this.status === 419
        }
    };

function ms(t, e, r) {
    const s = new URL(e, t);
    if (r)
        for (const [i, n] of Object.entries(r)) n !== void 0 && s.searchParams.set(i, n);
    return s.toString()
}
async function ws(t) {
    return !t || t.type === "none" ? {} : t.type === "bearer" ? {
        Authorization: `Bearer ${t.token}`
    } : t.type === "header" ? {
        [t.name]: t.value
    } : t.type === "custom" ? await t.getHeaders() : {}
}

function _s(t) {
    const e = t.fetchImpl ? ? globalThis.fetch;
    return {
        async request({
            method: r,
            path: s,
            query: i,
            body: n,
            headers: a
        }) {
            const o = ms(t.baseUrl, s, i),
                l = await ws(t.auth),
                c = await e(o, {
                    method: r,
                    headers: { ...n ? {
                            "Content-Type": "application/json"
                        } : {},
                        ...l,
                        ...a
                    },
                    body: n ? JSON.stringify(n) : void 0
                }),
                u = await c.text(),
                h = (c.headers.get("content-type") || "").includes("application/json"),
                d = h && u ? JSON.parse(u) : u;
            if (!c.ok) {
                const f = h ? d : void 0,
                    g = f ? .error;
                throw new pe(g ? .message ? ? `Request failed with status ${c.status}`, {
                    status: c.status,
                    icebergType: g ? .type,
                    icebergCode: g ? .code,
                    details: f
                })
            }
            return {
                status: c.status,
                headers: c.headers,
                data: d
            }
        }
    }
}

function Te(t) {
    return t.join("")
}
var bs = class {
    constructor(t, e = "") {
        this.client = t, this.prefix = e
    }
    async listNamespaces(t) {
        const e = t ? {
            parent: Te(t.namespace)
        } : void 0;
        return (await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces`,
            query: e
        })).data.namespaces.map(r => ({
            namespace: r
        }))
    }
    async createNamespace(t, e) {
        const r = {
            namespace: t.namespace,
            properties: e ? .properties
        };
        return (await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces`,
            body: r
        })).data
    }
    async dropNamespace(t) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${Te(t.namespace)}`
        })
    }
    async loadNamespaceMetadata(t) {
        return {
            properties: (await this.client.request({
                method: "GET",
                path: `${this.prefix}/namespaces/${Te(t.namespace)}`
            })).data.properties
        }
    }
    async namespaceExists(t) {
        try {
            return await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${Te(t.namespace)}`
            }), !0
        } catch (e) {
            if (e instanceof pe && e.status === 404) return !1;
            throw e
        }
    }
    async createNamespaceIfNotExists(t, e) {
        try {
            return await this.createNamespace(t, e)
        } catch (r) {
            if (r instanceof pe && r.status === 409) return;
            throw r
        }
    }
};

function te(t) {
    return t.join("")
}
var ks = class {
        constructor(t, e = "", r) {
            this.client = t, this.prefix = e, this.accessDelegation = r
        }
        async listTables(t) {
            return (await this.client.request({
                method: "GET",
                path: `${this.prefix}/namespaces/${te(t.namespace)}/tables`
            })).data.identifiers
        }
        async createTable(t, e) {
            const r = {};
            return this.accessDelegation && (r["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({
                method: "POST",
                path: `${this.prefix}/namespaces/${te(t.namespace)}/tables`,
                body: e,
                headers: r
            })).data.metadata
        }
        async updateTable(t, e) {
            const r = await this.client.request({
                method: "POST",
                path: `${this.prefix}/namespaces/${te(t.namespace)}/tables/${t.name}`,
                body: e
            });
            return {
                "metadata-location": r.data["metadata-location"],
                metadata: r.data.metadata
            }
        }
        async dropTable(t, e) {
            await this.client.request({
                method: "DELETE",
                path: `${this.prefix}/namespaces/${te(t.namespace)}/tables/${t.name}`,
                query: {
                    purgeRequested: String(e ? .purge ? ? !1)
                }
            })
        }
        async loadTable(t) {
            const e = {};
            return this.accessDelegation && (e["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({
                method: "GET",
                path: `${this.prefix}/namespaces/${te(t.namespace)}/tables/${t.name}`,
                headers: e
            })).data.metadata
        }
        async tableExists(t) {
            const e = {};
            this.accessDelegation && (e["X-Iceberg-Access-Delegation"] = this.accessDelegation);
            try {
                return await this.client.request({
                    method: "HEAD",
                    path: `${this.prefix}/namespaces/${te(t.namespace)}/tables/${t.name}`,
                    headers: e
                }), !0
            } catch (r) {
                if (r instanceof pe && r.status === 404) return !1;
                throw r
            }
        }
        async createTableIfNotExists(t, e) {
            try {
                return await this.createTable(t, e)
            } catch (r) {
                if (r instanceof pe && r.status === 409) return await this.loadTable({
                    namespace: t.namespace,
                    name: e.name
                });
                throw r
            }
        }
    },
    Ss = class {
        constructor(t) {
            let e = "v1";
            t.catalogName && (e += `/${t.catalogName}`);
            const r = t.baseUrl.endsWith("/") ? t.baseUrl : `${t.baseUrl}/`;
            this.client = _s({
                baseUrl: r,
                auth: t.auth,
                fetchImpl: t.fetch
            }), this.accessDelegation = t.accessDelegation ? .join(","), this.namespaceOps = new bs(this.client, e), this.tableOps = new ks(this.client, e, this.accessDelegation)
        }
        async listNamespaces(t) {
            return this.namespaceOps.listNamespaces(t)
        }
        async createNamespace(t, e) {
            return this.namespaceOps.createNamespace(t, e)
        }
        async dropNamespace(t) {
            await this.namespaceOps.dropNamespace(t)
        }
        async loadNamespaceMetadata(t) {
            return this.namespaceOps.loadNamespaceMetadata(t)
        }
        async listTables(t) {
            return this.tableOps.listTables(t)
        }
        async createTable(t, e) {
            return this.tableOps.createTable(t, e)
        }
        async updateTable(t, e) {
            return this.tableOps.updateTable(t, e)
        }
        async dropTable(t, e) {
            await this.tableOps.dropTable(t, e)
        }
        async loadTable(t) {
            return this.tableOps.loadTable(t)
        }
        async namespaceExists(t) {
            return this.namespaceOps.namespaceExists(t)
        }
        async tableExists(t) {
            return this.tableOps.tableExists(t)
        }
        async createNamespaceIfNotExists(t, e) {
            return this.namespaceOps.createNamespaceIfNotExists(t, e)
        }
        async createTableIfNotExists(t, e) {
            return this.tableOps.createTableIfNotExists(t, e)
        }
    };

function ve(t) {
    "@babel/helpers - typeof";
    return ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e
    } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, ve(t)
}

function Es(t, e) {
    if (ve(t) != "object" || !t) return t;
    var r = t[Symbol.toPrimitive];
    if (r !== void 0) {
        var s = r.call(t, e || "default");
        if (ve(s) != "object") return s;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (e === "string" ? String : Number)(t)
}

function Ts(t) {
    var e = Es(t, "string");
    return ve(e) == "symbol" ? e : e + ""
}

function As(t, e, r) {
    return (e = Ts(e)) in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t
}

function kt(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(t);
        e && (s = s.filter(function(i) {
            return Object.getOwnPropertyDescriptor(t, i).enumerable
        })), r.push.apply(r, s)
    }
    return r
}

function b(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e] != null ? arguments[e] : {};
        e % 2 ? kt(Object(r), !0).forEach(function(s) {
            As(t, s, r[s])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : kt(Object(r)).forEach(function(s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s))
        })
    }
    return t
}
var Me = class extends Error {
    constructor(t, e = "storage", r, s) {
        super(t), this.__isStorageError = !0, this.namespace = e, this.name = e === "vectors" ? "StorageVectorsError" : "StorageError", this.status = r, this.statusCode = s
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            statusCode: this.statusCode
        }
    }
};

function Fe(t) {
    return typeof t == "object" && t !== null && "__isStorageError" in t
}
var rt = class extends Me {
        constructor(t, e, r, s = "storage") {
            super(t, s, e, r), this.name = s === "vectors" ? "StorageVectorsApiError" : "StorageApiError", this.status = e, this.statusCode = r
        }
        toJSON() {
            return b({}, super.toJSON())
        }
    },
    Xt = class extends Me {
        constructor(t, e, r = "storage") {
            super(t, r), this.name = r === "vectors" ? "StorageVectorsUnknownError" : "StorageUnknownError", this.originalError = e
        }
    };

function xe(t, e, r) {
    const s = b({}, t),
        i = e.toLowerCase();
    for (const n of Object.keys(s)) n.toLowerCase() === i && delete s[n];
    return s[i] = r, s
}

function Rs(t) {
    const e = {};
    for (const [r, s] of Object.entries(t)) e[r.toLowerCase()] = s;
    return e
}
var Os = t => t ? (...e) => t(...e) : (...e) => fetch(...e),
    Cs = t => {
        if (typeof t != "object" || t === null) return !1;
        const e = Object.getPrototypeOf(t);
        return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t)
    },
    st = t => {
        if (Array.isArray(t)) return t.map(r => st(r));
        if (typeof t == "function" || t !== Object(t)) return t;
        const e = {};
        return Object.entries(t).forEach(([r, s]) => {
            const i = r.replace(/([-_][a-z])/gi, n => n.toUpperCase().replace(/[-_]/g, ""));
            e[i] = st(s)
        }), e
    },
    Ps = t => !t || typeof t != "string" || t.length === 0 || t.length > 100 || t.trim() !== t || t.includes("/") || t.includes("\\") ? !1 : /^[\w!.\*'() &$@=;:+,?-]+$/.test(t),
    St = t => {
        if (typeof t == "object" && t !== null) {
            const e = t;
            if (typeof e.msg == "string") return e.msg;
            if (typeof e.message == "string") return e.message;
            if (typeof e.error_description == "string") return e.error_description;
            if (typeof e.error == "string") return e.error;
            if (typeof e.error == "object" && e.error !== null) {
                const r = e.error;
                if (typeof r.message == "string") return r.message
            }
        }
        return JSON.stringify(t)
    },
    js = async (t, e, r, s) => {
        if (t !== null && typeof t == "object" && "json" in t && typeof t.json == "function") {
            const i = t;
            let n = parseInt(String(i.status), 10);
            Number.isFinite(n) || (n = 500), i.json().then(a => {
                const o = a ? .statusCode || a ? .code || n + "";
                e(new rt(St(a), n, o, s))
            }).catch(() => {
                const a = n + "";
                e(new rt(i.statusText || `HTTP ${n} error`, n, a, s))
            })
        } else e(new Xt(St(t), t, s))
    },
    Is = (t, e, r, s) => {
        const i = {
            method: t,
            headers: e ? .headers || {}
        };
        if (t === "GET" || t === "HEAD" || !s) return b(b({}, i), r);
        if (Cs(s)) {
            var n;
            const a = e ? .headers || {};
            let o;
            for (const [l, c] of Object.entries(a)) l.toLowerCase() === "content-type" && (o = c);
            i.headers = xe(a, "Content-Type", (n = o) !== null && n !== void 0 ? n : "application/json"), i.body = JSON.stringify(s)
        } else i.body = s;
        return e ? .duplex && (i.duplex = e.duplex), b(b({}, i), r)
    };
async function he(t, e, r, s, i, n, a) {
    return new Promise((o, l) => {
        t(r, Is(e, s, i, n)).then(c => {
            if (!c.ok) throw c;
            if (s ? .noResolveJson) return c;
            if (a === "vectors") {
                const u = c.headers.get("content-type");
                if (c.headers.get("content-length") === "0" || c.status === 204) return {};
                if (!u || !u.includes("application/json")) return {}
            }
            return c.json()
        }).then(c => o(c)).catch(c => js(c, l, s, a))
    })
}

function Qt(t = "storage") {
    return {
        get: async (e, r, s, i) => he(e, "GET", r, s, i, void 0, t),
        post: async (e, r, s, i, n) => he(e, "POST", r, i, n, s, t),
        put: async (e, r, s, i, n) => he(e, "PUT", r, i, n, s, t),
        head: async (e, r, s, i) => he(e, "HEAD", r, b(b({}, s), {}, {
            noResolveJson: !0
        }), i, void 0, t),
        remove: async (e, r, s, i, n) => he(e, "DELETE", r, i, n, s, t)
    }
}
var {
    get: ye,
    post: D,
    put: it,
    head: $s,
    remove: me
} = Qt("storage"), x = Qt("vectors"), ce = class {
    constructor(t, e = {}, r, s = "storage") {
        this.shouldThrowOnError = !1, this.url = t, this.headers = Rs(e), this.fetch = Os(r), this.namespace = s
    }
    throwOnError() {
        return this.shouldThrowOnError = !0, this
    }
    setHeader(t, e) {
        return this.headers = xe(this.headers, t, e), this
    }
    async handleOperation(t) {
        var e = this;
        try {
            return {
                data: await t(),
                error: null
            }
        } catch (r) {
            if (e.shouldThrowOnError) throw r;
            if (Fe(r)) return {
                data: null,
                error: r
            };
            throw r
        }
    }
}, Zt;
Zt = Symbol.toStringTag;
var xs = class {
        constructor(t, e) {
            this.downloadFn = t, this.shouldThrowOnError = e, this[Zt] = "StreamDownloadBuilder", this.promise = null
        }
        then(t, e) {
            return this.getPromise().then(t, e)
        } catch (t) {
            return this.getPromise().catch(t)
        } finally(t) {
            return this.getPromise().finally(t)
        }
        getPromise() {
            return this.promise || (this.promise = this.execute()), this.promise
        }
        async execute() {
            var t = this;
            try {
                return {
                    data: (await t.downloadFn()).body,
                    error: null
                }
            } catch (e) {
                if (t.shouldThrowOnError) throw e;
                if (Fe(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
    },
    er;
er = Symbol.toStringTag;
var Ns = class {
        constructor(t, e) {
            this.downloadFn = t, this.shouldThrowOnError = e, this[er] = "BlobDownloadBuilder", this.promise = null
        }
        asStream() {
            return new xs(this.downloadFn, this.shouldThrowOnError)
        }
        then(t, e) {
            return this.getPromise().then(t, e)
        } catch (t) {
            return this.getPromise().catch(t)
        } finally(t) {
            return this.getPromise().finally(t)
        }
        getPromise() {
            return this.promise || (this.promise = this.execute()), this.promise
        }
        async execute() {
            var t = this;
            try {
                return {
                    data: await (await t.downloadFn()).blob(),
                    error: null
                }
            } catch (e) {
                if (t.shouldThrowOnError) throw e;
                if (Fe(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
    },
    We = {
        limit: 100,
        offset: 0,
        sortBy: {
            column: "name",
            order: "asc"
        }
    },
    Et = {
        cacheControl: "3600",
        contentType: "text/plain;charset=UTF-8",
        upsert: !1
    },
    Us = class extends ce {
        constructor(t, e = {}, r, s) {
            super(t, e, s, "storage"), this.bucketId = r
        }
        async uploadOrUpdate(t, e, r, s) {
            var i = this;
            return i.handleOperation(async () => {
                let n;
                const a = b(b({}, Et), s);
                let o = b(b({}, i.headers), t === "POST" && {
                    "x-upsert": String(a.upsert)
                });
                const l = a.metadata;
                if (typeof Blob < "u" && r instanceof Blob ? (n = new FormData, n.append("cacheControl", a.cacheControl), l && n.append("metadata", i.encodeMetadata(l)), n.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (n = r, n.has("cacheControl") || n.append("cacheControl", a.cacheControl), l && !n.has("metadata") && n.append("metadata", i.encodeMetadata(l))) : (n = r, o["cache-control"] = `max-age=${a.cacheControl}`, o["content-type"] = a.contentType, l && (o["x-metadata"] = i.toBase64(i.encodeMetadata(l))), (typeof ReadableStream < "u" && n instanceof ReadableStream || n && typeof n == "object" && "pipe" in n && typeof n.pipe == "function") && !a.duplex && (a.duplex = "half")), s ? .headers)
                    for (const [d, f] of Object.entries(s.headers)) o = xe(o, d, f);
                const c = i._removeEmptyFolders(e),
                    u = i._getFinalPath(c),
                    h = await (t == "PUT" ? it : D)(i.fetch, `${i.url}/object/${u}`, n, b({
                        headers: o
                    }, a ? .duplex ? {
                        duplex: a.duplex
                    } : {}));
                return {
                    path: c,
                    id: h.Id,
                    fullPath: h.Key
                }
            })
        }
        async upload(t, e, r) {
            return this.uploadOrUpdate("POST", t, e, r)
        }
        async uploadToSignedUrl(t, e, r, s) {
            var i = this;
            const n = i._removeEmptyFolders(t),
                a = i._getFinalPath(n),
                o = new URL(i.url + `/object/upload/sign/${a}`);
            return o.searchParams.set("token", e), i.handleOperation(async () => {
                let l;
                const c = b(b({}, Et), s);
                let u = b(b({}, i.headers), {
                    "x-upsert": String(c.upsert)
                });
                const h = c.metadata;
                if (typeof Blob < "u" && r instanceof Blob ? (l = new FormData, l.append("cacheControl", c.cacheControl), h && l.append("metadata", i.encodeMetadata(h)), l.append("", r)) : typeof FormData < "u" && r instanceof FormData ? (l = r, l.has("cacheControl") || l.append("cacheControl", c.cacheControl), h && !l.has("metadata") && l.append("metadata", i.encodeMetadata(h))) : (l = r, u["cache-control"] = `max-age=${c.cacheControl}`, u["content-type"] = c.contentType, h && (u["x-metadata"] = i.toBase64(i.encodeMetadata(h))), (typeof ReadableStream < "u" && l instanceof ReadableStream || l && typeof l == "object" && "pipe" in l && typeof l.pipe == "function") && !c.duplex && (c.duplex = "half")), s ? .headers)
                    for (const [d, f] of Object.entries(s.headers)) u = xe(u, d, f);
                return {
                    path: n,
                    fullPath: (await it(i.fetch, o.toString(), l, b({
                        headers: u
                    }, c ? .duplex ? {
                        duplex: c.duplex
                    } : {}))).Key
                }
            })
        }
        async createSignedUploadUrl(t, e) {
            var r = this;
            return r.handleOperation(async () => {
                let s = r._getFinalPath(t);
                const i = b({}, r.headers);
                e ? .upsert && (i["x-upsert"] = "true");
                const n = await D(r.fetch, `${r.url}/object/upload/sign/${s}`, {}, {
                        headers: i
                    }),
                    a = new URL(r.url + n.url),
                    o = a.searchParams.get("token");
                if (!o) throw new Me("No token returned by API");
                return {
                    signedUrl: a.toString(),
                    path: t,
                    token: o
                }
            })
        }
        async update(t, e, r) {
            return this.uploadOrUpdate("PUT", t, e, r)
        }
        async move(t, e, r) {
            var s = this;
            return s.handleOperation(async () => await D(s.fetch, `${s.url}/object/move`, {
                bucketId: s.bucketId,
                sourceKey: t,
                destinationKey: e,
                destinationBucket: r ? .destinationBucket
            }, {
                headers: s.headers
            }))
        }
        async copy(t, e, r) {
            var s = this;
            return s.handleOperation(async () => ({
                path: (await D(s.fetch, `${s.url}/object/copy`, {
                    bucketId: s.bucketId,
                    sourceKey: t,
                    destinationKey: e,
                    destinationBucket: r ? .destinationBucket
                }, {
                    headers: s.headers
                })).Key
            }))
        }
        async createSignedUrl(t, e, r) {
            var s = this;
            return s.handleOperation(async () => {
                let i = s._getFinalPath(t);
                const n = typeof r ? .transform == "object" && r.transform !== null && Object.keys(r.transform).length > 0;
                let a = await D(s.fetch, `${s.url}/object/sign/${i}`, b({
                    expiresIn: e
                }, n ? {
                    transform: r.transform
                } : {}), {
                    headers: s.headers
                });
                const o = new URLSearchParams;
                r ? .download && o.set("download", r.download === !0 ? "" : r.download), r ? .cacheNonce != null && o.set("cacheNonce", String(r.cacheNonce));
                const l = o.toString();
                return {
                    signedUrl: encodeURI(`${s.url}${a.signedURL}${l?`&${l}`:""}`)
                }
            })
        }
        async createSignedUrls(t, e, r) {
            var s = this;
            return s.handleOperation(async () => {
                const i = await D(s.fetch, `${s.url}/object/sign/${s.bucketId}`, {
                        expiresIn: e,
                        paths: t
                    }, {
                        headers: s.headers
                    }),
                    n = new URLSearchParams;
                r ? .download && n.set("download", r.download === !0 ? "" : r.download), r ? .cacheNonce != null && n.set("cacheNonce", String(r.cacheNonce));
                const a = n.toString();
                return i.map(o => b(b({}, o), {}, {
                    signedUrl: o.signedURL ? encodeURI(`${s.url}${o.signedURL}${a?`&${a}`:""}`) : null
                }))
            })
        }
        download(t, e, r) {
            const s = typeof e ? .transform == "object" && e.transform !== null && Object.keys(e.transform).length > 0 ? "render/image/authenticated" : "object",
                i = new URLSearchParams;
            e ? .transform && this.applyTransformOptsToQuery(i, e.transform), e ? .cacheNonce != null && i.set("cacheNonce", String(e.cacheNonce));
            const n = i.toString(),
                a = this._getFinalPath(t),
                o = () => ye(this.fetch, `${this.url}/${s}/${a}${n?`?${n}`:""}`, {
                    headers: this.headers,
                    noResolveJson: !0
                }, r);
            return new Ns(o, this.shouldThrowOnError)
        }
        async info(t) {
            var e = this;
            const r = e._getFinalPath(t);
            return e.handleOperation(async () => st(await ye(e.fetch, `${e.url}/object/info/${r}`, {
                headers: e.headers
            })))
        }
        async exists(t) {
            var e = this;
            const r = e._getFinalPath(t);
            try {
                return await $s(e.fetch, `${e.url}/object/${r}`, {
                    headers: e.headers
                }), {
                    data: !0,
                    error: null
                }
            } catch (i) {
                if (e.shouldThrowOnError) throw i;
                if (Fe(i)) {
                    var s;
                    const n = i instanceof rt ? i.status : i instanceof Xt ? (s = i.originalError) === null || s === void 0 ? void 0 : s.status : void 0;
                    if (n !== void 0 && [400, 404].includes(n)) return {
                        data: !1,
                        error: i
                    }
                }
                throw i
            }
        }
        getPublicUrl(t, e) {
            const r = this._getFinalPath(t),
                s = new URLSearchParams;
            e ? .download && s.set("download", e.download === !0 ? "" : e.download), e ? .transform && this.applyTransformOptsToQuery(s, e.transform), e ? .cacheNonce != null && s.set("cacheNonce", String(e.cacheNonce));
            const i = s.toString(),
                n = typeof e ? .transform == "object" && e.transform !== null && Object.keys(e.transform).length > 0 ? "render/image" : "object";
            return {
                data: {
                    publicUrl: encodeURI(`${this.url}/${n}/public/${r}`) + (i ? `?${i}` : "")
                }
            }
        }
        async remove(t) {
            var e = this;
            return e.handleOperation(async () => await me(e.fetch, `${e.url}/object/${e.bucketId}`, {
                prefixes: t
            }, {
                headers: e.headers
            }))
        }
        async purgeCache(t, e, r) {
            var s = this;
            return s.handleOperation(async () => {
                const i = s._getFinalPath(t),
                    n = new URLSearchParams;
                e ? .transformations && n.set("transformations", "true");
                const a = n.toString();
                return await me(s.fetch, `${s.url}/cdn/${i}${a?`?${a}`:""}`, {}, {
                    headers: s.headers
                }, r)
            })
        }
        async list(t, e, r) {
            var s = this;
            return s.handleOperation(async () => {
                const i = e ? .sortBy ? b(b({}, We.sortBy), e.sortBy) : We.sortBy,
                    n = b(b(b({}, We), e), {}, {
                        sortBy: i,
                        prefix: t || ""
                    });
                return await D(s.fetch, `${s.url}/object/list/${s.bucketId}`, n, {
                    headers: s.headers
                }, r)
            })
        }
        async listV2(t, e) {
            var r = this;
            return r.handleOperation(async () => {
                const s = b({}, t);
                return await D(r.fetch, `${r.url}/object/list-v2/${r.bucketId}`, s, {
                    headers: r.headers
                }, e)
            })
        }
        encodeMetadata(t) {
            return JSON.stringify(t)
        }
        toBase64(t) {
            return typeof Buffer < "u" ? Buffer.from(t).toString("base64") : btoa(t)
        }
        _getFinalPath(t) {
            return `${this.bucketId}/${t.replace(/^\/+/,"")}`
        }
        _removeEmptyFolders(t) {
            return t.replace(/^\/|\/$/g, "").replace(/\/+/g, "/")
        }
        applyTransformOptsToQuery(t, e) {
            return e.width && t.set("width", e.width.toString()), e.height && t.set("height", e.height.toString()), e.resize && t.set("resize", e.resize), e.format && t.set("format", e.format), e.quality && t.set("quality", e.quality.toString()), t
        }
    },
    be = {
        "X-Client-Info": "storage-js/2.110.0"
    },
    Ls = class extends ce {
        constructor(t, e = {}, r, s) {
            const i = new URL(t);
            s ? .useNewHostname && /supabase\.(co|in|red)$/.test(i.hostname) && !i.hostname.includes("storage.supabase.") && (i.hostname = i.hostname.replace("supabase.", "storage.supabase."));
            const n = i.href.replace(/\/$/, ""),
                a = b(b({}, be), e);
            super(n, a, r, "storage")
        }
        async listBuckets(t) {
            var e = this;
            return e.handleOperation(async () => {
                const r = e.listBucketOptionsToQueryString(t);
                return await ye(e.fetch, `${e.url}/bucket${r}`, {
                    headers: e.headers
                })
            })
        }
        async getBucket(t) {
            var e = this;
            return e.handleOperation(async () => await ye(e.fetch, `${e.url}/bucket/${t}`, {
                headers: e.headers
            }))
        }
        async createBucket(t, e = {
            public: !1
        }) {
            var r = this;
            return r.handleOperation(async () => await D(r.fetch, `${r.url}/bucket`, {
                id: t,
                name: t,
                type: e.type,
                public: e.public,
                file_size_limit: e.fileSizeLimit,
                allowed_mime_types: e.allowedMimeTypes
            }, {
                headers: r.headers
            }))
        }
        async updateBucket(t, e) {
            var r = this;
            return r.handleOperation(async () => await it(r.fetch, `${r.url}/bucket/${t}`, {
                id: t,
                name: t,
                public: e.public,
                file_size_limit: e.fileSizeLimit,
                allowed_mime_types: e.allowedMimeTypes
            }, {
                headers: r.headers
            }))
        }
        async emptyBucket(t) {
            var e = this;
            return e.handleOperation(async () => await D(e.fetch, `${e.url}/bucket/${t}/empty`, {}, {
                headers: e.headers
            }))
        }
        async deleteBucket(t) {
            var e = this;
            return e.handleOperation(async () => await me(e.fetch, `${e.url}/bucket/${t}`, {}, {
                headers: e.headers
            }))
        }
        async purgeBucketCache(t, e, r) {
            var s = this;
            return s.handleOperation(async () => {
                const i = new URLSearchParams;
                e ? .transformations && i.set("transformations", "true");
                const n = i.toString();
                return await me(s.fetch, `${s.url}/cdn/${t}${n?`?${n}`:""}`, {}, {
                    headers: s.headers
                }, r)
            })
        }
        listBucketOptionsToQueryString(t) {
            const e = {};
            return t && ("limit" in t && (e.limit = String(t.limit)), "offset" in t && (e.offset = String(t.offset)), t.search && (e.search = t.search), t.sortColumn && (e.sortColumn = t.sortColumn), t.sortOrder && (e.sortOrder = t.sortOrder)), Object.keys(e).length > 0 ? "?" + new URLSearchParams(e).toString() : ""
        }
    },
    Ds = class extends ce {
        constructor(t, e = {}, r) {
            const s = t.replace(/\/$/, ""),
                i = b(b({}, be), e);
            super(s, i, r, "storage")
        }
        async createBucket(t) {
            var e = this;
            return e.handleOperation(async () => await D(e.fetch, `${e.url}/bucket`, {
                name: t
            }, {
                headers: e.headers
            }))
        }
        async listBuckets(t) {
            var e = this;
            return e.handleOperation(async () => {
                const r = new URLSearchParams;
                t ? .limit !== void 0 && r.set("limit", t.limit.toString()), t ? .offset !== void 0 && r.set("offset", t.offset.toString()), t ? .sortColumn && r.set("sortColumn", t.sortColumn), t ? .sortOrder && r.set("sortOrder", t.sortOrder), t ? .search && r.set("search", t.search);
                const s = r.toString(),
                    i = s ? `${e.url}/bucket?${s}` : `${e.url}/bucket`;
                return await ye(e.fetch, i, {
                    headers: e.headers
                })
            })
        }
        async deleteBucket(t) {
            var e = this;
            return e.handleOperation(async () => await me(e.fetch, `${e.url}/bucket/${t}`, {}, {
                headers: e.headers
            }))
        }
        from(t) {
            var e = this;
            if (!Ps(t)) throw new Me("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
            const r = new Ss({
                    baseUrl: this.url,
                    catalogName: t,
                    auth: {
                        type: "custom",
                        getHeaders: async () => e.headers
                    },
                    fetch: this.fetch
                }),
                s = this.shouldThrowOnError;
            return new Proxy(r, {
                get(i, n) {
                    const a = i[n];
                    return typeof a != "function" ? a : async (...o) => {
                        try {
                            return {
                                data: await a.apply(i, o),
                                error: null
                            }
                        } catch (l) {
                            if (s) throw l;
                            return {
                                data: null,
                                error: l
                            }
                        }
                    }
                }
            })
        }
    },
    Bs = class extends ce {
        constructor(t, e = {}, r) {
            const s = t.replace(/\/$/, ""),
                i = b(b({}, be), {}, {
                    "Content-Type": "application/json"
                }, e);
            super(s, i, r, "vectors")
        }
        async createIndex(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/CreateIndex`, t, {
                headers: e.headers
            }) || {})
        }
        async getIndex(t, e) {
            var r = this;
            return r.handleOperation(async () => await x.post(r.fetch, `${r.url}/GetIndex`, {
                vectorBucketName: t,
                indexName: e
            }, {
                headers: r.headers
            }))
        }
        async listIndexes(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/ListIndexes`, t, {
                headers: e.headers
            }))
        }
        async deleteIndex(t, e) {
            var r = this;
            return r.handleOperation(async () => await x.post(r.fetch, `${r.url}/DeleteIndex`, {
                vectorBucketName: t,
                indexName: e
            }, {
                headers: r.headers
            }) || {})
        }
    },
    qs = class extends ce {
        constructor(t, e = {}, r) {
            const s = t.replace(/\/$/, ""),
                i = b(b({}, be), {}, {
                    "Content-Type": "application/json"
                }, e);
            super(s, i, r, "vectors")
        }
        async putVectors(t) {
            var e = this;
            if (t.vectors.length < 1 || t.vectors.length > 500) throw new Error("Vector batch size must be between 1 and 500 items");
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/PutVectors`, t, {
                headers: e.headers
            }) || {})
        }
        async getVectors(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/GetVectors`, t, {
                headers: e.headers
            }))
        }
        async listVectors(t) {
            var e = this;
            if (t.segmentCount !== void 0) {
                if (t.segmentCount < 1 || t.segmentCount > 16) throw new Error("segmentCount must be between 1 and 16");
                if (t.segmentIndex !== void 0 && (t.segmentIndex < 0 || t.segmentIndex >= t.segmentCount)) throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)
            }
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/ListVectors`, t, {
                headers: e.headers
            }))
        }
        async queryVectors(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/QueryVectors`, t, {
                headers: e.headers
            }))
        }
        async deleteVectors(t) {
            var e = this;
            if (t.keys.length < 1 || t.keys.length > 500) throw new Error("Keys batch size must be between 1 and 500 items");
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/DeleteVectors`, t, {
                headers: e.headers
            }) || {})
        }
    },
    Hs = class extends ce {
        constructor(t, e = {}, r) {
            const s = t.replace(/\/$/, ""),
                i = b(b({}, be), {}, {
                    "Content-Type": "application/json"
                }, e);
            super(s, i, r, "vectors")
        }
        async createBucket(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/CreateVectorBucket`, {
                vectorBucketName: t
            }, {
                headers: e.headers
            }) || {})
        }
        async getBucket(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/GetVectorBucket`, {
                vectorBucketName: t
            }, {
                headers: e.headers
            }))
        }
        async listBuckets(t = {}) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/ListVectorBuckets`, t, {
                headers: e.headers
            }))
        }
        async deleteBucket(t) {
            var e = this;
            return e.handleOperation(async () => await x.post(e.fetch, `${e.url}/DeleteVectorBucket`, {
                vectorBucketName: t
            }, {
                headers: e.headers
            }) || {})
        }
    },
    Ms = class extends Hs {
        constructor(t, e = {}) {
            super(t, e.headers || {}, e.fetch)
        }
        from(t) {
            return new Fs(this.url, this.headers, t, this.fetch)
        }
        async createBucket(t) {
            var e = () => super.createBucket,
                r = this;
            return e().call(r, t)
        }
        async getBucket(t) {
            var e = () => super.getBucket,
                r = this;
            return e().call(r, t)
        }
        async listBuckets(t = {}) {
            var e = () => super.listBuckets,
                r = this;
            return e().call(r, t)
        }
        async deleteBucket(t) {
            var e = () => super.deleteBucket,
                r = this;
            return e().call(r, t)
        }
    },
    Fs = class extends Bs {
        constructor(t, e, r, s) {
            super(t, e, s), this.vectorBucketName = r
        }
        async createIndex(t) {
            var e = () => super.createIndex,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName
            }))
        }
        async listIndexes(t = {}) {
            var e = () => super.listIndexes,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName
            }))
        }
        async getIndex(t) {
            var e = () => super.getIndex,
                r = this;
            return e().call(r, r.vectorBucketName, t)
        }
        async deleteIndex(t) {
            var e = () => super.deleteIndex,
                r = this;
            return e().call(r, r.vectorBucketName, t)
        }
        index(t) {
            return new Ws(this.url, this.headers, this.vectorBucketName, t, this.fetch)
        }
    },
    Ws = class extends qs {
        constructor(t, e, r, s, i) {
            super(t, e, i), this.vectorBucketName = r, this.indexName = s
        }
        async putVectors(t) {
            var e = () => super.putVectors,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName,
                indexName: r.indexName
            }))
        }
        async getVectors(t) {
            var e = () => super.getVectors,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName,
                indexName: r.indexName
            }))
        }
        async listVectors(t = {}) {
            var e = () => super.listVectors,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName,
                indexName: r.indexName
            }))
        }
        async queryVectors(t) {
            var e = () => super.queryVectors,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName,
                indexName: r.indexName
            }))
        }
        async deleteVectors(t) {
            var e = () => super.deleteVectors,
                r = this;
            return e().call(r, b(b({}, t), {}, {
                vectorBucketName: r.vectorBucketName,
                indexName: r.indexName
            }))
        }
    },
    Ks = class extends Ls {
        constructor(t, e = {}, r, s) {
            super(t, e, r, s)
        }
        from(t) {
            return new Us(this.url, this.headers, t, this.fetch)
        }
        get vectors() {
            return new Ms(this.url + "/vector", {
                headers: this.headers,
                fetch: this.fetch
            })
        }
        get analytics() {
            return new Ds(this.url + "/iceberg", this.headers, this.fetch)
        }
    },
    tr = "2.110.0",
    Q = 30 * 1e3;
var Ke = 3 * Q,
    Vs = 2 * Q,
    Js = "http://localhost:9999",
    Gs = "supabase.auth.token",
    zs = {
        "X-Client-Info": `gotrue-js/${tr}`
    },
    rr = "X-Supabase-Api-Version",
    sr = {
        "2024-01-01": {
            timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
            name: "2024-01-01"
        }
    },
    Ys = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
    bn = 600 * 1e3,
    we = class extends Error {
        constructor(t, e, r) {
            super(t), this.__isAuthError = !0, this.name = "AuthError", this.status = e, this.code = r
        }
        toJSON() {
            return {
                name: this.name,
                message: this.message,
                status: this.status,
                code: this.code
            }
        }
    };

function p(t) {
    return typeof t == "object" && t !== null && "__isAuthError" in t
}
var Xs = class extends we {
    constructor(t, e, r) {
        super(t, e, r), this.name = "AuthApiError", this.status = e, this.code = r
    }
};

function Qs(t) {
    return p(t) && t.name === "AuthApiError"
}
var B = class extends we {
        constructor(t, e) {
            super(t), this.name = "AuthUnknownError", this.originalError = e
        }
    },
    M = class extends we {
        constructor(t, e, r, s) {
            super(t, r, s), this.name = e, this.status = r
        }
    },
    C = class extends M {
        constructor() {
            super("Auth session missing!", "AuthSessionMissingError", 400, void 0)
        }
    };

function Ae(t) {
    return p(t) && t.name === "AuthSessionMissingError"
}
var re = class extends M {
        constructor() {
            super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0)
        }
    },
    Re = class extends M {
        constructor(t) {
            super(t, "AuthInvalidCredentialsError", 400, void 0)
        }
    },
    Oe = class extends M {
        constructor(t, e = null) {
            super(t, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = e
        }
        toJSON() {
            return Object.assign(Object.assign({}, super.toJSON()), {
                details: this.details
            })
        }
    };

function Zs(t) {
    return p(t) && t.name === "AuthImplicitGrantRedirectError"
}
var Tt = class extends M {
        constructor(t, e = null) {
            super(t, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = e
        }
        toJSON() {
            return Object.assign(Object.assign({}, super.toJSON()), {
                details: this.details
            })
        }
    },
    ei = class extends M {
        constructor() {
            super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found")
        }
    },
    nt = class extends M {
        constructor(t, e) {
            super(t, "AuthRetryableFetchError", e, void 0)
        }
    };

function At(t) {
    return p(t) && t.name === "AuthRetryableFetchError"
}
var Rt = class extends M {
    constructor(t = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)") {
        super(t, "AuthRefreshDiscardedError", 409, void 0)
    }
};

function ti(t) {
    return p(t) && t.name === "AuthRefreshDiscardedError"
}
var Ot = class extends M {
        constructor(t, e, r) {
            super(t, "AuthWeakPasswordError", e, "weak_password"), this.reasons = r
        }
        toJSON() {
            return Object.assign(Object.assign({}, super.toJSON()), {
                reasons: this.reasons
            })
        }
    },
    Ne = class extends M {
        constructor(t) {
            super(t, "AuthInvalidJwtError", 400, "invalid_jwt")
        }
    },
    Ue = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),
    Ct = ` 	
\r=`.split(""),
    ri = (() => {
        const t = new Array(128);
        for (let e = 0; e < t.length; e += 1) t[e] = -1;
        for (let e = 0; e < Ct.length; e += 1) t[Ct[e].charCodeAt(0)] = -2;
        for (let e = 0; e < Ue.length; e += 1) t[Ue[e].charCodeAt(0)] = e;
        return t
    })();

function Pt(t, e, r) {
    if (t !== null)
        for (e.queue = e.queue << 8 | t, e.queuedBits += 8; e.queuedBits >= 6;) r(Ue[e.queue >> e.queuedBits - 6 & 63]), e.queuedBits -= 6;
    else if (e.queuedBits > 0)
        for (e.queue = e.queue << 6 - e.queuedBits, e.queuedBits = 6; e.queuedBits >= 6;) r(Ue[e.queue >> e.queuedBits - 6 & 63]), e.queuedBits -= 6
}

function ir(t, e, r) {
    const s = ri[t];
    if (s > -1)
        for (e.queue = e.queue << 6 | s, e.queuedBits += 6; e.queuedBits >= 8;) r(e.queue >> e.queuedBits - 8 & 255), e.queuedBits -= 8;
    else {
        if (s === -2) return;
        throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)
    }
}

function jt(t) {
    const e = [],
        r = a => {
            e.push(String.fromCodePoint(a))
        },
        s = {
            utf8seq: 0,
            codepoint: 0
        },
        i = {
            queue: 0,
            queuedBits: 0
        },
        n = a => {
            ni(a, s, r)
        };
    for (let a = 0; a < t.length; a += 1) ir(t.charCodeAt(a), i, n);
    return e.join("")
}

function si(t, e) {
    if (t <= 127) {
        e(t);
        return
    } else if (t <= 2047) {
        e(192 | t >> 6), e(128 | t & 63);
        return
    } else if (t <= 65535) {
        e(224 | t >> 12), e(128 | t >> 6 & 63), e(128 | t & 63);
        return
    } else if (t <= 1114111) {
        e(240 | t >> 18), e(128 | t >> 12 & 63), e(128 | t >> 6 & 63), e(128 | t & 63);
        return
    }
    throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)
}

function ii(t, e) {
    for (let r = 0; r < t.length; r += 1) {
        let s = t.charCodeAt(r);
        if (s > 55295 && s <= 56319) {
            const i = (s - 55296) * 1024 & 65535;
            s = (t.charCodeAt(r + 1) - 56320 & 65535 | i) + 65536, r += 1
        }
        si(s, e)
    }
}

function ni(t, e, r) {
    if (e.utf8seq === 0) {
        if (t <= 127) {
            r(t);
            return
        }
        for (let s = 1; s < 6; s += 1)
            if ((t >> 7 - s & 1) === 0) {
                e.utf8seq = s;
                break
            }
        if (e.utf8seq === 2) e.codepoint = t & 31;
        else if (e.utf8seq === 3) e.codepoint = t & 15;
        else if (e.utf8seq === 4) e.codepoint = t & 7;
        else throw new Error("Invalid UTF-8 sequence");
        e.utf8seq -= 1
    } else if (e.utf8seq > 0) {
        if (t <= 127) throw new Error("Invalid UTF-8 sequence");
        e.codepoint = e.codepoint << 6 | t & 63, e.utf8seq -= 1, e.utf8seq === 0 && r(e.codepoint)
    }
}

function le(t) {
    const e = [],
        r = {
            queue: 0,
            queuedBits: 0
        },
        s = i => {
            e.push(i)
        };
    for (let i = 0; i < t.length; i += 1) ir(t.charCodeAt(i), r, s);
    return new Uint8Array(e)
}

function ai(t) {
    const e = [];
    return ii(t, r => e.push(r)), new Uint8Array(e)
}

function Z(t) {
    const e = [],
        r = {
            queue: 0,
            queuedBits: 0
        },
        s = i => {
            e.push(i)
        };
    return t.forEach(i => Pt(i, r, s)), Pt(null, r, s), e.join("")
}

function oi(t) {
    return Math.round(Date.now() / 1e3) + t
}

function li() {
    return Symbol("auth-callback")
}
var j = () => typeof window < "u" && typeof document < "u",
    z = {
        tested: !1,
        writable: !1
    },
    nr = () => {
        if (!j()) return !1;
        try {
            if (typeof globalThis.localStorage != "object") return !1
        } catch {
            return !1
        }
        if (z.tested) return z.writable;
        const t = `lswt-${Math.random()}${Math.random()}`;
        try {
            globalThis.localStorage.setItem(t, t), globalThis.localStorage.removeItem(t), z.tested = !0, z.writable = !0
        } catch {
            z.tested = !0, z.writable = !1
        }
        return z.writable
    };

function ci(t) {
    const e = {},
        r = new URL(t);
    if (r.hash && r.hash[0] === "#") try {
        new URLSearchParams(r.hash.substring(1)).forEach((s, i) => {
            e[i] = s
        })
    } catch {}
    return r.searchParams.forEach((s, i) => {
        e[i] = s
    }), e
}
var ar = t => t ? (...e) => t(...e) : (...e) => fetch(...e),
    hi = t => typeof t == "object" && t !== null && "status" in t && "ok" in t && "json" in t && typeof t.json == "function",
    ae = async (t, e, r) => {
        await t.setItem(e, JSON.stringify(r))
    },
    U = async (t, e) => {
        const r = await t.getItem(e);
        if (!r) return null;
        try {
            return JSON.parse(r)
        } catch {
            return null
        }
    },
    R = async (t, e) => {
        await t.removeItem(e)
    },
    or = class lr {
        constructor() {
            this.promise = new lr.promiseConstructor((e, r) => {
                this.resolve = e, this.reject = r
            })
        }
    };
or.promiseConstructor = Promise;

function Ce(t) {
    const e = t.split(".");
    if (e.length !== 3) throw new Ne("Invalid JWT structure");
    for (let r = 0; r < e.length; r++)
        if (!Ys.test(e[r])) throw new Ne("JWT not in base64url format");
    return {
        header: JSON.parse(jt(e[0])),
        payload: JSON.parse(jt(e[1])),
        signature: le(e[2]),
        raw: {
            header: e[0],
            payload: e[1]
        }
    }
}
async function ui(t) {
    return await new Promise(e => {
        setTimeout(() => e(null), t)
    })
}

function di(t, e) {
    return new Promise((r, s) => {
        (async () => {
            for (let i = 0; i < 1 / 0; i++) try {
                const n = await t(i);
                if (!e(i, null, n)) {
                    r(n);
                    return
                }
            } catch (n) {
                if (!e(i, n)) {
                    s(n);
                    return
                }
            }
        })()
    })
}

function fi(t) {
    return ("0" + t.toString(16)).substr(-2)
}

function gi() {
    const e = new Uint32Array(56);
    if (typeof crypto > "u") {
        const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        let i = "";
        for (let n = 0; n < 56; n++) i += r.charAt(Math.floor(Math.random() * 66));
        return i
    }
    return crypto.getRandomValues(e), Array.from(e, fi).join("")
}
async function pi(t) {
    const e = new TextEncoder().encode(t),
        r = await crypto.subtle.digest("SHA-256", e),
        s = new Uint8Array(r);
    return Array.from(s).map(i => String.fromCharCode(i)).join("")
}
async function vi(t) {
    if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u")) return t;
    const e = await pi(t);
    return btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}
async function Y(t, e, r = !1) {
    const s = gi();
    let i = s;
    r && (i += "/recovery"), await ae(t, `${e}-code-verifier`, i);
    const n = await vi(s);
    return [n, s === n ? "plain" : "s256"]
}
var yi = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;

function mi(t) {
    const e = t.headers.get(rr);
    if (!e || !e.match(yi)) return null;
    try {
        return new Date(`${e}T00:00:00.0Z`)
    } catch {
        return null
    }
}

function wi(t) {
    if (!t) throw new Error("Missing exp claim");
    if (t <= Math.floor(Date.now() / 1e3)) throw new Error("JWT has expired")
}

function _i(t) {
    switch (t) {
        case "RS256":
            return {
                name: "RSASSA-PKCS1-v1_5",
                hash: {
                    name: "SHA-256"
                }
            };
        case "ES256":
            return {
                name: "ECDSA",
                namedCurve: "P-256",
                hash: {
                    name: "SHA-256"
                }
            };
        default:
            throw new Error("Invalid alg claim")
    }
}
var bi = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function F(t) {
    if (!bi.test(t)) throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")
}

function L(t) {
    if (!t.passkey) throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")
}

function Ve() {
    return new Proxy({}, {
        get: (t, e) => {
            if (e === "__isUserNotAvailableProxy") return !0;
            if (typeof e == "symbol") {
                const r = e.toString();
                if (r === "Symbol(Symbol.toPrimitive)" || r === "Symbol(Symbol.toStringTag)" || r === "Symbol(util.inspect.custom)") return
            }
            throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${e}" property of the session object is not supported. Please use getUser() instead.`)
        },
        set: (t, e) => {
            throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${e}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)
        },
        deleteProperty: (t, e) => {
            throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${e}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)
        }
    })
}

function ki(t, e) {
    return new Proxy(t, {
        get: (r, s, i) => {
            if (s === "__isInsecureUserWarningProxy") return !0;
            if (typeof s == "symbol") {
                const n = s.toString();
                if (n === "Symbol(Symbol.toPrimitive)" || n === "Symbol(Symbol.toStringTag)" || n === "Symbol(util.inspect.custom)" || n === "Symbol(nodejs.util.inspect.custom)") return Reflect.get(r, s, i)
            }
            return !e.value && typeof s == "string" && (e.value = !0), Reflect.get(r, s, i)
        }
    })
}

function It(t) {
    return JSON.parse(JSON.stringify(t))
}
var X = t => {
        if (typeof t == "object" && t !== null) {
            const e = t;
            if (typeof e.msg == "string") return e.msg;
            if (typeof e.message == "string") return e.message;
            if (typeof e.error_description == "string") return e.error_description;
            if (typeof e.error == "string") return e.error
        }
        return JSON.stringify(t)
    },
    Si = [500, 501, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530];
async function $t(t) {
    var e;
    if (!hi(t)) throw new nt(X(t), 0);
    if (Si.includes(t.status)) throw new nt(X(t), t.status);
    let r;
    try {
        r = await t.json()
    } catch (n) {
        throw new B(X(n), n)
    }
    let s;
    const i = mi(t);
    if (i && i.getTime() >= sr["2024-01-01"].timestamp && typeof r == "object" && r && typeof r.code == "string" ? s = r.code : typeof r == "object" && r && typeof r.error_code == "string" && (s = r.error_code), s) {
        if (s === "weak_password") throw new Ot(X(r), t.status, ((e = r.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
        if (s === "session_not_found") throw new C
    } else if (typeof r == "object" && r && typeof r.weak_password == "object" && r.weak_password && Array.isArray(r.weak_password.reasons) && r.weak_password.reasons.length && r.weak_password.reasons.reduce((n, a) => n && typeof a == "string", !0)) throw new Ot(X(r), t.status, r.weak_password.reasons);
    throw new Xs(X(r), t.status || 500, s)
}
var Ei = (t, e, r, s) => {
    const i = {
        method: t,
        headers: e ? .headers || {}
    };
    return t === "GET" ? i : (i.headers = Object.assign({
        "Content-Type": "application/json;charset=UTF-8"
    }, e ? .headers), i.body = JSON.stringify(s), Object.assign(Object.assign({}, i), r))
};
async function y(t, e, r, s) {
    var i;
    const n = Object.assign({}, s ? .headers);
    n["X-Supabase-Api-Version"] || (n[rr] = sr["2024-01-01"].name), s ? .jwt && (n.Authorization = `Bearer ${s.jwt}`);
    const a = (i = s ? .query) !== null && i !== void 0 ? i : {};
    s ? .redirectTo && (a.redirect_to = s.redirectTo);
    const o = await Ti(t, e, r + (Object.keys(a).length ? "?" + new URLSearchParams(a).toString() : ""), {
        headers: n,
        noResolveJson: s ? .noResolveJson
    }, {}, s ? .body);
    return s ? .xform ? s ? .xform(o) : {
        data: Object.assign({}, o),
        error: null
    }
}
async function Ti(t, e, r, s, i, n) {
    const a = Ei(e, s, i, n);
    let o;
    try {
        o = await t(r, Object.assign({}, a))
    } catch (l) {
        throw new nt(X(l), 0)
    }
    if (o.ok || await $t(o), s ? .noResolveJson) return o;
    try {
        return await o.json()
    } catch (l) {
        await $t(l)
    }
}

function N(t) {
    var e;
    let r = null;
    Oi(t) && (r = Object.assign({}, t), t.expires_at || (r.expires_at = oi(t.expires_in)));
    const s = (e = t.user) !== null && e !== void 0 ? e : typeof t ? .id == "string" ? t : null;
    return {
        data: {
            session: r,
            user: s
        },
        error: null
    }
}

function xt(t) {
    const e = N(t);
    return !e.error && t.weak_password && typeof t.weak_password == "object" && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.message && typeof t.weak_password.message == "string" && t.weak_password.reasons.reduce((r, s) => r && typeof s == "string", !0) && (e.data.weak_password = t.weak_password), e
}

function J(t) {
    var e;
    return {
        data: {
            user: (e = t.user) !== null && e !== void 0 ? e : t
        },
        error: null
    }
}

function Ai(t) {
    return {
        data: t,
        error: null
    }
}

function Ri(t) {
    const {
        action_link: e,
        email_otp: r,
        hashed_token: s,
        redirect_to: i,
        verification_type: n
    } = t, a = He(t, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
    return {
        data: {
            properties: {
                action_link: e,
                email_otp: r,
                hashed_token: s,
                redirect_to: i,
                verification_type: n
            },
            user: Object.assign({}, a)
        },
        error: null
    }
}

function Nt(t) {
    return t
}

function Oi(t) {
    return !!t.access_token && !!t.refresh_token && !!t.expires_in
}
var Je = ["global", "local", "others"],
    Ci = class {
        constructor({
            url: t = "",
            headers: e = {},
            fetch: r,
            experimental: s
        }) {
            this.url = t, this.headers = e, this.fetch = ar(r), this.experimental = s ? ? {}, this.mfa = {
                listFactors: this._listFactors.bind(this),
                deleteFactor: this._deleteFactor.bind(this)
            }, this.oauth = {
                listClients: this._listOAuthClients.bind(this),
                createClient: this._createOAuthClient.bind(this),
                getClient: this._getOAuthClient.bind(this),
                updateClient: this._updateOAuthClient.bind(this),
                deleteClient: this._deleteOAuthClient.bind(this),
                regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
            }, this.customProviders = {
                listProviders: this._listCustomProviders.bind(this),
                createProvider: this._createCustomProvider.bind(this),
                getProvider: this._getCustomProvider.bind(this),
                updateProvider: this._updateCustomProvider.bind(this),
                deleteProvider: this._deleteCustomProvider.bind(this)
            }, this.passkey = {
                listPasskeys: this._adminListPasskeys.bind(this),
                deletePasskey: this._adminDeletePasskey.bind(this)
            }
        }
        async signOut(t, e = Je[0]) {
            if (Je.indexOf(e) < 0) throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Je.join(", ")}`);
            try {
                return await y(this.fetch, "POST", `${this.url}/logout?scope=${e}`, {
                    headers: this.headers,
                    jwt: t,
                    noResolveJson: !0
                }), {
                    data: null,
                    error: null
                }
            } catch (r) {
                if (p(r)) return {
                    data: null,
                    error: r
                };
                throw r
            }
        }
        async inviteUserByEmail(t, e = {}) {
            try {
                return await y(this.fetch, "POST", `${this.url}/invite`, {
                    body: {
                        email: t,
                        data: e.data
                    },
                    headers: this.headers,
                    redirectTo: e.redirectTo,
                    xform: J
                })
            } catch (r) {
                if (p(r)) return {
                    data: {
                        user: null
                    },
                    error: r
                };
                throw r
            }
        }
        async generateLink(t) {
            try {
                const {
                    options: e
                } = t, r = He(t, ["options"]), s = Object.assign(Object.assign({}, r), e);
                return "newEmail" in r && (s.new_email = r ? .newEmail, delete s.newEmail), await y(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                    body: s,
                    headers: this.headers,
                    xform: Ri,
                    redirectTo: e ? .redirectTo
                })
            } catch (e) {
                if (p(e)) return {
                    data: {
                        properties: null,
                        user: null
                    },
                    error: e
                };
                throw e
            }
        }
        async createUser(t) {
            try {
                return await y(this.fetch, "POST", `${this.url}/admin/users`, {
                    body: t,
                    headers: this.headers,
                    xform: J
                })
            } catch (e) {
                if (p(e)) return {
                    data: {
                        user: null
                    },
                    error: e
                };
                throw e
            }
        }
        async listUsers(t) {
            var e, r, s, i, n, a, o;
            try {
                const l = {
                        nextPage: null,
                        lastPage: 0,
                        total: 0
                    },
                    c = await y(this.fetch, "GET", `${this.url}/admin/users`, {
                        headers: this.headers,
                        noResolveJson: !0,
                        query: {
                            page: (r = (e = t ? .page) === null || e === void 0 ? void 0 : e.toString()) !== null && r !== void 0 ? r : "",
                            per_page: (i = (s = t ? .perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
                        },
                        xform: Nt
                    });
                if (c.error) throw c.error;
                const u = await c.json(),
                    h = (n = c.headers.get("x-total-count")) !== null && n !== void 0 ? n : 0,
                    d = (o = (a = c.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && o !== void 0 ? o : [];
                return d.length > 0 && (d.forEach(f => {
                    const g = parseInt(f.split(";")[0].split("=")[1].substring(0, 1)),
                        v = JSON.parse(f.split(";")[1].split("=")[1]);
                    l[`${v}Page`] = g
                }), l.total = parseInt(h)), {
                    data: Object.assign(Object.assign({}, u), l),
                    error: null
                }
            } catch (l) {
                if (p(l)) return {
                    data: {
                        users: []
                    },
                    error: l
                };
                throw l
            }
        }
        async getUserById(t) {
            F(t);
            try {
                return await y(this.fetch, "GET", `${this.url}/admin/users/${t}`, {
                    headers: this.headers,
                    xform: J
                })
            } catch (e) {
                if (p(e)) return {
                    data: {
                        user: null
                    },
                    error: e
                };
                throw e
            }
        }
        async updateUserById(t, e) {
            F(t);
            try {
                return await y(this.fetch, "PUT", `${this.url}/admin/users/${t}`, {
                    body: e,
                    headers: this.headers,
                    xform: J
                })
            } catch (r) {
                if (p(r)) return {
                    data: {
                        user: null
                    },
                    error: r
                };
                throw r
            }
        }
        async deleteUser(t, e = !1) {
            F(t);
            try {
                return await y(this.fetch, "DELETE", `${this.url}/admin/users/${t}`, {
                    headers: this.headers,
                    body: {
                        should_soft_delete: e
                    },
                    xform: J
                })
            } catch (r) {
                if (p(r)) return {
                    data: {
                        user: null
                    },
                    error: r
                };
                throw r
            }
        }
        async _listFactors(t) {
            F(t.userId);
            try {
                const {
                    data: e,
                    error: r
                } = await y(this.fetch, "GET", `${this.url}/admin/users/${t.userId}/factors`, {
                    headers: this.headers,
                    xform: s => ({
                        data: {
                            factors: s
                        },
                        error: null
                    })
                });
                return {
                    data: e,
                    error: r
                }
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _deleteFactor(t) {
            F(t.userId), F(t.id);
            try {
                return {
                    data: await y(this.fetch, "DELETE", `${this.url}/admin/users/${t.userId}/factors/${t.id}`, {
                        headers: this.headers
                    }),
                    error: null
                }
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _listOAuthClients(t) {
            var e, r, s, i, n, a, o;
            try {
                const l = {
                        nextPage: null,
                        lastPage: 0,
                        total: 0
                    },
                    c = await y(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
                        headers: this.headers,
                        noResolveJson: !0,
                        query: {
                            page: (r = (e = t ? .page) === null || e === void 0 ? void 0 : e.toString()) !== null && r !== void 0 ? r : "",
                            per_page: (i = (s = t ? .perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
                        },
                        xform: Nt
                    });
                if (c.error) throw c.error;
                const u = await c.json(),
                    h = (n = c.headers.get("x-total-count")) !== null && n !== void 0 ? n : 0,
                    d = (o = (a = c.headers.get("link")) === null || a === void 0 ? void 0 : a.split(",")) !== null && o !== void 0 ? o : [];
                return d.length > 0 && (d.forEach(f => {
                    const g = parseInt(f.split(";")[0].split("=")[1].substring(0, 1)),
                        v = JSON.parse(f.split(";")[1].split("=")[1]);
                    l[`${v}Page`] = g
                }), l.total = parseInt(h)), {
                    data: Object.assign(Object.assign({}, u), l),
                    error: null
                }
            } catch (l) {
                if (p(l)) return {
                    data: {
                        clients: []
                    },
                    error: l
                };
                throw l
            }
        }
        async _createOAuthClient(t) {
            try {
                return await y(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
                    body: t,
                    headers: this.headers,
                    xform: e => ({
                        data: e,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _getOAuthClient(t) {
            try {
                return await y(this.fetch, "GET", `${this.url}/admin/oauth/clients/${t}`, {
                    headers: this.headers,
                    xform: e => ({
                        data: e,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _updateOAuthClient(t, e) {
            try {
                return await y(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${t}`, {
                    body: e,
                    headers: this.headers,
                    xform: r => ({
                        data: r,
                        error: null
                    })
                })
            } catch (r) {
                if (p(r)) return {
                    data: null,
                    error: r
                };
                throw r
            }
        }
        async _deleteOAuthClient(t) {
            try {
                return await y(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${t}`, {
                    headers: this.headers,
                    noResolveJson: !0
                }), {
                    data: null,
                    error: null
                }
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _regenerateOAuthClientSecret(t) {
            try {
                return await y(this.fetch, "POST", `${this.url}/admin/oauth/clients/${t}/regenerate_secret`, {
                    headers: this.headers,
                    xform: e => ({
                        data: e,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _listCustomProviders(t) {
            try {
                const e = {};
                return t ? .type && (e.type = t.type), await y(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
                    headers: this.headers,
                    query: e,
                    xform: r => {
                        var s;
                        return {
                            data: {
                                providers: (s = r ? .providers) !== null && s !== void 0 ? s : []
                            },
                            error: null
                        }
                    }
                })
            } catch (e) {
                if (p(e)) return {
                    data: {
                        providers: []
                    },
                    error: e
                };
                throw e
            }
        }
        async _createCustomProvider(t) {
            try {
                return await y(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
                    body: t,
                    headers: this.headers,
                    xform: e => ({
                        data: e,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _getCustomProvider(t) {
            try {
                return await y(this.fetch, "GET", `${this.url}/admin/custom-providers/${t}`, {
                    headers: this.headers,
                    xform: e => ({
                        data: e,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _updateCustomProvider(t, e) {
            try {
                return await y(this.fetch, "PUT", `${this.url}/admin/custom-providers/${t}`, {
                    body: e,
                    headers: this.headers,
                    xform: r => ({
                        data: r,
                        error: null
                    })
                })
            } catch (r) {
                if (p(r)) return {
                    data: null,
                    error: r
                };
                throw r
            }
        }
        async _deleteCustomProvider(t) {
            try {
                return await y(this.fetch, "DELETE", `${this.url}/admin/custom-providers/${t}`, {
                    headers: this.headers,
                    noResolveJson: !0
                }), {
                    data: null,
                    error: null
                }
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _adminListPasskeys(t) {
            L(this.experimental), F(t.userId);
            try {
                return await y(this.fetch, "GET", `${this.url}/admin/users/${t.userId}/passkeys`, {
                    headers: this.headers,
                    xform: e => ({
                        data: e,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
        async _adminDeletePasskey(t) {
            L(this.experimental), F(t.userId), F(t.passkeyId);
            try {
                return await y(this.fetch, "DELETE", `${this.url}/admin/users/${t.userId}/passkeys/${t.passkeyId}`, {
                    headers: this.headers,
                    noResolveJson: !0
                }), {
                    data: null,
                    error: null
                }
            } catch (e) {
                if (p(e)) return {
                    data: null,
                    error: e
                };
                throw e
            }
        }
    };

function Ut(t = {}) {
    return {
        getItem: e => t[e] || null,
        setItem: (e, r) => {
            t[e] = r
        },
        removeItem: e => {
            delete t[e]
        }
    }
}
var kn = {
        debug: !!(globalThis && nr() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
    },
    Pi = class extends Error {
        constructor(t) {
            super(t), this.isAcquireTimeout = !0
        }
    };

function ji() {
    if (typeof globalThis != "object") try {
        Object.defineProperty(Object.prototype, "__magic__", {
            get: function() {
                return this
            },
            configurable: !0
        }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__
    } catch {
        typeof self < "u" && (self.globalThis = self)
    }
}

function cr(t) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(t)) throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);
    return t.toLowerCase()
}

function Ii(t) {
    return parseInt(t, 16)
}

function $i(t) {
    const e = new TextEncoder().encode(t);
    return "0x" + Array.from(e, r => r.toString(16).padStart(2, "0")).join("")
}

function xi(t) {
    var e;
    const {
        chainId: r,
        domain: s,
        expirationTime: i,
        issuedAt: n = new Date,
        nonce: a,
        notBefore: o,
        requestId: l,
        resources: c,
        scheme: u,
        uri: h,
        version: d
    } = t;
    if (!Number.isInteger(r)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);
    if (!s) throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
    if (a && a.length < 8) throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);
    if (!h) throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if (d !== "1") throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);
    if (!((e = t.statement) === null || e === void 0) && e.includes(`
`)) throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`);
    const f = cr(t.address),
        g = `${u?`${u}://${s}`:s} wants you to sign in with your Ethereum account:
${f}

${t.statement?`${t.statement}
`:""}`;
    let v = `URI: ${h}
Version: ${d}
Chain ID: ${r}${a?`
Nonce: ${a}`:""}
Issued At: ${n.toISOString()}`;
    if (i && (v += `
Expiration Time: ${i.toISOString()}`), o && (v += `
Not Before: ${o.toISOString()}`), l && (v += `
Request ID: ${l}`), c) {
        let m = `
Resources:`;
        for (const _ of c) {
            if (!_ || typeof _ != "string") throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${_}`);
            m += `
- ${_}`
        }
        v += m
    }
    return `${g}
${v}`
}
var O = class extends Error {
        constructor({
            message: t,
            code: e,
            cause: r,
            name: s
        }) {
            var i;
            super(t, {
                cause: r
            }), this.__isWebAuthnError = !0, this.name = (i = s ? ? (r instanceof Error ? r.name : void 0)) !== null && i !== void 0 ? i : "Unknown Error", this.code = e
        }
        toJSON() {
            return {
                name: this.name,
                message: this.message,
                code: this.code
            }
        }
    },
    Le = class extends O {
        constructor(t, e) {
            super({
                code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
                cause: e,
                message: t
            }), this.name = "WebAuthnUnknownError", this.originalError = e
        }
    };

function Ni({
    error: t,
    options: e
}) {
    var r, s, i;
    const {
        publicKey: n
    } = e;
    if (!n) throw Error("options was missing required publicKey property");
    if (t.name === "AbortError") {
        if (e.signal instanceof AbortSignal) return new O({
            message: "Registration ceremony was sent an abort signal",
            code: "ERROR_CEREMONY_ABORTED",
            cause: t
        })
    } else if (t.name === "ConstraintError") {
        if (((r = n.authenticatorSelection) === null || r === void 0 ? void 0 : r.requireResidentKey) === !0) return new O({
            message: "Discoverable credentials were required but no available authenticator supported it",
            code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
            cause: t
        });
        if (e.mediation === "conditional" && ((s = n.authenticatorSelection) === null || s === void 0 ? void 0 : s.userVerification) === "required") return new O({
            message: "User verification was required during automatic registration but it could not be performed",
            code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
            cause: t
        });
        if (((i = n.authenticatorSelection) === null || i === void 0 ? void 0 : i.userVerification) === "required") return new O({
            message: "User verification was required but no available authenticator supported it",
            code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
            cause: t
        })
    } else {
        if (t.name === "InvalidStateError") return new O({
            message: "The authenticator was previously registered",
            code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
            cause: t
        });
        if (t.name === "NotAllowedError") return new O({
            message: t.message,
            code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
            cause: t
        });
        if (t.name === "NotSupportedError") return n.pubKeyCredParams.filter(a => a.type === "public-key").length === 0 ? new O({
            message: 'No entry in pubKeyCredParams was of type "public-key"',
            code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
            cause: t
        }) : new O({
            message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
            code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
            cause: t
        });
        if (t.name === "SecurityError") {
            const a = window.location.hostname;
            if (hr(a)) {
                if (n.rp.id !== a) return new O({
                    message: `The RP ID "${n.rp.id}" is invalid for this domain`,
                    code: "ERROR_INVALID_RP_ID",
                    cause: t
                })
            } else return new O({
                message: `${window.location.hostname} is an invalid domain`,
                code: "ERROR_INVALID_DOMAIN",
                cause: t
            })
        } else if (t.name === "TypeError") {
            if (n.user.id.byteLength < 1 || n.user.id.byteLength > 64) return new O({
                message: "User ID was not between 1 and 64 characters",
                code: "ERROR_INVALID_USER_ID_LENGTH",
                cause: t
            })
        } else if (t.name === "UnknownError") return new O({
            message: "The authenticator was unable to process the specified options, or could not create a new credential",
            code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
            cause: t
        })
    }
    return new O({
        message: "a Non-Webauthn related error has occurred",
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: t
    })
}

function Ui({
    error: t,
    options: e
}) {
    const {
        publicKey: r
    } = e;
    if (!r) throw Error("options was missing required publicKey property");
    if (t.name === "AbortError") {
        if (e.signal instanceof AbortSignal) return new O({
            message: "Authentication ceremony was sent an abort signal",
            code: "ERROR_CEREMONY_ABORTED",
            cause: t
        })
    } else {
        if (t.name === "NotAllowedError") return new O({
            message: t.message,
            code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
            cause: t
        });
        if (t.name === "SecurityError") {
            const s = window.location.hostname;
            if (hr(s)) {
                if (r.rpId !== s) return new O({
                    message: `The RP ID "${r.rpId}" is invalid for this domain`,
                    code: "ERROR_INVALID_RP_ID",
                    cause: t
                })
            } else return new O({
                message: `${window.location.hostname} is an invalid domain`,
                code: "ERROR_INVALID_DOMAIN",
                cause: t
            })
        } else if (t.name === "UnknownError") return new O({
            message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
            code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
            cause: t
        })
    }
    return new O({
        message: "a Non-Webauthn related error has occurred",
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: t
    })
}
var Li = class {
        createNewAbortSignal() {
            if (this.controller) {
                const e = new Error("Cancelling existing WebAuthn API call for new one");
                e.name = "AbortError", this.controller.abort(e)
            }
            const t = new AbortController;
            return this.controller = t, t.signal
        }
        cancelCeremony() {
            if (this.controller) {
                const t = new Error("Manually cancelling existing WebAuthn API call");
                t.name = "AbortError", this.controller.abort(t), this.controller = void 0
            }
        }
    },
    at = new Li;

function Lt(t) {
    if (!t) throw new Error("Credential creation options are required");
    if (typeof PublicKeyCredential < "u" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function") return PublicKeyCredential.parseCreationOptionsFromJSON(t);
    const {
        challenge: e,
        user: r,
        excludeCredentials: s
    } = t, i = He(t, ["challenge", "user", "excludeCredentials"]), n = le(e).buffer, a = Object.assign(Object.assign({}, r), {
        id: le(r.id).buffer
    }), o = Object.assign(Object.assign({}, i), {
        challenge: n,
        user: a
    });
    if (s && s.length > 0) {
        o.excludeCredentials = new Array(s.length);
        for (let l = 0; l < s.length; l++) {
            const c = s[l];
            o.excludeCredentials[l] = Object.assign(Object.assign({}, c), {
                id: le(c.id).buffer,
                type: c.type || "public-key",
                transports: c.transports
            })
        }
    }
    return o
}

function Dt(t) {
    if (!t) throw new Error("Credential request options are required");
    if (typeof PublicKeyCredential < "u" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function") return PublicKeyCredential.parseRequestOptionsFromJSON(t);
    const {
        challenge: e,
        allowCredentials: r
    } = t, s = He(t, ["challenge", "allowCredentials"]), i = le(e).buffer, n = Object.assign(Object.assign({}, s), {
        challenge: i
    });
    if (r && r.length > 0) {
        n.allowCredentials = new Array(r.length);
        for (let a = 0; a < r.length; a++) {
            const o = r[a];
            n.allowCredentials[a] = Object.assign(Object.assign({}, o), {
                id: le(o.id).buffer,
                type: o.type || "public-key",
                transports: o.transports
            })
        }
    }
    return n
}

function Bt(t) {
    var e;
    if ("toJSON" in t && typeof t.toJSON == "function") return t.toJSON();
    const r = t;
    return {
        id: t.id,
        rawId: t.id,
        response: {
            attestationObject: Z(new Uint8Array(t.response.attestationObject)),
            clientDataJSON: Z(new Uint8Array(t.response.clientDataJSON))
        },
        type: "public-key",
        clientExtensionResults: t.getClientExtensionResults(),
        authenticatorAttachment: (e = r.authenticatorAttachment) !== null && e !== void 0 ? e : void 0
    }
}

function qt(t) {
    var e;
    if ("toJSON" in t && typeof t.toJSON == "function") return t.toJSON();
    const r = t,
        s = t.getClientExtensionResults(),
        i = t.response;
    return {
        id: t.id,
        rawId: t.id,
        response: {
            authenticatorData: Z(new Uint8Array(i.authenticatorData)),
            clientDataJSON: Z(new Uint8Array(i.clientDataJSON)),
            signature: Z(new Uint8Array(i.signature)),
            userHandle: i.userHandle ? Z(new Uint8Array(i.userHandle)) : void 0
        },
        type: "public-key",
        clientExtensionResults: s,
        authenticatorAttachment: (e = r.authenticatorAttachment) !== null && e !== void 0 ? e : void 0
    }
}

function hr(t) {
    return t === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)
}

function De() {
    var t, e;
    return !!(j() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof((t = navigator ? .credentials) === null || t === void 0 ? void 0 : t.create) == "function" && typeof((e = navigator ? .credentials) === null || e === void 0 ? void 0 : e.get) == "function")
}
async function ur(t) {
    try {
        const e = await navigator.credentials.create(t);
        return e ? e instanceof PublicKeyCredential ? {
            data: e,
            error: null
        } : {
            data: null,
            error: new Le("Browser returned unexpected credential type", e)
        } : {
            data: null,
            error: new Le("Empty credential response", e)
        }
    } catch (e) {
        return {
            data: null,
            error: Ni({
                error: e,
                options: t
            })
        }
    }
}
async function dr(t) {
    try {
        const e = await navigator.credentials.get(t);
        return e ? e instanceof PublicKeyCredential ? {
            data: e,
            error: null
        } : {
            data: null,
            error: new Le("Browser returned unexpected credential type", e)
        } : {
            data: null,
            error: new Le("Empty credential response", e)
        }
    } catch (e) {
        return {
            data: null,
            error: Ui({
                error: e,
                options: t
            })
        }
    }
}
var Di = {
        hints: ["security-key"],
        authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
            requireResidentKey: !1,
            userVerification: "preferred",
            residentKey: "discouraged"
        },
        attestation: "direct"
    },
    Bi = {
        userVerification: "preferred",
        hints: ["security-key"],
        attestation: "direct"
    };

function Be(...t) {
    const e = i => i !== null && typeof i == "object" && !Array.isArray(i),
        r = i => i instanceof ArrayBuffer || ArrayBuffer.isView(i),
        s = {};
    for (const i of t)
        if (i)
            for (const n in i) {
                const a = i[n];
                if (a !== void 0)
                    if (Array.isArray(a)) s[n] = a;
                    else if (r(a)) s[n] = a;
                else if (e(a)) {
                    const o = s[n];
                    e(o) ? s[n] = Be(o, a) : s[n] = Be(a)
                } else s[n] = a
            }
    return s
}

function qi(t, e) {
    return Be(Di, t, e || {})
}

function Hi(t, e) {
    return Be(Bi, t, e || {})
}
var Mi = class {
    constructor(t) {
        this.client = t, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this)
    }
    async _enroll(t) {
        return this.client.mfa.enroll(Object.assign(Object.assign({}, t), {
            factorType: "webauthn"
        }))
    }
    async _challenge({
        factorId: t,
        webauthn: e,
        friendlyName: r,
        signal: s
    }, i) {
        var n;
        try {
            const {
                data: a,
                error: o
            } = await this.client.mfa.challenge({
                factorId: t,
                webauthn: e
            });
            if (!a) return {
                data: null,
                error: o
            };
            const l = s ? ? at.createNewAbortSignal();
            if (a.webauthn.type === "create") {
                const {
                    user: c
                } = a.webauthn.credential_options.publicKey;
                if (!c.name) {
                    const u = r;
                    if (u) c.name = `${c.id}:${u}`;
                    else {
                        const h = (await this.client.getUser()).data.user,
                            d = ((n = h ? .user_metadata) === null || n === void 0 ? void 0 : n.name) || h ? .email || h ? .id || "User";
                        c.name = `${c.id}:${d}`
                    }
                }
                c.displayName || (c.displayName = c.name)
            }
            switch (a.webauthn.type) {
                case "create":
                    {
                        const {
                            data: c,
                            error: u
                        } = await ur({
                            publicKey: qi(a.webauthn.credential_options.publicKey, i ? .create),
                            signal: l
                        });
                        return c ? {
                            data: {
                                factorId: t,
                                challengeId: a.id,
                                webauthn: {
                                    type: a.webauthn.type,
                                    credential_response: c
                                }
                            },
                            error: null
                        } : {
                            data: null,
                            error: u
                        }
                    }
                case "request":
                    {
                        const c = Hi(a.webauthn.credential_options.publicKey, i ? .request),
                            {
                                data: u,
                                error: h
                            } = await dr(Object.assign(Object.assign({}, a.webauthn.credential_options), {
                                publicKey: c,
                                signal: l
                            }));
                        return u ? {
                            data: {
                                factorId: t,
                                challengeId: a.id,
                                webauthn: {
                                    type: a.webauthn.type,
                                    credential_response: u
                                }
                            },
                            error: null
                        } : {
                            data: null,
                            error: h
                        }
                    }
            }
        } catch (a) {
            return p(a) ? {
                data: null,
                error: a
            } : {
                data: null,
                error: new B("Unexpected error in challenge", a)
            }
        }
    }
    async _verify({
        challengeId: t,
        factorId: e,
        webauthn: r
    }) {
        return this.client.mfa.verify({
            factorId: e,
            challengeId: t,
            webauthn: r
        })
    }
    async _authenticate({
        factorId: t,
        webauthn: {
            rpId: e = typeof window < "u" ? window.location.hostname : void 0,
            rpOrigins: r = typeof window < "u" ? [window.location.origin] : void 0,
            signal: s
        } = {}
    }, i) {
        if (!e) return {
            data: null,
            error: new we("rpId is required for WebAuthn authentication")
        };
        try {
            if (!De()) return {
                data: null,
                error: new B("Browser does not support WebAuthn", null)
            };
            const {
                data: n,
                error: a
            } = await this.challenge({
                factorId: t,
                webauthn: {
                    rpId: e,
                    rpOrigins: r
                },
                signal: s
            }, {
                request: i
            });
            if (!n) return {
                data: null,
                error: a
            };
            const {
                webauthn: o
            } = n;
            return this._verify({
                factorId: t,
                challengeId: n.challengeId,
                webauthn: {
                    type: o.type,
                    rpId: e,
                    rpOrigins: r,
                    credential_response: o.credential_response
                }
            })
        } catch (n) {
            return p(n) ? {
                data: null,
                error: n
            } : {
                data: null,
                error: new B("Unexpected error in authenticate", n)
            }
        }
    }
    async _register({
        friendlyName: t,
        webauthn: {
            rpId: e = typeof window < "u" ? window.location.hostname : void 0,
            rpOrigins: r = typeof window < "u" ? [window.location.origin] : void 0,
            signal: s
        } = {}
    }, i) {
        if (!e) return {
            data: null,
            error: new we("rpId is required for WebAuthn registration")
        };
        try {
            if (!De()) return {
                data: null,
                error: new B("Browser does not support WebAuthn", null)
            };
            const {
                data: n,
                error: a
            } = await this._enroll({
                friendlyName: t
            });
            if (!n) return await this.client.mfa.listFactors().then(c => {
                var u;
                return (u = c.data) === null || u === void 0 ? void 0 : u.all.find(h => h.factor_type === "webauthn" && h.friendly_name === t && h.status !== "unverified")
            }).then(c => c ? this.client.mfa.unenroll({
                factorId: c ? .id
            }) : void 0), {
                data: null,
                error: a
            };
            const {
                data: o,
                error: l
            } = await this._challenge({
                factorId: n.id,
                friendlyName: n.friendly_name,
                webauthn: {
                    rpId: e,
                    rpOrigins: r
                },
                signal: s
            }, {
                create: i
            });
            return o ? this._verify({
                factorId: n.id,
                challengeId: o.challengeId,
                webauthn: {
                    rpId: e,
                    rpOrigins: r,
                    type: o.webauthn.type,
                    credential_response: o.webauthn.credential_response
                }
            }) : {
                data: null,
                error: l
            }
        } catch (n) {
            return p(n) ? {
                data: null,
                error: n
            } : {
                data: null,
                error: new B("Unexpected error in register", n)
            }
        }
    }
};
ji();
var Fi = {
        url: Js,
        storageKey: Gs,
        autoRefreshToken: !0,
        persistSession: !0,
        detectSessionInUrl: !0,
        headers: zs,
        flowType: "implicit",
        debug: !1,
        hasCustomAuthorizationHeader: !1,
        throwOnError: !1,
        lockAcquireTimeout: 5e3,
        skipAutoInitialize: !1,
        experimental: {}
    },
    se = {},
    fr = class ot {
        get jwks() {
            var e, r;
            return (r = (e = se[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !== null && r !== void 0 ? r : {
                keys: []
            }
        }
        set jwks(e) {
            se[this.storageKey] = Object.assign(Object.assign({}, se[this.storageKey]), {
                jwks: e
            })
        }
        get jwks_cached_at() {
            var e, r;
            return (r = (e = se[this.storageKey]) === null || e === void 0 ? void 0 : e.cachedAt) !== null && r !== void 0 ? r : Number.MIN_SAFE_INTEGER
        }
        set jwks_cached_at(e) {
            se[this.storageKey] = Object.assign(Object.assign({}, se[this.storageKey]), {
                cachedAt: e
            })
        }
        constructor(e) {
            var r, s, i;
            this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = new Map, this.autoRefreshTicker = null, this.autoRefreshTickTimeout = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.lastRefreshFailure = null, this._sessionRemovalEpoch = 0, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lock = null, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
            const n = Object.assign(Object.assign({}, Fi), e);
            if (this.storageKey = n.storageKey, this.instanceID = (r = ot.nextInstanceID[this.storageKey]) !== null && r !== void 0 ? r : 0, ot.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!n.debug, typeof n.debug == "function" && (this.logger = n.debug), this.instanceID > 0 && j()) {
                const a = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
                this.logDebugMessages
            }
            if (this.persistSession = n.persistSession, this.autoRefreshToken = n.autoRefreshToken, this.experimental = (s = n.experimental) !== null && s !== void 0 ? s : {}, this.admin = new Ci({
                    url: n.url,
                    headers: n.headers,
                    fetch: n.fetch,
                    experimental: this.experimental
                }), this.url = n.url, this.headers = n.headers, this.fetch = ar(n.fetch), this.detectSessionInUrl = n.detectSessionInUrl, this.flowType = n.flowType, this.hasCustomAuthorizationHeader = n.hasCustomAuthorizationHeader, this.throwOnError = n.throwOnError, this.lockAcquireTimeout = n.lockAcquireTimeout, n.lock != null && (this.lock = n.lock), this.jwks || (this.jwks = {
                    keys: []
                }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
                    verify: this._verify.bind(this),
                    enroll: this._enroll.bind(this),
                    unenroll: this._unenroll.bind(this),
                    challenge: this._challenge.bind(this),
                    listFactors: this._listFactors.bind(this),
                    challengeAndVerify: this._challengeAndVerify.bind(this),
                    getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
                    webauthn: new Mi(this)
                }, this.oauth = {
                    getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
                    approveAuthorization: this._approveAuthorization.bind(this),
                    denyAuthorization: this._denyAuthorization.bind(this),
                    listGrants: this._listOAuthGrants.bind(this),
                    revokeGrant: this._revokeOAuthGrant.bind(this)
                }, this.passkey = {
                    startRegistration: this._startPasskeyRegistration.bind(this),
                    verifyRegistration: this._verifyPasskeyRegistration.bind(this),
                    startAuthentication: this._startPasskeyAuthentication.bind(this),
                    verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
                    list: this._listPasskeys.bind(this),
                    update: this._updatePasskey.bind(this),
                    delete: this._deletePasskey.bind(this)
                }, this.persistSession ? (n.storage ? this.storage = n.storage : nr() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = Ut(this.memoryStorage)), n.userStorage && (this.userStorage = n.userStorage)) : (this.memoryStorage = {}, this.storage = Ut(this.memoryStorage)), j() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
                try {
                    this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey)
                } catch {}(i = this.broadcastChannel) === null || i === void 0 || i.addEventListener("message", async a => {
                    this._debug("received broadcast notification from other tab or client", a), (a.data.event === "TOKEN_REFRESHED" || a.data.event === "SIGNED_IN") && (this.lastRefreshFailure = null);
                    try {
                        await this._notifyAllSubscribers(a.data.event, a.data.session, !1)
                    } catch (o) {
                        this._debug("#broadcastChannel", "error", o)
                    }
                })
            }
            n.skipAutoInitialize || this.initialize().catch(a => {
                this._debug("#initialize()", "error", a)
            })
        }
        isThrowOnErrorEnabled() {
            return this.throwOnError
        }
        _returnResult(e) {
            if (this.throwOnError && e && e.error) throw e.error;
            return e
        }
        _logPrefix() {
            return `GoTrueClient@${this.storageKey}:${this.instanceID} (${tr}) ${new Date().toISOString()}`
        }
        _debug(...e) {
            return this.logDebugMessages && this.logger(this._logPrefix(), ...e), this
        }
        async initialize() {
            return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._initialize()) : await this._initialize())(), await this.initializePromise)
        }
        async _initialize() {
            var e;
            try {
                let r = {},
                    s = "none";
                if (j() && (r = ci(window.location.href), this._isImplicitGrantCallback(r) ? s = "implicit" : await this._isPKCECallback(r) && (s = "pkce")), j() && this.detectSessionInUrl && s !== "none") {
                    const {
                        data: i,
                        error: n
                    } = await this._getSessionFromURL(r, s);
                    if (n) {
                        if (this._debug("#_initialize()", "error detecting session from URL", n), Zs(n)) {
                            const l = (e = n.details) === null || e === void 0 ? void 0 : e.code;
                            if (l === "identity_already_exists" || l === "identity_not_found" || l === "single_identity_not_deletable") return {
                                error: n
                            }
                        }
                        return {
                            error: n
                        }
                    }
                    const {
                        session: a,
                        redirectType: o
                    } = i;
                    return this._debug("#_initialize()", "detected session in URL", a, "redirect type", o), await this._saveSession(a), setTimeout(async () => {
                        o === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", a) : await this._notifyAllSubscribers("SIGNED_IN", a)
                    }, 0), {
                        error: null
                    }
                }
                return await this._recoverAndRefresh(), {
                    error: null
                }
            } catch (r) {
                return p(r) ? this._returnResult({
                    error: r
                }) : this._returnResult({
                    error: new B("Unexpected error during initialization", r)
                })
            } finally {
                await this._handleVisibilityChange(), this._debug("#_initialize()", "end")
            }
        }
        async signInAnonymously(e) {
            var r, s, i;
            try {
                const {
                    data: n,
                    error: a
                } = await y(this.fetch, "POST", `${this.url}/signup`, {
                    headers: this.headers,
                    body: {
                        data: (s = (r = e ? .options) === null || r === void 0 ? void 0 : r.data) !== null && s !== void 0 ? s : {},
                        gotrue_meta_security: {
                            captcha_token: (i = e ? .options) === null || i === void 0 ? void 0 : i.captchaToken
                        }
                    },
                    xform: N
                });
                if (a || !n) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: a
                });
                const o = n.session,
                    l = n.user;
                return n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", o)), this._returnResult({
                    data: {
                        user: l,
                        session: o
                    },
                    error: null
                })
            } catch (n) {
                if (p(n)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: n
                });
                throw n
            }
        }
        async signUp(e) {
            var r, s, i;
            try {
                let n;
                if ("email" in e) {
                    const {
                        email: u,
                        password: h,
                        options: d
                    } = e;
                    let f = null,
                        g = null;
                    this.flowType === "pkce" && ([f, g] = await Y(this.storage, this.storageKey)), n = await y(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        redirectTo: d ? .emailRedirectTo,
                        body: {
                            email: u,
                            password: h,
                            data: (r = d ? .data) !== null && r !== void 0 ? r : {},
                            gotrue_meta_security: {
                                captcha_token: d ? .captchaToken
                            },
                            code_challenge: f,
                            code_challenge_method: g
                        },
                        xform: N
                    })
                } else if ("phone" in e) {
                    const {
                        phone: u,
                        password: h,
                        options: d
                    } = e;
                    n = await y(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        body: {
                            phone: u,
                            password: h,
                            data: (s = d ? .data) !== null && s !== void 0 ? s : {},
                            channel: (i = d ? .channel) !== null && i !== void 0 ? i : "sms",
                            gotrue_meta_security: {
                                captcha_token: d ? .captchaToken
                            }
                        },
                        xform: N
                    })
                } else throw new Re("You must provide either an email or phone number and a password");
                const {
                    data: a,
                    error: o
                } = n;
                if (o || !a) return await R(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: o
                });
                const l = a.session,
                    c = a.user;
                return a.session && (await this._saveSession(a.session), await this._notifyAllSubscribers("SIGNED_IN", l)), this._returnResult({
                    data: {
                        user: c,
                        session: l
                    },
                    error: null
                })
            } catch (n) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(n)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: n
                });
                throw n
            }
        }
        async signInWithPassword(e) {
            try {
                let r;
                if ("email" in e) {
                    const {
                        email: n,
                        password: a,
                        options: o
                    } = e;
                    r = await y(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            email: n,
                            password: a,
                            gotrue_meta_security: {
                                captcha_token: o ? .captchaToken
                            }
                        },
                        xform: xt
                    })
                } else if ("phone" in e) {
                    const {
                        phone: n,
                        password: a,
                        options: o
                    } = e;
                    r = await y(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            phone: n,
                            password: a,
                            gotrue_meta_security: {
                                captcha_token: o ? .captchaToken
                            }
                        },
                        xform: xt
                    })
                } else throw new Re("You must provide either an email or phone number and a password");
                const {
                    data: s,
                    error: i
                } = r;
                if (i) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: i
                });
                if (!s || !s.session || !s.user) {
                    const n = new re;
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: n
                    })
                }
                return s.session && (await this._saveSession(s.session), await this._notifyAllSubscribers("SIGNED_IN", s.session)), this._returnResult({
                    data: Object.assign({
                        user: s.user,
                        session: s.session
                    }, s.weak_password ? {
                        weakPassword: s.weak_password
                    } : null),
                    error: i
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: r
                });
                throw r
            }
        }
        async signInWithOAuth(e) {
            var r, s, i, n;
            return await this._handleProviderSignIn(e.provider, {
                redirectTo: (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo,
                scopes: (s = e.options) === null || s === void 0 ? void 0 : s.scopes,
                queryParams: (i = e.options) === null || i === void 0 ? void 0 : i.queryParams,
                skipBrowserRedirect: (n = e.options) === null || n === void 0 ? void 0 : n.skipBrowserRedirect
            })
        }
        async exchangeCodeForSession(e) {
            return await this.initializePromise, this.lock != null ? this._acquireLock(this.lockAcquireTimeout, async () => this._exchangeCodeForSession(e)) : this._exchangeCodeForSession(e)
        }
        async signInWithWeb3(e) {
            const {
                chain: r
            } = e;
            switch (r) {
                case "ethereum":
                    return await this.signInWithEthereum(e);
                case "solana":
                    return await this.signInWithSolana(e);
                default:
                    throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)
            }
        }
        async signInWithEthereum(e) {
            var r, s, i, n, a, o, l, c, u, h, d;
            let f, g;
            if ("message" in e) f = e.message, g = e.signature;
            else {
                const {
                    chain: v,
                    wallet: m,
                    statement: _,
                    options: k
                } = e;
                let w;
                if (j())
                    if (typeof m == "object") w = m;
                    else {
                        const G = window;
                        if ("ethereum" in G && typeof G.ethereum == "object" && "request" in G.ethereum && typeof G.ethereum.request == "function") w = G.ethereum;
                        else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")
                    }
                else {
                    if (typeof m != "object" || !k ? .url) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
                    w = m
                }
                const S = new URL((r = k ? .url) !== null && r !== void 0 ? r : window.location.href),
                    I = await w.request({
                        method: "eth_requestAccounts"
                    }).then(G => G).catch(() => {
                        throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")
                    });
                if (!I || I.length === 0) throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
                const T = cr(I[0]);
                let P = (s = k ? .signInWithEthereum) === null || s === void 0 ? void 0 : s.chainId;
                P || (P = Ii(await w.request({
                    method: "eth_chainId"
                }))), f = xi({
                    domain: S.host,
                    address: T,
                    statement: _,
                    uri: S.href,
                    version: "1",
                    chainId: P,
                    nonce: (i = k ? .signInWithEthereum) === null || i === void 0 ? void 0 : i.nonce,
                    issuedAt: (a = (n = k ? .signInWithEthereum) === null || n === void 0 ? void 0 : n.issuedAt) !== null && a !== void 0 ? a : new Date,
                    expirationTime: (o = k ? .signInWithEthereum) === null || o === void 0 ? void 0 : o.expirationTime,
                    notBefore: (l = k ? .signInWithEthereum) === null || l === void 0 ? void 0 : l.notBefore,
                    requestId: (c = k ? .signInWithEthereum) === null || c === void 0 ? void 0 : c.requestId,
                    resources: (u = k ? .signInWithEthereum) === null || u === void 0 ? void 0 : u.resources
                }), g = await w.request({
                    method: "personal_sign",
                    params: [$i(f), T]
                })
            }
            try {
                const {
                    data: v,
                    error: m
                } = await y(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
                    headers: this.headers,
                    body: Object.assign({
                        chain: "ethereum",
                        message: f,
                        signature: g
                    }, !((h = e.options) === null || h === void 0) && h.captchaToken ? {
                        gotrue_meta_security: {
                            captcha_token: (d = e.options) === null || d === void 0 ? void 0 : d.captchaToken
                        }
                    } : null),
                    xform: N
                });
                if (m) throw m;
                if (!v || !v.session || !v.user) {
                    const _ = new re;
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: _
                    })
                }
                return v.session && (await this._saveSession(v.session), await this._notifyAllSubscribers("SIGNED_IN", v.session)), this._returnResult({
                    data: Object.assign({}, v),
                    error: m
                })
            } catch (v) {
                if (p(v)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: v
                });
                throw v
            }
        }
        async signInWithSolana(e) {
            var r, s, i, n, a, o, l, c, u, h, d, f;
            let g, v;
            if ("message" in e) g = e.message, v = e.signature;
            else {
                const {
                    chain: m,
                    wallet: _,
                    statement: k,
                    options: w
                } = e;
                let S;
                if (j())
                    if (typeof _ == "object") S = _;
                    else {
                        const T = window;
                        if ("solana" in T && typeof T.solana == "object" && ("signIn" in T.solana && typeof T.solana.signIn == "function" || "signMessage" in T.solana && typeof T.solana.signMessage == "function")) S = T.solana;
                        else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")
                    }
                else {
                    if (typeof _ != "object" || !w ? .url) throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
                    S = _
                }
                const I = new URL((r = w ? .url) !== null && r !== void 0 ? r : window.location.href);
                if ("signIn" in S && S.signIn) {
                    const T = await S.signIn(Object.assign(Object.assign(Object.assign({
                        issuedAt: new Date().toISOString()
                    }, w ? .signInWithSolana), {
                        version: "1",
                        domain: I.host,
                        uri: I.href
                    }), k ? {
                        statement: k
                    } : null));
                    let P;
                    if (Array.isArray(T) && T[0] && typeof T[0] == "object") P = T[0];
                    else if (T && typeof T == "object" && "signedMessage" in T && "signature" in T) P = T;
                    else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
                    if ("signedMessage" in P && "signature" in P && (typeof P.signedMessage == "string" || P.signedMessage instanceof Uint8Array) && P.signature instanceof Uint8Array) g = typeof P.signedMessage == "string" ? P.signedMessage : new TextDecoder().decode(P.signedMessage), v = P.signature;
                    else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")
                } else {
                    if (!("signMessage" in S) || typeof S.signMessage != "function" || !("publicKey" in S) || typeof S != "object" || !S.publicKey || !("toBase58" in S.publicKey) || typeof S.publicKey.toBase58 != "function") throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
                    g = [`${I.host} wants you to sign in with your Solana account:`, S.publicKey.toBase58(), ...k ? ["", k, ""] : [""], "Version: 1", `URI: ${I.href}`, `Issued At: ${(i=(s=w?.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`, ...!((n = w ? .signInWithSolana) === null || n === void 0) && n.notBefore ? [`Not Before: ${w.signInWithSolana.notBefore}`] : [], ...!((a = w ? .signInWithSolana) === null || a === void 0) && a.expirationTime ? [`Expiration Time: ${w.signInWithSolana.expirationTime}`] : [], ...!((o = w ? .signInWithSolana) === null || o === void 0) && o.chainId ? [`Chain ID: ${w.signInWithSolana.chainId}`] : [], ...!((l = w ? .signInWithSolana) === null || l === void 0) && l.nonce ? [`Nonce: ${w.signInWithSolana.nonce}`] : [], ...!((c = w ? .signInWithSolana) === null || c === void 0) && c.requestId ? [`Request ID: ${w.signInWithSolana.requestId}`] : [], ...!((h = (u = w ? .signInWithSolana) === null || u === void 0 ? void 0 : u.resources) === null || h === void 0) && h.length ? ["Resources", ...w.signInWithSolana.resources.map(P => `- ${P}`)] : []].join(`
`);
                    const T = await S.signMessage(new TextEncoder().encode(g), "utf8");
                    if (!T || !(T instanceof Uint8Array)) throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
                    v = T
                }
            }
            try {
                const {
                    data: m,
                    error: _
                } = await y(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
                    headers: this.headers,
                    body: Object.assign({
                        chain: "solana",
                        message: g,
                        signature: Z(v)
                    }, !((d = e.options) === null || d === void 0) && d.captchaToken ? {
                        gotrue_meta_security: {
                            captcha_token: (f = e.options) === null || f === void 0 ? void 0 : f.captchaToken
                        }
                    } : null),
                    xform: N
                });
                if (_) throw _;
                if (!m || !m.session || !m.user) {
                    const k = new re;
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: k
                    })
                }
                return m.session && (await this._saveSession(m.session), await this._notifyAllSubscribers("SIGNED_IN", m.session)), this._returnResult({
                    data: Object.assign({}, m),
                    error: _
                })
            } catch (m) {
                if (p(m)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: m
                });
                throw m
            }
        }
        async _exchangeCodeForSession(e) {
            const r = await U(this.storage, `${this.storageKey}-code-verifier`),
                [s, i] = (r ? ? "").split("/");
            try {
                if (!s && this.flowType === "pkce") throw new ei;
                const {
                    data: n,
                    error: a
                } = await y(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
                    headers: this.headers,
                    body: {
                        auth_code: e,
                        code_verifier: s
                    },
                    xform: N
                });
                if (await R(this.storage, `${this.storageKey}-code-verifier`), a) throw a;
                if (!n || !n.session || !n.user) {
                    const o = new re;
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null,
                            redirectType: null
                        },
                        error: o
                    })
                }
                return n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers(i === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", n.session)), this._returnResult({
                    data: Object.assign(Object.assign({}, n), {
                        redirectType: i ? ? null
                    }),
                    error: a
                })
            } catch (n) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(n)) return this._returnResult({
                    data: {
                        user: null,
                        session: null,
                        redirectType: null
                    },
                    error: n
                });
                throw n
            }
        }
        async signInWithIdToken(e) {
            try {
                const {
                    options: r,
                    provider: s,
                    token: i,
                    access_token: n,
                    nonce: a
                } = e, {
                    data: o,
                    error: l
                } = await y(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
                    headers: this.headers,
                    body: {
                        provider: s,
                        id_token: i,
                        access_token: n,
                        nonce: a,
                        gotrue_meta_security: {
                            captcha_token: r ? .captchaToken
                        }
                    },
                    xform: N
                });
                if (l) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: l
                });
                if (!o || !o.session || !o.user) {
                    const c = new re;
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: c
                    })
                }
                return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", o.session)), this._returnResult({
                    data: o,
                    error: l
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: r
                });
                throw r
            }
        }
        async signInWithOtp(e) {
            var r, s, i, n, a;
            try {
                if ("email" in e) {
                    const {
                        email: o,
                        options: l
                    } = e;
                    let c = null,
                        u = null;
                    this.flowType === "pkce" && ([c, u] = await Y(this.storage, this.storageKey));
                    const {
                        error: h
                    } = await y(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            email: o,
                            data: (r = l ? .data) !== null && r !== void 0 ? r : {},
                            create_user: (s = l ? .shouldCreateUser) !== null && s !== void 0 ? s : !0,
                            gotrue_meta_security: {
                                captcha_token: l ? .captchaToken
                            },
                            code_challenge: c,
                            code_challenge_method: u
                        },
                        redirectTo: l ? .emailRedirectTo
                    });
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: h
                    })
                }
                if ("phone" in e) {
                    const {
                        phone: o,
                        options: l
                    } = e, {
                        data: c,
                        error: u
                    } = await y(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            phone: o,
                            data: (i = l ? .data) !== null && i !== void 0 ? i : {},
                            create_user: (n = l ? .shouldCreateUser) !== null && n !== void 0 ? n : !0,
                            gotrue_meta_security: {
                                captcha_token: l ? .captchaToken
                            },
                            channel: (a = l ? .channel) !== null && a !== void 0 ? a : "sms"
                        }
                    });
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null,
                            messageId: c ? .message_id
                        },
                        error: u
                    })
                }
                throw new Re("You must provide either an email or phone number.")
            } catch (o) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(o)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: o
                });
                throw o
            }
        }
        async verifyOtp(e) {
            var r, s;
            try {
                let i, n;
                "options" in e && (i = (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo, n = (s = e.options) === null || s === void 0 ? void 0 : s.captchaToken);
                const {
                    data: a,
                    error: o
                } = await y(this.fetch, "POST", `${this.url}/verify`, {
                    headers: this.headers,
                    body: Object.assign(Object.assign({}, e), {
                        gotrue_meta_security: {
                            captcha_token: n
                        }
                    }),
                    redirectTo: i,
                    xform: N
                });
                if (o) throw o;
                if (!a) throw new Error("An error occurred on token verification.");
                const l = a.session,
                    c = a.user;
                return l ? .access_token && (await this._saveSession(l), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", l)), this._returnResult({
                    data: {
                        user: c,
                        session: l
                    },
                    error: null
                })
            } catch (i) {
                if (p(i)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: i
                });
                throw i
            }
        }
        async signInWithSSO(e) {
            var r, s, i, n, a;
            try {
                let o = null,
                    l = null;
                this.flowType === "pkce" && ([o, l] = await Y(this.storage, this.storageKey));
                const c = await y(this.fetch, "POST", `${this.url}/sso`, {
                    body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? {
                        provider_id: e.providerId
                    } : null), "domain" in e ? {
                        domain: e.domain
                    } : null), {
                        redirect_to: (s = (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo) !== null && s !== void 0 ? s : void 0
                    }), !((i = e ? .options) === null || i === void 0) && i.captchaToken ? {
                        gotrue_meta_security: {
                            captcha_token: e.options.captchaToken
                        }
                    } : null), {
                        skip_http_redirect: !0,
                        code_challenge: o,
                        code_challenge_method: l
                    }),
                    headers: this.headers,
                    xform: Ai
                });
                return !((n = c.data) === null || n === void 0) && n.url && j() && !(!((a = e.options) === null || a === void 0) && a.skipBrowserRedirect) && window.location.assign(c.data.url), this._returnResult(c)
            } catch (o) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(o)) return this._returnResult({
                    data: null,
                    error: o
                });
                throw o
            }
        }
        async reauthenticate() {
            return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._reauthenticate()) : await this._reauthenticate()
        }
        async _reauthenticate() {
            try {
                return await this._useSession(async e => {
                    const {
                        data: {
                            session: r
                        },
                        error: s
                    } = e;
                    if (s) throw s;
                    if (!r) throw new C;
                    const {
                        error: i
                    } = await y(this.fetch, "GET", `${this.url}/reauthenticate`, {
                        headers: this.headers,
                        jwt: r.access_token
                    });
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: i
                    })
                })
            } catch (e) {
                if (p(e)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: e
                });
                throw e
            }
        }
        async resend(e) {
            try {
                const r = `${this.url}/resend`;
                if ("email" in e) {
                    const {
                        email: s,
                        type: i,
                        options: n
                    } = e;
                    let a = null,
                        o = null;
                    this.flowType === "pkce" && ([a, o] = await Y(this.storage, this.storageKey));
                    const {
                        error: l
                    } = await y(this.fetch, "POST", r, {
                        headers: this.headers,
                        body: {
                            email: s,
                            type: i,
                            gotrue_meta_security: {
                                captcha_token: n ? .captchaToken
                            },
                            code_challenge: a,
                            code_challenge_method: o
                        },
                        redirectTo: n ? .emailRedirectTo
                    });
                    return l && await R(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: l
                    })
                } else if ("phone" in e) {
                    const {
                        phone: s,
                        type: i,
                        options: n
                    } = e, {
                        data: a,
                        error: o
                    } = await y(this.fetch, "POST", r, {
                        headers: this.headers,
                        body: {
                            phone: s,
                            type: i,
                            gotrue_meta_security: {
                                captcha_token: n ? .captchaToken
                            }
                        }
                    });
                    return this._returnResult({
                        data: {
                            user: null,
                            session: null,
                            messageId: a ? .message_id
                        },
                        error: o
                    })
                }
                throw new Re("You must provide either an email or phone number and a type")
            } catch (r) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(r)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: r
                });
                throw r
            }
        }
        async getSession() {
            return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => this._useSession(async e => e)) : await this._useSession(async e => e)
        }
        async _acquireLock(e, r) {
            this._debug("#_acquireLock", "begin", e);
            try {
                if (this.lockAcquired) {
                    const s = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(),
                        i = (async () => (await s, await r()))();
                    return this.pendingInLock.push((async () => {
                        try {
                            await i
                        } catch {}
                    })()), i
                }
                return await this.lock(`lock:${this.storageKey}`, e, async () => {
                    this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
                    try {
                        this.lockAcquired = !0;
                        const s = r();
                        for (this.pendingInLock.push((async () => {
                                try {
                                    await s
                                } catch {}
                            })()), await s; this.pendingInLock.length;) {
                            const i = [...this.pendingInLock];
                            await Promise.all(i), this.pendingInLock.splice(0, i.length)
                        }
                        return await s
                    } finally {
                        this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1
                    }
                })
            } finally {
                this._debug("#_acquireLock", "end")
            }
        }
        async _useSession(e) {
            this._debug("#_useSession", "begin");
            try {
                return await e(await this.__loadSession())
            } finally {
                this._debug("#_useSession", "end")
            }
        }
        async __loadSession() {
            this._debug("#__loadSession()", "begin"), this.lock != null && !this.lockAcquired && this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
            try {
                let e = null;
                const r = await U(this.storage, this.storageKey);
                if (this._debug("#getSession()", "session from storage", r), r !== null && (this._isValidSession(r) ? e = r : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e) return {
                    data: {
                        session: null
                    },
                    error: null
                };
                const s = e.expires_at ? e.expires_at * 1e3 - Date.now() < Ke : !1;
                if (this._debug("#__loadSession()", `session has${s?"":" not"} expired`, "expires_at", e.expires_at), !s) {
                    if (this.userStorage) {
                        const a = await U(this.userStorage, this.storageKey + "-user");
                        a ? .user ? e.user = a.user : e.user = Ve()
                    }
                    if (this.storage.isServer && e.user && !e.user.__isUserNotAvailableProxy) {
                        const a = {
                            value: this.suppressGetSessionWarning
                        };
                        e.user = ki(e.user, a), a.value && (this.suppressGetSessionWarning = !0)
                    }
                    return {
                        data: {
                            session: e
                        },
                        error: null
                    }
                }
                const {
                    data: i,
                    error: n
                } = await this._callRefreshToken(e.refresh_token);
                if (n) {
                    if (e.expires_at && e.expires_at * 1e3 > Date.now()) {
                        const a = await U(this.storage, this.storageKey);
                        if (a && a.refresh_token === e.refresh_token) return this._returnResult({
                            data: {
                                session: e
                            },
                            error: null
                        })
                    }
                    return this._returnResult({
                        data: {
                            session: null
                        },
                        error: n
                    })
                }
                return this._returnResult({
                    data: {
                        session: i
                    },
                    error: null
                })
            } finally {
                this._debug("#__loadSession()", "end")
            }
        }
        async getUser(e) {
            if (e) return await this._getUser(e);
            await this.initializePromise;
            let r;
            return this.lock != null ? r = await this._acquireLock(this.lockAcquireTimeout, async () => await this._getUser()) : r = await this._getUser(), r.data.user && (this.suppressGetSessionWarning = !0), r
        }
        async _getUser(e) {
            try {
                return e ? await y(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt: e,
                    xform: J
                }) : await this._useSession(async r => {
                    var s, i, n;
                    const {
                        data: a,
                        error: o
                    } = r;
                    if (o) throw o;
                    return !(!((s = a.session) === null || s === void 0) && s.access_token) && !this.hasCustomAuthorizationHeader ? {
                        data: {
                            user: null
                        },
                        error: new C
                    } : await y(this.fetch, "GET", `${this.url}/user`, {
                        headers: this.headers,
                        jwt: (n = (i = a.session) === null || i === void 0 ? void 0 : i.access_token) !== null && n !== void 0 ? n : void 0,
                        xform: J
                    })
                })
            } catch (r) {
                if (p(r)) return Ae(r) && (await this._removeSession(), await R(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({
                    data: {
                        user: null
                    },
                    error: r
                });
                throw r
            }
        }
        async updateUser(e, r = {}) {
            return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._updateUser(e, r)) : await this._updateUser(e, r)
        }
        async _updateUser(e, r = {}) {
            try {
                return await this._useSession(async s => {
                    const {
                        data: i,
                        error: n
                    } = s;
                    if (n) throw n;
                    if (!i.session) throw new C;
                    const a = i.session;
                    let o = null,
                        l = null;
                    this.flowType === "pkce" && e.email != null && ([o, l] = await Y(this.storage, this.storageKey));
                    const {
                        data: c,
                        error: u
                    } = await y(this.fetch, "PUT", `${this.url}/user`, {
                        headers: this.headers,
                        redirectTo: r ? .emailRedirectTo,
                        body: Object.assign(Object.assign({}, e), {
                            code_challenge: o,
                            code_challenge_method: l
                        }),
                        jwt: a.access_token,
                        xform: J
                    });
                    if (u) throw u;
                    return a.user = c.user, await this._saveSession(a), await this._notifyAllSubscribers("USER_UPDATED", a), this._returnResult({
                        data: {
                            user: a.user
                        },
                        error: null
                    })
                })
            } catch (s) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(s)) return this._returnResult({
                    data: {
                        user: null
                    },
                    error: s
                });
                throw s
            }
        }
        async setSession(e) {
            return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._setSession(e)) : await this._setSession(e)
        }
        async _setSession(e) {
            try {
                if (!e.access_token || !e.refresh_token) throw new C;
                const r = Date.now() / 1e3;
                let s = r,
                    i = !0,
                    n = null;
                const {
                    payload: a
                } = Ce(e.access_token);
                if (a.exp && (s = a.exp, i = s <= r), i) {
                    const {
                        data: o,
                        error: l
                    } = await this._callRefreshToken(e.refresh_token);
                    if (l) return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: l
                    });
                    if (!o) return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: null
                    };
                    n = o
                } else {
                    const {
                        data: o,
                        error: l
                    } = await this._getUser(e.access_token);
                    if (l) return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: l
                    });
                    n = {
                        access_token: e.access_token,
                        refresh_token: e.refresh_token,
                        user: o.user,
                        token_type: "bearer",
                        expires_in: s - r,
                        expires_at: s
                    }, await this._saveSession(n), await this._notifyAllSubscribers("SIGNED_IN", n)
                }
                return this._returnResult({
                    data: {
                        user: n.user,
                        session: n
                    },
                    error: null
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: {
                        session: null,
                        user: null
                    },
                    error: r
                });
                throw r
            }
        }
        async refreshSession(e) {
            return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._refreshSession(e)) : await this._refreshSession(e)
        }
        async _refreshSession(e) {
            try {
                return await this._useSession(async r => {
                    var s;
                    if (!e) {
                        const {
                            data: a,
                            error: o
                        } = r;
                        if (o) throw o;
                        e = (s = a.session) !== null && s !== void 0 ? s : void 0
                    }
                    if (!e ? .refresh_token) throw new C;
                    const {
                        data: i,
                        error: n
                    } = await this._callRefreshToken(e.refresh_token);
                    return n ? this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: n
                    }) : i ? this._returnResult({
                        data: {
                            user: i.user,
                            session: i
                        },
                        error: null
                    }) : this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: null
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: {
                        user: null,
                        session: null
                    },
                    error: r
                });
                throw r
            }
        }
        async _getSessionFromURL(e, r) {
            var s;
            try {
                if (!j()) throw new Oe("No browser detected.");
                if (e.error || e.error_description || e.error_code) throw new Oe(e.error_description || "Error in URL with unspecified error_description", {
                    error: e.error || "unspecified_error",
                    code: e.error_code || "unspecified_code"
                });
                switch (r) {
                    case "implicit":
                        if (this.flowType === "pkce") throw new Tt("Not a valid PKCE flow url.");
                        break;
                    case "pkce":
                        if (this.flowType === "implicit") throw new Oe("Not a valid implicit grant flow url.");
                        break;
                    default:
                }
                if (r === "pkce") {
                    if (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code) throw new Tt("No code detected.");
                    const {
                        data: w,
                        error: S
                    } = await this._exchangeCodeForSession(e.code);
                    if (S) throw S;
                    const I = new URL(window.location.href);
                    return I.searchParams.delete("code"), window.history.replaceState(window.history.state, "", I.toString()), {
                        data: {
                            session: w.session,
                            redirectType: (s = w.redirectType) !== null && s !== void 0 ? s : null
                        },
                        error: null
                    }
                }
                const {
                    provider_token: i,
                    provider_refresh_token: n,
                    access_token: a,
                    refresh_token: o,
                    expires_in: l,
                    expires_at: c,
                    token_type: u
                } = e;
                if (!a || !l || !o || !u) throw new Oe("No session defined in URL");
                const h = Math.round(Date.now() / 1e3),
                    d = parseInt(l);
                let f = h + d;
                c && (f = parseInt(c)), (f - h) * 1e3 <= 3e4;
                const v = f - d;
                h - v >= 120 || h - v < 0;
                const {
                    data: m,
                    error: _
                } = await this._getUser(a);
                if (_) throw _;
                const k = {
                    provider_token: i,
                    provider_refresh_token: n,
                    access_token: a,
                    expires_in: d,
                    expires_at: f,
                    refresh_token: o,
                    token_type: u,
                    user: m.user
                };
                return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({
                    data: {
                        session: k,
                        redirectType: e.type
                    },
                    error: null
                })
            } catch (i) {
                if (p(i)) return this._returnResult({
                    data: {
                        session: null,
                        redirectType: null
                    },
                    error: i
                });
                throw i
            }
        }
        _isImplicitGrantCallback(e) {
            return typeof this.detectSessionInUrl == "function" ? this.detectSessionInUrl(new URL(window.location.href), e) : !!(e.access_token || e.error || e.error_description || e.error_code)
        }
        async _isPKCECallback(e) {
            const r = await U(this.storage, `${this.storageKey}-code-verifier`);
            return !!(e.code && r)
        }
        async signOut(e = {
            scope: "global"
        }) {
            return await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(e)) : await this._signOut(e)
        }
        async _signOut({
            scope: e
        } = {
            scope: "global"
        }) {
            return await this._useSession(async r => {
                var s;
                const {
                    data: i,
                    error: n
                } = r;
                if (n && !Ae(n)) return this._returnResult({
                    error: n
                });
                const a = (s = i.session) === null || s === void 0 ? void 0 : s.access_token;
                if (a) {
                    const {
                        error: o
                    } = await this.admin.signOut(a, e);
                    if (o && !(Qs(o) && (o.status === 404 || o.status === 401 || o.status === 403) || Ae(o))) return this._returnResult({
                        error: o
                    })
                }
                return e !== "others" && (await this._removeSession(), await R(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({
                    error: null
                })
            })
        }
        onAuthStateChange(e) {
            const r = li(),
                s = {
                    id: r,
                    callback: e,
                    unsubscribe: () => {
                        this._debug("#unsubscribe()", "state change callback with id removed", r), this.stateChangeEmitters.delete(r)
                    }
                };
            return this._debug("#onAuthStateChange()", "registered callback with id", r), this.stateChangeEmitters.set(r, s), (async () => (await this.initializePromise, this.lock != null ? await this._acquireLock(this.lockAcquireTimeout, async () => {
                this._emitInitialSession(r)
            }) : await this._emitInitialSession(r)))(), {
                data: {
                    subscription: s
                }
            }
        }
        async _emitInitialSession(e) {
            return await this._useSession(async r => {
                var s, i;
                try {
                    const {
                        data: {
                            session: n
                        },
                        error: a
                    } = r;
                    if (a) throw a;
                    await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", n)), this._debug("INITIAL_SESSION", "callback id", e, "session", n)
                } catch (n) {
                    await ((i = this.stateChangeEmitters.get(e)) === null || i === void 0 ? void 0 : i.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", n), Ae(n)
                }
            })
        }
        async resetPasswordForEmail(e, r = {}) {
            let s = null,
                i = null;
            this.flowType === "pkce" && ([s, i] = await Y(this.storage, this.storageKey, !0));
            try {
                return await y(this.fetch, "POST", `${this.url}/recover`, {
                    body: {
                        email: e,
                        code_challenge: s,
                        code_challenge_method: i,
                        gotrue_meta_security: {
                            captcha_token: r.captchaToken
                        }
                    },
                    headers: this.headers,
                    redirectTo: r.redirectTo
                })
            } catch (n) {
                if (await R(this.storage, `${this.storageKey}-code-verifier`), p(n)) return this._returnResult({
                    data: null,
                    error: n
                });
                throw n
            }
        }
        async getUserIdentities() {
            var e;
            try {
                const {
                    data: r,
                    error: s
                } = await this.getUser();
                if (s) throw s;
                return this._returnResult({
                    data: {
                        identities: (e = r.user.identities) !== null && e !== void 0 ? e : []
                    },
                    error: null
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async linkIdentity(e) {
            return "token" in e ? this.linkIdentityIdToken(e) : this.linkIdentityOAuth(e)
        }
        async linkIdentityOAuth(e) {
            var r;
            try {
                const {
                    data: s,
                    error: i
                } = await this._useSession(async n => {
                    var a, o, l, c, u;
                    const {
                        data: h,
                        error: d
                    } = n;
                    if (d) throw d;
                    const f = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
                        redirectTo: (a = e.options) === null || a === void 0 ? void 0 : a.redirectTo,
                        scopes: (o = e.options) === null || o === void 0 ? void 0 : o.scopes,
                        queryParams: (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
                        skipBrowserRedirect: !0
                    });
                    return await y(this.fetch, "GET", f, {
                        headers: this.headers,
                        jwt: (u = (c = h.session) === null || c === void 0 ? void 0 : c.access_token) !== null && u !== void 0 ? u : void 0
                    })
                });
                if (i) throw i;
                return j() && !(!((r = e.options) === null || r === void 0) && r.skipBrowserRedirect) && window.location.assign(s ? .url), this._returnResult({
                    data: {
                        provider: e.provider,
                        url: s ? .url
                    },
                    error: null
                })
            } catch (s) {
                if (p(s)) return this._returnResult({
                    data: {
                        provider: e.provider,
                        url: null
                    },
                    error: s
                });
                throw s
            }
        }
        async linkIdentityIdToken(e) {
            return await this._useSession(async r => {
                var s;
                try {
                    const {
                        error: i,
                        data: {
                            session: n
                        }
                    } = r;
                    if (i) throw i;
                    const {
                        options: a,
                        provider: o,
                        token: l,
                        access_token: c,
                        nonce: u
                    } = e, {
                        data: h,
                        error: d
                    } = await y(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
                        headers: this.headers,
                        jwt: (s = n ? .access_token) !== null && s !== void 0 ? s : void 0,
                        body: {
                            provider: o,
                            id_token: l,
                            access_token: c,
                            nonce: u,
                            link_identity: !0,
                            gotrue_meta_security: {
                                captcha_token: a ? .captchaToken
                            }
                        },
                        xform: N
                    });
                    return d ? this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: d
                    }) : !h || !h.session || !h.user ? this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: new re
                    }) : (h.session && (await this._saveSession(h.session), await this._notifyAllSubscribers("USER_UPDATED", h.session)), this._returnResult({
                        data: h,
                        error: d
                    }))
                } catch (i) {
                    if (await R(this.storage, `${this.storageKey}-code-verifier`), p(i)) return this._returnResult({
                        data: {
                            user: null,
                            session: null
                        },
                        error: i
                    });
                    throw i
                }
            })
        }
        async unlinkIdentity(e) {
            try {
                return await this._useSession(async r => {
                    var s, i;
                    const {
                        data: n,
                        error: a
                    } = r;
                    if (a) throw a;
                    return await y(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
                        headers: this.headers,
                        jwt: (i = (s = n.session) === null || s === void 0 ? void 0 : s.access_token) !== null && i !== void 0 ? i : void 0
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _refreshAccessToken(e) {
            const r = "#_refreshAccessToken()";
            this._debug(r, "begin");
            try {
                const s = Date.now();
                return await di(async i => (i > 0 && await ui(200 * Math.pow(2, i - 1)), this._debug(r, "refreshing attempt", i), await y(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
                    body: {
                        refresh_token: e
                    },
                    headers: this.headers,
                    xform: N
                })), (i, n) => {
                    const a = 200 * Math.pow(2, i);
                    return n && At(n) && Date.now() + a - s < 3e4
                })
            } catch (s) {
                if (this._debug(r, "error", s), p(s)) return this._returnResult({
                    data: {
                        session: null,
                        user: null
                    },
                    error: s
                });
                throw s
            } finally {
                this._debug(r, "end")
            }
        }
        _isValidSession(e) {
            return typeof e == "object" && e !== null && "access_token" in e && "refresh_token" in e && "expires_at" in e
        }
        async _handleProviderSignIn(e, r) {
            const s = await this._getUrlForProvider(`${this.url}/authorize`, e, {
                redirectTo: r.redirectTo,
                scopes: r.scopes,
                queryParams: r.queryParams
            });
            return this._debug("#_handleProviderSignIn()", "provider", e, "options", r, "url", s), j() && !r.skipBrowserRedirect && window.location.assign(s), {
                data: {
                    provider: e,
                    url: s
                },
                error: null
            }
        }
        async _recoverAndRefresh() {
            var e, r;
            const s = "#_recoverAndRefresh()";
            this._debug(s, "begin");
            try {
                const i = await U(this.storage, this.storageKey);
                if (i && this.userStorage) {
                    let a = await U(this.userStorage, this.storageKey + "-user");
                    !this.storage.isServer && Object.is(this.storage, this.userStorage) && !a && (a = {
                        user: i.user
                    }, await ae(this.userStorage, this.storageKey + "-user", a)), i.user = (e = a ? .user) !== null && e !== void 0 ? e : Ve()
                } else if (i && !i.user && !i.user) {
                    const a = await U(this.storage, this.storageKey + "-user");
                    a && a ? .user ? (i.user = a.user, await R(this.storage, this.storageKey + "-user"), await ae(this.storage, this.storageKey, i)) : i.user = Ve()
                }
                if (this._debug(s, "session from storage", i), !this._isValidSession(i)) {
                    this._debug(s, "session is not valid"), i !== null && await this._removeSession();
                    return
                }
                const n = ((r = i.expires_at) !== null && r !== void 0 ? r : 1 / 0) * 1e3 - Date.now() < Ke;
                if (this._debug(s, `session has${n?"":" not"} expired with margin of ${Ke}s`), n) {
                    if (this.autoRefreshToken && i.refresh_token) {
                        const {
                            error: a
                        } = await this._callRefreshToken(i.refresh_token);
                        a && (ti(a) ? this._debug(s, "refresh discarded by commit guard", a) : this._debug(s, "refresh failed", a))
                    }
                } else if (i.user && i.user.__isUserNotAvailableProxy === !0) try {
                    const {
                        data: a,
                        error: o
                    } = await this._getUser(i.access_token);
                    !o && a ? .user ? (i.user = a.user, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i)) : this._debug(s, "could not get user data, skipping SIGNED_IN notification")
                } catch (a) {
                    this._debug(s, "error getting user data, skipping SIGNED_IN notification", a)
                } else await this._notifyAllSubscribers("SIGNED_IN", i)
            } catch (i) {
                this._debug(s, "error", i);
                return
            } finally {
                this._debug(s, "end")
            }
        }
        async _callRefreshToken(e) {
            var r, s;
            if (!e) throw new C;
            if (this.refreshingDeferred) return this.refreshingDeferred.promise;
            if (this.lastRefreshFailure && this.lastRefreshFailure.refreshToken === e && Date.now() < this.lastRefreshFailure.expiresAt) return this._debug("#_callRefreshToken()", "returning cached failure (cooldown active)"), this.lastRefreshFailure.result;
            const i = "#_callRefreshToken()";
            this._debug(i, "begin");
            try {
                this.refreshingDeferred = new or;
                const n = await U(this.storage, this.storageKey),
                    {
                        data: a,
                        error: o
                    } = await this._refreshAccessToken(e);
                if (o) throw o;
                if (!a.session) throw new C;
                const l = await U(this.storage, this.storageKey);
                if (n !== null && (l === null || l.refresh_token !== n.refresh_token)) {
                    this._debug(i, "commit guard: storage changed since refresh started, discarding rotated tokens", {
                        startedWith: "present",
                        nowHolds: l ? "replaced" : "cleared"
                    });
                    const h = {
                        data: null,
                        error: new Rt
                    };
                    return this.refreshingDeferred.resolve(h), h
                }
                const c = this._sessionRemovalEpoch;
                if (await this._saveSession(a.session), this._sessionRemovalEpoch !== c) {
                    this._debug(i, "commit guard (post-save): _removeSession ran during _saveSession, undoing write"), await R(this.storage, this.storageKey), this.userStorage && await R(this.userStorage, this.storageKey + "-user");
                    const h = {
                        data: null,
                        error: new Rt
                    };
                    return this.refreshingDeferred.resolve(h), h
                }
                await this._notifyAllSubscribers("TOKEN_REFRESHED", a.session);
                const u = {
                    data: a.session,
                    error: null
                };
                return this.lastRefreshFailure = null, this.refreshingDeferred.resolve(u), u
            } catch (n) {
                if (this._debug(i, "error", n), p(n)) {
                    const a = {
                        data: null,
                        error: n
                    };
                    if (!At(n)) {
                        const o = await U(this.storage, this.storageKey);
                        o ? .expires_at && o.expires_at * 1e3 > Date.now() ? this._debug(i, "proactive refresh failed, access token still valid — preserving session") : await this._removeSession()
                    }
                    return this.lastRefreshFailure = {
                        refreshToken: e,
                        result: a,
                        expiresAt: Date.now() + Vs
                    }, (r = this.refreshingDeferred) === null || r === void 0 || r.resolve(a), a
                }
                throw (s = this.refreshingDeferred) === null || s === void 0 || s.reject(n), n
            } finally {
                this.refreshingDeferred = null, this._debug(i, "end")
            }
        }
        async _notifyAllSubscribers(e, r, s = !0) {
            const i = `#_notifyAllSubscribers(${e})`;
            this._debug(i, "begin", r, `broadcast = ${s}`);
            try {
                this.broadcastChannel && s && this.broadcastChannel.postMessage({
                    event: e,
                    session: r
                });
                const n = [],
                    a = Array.from(this.stateChangeEmitters.values()).map(async o => {
                        try {
                            await o.callback(e, r)
                        } catch (l) {
                            n.push(l)
                        }
                    });
                if (await Promise.all(a), n.length > 0) {
                    for (let o = 0; o < n.length; o += 1);
                    throw n[0]
                }
            } finally {
                this._debug(i, "end")
            }
        }
        async _saveSession(e) {
            this._debug("#_saveSession()", e), this.suppressGetSessionWarning = !0, await R(this.storage, `${this.storageKey}-code-verifier`);
            const r = Object.assign({}, e),
                s = r.user && r.user.__isUserNotAvailableProxy === !0;
            if (this.userStorage) {
                !s && r.user && await ae(this.userStorage, this.storageKey + "-user", {
                    user: r.user
                });
                const i = Object.assign({}, r);
                delete i.user;
                const n = It(i);
                await ae(this.storage, this.storageKey, n)
            } else {
                const i = It(r);
                await ae(this.storage, this.storageKey, i)
            }
        }
        async _removeSession() {
            this._sessionRemovalEpoch += 1, this._debug("#_removeSession()"), this.lastRefreshFailure = null, this.suppressGetSessionWarning = !1, await R(this.storage, this.storageKey), await R(this.storage, this.storageKey + "-code-verifier"), await R(this.storage, this.storageKey + "-user"), this.userStorage && await R(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null)
        }
        _removeVisibilityChangedCallback() {
            this._debug("#_removeVisibilityChangedCallback()");
            const e = this.visibilityChangedCallback;
            this.visibilityChangedCallback = null;
            try {
                e && j() && window ? .removeEventListener && window.removeEventListener("visibilitychange", e)
            } catch {}
        }
        async _startAutoRefresh() {
            await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
            const e = setInterval(() => this._autoRefreshTokenTick(), Q);
            this.autoRefreshTicker = e, e && typeof e == "object" && typeof e.unref == "function" ? e.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(e);
            const r = setTimeout(async () => {
                await this.initializePromise, await this._autoRefreshTokenTick()
            }, 0);
            this.autoRefreshTickTimeout = r, r && typeof r == "object" && typeof r.unref == "function" ? r.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(r)
        }
        async _stopAutoRefresh() {
            this._debug("#_stopAutoRefresh()");
            const e = this.autoRefreshTicker;
            this.autoRefreshTicker = null, e && clearInterval(e);
            const r = this.autoRefreshTickTimeout;
            this.autoRefreshTickTimeout = null, r && clearTimeout(r)
        }
        async startAutoRefresh() {
            this._removeVisibilityChangedCallback(), await this._startAutoRefresh()
        }
        async stopAutoRefresh() {
            this._removeVisibilityChangedCallback(), await this._stopAutoRefresh()
        }
        async dispose() {
            var e;
            this._removeVisibilityChangedCallback(), await this._stopAutoRefresh(), (e = this.broadcastChannel) === null || e === void 0 || e.close(), this.broadcastChannel = null, this.stateChangeEmitters.clear()
        }
        async _autoRefreshTokenTick() {
            if (this._debug("#_autoRefreshTokenTick()", "begin"), this.lock != null) {
                try {
                    await this._acquireLock(0, async () => {
                        try {
                            const e = Date.now();
                            try {
                                return await this._useSession(async r => {
                                    const {
                                        data: {
                                            session: s
                                        }
                                    } = r;
                                    if (!s || !s.refresh_token || !s.expires_at) {
                                        this._debug("#_autoRefreshTokenTick()", "no session");
                                        return
                                    }
                                    const i = Math.floor((s.expires_at * 1e3 - e) / Q);
                                    this._debug("#_autoRefreshTokenTick()", `access token expires in ${i} ticks, a tick lasts ${Q}ms, refresh threshold is 3 ticks`), i <= 3 && await this._callRefreshToken(s.refresh_token)
                                })
                            } catch {}
                        } finally {
                            this._debug("#_autoRefreshTokenTick()", "end")
                        }
                    })
                } catch (e) {
                    if (e instanceof Pi) this._debug("auto refresh token tick lock not available");
                    else throw e
                }
                return
            }
            if (this.refreshingDeferred !== null) {
                this._debug("#_autoRefreshTokenTick()", "refresh already in flight, skipping");
                return
            }
            try {
                const e = Date.now();
                try {
                    await this._useSession(async r => {
                        const {
                            data: {
                                session: s
                            }
                        } = r;
                        if (!s || !s.refresh_token || !s.expires_at) {
                            this._debug("#_autoRefreshTokenTick()", "no session");
                            return
                        }
                        const i = Math.floor((s.expires_at * 1e3 - e) / Q);
                        this._debug("#_autoRefreshTokenTick()", `access token expires in ${i} ticks, a tick lasts ${Q}ms, refresh threshold is 3 ticks`), i <= 3 && await this._callRefreshToken(s.refresh_token)
                    })
                } catch {}
            } finally {
                this._debug("#_autoRefreshTokenTick()", "end")
            }
        }
        async _handleVisibilityChange() {
            if (this._debug("#_handleVisibilityChange()"), !j() || !window ? .addEventListener) return this.autoRefreshToken && this.startAutoRefresh(), !1;
            try {
                this.visibilityChangedCallback = async () => {
                    try {
                        await this._onVisibilityChanged(!1)
                    } catch (e) {
                        this._debug("#visibilityChangedCallback", "error", e)
                    }
                }, window ? .addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0)
            } catch {}
        }
        async _onVisibilityChanged(e) {
            const r = `#_onVisibilityChanged(${e})`;
            if (this._debug(r, "visibilityState", document.visibilityState), document.visibilityState === "visible") {
                if (this.autoRefreshToken && this._startAutoRefresh(), !e)
                    if (await this.initializePromise, this.lock != null) await this._acquireLock(this.lockAcquireTimeout, async () => {
                        if (document.visibilityState !== "visible") {
                            this._debug(r, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                            return
                        }
                        await this._recoverAndRefresh()
                    });
                    else {
                        if (document.visibilityState !== "visible") {
                            this._debug(r, "visibilityState is no longer visible, skipping recovery");
                            return
                        }
                        await this._recoverAndRefresh()
                    }
            } else document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh()
        }
        async _getUrlForProvider(e, r, s) {
            const i = [`provider=${encodeURIComponent(r)}`];
            if (s ? .redirectTo && i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`), s ? .scopes && i.push(`scopes=${encodeURIComponent(s.scopes)}`), this.flowType === "pkce") {
                const [n, a] = await Y(this.storage, this.storageKey), o = new URLSearchParams({
                    code_challenge: `${encodeURIComponent(n)}`,
                    code_challenge_method: `${encodeURIComponent(a)}`
                });
                i.push(o.toString())
            }
            if (s ? .queryParams) {
                const n = new URLSearchParams(s.queryParams);
                i.push(n.toString())
            }
            return s ? .skipBrowserRedirect && i.push(`skip_http_redirect=${s.skipBrowserRedirect}`), `${e}?${i.join("&")}`
        }
        async _unenroll(e) {
            try {
                return await this._useSession(async r => {
                    var s;
                    const {
                        data: i,
                        error: n
                    } = r;
                    return n ? this._returnResult({
                        data: null,
                        error: n
                    }) : await y(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
                        headers: this.headers,
                        jwt: (s = i ? .session) === null || s === void 0 ? void 0 : s.access_token
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _enroll(e) {
            try {
                return await this._useSession(async r => {
                    var s, i;
                    const {
                        data: n,
                        error: a
                    } = r;
                    if (a) return this._returnResult({
                        data: null,
                        error: a
                    });
                    const o = Object.assign({
                            friendly_name: e.friendlyName,
                            factor_type: e.factorType
                        }, e.factorType === "phone" ? {
                            phone: e.phone
                        } : e.factorType === "totp" ? {
                            issuer: e.issuer
                        } : {}),
                        {
                            data: l,
                            error: c
                        } = await y(this.fetch, "POST", `${this.url}/factors`, {
                            body: o,
                            headers: this.headers,
                            jwt: (s = n ? .session) === null || s === void 0 ? void 0 : s.access_token
                        });
                    return c ? this._returnResult({
                        data: null,
                        error: c
                    }) : (e.factorType === "totp" && l.type === "totp" && (!((i = l ? .totp) === null || i === void 0) && i.qr_code) && (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`), this._returnResult({
                        data: l,
                        error: null
                    }))
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _verify(e) {
            const r = async () => {
                try {
                    return await this._useSession(async s => {
                        var i;
                        const {
                            data: n,
                            error: a
                        } = s;
                        if (a) return this._returnResult({
                            data: null,
                            error: a
                        });
                        const o = Object.assign({
                                challenge_id: e.challengeId
                            }, "webauthn" in e ? {
                                webauthn: Object.assign(Object.assign({}, e.webauthn), {
                                    credential_response: e.webauthn.type === "create" ? Bt(e.webauthn.credential_response) : qt(e.webauthn.credential_response)
                                })
                            } : {
                                code: e.code
                            }),
                            {
                                data: l,
                                error: c
                            } = await y(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
                                body: o,
                                headers: this.headers,
                                jwt: (i = n ? .session) === null || i === void 0 ? void 0 : i.access_token
                            });
                        return c ? this._returnResult({
                            data: null,
                            error: c
                        }) : (await this._saveSession(Object.assign({
                            expires_at: Math.round(Date.now() / 1e3) + l.expires_in
                        }, l)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", l), this._returnResult({
                            data: l,
                            error: c
                        }))
                    })
                } catch (s) {
                    if (p(s)) return this._returnResult({
                        data: null,
                        error: s
                    });
                    throw s
                }
            };
            return this.lock != null ? this._acquireLock(this.lockAcquireTimeout, r) : r()
        }
        async _challenge(e) {
            const r = async () => {
                try {
                    return await this._useSession(async s => {
                        var i;
                        const {
                            data: n,
                            error: a
                        } = s;
                        if (a) return this._returnResult({
                            data: null,
                            error: a
                        });
                        const o = await y(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
                            body: e,
                            headers: this.headers,
                            jwt: (i = n ? .session) === null || i === void 0 ? void 0 : i.access_token
                        });
                        if (o.error) return o;
                        const {
                            data: l
                        } = o;
                        if (l.type !== "webauthn") return {
                            data: l,
                            error: null
                        };
                        switch (l.webauthn.type) {
                            case "create":
                                return {
                                    data: Object.assign(Object.assign({}, l), {
                                        webauthn: Object.assign(Object.assign({}, l.webauthn), {
                                            credential_options: Object.assign(Object.assign({}, l.webauthn.credential_options), {
                                                publicKey: Lt(l.webauthn.credential_options.publicKey)
                                            })
                                        })
                                    }),
                                    error: null
                                };
                            case "request":
                                return {
                                    data: Object.assign(Object.assign({}, l), {
                                        webauthn: Object.assign(Object.assign({}, l.webauthn), {
                                            credential_options: Object.assign(Object.assign({}, l.webauthn.credential_options), {
                                                publicKey: Dt(l.webauthn.credential_options.publicKey)
                                            })
                                        })
                                    }),
                                    error: null
                                }
                        }
                    })
                } catch (s) {
                    if (p(s)) return this._returnResult({
                        data: null,
                        error: s
                    });
                    throw s
                }
            };
            return this.lock != null ? this._acquireLock(this.lockAcquireTimeout, r) : r()
        }
        async _challengeAndVerify(e) {
            const {
                data: r,
                error: s
            } = await this._challenge({
                factorId: e.factorId
            });
            return s ? this._returnResult({
                data: null,
                error: s
            }) : await this._verify({
                factorId: e.factorId,
                challengeId: r.id,
                code: e.code
            })
        }
        async _listFactors() {
            var e;
            const {
                data: {
                    user: r
                },
                error: s
            } = await this.getUser();
            if (s) return {
                data: null,
                error: s
            };
            const i = {
                all: [],
                phone: [],
                totp: [],
                webauthn: []
            };
            for (const n of (e = r ? .factors) !== null && e !== void 0 ? e : []) i.all.push(n), n.status === "verified" && i[n.factor_type].push(n);
            return {
                data: i,
                error: null
            }
        }
        async _getAuthenticatorAssuranceLevel(e) {
            var r, s, i, n;
            if (e) try {
                const {
                    payload: d
                } = Ce(e);
                let f = null;
                d.aal && (f = d.aal);
                let g = f;
                const {
                    data: {
                        user: v
                    },
                    error: m
                } = await this.getUser(e);
                if (m) return this._returnResult({
                    data: null,
                    error: m
                });
                ((s = (r = v ? .factors) === null || r === void 0 ? void 0 : r.filter(k => k.status === "verified")) !== null && s !== void 0 ? s : []).length > 0 && (g = "aal2");
                const _ = d.amr || [];
                return {
                    data: {
                        currentLevel: f,
                        nextLevel: g,
                        currentAuthenticationMethods: _
                    },
                    error: null
                }
            } catch (d) {
                if (p(d)) return this._returnResult({
                    data: null,
                    error: d
                });
                throw d
            }
            const {
                data: {
                    session: a
                },
                error: o
            } = await this.getSession();
            if (o) return this._returnResult({
                data: null,
                error: o
            });
            if (!a) return {
                data: {
                    currentLevel: null,
                    nextLevel: null,
                    currentAuthenticationMethods: []
                },
                error: null
            };
            const {
                payload: l
            } = Ce(a.access_token);
            let c = null;
            l.aal && (c = l.aal);
            let u = c;
            ((n = (i = a.user.factors) === null || i === void 0 ? void 0 : i.filter(d => d.status === "verified")) !== null && n !== void 0 ? n : []).length > 0 && (u = "aal2");
            const h = l.amr || [];
            return {
                data: {
                    currentLevel: c,
                    nextLevel: u,
                    currentAuthenticationMethods: h
                },
                error: null
            }
        }
        async _getAuthorizationDetails(e) {
            try {
                return await this._useSession(async r => {
                    const {
                        data: {
                            session: s
                        },
                        error: i
                    } = r;
                    return i ? this._returnResult({
                        data: null,
                        error: i
                    }) : s ? await y(this.fetch, "GET", `${this.url}/oauth/authorizations/${e}`, {
                        headers: this.headers,
                        jwt: s.access_token,
                        xform: n => ({
                            data: n,
                            error: null
                        })
                    }) : this._returnResult({
                        data: null,
                        error: new C
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _approveAuthorization(e, r) {
            try {
                return await this._useSession(async s => {
                    const {
                        data: {
                            session: i
                        },
                        error: n
                    } = s;
                    if (n) return this._returnResult({
                        data: null,
                        error: n
                    });
                    if (!i) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const a = await y(this.fetch, "POST", `${this.url}/oauth/authorizations/${e}/consent`, {
                        headers: this.headers,
                        jwt: i.access_token,
                        body: {
                            action: "approve"
                        },
                        xform: o => ({
                            data: o,
                            error: null
                        })
                    });
                    return a.data && a.data.redirect_url && j() && !r ? .skipBrowserRedirect && window.location.assign(a.data.redirect_url), a
                })
            } catch (s) {
                if (p(s)) return this._returnResult({
                    data: null,
                    error: s
                });
                throw s
            }
        }
        async _denyAuthorization(e, r) {
            try {
                return await this._useSession(async s => {
                    const {
                        data: {
                            session: i
                        },
                        error: n
                    } = s;
                    if (n) return this._returnResult({
                        data: null,
                        error: n
                    });
                    if (!i) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const a = await y(this.fetch, "POST", `${this.url}/oauth/authorizations/${e}/consent`, {
                        headers: this.headers,
                        jwt: i.access_token,
                        body: {
                            action: "deny"
                        },
                        xform: o => ({
                            data: o,
                            error: null
                        })
                    });
                    return a.data && a.data.redirect_url && j() && !r ? .skipBrowserRedirect && window.location.assign(a.data.redirect_url), a
                })
            } catch (s) {
                if (p(s)) return this._returnResult({
                    data: null,
                    error: s
                });
                throw s
            }
        }
        async _listOAuthGrants() {
            try {
                return await this._useSession(async e => {
                    const {
                        data: {
                            session: r
                        },
                        error: s
                    } = e;
                    return s ? this._returnResult({
                        data: null,
                        error: s
                    }) : r ? await y(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
                        headers: this.headers,
                        jwt: r.access_token,
                        xform: i => ({
                            data: i,
                            error: null
                        })
                    }) : this._returnResult({
                        data: null,
                        error: new C
                    })
                })
            } catch (e) {
                if (p(e)) return this._returnResult({
                    data: null,
                    error: e
                });
                throw e
            }
        }
        async _revokeOAuthGrant(e) {
            try {
                return await this._useSession(async r => {
                    const {
                        data: {
                            session: s
                        },
                        error: i
                    } = r;
                    return i ? this._returnResult({
                        data: null,
                        error: i
                    }) : s ? (await y(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
                        headers: this.headers,
                        jwt: s.access_token,
                        query: {
                            client_id: e.clientId
                        },
                        noResolveJson: !0
                    }), {
                        data: {},
                        error: null
                    }) : this._returnResult({
                        data: null,
                        error: new C
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async fetchJwk(e, r = {
            keys: []
        }) {
            let s = r.keys.find(o => o.kid === e);
            if (s) return s;
            const i = Date.now();
            if (s = this.jwks.keys.find(o => o.kid === e), s && this.jwks_cached_at + 6e5 > i) return s;
            const {
                data: n,
                error: a
            } = await y(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
                headers: this.headers
            });
            if (a) throw a;
            return !n.keys || n.keys.length === 0 || (this.jwks = n, this.jwks_cached_at = i, s = n.keys.find(o => o.kid === e), !s) ? null : s
        }
        async getClaims(e, r = {}) {
            try {
                let s = e;
                if (!s) {
                    const {
                        data: d,
                        error: f
                    } = await this.getSession();
                    if (f || !d.session) return this._returnResult({
                        data: null,
                        error: f
                    });
                    s = d.session.access_token
                }
                const {
                    header: i,
                    payload: n,
                    signature: a,
                    raw: {
                        header: o,
                        payload: l
                    }
                } = Ce(s);
                if (!r ? .allowExpired) try {
                    wi(n.exp)
                } catch (d) {
                    throw new Ne(d instanceof Error ? d.message : "JWT validation failed")
                }
                const c = !i.alg || i.alg.startsWith("HS") || !i.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(i.kid, r ? .keys ? {
                    keys: r.keys
                } : r ? .jwks);
                if (!c) {
                    const {
                        error: d
                    } = await this.getUser(s);
                    if (d) throw d;
                    return {
                        data: {
                            claims: n,
                            header: i,
                            signature: a
                        },
                        error: null
                    }
                }
                const u = _i(i.alg),
                    h = await crypto.subtle.importKey("jwk", c, u, !0, ["verify"]);
                if (!await crypto.subtle.verify(u, h, a, ai(`${o}.${l}`))) throw new Ne("Invalid JWT signature");
                return {
                    data: {
                        claims: n,
                        header: i,
                        signature: a
                    },
                    error: null
                }
            } catch (s) {
                if (p(s)) return this._returnResult({
                    data: null,
                    error: s
                });
                throw s
            }
        }
        async signInWithPasskey(e) {
            var r, s, i;
            L(this.experimental);
            try {
                if (!De()) return this._returnResult({
                    data: null,
                    error: new B("Browser does not support WebAuthn", null)
                });
                const {
                    data: n,
                    error: a
                } = await this._startPasskeyAuthentication({
                    options: {
                        captchaToken: (r = e ? .options) === null || r === void 0 ? void 0 : r.captchaToken
                    }
                });
                if (a || !n) return this._returnResult({
                    data: null,
                    error: a
                });
                const {
                    data: o,
                    error: l
                } = await dr({
                    publicKey: Dt(n.options),
                    signal: (i = (s = e ? .options) === null || s === void 0 ? void 0 : s.signal) !== null && i !== void 0 ? i : at.createNewAbortSignal()
                });
                if (l || !o) return this._returnResult({
                    data: null,
                    error: l ? ? new B("WebAuthn ceremony failed", null)
                });
                const c = qt(o);
                return this._verifyPasskeyAuthentication({
                    challengeId: n.challenge_id,
                    credential: c
                })
            } catch (n) {
                if (p(n)) return this._returnResult({
                    data: null,
                    error: n
                });
                throw n
            }
        }
        async registerPasskey(e) {
            var r, s;
            L(this.experimental);
            try {
                if (!De()) return this._returnResult({
                    data: null,
                    error: new B("Browser does not support WebAuthn", null)
                });
                const {
                    data: i,
                    error: n
                } = await this._startPasskeyRegistration();
                if (n || !i) return this._returnResult({
                    data: null,
                    error: n
                });
                const {
                    data: a,
                    error: o
                } = await ur({
                    publicKey: Lt(i.options),
                    signal: (s = (r = e ? .options) === null || r === void 0 ? void 0 : r.signal) !== null && s !== void 0 ? s : at.createNewAbortSignal()
                });
                if (o || !a) return this._returnResult({
                    data: null,
                    error: o ? ? new B("WebAuthn ceremony failed", null)
                });
                const l = Bt(a);
                return this._verifyPasskeyRegistration({
                    challengeId: i.challenge_id,
                    credential: l
                })
            } catch (i) {
                if (p(i)) return this._returnResult({
                    data: null,
                    error: i
                });
                throw i
            }
        }
        async _startPasskeyRegistration() {
            L(this.experimental);
            try {
                return await this._useSession(async e => {
                    const {
                        data: {
                            session: r
                        },
                        error: s
                    } = e;
                    if (s) return this._returnResult({
                        data: null,
                        error: s
                    });
                    if (!r) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const {
                        data: i,
                        error: n
                    } = await y(this.fetch, "POST", `${this.url}/passkeys/registration/options`, {
                        headers: this.headers,
                        jwt: r.access_token,
                        body: {}
                    });
                    return n ? this._returnResult({
                        data: null,
                        error: n
                    }) : this._returnResult({
                        data: i,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return this._returnResult({
                    data: null,
                    error: e
                });
                throw e
            }
        }
        async _verifyPasskeyRegistration(e) {
            L(this.experimental);
            try {
                return await this._useSession(async r => {
                    const {
                        data: {
                            session: s
                        },
                        error: i
                    } = r;
                    if (i) return this._returnResult({
                        data: null,
                        error: i
                    });
                    if (!s) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const {
                        data: n,
                        error: a
                    } = await y(this.fetch, "POST", `${this.url}/passkeys/registration/verify`, {
                        headers: this.headers,
                        jwt: s.access_token,
                        body: {
                            challenge_id: e.challengeId,
                            credential: e.credential
                        }
                    });
                    return a ? this._returnResult({
                        data: null,
                        error: a
                    }) : this._returnResult({
                        data: n,
                        error: null
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _startPasskeyAuthentication(e) {
            var r;
            L(this.experimental);
            try {
                const {
                    data: s,
                    error: i
                } = await y(this.fetch, "POST", `${this.url}/passkeys/authentication/options`, {
                    headers: this.headers,
                    body: {
                        gotrue_meta_security: {
                            captcha_token: (r = e ? .options) === null || r === void 0 ? void 0 : r.captchaToken
                        }
                    }
                });
                return i ? this._returnResult({
                    data: null,
                    error: i
                }) : this._returnResult({
                    data: s,
                    error: null
                })
            } catch (s) {
                if (p(s)) return this._returnResult({
                    data: null,
                    error: s
                });
                throw s
            }
        }
        async _verifyPasskeyAuthentication(e) {
            L(this.experimental);
            try {
                const {
                    data: r,
                    error: s
                } = await y(this.fetch, "POST", `${this.url}/passkeys/authentication/verify`, {
                    headers: this.headers,
                    body: {
                        challenge_id: e.challengeId,
                        credential: e.credential
                    },
                    xform: N
                });
                return s ? this._returnResult({
                    data: null,
                    error: s
                }) : (r.session && (await this._saveSession(r.session), await this._notifyAllSubscribers("SIGNED_IN", r.session)), this._returnResult({
                    data: r,
                    error: null
                }))
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _listPasskeys() {
            L(this.experimental);
            try {
                return await this._useSession(async e => {
                    const {
                        data: {
                            session: r
                        },
                        error: s
                    } = e;
                    if (s) return this._returnResult({
                        data: null,
                        error: s
                    });
                    if (!r) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const {
                        data: i,
                        error: n
                    } = await y(this.fetch, "GET", `${this.url}/passkeys`, {
                        headers: this.headers,
                        jwt: r.access_token,
                        xform: a => ({
                            data: a,
                            error: null
                        })
                    });
                    return n ? this._returnResult({
                        data: null,
                        error: n
                    }) : this._returnResult({
                        data: i,
                        error: null
                    })
                })
            } catch (e) {
                if (p(e)) return this._returnResult({
                    data: null,
                    error: e
                });
                throw e
            }
        }
        async _updatePasskey(e) {
            L(this.experimental);
            try {
                return await this._useSession(async r => {
                    const {
                        data: {
                            session: s
                        },
                        error: i
                    } = r;
                    if (i) return this._returnResult({
                        data: null,
                        error: i
                    });
                    if (!s) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const {
                        data: n,
                        error: a
                    } = await y(this.fetch, "PATCH", `${this.url}/passkeys/${e.passkeyId}`, {
                        headers: this.headers,
                        jwt: s.access_token,
                        body: {
                            friendly_name: e.friendlyName
                        }
                    });
                    return a ? this._returnResult({
                        data: null,
                        error: a
                    }) : this._returnResult({
                        data: n,
                        error: null
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
        async _deletePasskey(e) {
            L(this.experimental);
            try {
                return await this._useSession(async r => {
                    const {
                        data: {
                            session: s
                        },
                        error: i
                    } = r;
                    if (i) return this._returnResult({
                        data: null,
                        error: i
                    });
                    if (!s) return this._returnResult({
                        data: null,
                        error: new C
                    });
                    const {
                        error: n
                    } = await y(this.fetch, "DELETE", `${this.url}/passkeys/${e.passkeyId}`, {
                        headers: this.headers,
                        jwt: s.access_token,
                        noResolveJson: !0
                    });
                    return n ? this._returnResult({
                        data: null,
                        error: n
                    }) : this._returnResult({
                        data: null,
                        error: null
                    })
                })
            } catch (r) {
                if (p(r)) return this._returnResult({
                    data: null,
                    error: r
                });
                throw r
            }
        }
    };
fr.nextInstanceID = {};
var Wi = fr,
    Ki = "2.110.0",
    de = "",
    qe;
if (typeof Deno < "u") {
    var Ge;
    de = "deno", qe = (Ge = Deno.version) === null || Ge === void 0 ? void 0 : Ge.deno
} else if (typeof document < "u") de = "web";
else if (typeof navigator < "u" && navigator.product === "ReactNative") de = "react-native";
else {
    var ze;
    de = "node", qe = typeof process < "u" ? (ze = process.version) === null || ze === void 0 ? void 0 : ze.replace(/^v/, "") : void 0
}
var gr = [`runtime=${de}`];
qe && gr.push(`runtime-version=${qe}`);
var Vi = {
        headers: {
            "X-Client-Info": `supabase-js/${Ki}; ${gr.join("; ")}`
        }
    },
    Ji = {
        schema: "public"
    },
    Gi = {
        autoRefreshToken: !0,
        persistSession: !0,
        detectSessionInUrl: !0,
        flowType: "implicit"
    },
    zi = {},
    Yi = {
        enabled: !1,
        respectSamplingDecision: !0
    };

function Xi(t, e, r, s) {
    function i(n) {
        return n instanceof r ? n : new r(function(a) {
            a(n)
        })
    }
    return new(r || (r = Promise))(function(n, a) {
        function o(u) {
            try {
                c(s.next(u))
            } catch (h) {
                a(h)
            }
        }

        function l(u) {
            try {
                c(s.throw(u))
            } catch (h) {
                a(h)
            }
        }

        function c(u) {
            u.done ? n(u.value) : i(u.value).then(o, l)
        }
        c((s = s.apply(t, e || [])).next())
    })
}
var Ye = null,
    Qi = "@opentelemetry/api";

function Zi() {
    return Ye === null && (Ye = vr(() =>
        import (Qi), []).catch(() => null)), Ye
}

function en() {
    return Xi(this, void 0, void 0, function*() {
        try {
            const t = yield Zi();
            if (!t || !t.propagation || !t.context) return null;
            const e = {};
            t.propagation.inject(t.context.active(), e);
            const r = e.traceparent;
            return r ? {
                traceparent: r,
                tracestate: e.tracestate,
                baggage: e.baggage
            } : null
        } catch {
            return null
        }
    })
}

function tn(t) {
    if (!t || typeof t != "string") return null;
    const e = t.split("-");
    if (e.length !== 4) return null;
    const [r, s, i, n] = e;
    if (r.length !== 2 || s.length !== 32 || i.length !== 16 || n.length !== 2) return null;
    const a = /^[0-9a-f]+$/i;
    return !a.test(r) || !a.test(s) || !a.test(i) || !a.test(n) || s === "00000000000000000000000000000000" || i === "0000000000000000" ? null : {
        version: r,
        traceId: s,
        parentId: i,
        traceFlags: n,
        isSampled: (parseInt(n, 16) & 1) === 1
    }
}

function rn(t, e) {
    if (!t || !e || e.length === 0) return !1;
    let r;
    if (t instanceof URL) r = t;
    else try {
        r = new URL(t)
    } catch {
        return !1
    }
    for (const s of e) try {
        if (typeof s == "string") {
            if (sn(r.hostname, s)) return !0
        } else if (s instanceof RegExp) {
            if (s.test(r.hostname)) return !0
        } else if (typeof s == "function" && s(r)) return !0
    } catch {
        continue
    }
    return !1
}

function sn(t, e) {
    if (e === t) return !0;
    if (e.startsWith("*.")) {
        const r = e.slice(2);
        if (t.endsWith(r) && (t === r || t.endsWith("." + r))) return !0
    }
    return !1
}

function nn(t) {
    const e = [];
    try {
        const r = new URL(t);
        e.push(r.hostname)
    } catch {}
    return e.push("*.supabase.co", "*.supabase.in"), e.push("localhost", "127.0.0.1", "[::1]"), e
}

function _e(t) {
    "@babel/helpers - typeof";
    return _e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e
    } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, _e(t)
}

function an(t, e) {
    if (_e(t) != "object" || !t) return t;
    var r = t[Symbol.toPrimitive];
    if (r !== void 0) {
        var s = r.call(t, e || "default");
        if (_e(s) != "object") return s;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (e === "string" ? String : Number)(t)
}

function on(t) {
    var e = an(t, "string");
    return _e(e) == "symbol" ? e : e + ""
}

function ln(t, e, r) {
    return (e = on(e)) in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t
}

function Ht(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(t);
        e && (s = s.filter(function(i) {
            return Object.getOwnPropertyDescriptor(t, i).enumerable
        })), r.push.apply(r, s)
    }
    return r
}

function A(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e] != null ? arguments[e] : {};
        e % 2 ? Ht(Object(r), !0).forEach(function(s) {
            ln(t, s, r[s])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : Ht(Object(r)).forEach(function(s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s))
        })
    }
    return t
}
var cn = t => t ? (...e) => t(...e) : (...e) => fetch(...e),
    hn = () => Headers,
    un = (t, e, r, s, i) => {
        const n = cn(s),
            a = hn(),
            o = i ? .enabled === !0,
            l = i ? .respectSamplingDecision !== !1,
            c = o ? nn(e) : null;
        return async (u, h) => {
            var d;
            const f = (d = await r()) !== null && d !== void 0 ? d : t;
            let g = new a(h ? .headers);
            if (g.has("apikey") || g.set("apikey", t), g.has("Authorization") || g.set("Authorization", `Bearer ${f}`), c) {
                const v = await dn(u, c, l);
                v && (v.traceparent && !g.has("traceparent") && g.set("traceparent", v.traceparent), v.tracestate && !g.has("tracestate") && g.set("tracestate", v.tracestate), v.baggage && !g.has("baggage") && g.set("baggage", v.baggage))
            }
            return n(u, A(A({}, h), {}, {
                headers: g
            }))
        }
    };
async function dn(t, e, r) {
    if (!rn(typeof t == "string" || t instanceof URL ? t : t.url, e)) return null;
    const s = await en();
    if (!s || !s.traceparent) return null;
    if (r) {
        const i = tn(s.traceparent);
        if (i && !i.isSampled) return null
    }
    return s
}

function Mt(t) {
    return typeof t == "boolean" ? {
        enabled: t
    } : t
}

function fn(t) {
    return t.endsWith("/") ? t : t + "/"
}

function gn(t, e) {
    var r, s, i, n, a, o;
    const {
        db: l,
        auth: c,
        realtime: u,
        global: h
    } = t, {
        db: d,
        auth: f,
        realtime: g,
        global: v
    } = e, m = Mt(t.tracePropagation), _ = Mt(e.tracePropagation), k = {
        db: A(A({}, d), l),
        auth: A(A({}, f), c),
        realtime: A(A({}, g), u),
        storage: {},
        global: A(A(A({}, v), h), {}, {
            headers: A(A({}, (r = v ? .headers) !== null && r !== void 0 ? r : {}), (s = h ? .headers) !== null && s !== void 0 ? s : {})
        }),
        tracePropagation: {
            enabled: (i = (n = m ? .enabled) !== null && n !== void 0 ? n : _ ? .enabled) !== null && i !== void 0 ? i : !1,
            respectSamplingDecision: (a = (o = m ? .respectSamplingDecision) !== null && o !== void 0 ? o : _ ? .respectSamplingDecision) !== null && a !== void 0 ? a : !0
        },
        accessToken: async () => ""
    };
    return t.accessToken ? k.accessToken = t.accessToken : delete k.accessToken, k
}

function pn(t) {
    const e = t ? .trim();
    if (!e) throw new Error("supabaseUrl is required.");
    if (!e.match(/^https?:\/\//i)) throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
    try {
        return new URL(fn(e))
    } catch {
        throw Error("Invalid supabaseUrl: Provided URL is malformed.")
    }
}
var vn = class extends Wi {
        constructor(t) {
            super(t)
        }
    },
    yn = class {
        constructor(t, e, r) {
            var s, i;
            this.supabaseUrl = t, this.supabaseKey = e;
            const n = pn(t);
            if (!e) throw new Error("supabaseKey is required.");
            this.realtimeUrl = new URL("realtime/v1", n), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", n), this.storageUrl = new URL("storage/v1", n), this.functionsUrl = new URL("functions/v1", n);
            const a = `sb-${n.hostname.split(".")[0]}-auth-token`,
                o = {
                    db: Ji,
                    realtime: zi,
                    auth: A(A({}, Gi), {}, {
                        storageKey: a
                    }),
                    global: Vi,
                    tracePropagation: Yi
                },
                l = gn(r ? ? {}, o);
            if (this.settings = l, this.storageKey = (s = l.auth.storageKey) !== null && s !== void 0 ? s : "", this.headers = (i = l.global.headers) !== null && i !== void 0 ? i : {}, l.accessToken) this.accessToken = l.accessToken, this.auth = new Proxy({}, {
                get: (u, h) => {
                    throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`)
                }
            });
            else {
                var c;
                this.auth = this._initSupabaseAuthClient((c = l.auth) !== null && c !== void 0 ? c : {}, this.headers, l.global.fetch)
            }
            this.fetch = un(e, t, this._getAccessToken.bind(this), l.global.fetch, l.tracePropagation), this.realtime = this._initRealtimeClient(A({
                headers: this.headers,
                accessToken: this._getAccessToken.bind(this),
                fetch: this.fetch
            }, l.realtime)), this.accessToken && Promise.resolve(this.accessToken()).then(u => this.realtime.setAuth(u)).catch(u => {}), this.rest = new Or(new URL("rest/v1", n).href, {
                headers: this.headers,
                schema: l.db.schema,
                fetch: this.fetch,
                timeout: l.db.timeout,
                urlLengthLimit: l.db.urlLengthLimit
            }), this.storage = new Ks(this.storageUrl.href, this.headers, this.fetch, r ? .storage), l.accessToken || this._listenForAuthEvents()
        }
        get functions() {
            return new wr(this.functionsUrl.href, {
                headers: this.headers,
                customFetch: this.fetch
            })
        }
        from(t) {
            return this.rest.from(t)
        }
        schema(t) {
            return this.rest.schema(t)
        }
        rpc(t, e = {}, r = {
            head: !1,
            get: !1,
            count: void 0
        }) {
            return this.rest.rpc(t, e, r)
        }
        channel(t, e = {
            config: {}
        }) {
            return this.realtime.channel(t, e)
        }
        getChannels() {
            return this.realtime.getChannels()
        }
        removeChannel(t) {
            return this.realtime.removeChannel(t)
        }
        removeAllChannels() {
            return this.realtime.removeAllChannels()
        }
        async _getAccessToken() {
            var t = this,
                e, r;
            if (t.accessToken) return await t.accessToken();
            const {
                data: s
            } = await t.auth.getSession();
            return (e = (r = s.session) === null || r === void 0 ? void 0 : r.access_token) !== null && e !== void 0 ? e : t.supabaseKey
        }
        _initSupabaseAuthClient({
            autoRefreshToken: t,
            persistSession: e,
            detectSessionInUrl: r,
            storage: s,
            userStorage: i,
            storageKey: n,
            flowType: a,
            lock: o,
            debug: l,
            throwOnError: c,
            experimental: u,
            lockAcquireTimeout: h,
            skipAutoInitialize: d
        }, f, g) {
            const v = {
                Authorization: `Bearer ${this.supabaseKey}`,
                apikey: `${this.supabaseKey}`
            };
            return new vn({
                url: this.authUrl.href,
                headers: A(A({}, v), f),
                storageKey: n,
                autoRefreshToken: t,
                persistSession: e,
                detectSessionInUrl: r,
                storage: s,
                userStorage: i,
                flowType: a,
                lock: o,
                debug: l,
                throwOnError: c,
                experimental: u,
                fetch: g,
                lockAcquireTimeout: h,
                skipAutoInitialize: d,
                hasCustomAuthorizationHeader: Object.keys(this.headers).some(m => m.toLowerCase() === "authorization")
            })
        }
        _initRealtimeClient(t) {
            return new ys(this.realtimeUrl.href, A(A({}, t), {}, {
                params: A(A({}, {
                    apikey: this.supabaseKey
                }), t ? .params)
            }))
        }
        _listenForAuthEvents() {
            return this.auth.onAuthStateChange((t, e) => {
                this._handleTokenChanged(t, "CLIENT", e ? .access_token)
            })
        }
        _handleTokenChanged(t, e, r) {
            (t === "TOKEN_REFRESHED" || t === "SIGNED_IN") && this.changedAccessToken !== r ? (this.changedAccessToken = r, this.realtime.setAuth(r)) : t === "SIGNED_OUT" && (this.realtime.setAuth(), e == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0)
        }
    },
    Sn = (t, e, r) => new yn(t, e, r);

function mn() {
    if (typeof window < "u") return !1;
    const t = globalThis.process;
    if (!t) return !1;
    const e = t.version;
    if (e == null) return !1;
    const r = e.match(/^v(\d+)\./);
    return r ? parseInt(r[1], 10) <= 20 : !1
}
mn();
export {
    Sn as t
};