import {
    i as le,
    n as B,
    t as be
} from "./jsx-runtime-RK1IuXQa.js";
import {
    t as ye
} from "./react-D8T8de5F.js";
import {
    t as ve
} from "./useNavigate-4EALhmsS.js";
import {
    t as te
} from "./useServerFn-CEPyiRv4.js";
import {
    t as xe
} from "./funded-client-CVhX_QT0.js";
import {
    t as we
} from "./createLucideIcon-salqAbnG.js";
import {
    t as _e
} from "./arrow-left-zoMTLNoX.js";
import {
    t as de
} from "./chevron-right-DXbAj7Iv.js";
import {
    t as se
} from "./circle-alert-DVOFa-Qj.js";
import {
    t as Ne
} from "./copy-8nDvbLpw.js";
import {
    t as je
} from "./credit-card-gLjS0BKk.js";
import {
    t as ie
} from "./loader-circle-Bbd-wqZ4.js";
import {
    t as Ce
} from "./party-popper-Bfsp2y15.js";
import {
    t as Ee
} from "./x-CDsSwOcD.js";
import {
    J as X,
    Tn as Te,
    dt as ce,
    gn as ke,
    kt as ee
} from "./index-dGs9i_Jo.js";
import {
    t as Ae
} from "./use-auth-a-YuX6oV.js";
import {
    t as Ie
} from "./use-is-funded-account-D2HXKtsv.js";
import {
    i as Be,
    n as Se,
    r as Me,
    t as Pe
} from "./deposits.functions-CW0AdK8S.js";
var Re = [
        ["path", {
            d: "M11 10.27 7 3.34",
            key: "16pf9h"
        }],
        ["path", {
            d: "m11 13.73-4 6.93",
            key: "794ttg"
        }],
        ["path", {
            d: "M12 22v-2",
            key: "1osdcq"
        }],
        ["path", {
            d: "M12 2v2",
            key: "tus03m"
        }],
        ["path", {
            d: "M14 12h8",
            key: "4f43i9"
        }],
        ["path", {
            d: "m17 20.66-1-1.73",
            key: "eq3orb"
        }],
        ["path", {
            d: "m17 3.34-1 1.73",
            key: "2wel8s"
        }],
        ["path", {
            d: "M2 12h2",
            key: "1t8f8n"
        }],
        ["path", {
            d: "m20.66 17-1.73-1",
            key: "sg0v6f"
        }],
        ["path", {
            d: "m20.66 7-1.73 1",
            key: "1ow05n"
        }],
        ["path", {
            d: "m3.34 17 1.73-1",
            key: "nuk764"
        }],
        ["path", {
            d: "m3.34 7 1.73 1",
            key: "1ulond"
        }],
        ["circle", {
            cx: "12",
            cy: "12",
            r: "2",
            key: "1c9p78"
        }],
        ["circle", {
            cx: "12",
            cy: "12",
            r: "8",
            key: "46899m"
        }]
    ],
    $e = we("cog", Re),
    De = B(((a, o) => {
        o.exports = function() {
            return typeof Promise == "function" && Promise.prototype && Promise.prototype.then
        }
    })),
    O = B((a => {
        var o, d = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
        a.getSymbolSize = function(e) {
            if (!e) throw new Error('"version" cannot be null or undefined');
            if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
            return e * 4 + 17
        }, a.getSymbolTotalCodewords = function(e) {
            return d[e]
        }, a.getBCHDigit = function(r) {
            let e = 0;
            for (; r !== 0;) e++, r >>>= 1;
            return e
        }, a.setToSJISFunction = function(e) {
            if (typeof e != "function") throw new Error('"toSJISFunc" is not a valid function.');
            o = e
        }, a.isKanjiModeEnabled = function() {
            return typeof o < "u"
        }, a.toSJIS = function(e) {
            return o(e)
        }
    })),
    oe = B((a => {
        a.L = {
            bit: 1
        }, a.M = {
            bit: 0
        }, a.Q = {
            bit: 3
        }, a.H = {
            bit: 2
        };

        function o(d) {
            if (typeof d != "string") throw new Error("Param is not a string");
            switch (d.toLowerCase()) {
                case "l":
                case "low":
                    return a.L;
                case "m":
                case "medium":
                    return a.M;
                case "q":
                case "quartile":
                    return a.Q;
                case "h":
                case "high":
                    return a.H;
                default:
                    throw new Error("Unknown EC Level: " + d)
            }
        }
        a.isValid = function(r) {
            return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4
        }, a.from = function(r, e) {
            if (a.isValid(r)) return r;
            try {
                return o(r)
            } catch {
                return e
            }
        }
    })),
    Le = B(((a, o) => {
        function d() {
            this.buffer = [], this.length = 0
        }
        d.prototype = {
            get: function(r) {
                const e = Math.floor(r / 8);
                return (this.buffer[e] >>> 7 - r % 8 & 1) === 1
            },
            put: function(r, e) {
                for (let t = 0; t < e; t++) this.putBit((r >>> e - t - 1 & 1) === 1)
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(r) {
                const e = Math.floor(this.length / 8);
                this.buffer.length <= e && this.buffer.push(0), r && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
            }
        }, o.exports = d
    })),
    ze = B(((a, o) => {
        function d(r) {
            if (!r || r < 1) throw new Error("BitMatrix size must be defined and greater than 0");
            this.size = r, this.data = new Uint8Array(r * r), this.reservedBit = new Uint8Array(r * r)
        }
        d.prototype.set = function(r, e, t, s) {
            const i = r * this.size + e;
            this.data[i] = t, s && (this.reservedBit[i] = !0)
        }, d.prototype.get = function(r, e) {
            return this.data[r * this.size + e]
        }, d.prototype.xor = function(r, e, t) {
            this.data[r * this.size + e] ^= t
        }, d.prototype.isReserved = function(r, e) {
            return this.reservedBit[r * this.size + e]
        }, o.exports = d
    })),
    qe = B((a => {
        var o = O().getSymbolSize;
        a.getRowColCoords = function(r) {
            if (r === 1) return [];
            const e = Math.floor(r / 7) + 2,
                t = o(r),
                s = t === 145 ? 26 : Math.ceil((t - 13) / (2 * e - 2)) * 2,
                i = [t - 7];
            for (let l = 1; l < e - 1; l++) i[l] = i[l - 1] - s;
            return i.push(6), i.reverse()
        }, a.getPositions = function(r) {
            const e = [],
                t = a.getRowColCoords(r),
                s = t.length;
            for (let i = 0; i < s; i++)
                for (let l = 0; l < s; l++) i === 0 && l === 0 || i === 0 && l === s - 1 || i === s - 1 && l === 0 || e.push([t[i], t[l]]);
            return e
        }
    })),
    Ue = B((a => {
        var o = O().getSymbolSize,
            d = 7;
        a.getPositions = function(e) {
            const t = o(e);
            return [
                [0, 0],
                [t - d, 0],
                [0, t - d]
            ]
        }
    })),
    Fe = B((a => {
        a.Patterns = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7
        };
        var o = {
            N1: 3,
            N2: 3,
            N3: 40,
            N4: 10
        };
        a.isValid = function(e) {
            return e != null && e !== "" && !isNaN(e) && e >= 0 && e <= 7
        }, a.from = function(e) {
            return a.isValid(e) ? parseInt(e, 10) : void 0
        }, a.getPenaltyN1 = function(e) {
            const t = e.size;
            let s = 0,
                i = 0,
                l = 0,
                c = null,
                f = null;
            for (let T = 0; T < t; T++) {
                i = l = 0, c = f = null;
                for (let b = 0; b < t; b++) {
                    let m = e.get(T, b);
                    m === c ? i++ : (i >= 5 && (s += o.N1 + (i - 5)), c = m, i = 1), m = e.get(b, T), m === f ? l++ : (l >= 5 && (s += o.N1 + (l - 5)), f = m, l = 1)
                }
                i >= 5 && (s += o.N1 + (i - 5)), l >= 5 && (s += o.N1 + (l - 5))
            }
            return s
        }, a.getPenaltyN2 = function(e) {
            const t = e.size;
            let s = 0;
            for (let i = 0; i < t - 1; i++)
                for (let l = 0; l < t - 1; l++) {
                    const c = e.get(i, l) + e.get(i, l + 1) + e.get(i + 1, l) + e.get(i + 1, l + 1);
                    (c === 4 || c === 0) && s++
                }
            return s * o.N2
        }, a.getPenaltyN3 = function(e) {
            const t = e.size;
            let s = 0,
                i = 0,
                l = 0;
            for (let c = 0; c < t; c++) {
                i = l = 0;
                for (let f = 0; f < t; f++) i = i << 1 & 2047 | e.get(c, f), f >= 10 && (i === 1488 || i === 93) && s++, l = l << 1 & 2047 | e.get(f, c), f >= 10 && (l === 1488 || l === 93) && s++
            }
            return s * o.N3
        }, a.getPenaltyN4 = function(e) {
            let t = 0;
            const s = e.data.length;
            for (let i = 0; i < s; i++) t += e.data[i];
            return Math.abs(Math.ceil(t * 100 / s / 5) - 10) * o.N4
        };

        function d(r, e, t) {
            switch (r) {
                case a.Patterns.PATTERN000:
                    return (e + t) % 2 === 0;
                case a.Patterns.PATTERN001:
                    return e % 2 === 0;
                case a.Patterns.PATTERN010:
                    return t % 3 === 0;
                case a.Patterns.PATTERN011:
                    return (e + t) % 3 === 0;
                case a.Patterns.PATTERN100:
                    return (Math.floor(e / 2) + Math.floor(t / 3)) % 2 === 0;
                case a.Patterns.PATTERN101:
                    return e * t % 2 + e * t % 3 === 0;
                case a.Patterns.PATTERN110:
                    return (e * t % 2 + e * t % 3) % 2 === 0;
                case a.Patterns.PATTERN111:
                    return (e * t % 3 + (e + t) % 2) % 2 === 0;
                default:
                    throw new Error("bad maskPattern:" + r)
            }
        }
        a.applyMask = function(e, t) {
            const s = t.size;
            for (let i = 0; i < s; i++)
                for (let l = 0; l < s; l++) t.isReserved(l, i) || t.xor(l, i, d(e, l, i))
        }, a.getBestMask = function(e, t) {
            const s = Object.keys(a.Patterns).length;
            let i = 0,
                l = 1 / 0;
            for (let c = 0; c < s; c++) {
                t(c), a.applyMask(c, e);
                const f = a.getPenaltyN1(e) + a.getPenaltyN2(e) + a.getPenaltyN3(e) + a.getPenaltyN4(e);
                a.applyMask(c, e), f < l && (l = f, i = c)
            }
            return i
        }
    })),
    ue = B((a => {
        var o = oe(),
            d = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81],
            r = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
        a.getBlocksCount = function(t, s) {
            switch (s) {
                case o.L:
                    return d[(t - 1) * 4 + 0];
                case o.M:
                    return d[(t - 1) * 4 + 1];
                case o.Q:
                    return d[(t - 1) * 4 + 2];
                case o.H:
                    return d[(t - 1) * 4 + 3];
                default:
                    return
            }
        }, a.getTotalCodewordsCount = function(t, s) {
            switch (s) {
                case o.L:
                    return r[(t - 1) * 4 + 0];
                case o.M:
                    return r[(t - 1) * 4 + 1];
                case o.Q:
                    return r[(t - 1) * 4 + 2];
                case o.H:
                    return r[(t - 1) * 4 + 3];
                default:
                    return
            }
        }
    })),
    Ke = B((a => {
        var o = new Uint8Array(512),
            d = new Uint8Array(256);
        (function() {
            let e = 1;
            for (let t = 0; t < 255; t++) o[t] = e, d[e] = t, e <<= 1, e & 256 && (e ^= 285);
            for (let t = 255; t < 512; t++) o[t] = o[t - 255]
        })(), a.log = function(e) {
            if (e < 1) throw new Error("log(" + e + ")");
            return d[e]
        }, a.exp = function(e) {
            return o[e]
        }, a.mul = function(e, t) {
            return e === 0 || t === 0 ? 0 : o[d[e] + d[t]]
        }
    })),
    Ve = B((a => {
        var o = Ke();
        a.mul = function(r, e) {
            const t = new Uint8Array(r.length + e.length - 1);
            for (let s = 0; s < r.length; s++)
                for (let i = 0; i < e.length; i++) t[s + i] ^= o.mul(r[s], e[i]);
            return t
        }, a.mod = function(r, e) {
            let t = new Uint8Array(r);
            for (; t.length - e.length >= 0;) {
                const s = t[0];
                for (let l = 0; l < e.length; l++) t[l] ^= o.mul(e[l], s);
                let i = 0;
                for (; i < t.length && t[i] === 0;) i++;
                t = t.slice(i)
            }
            return t
        }, a.generateECPolynomial = function(r) {
            let e = new Uint8Array([1]);
            for (let t = 0; t < r; t++) e = a.mul(e, new Uint8Array([1, o.exp(t)]));
            return e
        }
    })),
    Oe = B(((a, o) => {
        var d = Ve();

        function r(e) {
            this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree)
        }
        r.prototype.initialize = function(t) {
            this.degree = t, this.genPoly = d.generateECPolynomial(this.degree)
        }, r.prototype.encode = function(t) {
            if (!this.genPoly) throw new Error("Encoder not initialized");
            const s = new Uint8Array(t.length + this.degree);
            s.set(t);
            const i = d.mod(s, this.genPoly),
                l = this.degree - i.length;
            if (l > 0) {
                const c = new Uint8Array(this.degree);
                return c.set(i, l), c
            }
            return i
        }, o.exports = r
    })),
    fe = B((a => {
        a.isValid = function(d) {
            return !isNaN(d) && d >= 1 && d <= 40
        }
    })),
    ge = B((a => {
        var o = "[0-9]+",
            d = "[A-Z $%*+\\-./:]+",
            r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
        r = r.replace(/u/g, "\\u");
        var e = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + `)(?:.|[\r
]))+`;
        a.KANJI = new RegExp(r, "g"), a.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), a.BYTE = new RegExp(e, "g"), a.NUMERIC = new RegExp(o, "g"), a.ALPHANUMERIC = new RegExp(d, "g");
        var t = new RegExp("^" + r + "$"),
            s = new RegExp("^[0-9]+$"),
            i = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
        a.testKanji = function(c) {
            return t.test(c)
        }, a.testNumeric = function(c) {
            return s.test(c)
        }, a.testAlphanumeric = function(c) {
            return i.test(c)
        }
    })),
    H = B((a => {
        var o = fe(),
            d = ge();
        a.NUMERIC = {
            id: "Numeric",
            bit: 1,
            ccBits: [10, 12, 14]
        }, a.ALPHANUMERIC = {
            id: "Alphanumeric",
            bit: 2,
            ccBits: [9, 11, 13]
        }, a.BYTE = {
            id: "Byte",
            bit: 4,
            ccBits: [8, 16, 16]
        }, a.KANJI = {
            id: "Kanji",
            bit: 8,
            ccBits: [8, 10, 12]
        }, a.MIXED = {
            bit: -1
        }, a.getCharCountIndicator = function(t, s) {
            if (!t.ccBits) throw new Error("Invalid mode: " + t);
            if (!o.isValid(s)) throw new Error("Invalid version: " + s);
            return s >= 1 && s < 10 ? t.ccBits[0] : s < 27 ? t.ccBits[1] : t.ccBits[2]
        }, a.getBestModeForData = function(t) {
            return d.testNumeric(t) ? a.NUMERIC : d.testAlphanumeric(t) ? a.ALPHANUMERIC : d.testKanji(t) ? a.KANJI : a.BYTE
        }, a.toString = function(t) {
            if (t && t.id) return t.id;
            throw new Error("Invalid mode")
        }, a.isValid = function(t) {
            return t && t.bit && t.ccBits
        };

        function r(e) {
            if (typeof e != "string") throw new Error("Param is not a string");
            switch (e.toLowerCase()) {
                case "numeric":
                    return a.NUMERIC;
                case "alphanumeric":
                    return a.ALPHANUMERIC;
                case "kanji":
                    return a.KANJI;
                case "byte":
                    return a.BYTE;
                default:
                    throw new Error("Unknown mode: " + e)
            }
        }
        a.from = function(t, s) {
            if (a.isValid(t)) return t;
            try {
                return r(t)
            } catch {
                return s
            }
        }
    })),
    He = B((a => {
        var o = O(),
            d = ue(),
            r = oe(),
            e = H(),
            t = fe(),
            s = 7973,
            i = o.getBCHDigit(s);

        function l(b, m, h) {
            for (let j = 1; j <= 40; j++)
                if (m <= a.getCapacity(j, h, b)) return j
        }

        function c(b, m) {
            return e.getCharCountIndicator(b, m) + 4
        }

        function f(b, m) {
            let h = 0;
            return b.forEach(function(j) {
                const S = c(j.mode, m);
                h += S + j.getBitsLength()
            }), h
        }

        function T(b, m) {
            for (let h = 1; h <= 40; h++)
                if (f(b, h) <= a.getCapacity(h, m, e.MIXED)) return h
        }
        a.from = function(m, h) {
            return t.isValid(m) ? parseInt(m, 10) : h
        }, a.getCapacity = function(m, h, j) {
            if (!t.isValid(m)) throw new Error("Invalid QR Code version");
            typeof j > "u" && (j = e.BYTE);
            const S = (o.getSymbolTotalCodewords(m) - d.getTotalCodewordsCount(m, h)) * 8;
            if (j === e.MIXED) return S;
            const u = S - c(j, m);
            switch (j) {
                case e.NUMERIC:
                    return Math.floor(u / 10 * 3);
                case e.ALPHANUMERIC:
                    return Math.floor(u / 11 * 2);
                case e.KANJI:
                    return Math.floor(u / 13);
                case e.BYTE:
                default:
                    return Math.floor(u / 8)
            }
        }, a.getBestVersionForData = function(m, h) {
            let j;
            const S = r.from(h, r.M);
            if (Array.isArray(m)) {
                if (m.length > 1) return T(m, S);
                if (m.length === 0) return 1;
                j = m[0]
            } else j = m;
            return l(j.mode, j.getLength(), S)
        }, a.getEncodedBits = function(m) {
            if (!t.isValid(m) || m < 7) throw new Error("Invalid QR Code version");
            let h = m << 12;
            for (; o.getBCHDigit(h) - i >= 0;) h ^= s << o.getBCHDigit(h) - i;
            return m << 12 | h
        }
    })),
    Je = B((a => {
        var o = O(),
            d = 1335,
            r = 21522,
            e = o.getBCHDigit(d);
        a.getEncodedBits = function(s, i) {
            const l = s.bit << 3 | i;
            let c = l << 10;
            for (; o.getBCHDigit(c) - e >= 0;) c ^= d << o.getBCHDigit(c) - e;
            return (l << 10 | c) ^ r
        }
    })),
    Qe = B(((a, o) => {
        var d = H();

        function r(e) {
            this.mode = d.NUMERIC, this.data = e.toString()
        }
        r.getBitsLength = function(t) {
            return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0)
        }, r.prototype.getLength = function() {
            return this.data.length
        }, r.prototype.getBitsLength = function() {
            return r.getBitsLength(this.data.length)
        }, r.prototype.write = function(t) {
            let s, i, l;
            for (s = 0; s + 3 <= this.data.length; s += 3) i = this.data.substr(s, 3), l = parseInt(i, 10), t.put(l, 10);
            const c = this.data.length - s;
            c > 0 && (i = this.data.substr(s), l = parseInt(i, 10), t.put(l, c * 3 + 1))
        }, o.exports = r
    })),
    Ye = B(((a, o) => {
        var d = H(),
            r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];

        function e(t) {
            this.mode = d.ALPHANUMERIC, this.data = t
        }
        e.getBitsLength = function(s) {
            return 11 * Math.floor(s / 2) + 6 * (s % 2)
        }, e.prototype.getLength = function() {
            return this.data.length
        }, e.prototype.getBitsLength = function() {
            return e.getBitsLength(this.data.length)
        }, e.prototype.write = function(s) {
            let i;
            for (i = 0; i + 2 <= this.data.length; i += 2) {
                let l = r.indexOf(this.data[i]) * 45;
                l += r.indexOf(this.data[i + 1]), s.put(l, 11)
            }
            this.data.length % 2 && s.put(r.indexOf(this.data[i]), 6)
        }, o.exports = e
    })),
    Ge = B(((a, o) => {
        var d = H();

        function r(e) {
            this.mode = d.BYTE, typeof e == "string" ? this.data = new TextEncoder().encode(e) : this.data = new Uint8Array(e)
        }
        r.getBitsLength = function(t) {
            return t * 8
        }, r.prototype.getLength = function() {
            return this.data.length
        }, r.prototype.getBitsLength = function() {
            return r.getBitsLength(this.data.length)
        }, r.prototype.write = function(e) {
            for (let t = 0, s = this.data.length; t < s; t++) e.put(this.data[t], 8)
        }, o.exports = r
    })),
    Xe = B(((a, o) => {
        var d = H(),
            r = O();

        function e(t) {
            this.mode = d.KANJI, this.data = t
        }
        e.getBitsLength = function(s) {
            return s * 13
        }, e.prototype.getLength = function() {
            return this.data.length
        }, e.prototype.getBitsLength = function() {
            return e.getBitsLength(this.data.length)
        }, e.prototype.write = function(t) {
            let s;
            for (s = 0; s < this.data.length; s++) {
                let i = r.toSJIS(this.data[s]);
                if (i >= 33088 && i <= 40956) i -= 33088;
                else if (i >= 57408 && i <= 60351) i -= 49472;
                else throw new Error("Invalid SJIS character: " + this.data[s] + `
Make sure your charset is UTF-8`);
                i = (i >>> 8 & 255) * 192 + (i & 255), t.put(i, 13)
            }
        }, o.exports = e
    })),
    Ze = B(((a, o) => {
        var d = {
            single_source_shortest_paths: function(r, e, t) {
                var s = {},
                    i = {};
                i[e] = 0;
                var l = d.PriorityQueue.make();
                l.push(e, 0);
                for (var c, f, T, b, m, h, j, S, u; !l.empty();) {
                    c = l.pop(), f = c.value, b = c.cost, m = r[f] || {};
                    for (T in m) m.hasOwnProperty(T) && (h = m[T], j = b + h, S = i[T], u = typeof i[T] > "u", (u || S > j) && (i[T] = j, l.push(T, j), s[T] = f))
                }
                if (typeof t < "u" && typeof i[t] > "u") {
                    var A = ["Could not find a path from ", e, " to ", t, "."].join("");
                    throw new Error(A)
                }
                return s
            },
            extract_shortest_path_from_predecessor_list: function(r, e) {
                for (var t = [], s = e; s;) t.push(s), r[s], s = r[s];
                return t.reverse(), t
            },
            find_path: function(r, e, t) {
                var s = d.single_source_shortest_paths(r, e, t);
                return d.extract_shortest_path_from_predecessor_list(s, t)
            },
            PriorityQueue: {
                make: function(r) {
                    var e = d.PriorityQueue,
                        t = {},
                        s;
                    r = r || {};
                    for (s in e) e.hasOwnProperty(s) && (t[s] = e[s]);
                    return t.queue = [], t.sorter = r.sorter || e.default_sorter, t
                },
                default_sorter: function(r, e) {
                    return r.cost - e.cost
                },
                push: function(r, e) {
                    var t = {
                        value: r,
                        cost: e
                    };
                    this.queue.push(t), this.queue.sort(this.sorter)
                },
                pop: function() {
                    return this.queue.shift()
                },
                empty: function() {
                    return this.queue.length === 0
                }
            }
        };
        typeof o < "u" && (o.exports = d)
    })),
    We = B((a => {
        var o = H(),
            d = Qe(),
            r = Ye(),
            e = Ge(),
            t = Xe(),
            s = ge(),
            i = O(),
            l = Ze();

        function c(u) {
            return unescape(encodeURIComponent(u)).length
        }

        function f(u, A, C) {
            const _ = [];
            let P;
            for (;
                (P = u.exec(C)) !== null;) _.push({
                data: P[0],
                index: P.index,
                mode: A,
                length: P[0].length
            });
            return _
        }

        function T(u) {
            const A = f(s.NUMERIC, o.NUMERIC, u),
                C = f(s.ALPHANUMERIC, o.ALPHANUMERIC, u);
            let _, P;
            return i.isKanjiModeEnabled() ? (_ = f(s.BYTE, o.BYTE, u), P = f(s.KANJI, o.KANJI, u)) : (_ = f(s.BYTE_KANJI, o.BYTE, u), P = []), A.concat(C, _, P).sort(function(M, x) {
                return M.index - x.index
            }).map(function(M) {
                return {
                    data: M.data,
                    mode: M.mode,
                    length: M.length
                }
            })
        }

        function b(u, A) {
            switch (A) {
                case o.NUMERIC:
                    return d.getBitsLength(u);
                case o.ALPHANUMERIC:
                    return r.getBitsLength(u);
                case o.KANJI:
                    return t.getBitsLength(u);
                case o.BYTE:
                    return e.getBitsLength(u)
            }
        }

        function m(u) {
            return u.reduce(function(A, C) {
                const _ = A.length - 1 >= 0 ? A[A.length - 1] : null;
                return _ && _.mode === C.mode ? (A[A.length - 1].data += C.data, A) : (A.push(C), A)
            }, [])
        }

        function h(u) {
            const A = [];
            for (let C = 0; C < u.length; C++) {
                const _ = u[C];
                switch (_.mode) {
                    case o.NUMERIC:
                        A.push([_, {
                            data: _.data,
                            mode: o.ALPHANUMERIC,
                            length: _.length
                        }, {
                            data: _.data,
                            mode: o.BYTE,
                            length: _.length
                        }]);
                        break;
                    case o.ALPHANUMERIC:
                        A.push([_, {
                            data: _.data,
                            mode: o.BYTE,
                            length: _.length
                        }]);
                        break;
                    case o.KANJI:
                        A.push([_, {
                            data: _.data,
                            mode: o.BYTE,
                            length: c(_.data)
                        }]);
                        break;
                    case o.BYTE:
                        A.push([{
                            data: _.data,
                            mode: o.BYTE,
                            length: c(_.data)
                        }])
                }
            }
            return A
        }

        function j(u, A) {
            const C = {},
                _ = {
                    start: {}
                };
            let P = ["start"];
            for (let M = 0; M < u.length; M++) {
                const x = u[M],
                    E = [];
                for (let y = 0; y < x.length; y++) {
                    const g = x[y],
                        N = "" + M + y;
                    E.push(N), C[N] = {
                        node: g,
                        lastCount: 0
                    }, _[N] = {};
                    for (let p = 0; p < P.length; p++) {
                        const v = P[p];
                        C[v] && C[v].node.mode === g.mode ? (_[v][N] = b(C[v].lastCount + g.length, g.mode) - b(C[v].lastCount, g.mode), C[v].lastCount += g.length) : (C[v] && (C[v].lastCount = g.length), _[v][N] = b(g.length, g.mode) + 4 + o.getCharCountIndicator(g.mode, A))
                    }
                }
                P = E
            }
            for (let M = 0; M < P.length; M++) _[P[M]].end = 0;
            return {
                map: _,
                table: C
            }
        }

        function S(u, A) {
            let C;
            const _ = o.getBestModeForData(u);
            if (C = o.from(A, _), C !== o.BYTE && C.bit < _.bit) throw new Error('"' + u + '" cannot be encoded with mode ' + o.toString(C) + `.
 Suggested mode is: ` + o.toString(_));
            switch (C === o.KANJI && !i.isKanjiModeEnabled() && (C = o.BYTE), C) {
                case o.NUMERIC:
                    return new d(u);
                case o.ALPHANUMERIC:
                    return new r(u);
                case o.KANJI:
                    return new t(u);
                case o.BYTE:
                    return new e(u)
            }
        }
        a.fromArray = function(A) {
            return A.reduce(function(C, _) {
                return typeof _ == "string" ? C.push(S(_, null)) : _.data && C.push(S(_.data, _.mode)), C
            }, [])
        }, a.fromString = function(A, C) {
            const _ = j(h(T(A, i.isKanjiModeEnabled())), C),
                P = l.find_path(_.map, "start", "end"),
                M = [];
            for (let x = 1; x < P.length - 1; x++) M.push(_.table[P[x]].node);
            return a.fromArray(m(M))
        }, a.rawSplit = function(A) {
            return a.fromArray(T(A, i.isKanjiModeEnabled()))
        }
    })),
    et = B((a => {
        var o = O(),
            d = oe(),
            r = Le(),
            e = ze(),
            t = qe(),
            s = Ue(),
            i = Fe(),
            l = ue(),
            c = Oe(),
            f = He(),
            T = Je(),
            b = H(),
            m = We();

        function h(x, E) {
            const y = x.size,
                g = s.getPositions(E);
            for (let N = 0; N < g.length; N++) {
                const p = g[N][0],
                    v = g[N][1];
                for (let w = -1; w <= 7; w++)
                    if (!(p + w <= -1 || y <= p + w))
                        for (let I = -1; I <= 7; I++) v + I <= -1 || y <= v + I || (w >= 0 && w <= 6 && (I === 0 || I === 6) || I >= 0 && I <= 6 && (w === 0 || w === 6) || w >= 2 && w <= 4 && I >= 2 && I <= 4 ? x.set(p + w, v + I, !0, !0) : x.set(p + w, v + I, !1, !0))
            }
        }

        function j(x) {
            const E = x.size;
            for (let y = 8; y < E - 8; y++) {
                const g = y % 2 === 0;
                x.set(y, 6, g, !0), x.set(6, y, g, !0)
            }
        }

        function S(x, E) {
            const y = t.getPositions(E);
            for (let g = 0; g < y.length; g++) {
                const N = y[g][0],
                    p = y[g][1];
                for (let v = -2; v <= 2; v++)
                    for (let w = -2; w <= 2; w++) v === -2 || v === 2 || w === -2 || w === 2 || v === 0 && w === 0 ? x.set(N + v, p + w, !0, !0) : x.set(N + v, p + w, !1, !0)
            }
        }

        function u(x, E) {
            const y = x.size,
                g = f.getEncodedBits(E);
            let N, p, v;
            for (let w = 0; w < 18; w++) N = Math.floor(w / 3), p = w % 3 + y - 8 - 3, v = (g >> w & 1) === 1, x.set(N, p, v, !0), x.set(p, N, v, !0)
        }

        function A(x, E, y) {
            const g = x.size,
                N = T.getEncodedBits(E, y);
            let p, v;
            for (p = 0; p < 15; p++) v = (N >> p & 1) === 1, p < 6 ? x.set(p, 8, v, !0) : p < 8 ? x.set(p + 1, 8, v, !0) : x.set(g - 15 + p, 8, v, !0), p < 8 ? x.set(8, g - p - 1, v, !0) : p < 9 ? x.set(8, 15 - p - 1 + 1, v, !0) : x.set(8, 15 - p - 1, v, !0);
            x.set(g - 8, 8, 1, !0)
        }

        function C(x, E) {
            const y = x.size;
            let g = -1,
                N = y - 1,
                p = 7,
                v = 0;
            for (let w = y - 1; w > 0; w -= 2)
                for (w === 6 && w--;;) {
                    for (let I = 0; I < 2; I++)
                        if (!x.isReserved(N, w - I)) {
                            let D = !1;
                            v < E.length && (D = (E[v] >>> p & 1) === 1), x.set(N, w - I, D), p--, p === -1 && (v++, p = 7)
                        }
                    if (N += g, N < 0 || y <= N) {
                        N -= g, g = -g;
                        break
                    }
                }
        }

        function _(x, E, y) {
            const g = new r;
            y.forEach(function(v) {
                g.put(v.mode.bit, 4), g.put(v.getLength(), b.getCharCountIndicator(v.mode, x)), v.write(g)
            });
            const N = (o.getSymbolTotalCodewords(x) - l.getTotalCodewordsCount(x, E)) * 8;
            for (g.getLengthInBits() + 4 <= N && g.put(0, 4); g.getLengthInBits() % 8 !== 0;) g.putBit(0);
            const p = (N - g.getLengthInBits()) / 8;
            for (let v = 0; v < p; v++) g.put(v % 2 ? 17 : 236, 8);
            return P(g, x, E)
        }

        function P(x, E, y) {
            const g = o.getSymbolTotalCodewords(E),
                N = g - l.getTotalCodewordsCount(E, y),
                p = l.getBlocksCount(E, y),
                v = p - g % p,
                w = Math.floor(g / p),
                I = Math.floor(N / p),
                D = I + 1,
                K = w - I,
                ne = new c(K);
            let J = 0;
            const q = new Array(p),
                Q = new Array(p);
            let F = 0;
            const Z = new Uint8Array(x.buffer);
            for (let L = 0; L < p; L++) {
                const z = L < v ? I : D;
                q[L] = Z.slice(J, J + z), Q[L] = ne.encode(q[L]), J += z, F = Math.max(F, z)
            }
            const Y = new Uint8Array(g);
            let W = 0,
                U, k;
            for (U = 0; U < F; U++)
                for (k = 0; k < p; k++) U < q[k].length && (Y[W++] = q[k][U]);
            for (U = 0; U < K; U++)
                for (k = 0; k < p; k++) Y[W++] = Q[k][U];
            return Y
        }

        function M(x, E, y, g) {
            let N;
            if (Array.isArray(x)) N = m.fromArray(x);
            else if (typeof x == "string") {
                let I = E;
                if (!I) {
                    const D = m.rawSplit(x);
                    I = f.getBestVersionForData(D, y)
                }
                N = m.fromString(x, I || 40)
            } else throw new Error("Invalid data");
            const p = f.getBestVersionForData(N, y);
            if (!p) throw new Error("The amount of data is too big to be stored in a QR Code");
            if (!E) E = p;
            else if (E < p) throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + p + `.
`);
            const v = _(E, y, N),
                w = new e(o.getSymbolSize(E));
            return h(w, E), j(w), S(w, E), A(w, y, 0), E >= 7 && u(w, E), C(w, v), isNaN(g) && (g = i.getBestMask(w, A.bind(null, w, y))), i.applyMask(g, w), A(w, y, g), {
                modules: w,
                version: E,
                errorCorrectionLevel: y,
                maskPattern: g,
                segments: N
            }
        }
        a.create = function(E, y) {
            if (typeof E > "u" || E === "") throw new Error("No input text");
            let g = d.M,
                N, p;
            return typeof y < "u" && (g = d.from(y.errorCorrectionLevel, d.M), N = f.from(y.version), p = i.from(y.maskPattern), y.toSJISFunc && o.setToSJISFunction(y.toSJISFunc)), M(E, N, g, p)
        }
    })),
    me = B((a => {
        function o(d) {
            if (typeof d == "number" && (d = d.toString()), typeof d != "string") throw new Error("Color should be defined as hex string");
            let r = d.slice().replace("#", "").split("");
            if (r.length < 3 || r.length === 5 || r.length > 8) throw new Error("Invalid hex color: " + d);
            (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(t) {
                return [t, t]
            }))), r.length === 6 && r.push("F", "F");
            const e = parseInt(r.join(""), 16);
            return {
                r: e >> 24 & 255,
                g: e >> 16 & 255,
                b: e >> 8 & 255,
                a: e & 255,
                hex: "#" + r.slice(0, 6).join("")
            }
        }
        a.getOptions = function(r) {
            r || (r = {}), r.color || (r.color = {});
            const e = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin,
                t = r.width && r.width >= 21 ? r.width : void 0,
                s = r.scale || 4;
            return {
                width: t,
                scale: t ? 4 : s,
                margin: e,
                color: {
                    dark: o(r.color.dark || "#000000ff"),
                    light: o(r.color.light || "#ffffffff")
                },
                type: r.type,
                rendererOpts: r.rendererOpts || {}
            }
        }, a.getScale = function(r, e) {
            return e.width && e.width >= r + e.margin * 2 ? e.width / (r + e.margin * 2) : e.scale
        }, a.getImageWidth = function(r, e) {
            const t = a.getScale(r, e);
            return Math.floor((r + e.margin * 2) * t)
        }, a.qrToImageData = function(r, e, t) {
            const s = e.modules.size,
                i = e.modules.data,
                l = a.getScale(s, t),
                c = Math.floor((s + t.margin * 2) * l),
                f = t.margin * l,
                T = [t.color.light, t.color.dark];
            for (let b = 0; b < c; b++)
                for (let m = 0; m < c; m++) {
                    let h = (b * c + m) * 4,
                        j = t.color.light;
                    if (b >= f && m >= f && b < c - f && m < c - f) {
                        const S = Math.floor((b - f) / l),
                            u = Math.floor((m - f) / l);
                        j = T[i[S * s + u] ? 1 : 0]
                    }
                    r[h++] = j.r, r[h++] = j.g, r[h++] = j.b, r[h] = j.a
                }
        }
    })),
    tt = B((a => {
        var o = me();

        function d(e, t, s) {
            e.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), t.height = s, t.width = s, t.style.height = s + "px", t.style.width = s + "px"
        }

        function r() {
            try {
                return document.createElement("canvas")
            } catch {
                throw new Error("You need to specify a canvas element")
            }
        }
        a.render = function(t, s, i) {
            let l = i,
                c = s;
            typeof l > "u" && (!s || !s.getContext) && (l = s, s = void 0), s || (c = r()), l = o.getOptions(l);
            const f = o.getImageWidth(t.modules.size, l),
                T = c.getContext("2d"),
                b = T.createImageData(f, f);
            return o.qrToImageData(b.data, t, l), d(T, c, f), T.putImageData(b, 0, 0), c
        }, a.renderToDataURL = function(t, s, i) {
            let l = i;
            typeof l > "u" && (!s || !s.getContext) && (l = s, s = void 0), l || (l = {});
            const c = a.render(t, s, l),
                f = l.type || "image/png",
                T = l.rendererOpts || {};
            return c.toDataURL(f, T.quality)
        }
    })),
    rt = B((a => {
        var o = me();

        function d(t, s) {
            const i = t.a / 255,
                l = s + '="' + t.hex + '"';
            return i < 1 ? l + " " + s + '-opacity="' + i.toFixed(2).slice(1) + '"' : l
        }

        function r(t, s, i) {
            let l = t + s;
            return typeof i < "u" && (l += " " + i), l
        }

        function e(t, s, i) {
            let l = "",
                c = 0,
                f = !1,
                T = 0;
            for (let b = 0; b < t.length; b++) {
                const m = Math.floor(b % s),
                    h = Math.floor(b / s);
                !m && !f && (f = !0), t[b] ? (T++, b > 0 && m > 0 && t[b - 1] || (l += f ? r("M", m + i, .5 + h + i) : r("m", c, 0), c = 0, f = !1), m + 1 < s && t[b + 1] || (l += r("h", T), T = 0)) : c++
            }
            return l
        }
        a.render = function(s, i, l) {
            const c = o.getOptions(i),
                f = s.modules.size,
                T = s.modules.data,
                b = f + c.margin * 2,
                m = c.color.light.a ? "<path " + d(c.color.light, "fill") + ' d="M0 0h' + b + "v" + b + 'H0z"/>' : "",
                h = "<path " + d(c.color.dark, "stroke") + ' d="' + e(T, f, c.margin) + '"/>',
                j = 'viewBox="0 0 ' + b + " " + b + '"',
                S = '<svg xmlns="http://www.w3.org/2000/svg" ' + (c.width ? 'width="' + c.width + '" height="' + c.width + '" ' : "") + j + ' shape-rendering="crispEdges">' + m + h + `</svg>
`;
            return typeof l == "function" && l(null, S), S
        }
    })),
    nt = B((a => {
        var o = De(),
            d = et(),
            r = tt(),
            e = rt();

        function t(s, i, l, c, f) {
            const T = [].slice.call(arguments, 1),
                b = T.length,
                m = typeof T[b - 1] == "function";
            if (!m && !o()) throw new Error("Callback required as last argument");
            if (m) {
                if (b < 2) throw new Error("Too few arguments provided");
                b === 2 ? (f = l, l = i, i = c = void 0) : b === 3 && (i.getContext && typeof f > "u" ? (f = c, c = void 0) : (f = c, c = l, l = i, i = void 0))
            } else {
                if (b < 1) throw new Error("Too few arguments provided");
                return b === 1 ? (l = i, i = c = void 0) : b === 2 && !i.getContext && (c = l, l = i, i = void 0), new Promise(function(h, j) {
                    try {
                        h(s(d.create(l, c), i, c))
                    } catch (S) {
                        j(S)
                    }
                })
            }
            try {
                const h = d.create(l, c);
                f(null, s(h, i, c))
            } catch (h) {
                f(h)
            }
        }
        a.create = d.create, a.toCanvas = t.bind(null, r.render), a.toDataURL = t.bind(null, r.renderToDataURL), a.toString = t.bind(null, function(s, i, l) {
            return e.render(s, l)
        })
    })),
    $ = le(ye(), 1),
    at = le(nt(), 1);
var st = "a3e82fa8-2395-44a1-9cf1-e6a5ecbb8a0f",
    it = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    ot = "/__l5e/assets-v1/a3e82fa8-2395-44a1-9cf1-e6a5ecbb8a0f/binance-pay-guide.png",
    lt = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/a3e82fa8-2395-44a1-9cf1-e6a5ecbb8a0f/binance-pay-guide.png",
    dt = "binance-pay-guide.png",
    ct = 222261,
    ut = "image/jpeg",
    ft = "2026-08-21T06:07:11Z",
    gt = {
        version: 1,
        asset_id: st,
        project_id: it,
        url: ot,
        r2_key: lt,
        original_filename: dt,
        size: ct,
        content_type: ut,
        created_at: ft
    };
var mt = "6f12b068-b0d1-4e38-94dc-db0c2775311e",
    ht = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    pt = "/__l5e/assets-v1/6f12b068-b0d1-4e38-94dc-db0c2775311e/binance-logo.png",
    bt = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/6f12b068-b0d1-4e38-94dc-db0c2775311e/binance-logo.png",
    yt = "binance-logo.png",
    vt = 5048,
    xt = "image/png",
    wt = "2026-08-21T06:15:37Z",
    _t = {
        version: 1,
        asset_id: mt,
        project_id: ht,
        url: pt,
        r2_key: bt,
        original_filename: yt,
        size: vt,
        content_type: xt,
        created_at: wt
    };
var Nt = "5f43b343-e3d3-408a-83c5-bfb379531345",
    jt = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    Ct = "/__l5e/assets-v1/5f43b343-e3d3-408a-83c5-bfb379531345/usdt-trc20-logo-v3.png",
    Et = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/5f43b343-e3d3-408a-83c5-bfb379531345/usdt-trc20-logo-v3.png",
    Tt = "usdt-trc20-logo-v3.png",
    kt = 30056,
    At = "image/png",
    It = "2026-09-03T21:31:56Z",
    Bt = {
        version: 1,
        asset_id: Nt,
        project_id: jt,
        url: Ct,
        r2_key: Et,
        original_filename: Tt,
        size: kt,
        content_type: At,
        created_at: It
    };
var St = "b52fe8eb-5778-4856-b1db-050048c33efa",
    Mt = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    Pt = "/__l5e/assets-v1/b52fe8eb-5778-4856-b1db-050048c33efa/usdt-bep20-logo-v2.png",
    Rt = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/b52fe8eb-5778-4856-b1db-050048c33efa/usdt-bep20-logo-v2.png",
    $t = "usdt-bep20-logo-v2.png",
    Dt = 29917,
    Lt = "image/png",
    zt = "2026-09-03T21:31:45Z",
    qt = {
        version: 1,
        asset_id: St,
        project_id: Mt,
        url: Pt,
        r2_key: Rt,
        original_filename: $t,
        size: Dt,
        content_type: Lt,
        created_at: zt
    };
var Ut = "06a66ea9-8e5a-4a89-9b04-7dc9b87ba4ee",
    Ft = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    Kt = "/__l5e/assets-v1/06a66ea9-8e5a-4a89-9b04-7dc9b87ba4ee/usdt-erc20-logo-v2.png",
    Vt = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/06a66ea9-8e5a-4a89-9b04-7dc9b87ba4ee/usdt-erc20-logo-v2.png",
    Ot = "usdt-erc20-logo-v2.png",
    Ht = 25563,
    Jt = "image/png",
    Qt = "2026-09-03T21:31:50Z",
    Yt = {
        version: 1,
        asset_id: Ut,
        project_id: Ft,
        url: Kt,
        r2_key: Vt,
        original_filename: Ot,
        size: Ht,
        content_type: Jt,
        created_at: Qt
    };
var Gt = "31650b0e-1dfe-4e5f-9a96-3517d1482261",
    Xt = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    Zt = "/__l5e/assets-v1/31650b0e-1dfe-4e5f-9a96-3517d1482261/easypaisa-logo.png",
    Wt = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/31650b0e-1dfe-4e5f-9a96-3517d1482261/easypaisa-logo.png",
    er = "easypaisa-logo.png",
    tr = 453080,
    rr = "image/png",
    nr = "2026-09-03T21:26:30Z",
    ar = {
        version: 1,
        asset_id: Gt,
        project_id: Xt,
        url: Zt,
        r2_key: Wt,
        original_filename: er,
        size: tr,
        content_type: rr,
        created_at: nr
    };
var sr = "c2fc8f77-10e2-40d6-bbfa-bdce10a8c5e4",
    ir = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    or = "/__l5e/assets-v1/c2fc8f77-10e2-40d6-bbfa-bdce10a8c5e4/jazzcash-logo-v3.png",
    lr = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/c2fc8f77-10e2-40d6-bbfa-bdce10a8c5e4/jazzcash-logo-v3.png",
    dr = "jazzcash-logo-v3.png",
    cr = 26456,
    ur = "image/png",
    fr = "2026-09-03T21:34:47Z",
    gr = {
        version: 1,
        asset_id: sr,
        project_id: ir,
        url: or,
        r2_key: lr,
        original_filename: dr,
        size: cr,
        content_type: ur,
        created_at: fr
    };
var mr = "b6e79fa1-af3c-4d98-832b-3fa6963b34e4",
    hr = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    pr = "/__l5e/assets-v1/b6e79fa1-af3c-4d98-832b-3fa6963b34e4/skrill-logo.png",
    br = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/b6e79fa1-af3c-4d98-832b-3fa6963b34e4/skrill-logo.png",
    yr = "skrill-logo.png",
    vr = 539296,
    xr = "image/png",
    wr = "2026-09-03T21:26:39Z",
    _r = {
        version: 1,
        asset_id: mr,
        project_id: hr,
        url: pr,
        r2_key: br,
        original_filename: yr,
        size: vr,
        content_type: xr,
        created_at: wr
    };
var Nr = "be93ffc2-ad89-4a73-8a7b-e90d4d63f038",
    jr = "15f4fb10-720c-4ed0-ac7c-fcebf71bbde5",
    Cr = "/__l5e/assets-v1/be93ffc2-ad89-4a73-8a7b-e90d4d63f038/bank-transfer-logo.png",
    Er = "a/v1/15f4fb10-720c-4ed0-ac7c-fcebf71bbde5/be93ffc2-ad89-4a73-8a7b-e90d4d63f038/bank-transfer-logo.png",
    Tr = "bank-transfer-logo.png",
    kr = 501392,
    Ar = "image/png",
    Ir = "2026-09-03T21:26:44Z",
    Br = {
        version: 1,
        asset_id: Nr,
        project_id: jr,
        url: Cr,
        r2_key: Er,
        original_filename: Tr,
        size: kr,
        content_type: Ar,
        created_at: Ir
    },
    n = be(),
    Sr = {
        binance_pay: {
            badge: "◆",
            color: "bg-yellow-500",
            category: "popular"
        },
        usdt_trc20: {
            badge: "T",
            color: "bg-emerald-500",
            category: "popular"
        },
        usdt_bep20: {
            badge: "T",
            color: "bg-yellow-500",
            category: "popular"
        },
        usdt_erc20: {
            badge: "T",
            color: "bg-indigo-500",
            category: "popular"
        }
    },
    Mr = {
        binance_pay: {
            url: _t.url,
            alt: "Binance Pay"
        },
        usdt_trc20: {
            url: Bt.url,
            alt: "USDT TRC-20"
        },
        usdt_bep20: {
            url: qt.url,
            alt: "USDT BEP-20"
        },
        usdt_erc20: {
            url: Yt.url,
            alt: "USDT ERC-20"
        },
        easypaisa: {
            url: ar.url,
            alt: "EasyPaisa"
        },
        jazzcash: {
            url: gr.url,
            alt: "JazzCash"
        },
        skrill: {
            url: _r.url,
            alt: "Skrill"
        },
        "bank-transfer": {
            url: Br.url,
            alt: "Bank Transfer"
        }
    };

function re({
    code: a,
    className: o = ""
}) {
    const d = Mr[a],
        r = Sr[a];
    return (0, n.jsx)("div", {
        className: `flex h-9 w-9 items-center justify-center rounded-full overflow-hidden text-sm font-bold text-white ${d?"":r?.color??"bg-slate-600"} ${o}`,
        children: d ? (0, n.jsx)("img", {
            src: d.url,
            alt: d.alt,
            loading: "lazy",
            className: "h-full w-full object-contain"
        }) : r ? .badge ? ? "◆"
    })
}
var Pr = [{
    id: "easypaisa",
    name: "EasyPaisa"
}, {
    id: "jazzcash",
    name: "JazzCash"
}, {
    id: "skrill",
    name: "Skrill"
}, {
    id: "bank-transfer",
    name: "Bank Transfer"
}];

function tn({
    open: a,
    onClose: o,
    source: d = "trading",
    fundedSlug: r,
    fundedPrice: e,
    fundedPromoCode: t
}) {
    const {
        isFunded: s
    } = Ie(), [i, l] = (0, $.useState)(null), c = te(Me), {
        data: f = [],
        isLoading: T,
        isError: b,
        refetch: m
    } = ke({
        queryKey: ["public-payment-methods"],
        queryFn: () => c(),
        staleTime: 6e4
    });
    return (0, $.useEffect)(() => {
        a || l(null)
    }, [a]), (0, $.useEffect)(() => {
        if (!a) return;
        const h = j => j.key === "Escape" && o();
        return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h)
    }, [a, o]), a ? (0, n.jsx)("div", {
        className: "fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm",
        onClick: o,
        children: (0, n.jsxs)("div", {
            className: "mt-8 w-full max-w-5xl rounded-2xl border border-border bg-panel shadow-2xl",
            onClick: h => h.stopPropagation(),
            children: [(0, n.jsxs)("div", {
                className: "flex items-center justify-between border-b border-border px-6 py-4",
                children: [(0, n.jsxs)("div", {
                    className: "flex items-center gap-3",
                    children: [i && (0, n.jsx)("button", {
                        onClick: () => l(null),
                        className: "flex h-8 w-8 items-center justify-center rounded-full bg-panel-2 text-muted-foreground hover:text-foreground",
                        "aria-label": "Back",
                        children: (0, n.jsx)(_e, {
                            className: "h-4 w-4"
                        })
                    }), (0, n.jsx)("h2", {
                        className: "text-xl font-semibold",
                        children: d === "funded" ? "Pay challenge fee" : "Deposit"
                    })]
                }), (0, n.jsx)("button", {
                    onClick: o,
                    className: "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-panel-2",
                    "aria-label": "Close",
                    children: (0, n.jsx)(Ee, {
                        className: "h-5 w-5"
                    })
                })]
            }), d === "trading" && s ? (0, n.jsx)("div", {
                className: "p-8",
                children: (0, n.jsxs)("div", {
                    className: "mx-auto max-w-xl rounded-xl border border-amber-500/40 bg-amber-500/10 p-6 text-center",
                    children: [(0, n.jsx)("div", {
                        className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-400",
                        children: (0, n.jsx)(ce, {
                            className: "h-6 w-6"
                        })
                    }), (0, n.jsx)("h3", {
                        className: "text-lg font-bold",
                        children: "Deposits are not available"
                    }), (0, n.jsx)("p", {
                        className: "mt-2 text-sm text-muted-foreground",
                        children: "This is a Funded Trading Account. Deposits are not available for funded accounts."
                    })]
                })
            }) : i ? (0, n.jsx)($r, {
                method: i,
                source: d,
                fundedSlug: r,
                fundedPrice: e,
                fundedPromoCode: t,
                onChange: () => l(null),
                onSuccess: o
            }) : (0, n.jsxs)("div", {
                className: "p-6",
                children: [(0, n.jsxs)("h3", {
                    className: "mb-3 text-base font-semibold",
                    children: ["Payment methods", " ", (0, n.jsxs)("span", {
                        className: "text-muted-foreground",
                        children: ["(", f.length, ")"]
                    })]
                }), T ? (0, n.jsx)("div", {
                    className: "p-6 text-center text-muted-foreground",
                    children: "Loading methods…"
                }) : b ? (0, n.jsx)("div", {
                    className: "p-6 text-center text-muted-foreground",
                    children: (0, n.jsx)("button", {
                        className: "text-primary hover:underline",
                        onClick: () => m(),
                        children: "Could not load payment methods. Try again"
                    })
                }) : f.length === 0 ? (0, n.jsx)("div", {
                    className: "p-6 text-center text-muted-foreground",
                    children: "No payment methods available yet. Please contact support."
                }) : (0, n.jsx)("div", {
                    className: "grid gap-2 sm:grid-cols-2",
                    children: f.map(h => (0, n.jsxs)("button", {
                        onClick: () => h.configured ? l(h) : X.message("This method isn't configured yet"),
                        className: `relative flex items-center justify-between rounded-lg border border-border bg-panel-2 px-3 py-3 text-left transition-colors ${h.configured?"hover:border-primary hover:bg-accent":"cursor-not-allowed opacity-60"}`,
                        children: [h.code === "binance_pay" && (0, n.jsx)("span", {
                            className: "absolute -top-2 right-3 rounded-full border border-yellow-500/40 bg-panel-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-yellow-400 shadow-sm",
                            children: "Popular"
                        }), (0, n.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [(0, n.jsx)(re, {
                                code: h.code
                            }), (0, n.jsxs)("div", {
                                children: [(0, n.jsx)("div", {
                                    className: "text-sm font-semibold",
                                    children: h.label
                                }), (0, n.jsxs)("div", {
                                    className: "text-xs text-muted-foreground",
                                    children: [h.network ? `${h.network} · ` : "", "Min. $", h.min_amount.toFixed(2)]
                                })]
                            })]
                        }), (0, n.jsx)(de, {
                            className: "h-4 w-4 text-muted-foreground"
                        })]
                    }, h.code))
                }), (0, n.jsx)("h3", {
                    className: "mb-3 mt-6 text-sm font-semibold text-muted-foreground",
                    children: "Coming soon"
                }), (0, n.jsx)("div", {
                    className: "grid gap-2 sm:grid-cols-2",
                    children: Pr.map(h => (0, n.jsx)("div", {
                        className: "flex items-center justify-between rounded-lg border border-border bg-panel-2/50 px-3 py-3 opacity-60",
                        children: (0, n.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [(0, n.jsx)(re, {
                                code: h.id
                            }), (0, n.jsxs)("div", {
                                children: [(0, n.jsx)("div", {
                                    className: "text-sm font-semibold",
                                    children: h.name
                                }), (0, n.jsx)("div", {
                                    className: "text-[10px] font-bold uppercase tracking-wider text-amber-400",
                                    children: "Coming Soon"
                                })]
                            })]
                        })
                    }, h.id))
                })]
            })]
        })
    }) : null
}
var Rr = [50, 100, 200, 500, 1e3];

function $r({
    method: a,
    source: o,
    fundedSlug: d,
    fundedPrice: r,
    fundedPromoCode: e,
    onChange: t,
    onSuccess: s
}) {
    const {
        user: i
    } = Ae(), [l, c] = (0, $.useState)(null), f = Te(), T = te(Se), b = te(Be), [m, h] = (0, $.useState)(o === "funded" ? String(r ? ? 100) : "100"), [j, S] = (0, $.useState)(!1), [u, A] = (0, $.useState)(null), [C, _] = (0, $.useState)(""), [P, M] = (0, $.useState)(!1), [x, E] = (0, $.useState)(null), [y, g] = (0, $.useState)(null), [N, p] = (0, $.useState)(""), [v, w] = (0, $.useState)(180), I = (0, $.useRef)(null), D = (0, $.useRef)(null), K = (0, $.useRef)(!1), ne = te(Pe), J = ve(), q = o === "funded" ? l : i ? .id ? ? null;
    (0, $.useEffect)(() => {
        o === "funded" && xe.auth.getUser().then(({
            data: k
        }) => c(k.user ? .id ? ? null))
    }, [o]);
    const Q = () => {
        f.invalidateQueries({
            queryKey: ["profile", q]
        }), f.invalidateQueries({
            queryKey: ["deposits", q]
        }), f.invalidateQueries({
            queryKey: ["wallet-balances", q]
        }), f.invalidateQueries({
            queryKey: ["balances", q]
        }), f.invalidateQueries({
            queryKey: ["active-balance"]
        }), f.invalidateQueries({
            queryKey: ["live-balance"]
        }), f.invalidateQueries({
            queryKey: ["hasDeposited", q]
        }), f.invalidateQueries({
            queryKey: ["my-deposit-requests"]
        }), f.invalidateQueries({
            queryKey: ["funded-my-accounts"]
        })
    };
    (0, $.useEffect)(() => {
        let k = !1;
        if (!u || u.qrCodeUrl || !u.address) {
            E(null);
            return
        }
        return at.toDataURL(u.address, {
            margin: 1,
            width: 260,
            errorCorrectionLevel: "M"
        }).then(L => {
            k || E(L)
        }).catch(() => {
            k || E(null)
        }), () => {
            k = !0
        }
    }, [u]);
    const F = Number(m) || 0,
        Z = o === "funded" ? !0 : F >= a.min_amount,
        Y = async () => {
            if (!q) return X.error("Not signed in");
            if (o === "trading" && !Z) return X.error(`Amount must be at least $${a.min_amount}`);
            S(!0);
            try {
                const k = await T({
                    data: {
                        amount: o === "funded" ? Number(r ? ? F) : F,
                        methodCode: a.code,
                        source: o,
                        fundedSlug: d,
                        promoCode: o === "funded" && e || void 0
                    }
                });
                a.code, A({
                    requestId: k.requestId,
                    expectedAmount: k.expectedAmount,
                    address: k.method.address ? ? "",
                    memo: k.method.memo,
                    expiresAt: k.expiresAt,
                    network: k.method.network,
                    label: k.method.label,
                    qrCodeUrl: k.method.qr_code_url ? ? null
                })
            } catch (k) {
                X.error(k ? .message ? ? "Failed to start checkout")
            } finally {
                S(!1)
            }
        },
        W = async () => {
            if (!u) return;
            if (C.trim().length < 6) return X.error("Enter a valid TXID / TxHash");
            K.current = !1, g("submitted"), p("Payment details received"), w(180), setTimeout(() => {
                g(R => R === "submitted" ? "processing" : R), p("Verifying your transaction on-chain…")
            }, 900);
            const k = Date.now(),
                L = 3 * 6e4;
            D.current && window.clearInterval(D.current), D.current = window.setInterval(() => {
                const R = Math.max(0, Math.ceil((L - (Date.now() - k)) / 1e3));
                w(R), R <= 0 && D.current && (window.clearInterval(D.current), D.current = null)
            }, 1e3);
            const z = () => {
                    I.current && (window.clearTimeout(I.current), I.current = null), D.current && (window.clearInterval(D.current), D.current = null)
                },
                G = async () => {
                    if (!K.current) {
                        K.current = !0, z();
                        try {
                            const R = await ne({
                                data: {
                                    requestId: u.requestId
                                }
                            });
                            if (R ? .status === "confirmed") {
                                g("success"), p(o === "funded" ? "Payment confirmed — provisioning your account" : "Deposit credited to your account!"), Q(), window.setTimeout(() => {
                                    s(), J({
                                        to: o === "funded" ? "/funded/dashboard" : "/trade"
                                    })
                                }, 3200);
                                return
                            }
                            if (R ? .status === "still_verifying") {
                                g("processing"), p("Still verifying on-chain — this network can take a while. You can close this window; we'll credit your account automatically as soon as the payment confirms, and you'll see it under Pending payments.");
                                return
                            }
                        } catch {}
                        g("failed"), p("Payment was not verified in time. If you already sent it, please contact support with your TXID — an admin can credit it manually.")
                    }
                },
                V = async () => {
                    if (!K.current) try {
                        const R = await b({
                            data: {
                                requestId: u.requestId,
                                txid: C.trim()
                            }
                        });
                        if (R.status === "confirmed") {
                            z(), g("success"), p(o === "funded" ? "Payment confirmed — provisioning your account" : "Deposit credited to your account!"), Q(), window.setTimeout(() => {
                                s(), J({
                                    to: o === "funded" ? "/funded/dashboard" : "/trade"
                                })
                            }, 3200);
                            return
                        }
                        if (R.status === "underpaid") {
                            z(), g("failed"), p("Underpaid — please contact support with your TXID.");
                            return
                        }
                        if (R.status === "wrong_address") {
                            z(), g("failed"), p("This TXID was sent to a different address.");
                            return
                        }
                        if (R.status === "expired" || R.status === "closed") {
                            await G();
                            return
                        }
                        if (Date.now() - k >= L) {
                            await G();
                            return
                        }
                        I.current = window.setTimeout(V, 2500)
                    } catch (R) {
                        z(), g("failed"), p(R ? .message ? ? "Verification failed")
                    }
                };
            V()
        };
    (0, $.useEffect)(() => () => {
        I.current && window.clearTimeout(I.current), D.current && window.clearInterval(D.current)
    }, []);
    const U = async () => {
        if (u) try {
            await navigator.clipboard.writeText(u.address), M(!0), setTimeout(() => M(!1), 1200)
        } catch {}
    };
    if (y) {
        const k = y === "submitted" ? 1 : y === "processing" ? 2 : 3,
            L = [{
                key: "submitted",
                label: "Payment submitted",
                icon: je
            }, {
                key: "processing",
                label: "Verifying on-chain",
                icon: $e
            }, {
                key: o === "funded" ? "provisioned" : "credited",
                label: o === "funded" ? "Account provisioned" : "Balance credited",
                icon: Ce
            }];
        return (0, n.jsx)("div", {
            className: "p-10",
            children: (0, n.jsxs)("div", {
                className: "mx-auto max-w-2xl",
                children: [(0, n.jsx)("div", {
                    className: "flex items-center justify-between gap-2",
                    children: L.map((z, G) => {
                        const V = G + 1,
                            R = y === "success" ? !0 : V < k,
                            ae = V === k && y !== "success" && y !== "failed",
                            he = y === "failed" && V === k,
                            pe = z.icon;
                        return (0, n.jsxs)("div", {
                            className: "flex flex-1 items-center gap-2",
                            children: [(0, n.jsx)("div", {
                                className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${he?"border-red-500 bg-red-500/10 text-red-500":R||y==="success"?"border-emerald-500 bg-emerald-500/10 text-emerald-500":ae?"border-primary bg-primary/10 text-primary":"border-border bg-panel-2 text-muted-foreground"}`,
                                children: ae ? (0, n.jsx)(ie, {
                                    className: "h-5 w-5 animate-spin"
                                }) : R || y === "success" ? (0, n.jsx)(ee, {
                                    className: "h-5 w-5"
                                }) : (0, n.jsx)(pe, {
                                    className: "h-5 w-5"
                                })
                            }), (0, n.jsxs)("div", {
                                className: "flex-1",
                                children: [(0, n.jsxs)("div", {
                                    className: `text-xs font-semibold ${R||ae||y==="success"?"text-foreground":"text-muted-foreground"}`,
                                    children: ["Step ", V]
                                }), (0, n.jsx)("div", {
                                    className: "text-[11px] text-muted-foreground",
                                    children: z.label
                                })]
                            }), G < L.length - 1 && (0, n.jsx)("div", {
                                className: `h-0.5 flex-1 ${R||y==="success"?"bg-emerald-500":"bg-border"}`
                            })]
                        }, z.key)
                    })
                }), (0, n.jsx)("div", {
                    className: "mt-10 text-center",
                    children: y === "success" ? (0, n.jsxs)(n.Fragment, {
                        children: [(0, n.jsx)("div", {
                            className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500",
                            children: (0, n.jsx)(ee, {
                                className: "h-8 w-8"
                            })
                        }), (0, n.jsx)("h3", {
                            className: "text-2xl font-bold",
                            children: "Payment successful"
                        }), (0, n.jsx)("p", {
                            className: "mt-2 text-sm text-muted-foreground",
                            children: N
                        }), (0, n.jsx)("p", {
                            className: "mt-3 text-xs text-muted-foreground",
                            children: "Redirecting you in a moment…"
                        })]
                    }) : y === "failed" ? (0, n.jsxs)(n.Fragment, {
                        children: [(0, n.jsx)("div", {
                            className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500",
                            children: (0, n.jsx)(se, {
                                className: "h-8 w-8"
                            })
                        }), (0, n.jsx)("h3", {
                            className: "text-2xl font-bold",
                            children: "Verification failed"
                        }), (0, n.jsx)("p", {
                            className: "mt-2 text-sm text-muted-foreground",
                            children: N
                        }), (0, n.jsx)("button", {
                            onClick: () => g(null),
                            className: "mt-6 inline-flex items-center gap-2 rounded-lg bg-panel-2 px-4 py-2 text-sm font-semibold hover:bg-accent",
                            children: "Try again"
                        })]
                    }) : (0, n.jsxs)(n.Fragment, {
                        children: [(0, n.jsx)("div", {
                            className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary",
                            children: (0, n.jsx)(ie, {
                                className: "h-8 w-8 animate-spin"
                            })
                        }), (0, n.jsx)("h3", {
                            className: "text-2xl font-bold",
                            children: "Processing your payment"
                        }), (0, n.jsx)("p", {
                            className: "mt-2 text-sm text-muted-foreground",
                            children: N || "Please wait — this usually takes 30–90 seconds."
                        }), (0, n.jsxs)("div", {
                            className: "mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-panel-2 px-4 py-1.5 font-mono text-lg font-bold tabular-nums",
                            children: [String(Math.floor(v / 60)).padStart(2, "0"), ":", String(v % 60).padStart(2, "0")]
                        }), (0, n.jsx)("p", {
                            className: "mt-2 text-[11px] text-muted-foreground",
                            children: "This request must be verified before the timer ends."
                        }), (0, n.jsx)("p", {
                            className: "mt-1 text-[11px] text-muted-foreground",
                            children: "Do not close this window."
                        })]
                    })
                })]
            })
        })
    }
    return u ? (0, n.jsxs)("div", {
        className: "grid gap-4 p-6 md:grid-cols-[300px_1fr]",
        children: [(0, n.jsxs)("div", {
            className: "rounded-xl bg-panel-2 p-4",
            children: [(0, n.jsxs)("div", {
                className: "mb-3 flex items-center gap-3",
                children: [(0, n.jsx)(re, {
                    code: a.code
                }), (0, n.jsx)("div", {
                    className: "font-semibold",
                    children: u.label
                })]
            }), (0, n.jsxs)("div", {
                className: "space-y-1.5 text-sm",
                children: [u.network && (0, n.jsxs)("div", {
                    className: "flex justify-between",
                    children: [(0, n.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Network:"
                    }), (0, n.jsx)("span", {
                        className: "font-semibold",
                        children: u.network
                    })]
                }), (0, n.jsxs)("div", {
                    className: "flex justify-between",
                    children: [(0, n.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Amount to send:"
                    }), (0, n.jsxs)("span", {
                        className: "font-mono font-bold",
                        children: ["$", u.expectedAmount.toFixed(2)]
                    })]
                }), (0, n.jsxs)("div", {
                    className: "flex justify-between",
                    children: [(0, n.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Expires:"
                    }), (0, n.jsx)("span", {
                        className: "text-xs",
                        children: new Date(u.expiresAt).toLocaleTimeString()
                    })]
                })]
            })]
        }), (0, n.jsxs)("div", {
            className: "space-y-4",
            children: [u.address ? (0, n.jsxs)("div", {
                className: "rounded-lg border border-primary/40 bg-primary/5 p-4",
                children: [(0, n.jsxs)("div", {
                    className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
                    children: ["Send exactly $", u.expectedAmount.toFixed(2), " to"]
                }), (0, n.jsxs)("div", {
                    className: "mt-2 flex items-start gap-2",
                    children: [(0, n.jsx)("div", {
                        className: "flex-1 break-all font-mono text-sm",
                        children: u.address
                    }), (0, n.jsx)("button", {
                        onClick: U,
                        className: "rounded bg-panel-2 px-2 py-1 text-[10px] font-semibold hover:bg-accent",
                        children: P ? (0, n.jsx)(ee, {
                            className: "h-3 w-3"
                        }) : (0, n.jsx)(Ne, {
                            className: "h-3 w-3"
                        })
                    })]
                }), u.memo && (0, n.jsxs)("div", {
                    className: "mt-2 text-xs text-amber-400",
                    children: [(0, n.jsx)("strong", {
                        children: "Memo / Tag required:"
                    }), " ", u.memo]
                })]
            }) : (0, n.jsxs)("div", {
                className: "rounded-lg border border-primary/40 bg-primary/5 p-4 text-center",
                children: [(0, n.jsx)("div", {
                    className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
                    children: "Send exactly"
                }), (0, n.jsxs)("div", {
                    className: "mt-1 font-mono text-2xl font-bold",
                    children: ["$", u.expectedAmount.toFixed(2)]
                }), (0, n.jsxs)("div", {
                    className: "mt-1 text-xs text-muted-foreground",
                    children: ["Open your ", u.label, " app and scan the QR code below to pay."]
                })]
            }), (u.qrCodeUrl || x) && (0, n.jsxs)("div", {
                className: `flex ${u.address?"items-center":"flex-col items-center"} gap-4 rounded-lg border border-border bg-panel-2 p-4`,
                children: [(0, n.jsx)("img", {
                    src: u.qrCodeUrl || x || "",
                    alt: "Deposit QR code",
                    className: `${u.address?"h-32 w-32":"h-56 w-56"} rounded-md border border-border bg-white object-contain p-1`
                }), (0, n.jsxs)("div", {
                    className: "space-y-1 text-xs",
                    children: [(0, n.jsx)("div", {
                        className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
                        children: "Scan to pay"
                    }), (0, n.jsxs)("div", {
                        children: ["Open your wallet or the ", u.label, " app and scan this code to auto-fill the address."]
                    }), u.memo && (0, n.jsx)("div", {
                        className: "text-amber-400",
                        children: "Don't forget the memo/tag above."
                    })]
                })]
            }), (0, n.jsxs)("div", {
                className: "flex flex-col gap-3 rounded-lg bg-amber-500/10 px-4 py-3 text-xs",
                children: [(0, n.jsxs)("div", {
                    className: "flex items-start gap-2",
                    children: [(0, n.jsx)(se, {
                        className: "mt-0.5 h-4 w-4 shrink-0 text-amber-500"
                    }), (0, n.jsxs)("div", {
                        children: ["After sending, paste your ", (0, n.jsx)("strong", {
                            children: "TXID / TxHash / Order ID"
                        }), " below. We'll verify it on-chain and credit your account automatically."]
                    })]
                }), (0, n.jsxs)("div", {
                    className: "flex items-start gap-2 border-t border-amber-500/20 pt-2 text-amber-500",
                    children: [(0, n.jsx)(ce, {
                        className: "h-4 w-4 shrink-0"
                    }), (0, n.jsx)("div", {
                        className: "font-bold uppercase tracking-tight",
                        children: "Attention: Pasting the Transaction ID (TXID) or Binance Pay Order ID is mandatory. Without it, your payment cannot be verified."
                    })]
                })]
            }), (0, n.jsxs)("div", {
                children: [(0, n.jsx)("label", {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "TXID / TxHash / Order ID (Required)"
                }), (0, n.jsx)("input", {
                    value: C,
                    onChange: k => _(k.target.value),
                    placeholder: "Paste your Transaction ID / Order ID here",
                    className: "mt-1 w-full rounded-md border border-border bg-panel-2 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
                })]
            }), (0, n.jsxs)("button", {
                onClick: W,
                disabled: C.trim().length < 6,
                className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-base font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
                children: [(0, n.jsx)(ee, {
                    className: "h-4 w-4"
                }), "Verify Payment"]
            }), (0, n.jsx)("p", {
                className: "text-center text-[11px] text-muted-foreground",
                children: "You can close this window — we'll keep checking your TXID in the background."
            }), a.code === "binance_pay" && (0, n.jsx)("div", {
                className: "overflow-hidden rounded-lg border border-border bg-panel-2",
                children: (0, n.jsx)("img", {
                    src: gt.url,
                    alt: "Okay Broker Binance Pay deposit guide — follow the steps carefully",
                    className: "w-full",
                    loading: "lazy"
                })
            })]
        })]
    }) : (0, n.jsxs)("div", {
        className: "grid gap-4 p-6 md:grid-cols-[280px_1fr]",
        children: [(0, n.jsxs)("div", {
            className: "rounded-xl bg-panel-2 p-4",
            children: [(0, n.jsxs)("div", {
                className: "mb-4 flex items-center gap-3",
                children: [(0, n.jsx)(re, {
                    code: a.code
                }), (0, n.jsx)("div", {
                    className: "font-semibold",
                    children: a.label
                })]
            }), (0, n.jsxs)("div", {
                className: "space-y-1.5 text-sm",
                children: [(0, n.jsxs)("div", {
                    className: "flex justify-between",
                    children: [(0, n.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Min amount:"
                    }), (0, n.jsxs)("span", {
                        className: "font-semibold",
                        children: ["$", a.min_amount.toFixed(2)]
                    })]
                }), a.network && (0, n.jsxs)("div", {
                    className: "flex justify-between",
                    children: [(0, n.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Network:"
                    }), (0, n.jsx)("span", {
                        className: "font-semibold",
                        children: a.network
                    })]
                }), a.coin && (0, n.jsxs)("div", {
                    className: "flex justify-between",
                    children: [(0, n.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Coin:"
                    }), (0, n.jsx)("span", {
                        className: "font-semibold",
                        children: a.coin
                    })]
                })]
            }), (0, n.jsx)("button", {
                onClick: t,
                className: "mt-4 text-sm font-semibold text-primary hover:underline",
                children: "‹ Change method"
            })]
        }), (0, n.jsxs)("div", {
            className: "space-y-4",
            children: [o === "funded" ? (0, n.jsxs)("div", {
                className: "rounded-lg border border-border bg-panel-2 px-4 py-3",
                children: [(0, n.jsx)("label", {
                    className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                    children: "Challenge fee"
                }), (0, n.jsxs)("div", {
                    className: "mt-1 text-2xl font-bold",
                    children: ["$", Number(r ? ? F).toFixed(2)]
                })]
            }) : (0, n.jsxs)(n.Fragment, {
                children: [(0, n.jsxs)("div", {
                    className: "rounded-lg border border-border bg-panel-2 px-4 py-3",
                    children: [(0, n.jsx)("label", {
                        className: "text-[10px] uppercase tracking-widest text-muted-foreground",
                        children: "Deposit amount"
                    }), (0, n.jsxs)("div", {
                        className: "mt-1 flex items-center justify-between gap-2",
                        children: [(0, n.jsx)("input", {
                            type: "number",
                            value: m,
                            onChange: k => h(k.target.value),
                            className: "flex-1 bg-transparent text-2xl font-bold outline-none"
                        }), (0, n.jsx)("span", {
                            className: "text-xl text-muted-foreground",
                            children: "$"
                        })]
                    })]
                }), (0, n.jsx)("div", {
                    className: "flex flex-wrap gap-2",
                    children: Rr.map(k => (0, n.jsxs)("button", {
                        onClick: () => h(String(k)),
                        className: "rounded-md bg-panel-2 px-4 py-2 text-sm font-semibold hover:bg-accent",
                        children: [k, " $"]
                    }, k))
                })]
            }), (0, n.jsxs)("div", {
                className: "flex items-start gap-2 rounded-lg bg-panel-2 px-4 py-3 text-xs text-muted-foreground",
                children: [(0, n.jsx)(se, {
                    className: "mt-0.5 h-4 w-4 shrink-0 text-primary"
                }), "You'll receive our deposit address on the next step. After sending, paste your TXID to auto-credit your account."]
            }), (0, n.jsxs)("button", {
                onClick: Y,
                disabled: !Z || j,
                className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-base font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
                children: [j ? (0, n.jsx)(ie, {
                    className: "h-4 w-4 animate-spin"
                }) : (0, n.jsx)(de, {
                    className: "h-4 w-4"
                }), j ? "Creating…" : "Continue"]
            })]
        })]
    })
}
export {
    tn as t
};