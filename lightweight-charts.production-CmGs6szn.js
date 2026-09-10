function _(t) {
    var i = t.width,
        s = t.height;
    if (i < 0) throw new Error("Negative width is not allowed for Size");
    if (s < 0) throw new Error("Negative height is not allowed for Size");
    return {
        width: i,
        height: s
    }
}

function Z(t, i) {
    return t.width === i.width && t.height === i.height
}
var ee = (function() {
    function t(i) {
        var s = this;
        this._resolutionListener = function() {
            return s._onResolutionChanged()
        }, this._resolutionMediaQueryList = null, this._observers = [], this._window = i, this._installResolutionListener()
    }
    return t.prototype.dispose = function() {
        this._uninstallResolutionListener(), this._window = null
    }, Object.defineProperty(t.prototype, "value", {
        get: function() {
            return this._window.devicePixelRatio
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.subscribe = function(i) {
        var s = this,
            e = {
                next: i
            };
        return this._observers.push(e), {
            unsubscribe: function() {
                s._observers = s._observers.filter(function(h) {
                    return h !== e
                })
            }
        }
    }, t.prototype._installResolutionListener = function() {
        if (this._resolutionMediaQueryList !== null) throw new Error("Resolution listener is already installed");
        var i = this._window.devicePixelRatio;
        this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(i, "dppx)")), this._resolutionMediaQueryList.addListener(this._resolutionListener)
    }, t.prototype._uninstallResolutionListener = function() {
        this._resolutionMediaQueryList !== null && (this._resolutionMediaQueryList.removeListener(this._resolutionListener), this._resolutionMediaQueryList = null)
    }, t.prototype._reinstallResolutionListener = function() {
        this._uninstallResolutionListener(), this._installResolutionListener()
    }, t.prototype._onResolutionChanged = function() {
        var i = this;
        this._observers.forEach(function(s) {
            return s.next(i._window.devicePixelRatio)
        }), this._reinstallResolutionListener()
    }, t
})();

function he(t) {
    return new ee(t)
}
var ne = (function() {
    function t(i, s, e) {
        var h;
        this._canvasElement = null, this._bitmapSizeChangedListeners = [], this._suggestedBitmapSize = null, this._suggestedBitmapSizeChangedListeners = [], this._devicePixelRatioObservable = null, this._canvasElementResizeObserver = null, this._canvasElement = i, this._canvasElementClientSize = _({
            width: this._canvasElement.clientWidth,
            height: this._canvasElement.clientHeight
        }), this._transformBitmapSize = s ? ? (function(n) {
            return n
        }), this._allowResizeObserver = (h = e ? .allowResizeObserver) !== null && h !== void 0 ? h : !0, this._chooseAndInitObserver()
    }
    return t.prototype.dispose = function() {
        var i, s;
        if (this._canvasElement === null) throw new Error("Object is disposed");
        (i = this._canvasElementResizeObserver) === null || i === void 0 || i.disconnect(), this._canvasElementResizeObserver = null, (s = this._devicePixelRatioObservable) === null || s === void 0 || s.dispose(), this._devicePixelRatioObservable = null, this._suggestedBitmapSizeChangedListeners.length = 0, this._bitmapSizeChangedListeners.length = 0, this._canvasElement = null
    }, Object.defineProperty(t.prototype, "canvasElement", {
        get: function() {
            if (this._canvasElement === null) throw new Error("Object is disposed");
            return this._canvasElement
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "canvasElementClientSize", {
        get: function() {
            return this._canvasElementClientSize
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "bitmapSize", {
        get: function() {
            return _({
                width: this.canvasElement.width,
                height: this.canvasElement.height
            })
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.resizeCanvasElement = function(i) {
        this._canvasElementClientSize = _(i), this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"), this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"), this._invalidateBitmapSize()
    }, t.prototype.subscribeBitmapSizeChanged = function(i) {
        this._bitmapSizeChangedListeners.push(i)
    }, t.prototype.unsubscribeBitmapSizeChanged = function(i) {
        this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(s) {
            return s !== i
        })
    }, Object.defineProperty(t.prototype, "suggestedBitmapSize", {
        get: function() {
            return this._suggestedBitmapSize
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.subscribeSuggestedBitmapSizeChanged = function(i) {
        this._suggestedBitmapSizeChangedListeners.push(i)
    }, t.prototype.unsubscribeSuggestedBitmapSizeChanged = function(i) {
        this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(s) {
            return s !== i
        })
    }, t.prototype.applySuggestedBitmapSize = function() {
        if (this._suggestedBitmapSize !== null) {
            var i = this._suggestedBitmapSize;
            this._suggestedBitmapSize = null, this._resizeBitmap(i), this._emitSuggestedBitmapSizeChanged(i, this._suggestedBitmapSize)
        }
    }, t.prototype._resizeBitmap = function(i) {
        var s = this.bitmapSize;
        Z(s, i) || (this.canvasElement.width = i.width, this.canvasElement.height = i.height, this._emitBitmapSizeChanged(s, i))
    }, t.prototype._emitBitmapSizeChanged = function(i, s) {
        var e = this;
        this._bitmapSizeChangedListeners.forEach(function(h) {
            return h.call(e, i, s)
        })
    }, t.prototype._suggestNewBitmapSize = function(i) {
        var s = this._suggestedBitmapSize,
            e = _(this._transformBitmapSize(i, this._canvasElementClientSize)),
            h = Z(this.bitmapSize, e) ? null : e;
        s === null && h === null || s !== null && h !== null && Z(s, h) || (this._suggestedBitmapSize = h, this._emitSuggestedBitmapSizeChanged(s, h))
    }, t.prototype._emitSuggestedBitmapSizeChanged = function(i, s) {
        var e = this;
        this._suggestedBitmapSizeChangedListeners.forEach(function(h) {
            return h.call(e, i, s)
        })
    }, t.prototype._chooseAndInitObserver = function() {
        var i = this;
        if (!this._allowResizeObserver) {
            this._initDevicePixelRatioObservable();
            return
        }
        oe().then(function(s) {
            return s ? i._initResizeObserver() : i._initDevicePixelRatioObservable()
        })
    }, t.prototype._initDevicePixelRatioObservable = function() {
        var i = this;
        if (this._canvasElement !== null) {
            var s = Ci(this._canvasElement);
            if (s === null) throw new Error("No window is associated with the canvas");
            this._devicePixelRatioObservable = he(s), this._devicePixelRatioObservable.subscribe(function() {
                return i._invalidateBitmapSize()
            }), this._invalidateBitmapSize()
        }
    }, t.prototype._invalidateBitmapSize = function() {
        var i, s;
        if (this._canvasElement !== null) {
            var e = Ci(this._canvasElement);
            if (e !== null) {
                var h = (s = (i = this._devicePixelRatioObservable) === null || i === void 0 ? void 0 : i.value) !== null && s !== void 0 ? s : e.devicePixelRatio,
                    n = this._canvasElement.getClientRects(),
                    r = n[0] !== void 0 ? le(n[0], h) : _({
                        width: this._canvasElementClientSize.width * h,
                        height: this._canvasElementClientSize.height * h
                    });
                this._suggestNewBitmapSize(r)
            }
        }
    }, t.prototype._initResizeObserver = function() {
        var i = this;
        this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(s) {
            var e = s.find(function(r) {
                return r.target === i._canvasElement
            });
            if (!(!e || !e.devicePixelContentBoxSize || !e.devicePixelContentBoxSize[0])) {
                var h = e.devicePixelContentBoxSize[0],
                    n = _({
                        width: h.inlineSize,
                        height: h.blockSize
                    });
                i._suggestNewBitmapSize(n)
            }
        }), this._canvasElementResizeObserver.observe(this._canvasElement, {
            box: "device-pixel-content-box"
        }))
    }, t
})();

function re(t, i) {
    if (i.type === "device-pixel-content-box") return new ne(t, i.transform, i.options);
    throw new Error("Unsupported binding target")
}

function Ci(t) {
    return t.ownerDocument.defaultView
}

function oe() {
    return new Promise(function(t) {
        var i = new ResizeObserver(function(s) {
            t(s.every(function(e) {
                return "devicePixelContentBoxSize" in e
            })), i.disconnect()
        });
        i.observe(document.body, {
            box: "device-pixel-content-box"
        })
    }).catch(function() {
        return !1
    })
}

function le(t, i) {
    return _({
        width: Math.round(t.left * i + t.width * i) - Math.round(t.left * i),
        height: Math.round(t.top * i + t.height * i) - Math.round(t.top * i)
    })
}
var ae = (function() {
    function t(i, s, e) {
        if (s.width === 0 || s.height === 0) throw new TypeError("Rendering target could only be created on a media with positive width and height");
        if (this._mediaSize = s, e.width === 0 || e.height === 0) throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
        this._bitmapSize = e, this._context = i
    }
    return t.prototype.useMediaCoordinateSpace = function(i) {
        try {
            return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio), i({
                context: this._context,
                mediaSize: this._mediaSize
            })
        } finally {
            this._context.restore()
        }
    }, t.prototype.useBitmapCoordinateSpace = function(i) {
        try {
            return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), i({
                context: this._context,
                mediaSize: this._mediaSize,
                bitmapSize: this._bitmapSize,
                horizontalPixelRatio: this._horizontalPixelRatio,
                verticalPixelRatio: this._verticalPixelRatio
            })
        } finally {
            this._context.restore()
        }
    }, Object.defineProperty(t.prototype, "_horizontalPixelRatio", {
        get: function() {
            return this._bitmapSize.width / this._mediaSize.width
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(t.prototype, "_verticalPixelRatio", {
        get: function() {
            return this._bitmapSize.height / this._mediaSize.height
        },
        enumerable: !1,
        configurable: !0
    }), t
})();

function A(t, i) {
    var s = t.canvasElementClientSize;
    if (s.width === 0 || s.height === 0) return null;
    var e = t.bitmapSize;
    if (e.width === 0 || e.height === 0) return null;
    var h = t.canvasElement.getContext("2d", i);
    return h === null ? null : new ae(h, s, e)
}
var zs = {
        title: "",
        visible: !0,
        hitTestTolerance: 3,
        lastValueVisible: !0,
        priceLineVisible: !0,
        priceLineSource: 0,
        priceLineWidth: 1,
        priceLineColor: "",
        priceLineStyle: 2,
        baseLineVisible: !0,
        baseLineWidth: 1,
        baseLineColor: "#B2B5BE",
        baseLineStyle: 0,
        priceFormat: {
            type: "price",
            precision: 2,
            minMove: .01
        }
    },
    Ei, Ti;

function D(t, i) {
    const s = (function(e, h) {
        switch (e) {
            case 0:
            default:
                return [];
            case 1:
                return [h, h];
            case 2:
                return [2 * h, 2 * h];
            case 3:
                return [6 * h, 6 * h];
            case 4:
                return [h, 4 * h]
        }
    })(i, t.lineWidth);
    return t.setLineDash(s), s
}

function ks(t, i, s, e) {
    t.beginPath();
    const h = t.lineWidth % 2 ? .5 : 0;
    t.moveTo(s, i + h), t.lineTo(e, i + h), t.stroke()
}

function z(t, i) {
    if (!t) throw new Error("Assertion failed" + (i ? ": " + i : ""))
}

function N(t) {
    if (t === void 0) throw new Error("Value is undefined");
    return t
}

function v(t) {
    if (t === null) throw new Error("Value is null");
    return t
}

function O(t) {
    return v(N(t))
}(function(t) {
    t[t.Simple = 0] = "Simple", t[t.WithSteps = 1] = "WithSteps", t[t.Curved = 2] = "Curved"
})(Ei || (Ei = {})), (function(t) {
    t[t.Solid = 0] = "Solid", t[t.Dotted = 1] = "Dotted", t[t.Dashed = 2] = "Dashed", t[t.LargeDashed = 3] = "LargeDashed", t[t.SparseDotted = 4] = "SparseDotted"
})(Ti || (Ti = {}));
var T = class {
    constructor() {
        this.t = []
    }
    i(t, i, s) {
        const e = {
            h: t,
            l: i,
            o: s === !0
        };
        this.t.push(e)
    }
    _(t) {
        const i = this.t.findIndex((s => t === s.h));
        i > -1 && this.t.splice(i, 1)
    }
    u(t) {
        this.t = this.t.filter((i => i.l !== t))
    }
    p(t, i, s) {
        const e = [...this.t];
        this.t = this.t.filter((h => !h.o)), e.forEach((h => h.h(t, i, s)))
    }
    v() {
        return this.t.length > 0
    }
    m() {
        this.t = []
    }
};

function P(t, ...i) {
    for (const s of i)
        for (const e in s) s[e] !== void 0 && Object.prototype.hasOwnProperty.call(s, e) && !["__proto__", "constructor", "prototype"].includes(e) && (typeof s[e] != "object" || t[e] === void 0 || Array.isArray(s[e]) ? t[e] = s[e] : P(t[e], s[e]));
    return t
}

function G(t) {
    return typeof t == "number" && isFinite(t)
}

function mt(t) {
    return typeof t == "number" && t % 1 == 0
}

function wt(t) {
    return typeof t == "string"
}

function Mt(t) {
    return typeof t == "boolean"
}

function B(t) {
    const i = t;
    if (!i || typeof i != "object") return i;
    let s, e, h;
    for (e in s = Array.isArray(i) ? [] : {}, i) i.hasOwnProperty(e) && (h = i[e], s[e] = h && typeof h == "object" ? B(h) : h);
    return s
}

function zi(t) {
    return t !== null
}

function vt(t) {
    return t === null ? void 0 : t
}
var Ns = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";

function pt(t, i, s) {
    return i === void 0 && (i = Ns), `${s=s!==void 0?`${s} `:""}${t}px ${i}`
}
var ue = class {
    constructor(t) {
        this.M = {
            S: 1,
            C: 5,
            k: NaN,
            P: "",
            T: "",
            R: "",
            D: "",
            I: 0,
            V: 0,
            B: 0,
            A: 0,
            L: 0
        }, this.O = t
    }
    N() {
        const t = this.M,
            i = this.F(),
            s = this.W();
        return t.k === i && t.T === s || (t.k = i, t.T = s, t.P = pt(i, s), t.A = 2.5 / 12 * i, t.I = t.A, t.V = i / 12 * t.C, t.B = i / 12 * t.C, t.L = 0), t.R = this.H(), t.D = this.U(), this.M
    }
    H() {
        return this.O.N().layout.textColor
    }
    U() {
        return this.O.$()
    }
    F() {
        return this.O.N().layout.fontSize
    }
    W() {
        return this.O.N().layout.fontFamily
    }
};

function $t(t) {
    return t < 0 ? 0 : t > 255 ? 255 : Math.round(t) || 0
}

function ki(t) {
    return .199 * t[0] + .687 * t[1] + .114 * t[2]
}
var ce = class {
        constructor(t, i) {
            this.j = new Map, this.q = t, i && (this.j = i)
        }
        Y(t, i) {
            if (t === "transparent") return t;
            const s = this.K(t),
                e = s[3];
            return `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i*e})`
        }
        Z(t) {
            const i = this.K(t);
            return {
                G: `rgb(${i[0]}, ${i[1]}, ${i[2]})`,
                X: ki(i) > 160 ? "black" : "white"
            }
        }
        J(t) {
            return ki(this.K(t))
        }
        tt(t, i, s) {
            const [e, h, n, r] = this.K(t), [o, l, a, u] = this.K(i), c = [$t(e + s * (o - e)), $t(h + s * (l - h)), $t(n + s * (a - n)), (d = r + s * (u - r), d <= 0 || d > 1 ? Math.min(Math.max(d, 0), 1) : Math.round(1e4 * d) / 1e4)];
            var d;
            return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`
        }
        K(t) {
            const i = this.j.get(t);
            if (i) return i;
            const s = (function(h) {
                const n = document.createElement("div");
                n.style.display = "none", document.body.appendChild(n), n.style.color = h;
                const r = window.getComputedStyle(n).color;
                return document.body.removeChild(n), r
            })(t).match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
            if (!s) {
                if (this.q.length)
                    for (const h of this.q) {
                        const n = h(t);
                        if (n) return this.j.set(t, n), n
                    }
                throw new Error(`Failed to parse color: ${t}`)
            }
            const e = [parseInt(s[1], 10), parseInt(s[2], 10), parseInt(s[3], 10), s[4] ? parseFloat(s[4]) : 1];
            return this.j.set(t, e), e
        }
    },
    Ps = class {
        constructor() {
            this.it = []
        }
        nt(t) {
            this.it = t
        }
        st(t, i, s) {
            this.it.forEach((e => {
                e.st(t, i, s)
            }))
        }
    },
    K = class {
        st(t, i, s) {
            t.useBitmapCoordinateSpace((e => this.et(e, i, s)))
        }
    },
    de = class extends K {
        constructor() {
            super(...arguments), this.rt = null
        }
        ht(t) {
            this.rt = t
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            if (this.rt === null || this.rt.lt === null) return;
            const e = this.rt.lt,
                h = this.rt,
                n = Math.max(1, Math.floor(i)) % 2 / 2,
                r = o => {
                    t.beginPath();
                    for (let l = e.to - 1; l >= e.from; --l) {
                        const a = h.ot[l],
                            u = Math.round(a._t * i) + n,
                            c = a.ut * s,
                            d = o * s + n;
                        t.moveTo(u, c), t.arc(u, c, d, 0, 2 * Math.PI)
                    }
                    t.fill()
                };
            h.ct > 0 && (t.fillStyle = h.dt, r(h.ft + h.ct)), t.fillStyle = h.vt, r(h.ft)
        }
    };

function fe() {
    return {
        ot: [{
            _t: 0,
            ut: 0,
            wt: 0,
            Mt: 0
        }],
        vt: "",
        dt: "",
        ft: 0,
        ct: 0,
        lt: null
    }
}
var me = {
        from: 0,
        to: 1
    },
    ve = class {
        constructor(t, i, s) {
            this.gt = new Ps, this.bt = [], this.St = [], this.xt = !0, this.O = t, this.Ct = i, this.yt = s, this.gt.nt(this.bt)
        }
        kt(t) {
            this.Pt(), this.xt = !0
        }
        Tt() {
            return this.xt && (this.Rt(), this.xt = !1), this.gt
        }
        Pt() {
            const t = this.yt.Dt();
            t.length !== this.bt.length && (this.St = t.map(fe), this.bt = this.St.map((i => {
                const s = new de;
                return s.ht(i), s
            })), this.gt.nt(this.bt))
        }
        Rt() {
            const t = this.Ct.N().mode === 2 || !this.Ct.It(),
                i = this.yt.Vt(),
                s = this.Ct.Bt(),
                e = this.O.Et();
            this.Pt(), i.forEach(((h, n) => {
                const r = this.St[n],
                    o = h.At(s),
                    l = h.Lt();
                !t && o !== null && h.It() && l !== null ? (r.vt = o.zt, r.ft = o.ft, r.ct = o.Ot, r.ot[0].Mt = o.Mt, r.ot[0].ut = h.Ft().Nt(o.Mt, l.Wt), r.dt = o.Ht ? ? this.O.Ut(r.ot[0].ut / h.Ft().$t()), r.ot[0].wt = s, r.ot[0]._t = e.jt(s), r.lt = me) : r.lt = null
            }))
        }
    },
    pe = class extends K {
        constructor(t) {
            super(), this.qt = t
        }
        et({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e
        }) {
            if (this.qt === null) return;
            const h = this.qt.Yt.It,
                n = this.qt.Kt.It;
            if (!h && !n) return;
            const r = Math.round(this.qt._t * s),
                o = Math.round(this.qt.ut * e);
            t.lineCap = "butt", h && r >= 0 && (t.lineWidth = Math.floor(this.qt.Yt.ct * s), t.strokeStyle = this.qt.Yt.R, t.fillStyle = this.qt.Yt.R, D(t, this.qt.Yt.Zt), (function(l, a, u, c) {
                l.beginPath();
                const d = l.lineWidth % 2 ? .5 : 0;
                l.moveTo(a + d, u), l.lineTo(a + d, c), l.stroke()
            })(t, r, 0, i.height)), n && o >= 0 && (t.lineWidth = Math.floor(this.qt.Kt.ct * e), t.strokeStyle = this.qt.Kt.R, t.fillStyle = this.qt.Kt.R, D(t, this.qt.Kt.Zt), ks(t, o, 0, i.width))
        }
    },
    ge = class {
        constructor(t, i) {
            this.xt = !0, this.Gt = {
                Yt: {
                    ct: 1,
                    Zt: 0,
                    R: "",
                    It: !1
                },
                Kt: {
                    ct: 1,
                    Zt: 0,
                    R: "",
                    It: !1
                },
                _t: 0,
                ut: 0
            }, this.Xt = new pe(this.Gt), this.Jt = t, this.yt = i
        }
        kt() {
            this.xt = !0
        }
        Tt(t) {
            return this.xt && (this.Rt(), this.xt = !1), this.Xt
        }
        Rt() {
            const t = this.Jt.It(),
                i = this.yt.Qt().N().crosshair,
                s = this.Gt;
            if (i.mode === 2) return s.Kt.It = !1, void(s.Yt.It = !1);
            s.Kt.It = t && this.Jt.ti(this.yt), s.Yt.It = t && this.Jt.ii(), s.Kt.ct = i.horzLine.width, s.Kt.Zt = i.horzLine.style, s.Kt.R = i.horzLine.color, s.Yt.ct = i.vertLine.width, s.Yt.Zt = i.vertLine.style, s.Yt.R = i.vertLine.color, s._t = this.Jt.ni(), s.ut = this.Jt.si()
        }
    };

function we(t, i, s, e, h, n) {
    t.fillRect(i + n, s, e - 2 * n, n), t.fillRect(i + n, s + h - n, e - 2 * n, n), t.fillRect(i, s, n, h), t.fillRect(i + e - n, s, n, h)
}

function Qt(t, i, s, e, h, n) {
    t.save(), t.globalCompositeOperation = "copy", t.fillStyle = n, t.fillRect(i, s, e, h), t.restore()
}

function Ni(t, i, s, e, h, n) {
    t.beginPath(), t.roundRect ? t.roundRect(i, s, e, h, n) : (t.lineTo(i + e - n[1], s), n[1] !== 0 && t.arcTo(i + e, s, i + e, s + n[1], n[1]), t.lineTo(i + e, s + h - n[2]), n[2] !== 0 && t.arcTo(i + e, s + h, i + e - n[2], s + h, n[2]), t.lineTo(i + n[3], s + h), n[3] !== 0 && t.arcTo(i, s + h, i, s + h - n[3], n[3]), t.lineTo(i, s + n[0]), n[0] !== 0 && t.arcTo(i, s, i + n[0], s, n[0]))
}

function Pi(t, i, s, e, h, n, r = 0, o = [0, 0, 0, 0], l = "") {
    if (t.save(), !r || !l || l === n) return Ni(t, i, s, e, h, o), t.fillStyle = n, t.fill(), void t.restore();
    const a = r / 2;
    var u;
    Ni(t, i + a, s + a, e - r, h - r, (u = -a, o.map((c => c === 0 ? c : c + u)))), n !== "transparent" && (t.fillStyle = n, t.fill()), l !== "transparent" && (t.lineWidth = r, t.strokeStyle = l, t.closePath(), t.stroke()), t.restore()
}

function Rs(t, i, s, e, h, n, r) {
    t.save(), t.globalCompositeOperation = "copy";
    const o = t.createLinearGradient(0, 0, 0, h);
    o.addColorStop(0, n), o.addColorStop(1, r), t.fillStyle = o, t.fillRect(i, s, e, h), t.restore()
}
var Ri = class {
        constructor(t, i) {
            this.ht(t, i)
        }
        ht(t, i) {
            this.qt = t, this.ei = i
        }
        $t(t, i) {
            return this.qt.It ? t.k + t.A + t.I : 0
        }
        st(t, i, s, e) {
            if (!this.qt.It || this.qt.ri.length === 0) return;
            const h = this.qt.R,
                n = this.ei.G,
                r = t.useBitmapCoordinateSpace((o => {
                    const l = o.context;
                    l.font = i.P;
                    const a = this.hi(o, i, s, e),
                        u = a.ai;
                    return a.li ? Pi(l, u.oi, u._i, u.ui, u.ci, n, u.di, [u.ft, 0, 0, u.ft], n) : Pi(l, u.fi, u._i, u.ui, u.ci, n, u.di, [0, u.ft, u.ft, 0], n), this.qt.pi && (l.fillStyle = h, l.fillRect(u.fi, u.mi, u.wi - u.fi, u.Mi)), this.qt.gi && (l.fillStyle = i.D, l.fillRect(a.li ? u.bi - u.di : 0, u._i, u.di, u.Si - u._i)), a
                }));
            t.useMediaCoordinateSpace((({
                context: o
            }) => {
                const l = r.xi;
                o.font = i.P, o.textAlign = r.li ? "right" : "left", o.textBaseline = "middle", o.fillStyle = h, o.fillText(this.qt.ri, l.Ci, (l._i + l.Si) / 2 + l.yi)
            }))
        }
        hi(t, i, s, e) {
            const {
                context: h,
                bitmapSize: n,
                mediaSize: r,
                horizontalPixelRatio: o,
                verticalPixelRatio: l
            } = t, a = this.qt.pi || !this.qt.ki ? i.C : 0, u = this.qt.Pi ? i.S : 0, c = i.A + this.ei.Ti, d = i.I + this.ei.Ri, f = i.V, m = i.B, p = this.qt.ri, g = i.k, w = s.Di(h, p), M = Math.ceil(s.Ii(h, p)), b = g + c + d, y = i.S + f + m + M + a, C = Math.max(1, Math.floor(l));
            let S = Math.round(b * l);
            S % 2 != C % 2 && (S += 1);
            const x = u > 0 ? Math.max(1, Math.floor(u * o)) : 0,
                E = Math.round(y * o),
                L = Math.round(a * o),
                W = this.ei.Vi ? ? this.ei.Bi ? ? this.ei.Ei,
                Q = Math.round(W * l) - Math.floor(.5 * l),
                X = Math.floor(Q + C / 2 - S / 2),
                ot = X + S,
                V = e === "right",
                bt = V ? r.width - u : u,
                $ = V ? n.width - x : x;
            let Dt, Kt, Vt;
            return V ? (Dt = $ - E, Kt = $ - L, Vt = bt - a - f - u) : (Dt = $ + E, Kt = $ + L, Vt = bt + a + f), {
                li: V,
                ai: {
                    _i: X,
                    mi: Q,
                    Si: ot,
                    ui: E,
                    ci: S,
                    ft: 2 * o,
                    di: x,
                    oi: Dt,
                    fi: $,
                    wi: Kt,
                    Mi: C,
                    bi: n.width
                },
                xi: {
                    _i: X / l,
                    Si: ot / l,
                    Ci: Vt,
                    yi: w
                }
            }
        }
    },
    Bt = class {
        constructor(t) {
            this.Ai = {
                Ei: 0,
                G: "#000",
                Ri: 0,
                Ti: 0
            }, this.Li = {
                ri: "",
                It: !1,
                pi: !0,
                ki: !1,
                Ht: "",
                R: "#FFF",
                gi: !1,
                Pi: !1
            }, this.zi = {
                ri: "",
                It: !1,
                pi: !1,
                ki: !0,
                Ht: "",
                R: "#FFF",
                gi: !0,
                Pi: !0
            }, this.xt = !0, this.Oi = new(t || Ri)(this.Li, this.Ai), this.Ni = new(t || Ri)(this.zi, this.Ai)
        }
        ri() {
            return this.Fi(), this.Li.ri
        }
        Ei() {
            return this.Fi(), this.Ai.Ei
        }
        kt() {
            this.xt = !0
        }
        $t(t, i = !1) {
            return Math.max(this.Oi.$t(t, i), this.Ni.$t(t, i))
        }
        Wi() {
            return this.Ai.Vi ? ? null
        }
        Hi() {
            return this.Ai.Vi ? ? this.Ai.Bi ? ? this.Ei()
        }
        Ui(t) {
            this.Ai.Bi = t ? ? void 0
        }
        $i() {
            return this.Fi(), this.Li.It || this.zi.It
        }
        ji() {
            return this.Fi(), this.Li.It
        }
        Tt(t) {
            return this.Fi(), this.Li.pi = this.Li.pi && t.N().ticksVisible, this.zi.pi = this.zi.pi && t.N().ticksVisible, this.Oi.ht(this.Li, this.Ai), this.Ni.ht(this.zi, this.Ai), this.Oi
        }
        qi() {
            return this.Fi(), this.Oi.ht(this.Li, this.Ai), this.Ni.ht(this.zi, this.Ai), this.Ni
        }
        Fi() {
            this.xt && (this.Li.pi = !0, this.zi.pi = !1, this.Yi(this.Li, this.zi, this.Ai))
        }
    },
    be = class extends Bt {
        constructor(t, i, s) {
            super(), this.Jt = t, this.Ki = i, this.Zi = s
        }
        Yi(t, i, s) {
            if (t.It = !1, this.Jt.N().mode === 2) return;
            const e = this.Jt.N().horzLine;
            if (!e.labelVisible) return;
            const h = this.Ki.Lt();
            if (!this.Jt.It() || this.Ki.Gi() || h === null) return;
            const n = this.Ki.Xi().Z(e.labelBackgroundColor);
            s.G = n.G, t.R = n.X;
            const r = 2 / 12 * this.Ki.k();
            s.Ti = r, s.Ri = r;
            const o = this.Zi(this.Ki);
            s.Ei = o.Ei, t.ri = this.Ki.Ji(o.Mt, h), t.It = !0
        }
    },
    Me = /[1-9]/g,
    Ls = class {
        constructor() {
            this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        st(t, i) {
            if (this.qt === null || this.qt.It === !1 || this.qt.ri.length === 0) return;
            const s = t.useMediaCoordinateSpace((({
                context: c
            }) => (c.font = i.P, Math.round(i.Qi.Ii(c, v(this.qt).ri, Me)))));
            if (s <= 0) return;
            const e = i.tn,
                h = s + 2 * e,
                n = h / 2,
                r = this.qt.nn;
            let o = this.qt.Ei,
                l = Math.floor(o - n) + .5;
            l < 0 ? (o += Math.abs(0 - l), l = Math.floor(o - n) + .5) : l + h > r && (o -= Math.abs(r - (l + h)), l = Math.floor(o - n) + .5);
            const a = l + h,
                u = Math.ceil(0 + i.S + i.C + i.A + i.k + i.I);
            t.useBitmapCoordinateSpace((({
                context: c,
                horizontalPixelRatio: d,
                verticalPixelRatio: f
            }) => {
                const m = v(this.qt);
                c.fillStyle = m.G;
                const p = Math.round(l * d),
                    g = Math.round(0 * f),
                    w = Math.round(a * d),
                    M = Math.round(u * f),
                    b = Math.round(2 * d);
                if (c.beginPath(), c.moveTo(p, g), c.lineTo(p, M - b), c.arcTo(p, M, p + b, M, b), c.lineTo(w - b, M), c.arcTo(w, M, w, M - b, b), c.lineTo(w, g), c.fill(), m.pi) {
                    const y = Math.round(m.Ei * d),
                        C = g,
                        S = Math.round((C + i.C) * f);
                    c.fillStyle = m.R;
                    const x = Math.max(1, Math.floor(d)),
                        E = Math.floor(.5 * d);
                    c.fillRect(y - E, C, x, S - C)
                }
            })), t.useMediaCoordinateSpace((({
                context: c
            }) => {
                const d = v(this.qt),
                    f = 0 + i.S + i.C + i.A + i.k / 2;
                c.font = i.P, c.textAlign = "left", c.textBaseline = "middle", c.fillStyle = d.R;
                const m = i.Qi.Di(c, "Apr0");
                c.translate(l + e, f + m), c.fillText(d.ri, 0, 0)
            }))
        }
    },
    ye = class {
        constructor(t, i, s) {
            this.xt = !0, this.Xt = new Ls, this.Gt = {
                It: !1,
                G: "#4c525e",
                R: "white",
                ri: "",
                nn: 0,
                Ei: NaN,
                pi: !0
            }, this.Ct = t, this.sn = i, this.Zi = s
        }
        kt() {
            this.xt = !0
        }
        Tt() {
            return this.xt && (this.Rt(), this.xt = !1), this.Xt.ht(this.Gt), this.Xt
        }
        Rt() {
            const t = this.Gt;
            if (t.It = !1, this.Ct.N().mode === 2) return;
            const i = this.Ct.N().vertLine;
            if (!i.labelVisible) return;
            const s = this.sn.Et();
            if (s.Gi()) return;
            t.nn = s.nn();
            const e = this.Zi();
            if (e === null) return;
            t.Ei = e.Ei;
            const h = s.en(this.Ct.Bt());
            t.ri = s.rn(v(h)), t.It = !0;
            const n = this.sn.Xi().Z(i.labelBackgroundColor);
            t.G = n.G, t.R = n.X, t.pi = s.N().ticksVisible
        }
    },
    Is = class {
        constructor() {
            this.hn = null, this.an = 0
        }
        ln() {
            return this.an
        }
        _n(t) {
            this.an = t
        }
        Ft() {
            return this.hn
        }
        un(t) {
            this.hn = t
        }
        cn(t) {
            return []
        }
        dn() {
            return []
        }
        It() {
            return !0
        }
    },
    Li;
(function(t) {
    t[t.Normal = 0] = "Normal", t[t.Magnet = 1] = "Magnet", t[t.Hidden = 2] = "Hidden", t[t.MagnetOHLC = 3] = "MagnetOHLC"
})(Li || (Li = {}));
var Se = class extends Is {
    constructor(t, i) {
        super(), this.yt = null, this.fn = NaN, this.pn = 0, this.vn = !1, this.mn = new Map, this.wn = !1, this.Mn = new WeakMap, this.gn = new WeakMap, this.bn = NaN, this.Sn = NaN, this.xn = NaN, this.Cn = NaN, this.sn = t, this.yn = i, this.kn = ((e, h) => n => {
            const r = h(),
                o = e();
            if (n === v(this.yt).Pn()) return {
                Mt: o,
                Ei: r
            }; {
                const l = v(n.Lt());
                return {
                    Mt: n.Tn(r, l),
                    Ei: r
                }
            }
        })((() => this.fn), (() => this.Sn));
        const s = ((e, h) => () => {
            const n = this.sn.Et().Rn(e()),
                r = h();
            return n && Number.isFinite(r) ? {
                wt: n,
                Ei: r
            } : null
        })((() => this.pn), (() => this.ni()));
        this.Dn = new ye(this, t, s)
    }
    N() {
        return this.yn
    }
    In(t, i) {
        this.xn = t, this.Cn = i
    }
    Vn() {
        this.xn = NaN, this.Cn = NaN
    }
    Bn() {
        return this.xn
    }
    En() {
        return this.Cn
    }
    An(t, i, s) {
        this.wn || (this.wn = !0), this.vn = !0, this.Ln(t, i, s)
    }
    Bt() {
        return this.pn
    }
    ni() {
        return this.bn
    }
    si() {
        return this.Sn
    }
    It() {
        return this.vn
    }
    zn() {
        this.vn = !1, this.On(), this.fn = NaN, this.bn = NaN, this.Sn = NaN, this.yt = null, this.Vn(), this.Nn()
    }
    Fn(t) {
        if (!this.yn.doNotSnapToHiddenSeriesIndices) return t;
        const i = this.sn,
            s = i.Et();
        let e = null,
            h = null;
        for (const l of i.Wn()) {
            const a = l.Un().Hn(t, -1);
            if (a) {
                if (a.$n === t) return t;
                (e === null || a.$n > e) && (e = a.$n)
            }
            const u = l.Un().Hn(t, 1);
            if (u) {
                if (u.$n === t) return t;
                (h === null || u.$n < h) && (h = u.$n)
            }
        }
        const n = [e, h].filter(zi);
        if (n.length === 0) return t;
        const r = s.jt(t),
            o = n.map((l => Math.abs(r - s.jt(l))));
        return n[o.indexOf(Math.min(...o))]
    }
    jn(t) {
        let i = this.Mn.get(t);
        i || (i = new ge(this, t), this.Mn.set(t, i));
        let s = this.gn.get(t);
        return s || (s = new ve(this.sn, this, t), this.gn.set(t, s)), [i, s]
    }
    ti(t) {
        return t === this.yt && this.yn.horzLine.visible
    }
    ii() {
        return this.yn.vertLine.visible
    }
    qn(t, i) {
        this.vn && this.yt === t || this.mn.clear();
        const s = [];
        return this.yt === t && s.push(this.Yn(this.mn, i, this.kn)), s
    }
    dn() {
        return this.vn ? [this.Dn] : []
    }
    Kn() {
        return this.yt
    }
    Nn() {
        this.sn.Zn().forEach((t => {
            this.Mn.get(t) ? .kt(), this.gn.get(t) ? .kt()
        })), this.mn.forEach((t => t.kt())), this.Dn.kt()
    }
    Gn(t) {
        return t && !t.Pn().Gi() ? t.Pn() : null
    }
    Ln(t, i, s) {
        this.Xn(t, i, s) && this.Nn()
    }
    Xn(t, i, s) {
        const e = this.bn,
            h = this.Sn,
            n = this.fn,
            r = this.pn,
            o = this.yt,
            l = this.Gn(s);
        this.pn = t, this.bn = isNaN(t) ? NaN : this.sn.Et().jt(t), this.yt = s;
        const a = l !== null ? l.Lt() : null;
        return l !== null && a !== null ? (this.fn = i, this.Sn = l.Nt(i, a)) : (this.fn = NaN, this.Sn = NaN), e !== this.bn || h !== this.Sn || r !== this.pn || n !== this.fn || o !== this.yt
    }
    On() {
        const t = this.sn.Jn().map((s => s.Un().Qn())).filter(zi),
            i = t.length === 0 ? null : Math.max(...t);
        this.pn = i !== null ? i : NaN
    }
    Yn(t, i, s) {
        let e = t.get(i);
        return e === void 0 && (e = new be(this, i, s), t.set(i, e)), e
    }
};

function qt(t) {
    return t === "left" || t === "right"
}
var k = class li {
        constructor(i) {
            this.ts = new Map, this.ns = [], this.ss = i
        }
        es(i, s) {
            const e = (function(h, n) {
                return h === void 0 ? n : {
                    rs: Math.max(h.rs, n.rs),
                    hs: h.hs || n.hs
                }
            })(this.ts.get(i), s);
            this.ts.set(i, e)
        }
        ls() {
            return this.ss
        }
        _s(i) {
            const s = this.ts.get(i);
            return s === void 0 ? {
                rs: this.ss
            } : {
                rs: Math.max(this.ss, s.rs),
                hs: s.hs
            }
        }
        us() {
            this.cs(), this.ns = [{
                ds: 0
            }]
        }
        fs(i) {
            this.cs(), this.ns = [{
                ds: 1,
                Wt: i
            }]
        }
        ps(i) {
            this.vs(), this.ns.push({
                ds: 5,
                Wt: i
            })
        }
        cs() {
            this.vs(), this.ns.push({
                ds: 6
            })
        }
        ws() {
            this.cs(), this.ns = [{
                ds: 4
            }]
        }
        Ms(i) {
            this.cs(), this.ns.push({
                ds: 2,
                Wt: i
            })
        }
        gs(i) {
            this.cs(), this.ns.push({
                ds: 3,
                Wt: i
            })
        }
        bs() {
            return this.ns
        }
        Ss(i) {
            for (const s of i.ns) this.xs(s);
            this.ss = Math.max(this.ss, i.ss), i.ts.forEach(((s, e) => {
                this.es(e, s)
            }))
        }
        static Cs() {
            return new li(2)
        }
        static ys() {
            return new li(3)
        }
        xs(i) {
            switch (i.ds) {
                case 0:
                    this.us();
                    break;
                case 1:
                    this.fs(i.Wt);
                    break;
                case 2:
                    this.Ms(i.Wt);
                    break;
                case 3:
                    this.gs(i.Wt);
                    break;
                case 4:
                    this.ws();
                    break;
                case 5:
                    this.ps(i.Wt);
                    break;
                case 6:
                    this.vs()
            }
        }
        vs() {
            const i = this.ns.findIndex((s => s.ds === 5));
            i !== -1 && this.ns.splice(i, 1)
        }
    },
    Qs = class {
        formatTickmarks(t) {
            return t.map((i => this.format(i)))
        }
    },
    Ii = ".";

function q(t, i) {
    if (!G(t)) return "n/a";
    if (!mt(i)) throw new TypeError("invalid length");
    if (i < 0 || i > 16) throw new TypeError("invalid length");
    return i === 0 ? t.toString() : ("0000000000000000" + t.toString()).slice(-i)
}
var Wt = class extends Qs {
        constructor(t, i) {
            if (super(), i || (i = 1), G(t) && mt(t) || (t = 100), t < 0) throw new TypeError("invalid base");
            this.Ki = t, this.ks = i, this.Ps()
        }
        format(t) {
            const i = t < 0 ? "−" : "";
            return t = Math.abs(t), i + this.Ts(t)
        }
        Ps() {
            if (this.Rs = 0, this.Ki > 0 && this.ks > 0) {
                let t = this.Ki;
                for (; t > 1;) t /= 10, this.Rs++
            }
        }
        Ts(t) {
            const i = this.Ki / this.ks;
            let s = Math.floor(t),
                e = "";
            const h = this.Rs !== void 0 ? this.Rs : NaN;
            if (i > 1) {
                let n = +(Math.round(t * i) - s * i).toFixed(this.Rs);
                n >= i && (n -= i, s += 1), e = Ii + q(+n.toFixed(this.Rs) * this.ks, h)
            } else s = Math.round(s * i) / i, h > 0 && (e = Ii + q(0, h));
            return s.toFixed(0) + e
        }
    },
    Bs = class extends Wt {
        constructor(t = 100) {
            super(t)
        }
        format(t) {
            return `${super.format(t)}%`
        }
    },
    _e = class extends Qs {
        constructor(t) {
            super(), this.Ds = t
        }
        format(t) {
            let i = "";
            return t < 0 && (i = "-", t = -t), t < 995 ? i + this.Is(t) : t < 999995 ? i + this.Is(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), i + this.Is(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), i + this.Is(t / 1e9) + "B")
        }
        Is(t) {
            let i;
            const s = Math.pow(10, this.Ds);
            return i = (t = Math.round(t * s) / s) >= 1e-15 && t < 1 ? t.toFixed(this.Ds).replace(/\.?0+$/, "") : String(t), i.replace(/(\.[1-9]*)0+$/, ((e, h) => h))
        }
    },
    xe = /[2-9]/g,
    gt = class {
        constructor(t = 50) {
            this.Vs = 0, this.Bs = 1, this.Es = 1, this.As = {}, this.Ls = new Map, this.zs = t
        }
        Os() {
            this.Vs = 0, this.Ls.clear(), this.Bs = 1, this.Es = 1, this.As = {}
        }
        Ii(t, i, s) {
            return this.Ns(t, i, s).width
        }
        Di(t, i, s) {
            const e = this.Ns(t, i, s);
            return ((e.actualBoundingBoxAscent || 0) - (e.actualBoundingBoxDescent || 0)) / 2
        }
        Ns(t, i, s) {
            const e = s || xe,
                h = String(i).replace(e, "0");
            if (this.Ls.has(h)) return N(this.Ls.get(h)).Fs;
            if (this.Vs === this.zs) {
                const r = this.As[this.Es];
                delete this.As[this.Es], this.Ls.delete(r), this.Es++, this.Vs--
            }
            t.save(), t.textBaseline = "middle";
            const n = t.measureText(h);
            return t.restore(), n.width === 0 && i.length || (this.Ls.set(h, {
                Fs: n,
                Ws: this.Bs
            }), this.As[this.Bs] = h, this.Vs++, this.Bs++), n
        }
    },
    Ce = class {
        constructor(t) {
            this.Hs = null, this.M = null, this.Us = "right", this.$s = t
        }
        js(t, i, s) {
            this.Hs = t, this.M = i, this.Us = s
        }
        st(t) {
            this.M !== null && this.Hs !== null && this.Hs.st(t, this.M, this.$s, this.Us)
        }
    },
    qs = class {
        constructor(t, i, s) {
            this.qs = t, this.$s = new gt(50), this.Ys = i, this.O = s, this.F = -1, this.Xt = new Ce(this.$s)
        }
        Tt() {
            const t = this.O.Ks(this.Ys);
            if (t === null) return null;
            const i = t.Zs(this.Ys) ? t.Gs() : this.Ys.Ft();
            if (i === null) return null;
            const s = t.Xs(i);
            if (s === "overlay") return null;
            const e = this.O.Js();
            return e.k !== this.F && (this.F = e.k, this.$s.Os()), this.Xt.js(this.qs.qi(), e, s), this.Xt
        }
    },
    Ee = class extends K {
        constructor() {
            super(...arguments), this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        Qs(t, i) {
            if (!this.qt ? .It) return null;
            const {
                ut: s,
                ct: e,
                te: h
            } = this.qt;
            return i >= s - e - 7 && i <= s + e + 7 ? {
                ie: this.qt,
                ne: Math.abs(i - s),
                se: 2,
                ee: "price-line",
                te: h
            } : null
        }
        et({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e
        }) {
            if (this.qt === null || this.qt.It === !1) return;
            const h = Math.round(this.qt.ut * e);
            h < 0 || h > i.height || (t.lineCap = "butt", t.strokeStyle = this.qt.R, t.lineWidth = Math.floor(this.qt.ct * s), D(t, this.qt.Zt), ks(t, h, 0, i.width))
        }
    },
    gi = class {
        constructor(t) {
            this.re = {
                ut: 0,
                R: "rgba(0, 0, 0, 0)",
                ct: 1,
                Zt: 0,
                It: !1
            }, this.he = new Ee, this.xt = !0, this.ae = t, this.le = t.Qt(), this.he.ht(this.re)
        }
        kt() {
            this.xt = !0
        }
        Tt() {
            return this.ae.It() ? (this.xt && (this.oe(), this.xt = !1), this.he) : null
        }
    },
    Te = class extends gi {
        constructor(t) {
            super(t)
        }
        oe() {
            this.re.It = !1;
            const t = this.ae.Ft(),
                i = t._e()._e;
            if (i !== 2 && i !== 3) return;
            const s = this.ae.N();
            if (!s.baseLineVisible || !this.ae.It()) return;
            const e = this.ae.Lt();
            e !== null && (this.re.It = !0, this.re.ut = t.Nt(e.Wt, e.Wt), this.re.R = s.baseLineColor, this.re.ct = s.baseLineWidth, this.re.Zt = s.baseLineStyle)
        }
    },
    ze = class extends K {
        constructor() {
            super(...arguments), this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        ue() {
            return this.qt
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            const e = this.qt;
            if (e === null) return;
            const h = Math.max(1, Math.floor(i)),
                n = h % 2 / 2,
                r = Math.round(e.ce.x * i) + n,
                o = e.ce.y * s;
            t.fillStyle = e.de, t.beginPath();
            const l = Math.max(2, 1.5 * e.fe) * i;
            t.arc(r, o, l, 0, 2 * Math.PI, !1), t.fill(), t.fillStyle = e.pe, t.beginPath(), t.arc(r, o, e.ft * i, 0, 2 * Math.PI, !1), t.fill(), t.lineWidth = h, t.strokeStyle = e.ve, t.beginPath(), t.arc(r, o, e.ft * i + h / 2, 0, 2 * Math.PI, !1), t.stroke()
        }
    },
    ke = [{
        me: 0,
        we: .25,
        Me: 4,
        ge: 10,
        be: .25,
        Se: 0,
        xe: .4,
        Ce: .8
    }, {
        me: .25,
        we: .525,
        Me: 10,
        ge: 14,
        be: 0,
        Se: 0,
        xe: .8,
        Ce: 0
    }, {
        me: .525,
        we: 1,
        Me: 14,
        ge: 14,
        be: 0,
        Se: 0,
        xe: 0,
        Ce: 0
    }],
    Ne = class {
        constructor(t) {
            this.Xt = new ze, this.xt = !0, this.ye = !0, this.ke = performance.now(), this.Pe = this.ke - 1, this.Te = t
        }
        Re() {
            this.Pe = this.ke - 1, this.kt()
        }
        De() {
            if (this.kt(), this.Te.N().lastPriceAnimation === 2) {
                const t = performance.now(),
                    i = this.Pe - t;
                if (i > 0) return void(i < 650 && (this.Pe += 2600));
                this.ke = t, this.Pe = t + 2600
            }
        }
        kt() {
            this.xt = !0
        }
        Ie() {
            this.ye = !0
        }
        It() {
            return this.Te.N().lastPriceAnimation !== 0
        }
        Ve() {
            switch (this.Te.N().lastPriceAnimation) {
                case 0:
                    return !1;
                case 1:
                    return !0;
                case 2:
                    return performance.now() <= this.Pe
            }
        }
        Tt() {
            return this.xt ? (this.Rt(), this.xt = !1, this.ye = !1) : this.ye && (this.Be(), this.ye = !1), this.Xt
        }
        Rt() {
            this.Xt.ht(null);
            const t = this.Te.Qt().Et(),
                i = t.Ee(),
                s = this.Te.Lt();
            if (i === null || s === null) return;
            const e = this.Te.Ae(!0);
            if (e.Le || !i.ze(e.$n)) return;
            const h = {
                    x: t.jt(e.$n),
                    y: this.Te.Ft().Nt(e.Mt, s.Wt)
                },
                n = e.R,
                r = this.Te.N().lineWidth,
                o = this.Oe(this.Ne(), n);
            this.Xt.ht({
                de: n,
                fe: r,
                pe: o.pe,
                ve: o.ve,
                ft: o.ft,
                ce: h
            })
        }
        Be() {
            const t = this.Xt.ue();
            if (t !== null) {
                const i = this.Oe(this.Ne(), t.de);
                t.pe = i.pe, t.ve = i.ve, t.ft = i.ft
            }
        }
        Ne() {
            return this.Ve() ? performance.now() - this.ke : 2599
        }
        Fe(t, i, s, e) {
            const h = s + (e - s) * i;
            return this.Te.Qt().Xi().Y(t, h)
        }
        Oe(t, i) {
            const s = t % 2600 / 2600;
            let e;
            for (const l of ke)
                if (s >= l.me && s <= l.we) {
                    e = l;
                    break
                }
            z(e !== void 0, "Last price animation internal logic error");
            const h = (s - e.me) / (e.we - e.me);
            return {
                pe: this.Fe(i, h, e.be, e.Se),
                ve: this.Fe(i, h, e.xe, e.Ce),
                ft: (n = h, r = e.Me, o = e.ge, r + (o - r) * n)
            };
            var n, r, o
        }
    },
    Pe = class extends gi {
        constructor(t) {
            super(t)
        }
        oe() {
            const t = this.re;
            t.It = !1;
            const i = this.ae.N();
            if (!i.priceLineVisible || !this.ae.It()) return;
            const s = this.ae.Ae(i.priceLineSource === 0);
            s.Le || (t.It = !0, t.ut = s.Ei, t.R = this.ae.We(s.R), t.ct = i.priceLineWidth, t.Zt = i.priceLineStyle)
        }
    },
    Re = class extends Bt {
        constructor(t) {
            super(), this.Jt = t
        }
        Yi(t, i, s) {
            t.It = !1, i.It = !1;
            const e = this.Jt;
            if (!e.It()) return;
            const h = e.N(),
                n = h.lastValueVisible,
                r = e.He() !== "",
                o = h.seriesLastValueMode === 0,
                l = e.Ae(!1);
            if (l.Le) return;
            n && (t.ri = this.Ue(l, n, o), t.It = t.ri.length !== 0), (r || o) && (i.ri = this.$e(l, n, r, o), i.It = i.ri.length > 0);
            const a = e.We(l.R),
                u = this.Jt.Qt().Xi().Z(a);
            s.G = u.G, s.Ei = l.Ei, i.Ht = e.Qt().Ut(l.Ei / e.Ft().$t()), t.Ht = a, t.R = u.X, i.R = u.X
        }
        $e(t, i, s, e) {
            let h = "";
            const n = this.Jt.He();
            return s && n.length !== 0 && (h += `${n} `), i && e && (h += this.Jt.Ft().je() ? t.qe : t.Ye), h.trim()
        }
        Ue(t, i, s) {
            return i ? s ? this.Jt.Ft().je() ? t.Ye : t.qe : t.ri : ""
        }
    };

function Qi(t, i, s, e) {
    const h = Number.isFinite(i),
        n = Number.isFinite(s);
    return h && n ? t(i, s) : h || n ? h ? i : s : e
}
var R = class zt {
        constructor(i, s) {
            this.Ke = i, this.Ze = s
        }
        Ge(i) {
            return i !== null && this.Ke === i.Ke && this.Ze === i.Ze
        }
        Xe() {
            return new zt(this.Ke, this.Ze)
        }
        Je() {
            return this.Ke
        }
        Qe() {
            return this.Ze
        }
        tr() {
            return this.Ze - this.Ke
        }
        Gi() {
            return this.Ze === this.Ke || Number.isNaN(this.Ze) || Number.isNaN(this.Ke)
        }
        Ss(i) {
            return i === null ? this : new zt(Qi(Math.min, this.Je(), i.Je(), -1 / 0), Qi(Math.max, this.Qe(), i.Qe(), 1 / 0))
        }
        ir(i) {
            if (!G(i) || this.Ze - this.Ke === 0) return;
            const s = .5 * (this.Ze + this.Ke);
            let e = this.Ze - s,
                h = this.Ke - s;
            e *= i, h *= i, this.Ze = s + e, this.Ke = s + h
        }
        nr(i) {
            G(i) && (this.Ze += i, this.Ke += i)
        }
        sr() {
            return {
                minValue: this.Ke,
                maxValue: this.Ze
            }
        }
        static er(i) {
            return i === null ? null : new zt(i.minValue, i.maxValue)
        }
    },
    Bi = class Ws {
        constructor(i, s) {
            this.rr = i, this.hr = s || null
        }
        ar() {
            return this.rr
        }
        lr() {
            return this.hr
        }
        sr() {
            return {
                priceRange: this.rr === null ? null : this.rr.sr(),
                margins: this.hr || void 0
            }
        }
        static er(i) {
            return i === null ? null : new Ws(R.er(i.priceRange), i.margins)
        }
    },
    Le = [2, 4, 8, 16, 32, 64, 128, 256, 512],
    Ie = "Custom series with conflation reducer must have a priceValueBuilder method",
    Qe = class extends gi {
        constructor(t, i) {
            super(t), this._r = i
        }
        oe() {
            const t = this.re;
            t.It = !1;
            const i = this._r.N();
            if (!this.ae.It() || !i.lineVisible) return;
            const s = this._r.ur();
            s !== null && (t.It = !0, t.ut = s, t.R = i.color, t.ct = i.lineWidth, t.Zt = i.lineStyle, t.te = this._r.N().id)
        }
    },
    Be = class extends Bt {
        constructor(t, i) {
            super(), this.Te = t, this._r = i
        }
        Yi(t, i, s) {
            t.It = !1, i.It = !1;
            const e = this._r.N(),
                h = e.axisLabelVisible,
                n = e.title !== "",
                r = this.Te;
            if (!h || !r.It()) return;
            const o = this._r.ur();
            if (o === null) return;
            n && (i.ri = e.title, i.It = !0), i.Ht = r.Qt().Ut(o / r.Ft().$t()), t.ri = this.cr(e.price), t.It = !0;
            const l = this.Te.Qt().Xi().Z(e.axisLabelColor || e.color);
            s.G = l.G;
            const a = e.axisLabelTextColor || l.X;
            t.R = a, i.R = a, s.Ei = o
        }
        cr(t) {
            const i = this.Te.Lt();
            return i === null ? "" : this.Te.Ft().Ji(t, i.Wt)
        }
    },
    qe = class {
        constructor(t, i) {
            this.Te = t, this.yn = i, this.dr = new Qe(t, this), this.qs = new Be(t, this), this.pr = new qs(this.qs, t, t.Qt())
        }
        vr(t) {
            P(this.yn, t), this.kt(), this.Te.Qt().mr()
        }
        N() {
            return this.yn
        }
        wr() {
            return this.dr
        }
        Mr() {
            return this.pr
        }
        gr() {
            return this.qs
        }
        kt() {
            this.dr.kt(), this.qs.kt()
        }
        ur() {
            const t = this.Te,
                i = t.Ft();
            if (t.Qt().Et().Gi() || i.Gi()) return null;
            const s = t.Lt();
            return s === null ? null : i.Nt(this.yn.price, s.Wt)
        }
    },
    We = class {
        constructor() {
            this.br = new WeakMap
        }
        Sr(t, i, s) {
            const e = 1 / i * s;
            if (t >= e) return 1;
            const h = e / t;
            return Math.min(Math.pow(2, Math.floor(Math.log2(h))), 512)
        }
        Cr(t, i, s, e = !1, h) {
            if (t.length === 0 || i <= 1) return t;
            const n = this.yr(i);
            if (n <= 1) return t;
            const r = this.kr(t);
            let o = r.Pr.get(n);
            return o !== void 0 || (o = this.Tr(t, n, s, e, h, r.Pr), r.Pr.set(n, o)), o
        }
        Rr(t, i, s, e, h = !1, n) {
            if (s < 1 || t.length === 0) return t;
            const r = this.kr(t),
                o = r.Pr.get(s);
            if (!o) return this.Cr(t, s, e, h, n);
            const l = this.Dr(t, i, s, o, h, e, n);
            return r.Pr.set(s, l), l
        }
        yr(t) {
            if (t <= 2) return 2;
            for (const i of Le)
                if (t <= i) return i;
            return 512
        }
        Ir(t) {
            if (t.length === 0) return 0;
            const i = t[0],
                s = t[t.length - 1];
            return 31 * t.length + 17 * i.$n + 13 * s.$n
        }
        Tr(t, i, s, e = !1, h, n = new Map) {
            if (i === 2) return this.Vr(t, 2, s, e, h);
            const r = i / 2;
            let o = n.get(r);
            return o || (o = this.Tr(t, r, s, e, h, n), n.set(r, o)), this.Br(o, s, e, h)
        }
        Vr(t, i, s, e = !1, h) {
            const n = this.Er(t, i, s, e, h);
            return this.Ar(n, e)
        }
        Br(t, i, s = !1, e) {
            const h = this.Er(t, 2, i, s, e);
            return this.Ar(h, s)
        }
        Er(t, i, s, e = !1, h) {
            const n = [];
            for (let r = 0; r < t.length; r += i)
                if (t.length - r >= i) {
                    const o = this.Lr(t[r], t[r + 1], s, e, h);
                    o.zr = !1, n.push(o)
                } else if (n.length === 0) n.push(this.Or(t[r], !0));
            else {
                const o = n[n.length - 1];
                n[n.length - 1] = this.Nr(o, t[r], s, e, h)
            }
            return n
        }
        Fr(t, i) {
            return (t ? ? 1) + (i ? ? 1)
        }
        Lr(t, i, s, e = !1, h) {
            if (!e || !s || !h) {
                const l = t.Wt[1] > i.Wt[1] ? t.Wt[1] : i.Wt[1],
                    a = t.Wt[2] < i.Wt[2] ? t.Wt[2] : i.Wt[2];
                return {
                    Wr: t.$n,
                    Hr: i.$n,
                    Ur: t.wt,
                    $r: i.wt,
                    jr: t.Wt[0],
                    qr: l,
                    Yr: a,
                    Kr: i.Wt[3],
                    Zr: this.Fr(t.Zr, i.Zr),
                    Gr: void 0,
                    zr: !1
                }
            }
            const n = s(this.Xr(t, h), this.Xr(i, h)),
                r = h(n),
                o = r.length ? r[r.length - 1] : 0;
            return {
                Wr: t.$n,
                Hr: i.$n,
                Ur: t.wt,
                $r: i.wt,
                jr: t.Wt[0],
                qr: Math.max(t.Wt[1], o),
                Yr: Math.min(t.Wt[2], o),
                Kr: o,
                Zr: this.Fr(t.Zr, i.Zr),
                Gr: n,
                zr: !1
            }
        }
        Nr(t, i, s, e = !1, h) {
            if (!e || !s || !h) return {
                Wr: t.Wr,
                Hr: i.$n,
                Ur: t.Ur,
                $r: i.wt,
                jr: t.jr,
                qr: t.qr > i.Wt[1] ? t.qr : i.Wt[1],
                Yr: t.Yr < i.Wt[2] ? t.Yr : i.Wt[2],
                Kr: i.Wt[3],
                Zr: t.Zr + (i.Zr ? ? 1),
                Gr: t.Gr,
                zr: !1
            };
            const n = t.Gr,
                r = this.Xr(i, h),
                o = n ? {
                    data: n,
                    index: t.Wr,
                    originalTime: t.Ur,
                    time: t.Ur,
                    priceValues: h(n)
                } : null,
                l = o ? s(o, r) : r.data,
                a = o ? h(l) : r.priceValues,
                u = a.length ? a[a.length - 1] : 0;
            return {
                Wr: t.Wr,
                Hr: i.$n,
                Ur: t.Ur,
                $r: i.wt,
                jr: t.jr,
                qr: Math.max(t.qr, u),
                Yr: Math.min(t.Yr, u),
                Kr: u,
                Zr: t.Zr + (i.Zr ? ? 1),
                Gr: l,
                zr: !1
            }
        }
        Jr(t, i, s, e, h, n, r = !1, o) {
            const l = i === e ? h : t[i];
            if (s - i == 1) return this.Or(l, !0);
            const a = i + 1 === e ? h : t[i + 1];
            let u = this.Lr(l, a, n, r, o);
            for (let c = i + 2; c < s; c++) {
                const d = c === e ? h : t[c];
                u = this.Nr(u, d, n, r, o)
            }
            return u
        }
        Xr(t, i) {
            const s = t.ue ? ? {};
            return {
                data: t.ue,
                index: t.$n,
                originalTime: t.Qr,
                time: t.wt,
                priceValues: i(s)
            }
        }
        th(t, i = !1) {
            const s = i === !0,
                e = !!t.Gr;
            return {
                $n: t.Wr,
                wt: t.Ur,
                Qr: t.Ur,
                Wt: [s ? t.Kr : t.jr, t.qr, t.Yr, t.Kr],
                Zr: t.Zr,
                ue: s ? e ? t.Gr : {
                    wt: t.Ur
                } : void 0
            }
        }
        Ar(t, i = !1) {
            return t.map((s => this.th(s, i)))
        }
        Dr(t, i, s, e, h = !1, n, r) {
            if (e.length === 0) return e;
            const o = t.length - 1,
                l = Math.floor(o / s) * s;
            if (Math.min(l + s, t.length) - l < s && t.length > s) {
                const a = t.slice();
                return a[a.length - 1] = i, this.Cr(a, s, n, h, r)
            }
            if (Math.floor((o - 1) / s) === Math.floor(o / s) || e.length === 1) {
                const a = Math.min(l + s, t.length),
                    u = a - l;
                if (u <= 0) return e;
                const c = u === 1 ? this.Or(l === o ? i : t[l], !0) : this.Jr(t, l, a, o, i, n, h, r);
                return e[e.length - 1] = this.th(c, h), e
            } {
                const a = t.slice();
                return a[a.length - 1] = i, this.Cr(a, s, n, h, r)
            }
        }
        Or(t, i = !1) {
            return {
                Wr: t.$n,
                Hr: t.$n,
                Ur: t.wt,
                $r: t.wt,
                jr: t.Wt[0],
                qr: t.Wt[1],
                Yr: t.Wt[2],
                Kr: t.Wt[3],
                Zr: t.Zr ? ? 1,
                Gr: t.ue,
                zr: i
            }
        }
        kr(t) {
            const i = this.ih(t),
                s = this.Ir(t);
            return i.nh !== s && (i.Pr.clear(), i.nh = s), i
        }
        ih(t) {
            let i = this.br.get(t);
            return i === void 0 && (i = {
                nh: this.Ir(t),
                Pr: new Map
            }, this.br.set(t, i)), i
        }
    },
    Fe = class extends Is {
        constructor(t) {
            super(), this.sn = t
        }
        Qt() {
            return this.sn
        }
    },
    Oe = {
        Bar: (t, i, s, e) => {
            const h = i.upColor,
                n = i.downColor,
                r = v(t(s, e)),
                o = O(r.Wt[0]) <= O(r.Wt[3]);
            return {
                sh: r.R ? ? (o ? h : n)
            }
        },
        Candlestick: (t, i, s, e) => {
            const h = i.upColor,
                n = i.downColor,
                r = i.borderUpColor,
                o = i.borderDownColor,
                l = i.wickUpColor,
                a = i.wickDownColor,
                u = v(t(s, e)),
                c = O(u.Wt[0]) <= O(u.Wt[3]);
            return {
                sh: u.R ? ? (c ? h : n),
                eh: u.Ht ? ? (c ? r : o),
                rh: u.hh ? ? (c ? l : a)
            }
        },
        Custom: (t, i, s, e) => ({
            sh: v(t(s, e)).R ? ? i.color
        }),
        Area: (t, i, s, e) => {
            const h = v(t(s, e));
            return {
                sh: h.vt ? ? i.lineColor,
                vt: h.vt ? ? i.lineColor,
                ah: h.ah ? ? i.topColor,
                oh: h.oh ? ? i.bottomColor
            }
        },
        Baseline: (t, i, s, e) => {
            const h = v(t(s, e));
            return {
                sh: h.Wt[3] >= i.baseValue.price ? i.topLineColor : i.bottomLineColor,
                _h: h._h ? ? i.topLineColor,
                uh: h.uh ? ? i.bottomLineColor,
                dh: h.dh ? ? i.topFillColor1,
                fh: h.fh ? ? i.topFillColor2,
                ph: h.ph ? ? i.bottomFillColor1,
                mh: h.mh ? ? i.bottomFillColor2
            }
        },
        Line: (t, i, s, e) => {
            const h = v(t(s, e));
            return {
                sh: h.R ? ? i.color,
                vt: h.R ? ? i.color
            }
        },
        Histogram: (t, i, s, e) => ({
            sh: v(t(s, e)).R ? ? i.color
        })
    },
    De = class {
        constructor(t) {
            this.wh = (i, s) => s !== void 0 ? s.Wt : this.Te.Un().Mh(i), this.Te = t, this.gh = Oe[t.bh()]
        }
        Sh(t, i) {
            return this.gh(this.wh, this.Te.N(), t, i)
        }
    };

function Fs(t, i, s, e, h = 0, n = i.length) {
    let r = n - h;
    for (; 0 < r;) {
        const o = r >> 1,
            l = h + o;
        e(i[l], s) === t ? (h = l + 1, r -= o + 1) : r = o
    }
    return h
}
var H = Fs.bind(null, !0),
    wi = Fs.bind(null, !1),
    qi;
(function(t) {
    t[t.NearestLeft = -1] = "NearestLeft", t[t.None = 0] = "None", t[t.NearestRight = 1] = "NearestRight"
})(qi || (qi = {}));
var F = 30,
    Ke = class {
        constructor() {
            this.xh = [], this.Ch = new Map, this.yh = new Map, this.kh = []
        }
        Ph() {
            return this.Th() > 0 ? this.xh[this.xh.length - 1] : null
        }
        Rh() {
            return this.Th() > 0 ? this.Dh(0) : null
        }
        Qn() {
            return this.Th() > 0 ? this.Dh(this.xh.length - 1) : null
        }
        Th() {
            return this.xh.length
        }
        Gi() {
            return this.Th() === 0
        }
        ze(t) {
            return this.Ih(t, 0) !== null
        }
        Mh(t) {
            return this.Hn(t)
        }
        Hn(t, i = 0) {
            const s = this.Ih(t, i);
            return s === null ? null : { ...this.Vh(s),
                $n: this.Dh(s)
            }
        }
        Bh() {
            return this.xh
        }
        Eh(t, i, s) {
            if (this.Gi()) return null;
            let e = null;
            for (const h of s) e = yt(e, this.Ah(t, i, h));
            return e
        }
        ht(t) {
            this.yh.clear(), this.Ch.clear(), this.xh = t, this.kh = t.map((i => i.$n))
        }
        Lh() {
            return this.kh
        }
        Dh(t) {
            return this.xh[t].$n
        }
        Vh(t) {
            return this.xh[t]
        }
        Ih(t, i) {
            const s = this.zh(t);
            if (s === null && i !== 0) switch (i) {
                case -1:
                    return this.Oh(t);
                case 1:
                    return this.Nh(t);
                default:
                    throw new TypeError("Unknown search mode")
            }
            return s
        }
        Oh(t) {
            let i = this.Fh(t);
            return i > 0 && (i -= 1), i !== this.xh.length && this.Dh(i) < t ? i : null
        }
        Nh(t) {
            const i = this.Wh(t);
            return i !== this.xh.length && t < this.Dh(i) ? i : null
        }
        zh(t) {
            const i = this.Fh(t);
            return i === this.xh.length || t < this.xh[i].$n ? null : i
        }
        Fh(t) {
            return H(this.xh, t, ((i, s) => i.$n < s))
        }
        Wh(t) {
            return wi(this.xh, t, ((i, s) => i.$n > s))
        }
        Hh(t, i, s) {
            let e = null;
            for (let h = t; h < i; h++) {
                const n = this.xh[h].Wt[s];
                Number.isNaN(n) || (e === null ? e = {
                    Uh: n,
                    $h: n
                } : (n < e.Uh && (e.Uh = n), n > e.$h && (e.$h = n)))
            }
            return e
        }
        Ah(t, i, s) {
            if (this.Gi()) return null;
            let e = null;
            const h = v(this.Rh()),
                n = v(this.Qn()),
                r = Math.max(t, h),
                o = Math.min(i, n),
                l = Math.ceil(r / F) * F,
                a = Math.max(l, Math.floor(o / F) * F); {
                const c = this.Fh(r),
                    d = this.Wh(Math.min(o, l, i));
                e = yt(e, this.Hh(c, d, s))
            }
            let u = this.Ch.get(s);
            u === void 0 && (u = new Map, this.Ch.set(s, u));
            for (let c = Math.max(l + 1, r); c < a; c += F) {
                const d = Math.floor(c / F);
                let f = u.get(d);
                if (f === void 0) {
                    const m = this.Fh(d * F),
                        p = this.Wh((d + 1) * F - 1);
                    f = this.Hh(m, p, s), u.set(d, f)
                }
                e = yt(e, f)
            } {
                const c = this.Fh(a),
                    d = this.Wh(o);
                e = yt(e, this.Hh(c, d, s))
            }
            return e
        }
    };

function yt(t, i) {
    return t === null ? i : i === null ? t : {
        Uh: Math.min(t.Uh, i.Uh),
        $h: Math.max(t.$h, i.$h)
    }
}

function Yt() {
    return new Ke
}
var Lt = {
        setLineStyle: D
    },
    Ve = class {
        constructor(t) {
            this.jh = t
        }
        st(t, i, s) {
            this.jh.draw(t, Lt)
        }
        qh(t, i, s) {
            this.jh.drawBackground ? .(t, Lt)
        }
    },
    $e = class {
        constructor(t) {
            this.Ls = null, this.Yh = t
        }
        Tt() {
            const t = this.Yh.renderer();
            if (t === null) return null;
            if (this.Ls ? .Kh === t) return this.Ls.Zh;
            const i = new Ve(t);
            return this.Ls = {
                Kh: t,
                Zh: i
            }, i
        }
        Gh() {
            return this.Yh.zOrder ? .() ? ? "normal"
        }
    },
    Os = class {
        constructor(t) {
            this.Xh = null, this.Jh = t
        }
        Qh() {
            return this.Jh
        }
        Nn() {
            this.Jh.updateAllViews ? .()
        }
        jn() {
            const t = this.Jh.paneViews ? .() ? ? [];
            if (this.Xh ? .Kh === t) return this.Xh.Zh;
            const i = t.map((s => new $e(s)));
            return this.Xh = {
                Kh: t,
                Zh: i
            }, i
        }
        Qs(t, i) {
            return this.Jh.hitTest ? .(t, i) ? ? null
        }
    },
    Ye = class extends Os {
        cn() {
            return []
        }
    },
    Ze = class {
        constructor(t) {
            this.jh = t
        }
        st(t, i, s) {
            this.jh.draw(t, Lt)
        }
        qh(t, i, s) {
            this.jh.drawBackground ? .(t, Lt)
        }
    },
    Wi = class {
        constructor(t) {
            this.Ls = null, this.Yh = t
        }
        Tt() {
            const t = this.Yh.renderer();
            if (t === null) return null;
            if (this.Ls ? .Kh === t) return this.Ls.Zh;
            const i = new Ze(t);
            return this.Ls = {
                Kh: t,
                Zh: i
            }, i
        }
        Gh() {
            return this.Yh.zOrder ? .() ? ? "normal"
        }
    };

function Ds(t) {
    return {
        ri: t.text(),
        Ei: t.coordinate(),
        Vi: t.fixedCoordinate ? .(),
        R: t.textColor(),
        G: t.backColor(),
        It: t.visible ? .() ? ? !0,
        pi: t.tickVisible ? .() ? ? !0
    }
}
var Ae = class {
        constructor(t, i) {
            this.Xt = new Ls, this.ta = t, this.ia = i
        }
        Tt() {
            return this.Xt.ht({
                nn: this.ia.nn(),
                ...Ds(this.ta)
            }), this.Xt
        }
    },
    Ge = class extends Bt {
        constructor(t, i) {
            super(), this.ta = t, this.Ki = i
        }
        Yi(t, i, s) {
            const e = Ds(this.ta);
            s.G = e.G, t.R = e.R;
            const h = 2 / 12 * this.Ki.k();
            s.Ti = h, s.Ri = h, s.Ei = e.Ei, s.Vi = e.Vi, t.ri = e.ri, t.It = e.It, t.pi = e.pi
        }
    },
    He = class extends Os {
        constructor(t, i) {
            super(t), this.na = null, this.sa = null, this.ea = null, this.ra = null, this.Te = i
        }
        dn() {
            const t = this.Jh.timeAxisViews ? .() ? ? [];
            if (this.na ? .Kh === t) return this.na.Zh;
            const i = this.Te.Qt().Et(),
                s = t.map((e => new Ae(e, i)));
            return this.na = {
                Kh: t,
                Zh: s
            }, s
        }
        qn() {
            const t = this.Jh.priceAxisViews ? .() ? ? [];
            if (this.sa ? .Kh === t) return this.sa.Zh;
            const i = this.Te.Ft(),
                s = t.map((e => new Ge(e, i)));
            return this.sa = {
                Kh: t,
                Zh: s
            }, s
        }
        ha() {
            const t = this.Jh.priceAxisPaneViews ? .() ? ? [];
            if (this.ea ? .Kh === t) return this.ea.Zh;
            const i = t.map((s => new Wi(s)));
            return this.ea = {
                Kh: t,
                Zh: i
            }, i
        }
        aa() {
            const t = this.Jh.timeAxisPaneViews ? .() ? ? [];
            if (this.ra ? .Kh === t) return this.ra.Zh;
            const i = t.map((s => new Wi(s)));
            return this.ra = {
                Kh: t,
                Zh: i
            }, i
        }
        la(t, i) {
            return this.Jh.autoscaleInfo ? .(t, i) ? ? null
        }
    };

function Zt(t, i, s, e) {
    t.forEach((h => {
        i(h).forEach((n => {
            n.Gh() === s && e.push(n)
        }))
    }))
}

function At(t) {
    return t.jn()
}

function Ue(t) {
    return t.ha()
}

function je(t) {
    return t.aa()
}
var Xe = ["Area", "Line", "Baseline"],
    Ft = class extends Fe {
        constructor(t, i, s, e, h) {
            super(t), this.qt = Yt(), this.dr = new Pe(this), this.oa = [], this._a = new Te(this), this.ua = null, this.ca = null, this.da = null, this.fa = [], this.pa = new We, this.va = new Map, this.ma = null, this.yn = s, this.wa = i;
            const n = new Re(this);
            if (this.mn = [n], this.pr = new qs(n, this, t), Xe.includes(this.wa) && (this.ua = new Ne(this)), this.Ma(), this.Yh = e(this, this.Qt(), h), this.wa === "Custom") {
                const r = this.Yh;
                r.ga && this.ba(r.ga)
            }
        }
        m() {
            this.da !== null && clearTimeout(this.da)
        }
        We(t) {
            return this.yn.priceLineColor || t
        }
        Ae(t) {
            const i = {
                    Le: !0
                },
                s = this.Ft();
            if (this.Qt().Et().Gi() || s.Gi() || this.qt.Gi()) return i;
            const e = this.Qt().Et().Ee(),
                h = this.Lt();
            if (e === null || h === null) return i;
            let n, r;
            if (t) {
                const u = this.qt.Ph();
                if (u === null) return i;
                n = u, r = u.$n
            } else {
                const u = this.qt.Hn(e.bi(), -1);
                if (u === null || (n = this.qt.Mh(u.$n), n === null)) return i;
                r = u.$n
            }
            const o = n.Wt[3],
                l = this.Sa().Sh(r, {
                    Wt: n
                }),
                a = s.Nt(o, h.Wt);
            return {
                Le: !1,
                Mt: o,
                ri: s.Ji(o, h.Wt),
                qe: s.xa(o),
                Ye: s.Ca(o, h.Wt),
                R: l.sh,
                Ei: a,
                $n: r
            }
        }
        Sa() {
            return this.ca !== null || (this.ca = new De(this)), this.ca
        }
        N() {
            return this.yn
        }
        vr(t) {
            const i = this.Qt(),
                {
                    priceScaleId: s,
                    visible: e,
                    priceFormat: h
                } = t;
            s !== void 0 && s !== this.yn.priceScaleId && i.ya(this, s), e !== void 0 && e !== this.yn.visible && i.ka();
            const n = t.conflationThresholdFactor !== void 0;
            P(this.yn, t), n && (this.va.clear(), this.Qt().mr()), h !== void 0 && (this.Ma(), i.Pa()), i.Ta(this), i.Ra(), this.Yh.kt("options")
        }
        ht(t, i) {
            this.qt.ht(t), this.va.clear();
            const s = this.Qt().Et().N();
            s.enableConflation && s.precomputeConflationOnInit && this.Da(s.precomputeConflationPriority), this.Yh.kt("data"), this.ua !== null && (i && i.Ia ? this.ua.De() : t.length === 0 && this.ua.Re());
            const e = this.Qt().Ks(this);
            this.Qt().Va(e), this.Qt().Ta(this), this.Qt().Ra(), this.Qt().mr()
        }
        Ba(t) {
            const i = new qe(this, t);
            return this.oa.push(i), this.Qt().Ta(this), i
        }
        Ea(t) {
            const i = this.oa.indexOf(t);
            i !== -1 && this.oa.splice(i, 1), this.Qt().Ta(this)
        }
        Aa() {
            return this.oa
        }
        bh() {
            return this.wa
        }
        Lt() {
            const t = this.La();
            return t === null ? null : {
                Wt: t.Wt[3],
                za: t.wt
            }
        }
        La() {
            const t = this.Qt().Et().Ee();
            if (t === null) return null;
            const i = t.Oa();
            return this.qt.Hn(i, 1)
        }
        Un() {
            return this.qt
        }
        ba(t) {
            this.ma = t, this.va.clear()
        }
        Na() {
            return !!this.Qt().Et().N().enableConflation && this.Fa() > 1
        }
        Rr(t) {
            if (!this.Na()) return;
            const i = this.Fa();
            if (!this.va.has(i)) return;
            const s = this.wa === "Custom",
                e = s && this.ma || void 0,
                h = s && this.Yh.Wa ? o => {
                    const l = o,
                        a = this.Yh.Wa(l);
                    return Array.isArray(a) ? a : [typeof a == "number" ? a : 0]
                } : void 0,
                n = this.pa.Rr(this.qt.Bh(), t, i, e, s, h),
                r = Yt();
            r.ht(n), this.va.set(i, r)
        }
        Ha() {
            const t = this.Qt().Et().N().enableConflation;
            if (this.wa === "Custom" && this.ma === null) return this.qt;
            if (!t) return this.qt;
            const i = this.Fa(),
                s = this.va.get(i);
            return s || (this.Ua(i), this.va.get(i) ? ? this.qt)
        }
        $a(t) {
            const i = this.qt.Mh(t);
            return i === null ? null : this.wa === "Bar" || this.wa === "Candlestick" || this.wa === "Custom" ? {
                jr: i.Wt[0],
                qr: i.Wt[1],
                Yr: i.Wt[2],
                Kr: i.Wt[3]
            } : i.Wt[3]
        }
        ja(t) {
            const i = [];
            Zt(this.fa, At, "top", i);
            const s = this.ua;
            return s !== null && s.It() && (this.da === null && s.Ve() && (this.da = setTimeout((() => {
                this.da = null, this.Qt().qa()
            }), 0)), s.Ie(), i.unshift(s)), i
        }
        jn() {
            const t = [];
            this.Ya() || t.push(this._a), t.push(this.Yh, this.dr);
            const i = this.oa.map((s => s.wr()));
            return t.push(...i), Zt(this.fa, At, "normal", t), t
        }
        Ka() {
            return this.Za(At, "bottom")
        }
        Ga(t) {
            return this.Za(Ue, t)
        }
        Xa(t) {
            return this.Za(je, t)
        }
        Ja(t, i) {
            return this.fa.map((s => s.Qs(t, i))).filter((s => s !== null))
        }
        cn() {
            return [this.pr, ...this.oa.map((t => t.Mr()))]
        }
        qn(t, i) {
            if (i !== this.hn && !this.Ya()) return [];
            const s = [...this.mn];
            for (const e of this.oa) s.push(e.gr());
            return this.fa.forEach((e => {
                s.push(...e.qn())
            })), s
        }
        dn() {
            const t = [];
            return this.fa.forEach((i => {
                t.push(...i.dn())
            })), t
        }
        la(t, i) {
            if (this.yn.autoscaleInfoProvider !== void 0) {
                const s = this.yn.autoscaleInfoProvider((() => {
                    const e = this.Qa(t, i);
                    return e === null ? null : e.sr()
                }));
                return Bi.er(s)
            }
            return this.Qa(t, i)
        }
        Kh() {
            const t = this.yn.priceFormat;
            return t.base ? ? 1 / t.minMove
        }
        tl() {
            return this.il
        }
        Nn() {
            this.Yh.kt();
            for (const t of this.mn) t.kt();
            for (const t of this.oa) t.kt();
            this.dr.kt(), this._a.kt(), this.ua ? .kt(), this.fa.forEach((t => t.Nn()))
        }
        Ft() {
            return v(super.Ft())
        }
        At(t) {
            if (!((this.wa === "Line" || this.wa === "Area" || this.wa === "Baseline") && this.yn.crosshairMarkerVisible)) return null;
            const i = this.qt.Mh(t);
            return i === null ? null : {
                Mt: i.Wt[3],
                ft: this.nl(),
                Ht: this.sl(),
                Ot: this.el(),
                zt: this.rl(t)
            }
        }
        He() {
            return this.yn.title
        }
        It() {
            return this.yn.visible
        }
        hl(t) {
            this.fa.push(new He(t, this))
        }
        al(t) {
            this.fa = this.fa.filter((i => i.Qh() !== t))
        }
        ll() {
            if (this.wa === "Custom") return t => this.Yh.Wa(t)
        }
        ol() {
            if (this.wa === "Custom") return t => this.Yh._l(t)
        }
        ul() {
            return this.qt.Lh()
        }
        Ya() {
            return !qt(this.Ft().cl())
        }
        Qa(t, i) {
            if (!mt(t) || !mt(i) || this.qt.Gi()) return null;
            const s = this.wa === "Line" || this.wa === "Area" || this.wa === "Baseline" || this.wa === "Histogram" ? [3] : [2, 1],
                e = this.qt.Eh(t, i, s);
            let h = e !== null ? new R(e.Uh, e.$h) : null,
                n = null;
            if (this.bh() === "Histogram") {
                const r = this.yn.base,
                    o = new R(r, r);
                h = h !== null ? h.Ss(o) : o
            }
            return this.fa.forEach((r => {
                const o = r.la(t, i);
                if (o ? .priceRange) {
                    const l = new R(o.priceRange.minValue, o.priceRange.maxValue);
                    h = h !== null ? h.Ss(l) : l
                }
                o ? .margins && (n = o.margins)
            })), new Bi(h, n)
        }
        nl() {
            switch (this.wa) {
                case "Line":
                case "Area":
                case "Baseline":
                    return this.yn.crosshairMarkerRadius
            }
            return 0
        }
        sl() {
            switch (this.wa) {
                case "Line":
                case "Area":
                case "Baseline":
                    {
                        const t = this.yn.crosshairMarkerBorderColor;
                        if (t.length !== 0) return t
                    }
            }
            return null
        }
        el() {
            switch (this.wa) {
                case "Line":
                case "Area":
                case "Baseline":
                    return this.yn.crosshairMarkerBorderWidth
            }
            return 0
        }
        rl(t) {
            switch (this.wa) {
                case "Line":
                case "Area":
                case "Baseline":
                    {
                        const i = this.yn.crosshairMarkerBackgroundColor;
                        if (i.length !== 0) return i
                    }
            }
            return this.Sa().Sh(t).sh
        }
        Ma() {
            switch (this.yn.priceFormat.type) {
                case "custom":
                    {
                        const t = this.yn.priceFormat.formatter;this.il = {
                            format: t,
                            formatTickmarks: this.yn.priceFormat.tickmarksFormatter ? ? (i => i.map(t))
                        };
                        break
                    }
                case "volume":
                    this.il = new _e(this.yn.priceFormat.precision);
                    break;
                case "percent":
                    this.il = new Bs(this.yn.priceFormat.precision);
                    break;
                default:
                    {
                        const t = Math.pow(10, this.yn.priceFormat.precision);this.il = new Wt(t, this.yn.priceFormat.minMove * t)
                    }
            }
            this.hn !== null && this.hn.dl()
        }
        Za(t, i) {
            const s = [];
            return Zt(this.fa, t, i, s), s
        }
        Fa() {
            const {
                fl: t,
                pl: i,
                vl: s
            } = this.ml();
            return this.pa.Sr(t, i, s)
        }
        ml() {
            const t = this.Qt().Et(),
                i = t.fl(),
                s = window.devicePixelRatio || 1,
                e = t.N().conflationThresholdFactor;
            return {
                fl: i,
                pl: s,
                vl: this.yn.conflationThresholdFactor ? ? e ? ? 1
            }
        }
        wl(t) {
            const i = this.qt.Bh();
            let s;
            if (this.wa === "Custom" && this.ma !== null) {
                const h = this.ll();
                if (!h) throw new Error(Ie);
                s = this.pa.Cr(i, t, this.ma, !0, (n => h(n)))
            } else s = this.pa.Cr(i, t);
            const e = Yt();
            return e.ht(s), e
        }
        Ua(t) {
            const i = this.wl(t);
            this.va.set(t, i)
        }
        Da(t) {
            if (this.wa === "Custom" && (this.ma === null || !this.ll())) return;
            this.va.clear();
            const i = this.Qt().Et().Ml();
            for (const s of i) {
                const e = () => {
                        this.gl(s)
                    },
                    h = typeof window == "object" && window || typeof self == "object" && self;
                h ? .Sl ? .bl ? h.Sl.bl((() => {
                    e()
                }), {
                    se: t
                }) : Promise.resolve().then((() => e()))
            }
        }
        gl(t) {
            if (this.va.has(t) || this.qt.Bh().length === 0) return;
            const i = this.wl(t);
            this.va.set(t, i)
        }
    },
    Je = [3],
    th = [0, 1, 2, 3],
    ih = class {
        constructor(t) {
            this.yn = t
        }
        xl(t, i, s) {
            let e = t;
            if (this.yn.mode === 0) return e;
            const h = s.Pn(),
                n = h.Lt();
            if (n === null) return e;
            const r = h.Nt(t, n),
                o = s.Cl().filter((a => a instanceof Ft)).reduce(((a, u) => {
                    if (s.Zs(u) || !u.It()) return a;
                    const c = u.Ft(),
                        d = u.Un();
                    if (c.Gi() || !d.ze(i)) return a;
                    const f = d.Mh(i);
                    if (f === null) return a;
                    const m = O(u.Lt()),
                        p = this.yn.mode === 3 ? th : Je;
                    return a.concat(p.map((g => c.Nt(f.Wt[g], m.Wt))))
                }), []);
            if (o.length === 0) return e;
            o.sort(((a, u) => Math.abs(a - r) - Math.abs(u - r)));
            const l = o[0];
            return e = h.Tn(l, n), e
        }
    };

function et(t, i, s) {
    return Math.min(Math.max(t, i), s)
}

function St(t, i, s) {
    return i - t <= s
}

function bi(t) {
    const i = Math.ceil(t);
    return i % 2 == 0 ? i - 1 : i
}
var sh = class extends K {
        constructor() {
            super(...arguments), this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        et({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e
        }) {
            if (this.qt === null) return;
            const h = Math.max(1, Math.floor(s));
            t.lineWidth = h, (function(n, r) {
                n.save(), n.lineWidth % 2 && n.translate(.5, .5), r(), n.restore()
            })(t, (() => {
                const n = v(this.qt);
                if (n.yl) {
                    t.strokeStyle = n.kl, D(t, n.Pl), t.beginPath();
                    for (const r of n.Tl) {
                        const o = Math.round(r.Rl * s);
                        t.moveTo(o, -h), t.lineTo(o, i.height + h)
                    }
                    t.stroke()
                }
                if (n.Dl) {
                    t.strokeStyle = n.Il, D(t, n.Vl), t.beginPath();
                    for (const r of n.Bl) {
                        const o = Math.round(r.Rl * e);
                        t.moveTo(-h, o), t.lineTo(i.width + h, o)
                    }
                    t.stroke()
                }
            }))
        }
    },
    eh = class {
        constructor(t) {
            this.Xt = new sh, this.xt = !0, this.yt = t
        }
        kt() {
            this.xt = !0
        }
        Tt() {
            if (this.xt) {
                const t = this.yt.Qt().N().grid,
                    i = {
                        Dl: t.horzLines.visible,
                        yl: t.vertLines.visible,
                        Il: t.horzLines.color,
                        kl: t.vertLines.color,
                        Vl: t.horzLines.style,
                        Pl: t.vertLines.style,
                        Bl: this.yt.Pn().El(),
                        Tl: (this.yt.Qt().Et().El() || []).map((s => ({
                            Rl: s.coord
                        })))
                    };
                this.Xt.ht(i), this.xt = !1
            }
            return this.Xt
        }
    },
    hh = class {
        constructor(t) {
            this.Yh = new eh(t)
        }
        wr() {
            return this.Yh
        }
    },
    Gt = {
        Al: 4,
        Ll: 1e-4
    };

function it(t, i) {
    const s = 100 * (t - i) / i;
    return i < 0 ? -s : s
}

function nh(t, i) {
    return new R(it(t.Je(), i), it(t.Qe(), i))
}

function ct(t, i) {
    const s = 100 * (t - i) / i + 100;
    return i < 0 ? -s : s
}

function rh(t, i) {
    return new R(ct(t.Je(), i), ct(t.Qe(), i))
}

function It(t, i) {
    const s = Math.abs(t);
    if (s < 1e-15) return 0;
    const e = Math.log10(s + i.Ll) + i.Al;
    return t < 0 ? -e : e
}

function dt(t, i) {
    const s = Math.abs(t);
    if (s < 1e-15) return 0;
    const e = Math.pow(10, s - i.Al) - i.Ll;
    return t < 0 ? -e : e
}

function lt(t, i) {
    return t === null ? null : new R(It(t.Je(), i), It(t.Qe(), i))
}

function st(t, i) {
    return t === null ? null : new R(dt(t.Je(), i), dt(t.Qe(), i))
}

function Ht(t) {
    if (t === null) return Gt;
    const i = Math.abs(t.Qe() - t.Je());
    if (i >= 1 || i < 1e-15) return Gt;
    const s = Math.ceil(Math.abs(Math.log10(i))),
        e = Gt.Al + s;
    return {
        Al: e,
        Ll: 1 / Math.pow(10, e)
    }
}
var Ut = class {
        constructor(t, i) {
            if (this.zl = t, this.Ol = i, (function(s) {
                    if (s < 0) return !1;
                    if (s > 1e18) return !0;
                    for (let e = s; e > 1; e /= 10)
                        if (e % 10 != 0) return !1;
                    return !0
                })(this.zl)) this.Nl = [2, 2.5, 2];
            else {
                this.Nl = [];
                for (let s = this.zl; s !== 1;) {
                    if (s % 2 == 0) this.Nl.push(2), s /= 2;
                    else {
                        if (s % 5 != 0) throw new Error("unexpected base");
                        this.Nl.push(2, 2.5), s /= 5
                    }
                    if (this.Nl.length > 100) throw new Error("something wrong with base")
                }
            }
        }
        Fl(t, i, s) {
            const e = this.zl === 0 ? 0 : 1 / this.zl;
            let h = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i)))),
                n = 0,
                r = this.Ol[0];
            for (;;) {
                const u = St(h, e, 1e-14) && h > e + 1e-14,
                    c = St(h, s * r, 1e-14),
                    d = St(h, 1, 1e-14);
                if (!(u && c && d)) break;
                h /= r, r = this.Ol[++n % this.Ol.length]
            }
            if (h <= e + 1e-14 && (h = e), h = Math.max(1, h), this.Nl.length > 0 && (o = h, l = 1, a = 1e-14, Math.abs(o - l) < a))
                for (n = 0, r = this.Nl[0]; St(h, s * r, 1e-14) && h > e + 1e-14;) h /= r, r = this.Nl[++n % this.Nl.length];
            var o, l, a;
            return h
        }
    },
    Fi = class {
        constructor(t, i, s, e) {
            this.Wl = [], this.Ki = t, this.zl = i, this.Hl = s, this.Ul = e
        }
        Fl(t, i) {
            if (t < i) throw new Error("high < low");
            const s = this.Ki.$t(),
                e = (t - i) * this.$l() / s,
                h = new Ut(this.zl, [2, 2.5, 2]),
                n = new Ut(this.zl, [2, 2, 2.5]),
                r = new Ut(this.zl, [2.5, 2, 2]),
                o = [];
            return o.push(h.Fl(t, i, e), n.Fl(t, i, e), r.Fl(t, i, e)), (function(l) {
                if (l.length < 1) throw Error("array is empty");
                let a = l[0];
                for (let u = 1; u < l.length; ++u) l[u] < a && (a = l[u]);
                return a
            })(o)
        }
        jl() {
            const t = this.Ki,
                i = t.Lt();
            if (i === null) return void(this.Wl = []);
            const s = t.$t(),
                e = this.Hl(s - 1, i),
                h = this.Hl(0, i),
                n = this.Ki.N().entireTextOnly ? this.ql() / 2 : 0,
                r = n,
                o = s - 1 - n,
                l = Math.max(e, h),
                a = Math.min(e, h);
            if (l === a) return void(this.Wl = []);
            const u = this.Fl(l, a);
            if (this.Yl(i, u, l, a, r, o), t.Kl() && this.Zl(u, a, l)) {
                const f = this.Ki.Gl();
                this.Xl(i, u, r, o, f, 2 * f)
            }
            const c = this.Wl.map((f => f.Jl)),
                d = this.Ki.Ql(c);
            for (let f = 0; f < this.Wl.length; f++) this.Wl[f].io = d[f]
        }
        El() {
            return this.Wl
        }
        ql() {
            return this.Ki.k()
        }
        $l() {
            return Math.ceil(this.ql() * this.Ki.N().tickMarkDensity)
        }
        Yl(t, i, s, e, h, n) {
            const r = this.Wl,
                o = this.Ki;
            let l = s % i;
            l += l < 0 ? i : 0;
            const a = s >= e ? 1 : -1;
            let u = null,
                c = 0;
            for (let d = s - l; d > e; d -= i) {
                const f = this.Ul(d, t, !0);
                u !== null && Math.abs(f - u) < this.$l() || f < h || f > n || (c < r.length ? (r[c].Rl = f, r[c].io = o.no(d), r[c].Jl = d) : r.push({
                    Rl: f,
                    io: o.no(d),
                    Jl: d
                }), c++, u = f, o.so() && (i = this.Fl(d * a, e)))
            }
            r.length = c
        }
        Xl(t, i, s, e, h, n) {
            const r = this.Wl,
                o = this.eo(t, s, h, n),
                l = this.eo(t, e, -n, -h),
                a = this.Ul(0, t, !0) - this.Ul(i, t, !0);
            r.length > 0 && r[0].Rl - o.Rl < a / 2 && r.shift(), r.length > 0 && l.Rl - r[r.length - 1].Rl < a / 2 && r.pop(), r.unshift(o), r.push(l)
        }
        eo(t, i, s, e) {
            const h = (s + e) / 2,
                n = this.Hl(i + s, t),
                r = this.Hl(i + e, t),
                o = Math.min(n, r),
                l = Math.max(n, r),
                a = Math.max(.1, this.Fl(l, o)),
                u = this.Hl(i + h, t),
                c = u - u % a,
                d = this.Ul(c, t, !0);
            return {
                io: this.Ki.no(c),
                Rl: d,
                Jl: c
            }
        }
        Zl(t, i, s) {
            let e = O(this.Ki.ar());
            return this.Ki.so() && (e = st(e, this.Ki.ro())), e.Je() - i < t && s - e.Qe() < t
        }
    };

function Ks(t) {
    return t.slice().sort(((i, s) => v(i.ln()) - v(s.ln())))
}
var Oi;
(function(t) {
    t[t.Normal = 0] = "Normal", t[t.Logarithmic = 1] = "Logarithmic", t[t.Percentage = 2] = "Percentage", t[t.IndexedTo100 = 3] = "IndexedTo100"
})(Oi || (Oi = {}));
var Di = new Bs,
    Ki = new Wt(100, 1),
    oh = class {
        constructor(t, i, s, e, h) {
            this.ho = 0, this.ao = null, this.rr = null, this.lo = null, this.oo = {
                _o: !1,
                uo: null
            }, this.co = !1, this.do = 0, this.fo = 0, this.po = new T, this.vo = new T, this.mo = [], this.wo = null, this.Mo = null, this.bo = null, this.So = null, this.xo = null, this.il = Ki, this.Co = Ht(null), this.yo = t, this.yn = i, this.ko = s, this.Po = e, this.To = h, this.Ro = new Fi(this, 100, this.Do.bind(this), this.Io.bind(this))
        }
        cl() {
            return this.yo
        }
        N() {
            return this.yn
        }
        vr(t) {
            if (P(this.yn, t), this.dl(), t.mode !== void 0 && this.Vo({
                    _e: t.mode
                }), t.scaleMargins !== void 0) {
                const i = N(t.scaleMargins.top),
                    s = N(t.scaleMargins.bottom);
                if (i < 0 || i > 1) throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
                if (s < 0 || s > 1) throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${s}`);
                if (i + s > 1) throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i+s}`);
                this.Bo(), this.bo = null
            }
        }
        Eo() {
            return this.yn.autoScale
        }
        Ao() {
            return this.co
        }
        so() {
            return this.yn.mode === 1
        }
        je() {
            return this.yn.mode === 2
        }
        Lo() {
            return this.yn.mode === 3
        }
        ro() {
            return this.Co
        }
        _e() {
            return {
                hs: this.yn.autoScale,
                zo: this.yn.invertScale,
                _e: this.yn.mode
            }
        }
        Vo(t) {
            const i = this._e();
            let s = null;
            t.hs !== void 0 && (this.yn.autoScale = t.hs), t._e !== void 0 && (this.yn.mode = t._e, t._e !== 2 && t._e !== 3 || (this.yn.autoScale = !0), this.oo._o = !1), i._e === 1 && t._e !== i._e && ((function(h, n) {
                if (h === null) return !1;
                const r = dt(h.Je(), n),
                    o = dt(h.Qe(), n);
                return isFinite(r) && isFinite(o)
            })(this.rr, this.Co) ? (s = st(this.rr, this.Co), s !== null && this.Oo(s)) : this.yn.autoScale = !0), t._e === 1 && t._e !== i._e && (s = lt(this.rr, this.Co), s !== null && this.Oo(s));
            const e = i._e !== this.yn.mode;
            e && (i._e === 2 || this.je()) && this.dl(), e && (i._e === 3 || this.Lo()) && this.dl(), t.zo !== void 0 && i.zo !== t.zo && (this.yn.invertScale = t.zo, this.No()), this.vo.p(i, this._e())
        }
        Fo() {
            return this.vo
        }
        k() {
            return this.ko.fontSize
        }
        $t() {
            return this.ho
        }
        Wo(t) {
            this.ho !== t && (this.ho = t, this.Bo(), this.bo = null)
        }
        Ho() {
            if (this.ao) return this.ao;
            const t = this.$t() - this.Uo() - this.$o();
            return this.ao = t, t
        }
        ar() {
            return this.jo(), this.rr
        }
        Oo(t, i) {
            const s = this.rr;
            (i || s === null && t !== null || s !== null && !s.Ge(t)) && (this.bo = null, this.rr = t)
        }
        qo(t) {
            this.Oo(t), this.Yo(t !== null)
        }
        Gi() {
            return this.jo(), this.ho === 0 || !this.rr || this.rr.Gi()
        }
        Ko(t) {
            return this.zo() ? t : this.$t() - 1 - t
        }
        Nt(t, i) {
            return this.je() ? t = it(t, i) : this.Lo() && (t = ct(t, i)), this.Io(t, i)
        }
        Zo(t, i, s) {
            this.jo();
            const e = this.$o(),
                h = v(this.ar()),
                n = h.Je(),
                r = h.Qe(),
                o = this.Ho() - 1,
                l = this.zo(),
                a = o / (r - n),
                u = s === void 0 ? 0 : s.from,
                c = s === void 0 ? t.length : s.to,
                d = this.Go();
            for (let f = u; f < c; f++) {
                const m = t[f],
                    p = m.Mt;
                if (isNaN(p)) continue;
                let g = p;
                d !== null && (g = d(m.Mt, i));
                const w = e + a * (g - n);
                m.ut = l ? w : this.ho - 1 - w
            }
        }
        Xo(t, i, s) {
            this.jo();
            const e = this.$o(),
                h = v(this.ar()),
                n = h.Je(),
                r = h.Qe(),
                o = this.Ho() - 1,
                l = this.zo(),
                a = o / (r - n),
                u = s === void 0 ? 0 : s.from,
                c = s === void 0 ? t.length : s.to,
                d = this.Go();
            for (let f = u; f < c; f++) {
                const m = t[f];
                let p = m.jr,
                    g = m.qr,
                    w = m.Yr,
                    M = m.Kr;
                d !== null && (p = d(m.jr, i), g = d(m.qr, i), w = d(m.Yr, i), M = d(m.Kr, i));
                let b = e + a * (p - n),
                    y = l ? b : this.ho - 1 - b;
                m.Jo = y, b = e + a * (g - n), y = l ? b : this.ho - 1 - b, m.Qo = y, b = e + a * (w - n), y = l ? b : this.ho - 1 - b, m.t_ = y, b = e + a * (M - n), y = l ? b : this.ho - 1 - b, m.i_ = y
            }
        }
        Tn(t, i) {
            const s = this.Do(t, i);
            return this.n_(s, i)
        }
        n_(t, i) {
            let s = t;
            return this.je() ? s = (function(e, h) {
                return h < 0 && (e = -e), e / 100 * h + h
            })(s, i) : this.Lo() && (s = (function(e, h) {
                return e -= 100, h < 0 && (e = -e), e / 100 * h + h
            })(s, i)), s
        }
        Cl() {
            return this.mo
        }
        Dt() {
            return this.Mo || (this.Mo = Ks(this.mo)), this.Mo
        }
        s_(t) {
            this.mo.indexOf(t) === -1 && (this.mo.push(t), this.dl(), this.e_())
        }
        r_(t) {
            const i = this.mo.indexOf(t);
            if (i === -1) throw new Error("source is not attached to scale");
            this.mo.splice(i, 1), this.mo.length === 0 && (this.Vo({
                hs: !0
            }), this.Oo(null)), this.dl(), this.e_()
        }
        Lt() {
            let t = null;
            for (const i of this.mo) {
                const s = i.Lt();
                s !== null && (t === null || s.za < t.za) && (t = s)
            }
            return t === null ? null : t.Wt
        }
        zo() {
            return this.yn.invertScale
        }
        El() {
            const t = this.Lt() === null;
            if (this.bo !== null && (t || this.bo.h_ === t)) return this.bo.El;
            this.Ro.jl();
            const i = this.Ro.El();
            return this.bo = {
                El: i,
                h_: t
            }, this.po.p(), i
        }
        a_() {
            return this.po
        }
        l_(t) {
            this.je() || this.Lo() || this.So === null && this.lo === null && (this.Gi() || (this.So = this.ho - t, this.lo = v(this.ar()).Xe()))
        }
        o_(t) {
            if (this.je() || this.Lo() || this.So === null) return;
            this.Vo({
                hs: !1
            }), (t = this.ho - t) < 0 && (t = 0);
            let i = (this.So + .2 * (this.ho - 1)) / (t + .2 * (this.ho - 1));
            const s = v(this.lo).Xe();
            i = Math.max(i, .1), s.ir(i), this.Oo(s)
        }
        __() {
            this.je() || this.Lo() || (this.So = null, this.lo = null)
        }
        u_(t) {
            this.Eo() || this.xo === null && this.lo === null && (this.Gi() || (this.xo = t, this.lo = v(this.ar()).Xe()))
        }
        c_(t) {
            if (this.Eo() || this.xo === null) return;
            const i = v(this.ar()).tr() / (this.Ho() - 1);
            let s = t - this.xo;
            this.zo() && (s *= -1);
            const e = s * i,
                h = v(this.lo).Xe();
            h.nr(e), this.Oo(h, !0), this.bo = null
        }
        d_() {
            this.Eo() || this.xo !== null && (this.xo = null, this.lo = null)
        }
        tl() {
            return this.il || this.dl(), this.il
        }
        Ji(t, i) {
            switch (this.yn.mode) {
                case 2:
                    return this.f_(it(t, i));
                case 3:
                    return this.tl().format(ct(t, i));
                default:
                    return this.cr(t)
            }
        }
        no(t) {
            switch (this.yn.mode) {
                case 2:
                    return this.f_(t);
                case 3:
                    return this.tl().format(t);
                default:
                    return this.cr(t)
            }
        }
        Ql(t) {
            switch (this.yn.mode) {
                case 2:
                    return this.p_(t);
                case 3:
                    return this.tl().formatTickmarks(t);
                default:
                    return this.v_(t)
            }
        }
        xa(t) {
            return this.cr(t, v(this.wo).tl())
        }
        Ca(t, i) {
            return t = it(t, i), this.f_(t, Di)
        }
        m_() {
            return this.mo
        }
        w_(t) {
            this.oo = {
                uo: t,
                _o: !1
            }
        }
        Nn() {
            this.mo.forEach((t => t.Nn()))
        }
        Kl() {
            return this.yn.ensureEdgeTickMarksVisible && this.Eo()
        }
        Gl() {
            return this.k() / 2
        }
        dl() {
            this.bo = null;
            let t = 1 / 0;
            this.wo = null;
            for (const s of this.mo) s.ln() < t && (t = s.ln(), this.wo = s);
            let i = 100;
            this.wo !== null && (i = Math.round(this.wo.Kh())), this.il = Ki, this.je() ? (this.il = Di, i = 100) : this.Lo() ? (this.il = new Wt(100, 1), i = 100) : this.wo !== null && (this.il = this.wo.tl()), this.Ro = new Fi(this, i, this.Do.bind(this), this.Io.bind(this)), this.Ro.jl()
        }
        e_() {
            this.Mo = null
        }
        M_() {
            return this.wo === null || this.je() || this.Lo() ? 1 : 1 / this.wo.Kh()
        }
        Xi() {
            return this.To
        }
        Yo(t) {
            this.co = t
        }
        Uo() {
            return this.zo() ? this.yn.scaleMargins.bottom * this.$t() + this.fo : this.yn.scaleMargins.top * this.$t() + this.do
        }
        $o() {
            return this.zo() ? this.yn.scaleMargins.top * this.$t() + this.do : this.yn.scaleMargins.bottom * this.$t() + this.fo
        }
        jo() {
            this.oo._o || (this.oo._o = !0, this.g_())
        }
        Bo() {
            this.ao = null
        }
        Io(t, i) {
            if (this.jo(), this.Gi()) return 0;
            t = this.so() && t ? It(t, this.Co) : t;
            const s = v(this.ar()),
                e = this.$o() + (this.Ho() - 1) * (t - s.Je()) / s.tr();
            return this.Ko(e)
        }
        Do(t, i) {
            if (this.jo(), this.Gi()) return 0;
            const s = this.Ko(t),
                e = v(this.ar()),
                h = e.Je() + e.tr() * ((s - this.$o()) / (this.Ho() - 1));
            return this.so() ? dt(h, this.Co) : h
        }
        No() {
            this.bo = null, this.Ro.jl()
        }
        g_() {
            if (this.Ao() && !this.Eo()) return;
            const t = this.oo.uo;
            if (t === null) return;
            let i = null;
            const s = this.m_();
            let e = 0,
                h = 0;
            for (const o of s) {
                if (!o.It()) continue;
                const l = o.Lt();
                if (l === null) continue;
                const a = o.la(t.Oa(), t.bi());
                let u = a && a.ar();
                if (u !== null) {
                    switch (this.yn.mode) {
                        case 1:
                            u = lt(u, this.Co);
                            break;
                        case 2:
                            u = nh(u, l.Wt);
                            break;
                        case 3:
                            u = rh(u, l.Wt)
                    }
                    if (i = i === null ? u : i.Ss(v(u)), a !== null) {
                        const c = a.lr();
                        c !== null && (e = Math.max(e, c.above), h = Math.max(h, c.below))
                    }
                }
            }
            if (this.Kl() && (e = Math.max(e, this.Gl()), h = Math.max(h, this.Gl())), e === this.do && h === this.fo || (this.do = e, this.fo = h, this.bo = null, this.Bo()), i !== null) {
                if (i.Je() === i.Qe()) {
                    const o = 5 * this.M_();
                    this.so() && (i = st(i, this.Co)), i = new R(i.Je() - o, i.Qe() + o), this.so() && (i = lt(i, this.Co))
                }
                if (this.so()) {
                    const o = st(i, this.Co),
                        l = Ht(o);
                    if (n = l, r = this.Co, n.Al !== r.Al || n.Ll !== r.Ll) {
                        const a = this.lo !== null ? st(this.lo, this.Co) : null;
                        this.Co = l, i = lt(o, l), a !== null && (this.lo = lt(a, l))
                    }
                }
                this.Oo(i)
            } else this.rr === null && (this.Oo(new R(-.5, .5)), this.Co = Ht(null));
            var n, r
        }
        Go() {
            return this.je() ? it : this.Lo() ? ct : this.so() ? t => It(t, this.Co) : null
        }
        b_(t, i, s) {
            return i === void 0 ? (s === void 0 && (s = this.tl()), s.format(t)) : i(t)
        }
        S_(t, i, s) {
            return i === void 0 ? (s === void 0 && (s = this.tl()), s.formatTickmarks(t)) : i(t)
        }
        cr(t, i) {
            return this.b_(t, this.Po.priceFormatter, i)
        }
        v_(t, i) {
            const s = this.Po.priceFormatter;
            return this.S_(t, this.Po.tickmarksPriceFormatter ? ? (s ? e => e.map(s) : void 0), i)
        }
        f_(t, i) {
            return this.b_(t, this.Po.percentageFormatter, i)
        }
        p_(t, i) {
            const s = this.Po.percentageFormatter;
            return this.S_(t, this.Po.tickmarksPercentageFormatter ? ? (s ? e => e.map(s) : void 0), i)
        }
    };

function Vi(t) {
    return t instanceof Ft
}
var ai = class {
    constructor(t, i) {
        this.mo = [], this.x_ = new Map, this.ho = 0, this.C_ = 0, this.y_ = 1, this.Mo = null, this.k_ = null, this.P_ = !1, this.T_ = new T, this.fa = [], this.ia = t, this.sn = i, this.R_ = new hh(this);
        const s = i.N();
        this.D_ = this.I_("left", s.leftPriceScale), this.V_ = this.I_("right", s.rightPriceScale), this.D_.Fo().i(this.B_.bind(this, this.D_), this), this.V_.Fo().i(this.B_.bind(this, this.V_), this), this.E_(s)
    }
    E_(t) {
        if (t.leftPriceScale && this.D_.vr(t.leftPriceScale), t.rightPriceScale && this.V_.vr(t.rightPriceScale), t.localization && (this.D_.dl(), this.V_.dl()), t.overlayPriceScales) {
            const i = Array.from(this.x_.values());
            for (const s of i) {
                const e = v(s[0].Ft());
                e.vr(t.overlayPriceScales), t.localization && e.dl()
            }
        }
    }
    A_(t) {
        switch (t) {
            case "left":
                return this.D_;
            case "right":
                return this.V_
        }
        return this.x_.has(t) ? N(this.x_.get(t))[0].Ft() : null
    }
    m() {
        this.Qt().L_().u(this), this.D_.Fo().u(this), this.V_.Fo().u(this), this.mo.forEach((t => {
            t.m && t.m()
        })), this.fa = this.fa.filter((t => {
            const i = t.Qh();
            return i.detached && i.detached(), !1
        })), this.T_.p()
    }
    z_() {
        return this.y_
    }
    O_(t) {
        this.y_ = t
    }
    Qt() {
        return this.sn
    }
    nn() {
        return this.C_
    }
    $t() {
        return this.ho
    }
    N_(t) {
        this.C_ = t, this.F_()
    }
    Wo(t) {
        this.ho = t, this.D_.Wo(t), this.V_.Wo(t), this.mo.forEach((i => {
            if (this.Zs(i)) {
                const s = i.Ft();
                s !== null && s.Wo(t)
            }
        })), this.F_()
    }
    W_(t) {
        this.P_ = t
    }
    H_() {
        return this.P_
    }
    U_() {
        return this.mo.filter(Vi)
    }
    Cl() {
        return this.mo
    }
    Zs(t) {
        const i = t.Ft();
        return i === null || this.D_ !== i && this.V_ !== i
    }
    s_(t, i, s) {
        this.j_(t, i, s ? t.ln() : this.mo.length)
    }
    r_(t, i) {
        const s = this.mo.indexOf(t);
        z(s !== -1, "removeDataSource: invalid data source"), this.mo.splice(s, 1), i || this.mo.forEach(((n, r) => n._n(r)));
        const e = v(t.Ft()).cl();
        if (this.x_.has(e)) {
            const n = N(this.x_.get(e)),
                r = n.indexOf(t);
            r !== -1 && (n.splice(r, 1), n.length === 0 && this.x_.delete(e))
        }
        const h = t.Ft();
        h && h.Cl().indexOf(t) >= 0 && (h.r_(t), this.q_(h)), this.Y_()
    }
    Xs(t) {
        return t === this.D_ ? "left" : t === this.V_ ? "right" : "overlay"
    }
    K_() {
        return this.D_
    }
    Z_() {
        return this.V_
    }
    G_(t, i) {
        t.l_(i)
    }
    X_(t, i) {
        t.o_(i), this.F_()
    }
    J_(t) {
        t.__()
    }
    Q_(t, i) {
        t.u_(i)
    }
    tu(t, i) {
        t.c_(i), this.F_()
    }
    iu(t) {
        t.d_()
    }
    F_() {
        this.mo.forEach((t => {
            t.Nn()
        }))
    }
    Pn() {
        const [t, i] = this.nu();
        let s = null;
        return t.N().visible && t.Cl().length !== 0 ? s = t : i.N().visible && i.Cl().length !== 0 ? s = i : this.mo.length !== 0 && (s = this.mo[0].Ft()), s === null && (s = this.Gs() ? ? t), s
    }
    Gs() {
        const [t, i] = this.nu();
        return t.N().visible ? t : i.N().visible ? i : null
    }
    q_(t) {
        t !== null && t.Eo() && this.su(t)
    }
    eu(t) {
        const i = this.ia.Ee();
        t.Vo({
            hs: !0
        }), i !== null && t.w_(i), this.F_()
    }
    ru() {
        this.su(this.D_), this.su(this.V_)
    }
    hu() {
        this.q_(this.D_), this.q_(this.V_), this.mo.forEach((t => {
            this.Zs(t) && this.q_(t.Ft())
        })), this.F_(), this.sn.mr()
    }
    Dt() {
        return this.Mo === null && (this.Mo = Ks(this.mo)), this.Mo
    }
    au() {
        const t = this.Dt(),
            i = this.sn.ou() ? .lu,
            s = this.sn.N().hoveredSeriesOnTop,
            e = this.k_;
        if (e !== null && e.Kh === t && e._u === i && e.uu === s) return e.cu;
        const h = (function(n, r, o) {
            if (!o) return n;
            const l = n.indexOf(r);
            if (l === -1 || l === n.length - 1) return n;
            const a = [];
            for (let u = 0; u < n.length; u++) u !== l && a.push(n[u]);
            return a.push(n[l]), a
        })(t, i, s);
        return this.k_ = {
            Kh: t,
            _u: i,
            uu: s,
            cu: h
        }, h
    }
    du(t, i) {
        i = et(i, 0, this.mo.length - 1);
        const s = this.mo.indexOf(t);
        z(s !== -1, "setSeriesOrder: invalid data source"), this.mo.splice(s, 1), this.mo.splice(i, 0, t), this.mo.forEach(((e, h) => e._n(h))), this.Y_();
        for (const e of [this.D_, this.V_]) e.e_(), e.dl();
        this.sn.mr()
    }
    Vt() {
        return this.Dt().filter(Vi)
    }
    fu() {
        return this.T_
    }
    pu() {
        return this.R_
    }
    hl(t) {
        this.fa.push(new Ye(t))
    }
    al(t) {
        this.fa = this.fa.filter((i => i.Qh() !== t)), t.detached && t.detached(), this.sn.mr()
    }
    vu() {
        return this.fa
    }
    Ja(t, i) {
        return this.fa.map((s => s.Qs(t, i))).filter((s => s !== null))
    }
    su(t) {
        const i = t.m_();
        if (i && i.length > 0 && !this.ia.Gi()) {
            const s = this.ia.Ee();
            s !== null && t.w_(s)
        }
        t.Nn()
    }
    j_(t, i, s) {
        let e = this.A_(i);
        if (e === null && (e = this.I_(i, this.sn.N().overlayPriceScales)), this.mo.splice(s, 0, t), !qt(i)) {
            const h = this.x_.get(i) || [];
            h.push(t), this.x_.set(i, h)
        }
        t._n(s), e.s_(t), t.un(e), this.q_(e), this.Y_()
    }
    Y_() {
        this.Mo = null, this.k_ = null
    }
    nu() {
        return this.sn.N().defaultVisiblePriceScaleId === "left" ? [this.D_, this.V_] : [this.V_, this.D_]
    }
    B_(t, i, s) {
        i._e !== s._e && this.su(t)
    }
    I_(t, i) {
        const s = new oh(t, {
            visible: !0,
            autoScale: !0,
            ...B(i)
        }, this.sn.N().layout, this.sn.N().localization, this.sn.Xi());
        return s.Wo(this.$t()), s
    }
};

function ui(t, i) {
    return i === null || t.se === 2 && i.se !== 2 || (i.se !== 2 || t.se === 2) && t.ne !== i.ne && t.ne < i.ne
}

function Vs(t) {
    return {
        te: t.te,
        ie: t.ie
    }
}

function lh(t) {
    return {
        ne: t.distance ? ? 0,
        se: t.hitTestPriority ? ? (t.itemType === "marker" ? 2 : 0),
        ee: t.itemType ? ? "primitive",
        mu: t.cursorStyle,
        te: t.externalId
    }
}

function _t(t) {
    return {
        lu: t.lu,
        wu: Vs(t.Mu),
        mu: t.Mu.mu,
        ee: t.Mu.ee ? ? "primitive"
    }
}

function ah(t, i, s, e) {
    let h = null;
    for (const n of t) {
        let r = n.Qs ? .(i, s, e) ? ? null;
        if (r === null) {
            const o = n.Tt(e);
            r = o !== null && o.Qs ? o.Qs(i, s) : null
        }
        if (r !== null) {
            const o = {
                gu: n,
                Mu: r
            };
            (h === null || ui(o.Mu, h.Mu)) && (h = o)
        }
    }
    return h
}

function uh(t) {
    return t.jn !== void 0
}

function $s(t, i, s) {
    const e = [t, ...t.Dt()].reverse(),
        h = (function(o, l, a) {
            let u, c, d;
            for (const p of o) {
                const g = p.Ja ? .(l, a) ? ? [];
                for (const w of g) {
                    const M = lh(w);
                    f = w.zOrder, m = u ? .zOrder, (!m || f === "top" && m !== "top" || f === "normal" && m === "bottom" || w.zOrder === u ? .zOrder && c !== void 0 && ui(M, c) || w.zOrder === u ? .zOrder && c === void 0) && (u = w, c = M, d = p)
                }
            }
            var f, m;
            return u && d && c ? {
                Mu: c,
                bu: u,
                lu: d
            } : null
        })(e, i, s);
    if (h ? .bu.zOrder === "top") return _t(h);
    let n = null,
        r = null;
    for (const o of e) {
        if (h && h.lu === o && h.bu.zOrder !== "bottom" && !h.bu.isBackground) return n ? ? _t(h);
        if (uh(o)) {
            const l = ah(o.jn(t), i, s, t);
            if (l !== null) {
                const a = {
                    lu: o,
                    gu: l.gu,
                    wu: Vs(l.Mu),
                    mu: l.Mu.mu,
                    ee: l.Mu.ee ? ? "primitive"
                };
                (n === null || ui(l.Mu, r)) && (n = a, r = l.Mu)
            }
        }
        if (h && h.lu === o && h.bu.zOrder !== "bottom" && h.bu.isBackground) return n ? ? _t(h)
    }
    return n !== null ? n : h ? .bu ? _t(h) : null
}
var ch = class {
        constructor(t, i, s = 50) {
            this.Vs = 0, this.Bs = 1, this.Es = 1, this.Ls = new Map, this.As = new Map, this.Su = t, this.xu = i, this.zs = s
        }
        Cu(t) {
            const i = t.time,
                s = this.xu.cacheKey(i),
                e = this.Ls.get(s);
            if (e !== void 0) return e.yu;
            if (this.Vs === this.zs) {
                const n = this.As.get(this.Es);
                this.As.delete(this.Es), this.Ls.delete(N(n)), this.Es++, this.Vs--
            }
            const h = this.Su(t);
            return this.Ls.set(s, {
                yu: h,
                Ws: this.Bs
            }), this.As.set(this.Bs, s), this.Vs++, this.Bs++, h
        }
    },
    ht = class {
        constructor(t, i) {
            z(t <= i, "right should be >= left"), this.ku = t, this.Pu = i
        }
        Oa() {
            return this.ku
        }
        bi() {
            return this.Pu
        }
        Tu() {
            return this.Pu - this.ku + 1
        }
        ze(t) {
            return this.ku <= t && t <= this.Pu
        }
        Ge(t) {
            return this.ku === t.Oa() && this.Pu === t.bi()
        }
    };

function $i(t, i) {
    return t === null || i === null ? t === i : t.Ge(i)
}
var dh = class {
        constructor() {
            this.Ru = new Map, this.Ls = null, this.Du = !1
        }
        Iu(t) {
            this.Du = t, this.Ls = null
        }
        Vu(t, i) {
            this.Bu(i), this.Ls = null;
            for (let s = i; s < t.length; ++s) {
                const e = t[s];
                let h = this.Ru.get(e.timeWeight);
                h === void 0 && (h = [], this.Ru.set(e.timeWeight, h)), h.push({
                    index: s,
                    time: e.time,
                    weight: e.timeWeight,
                    originalTime: e.originalTime
                })
            }
        }
        Eu(t, i, s, e, h) {
            const n = Math.ceil(i / t);
            return this.Ls !== null && this.Ls.Au === n && h === this.Ls.Lu && s === this.Ls.zu || (this.Ls = {
                Lu: h,
                zu: s,
                El: this.Ou(n, s, e),
                Au: n
            }), this.Ls.El
        }
        Bu(t) {
            if (t === 0) return void this.Ru.clear();
            const i = [];
            this.Ru.forEach(((s, e) => {
                t <= s[0].index ? i.push(e) : s.splice(H(s, t, (h => h.index < t)), 1 / 0)
            }));
            for (const s of i) this.Ru.delete(s)
        }
        Ou(t, i, s) {
            let e = [];
            const h = n => !i || s.has(n.index);
            for (const n of Array.from(this.Ru.keys()).sort(((r, o) => o - r))) {
                if (!this.Ru.get(n)) continue;
                const r = e;
                e = [];
                const o = r.length;
                let l = 0;
                const a = N(this.Ru.get(n)),
                    u = a.length;
                let c = 1 / 0,
                    d = -1 / 0;
                for (let f = 0; f < u; f++) {
                    const m = a[f],
                        p = m.index;
                    for (; l < o;) {
                        const g = r[l],
                            w = g.index;
                        if (!(w < p && h(g))) {
                            c = w;
                            break
                        }
                        l++, e.push(g), d = w, c = 1 / 0
                    }
                    if (c - p >= t && p - d >= t && h(m)) e.push(m), d = p;
                    else if (this.Du) return r
                }
                for (; l < o; l++) h(r[l]) && e.push(r[l])
            }
            return e
        }
    },
    kt = class Ys {
        constructor(i) {
            this.Nu = i
        }
        Fu() {
            return this.Nu === null ? null : new ht(Math.floor(this.Nu.Oa()), Math.ceil(this.Nu.bi()))
        }
        Wu() {
            return this.Nu
        }
        static Hu() {
            return new Ys(null)
        }
    };

function fh(t, i) {
    return t.weight > i.weight ? t : i
}
var mh = class {
        constructor(t, i, s, e) {
            this.C_ = 0, this.Uu = null, this.$u = [], this.xo = null, this.So = null, this.ju = new dh, this.qu = new Map, this.Yu = kt.Hu(), this.Ku = !0, this.Zu = new T, this.Gu = new T, this.Xu = new T, this.Ju = null, this.Qu = null, this.tc = new Map, this.nc = -1, this.sc = [], this.ec = 1, this.yn = i, this.Po = s, this.rc = i.rightOffset, this.hc = i.barSpacing, this.sn = t, this.ac(i), this.xu = e, this.lc(), this.ju.Iu(i.uniformDistribution), this.oc(), this._c()
        }
        N() {
            return this.yn
        }
        uc(t) {
            P(this.Po, t), this.cc(), this.lc()
        }
        vr(t, i) {
            P(this.yn, t), this.yn.fixLeftEdge && this.dc(), this.yn.fixRightEdge && this.fc(), t.barSpacing !== void 0 && this.sn.Ms(t.barSpacing), t.rightOffset !== void 0 && this.sn.gs(t.rightOffset), this.ac(t), t.minBarSpacing === void 0 && t.maxBarSpacing === void 0 || this.sn.Ms(t.barSpacing ? ? this.hc), t.ignoreWhitespaceIndices !== void 0 && t.ignoreWhitespaceIndices !== this.yn.ignoreWhitespaceIndices && this._c(), this.cc(), this.lc(), t.enableConflation === void 0 && t.conflationThresholdFactor === void 0 || this.oc(), this.Xu.p()
        }
        Rn(t) {
            return this.$u[t] ? .time ? ? null
        }
        en(t) {
            return this.$u[t] ? ? null
        }
        vc(t, i) {
            if (this.$u.length < 1) return null;
            if (this.xu.key(t) > this.xu.key(this.$u[this.$u.length - 1].time)) return i ? this.$u.length - 1 : null;
            const s = H(this.$u, this.xu.key(t), ((e, h) => this.xu.key(e.time) < h));
            return this.xu.key(t) < this.xu.key(this.$u[s].time) ? i ? s : null : s
        }
        Gi() {
            return this.C_ === 0 || this.$u.length === 0 || this.Uu === null
        }
        mc() {
            return this.$u.length > 0
        }
        Ee() {
            return this.wc(), this.Yu.Fu()
        }
        Mc() {
            return this.wc(), this.Yu.Wu()
        }
        gc() {
            const t = this.Ee();
            if (t === null) return null;
            const i = {
                from: t.Oa(),
                to: t.bi()
            };
            return this.bc(i)
        }
        bc(t) {
            const i = Math.round(t.from),
                s = Math.round(t.to),
                e = v(this.Sc()),
                h = v(this.xc());
            return {
                from: v(this.en(Math.max(e, i))),
                to: v(this.en(Math.min(h, s)))
            }
        }
        Cc(t) {
            return {
                from: v(this.vc(t.from, !0)),
                to: v(this.vc(t.to, !0))
            }
        }
        nn() {
            return this.C_
        }
        N_(t) {
            if (!isFinite(t) || t <= 0 || this.C_ === t) return;
            const i = this.Mc(),
                s = this.C_;
            if (this.C_ = t, this.Ku = !0, this.yn.lockVisibleTimeRangeOnResize && s !== 0) {
                const e = this.hc * t / s;
                this.hc = e
            }
            if (this.yn.fixLeftEdge && i !== null && i.Oa() <= 0) {
                const e = s - t;
                this.rc -= Math.round(e / this.hc) + 1, this.Ku = !0
            }
            this.yc(), this.kc()
        }
        jt(t) {
            if (this.Gi() || !mt(t)) return 0;
            const i = this.Pc() + this.rc - t;
            return this.C_ - (i + .5) * this.hc - 1
        }
        Tc(t, i) {
            const s = this.Pc(),
                e = i === void 0 ? 0 : i.from,
                h = i === void 0 ? t.length : i.to;
            for (let n = e; n < h; n++) {
                const r = t[n].wt,
                    o = s + this.rc - r,
                    l = this.C_ - (o + .5) * this.hc - 1;
                t[n]._t = l
            }
        }
        Rc(t, i) {
            const s = Math.ceil(this.Dc(t));
            return i && this.yn.ignoreWhitespaceIndices && !this.Ic(s) ? this.Vc(s) : s
        }
        gs(t) {
            this.Ku = !0, this.rc = t, this.kc(), this.sn.Bc(), this.sn.mr()
        }
        fl() {
            return this.hc
        }
        Ms(t) {
            const i = this.hc;
            if (this.Ec(t), this.yn.rightOffsetPixels !== void 0 && i !== 0) {
                const s = this.rc * i / this.hc;
                this.rc = s
            }
            this.kc(), this.sn.Bc(), this.sn.mr()
        }
        Ac() {
            return this.rc
        }
        El() {
            if (this.Gi()) return null;
            if (this.Qu !== null) return this.Qu;
            const t = this.hc,
                i = 5 * (this.sn.N().layout.fontSize + 4) / 8 * (this.yn.tickMarkMaxCharacterLength || 8),
                s = Math.round(i / t),
                e = v(this.Ee()),
                h = Math.max(e.Oa(), e.Oa() - s),
                n = Math.max(e.bi(), e.bi() - s),
                r = this.ju.Eu(t, i, this.yn.ignoreWhitespaceIndices, this.tc, this.nc),
                o = this.Sc() + s,
                l = this.xc() - s,
                a = this.Lc(),
                u = this.yn.fixLeftEdge || a,
                c = this.yn.fixRightEdge || a;
            let d = 0;
            for (const f of r) {
                if (!(h <= f.index && f.index <= n)) continue;
                let m;
                d < this.sc.length ? (m = this.sc[d], m.coord = this.jt(f.index), m.label = this.zc(f), m.weight = f.weight) : (m = {
                    needAlignCoordinate: !1,
                    coord: this.jt(f.index),
                    label: this.zc(f),
                    weight: f.weight
                }, this.sc.push(m)), this.hc > i / 2 && !a ? m.needAlignCoordinate = !1 : m.needAlignCoordinate = u && f.index <= o || c && f.index >= l, d++
            }
            return this.sc.length = d, this.Qu = this.sc, this.sc
        }
        Oc() {
            let t;
            this.Ku = !0, this.Ms(this.yn.barSpacing), t = this.yn.rightOffsetPixels !== void 0 ? this.yn.rightOffsetPixels / this.fl() : this.yn.rightOffset, this.gs(t)
        }
        Nc(t) {
            this.Ku = !0, this.Uu = t, this.kc(), this.dc()
        }
        Fc(t, i) {
            const s = this.Dc(t),
                e = this.fl(),
                h = e + i * (e / 10);
            this.Ms(h), this.yn.rightBarStaysOnScroll || this.gs(this.Ac() + (s - this.Dc(t)))
        }
        l_(t) {
            this.xo && this.d_(), this.So === null && this.Ju === null && (this.Gi() || (this.So = t, this.Wc()))
        }
        o_(t) {
            if (this.Ju === null) return;
            const i = et(this.C_ - t, 0, this.C_),
                s = et(this.C_ - v(this.So), 0, this.C_);
            i !== 0 && s !== 0 && this.Ms(this.Ju.fl * i / s)
        }
        __() {
            this.So !== null && (this.So = null, this.Hc())
        }
        u_(t) {
            this.xo === null && this.Ju === null && (this.Gi() || (this.xo = t, this.Wc()))
        }
        c_(t) {
            if (this.xo === null) return;
            const i = (this.xo - t) / this.fl();
            this.rc = v(this.Ju).Ac + i, this.Ku = !0, this.kc()
        }
        d_() {
            this.xo !== null && (this.xo = null, this.Hc())
        }
        Uc() {
            this.$c(this.yn.rightOffset)
        }
        $c(t, i = 400) {
            if (!isFinite(t)) throw new RangeError("offset is required and must be finite number");
            if (!isFinite(i) || i <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");
            const s = this.rc,
                e = performance.now();
            this.sn.ps({
                jc: h => (h - e) / i >= 1,
                qc: h => {
                    const n = (h - e) / i;
                    return n >= 1 ? t : s + (t - s) * n
                }
            })
        }
        kt(t, i) {
            this.Ku = !0, this.$u = t, this.ju.Vu(t, i), this.kc()
        }
        Yc() {
            return this.Zu
        }
        Kc() {
            return this.Gu
        }
        Zc() {
            return this.Xu
        }
        Pc() {
            return this.Uu || 0
        }
        Gc(t, i) {
            const s = t.Tu(),
                e = i && this.yn.rightOffsetPixels || 0;
            this.Ec((this.C_ - e) / s), this.rc = t.bi() - this.Pc(), i && (this.rc = e ? e / this.fl() : this.yn.rightOffset), this.kc(), this.Ku = !0, this.sn.Bc(), this.sn.mr()
        }
        Xc() {
            const t = this.Sc(),
                i = this.xc();
            if (t === null || i === null) return;
            const s = !this.yn.rightOffsetPixels && this.yn.rightOffset || 0;
            this.Gc(new ht(t, i + s), !0)
        }
        Jc(t) {
            const i = new ht(t.from, t.to);
            this.Gc(i)
        }
        rn(t) {
            return this.Po.timeFormatter !== void 0 ? this.Po.timeFormatter(t.originalTime) : this.xu.formatHorzItem(t.time)
        }
        _c() {
            if (!this.yn.ignoreWhitespaceIndices) return;
            this.tc.clear();
            const t = this.sn.Jn();
            for (const i of t)
                for (const s of i.ul()) this.tc.set(s, !0);
            this.nc++
        }
        Qc() {
            return this.ec
        }
        Ml() {
            const t = 1 / (window.devicePixelRatio || 1),
                i = this.yn.minBarSpacing;
            if (i >= t) return [1];
            const s = [1];
            let e = 2;
            for (; e <= 512;) i < t / e && s.push(e), e *= 2;
            return s
        }
        Lc() {
            const t = this.sn.N().handleScroll,
                i = this.sn.N().handleScale;
            return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch)
        }
        Sc() {
            return this.$u.length === 0 ? null : 0
        }
        xc() {
            return this.$u.length === 0 ? null : this.$u.length - 1
        }
        td(t) {
            return (this.C_ - 1 - t) / this.hc
        }
        Dc(t) {
            const i = this.td(t),
                s = this.Pc() + this.rc - i;
            return Math.round(1e6 * s) / 1e6
        }
        Ec(t) {
            const i = this.hc;
            this.hc = t, this.yc(), i !== this.hc && (this.Ku = !0, this.nd(), this.oc())
        }
        wc() {
            if (!this.Ku) return;
            if (this.Ku = !1, this.Gi()) return void this.sd(kt.Hu());
            const t = this.Pc(),
                i = this.C_ / this.hc,
                s = this.rc + t,
                e = new ht(s - i + 1, s);
            this.sd(new kt(e))
        }
        yc() {
            const t = et(this.hc, this.ed(), this.rd());
            this.hc !== t && (this.hc = t, this.Ku = !0)
        }
        rd() {
            return this.yn.maxBarSpacing > 0 ? this.yn.maxBarSpacing : .5 * this.C_
        }
        ed() {
            return this.yn.fixLeftEdge && this.yn.fixRightEdge && this.$u.length !== 0 ? this.C_ / this.$u.length : this.yn.minBarSpacing
        }
        oc() {
            if (!this.yn.enableConflation) return void(this.ec = 1);
            const t = 1 / (window.devicePixelRatio || 1) * (this.yn.conflationThresholdFactor ? ? 1);
            if (this.hc >= t) return void(this.ec = 1);
            const i = t / this.hc,
                s = Math.pow(2, Math.floor(Math.log2(i)));
            this.ec = Math.min(s, 512)
        }
        kc() {
            const t = this.hd();
            t !== null && this.rc < t && (this.rc = t, this.Ku = !0);
            const i = this.ad();
            this.rc > i && (this.rc = i, this.Ku = !0)
        }
        hd() {
            const t = this.Sc(),
                i = this.Uu;
            return t === null || i === null ? null : t - i - 1 + (this.yn.fixLeftEdge ? this.C_ / this.hc : Math.min(2, this.$u.length))
        }
        ad() {
            return this.yn.fixRightEdge ? 0 : this.C_ / this.hc - Math.min(2, this.$u.length)
        }
        Wc() {
            this.Ju = {
                fl: this.fl(),
                Ac: this.Ac()
            }
        }
        Hc() {
            this.Ju = null
        }
        zc(t) {
            let i = this.qu.get(t.weight);
            return i === void 0 && (i = new ch((s => this.ld(s)), this.xu), this.qu.set(t.weight, i)), i.Cu(t)
        }
        ld(t) {
            return this.xu.formatTickmark(t, this.Po)
        }
        sd(t) {
            const i = this.Yu;
            this.Yu = t, $i(i.Fu(), this.Yu.Fu()) || this.Zu.p(), $i(i.Wu(), this.Yu.Wu()) || this.Gu.p(), this.nd()
        }
        nd() {
            this.Qu = null
        }
        cc() {
            this.nd(), this.qu.clear()
        }
        lc() {
            this.xu.updateFormatter(this.Po)
        }
        dc() {
            if (!this.yn.fixLeftEdge) return;
            const t = this.Sc();
            if (t === null) return;
            const i = this.Ee();
            if (i === null) return;
            const s = i.Oa() - t;
            if (s < 0) {
                const e = this.rc - s - 1;
                this.gs(e)
            }
            this.yc()
        }
        fc() {
            this.kc(), this.yc()
        }
        Ic(t) {
            return !this.yn.ignoreWhitespaceIndices || this.tc.get(t) || !1
        }
        Vc(t) {
            const i = (function*(e) {
                    const h = Math.round(e),
                        n = h < e;
                    let r = 1;
                    for (;;) n ? (yield h + r, yield h - r) : (yield h - r, yield h + r), r++
                })(t),
                s = this.xc();
            for (; s;) {
                const e = i.next().value;
                if (this.tc.get(e)) return e;
                if (e < 0 || e > s) break
            }
            return t
        }
        ac(t) {
            if (t.rightOffsetPixels !== void 0) {
                const i = t.rightOffsetPixels / (t.barSpacing || this.hc);
                this.sn.gs(i)
            }
        }
    },
    Yi, Zi, Ai, Gi, Hi;
(function(t) {
    t[t.OnTouchEnd = 0] = "OnTouchEnd", t[t.OnNextTap = 1] = "OnNextTap"
})(Yi || (Yi = {}));
var vh = class {
    constructor(t, i, s) {
        this.od = [], this._d = [], this.ud = null, this.C_ = 0, this.dd = null, this.fd = new T, this.pd = new T, this.vd = null, this.md = t, this.yn = i, this.xu = s, this.To = new ce(this.yn.layout.colorParsers), this.wd = new ue(this), this.ia = new mh(this, i.timeScale, this.yn.localization, s), this.Ct = new Se(this, i.crosshair), this.Md = new ih(i.crosshair), i.addDefaultPane && (this.gd(0), this.od[0].O_(2)), this.bd = this.Sd(0), this.xd = this.Sd(1)
    }
    Pa() {
        this.Cd(k.ys())
    }
    mr() {
        this.Cd(k.Cs())
    }
    qa() {
        this.Cd(new k(1))
    }
    Ta(t) {
        const i = this.yd(t);
        this.Cd(i)
    }
    ou() {
        return this.dd
    }
    kd(t) {
        if (this.dd ? .lu === t ? .lu && this.dd ? .wu ? .te === t ? .wu ? .te && this.dd ? .wu ? .ie === t ? .wu ? .ie && this.dd ? .mu === t ? .mu && this.dd ? .ee === t ? .ee) return;
        const i = this.dd;
        this.dd = t, i !== null && this.Ta(i.lu), t !== null && t.lu !== i ? .lu && this.Ta(t.lu)
    }
    N() {
        return this.yn
    }
    vr(t) {
        P(this.yn, t), this.od.forEach((i => i.E_(t))), t.timeScale !== void 0 && this.ia.vr(t.timeScale), t.localization !== void 0 && this.ia.uc(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.fd.p(), this.bd = this.Sd(0), this.xd = this.Sd(1), this.Pa()
    }
    Pd(t, i, s = 0) {
        const e = this.od[s];
        if (e === void 0) return;
        if (t === "left") return P(this.yn, {
            leftPriceScale: i
        }), e.E_({
            leftPriceScale: i
        }), this.fd.p(), void this.Pa();
        if (t === "right") return P(this.yn, {
            rightPriceScale: i
        }), e.E_({
            rightPriceScale: i
        }), this.fd.p(), void this.Pa();
        const h = this.Td(t, s);
        h !== null && (h.Ft.vr(i), this.fd.p())
    }
    Td(t, i) {
        const s = this.od[i];
        if (s === void 0) return null;
        const e = s.A_(t);
        return e !== null ? {
            Kn: s,
            Ft: e
        } : null
    }
    Et() {
        return this.ia
    }
    Zn() {
        return this.od
    }
    Rd() {
        return this.Ct
    }
    Dd() {
        return this.pd
    }
    Id(t, i) {
        t.Wo(i), this.Bc()
    }
    N_(t) {
        this.C_ = t, this.ia.N_(this.C_), this.od.forEach((i => i.N_(t))), this.Bc()
    }
    Vd(t) {
        this.od.length !== 1 && (z(t >= 0 && t < this.od.length, "Invalid pane index"), this.od.splice(t, 1), this.Pa())
    }
    Bd(t, i) {
        if (this.od.length < 2) return;
        z(t >= 0 && t < this.od.length, "Invalid pane index");
        const s = this.od[t],
            e = this.od.reduce(((u, c) => u + c.z_()), 0),
            h = this.od.reduce(((u, c) => u + c.$t()), 0),
            n = h - 30 * (this.od.length - 1);
        i = Math.min(n, Math.max(30, i));
        const r = e / h,
            o = s.$t();
        s.O_(i * r);
        let l = i - o,
            a = this.od.length - 1;
        for (const u of this.od)
            if (u !== s) {
                const c = Math.min(n, Math.max(30, u.$t() - l / a));
                l -= u.$t() - c, a -= 1;
                const d = c * r;
                u.O_(d)
            }
        this.Pa()
    }
    Ed(t, i) {
        z(t >= 0 && t < this.od.length && i >= 0 && i < this.od.length, "Invalid pane index");
        const s = this.od[t],
            e = this.od[i];
        this.od[t] = e, this.od[i] = s, this.Pa()
    }
    Ad(t, i) {
        if (z(t >= 0 && t < this.od.length && i >= 0 && i < this.od.length, "Invalid pane index"), t === i) return;
        const [s] = this.od.splice(t, 1);
        this.od.splice(i, 0, s), this.Pa()
    }
    G_(t, i, s) {
        t.G_(i, s)
    }
    X_(t, i, s) {
        t.X_(i, s), this.Ra(), this.Cd(this.Ld(t, 2))
    }
    J_(t, i) {
        t.J_(i), this.Cd(this.Ld(t, 2))
    }
    Q_(t, i, s) {
        i.Eo() || t.Q_(i, s)
    }
    tu(t, i, s) {
        i.Eo() || (t.tu(i, s), this.Ra(), this.Cd(this.Ld(t, 2)))
    }
    iu(t, i) {
        i.Eo() || (t.iu(i), this.Cd(this.Ld(t, 2)))
    }
    eu(t, i) {
        t.eu(i), this.Cd(this.Ld(t, 2))
    }
    zd(t) {
        this.ia.l_(t)
    }
    Od(t, i) {
        const s = this.Et();
        if (s.Gi() || i === 0) return;
        const e = s.nn();
        t = Math.max(1, Math.min(t, e)), s.Fc(t, i), this.Bc()
    }
    Nd(t) {
        this.Fd(0), this.Wd(t), this.Hd()
    }
    Ud(t) {
        this.ia.o_(t), this.Bc()
    }
    $d() {
        this.ia.__(), this.mr()
    }
    Fd(t) {
        this.ia.u_(t)
    }
    Wd(t) {
        this.ia.c_(t), this.Bc()
    }
    Hd() {
        this.ia.d_(), this.mr()
    }
    Jn() {
        return this._d
    }
    Wn() {
        return this.ud === null && (this.ud = this._d.filter((t => t.It()))), this.ud
    }
    ka() {
        this.ud = null
    }
    jd(t, i, s, e, h) {
        this.Ct.In(t, i);
        let n = NaN,
            r = this.ia.Rc(t, !0);
        const o = this.ia.Ee();
        o !== null && (r = Math.min(Math.max(o.Oa(), r), o.bi())), r = this.Ct.Fn(r);
        const l = e.Pn(),
            a = l.Lt();
        if (a !== null && (n = l.Tn(i, a)), n = this.Md.xl(n, r, e), this.Ct.An(r, n, e), this.qa(), !h) {
            const u = $s(e, t, i);
            this.kd(u && {
                lu: u.lu,
                wu: u.wu,
                mu: u.mu || null,
                ee: u.ee
            }), this.pd.p(this.Ct.Bt(), {
                x: t,
                y: i
            }, s)
        }
    }
    qd(t, i, s) {
        const e = s.Pn(),
            h = e.Lt(),
            n = e.Nt(t, v(h)),
            r = this.ia.vc(i, !0),
            o = this.ia.jt(v(r));
        this.jd(o, n, null, s, !0)
    }
    Yd(t) {
        this.Rd().zn(), this.qa(), t || this.pd.p(null, null, null)
    }
    Ra() {
        const t = this.Ct.Kn();
        if (t !== null) {
            const i = this.Ct.Bn(),
                s = this.Ct.En();
            this.jd(i, s, null, t)
        }
        this.Ct.Nn()
    }
    Kd(t, i, s) {
        const e = this.ia.Rn(0);
        i !== void 0 && s !== void 0 && this.ia.kt(i, s);
        const h = this.ia.Rn(0),
            n = this.ia.Pc(),
            r = this.ia.Ee();
        if (r !== null && e !== null && h !== null) {
            const o = r.ze(n),
                l = this.xu.key(e) > this.xu.key(h),
                a = t !== null && t > n && !l,
                u = this.ia.N().allowShiftVisibleRangeOnWhitespaceReplacement,
                c = o && (s !== void 0 || u) && this.ia.N().shiftVisibleRangeOnNewBar;
            if (a && !c) {
                const d = t - n;
                this.ia.gs(this.ia.Ac() - d)
            }
        }
        this.ia.Nc(t)
    }
    Va(t) {
        t !== null && t.hu()
    }
    Ks(t) {
        if ((function(s) {
                return s instanceof ai
            })(t)) return t;
        const i = this.od.find((s => s.Dt().includes(t)));
        return i === void 0 ? null : i
    }
    Bc() {
        this.od.forEach((t => t.hu())), this.Ra()
    }
    m() {
        this.od.forEach((t => t.m())), this.od.length = 0, this.yn.localization.priceFormatter = void 0, this.yn.localization.percentageFormatter = void 0, this.yn.localization.timeFormatter = void 0
    }
    Zd() {
        return this.wd
    }
    Js() {
        return this.wd.N()
    }
    L_() {
        return this.fd
    }
    Gd(t, i) {
        const s = this.gd(i);
        this.Xd(t, s), this._d.push(t), this.ka(), this._d.length === 1 ? this.Pa() : this.mr()
    }
    Jd(t) {
        const i = this.Ks(t),
            s = this._d.indexOf(t);
        z(s !== -1, "Series not found");
        const e = v(i);
        this._d.splice(s, 1), e.r_(t), t.m && t.m(), this.ka(), this.ia._c(), this.Qd(e)
    }
    ya(t, i) {
        const s = v(this.Ks(t));
        s.r_(t, !0), s.s_(t, i, !0)
    }
    Xc() {
        const t = k.Cs();
        t.us(), this.Cd(t)
    }
    tf(t) {
        const i = k.Cs();
        i.fs(t), this.Cd(i)
    }
    ws() {
        const t = k.Cs();
        t.ws(), this.Cd(t)
    }
    Ms(t) {
        const i = k.Cs();
        i.Ms(t), this.Cd(i)
    }
    gs(t) {
        const i = k.Cs();
        i.gs(t), this.Cd(i)
    }
    ps(t) {
        const i = k.Cs();
        i.ps(t), this.Cd(i)
    }
    cs() {
        const t = k.Cs();
        t.cs(), this.Cd(t)
    }
    if () {
        const t = this.yn.defaultVisiblePriceScaleId,
            i = this.yn.leftPriceScale.visible;
        return i !== this.yn.rightPriceScale.visible ? i ? "left" : "right" : t
    }
    nf(t, i) {
        if (z(i >= 0, "Index should be greater or equal to 0"), i === this.sf(t)) return;
        const s = v(this.Ks(t));
        s.r_(t);
        const e = this.gd(i);
        this.Xd(t, e);
        let h = !1;
        s.Cl().length === 0 && (h = this.Qd(s)), h || this.Pa()
    }
    ef() {
        return this.xd
    }
    $() {
        return this.bd
    }
    Ut(t) {
        const i = this.xd,
            s = this.bd;
        if (i === s) return i;
        if (t = Math.max(0, Math.min(100, Math.round(100 * t))), this.vd === null || this.vd.ah !== s || this.vd.oh !== i) this.vd = {
            ah: s,
            oh: i,
            rf: new Map
        };
        else {
            const h = this.vd.rf.get(t);
            if (h !== void 0) return h
        }
        const e = this.To.tt(s, i, t / 100);
        return this.vd.rf.set(t, e), e
    }
    hf(t) {
        return this.od.indexOf(t)
    }
    Xi() {
        return this.To
    }
    af() {
        return this.lf()
    }
    lf(t) {
        const i = new ai(this.ia, this);
        this.od.push(i);
        const s = t ? ? this.od.length - 1,
            e = k.ys();
        return e.es(s, {
            rs: 0,
            hs: !0
        }), this.Cd(e), i
    }
    gd(t) {
        return z(t >= 0, "Index should be greater or equal to 0"), (t = Math.min(this.od.length, t)) < this.od.length ? this.od[t] : this.lf(t)
    }
    sf(t) {
        return this.od.findIndex((i => i.U_().includes(t)))
    }
    Ld(t, i) {
        const s = new k(i);
        if (t !== null) {
            const e = this.od.indexOf(t);
            s.es(e, {
                rs: i
            })
        }
        return s
    }
    yd(t, i) {
        return i === void 0 && (i = 2), this.Ld(this.Ks(t), i)
    }
    Cd(t) {
        this.md && this.md(t), this.od.forEach((i => i.pu().wr().kt()))
    }
    Xd(t, i) {
        const s = t.N().priceScaleId,
            e = s !== void 0 ? s : this.if();
        i.s_(t, e), qt(e) || t.vr(t.N())
    }
    Sd(t) {
        const i = this.yn.layout;
        return i.background.type === "gradient" ? t === 0 ? i.background.topColor : i.background.bottomColor : i.background.color
    }
    Qd(t) {
        return !t.H_() && t.Cl().length === 0 && this.od.length > 1 && (this.od.splice(this.hf(t), 1), this.Pa(), !0)
    }
};

function Zs(t) {
    if (t >= 1) return 0;
    let i = 0;
    for (; i < 8; i++) {
        if (Math.abs(Math.round(t) - t) < 1e-8) return i;
        t *= 10
    }
    return i
}

function ci(t) {
    return !G(t) && !wt(t)
}

function As(t) {
    return G(t)
}(function(t) {
    t[t.Disabled = 0] = "Disabled", t[t.Continuous = 1] = "Continuous", t[t.OnDataUpdate = 2] = "OnDataUpdate"
})(Zi || (Zi = {})), (function(t) {
    t[t.LastBar = 0] = "LastBar", t[t.LastVisible = 1] = "LastVisible"
})(Ai || (Ai = {})), (function(t) {
    t.Solid = "solid", t.VerticalGradient = "gradient"
})(Gi || (Gi = {})), (function(t) {
    t[t.Year = 0] = "Year", t[t.Month = 1] = "Month", t[t.DayOfMonth = 2] = "DayOfMonth", t[t.Time = 3] = "Time", t[t.TimeWithSeconds = 4] = "TimeWithSeconds"
})(Hi || (Hi = {}));
var Ui = t => t.getUTCFullYear();

function ph(t, i, s) {
    return i.replace(/yyyy/g, (e => q(Ui(e), 4))(t)).replace(/yy/g, (e => q(Ui(e) % 100, 2))(t)).replace(/MMMM/g, ((e, h) => new Date(e.getUTCFullYear(), e.getUTCMonth(), 1).toLocaleString(h, {
        month: "long"
    }))(t, s)).replace(/MMM/g, ((e, h) => new Date(e.getUTCFullYear(), e.getUTCMonth(), 1).toLocaleString(h, {
        month: "short"
    }))(t, s)).replace(/MM/g, (e => q((h => h.getUTCMonth() + 1)(e), 2))(t)).replace(/dd/g, (e => q((h => h.getUTCDate())(e), 2))(t))
}
var Gs = class {
        constructor(t = "yyyy-MM-dd", i = "default") {
            this._f = t, this.uf = i
        }
        Cu(t) {
            return ph(t, this._f, this.uf)
        }
    },
    gh = class {
        constructor(t) {
            this.cf = t || "%h:%m:%s"
        }
        Cu(t) {
            return this.cf.replace("%h", q(t.getUTCHours(), 2)).replace("%m", q(t.getUTCMinutes(), 2)).replace("%s", q(t.getUTCSeconds(), 2))
        }
    },
    wh = {
        df: "yyyy-MM-dd",
        ff: "%h:%m:%s",
        pf: " ",
        vf: "default"
    },
    bh = class {
        constructor(t = {}) {
            const i = { ...wh,
                ...t
            };
            this.mf = new Gs(i.df, i.vf), this.wf = new gh(i.ff), this.Mf = i.pf
        }
        Cu(t) {
            return `${this.mf.Cu(t)}${this.Mf}${this.wf.Cu(t)}`
        }
    };

function xt(t) {
    return 60 * t * 60 * 1e3
}

function jt(t) {
    return 60 * t * 1e3
}
var Ct = [{
        gf: (ji = 1, 1e3 * ji),
        bf: 10
    }, {
        gf: jt(1),
        bf: 20
    }, {
        gf: jt(5),
        bf: 21
    }, {
        gf: jt(30),
        bf: 22
    }, {
        gf: xt(1),
        bf: 30
    }, {
        gf: xt(3),
        bf: 31
    }, {
        gf: xt(6),
        bf: 32
    }, {
        gf: xt(12),
        bf: 33
    }],
    ji;

function Xi(t, i) {
    if (t.getUTCFullYear() !== i.getUTCFullYear()) return 70;
    if (t.getUTCMonth() !== i.getUTCMonth()) return 60;
    if (t.getUTCDate() !== i.getUTCDate()) return 50;
    for (let s = Ct.length - 1; s >= 0; --s)
        if (Math.floor(i.getTime() / Ct[s].gf) !== Math.floor(t.getTime() / Ct[s].gf)) return Ct[s].bf;
    return 0
}

function Xt(t) {
    let i = t;
    if (wt(t) && (i = Mi(t)), !ci(i)) throw new Error("time must be of type BusinessDay");
    const s = new Date(Date.UTC(i.year, i.month - 1, i.day, 0, 0, 0, 0));
    return {
        Sf: Math.round(s.getTime() / 1e3),
        xf: i
    }
}

function Ji(t) {
    if (!As(t)) throw new Error("time must be of type isUTCTimestamp");
    return {
        Sf: t
    }
}

function Mi(t) {
    const i = new Date(t);
    if (isNaN(i.getTime())) throw new Error(`Invalid date string=${t}, expected format=yyyy-mm-dd`);
    return {
        day: i.getUTCDate(),
        month: i.getUTCMonth() + 1,
        year: i.getUTCFullYear()
    }
}

function ts(t) {
    wt(t.time) && (t.time = Mi(t.time))
}
var is = class {
        options() {
            return this.yn
        }
        setOptions(t) {
            this.yn = t, this.updateFormatter(t.localization)
        }
        preprocessData(t) {
            Array.isArray(t) ? (function(i) {
                i.forEach(ts)
            })(t) : ts(t)
        }
        createConverterToInternalObj(t) {
            return v((function(i) {
                return i.length === 0 ? null : ci(i[0].time) || wt(i[0].time) ? Xt : Ji
            })(t))
        }
        key(t) {
            return typeof t == "object" && "Sf" in t ? t.Sf : this.key(this.convertHorzItemToInternal(t))
        }
        cacheKey(t) {
            const i = t;
            return i.xf === void 0 ? new Date(1e3 * i.Sf).getTime() : new Date(Date.UTC(i.xf.year, i.xf.month - 1, i.xf.day)).getTime()
        }
        convertHorzItemToInternal(t) {
            return As(i = t) ? Ji(i) : ci(i) ? Xt(i) : Xt(Mi(i));
            var i
        }
        updateFormatter(t) {
            if (!this.yn) return;
            const i = t.dateFormat;
            this.yn.timeScale.timeVisible ? this.Cf = new bh({
                df: i,
                ff: this.yn.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
                pf: "   ",
                vf: t.locale
            }) : this.Cf = new Gs(i, t.locale)
        }
        formatHorzItem(t) {
            const i = t;
            return this.Cf.Cu(new Date(1e3 * i.Sf))
        }
        formatTickmark(t, i) {
            const s = (function(h, n, r) {
                    switch (h) {
                        case 0:
                        case 10:
                            return n ? r ? 4 : 3 : 2;
                        case 20:
                        case 21:
                        case 22:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                            return n ? 3 : 2;
                        case 50:
                            return 2;
                        case 60:
                            return 1;
                        case 70:
                            return 0
                    }
                })(t.weight, this.yn.timeScale.timeVisible, this.yn.timeScale.secondsVisible),
                e = this.yn.timeScale;
            if (e.tickMarkFormatter !== void 0) {
                const h = e.tickMarkFormatter(t.originalTime, s, i.locale);
                if (h !== null) return h
            }
            return (function(h, n, r) {
                const o = {};
                switch (n) {
                    case 0:
                        o.year = "numeric";
                        break;
                    case 1:
                        o.month = "short";
                        break;
                    case 2:
                        o.day = "numeric";
                        break;
                    case 3:
                        o.hour12 = !1, o.hour = "2-digit", o.minute = "2-digit";
                        break;
                    case 4:
                        o.hour12 = !1, o.hour = "2-digit", o.minute = "2-digit", o.second = "2-digit"
                }
                const l = h.xf === void 0 ? new Date(1e3 * h.Sf) : new Date(Date.UTC(h.xf.year, h.xf.month - 1, h.xf.day));
                return new Date(l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate(), l.getUTCHours(), l.getUTCMinutes(), l.getUTCSeconds(), l.getUTCMilliseconds()).toLocaleString(r, o)
            })(t.time, s, i.locale)
        }
        maxTickMarkWeight(t) {
            let i = t.reduce(fh, t[0]).weight;
            return i > 30 && i < 50 && (i = 30), i
        }
        fillWeightsForPoints(t, i) {
            (function(s, e = 0) {
                if (s.length === 0) return;
                let h = e === 0 ? null : s[e - 1].time.Sf,
                    n = h !== null ? new Date(1e3 * h) : null,
                    r = 0;
                for (let o = e; o < s.length; ++o) {
                    const l = s[o],
                        a = new Date(1e3 * l.time.Sf);
                    n !== null && (l.timeWeight = Xi(a, n)), r += l.time.Sf - (h || l.time.Sf), h = l.time.Sf, n = a
                }
                if (e === 0 && s.length > 1) {
                    const o = Math.ceil(r / (s.length - 1)),
                        l = new Date(1e3 * (s[0].time.Sf - o));
                    s[0].timeWeight = Xi(new Date(1e3 * s[0].time.Sf), l)
                }
            })(t, i)
        }
        static yf(t) {
            return P({
                localization: {
                    dateFormat: "dd MMM 'yy"
                }
            }, t ? ? {})
        }
    },
    nt = typeof window < "u";

function ss() {
    return !!nt && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
}

function Jt() {
    return !!nt && /iPhone|iPad|iPod/.test(window.navigator.platform)
}

function Mh(t, i) {
    switch (t) {
        case "custom":
            return i !== void 0 ? "custom-object" : "series";
        case "price-line":
            return "custom-price-line";
        case "marker":
            return "series-marker";
        case "primitive":
            return "primitive";
        default:
            return "series"
    }
}

function di(t) {
    return t + t % 2
}

function yh(t) {
    nt && window.chrome !== void 0 && t.addEventListener("mousedown", (i => {
        if (i.button === 1) return i.preventDefault(), !1
    }))
}
var Ot = class {
    constructor(t, i, s) {
        this.kf = 0, this.Pf = null, this.Tf = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        }, this.Rf = 0, this.Df = null, this.If = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        }, this.Vf = null, this.Bf = !1, this.Ef = null, this.Af = null, this.Lf = !1, this.zf = !1, this.Of = !1, this.Nf = null, this.Ff = null, this.Wf = null, this.Hf = null, this.Uf = null, this.$f = null, this.jf = null, this.qf = 0, this.Yf = !1, this.Kf = !1, this.Zf = !1, this.Gf = 0, this.Xf = null, this.Jf = !Jt(), this.Qf = e => {
            this.tp(e)
        }, this.ip = e => {
            if (this.np(e)) {
                const h = this.sp(e);
                if (++this.Rf, this.Df && this.Rf > 1) {
                    const {
                        ep: n
                    } = this.rp(I(e), this.If);
                    n < 30 && !this.Of && this.hp(h, this.lp.ap), this.op()
                }
            } else {
                const h = this.sp(e);
                if (++this.kf, this.Pf && this.kf > 1) {
                    const {
                        ep: n
                    } = this.rp(I(e), this.Tf);
                    n < 5 && !this.zf && this._p(h, this.lp.up), this.cp()
                }
            }
        }, this.dp = t, this.lp = i, this.yn = s, this.fp()
    }
    m() {
        this.Nf !== null && (this.Nf(), this.Nf = null), this.Ff !== null && (this.Ff(), this.Ff = null), this.Hf !== null && (this.Hf(), this.Hf = null), this.Uf !== null && (this.Uf(), this.Uf = null), this.$f !== null && (this.$f(), this.$f = null), this.Wf !== null && (this.Wf(), this.Wf = null), this.pp(), this.cp()
    }
    vp(t) {
        this.Hf && this.Hf();
        const i = this.mp.bind(this);
        if (this.Hf = () => {
                this.dp.removeEventListener("mousemove", i)
            }, this.dp.addEventListener("mousemove", i), this.np(t)) return;
        const s = this.sp(t);
        this._p(s, this.lp.wp), this.Jf = !0
    }
    cp() {
        this.Pf !== null && clearTimeout(this.Pf), this.kf = 0, this.Pf = null, this.Tf = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        }
    }
    op() {
        this.Df !== null && clearTimeout(this.Df), this.Rf = 0, this.Df = null, this.If = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        }
    }
    mp(t) {
        if (this.Zf || this.Af !== null || this.np(t)) return;
        const i = this.sp(t);
        this._p(i, this.lp.Mp), this.Jf = !0
    }
    gp(t) {
        const i = ti(t.changedTouches, v(this.Xf));
        if (i === null || (this.Gf = Et(t), this.jf !== null) || this.Kf) return;
        this.Yf = !0;
        const {
            bp: s,
            Sp: e,
            ep: h
        } = this.rp(I(i), v(this.Af));
        if (this.Lf || !(h < 5)) {
            if (!this.Lf) {
                const n = .5 * s,
                    r = e >= n && !this.yn.xp(),
                    o = n > e && !this.yn.Cp();
                r || o || (this.Kf = !0), this.Lf = !0, this.Of = !0, this.pp(), this.op()
            }
            if (!this.Kf) {
                const n = this.sp(t, i);
                this.hp(n, this.lp.yp), J(t)
            }
        }
    }
    kp(t) {
        if (t.button !== 0) return;
        const {
            ep: i
        } = this.rp(I(t), v(this.Ef));
        if (i >= 5 && (this.zf = !0, this.cp()), this.zf) {
            const s = this.sp(t);
            this._p(s, this.lp.Pp)
        }
    }
    rp(t, i) {
        const s = Math.abs(i._t - t._t),
            e = Math.abs(i.ut - t.ut);
        return {
            bp: s,
            Sp: e,
            ep: s + e
        }
    }
    Tp(t) {
        let i = ti(t.changedTouches, v(this.Xf));
        if (i === null && t.touches.length === 0 && (i = t.changedTouches[0]), i === null) return;
        this.Xf = null, this.Gf = Et(t), this.pp(), this.Af = null, this.$f && (this.$f(), this.$f = null);
        const s = this.sp(t, i);
        if (this.hp(s, this.lp.Rp), ++this.Rf, this.Df && this.Rf > 1) {
            const {
                ep: e
            } = this.rp(I(i), this.If);
            e < 30 && !this.Of && this.hp(s, this.lp.ap), this.op()
        } else this.Of || (this.hp(s, this.lp.Dp), this.lp.Dp && J(t));
        this.Rf === 0 && J(t), t.touches.length === 0 && this.Bf && (this.Bf = !1, J(t))
    }
    tp(t) {
        if (t.button !== 0) return;
        const i = this.sp(t);
        if (this.Ef = null, this.Zf = !1, this.Uf && (this.Uf(), this.Uf = null), ss() && this.dp.ownerDocument.documentElement.removeEventListener("mouseleave", this.Qf), !this.np(t))
            if (this._p(i, this.lp.Ip), ++this.kf, this.Pf && this.kf > 1) {
                const {
                    ep: s
                } = this.rp(I(t), this.Tf);
                s < 5 && !this.zf && this._p(i, this.lp.up), this.cp()
            } else this.zf || this._p(i, this.lp.Vp)
    }
    pp() {
        this.Vf !== null && (clearTimeout(this.Vf), this.Vf = null)
    }
    Bp(t) {
        if (this.Xf !== null) return;
        const i = t.changedTouches[0];
        this.Xf = i.identifier, this.Gf = Et(t);
        const s = this.dp.ownerDocument.documentElement;
        this.Of = !1, this.Lf = !1, this.Kf = !1, this.Af = I(i), this.$f && (this.$f(), this.$f = null); {
            const h = this.gp.bind(this),
                n = this.Tp.bind(this);
            this.$f = () => {
                s.removeEventListener("touchmove", h), s.removeEventListener("touchend", n)
            }, s.addEventListener("touchmove", h, {
                passive: !1
            }), s.addEventListener("touchend", n, {
                passive: !1
            }), this.pp(), this.Vf = setTimeout(this.Ep.bind(this, t), 240)
        }
        const e = this.sp(t, i);
        this.hp(e, this.lp.Ap), this.Df || (this.Rf = 0, this.Df = setTimeout(this.op.bind(this), 500), this.If = I(i))
    }
    Lp(t) {
        if (t.button !== 0) return;
        const i = this.dp.ownerDocument.documentElement;
        ss() && i.addEventListener("mouseleave", this.Qf), this.zf = !1, this.Ef = I(t), this.Uf && (this.Uf(), this.Uf = null); {
            const e = this.kp.bind(this),
                h = this.tp.bind(this);
            this.Uf = () => {
                i.removeEventListener("mousemove", e), i.removeEventListener("mouseup", h)
            }, i.addEventListener("mousemove", e), i.addEventListener("mouseup", h)
        }
        if (this.Zf = !0, this.np(t)) return;
        const s = this.sp(t);
        this._p(s, this.lp.zp), this.Pf || (this.kf = 0, this.Pf = setTimeout(this.cp.bind(this), 500), this.Tf = I(t))
    }
    fp() {
        this.dp.addEventListener("mouseenter", this.vp.bind(this)), this.dp.addEventListener("touchcancel", this.pp.bind(this)); {
            const t = this.dp.ownerDocument,
                i = s => {
                    this.lp.Op && (s.composed && this.dp.contains(s.composedPath()[0]) || s.target && this.dp.contains(s.target) || this.lp.Op())
                };
            this.Ff = () => {
                t.removeEventListener("touchstart", i)
            }, this.Nf = () => {
                t.removeEventListener("mousedown", i)
            }, t.addEventListener("mousedown", i), t.addEventListener("touchstart", i, {
                passive: !0
            })
        }
        Jt() && (this.Wf = () => {
            this.dp.removeEventListener("dblclick", this.ip)
        }, this.dp.addEventListener("dblclick", this.ip)), this.dp.addEventListener("mouseleave", this.Np.bind(this)), this.dp.addEventListener("touchstart", this.Bp.bind(this), {
            passive: !0
        }), yh(this.dp), this.dp.addEventListener("mousedown", this.Lp.bind(this)), this.Fp(), this.dp.addEventListener("touchmove", (() => {}), {
            passive: !1
        })
    }
    Fp() {
        this.lp.Wp === void 0 && this.lp.Hp === void 0 && this.lp.Up === void 0 || (this.dp.addEventListener("touchstart", (t => this.$p(t.touches)), {
            passive: !0
        }), this.dp.addEventListener("touchmove", (t => {
            if (t.touches.length === 2 && this.jf !== null && this.lp.Hp !== void 0) {
                const i = es(t.touches[0], t.touches[1]) / this.qf;
                this.lp.Hp(this.jf, i), J(t)
            }
        }), {
            passive: !1
        }), this.dp.addEventListener("touchend", (t => {
            this.$p(t.touches)
        })))
    }
    $p(t) {
        t.length === 1 && (this.Yf = !1), t.length !== 2 || this.Yf || this.Bf ? this.jp() : this.qp(t)
    }
    qp(t) {
        const i = this.dp.getBoundingClientRect() || {
            left: 0,
            top: 0
        };
        this.jf = {
            _t: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
            ut: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
        }, this.qf = es(t[0], t[1]), this.lp.Wp !== void 0 && this.lp.Wp(), this.pp()
    }
    jp() {
        this.jf !== null && (this.jf = null, this.lp.Up !== void 0 && this.lp.Up())
    }
    Np(t) {
        if (this.Hf && this.Hf(), this.np(t) || !this.Jf) return;
        const i = this.sp(t);
        this._p(i, this.lp.Yp), this.Jf = !Jt()
    }
    Ep(t) {
        const i = ti(t.touches, v(this.Xf));
        if (i === null) return;
        const s = this.sp(t, i);
        this.hp(s, this.lp.Kp), this.Of = !0, this.Bf = !0
    }
    np(t) {
        return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : Et(t) < this.Gf + 500
    }
    hp(t, i) {
        i && i.call(this.lp, t)
    }
    _p(t, i) {
        i && i.call(this.lp, t)
    }
    sp(t, i) {
        const s = i || t,
            e = this.dp.getBoundingClientRect() || {
                left: 0,
                top: 0
            };
        return {
            clientX: s.clientX,
            clientY: s.clientY,
            pageX: s.pageX,
            pageY: s.pageY,
            screenX: s.screenX,
            screenY: s.screenY,
            localX: s.clientX - e.left,
            localY: s.clientY - e.top,
            ctrlKey: t.ctrlKey,
            altKey: t.altKey,
            shiftKey: t.shiftKey,
            metaKey: t.metaKey,
            Zp: !t.type.startsWith("mouse") && t.type !== "contextmenu" && t.type !== "click",
            Gp: t.type,
            Xp: s.target,
            gu: t.view,
            Jp: () => {
                t.type !== "touchstart" && J(t)
            }
        }
    }
};

function es(t, i) {
    const s = t.clientX - i.clientX,
        e = t.clientY - i.clientY;
    return Math.sqrt(s * s + e * e)
}

function J(t) {
    t.cancelable && t.preventDefault()
}

function I(t) {
    return {
        _t: t.pageX,
        ut: t.pageY
    }
}

function Et(t) {
    return t.timeStamp || performance.now()
}

function ti(t, i) {
    for (let s = 0; s < t.length; ++s)
        if (t[s].identifier === i) return t[s];
    return null
}
var Sh = class {
    constructor(t, i, s) {
        this.Qp = null, this.tv = null, this.iv = !0, this.nv = null, this.sv = t, this.ev = t.rv()[i], this.hv = t.rv()[s], this.av = document.createElement("tr"), this.av.style.height = "1px", this.lv = document.createElement("td"), this.lv.style.position = "relative", this.lv.style.padding = "0", this.lv.style.margin = "0", this.lv.setAttribute("colspan", "3"), this.ov(), this.av.appendChild(this.lv), this.iv = this.sv.N().layout.panes.enableResize, this.iv ? this._v() : (this.Qp = null, this.tv = null)
    }
    m() {
        this.tv !== null && this.tv.m()
    }
    uv() {
        return this.av
    }
    cv() {
        return _({
            width: this.ev.cv().width,
            height: 1
        })
    }
    dv() {
        return _({
            width: this.ev.dv().width,
            height: 1 * window.devicePixelRatio
        })
    }
    fv(t, i, s) {
        const e = this.dv();
        t.fillStyle = this.sv.N().layout.panes.separatorColor, t.fillRect(i, s, e.width, e.height)
    }
    kt() {
        this.ov(), this.sv.N().layout.panes.enableResize !== this.iv && (this.iv = this.sv.N().layout.panes.enableResize, this.iv ? this._v() : (this.Qp !== null && (this.lv.removeChild(this.Qp.pv), this.lv.removeChild(this.Qp.vv), this.Qp = null), this.tv !== null && (this.tv.m(), this.tv = null)))
    }
    _v() {
        const t = document.createElement("div"),
            i = t.style;
        i.position = "fixed", i.display = "none", i.zIndex = "49", i.top = "0", i.left = "0", i.width = "100%", i.height = "100%", i.cursor = "row-resize", this.lv.appendChild(t);
        const s = document.createElement("div"),
            e = s.style;
        e.position = "absolute", e.zIndex = "50", e.top = "-4px", e.height = "9px", e.width = "100%", e.backgroundColor = "", e.cursor = "row-resize", this.lv.appendChild(s);
        const h = {
            wp: this.mv.bind(this),
            Yp: this.wv.bind(this),
            zp: this.Mv.bind(this),
            Ap: this.Mv.bind(this),
            Pp: this.gv.bind(this),
            yp: this.gv.bind(this),
            Ip: this.bv.bind(this),
            Rp: this.bv.bind(this)
        };
        this.tv = new Ot(s, h, {
            xp: () => !1,
            Cp: () => !0
        }), this.Qp = {
            vv: s,
            pv: t
        }
    }
    ov() {
        this.lv.style.background = this.sv.N().layout.panes.separatorColor
    }
    mv(t) {
        this.Qp !== null && (this.Qp.vv.style.backgroundColor = this.sv.N().layout.panes.separatorHoverColor)
    }
    wv(t) {
        this.Qp !== null && this.nv === null && (this.Qp.vv.style.backgroundColor = "")
    }
    Mv(t) {
        if (this.Qp === null) return;
        const i = this.ev.Sv().z_() + this.hv.Sv().z_(),
            s = i / (this.ev.cv().height + this.hv.cv().height),
            e = 30 * s;
        i <= 2 * e || (this.nv = {
            xv: t.pageY,
            Cv: this.ev.Sv().z_(),
            yv: i - e,
            kv: i,
            Pv: s,
            Tv: e
        }, this.Qp.pv.style.display = "block")
    }
    gv(t) {
        const i = this.nv;
        if (i === null) return;
        const s = (t.pageY - i.xv) * i.Pv,
            e = et(i.Cv + s, i.Tv, i.yv);
        this.ev.Sv().O_(e), this.hv.Sv().O_(i.kv - e), this.sv.Qt().Pa()
    }
    bv(t) {
        this.nv !== null && this.Qp !== null && (this.nv = null, this.Qp.pv.style.display = "none")
    }
};

function ii(t, i) {
    return t.Rv - i.Rv
}

function si(t, i, s) {
    const e = (t.Rv - i.Rv) / (t.wt - i.wt);
    return Math.sign(e) * Math.min(Math.abs(e), s)
}
var _h = class {
        constructor(t, i, s, e) {
            this.Dv = null, this.Iv = null, this.Vv = null, this.Bv = null, this.Ev = null, this.Av = 0, this.Lv = 0, this.zv = t, this.Ov = i, this.Nv = s, this.ks = e
        }
        Fv(t, i) {
            if (this.Dv !== null) {
                if (this.Dv.wt === i) return void(this.Dv.Rv = t);
                if (Math.abs(this.Dv.Rv - t) < this.ks) return
            }
            this.Bv = this.Vv, this.Vv = this.Iv, this.Iv = this.Dv, this.Dv = {
                wt: i,
                Rv: t
            }
        }
        me(t, i) {
            if (this.Dv === null || this.Iv === null || i - this.Dv.wt > 50) return;
            let s = 0;
            const e = si(this.Dv, this.Iv, this.Ov),
                h = ii(this.Dv, this.Iv),
                n = [e],
                r = [h];
            if (s += h, this.Vv !== null) {
                const l = si(this.Iv, this.Vv, this.Ov);
                if (Math.sign(l) === Math.sign(e)) {
                    const a = ii(this.Iv, this.Vv);
                    if (n.push(l), r.push(a), s += a, this.Bv !== null) {
                        const u = si(this.Vv, this.Bv, this.Ov);
                        if (Math.sign(u) === Math.sign(e)) {
                            const c = ii(this.Vv, this.Bv);
                            n.push(u), r.push(c), s += c
                        }
                    }
                }
            }
            let o = 0;
            for (let l = 0; l < n.length; ++l) o += r[l] / s * n[l];
            Math.abs(o) < this.zv || (this.Ev = {
                Rv: t,
                wt: i
            }, this.Lv = o, this.Av = (function(l, a) {
                const u = Math.log(a);
                return Math.log(1 * u / -l) / u
            })(Math.abs(o), this.Nv))
        }
        qc(t) {
            const i = v(this.Ev),
                s = t - i.wt;
            return i.Rv + this.Lv * (Math.pow(this.Nv, s) - 1) / Math.log(this.Nv)
        }
        jc(t) {
            return this.Ev === null || this.Wv(t) === this.Av
        }
        Wv(t) {
            const i = t - v(this.Ev).wt;
            return Math.min(i, this.Av)
        }
    },
    xh = class {
        constructor(t, i) {
            this.Hv = void 0, this.Uv = void 0, this.$v = void 0, this.vn = !1, this.jv = t, this.qv = i, this.Yv()
        }
        kt() {
            this.Yv()
        }
        Kv() {
            this.Hv && this.jv.removeChild(this.Hv), this.Uv && this.jv.removeChild(this.Uv), this.Hv = void 0, this.Uv = void 0
        }
        Zv() {
            return this.vn !== this.Gv() || this.$v !== this.Xv()
        }
        Xv() {
            return this.qv.Qt().Xi().J(this.qv.N().layout.textColor) > 160 ? "dark" : "light"
        }
        Gv() {
            return this.qv.N().layout.attributionLogo
        }
        Jv() {
            const t = new URL(location.href);
            return t.hostname ? "&utm_source=" + t.hostname + t.pathname : ""
        }
        Yv() {
            this.Zv() && (this.Kv(), this.vn = this.Gv(), this.vn && (this.$v = this.Xv(), this.Uv = document.createElement("style"), this.Uv.innerText = "a#tv-attr-logo{--fill:#131722;--stroke:#fff;position:absolute;left:10px;bottom:10px;height:19px;width:35px;margin:0;padding:0;border:0;z-index:3;}a#tv-attr-logo[data-dark]{--fill:#D1D4DC;--stroke:#131722;}", this.Hv = document.createElement("a"), this.Hv.href = `https://www.tradingview.com/?utm_medium=lwc-link&utm_campaign=lwc-chart${this.Jv()}`, this.Hv.title = "Charting by TradingView", this.Hv.id = "tv-attr-logo", this.Hv.target = "_blank", this.Hv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="19" fill="none"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="var(--stroke)" d="M2 0H0v10h6v9h21.4l.5-1.3 6-15 1-2.7H23.7l-.5 1.3-.2.6a5 5 0 0 0-7-.9V0H2Zm20 17h4l5.2-13 .8-2h-7l-1 2.5-.2.5-1.5 3.8-.3.7V17Zm-.8-10a3 3 0 0 0 .7-2.7A3 3 0 1 0 16.8 7h4.4ZM14 7V2H2v6h6v9h4V7h2Z"/><path fill="var(--fill)" d="M14 2H2v6h6v9h6V2Zm12 15h-7l6-15h7l-6 15Zm-7-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="var(--stroke)" d="M0 0h35v19H0z"/></clipPath></defs></svg>', this.Hv.toggleAttribute("data-dark", this.$v === "dark"), this.jv.appendChild(this.Uv), this.jv.appendChild(this.Hv)))
        }
    };

function U(t, i) {
    const s = v(t.ownerDocument).createElement("canvas");
    t.appendChild(s);
    const e = re(s, {
        type: "device-pixel-content-box",
        options: {
            allowResizeObserver: !0
        },
        transform: (h, n) => ({
            width: Math.max(h.width, n.width),
            height: Math.max(h.height, n.height)
        })
    });
    return e.resizeCanvasElement(i), e
}

function j(t) {
    t.width = 1, t.height = 1, t.getContext("2d") ? .clearRect(0, 0, 1, 1)
}

function fi(t, i, s, e) {
    t.qh && t.qh(i, s, e)
}

function Nt(t, i, s, e) {
    t.st(i, s, e)
}

function mi(t, i, s, e) {
    const h = t(s, e);
    for (const n of h) {
        const r = n.Tt(e);
        r !== null && i(r)
    }
}

function ei(t, i) {
    return s => (function(e) {
        return e.Ft !== void 0
    })(s) ? (s.Ft() ? .cl() ? ? "") !== i ? [] : s.Ga ? .(t) ? ? [] : []
}

function hs(t, i, s, e) {
    if (!t.length) return;
    let h = 0;
    const n = t[0].$t(e, !0);
    let r = i === 1 ? s / 2 - (t[0].Hi() - n / 2) : t[0].Hi() - n / 2 - s / 2;
    r = Math.max(0, r);
    for (let o = 1; o < t.length; o++) {
        const l = t[o],
            a = t[o - 1],
            u = a.$t(e, !1),
            c = l.Hi(),
            d = a.Hi();
        if (i === 1 ? c > d - u : c < d + u) {
            const f = d - u * i;
            l.Ui(f);
            const m = f - i * u / 2;
            if ((i === 1 ? m < 0 : m > s) && r > 0) {
                const p = i === 1 ? -1 - m : m - s,
                    g = Math.min(p, r);
                for (let w = h; w < t.length; w++) t[w].Ui(t[w].Hi() + i * g);
                r -= g
            }
        } else h = o, r = i === 1 ? d - u - c : c - (d + u)
    }
}
var ns = class {
    constructor(t, i, s, e) {
        this.Ki = null, this.Qv = null, this.tm = !1, this.im = new gt(200), this.nm = null, this.sm = 0, this.rm = !1, this.hm = () => {
            this.rm || this.yt.am().Qt().mr()
        }, this.lm = () => {
            this.rm || this.yt.am().Qt().mr()
        }, this.yt = t, this.yn = i, this.ko = i.layout, this.wd = s, this.om = e === "left", this._m = ei("normal", e), this.um = ei("top", e), this.dm = ei("bottom", e), this.lv = document.createElement("div"), this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.lv.style.width = "25px", this.lv.style.left = "0", this.lv.style.position = "relative", this.fm = U(this.lv, _({
            width: 16,
            height: 16
        })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
        const h = this.fm.canvasElement;
        h.style.position = "absolute", h.style.zIndex = "1", h.style.left = "0", h.style.top = "0", this.pm = U(this.lv, _({
            width: 16,
            height: 16
        })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
        const n = this.pm.canvasElement;
        n.style.position = "absolute", n.style.zIndex = "2", n.style.left = "0", n.style.top = "0";
        const r = {
            zp: this.Mv.bind(this),
            Ap: this.Mv.bind(this),
            Pp: this.gv.bind(this),
            yp: this.gv.bind(this),
            Op: this.vm.bind(this),
            Ip: this.bv.bind(this),
            Rp: this.bv.bind(this),
            up: this.wm.bind(this),
            ap: this.wm.bind(this),
            wp: this.Mm.bind(this),
            Yp: this.wv.bind(this)
        };
        this.tv = new Ot(this.pm.canvasElement, r, {
            xp: () => !this.yn.handleScroll.vertTouchDrag,
            Cp: () => !0
        })
    }
    m() {
        this.tv.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), j(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), j(this.fm.canvasElement), this.fm.dispose(), this.Ki !== null && this.Ki.a_().u(this), this.Ki = null
    }
    uv() {
        return this.lv
    }
    k() {
        return this.ko.fontSize
    }
    gm() {
        const t = this.wd.N();
        return this.nm !== t.P && (this.im.Os(), this.nm = t.P), t
    }
    bm() {
        if (this.Ki === null) return 0;
        let t = 0;
        const i = this.gm(),
            s = v(this.fm.canvasElement.getContext("2d", {
                colorSpace: this.yt.am().N().layout.colorSpace
            }));
        s.save();
        const e = this.Ki.El();
        s.font = this.Sm(), e.length > 0 && (t = Math.max(this.im.Ii(s, e[0].io), this.im.Ii(s, e[e.length - 1].io)));
        const h = this.xm();
        for (let l = h.length; l--;) {
            const a = this.im.Ii(s, h[l].ri());
            a > t && (t = a)
        }
        const n = this.Ki.Lt();
        if (n !== null && this.Qv !== null && (r = this.yn.crosshair).mode !== 2 && r.horzLine.visible && r.horzLine.labelVisible) {
            const l = this.Ki.Tn(1, n),
                a = this.Ki.Tn(this.Qv.height - 2, n);
            t = Math.max(t, this.im.Ii(s, this.Ki.Ji(Math.floor(Math.min(l, a)) + .11111111111111, n)), this.im.Ii(s, this.Ki.Ji(Math.ceil(Math.max(l, a)) - .11111111111111, n)))
        }
        var r;
        s.restore();
        const o = t || 34;
        return di(Math.ceil(i.S + i.C + i.V + i.B + 5 + o))
    }
    Cm(t) {
        this.Qv !== null && Z(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`)
    }
    ym() {
        return v(this.Qv).width
    }
    un(t) {
        this.Ki !== t && (this.Ki !== null && this.Ki.a_().u(this), this.Ki = t, t.a_().i(this.po.bind(this), this))
    }
    Ft() {
        return this.Ki
    }
    Os() {
        const t = this.yt.Sv();
        this.yt.am().Qt().eu(t, v(this.Ft()))
    }
    km(t) {
        if (this.Qv === null) return;
        const i = {
            colorSpace: this.yt.am().N().layout.colorSpace
        };
        if (t !== 1) {
            this.Pm(), this.fm.applySuggestedBitmapSize();
            const e = A(this.fm, i);
            e !== null && (e.useBitmapCoordinateSpace((h => {
                this.Tm(h), this.Rm(h)
            })), this.yt.Dm(e, this.dm), this.Im(e), this.yt.Dm(e, this._m), this.Vm(e))
        }
        this.pm.applySuggestedBitmapSize();
        const s = A(this.pm, i);
        s !== null && (s.useBitmapCoordinateSpace((({
            context: e,
            bitmapSize: h
        }) => {
            e.clearRect(0, 0, h.width, h.height)
        })), this.Bm(s), this.yt.Dm(s, this.um))
    }
    dv() {
        return this.fm.bitmapSize
    }
    fv(t, i, s, e) {
        const h = this.dv();
        if (h.width > 0 && h.height > 0 && (t.drawImage(this.fm.canvasElement, i, s), e)) {
            const n = this.pm.canvasElement;
            t.drawImage(n, i, s)
        }
    }
    kt() {
        this.Ki ? .El()
    }
    Mv(t) {
        if (this.Ki === null || this.Ki.Gi() || !this.yn.handleScale.axisPressedMouseMove.price) return;
        const i = this.yt.am().Qt(),
            s = this.yt.Sv();
        this.tm = !0, i.G_(s, this.Ki, t.localY)
    }
    gv(t) {
        if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
        const i = this.yt.am().Qt(),
            s = this.yt.Sv(),
            e = this.Ki;
        i.X_(s, e, t.localY)
    }
    vm() {
        if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
        const t = this.yt.am().Qt(),
            i = this.yt.Sv(),
            s = this.Ki;
        this.tm && (this.tm = !1, t.J_(i, s))
    }
    bv(t) {
        if (this.Ki === null || !this.yn.handleScale.axisPressedMouseMove.price) return;
        const i = this.yt.am().Qt(),
            s = this.yt.Sv();
        this.tm = !1, i.J_(s, this.Ki)
    }
    wm(t) {
        this.yn.handleScale.axisDoubleClickReset.price && this.Os()
    }
    Mm(t) {
        this.Ki !== null && (!this.yt.am().Qt().N().handleScale.axisPressedMouseMove.price || this.Ki.je() || this.Ki.Lo() || this.Em(1))
    }
    wv(t) {
        this.Em(0)
    }
    xm() {
        const t = [],
            i = this.Ki === null ? void 0 : this.Ki;
        return (s => {
            for (let e = 0; e < s.length; ++e) {
                const h = s[e].qn(this.yt.Sv(), i);
                for (let n = 0; n < h.length; n++) t.push(h[n])
            }
        })(this.yt.Sv().Dt()), t
    }
    Tm({
        context: t,
        bitmapSize: i
    }) {
        const {
            width: s,
            height: e
        } = i, h = this.yt.Sv().Qt(), n = h.$(), r = h.ef();
        n === r ? Qt(t, 0, 0, s, e, n) : Rs(t, 0, 0, s, e, n, r)
    }
    Rm({
        context: t,
        bitmapSize: i,
        horizontalPixelRatio: s
    }) {
        if (this.Qv === null || this.Ki === null || !this.Ki.N().borderVisible) return;
        t.fillStyle = this.Ki.N().borderColor;
        const e = Math.max(1, Math.floor(this.gm().S * s));
        let h;
        h = this.om ? i.width - e : 0, t.fillRect(h, 0, e, i.height)
    }
    Im(t) {
        if (this.Qv === null || this.Ki === null) return;
        const i = this.Ki.El(),
            s = this.Ki.N(),
            e = this.gm(),
            h = this.om ? this.Qv.width - e.C : 0;
        s.borderVisible && s.ticksVisible && t.useBitmapCoordinateSpace((({
            context: n,
            horizontalPixelRatio: r,
            verticalPixelRatio: o
        }) => {
            n.fillStyle = s.borderColor;
            const l = Math.max(1, Math.floor(o)),
                a = Math.floor(.5 * o),
                u = Math.round(e.C * r);
            n.beginPath();
            for (const c of i) n.rect(Math.floor(h * r), Math.round(c.Rl * o) - a, u, l);
            n.fill()
        })), t.useMediaCoordinateSpace((({
            context: n
        }) => {
            n.font = this.Sm(), n.fillStyle = s.textColor ? ? this.ko.textColor, n.textAlign = this.om ? "right" : "left", n.textBaseline = "middle";
            const r = this.om ? Math.round(h - e.V) : Math.round(h + e.C + e.V),
                o = i.map((l => this.im.Di(n, l.io)));
            for (let l = i.length; l--;) {
                const a = i[l];
                n.fillText(a.io, r, a.Rl + o[l])
            }
        }))
    }
    Pm() {
        if (this.Qv === null || this.Ki === null) return;
        let t = this.Qv.height / 2;
        const i = [],
            s = this.Ki.Dt().slice(),
            e = this.yt.Sv(),
            h = this.gm();
        this.Ki === e.Gs() && this.yt.Sv().Dt().forEach((o => {
            e.Zs(o) && s.push(o)
        }));
        const n = this.Ki.Cl()[0],
            r = this.Ki;
        s.forEach((o => {
            const l = o.qn(e, r);
            l.forEach((a => {
                a.$i() && a.Wi() === null && (a.Ui(null), i.push(a))
            })), n === o && l.length > 0 && (t = l[0].Ei())
        })), this.Ki.N().alignLabels && this.Am(i, h, t)
    }
    Am(t, i, s) {
        if (this.Qv === null) return;
        const e = t.filter((n => n.Ei() <= s)),
            h = t.filter((n => n.Ei() > s));
        e.sort(((n, r) => r.Ei() - n.Ei())), e.length && h.length && h.push(e[0]), h.sort(((n, r) => n.Ei() - r.Ei()));
        for (const n of t) {
            const r = Math.floor(n.$t(i) / 2),
                o = n.Ei();
            o > -r && o < r && n.Ui(r), o > this.Qv.height - r && o < this.Qv.height + r && n.Ui(this.Qv.height - r)
        }
        hs(e, 1, this.Qv.height, i), hs(h, -1, this.Qv.height, i)
    }
    Vm(t) {
        if (this.Qv === null) return;
        const i = this.xm(),
            s = this.gm(),
            e = this.om ? "right" : "left";
        i.forEach((h => {
            h.ji() && h.Tt(v(this.Ki)).st(t, s, this.im, e)
        }))
    }
    Bm(t) {
        if (this.Qv === null || this.Ki === null) return;
        const i = this.yt.am().Qt(),
            s = [],
            e = this.yt.Sv(),
            h = i.Rd().qn(e, this.Ki);
        h.length && s.push(h);
        const n = this.gm(),
            r = this.om ? "right" : "left";
        s.forEach((o => {
            o.forEach((l => {
                l.Tt(v(this.Ki)).st(t, n, this.im, r)
            }))
        }))
    }
    Em(t) {
        this.lv.style.cursor = t === 1 ? "ns-resize" : "default"
    }
    po() {
        const t = this.bm();
        this.sm < t && this.yt.am().Qt().Pa(), this.sm = t
    }
    Sm() {
        return pt(this.ko.fontSize, this.ko.fontFamily)
    }
};

function Ch(t, i) {
    return t.Ka ? .(i) ? ? []
}

function rs(t, i) {
    return t.jn ? .(i) ? ? []
}

function os(t, i) {
    return t.cn ? .(i) ? ? []
}

function Eh(t, i) {
    return t.ja ? .(i) ? ? []
}
var Th = class Hs {
        constructor(i, s) {
            this.Qv = _({
                width: 0,
                height: 0
            }), this.Lm = null, this.zm = null, this.Om = null, this.Nm = null, this.Fm = !1, this.Wm = new T, this.Hm = new T, this.Um = 0, this.$m = !1, this.jm = null, this.qm = !1, this.Ym = null, this.Km = null, this.rm = !1, this.hm = () => {
                this.rm || this.Zm === null || this.sn().mr()
            }, this.lm = () => {
                this.rm || this.Zm === null || this.sn().mr()
            }, this.qv = i, this.Zm = s, this.Zm.fu().i(this.Gm.bind(this), this, !0), this.Xm = document.createElement("td"), this.Xm.style.padding = "0", this.Xm.style.position = "relative";
            const e = document.createElement("div");
            e.style.width = "100%", e.style.height = "100%", e.style.position = "relative", e.style.overflow = "hidden", this.Jm = document.createElement("td"), this.Jm.style.padding = "0", this.Qm = document.createElement("td"), this.Qm.style.padding = "0", this.Xm.appendChild(e), this.fm = U(e, _({
                width: 16,
                height: 16
            })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
            const h = this.fm.canvasElement;
            h.style.position = "absolute", h.style.zIndex = "1", h.style.left = "0", h.style.top = "0", this.pm = U(e, _({
                width: 16,
                height: 16
            })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
            const n = this.pm.canvasElement;
            n.style.position = "absolute", n.style.zIndex = "2", n.style.left = "0", n.style.top = "0", this.av = document.createElement("tr"), this.av.appendChild(this.Jm), this.av.appendChild(this.Xm), this.av.appendChild(this.Qm), this.tw(), this.tv = new Ot(this.pm.canvasElement, this, {
                xp: () => this.jm === null && !this.qv.N().handleScroll.vertTouchDrag,
                Cp: () => this.jm === null && !this.qv.N().handleScroll.horzTouchDrag
            })
        }
        m() {
            this.Lm !== null && this.Lm.m(), this.zm !== null && this.zm.m(), this.Om = null, this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), j(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), j(this.fm.canvasElement), this.fm.dispose(), this.Zm !== null && (this.Zm.fu().u(this), this.Zm.m()), this.tv.m()
        }
        Sv() {
            return v(this.Zm)
        }
        iw(i) {
            this.Zm !== null && this.Zm.fu().u(this), this.Zm = i, this.Zm !== null && this.Zm.fu().i(Hs.prototype.Gm.bind(this), this, !0), this.tw(), this.qv.rv().indexOf(this) === this.qv.rv().length - 1 ? (this.Om = this.Om ? ? new xh(this.Xm, this.qv), this.Om.kt()) : (this.Om ? .Kv(), this.Om = null)
        }
        am() {
            return this.qv
        }
        uv() {
            return this.av
        }
        tw() {
            if (this.Zm !== null && (this.nw(), this.sn().Jn().length !== 0)) {
                if (this.Lm !== null) {
                    const i = this.Zm.K_();
                    this.Lm.un(v(i))
                }
                if (this.zm !== null) {
                    const i = this.Zm.Z_();
                    this.zm.un(v(i))
                }
            }
        }
        sw() {
            this.Lm !== null && this.Lm.kt(), this.zm !== null && this.zm.kt()
        }
        z_() {
            return this.Zm !== null ? this.Zm.z_() : 0
        }
        O_(i) {
            this.Zm && this.Zm.O_(i)
        }
        wp(i) {
            if (!this.Zm) return;
            this.ew();
            const s = i.localX,
                e = i.localY;
            this.rw(s, e, i)
        }
        zp(i) {
            this.ew(), this.hw(), this.rw(i.localX, i.localY, i)
        }
        Mp(i) {
            if (!this.Zm) return;
            this.ew();
            const s = i.localX,
                e = i.localY;
            this.rw(s, e, i)
        }
        Vp(i) {
            this.Zm !== null && (this.ew(), this.rw(i.localX, i.localY, i), this.aw(i))
        }
        up(i) {
            this.Zm !== null && this.lw(this.Hm, i)
        }
        ap(i) {
            this.up(i)
        }
        Pp(i) {
            this.ew(), this.ow(i), this.rw(i.localX, i.localY, i)
        }
        Ip(i) {
            this.Zm !== null && (this.ew(), this.$m = !1, this._w(i))
        }
        Dp(i) {
            this.Zm !== null && this.aw(i)
        }
        Kp(i) {
            if (this.$m = !0, this.jm === null) {
                const s = {
                    x: i.localX,
                    y: i.localY
                };
                this.uw(s, s, i)
            }
        }
        Yp(i) {
            this.Zm !== null && (this.ew(), this.Zm.Qt().kd(null), this.cw())
        }
        dw() {
            return this.Wm
        }
        fw() {
            return this.Hm
        }
        Wp() {
            this.Um = 1, this.sn().cs()
        }
        Hp(i, s) {
            if (!this.qv.N().handleScale.pinch) return;
            const e = 5 * (s - this.Um);
            this.Um = s, this.sn().Od(i._t, e)
        }
        Ap(i) {
            this.$m = !1, this.qm = this.jm !== null, this.hw();
            const s = this.sn().Rd();
            this.jm !== null && s.It() && (this.Ym = {
                x: s.ni(),
                y: s.si()
            }, this.jm = {
                x: i.localX,
                y: i.localY
            })
        }
        yp(i) {
            if (this.Zm === null) return;
            const s = i.localX,
                e = i.localY;
            if (this.jm === null) this.ow(i);
            else {
                this.qm = !1;
                const h = v(this.Ym),
                    n = h.x + (s - this.jm.x),
                    r = h.y + (e - this.jm.y);
                this.rw(n, r, i)
            }
        }
        Rp(i) {
            this.am().N().trackingMode.exitMode === 0 && (this.qm = !0), this.pw(), this._w(i)
        }
        Qs(i, s) {
            const e = this.Zm;
            return e === null ? null : $s(e, i, s)
        }
        mw(i, s) {
            v(s === "left" ? this.Lm : this.zm).Cm(_({
                width: i,
                height: this.Qv.height
            }))
        }
        cv() {
            return this.Qv
        }
        Cm(i) {
            Z(this.Qv, i) || (this.Qv = i, this.rm = !0, this.fm.resizeCanvasElement(i), this.pm.resizeCanvasElement(i), this.rm = !1, this.Xm.style.width = i.width + "px", this.Xm.style.height = i.height + "px")
        }
        ww() {
            const i = v(this.Zm);
            i.q_(i.K_()), i.q_(i.Z_());
            for (const s of i.Cl())
                if (i.Zs(s)) {
                    const e = s.Ft();
                    e !== null && i.q_(e), s.Nn()
                }
            for (const s of i.vu()) s.Nn()
        }
        dv() {
            return this.fm.bitmapSize
        }
        fv(i, s, e, h) {
            const n = this.dv();
            if (n.width > 0 && n.height > 0 && (i.drawImage(this.fm.canvasElement, s, e), h)) {
                const r = this.pm.canvasElement;
                i !== null && i.drawImage(r, s, e)
            }
        }
        km(i) {
            if (i === 0 || this.Zm === null) return;
            i > 1 && this.ww(), this.Lm !== null && this.Lm.km(i), this.zm !== null && this.zm.km(i);
            const s = {
                colorSpace: this.qv.N().layout.colorSpace
            };
            if (i !== 1) {
                this.fm.applySuggestedBitmapSize();
                const h = A(this.fm, s);
                h !== null && (h.useBitmapCoordinateSpace((n => {
                    this.Tm(n)
                })), this.Zm && (this.Mw(h, Ch), this.gw(h), this.Mw(h, rs), this.Mw(h, os)))
            }
            this.pm.applySuggestedBitmapSize();
            const e = A(this.pm, s);
            e !== null && (e.useBitmapCoordinateSpace((({
                context: h,
                bitmapSize: n
            }) => {
                h.clearRect(0, 0, n.width, n.height)
            })), this.bw(e), this.Mw(e, Eh), this.Mw(e, os))
        }
        Sw() {
            return this.Lm
        }
        xw() {
            return this.zm
        }
        Dm(i, s) {
            this.Mw(i, s)
        }
        Gm() {
            this.Zm !== null && this.Zm.fu().u(this), this.Zm = null
        }
        aw(i) {
            this.lw(this.Wm, i)
        }
        lw(i, s) {
            const e = s.localX,
                h = s.localY;
            i.v() && i.p(this.sn().Et().Rc(e), {
                x: e,
                y: h
            }, s)
        }
        Tm({
            context: i,
            bitmapSize: s
        }) {
            const {
                width: e,
                height: h
            } = s, n = this.sn(), r = n.$(), o = n.ef();
            r === o ? Qt(i, 0, 0, e, h, o) : Rs(i, 0, 0, e, h, r, o)
        }
        gw(i) {
            const s = v(this.Zm),
                e = s.pu().wr().Tt(s);
            e !== null && e.st(i, !1)
        }
        bw(i) {
            this.Cw(i, rs, Nt, this.sn().Rd())
        }
        Mw(i, s) {
            const e = v(this.Zm),
                h = e.au(),
                n = e.vu();
            for (const r of n) this.Cw(i, s, fi, r);
            for (const r of h) this.Cw(i, s, fi, r);
            for (const r of n) this.Cw(i, s, Nt, r);
            for (const r of h) this.Cw(i, s, Nt, r)
        }
        Cw(i, s, e, h) {
            const n = v(this.Zm),
                r = n.Qt().ou(),
                o = r !== null && r.lu === h,
                l = r !== null && o && r.wu !== void 0 ? r.wu.ie : void 0;
            mi(s, (a => e(a, i, o, l)), h, n)
        }
        nw() {
            if (this.Zm === null) return;
            const i = this.qv,
                s = this.Zm.K_().N().visible,
                e = this.Zm.Z_().N().visible;
            s || this.Lm === null || (this.Jm.removeChild(this.Lm.uv()), this.Lm.m(), this.Lm = null), e || this.zm === null || (this.Qm.removeChild(this.zm.uv()), this.zm.m(), this.zm = null);
            const h = i.Qt().Zd();
            s && this.Lm === null && (this.Lm = new ns(this, i.N(), h, "left"), this.Jm.appendChild(this.Lm.uv())), e && this.zm === null && (this.zm = new ns(this, i.N(), h, "right"), this.Qm.appendChild(this.zm.uv()))
        }
        yw(i) {
            return i.Zp && this.$m || this.jm !== null
        }
        rw(i, s, e) {
            i = Math.max(0, Math.min(i, this.Qv.width - 1)), s = Math.max(0, Math.min(s, this.Qv.height - 1)), this.sn().jd(i, s, e, v(this.Zm))
        }
        cw() {
            this.sn().Yd()
        }
        pw() {
            this.qm && (this.jm = null, this.cw())
        }
        uw(i, s, e) {
            this.jm = i, this.qm = !1, this.rw(s.x, s.y, e);
            const h = this.sn().Rd();
            this.Ym = {
                x: h.ni(),
                y: h.si()
            }
        }
        sn() {
            return this.qv.Qt()
        }
        _w(i) {
            if (!this.Fm) return;
            const s = this.sn(),
                e = this.Sv();
            if (s.iu(e, e.Pn()), this.Nm = null, this.Fm = !1, s.Hd(), this.Km !== null) {
                const h = performance.now(),
                    n = s.Et();
                this.Km.me(n.Ac(), h), this.Km.jc(h) || s.ps(this.Km)
            }
        }
        ew() {
            this.jm = null
        }
        hw() {
            if (this.Zm) {
                if (this.sn().cs(), document.activeElement !== document.body && document.activeElement !== document.documentElement) v(document.activeElement).blur();
                else {
                    const i = document.getSelection();
                    i !== null && i.removeAllRanges()
                }!this.Zm.Pn().Gi() && this.sn().Et().Gi()
            }
        }
        ow(i) {
            if (this.Zm === null) return;
            const s = this.sn(),
                e = s.Et();
            if (e.Gi()) return;
            const h = this.qv.N(),
                n = h.handleScroll,
                r = h.kineticScroll;
            if ((!n.pressedMouseMove || i.Zp) && (!n.horzTouchDrag && !n.vertTouchDrag || !i.Zp)) return;
            const o = this.Zm.Pn(),
                l = performance.now();
            if (this.Nm !== null || this.yw(i) || (this.Nm = {
                    x: i.clientX,
                    y: i.clientY,
                    Sf: l,
                    kw: i.localX,
                    Pw: i.localY
                }), this.Nm !== null && !this.Fm && (this.Nm.x !== i.clientX || this.Nm.y !== i.clientY)) {
                if (i.Zp && r.touch || !i.Zp && r.mouse) {
                    const a = e.fl();
                    this.Km = new _h(.2 / a, 7 / a, .997, 15 / a), this.Km.Fv(e.Ac(), this.Nm.Sf)
                } else this.Km = null;
                o.Gi() || s.Q_(this.Zm, o, i.localY), s.Fd(i.localX), this.Fm = !0
            }
            this.Fm && (o.Gi() || s.tu(this.Zm, o, i.localY), s.Wd(i.localX), this.Km !== null && this.Km.Fv(e.Ac(), l))
        }
    },
    ls = class {
        constructor(t, i, s, e, h) {
            this.xt = !0, this.Qv = _({
                width: 0,
                height: 0
            }), this.hm = () => this.km(3), this.om = t === "left", this.wd = s.Zd, this.yn = i, this.Tw = e, this.Rw = h, this.lv = document.createElement("div"), this.lv.style.width = "25px", this.lv.style.height = "100%", this.lv.style.overflow = "hidden", this.fm = U(this.lv, _({
                width: 16,
                height: 16
            })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm)
        }
        m() {
            this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), j(this.fm.canvasElement), this.fm.dispose()
        }
        uv() {
            return this.lv
        }
        cv() {
            return this.Qv
        }
        Cm(t) {
            Z(this.Qv, t) || (this.Qv = t, this.fm.resizeCanvasElement(t), this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.xt = !0)
        }
        km(t) {
            if (t < 3 && !this.xt || this.Qv.width === 0 || this.Qv.height === 0) return;
            this.xt = !1, this.fm.applySuggestedBitmapSize();
            const i = A(this.fm, {
                colorSpace: this.yn.layout.colorSpace
            });
            i !== null && i.useBitmapCoordinateSpace((s => {
                this.Tm(s), this.Rm(s)
            }))
        }
        dv() {
            return this.fm.bitmapSize
        }
        fv(t, i, s) {
            const e = this.dv();
            e.width > 0 && e.height > 0 && t.drawImage(this.fm.canvasElement, i, s)
        }
        Rm({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e
        }) {
            if (!this.Tw()) return;
            t.fillStyle = this.yn.timeScale.borderColor;
            const h = Math.floor(this.wd.N().S * s),
                n = Math.floor(this.wd.N().S * e),
                r = this.om ? i.width - h : 0;
            t.fillRect(r, 0, h, n)
        }
        Tm({
            context: t,
            bitmapSize: i
        }) {
            Qt(t, 0, 0, i.width, i.height, this.Rw())
        }
    };

function yi(t) {
    return i => i.Xa ? .(t) ? ? []
}
var zh = yi("normal"),
    kh = yi("top"),
    Nh = yi("bottom"),
    Ph = class {
        constructor(t, i) {
            this.Dw = null, this.Iw = null, this.M = null, this.Vw = !1, this.Qv = _({
                width: 0,
                height: 0
            }), this.Bw = new T, this.im = new gt(5), this.rm = !1, this.hm = () => {
                this.rm || this.qv.Qt().mr()
            }, this.lm = () => {
                this.rm || this.qv.Qt().mr()
            }, this.qv = t, this.xu = i, this.yn = t.N().layout, this.Hv = document.createElement("tr"), this.Ew = document.createElement("td"), this.Ew.style.padding = "0", this.Aw = document.createElement("td"), this.Aw.style.padding = "0", this.lv = document.createElement("td"), this.lv.style.height = "25px", this.lv.style.padding = "0", this.Lw = document.createElement("div"), this.Lw.style.width = "100%", this.Lw.style.height = "100%", this.Lw.style.position = "relative", this.Lw.style.overflow = "hidden", this.lv.appendChild(this.Lw), this.fm = U(this.Lw, _({
                width: 16,
                height: 16
            })), this.fm.subscribeSuggestedBitmapSizeChanged(this.hm);
            const s = this.fm.canvasElement;
            s.style.position = "absolute", s.style.zIndex = "1", s.style.left = "0", s.style.top = "0", this.pm = U(this.Lw, _({
                width: 16,
                height: 16
            })), this.pm.subscribeSuggestedBitmapSizeChanged(this.lm);
            const e = this.pm.canvasElement;
            e.style.position = "absolute", e.style.zIndex = "2", e.style.left = "0", e.style.top = "0", this.Hv.appendChild(this.Ew), this.Hv.appendChild(this.lv), this.Hv.appendChild(this.Aw), this.zw(), this.qv.Qt().L_().i(this.zw.bind(this), this), this.tv = new Ot(this.pm.canvasElement, this, {
                xp: () => !0,
                Cp: () => !this.qv.N().handleScroll.horzTouchDrag
            })
        }
        m() {
            this.tv.m(), this.Dw !== null && this.Dw.m(), this.Iw !== null && this.Iw.m(), this.pm.unsubscribeSuggestedBitmapSizeChanged(this.lm), j(this.pm.canvasElement), this.pm.dispose(), this.fm.unsubscribeSuggestedBitmapSizeChanged(this.hm), j(this.fm.canvasElement), this.fm.dispose()
        }
        uv() {
            return this.Hv
        }
        Ow() {
            return this.Dw
        }
        Nw() {
            return this.Iw
        }
        zp(t) {
            if (this.Vw) return;
            this.Vw = !0;
            const i = this.qv.Qt();
            !i.Et().Gi() && this.qv.N().handleScale.axisPressedMouseMove.time && i.zd(t.localX)
        }
        Ap(t) {
            this.zp(t)
        }
        Op() {
            const t = this.qv.Qt();
            !t.Et().Gi() && this.Vw && (this.Vw = !1, this.qv.N().handleScale.axisPressedMouseMove.time && t.$d())
        }
        Pp(t) {
            const i = this.qv.Qt();
            !i.Et().Gi() && this.qv.N().handleScale.axisPressedMouseMove.time && i.Ud(t.localX)
        }
        yp(t) {
            this.Pp(t)
        }
        Ip() {
            this.Vw = !1;
            const t = this.qv.Qt();
            t.Et().Gi() && !this.qv.N().handleScale.axisPressedMouseMove.time || t.$d()
        }
        Rp() {
            this.Ip()
        }
        up() {
            this.qv.N().handleScale.axisDoubleClickReset.time && this.qv.Qt().ws()
        }
        ap() {
            this.up()
        }
        wp() {
            this.qv.Qt().N().handleScale.axisPressedMouseMove.time && this.Em(1)
        }
        Yp() {
            this.Em(0)
        }
        cv() {
            return this.Qv
        }
        Fw() {
            return this.Bw
        }
        Ww(t, i, s) {
            Z(this.Qv, t) || (this.Qv = t, this.rm = !0, this.fm.resizeCanvasElement(t), this.pm.resizeCanvasElement(t), this.rm = !1, this.lv.style.width = `${t.width}px`, this.lv.style.height = `${t.height}px`, this.Bw.p(t)), this.Dw !== null && this.Dw.Cm(_({
                width: i,
                height: t.height
            })), this.Iw !== null && this.Iw.Cm(_({
                width: s,
                height: t.height
            }))
        }
        Hw() {
            const t = this.Uw();
            return Math.ceil(t.S + t.C + t.k + t.A + t.I + t.$w)
        }
        kt() {
            this.qv.Qt().Et().El()
        }
        dv() {
            return this.fm.bitmapSize
        }
        fv(t, i, s, e) {
            const h = this.dv();
            if (h.width > 0 && h.height > 0 && (t.drawImage(this.fm.canvasElement, i, s), e)) {
                const n = this.pm.canvasElement;
                t.drawImage(n, i, s)
            }
        }
        km(t) {
            if (t === 0) return;
            const i = {
                colorSpace: this.yn.colorSpace
            };
            if (t !== 1) {
                this.fm.applySuggestedBitmapSize();
                const e = A(this.fm, i);
                e !== null && (e.useBitmapCoordinateSpace((h => {
                    this.Tm(h), this.Rm(h), this.jw(e, Nh)
                })), this.Im(e), this.jw(e, zh)), this.Dw !== null && this.Dw.km(t), this.Iw !== null && this.Iw.km(t)
            }
            this.pm.applySuggestedBitmapSize();
            const s = A(this.pm, i);
            s !== null && (s.useBitmapCoordinateSpace((({
                context: e,
                bitmapSize: h
            }) => {
                e.clearRect(0, 0, h.width, h.height)
            })), this.qw([...this.qv.Qt().Jn(), this.qv.Qt().Rd()], s), this.jw(s, kh))
        }
        jw(t, i) {
            const s = this.qv.Qt().Jn();
            for (const e of s) mi(i, (h => fi(h, t, !1, void 0)), e, void 0);
            for (const e of s) mi(i, (h => Nt(h, t, !1, void 0)), e, void 0)
        }
        Tm({
            context: t,
            bitmapSize: i
        }) {
            Qt(t, 0, 0, i.width, i.height, this.qv.Qt().ef())
        }
        Rm({
            context: t,
            bitmapSize: i,
            verticalPixelRatio: s
        }) {
            if (this.qv.N().timeScale.borderVisible) {
                t.fillStyle = this.Yw();
                const e = Math.max(1, Math.floor(this.Uw().S * s));
                t.fillRect(0, 0, i.width, e)
            }
        }
        Im(t) {
            const i = this.qv.Qt().Et(),
                s = i.El();
            if (!s || s.length === 0) return;
            const e = this.xu.maxTickMarkWeight(s),
                h = this.Uw(),
                n = i.N();
            n.borderVisible && n.ticksVisible && t.useBitmapCoordinateSpace((({
                context: r,
                horizontalPixelRatio: o,
                verticalPixelRatio: l
            }) => {
                r.strokeStyle = this.Yw(), r.fillStyle = this.Yw();
                const a = Math.max(1, Math.floor(o)),
                    u = Math.floor(.5 * o);
                r.beginPath();
                const c = Math.round(h.C * l);
                for (let d = s.length; d--;) {
                    const f = Math.round(s[d].coord * o);
                    r.rect(f - u, 0, a, c)
                }
                r.fill()
            })), t.useMediaCoordinateSpace((({
                context: r
            }) => {
                const o = h.S + h.C + h.A + h.k / 2;
                r.textAlign = "center", r.textBaseline = "middle", r.fillStyle = this.H(), r.font = this.Sm();
                for (const l of s)
                    if (l.weight < e) {
                        const a = l.needAlignCoordinate ? this.Kw(r, l.coord, l.label) : l.coord;
                        r.fillText(l.label, a, o)
                    }
                this.qv.N().timeScale.allowBoldLabels && (r.font = this.Zw());
                for (const l of s)
                    if (l.weight >= e) {
                        const a = l.needAlignCoordinate ? this.Kw(r, l.coord, l.label) : l.coord;
                        r.fillText(l.label, a, o)
                    }
            }))
        }
        Kw(t, i, s) {
            const e = this.im.Ii(t, s),
                h = e / 2,
                n = Math.floor(i - h) + .5;
            return n < 0 ? i += Math.abs(0 - n) : n + e > this.Qv.width && (i -= Math.abs(this.Qv.width - (n + e))), i
        }
        qw(t, i) {
            const s = this.Uw();
            for (const e of t)
                for (const h of e.dn()) h.Tt().st(i, s)
        }
        Yw() {
            return this.qv.N().timeScale.borderColor
        }
        H() {
            return this.yn.textColor
        }
        F() {
            return this.yn.fontSize
        }
        Sm() {
            return pt(this.F(), this.yn.fontFamily)
        }
        Zw() {
            return pt(this.F(), this.yn.fontFamily, "bold")
        }
        Uw() {
            this.M === null && (this.M = {
                S: 1,
                L: NaN,
                A: NaN,
                I: NaN,
                tn: NaN,
                C: 5,
                k: NaN,
                P: "",
                Qi: new gt,
                $w: 0
            });
            const t = this.M,
                i = this.Sm();
            if (t.P !== i) {
                const s = this.F();
                t.k = s, t.P = i, t.A = 3 * s / 12, t.I = 3 * s / 12, t.tn = 9 * s / 12, t.L = 0, t.$w = 4 * s / 12, t.Qi.Os()
            }
            return this.M
        }
        Em(t) {
            this.lv.style.cursor = t === 1 ? "ew-resize" : "default"
        }
        zw() {
            const t = this.qv.Qt(),
                i = t.N();
            i.leftPriceScale.visible || this.Dw === null || (this.Ew.removeChild(this.Dw.uv()), this.Dw.m(), this.Dw = null), i.rightPriceScale.visible || this.Iw === null || (this.Aw.removeChild(this.Iw.uv()), this.Iw.m(), this.Iw = null);
            const s = {
                    Zd: this.qv.Qt().Zd()
                },
                e = () => i.leftPriceScale.borderVisible && t.Et().N().borderVisible,
                h = () => t.ef();
            i.leftPriceScale.visible && this.Dw === null && (this.Dw = new ls("left", i, s, e, h), this.Ew.appendChild(this.Dw.uv())), i.rightPriceScale.visible && this.Iw === null && (this.Iw = new ls("right", i, s, e, h), this.Aw.appendChild(this.Iw.uv()))
        }
    },
    Rh = !!nt && !!navigator.userAgentData && navigator.userAgentData.brands.some((t => t.brand.includes("Chromium"))) && !!nt && (navigator ? .userAgentData ? .platform ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0),
    Lh = class {
        constructor(t, i, s) {
            var e;
            this.Gw = [], this.Xw = [], this.Jw = 0, this.ho = 0, this.C_ = 0, this.Qw = 0, this.tM = 0, this.iM = null, this.nM = !1, this.Wm = new T, this.Hm = new T, this.pd = new T, this.sM = null, this.eM = null, this.jv = t, this.yn = i, this.xu = s, this.Hv = document.createElement("div"), this.Hv.classList.add("tv-lightweight-charts"), this.Hv.style.overflow = "hidden", this.Hv.style.direction = "ltr", this.Hv.style.width = "100%", this.Hv.style.height = "100%", (e = this.Hv).style.userSelect = "none", e.style.webkitUserSelect = "none", e.style.msUserSelect = "none", e.style.MozUserSelect = "none", e.style.webkitTapHighlightColor = "transparent", this.rM = document.createElement("table"), this.rM.setAttribute("cellspacing", "0"), this.Hv.appendChild(this.rM), this.hM = this.aM.bind(this), hi(this.yn) && this.lM(!0), this.sn = new vh(this.md.bind(this), this.yn, s), this.Qt().Dd().i(this.oM.bind(this), this), this._M = new Ph(this, this.xu), this.rM.appendChild(this._M.uv());
            const h = i.autoSize && this.uM();
            let n = this.yn.width,
                r = this.yn.height;
            if (h || n === 0 || r === 0) {
                const o = t.getBoundingClientRect();
                n = n || o.width, r = r || o.height
            }
            this.cM(n, r), this.dM(), t.appendChild(this.Hv), this.fM(), this.sn.Et().Zc().i(this.sn.Pa.bind(this.sn), this), this.sn.L_().i(this.sn.Pa.bind(this.sn), this)
        }
        Qt() {
            return this.sn
        }
        N() {
            return this.yn
        }
        rv() {
            return this.Gw
        }
        pM() {
            return this._M
        }
        m() {
            this.lM(!1), this.Jw !== 0 && window.cancelAnimationFrame(this.Jw), this.sn.Dd().u(this), this.sn.Et().Zc().u(this), this.sn.L_().u(this), this.sn.m();
            for (const t of this.Gw) this.rM.removeChild(t.uv()), t.dw().u(this), t.fw().u(this), t.m();
            this.Gw = [];
            for (const t of this.Xw) this.vM(t);
            this.Xw = [], v(this._M).m(), this.Hv.parentElement !== null && this.Hv.parentElement.removeChild(this.Hv), this.pd.m(), this.Wm.m(), this.Hm.m(), this.mM()
        }
        cM(t, i, s = !1) {
            if (this.ho === i && this.C_ === t) return;
            const e = (function(r) {
                const o = Math.floor(r.width),
                    l = Math.floor(r.height);
                return _({
                    width: o - o % 2,
                    height: l - l % 2
                })
            })(_({
                width: t,
                height: i
            }));
            this.ho = e.height, this.C_ = e.width;
            const h = this.ho + "px",
                n = this.C_ + "px";
            if (this.wM() || (v(this.Hv).style.height = h, v(this.Hv).style.width = n), this.rM.style.height = h, this.rM.style.width = n, s) {
                this.Jw !== 0 && (window.cancelAnimationFrame(this.Jw), this.Jw = 0), this.nM = !1;
                const r = k.ys();
                this.iM !== null && (r.Ss(this.iM), this.iM = null), this.MM(r, performance.now())
            } else this.sn.Pa()
        }
        km(t) {
            t === void 0 && (t = k.ys());
            for (let i = 0; i < this.Gw.length; i++) this.Gw[i].km(t._s(i).rs);
            this.yn.timeScale.visible && this._M.km(t.ls())
        }
        vr(t) {
            const i = hi(this.yn);
            this.sn.vr(t);
            const s = hi(this.yn);
            s !== i && this.lM(s), t.layout ? .panes && this.gM(), this.fM(), this.bM(t)
        }
        dw() {
            return this.Wm
        }
        fw() {
            return this.Hm
        }
        Dd() {
            return this.pd
        }
        SM(t = !1) {
            this.iM !== null && (this.MM(this.iM, performance.now()), this.iM = null);
            const i = this.xM(null),
                s = document.createElement("canvas");
            s.width = i.width, s.height = i.height;
            const e = v(s.getContext("2d"));
            return this.xM(e, t), s
        }
        CM(t) {
            return t === "left" && !this.yM() || t === "right" && !this.kM() || this.Gw.length === 0 ? 0 : v(t === "left" ? this.Gw[0].Sw() : this.Gw[0].xw()).ym()
        }
        wM() {
            return this.yn.autoSize && this.sM !== null
        }
        vv() {
            return this.Hv
        }
        PM(t) {
            this.eM = t, this.eM ? this.vv().style.setProperty("cursor", t) : this.vv().style.removeProperty("cursor")
        }
        TM() {
            return this.eM
        }
        RM(t) {
            return N(this.Gw[t]).cv()
        }
        gM() {
            this.Xw.forEach((t => {
                t.kt()
            }))
        }
        bM(t) {
            (t.autoSize !== void 0 || !this.sM || t.width === void 0 && t.height === void 0) && (t.autoSize && !this.sM && this.uM(), t.autoSize === !1 && this.sM !== null && this.mM(), t.autoSize || t.width === void 0 && t.height === void 0 || this.cM(t.width || this.C_, t.height || this.ho))
        }
        xM(t, i) {
            let s = 0,
                e = 0;
            const h = this.Gw[0],
                n = (o, l) => {
                    let a = 0;
                    for (let u = 0; u < this.Gw.length; u++) {
                        const c = this.Gw[u],
                            d = v(o === "left" ? c.Sw() : c.xw()),
                            f = d.dv();
                        if (t !== null && d.fv(t, l, a, i), a += f.height, u < this.Gw.length - 1) {
                            const m = this.Xw[u],
                                p = m.dv();
                            t !== null && m.fv(t, l, a), a += p.height
                        }
                    }
                };
            this.yM() && (n("left", 0), s += v(h.Sw()).dv().width);
            for (let o = 0; o < this.Gw.length; o++) {
                const l = this.Gw[o],
                    a = l.dv();
                if (t !== null && l.fv(t, s, e, i), e += a.height, o < this.Gw.length - 1) {
                    const u = this.Xw[o],
                        c = u.dv();
                    t !== null && u.fv(t, s, e), e += c.height
                }
            }
            s += h.dv().width, this.kM() && (n("right", s), s += v(h.xw()).dv().width);
            const r = (o, l, a) => {
                v(o === "left" ? this._M.Ow() : this._M.Nw()).fv(v(t), l, a)
            };
            if (this.yn.timeScale.visible) {
                const o = this._M.dv();
                if (t !== null) {
                    let l = 0;
                    this.yM() && (r("left", l, e), l = v(h.Sw()).dv().width), this._M.fv(t, l, e, i), l += o.width, this.kM() && r("right", l, e)
                }
                e += o.height
            }
            return _({
                width: s,
                height: e
            })
        }
        DM() {
            let t = 0,
                i = 0,
                s = 0;
            for (const p of this.Gw) this.yM() && (i = Math.max(i, v(p.Sw()).bm(), this.yn.leftPriceScale.minimumWidth)), this.kM() && (s = Math.max(s, v(p.xw()).bm(), this.yn.rightPriceScale.minimumWidth)), t += p.z_();
            i = di(i), s = di(s);
            const e = this.C_,
                h = this.ho,
                n = Math.max(e - i - s, 0),
                r = 1 * this.Xw.length,
                o = this.yn.timeScale.visible;
            let l = o ? Math.max(this._M.Hw(), this.yn.timeScale.minimumHeight) : 0;
            var a;
            l = (a = l) + a % 2;
            const u = r + l,
                c = h < u ? 0 : h - u,
                d = c / t;
            let f = 0;
            const m = window.devicePixelRatio || 1;
            for (let p = 0; p < this.Gw.length; ++p) {
                const g = this.Gw[p];
                g.iw(this.sn.Zn()[p]);
                let w = 0,
                    M = 0;
                M = p === this.Gw.length - 1 ? Math.ceil((c - f) * m) / m : Math.round(g.z_() * d * m) / m, w = Math.max(M, 2), f += w, g.Cm(_({
                    width: n,
                    height: w
                })), this.yM() && g.mw(i, "left"), this.kM() && g.mw(s, "right"), g.Sv() && this.sn.Id(g.Sv(), w)
            }
            this._M.Ww(_({
                width: o ? n : 0,
                height: l
            }), o ? i : 0, o ? s : 0), this.sn.N_(n), this.Qw !== i && (this.Qw = i), this.tM !== s && (this.tM = s)
        }
        lM(t) {
            t ? this.Hv.addEventListener("wheel", this.hM, {
                passive: !1
            }) : this.Hv.removeEventListener("wheel", this.hM)
        }
        IM(t) {
            switch (t.deltaMode) {
                case t.DOM_DELTA_PAGE:
                    return 120;
                case t.DOM_DELTA_LINE:
                    return 32
            }
            return Rh ? 1 / window.devicePixelRatio : 1
        }
        aM(t) {
            if (!(t.deltaX !== 0 && this.yn.handleScroll.mouseWheel || t.deltaY !== 0 && this.yn.handleScale.mouseWheel)) return;
            const i = this.IM(t),
                s = i * t.deltaX / 100,
                e = -i * t.deltaY / 100;
            if (t.cancelable && t.preventDefault(), e !== 0 && this.yn.handleScale.mouseWheel) {
                const h = Math.sign(e) * Math.min(1, Math.abs(e)),
                    n = t.clientX - this.Hv.getBoundingClientRect().left;
                this.Qt().Od(n, h)
            }
            s !== 0 && this.yn.handleScroll.mouseWheel && this.Qt().Nd(-80 * s)
        }
        MM(t, i) {
            const s = t.ls();
            s === 3 && this.VM(), s !== 3 && s !== 2 || (this.BM(t), this.EM(t, i), this._M.kt(), this.Gw.forEach((e => {
                e.sw()
            })), this.iM ? .ls() === 3 && (this.iM.Ss(t), this.VM(), this.BM(this.iM), this.EM(this.iM, i), t = this.iM, this.iM = null)), this.km(t)
        }
        EM(t, i) {
            for (const s of t.bs()) this.xs(s, i)
        }
        BM(t) {
            const i = this.sn.Zn();
            for (let s = 0; s < i.length; s++) t._s(s).hs && i[s].ru()
        }
        xs(t, i) {
            const s = this.sn.Et();
            switch (t.ds) {
                case 0:
                    s.Xc();
                    break;
                case 1:
                    s.Jc(t.Wt);
                    break;
                case 2:
                    s.Ms(t.Wt);
                    break;
                case 3:
                    s.gs(t.Wt);
                    break;
                case 4:
                    s.Oc();
                    break;
                case 5:
                    t.Wt.jc(i) || s.gs(t.Wt.qc(i))
            }
        }
        md(t) {
            this.iM !== null ? this.iM.Ss(t) : this.iM = t, this.nM || (this.nM = !0, this.Jw = window.requestAnimationFrame((i => {
                if (this.nM = !1, this.Jw = 0, this.iM !== null) {
                    const s = this.iM;
                    this.iM = null, this.MM(s, i);
                    for (const e of s.bs())
                        if (e.ds === 5 && !e.Wt.jc(i)) {
                            this.Qt().ps(e.Wt);
                            break
                        }
                }
            })))
        }
        VM() {
            this.dM()
        }
        vM(t) {
            this.rM.removeChild(t.uv()), t.m()
        }
        dM() {
            const t = this.sn.Zn(),
                i = t.length,
                s = this.Gw.length;
            for (let e = i; e < s; e++) {
                const h = N(this.Gw.pop());
                this.rM.removeChild(h.uv()), h.dw().u(this), h.fw().u(this), h.m();
                const n = this.Xw.pop();
                n !== void 0 && this.vM(n)
            }
            for (let e = s; e < i; e++) {
                const h = new Th(this, t[e]);
                if (h.dw().i(this.AM.bind(this, h), this), h.fw().i(this.LM.bind(this, h), this), this.Gw.push(h), e > 0) {
                    const n = new Sh(this, e - 1, e);
                    this.Xw.push(n), this.rM.insertBefore(n.uv(), this._M.uv())
                }
                this.rM.insertBefore(h.uv(), this._M.uv())
            }
            for (let e = 0; e < i; e++) {
                const h = t[e],
                    n = this.Gw[e];
                n.Sv() !== h ? n.iw(h) : n.tw()
            }
            this.fM(), this.DM()
        }
        zM(t, i, s, e) {
            const h = new Map;
            t !== null && this.sn.Jn().forEach((a => {
                const u = a.Un().Hn(t);
                u !== null && h.set(a, u)
            }));
            let n;
            if (t !== null) {
                const a = this.sn.Et().en(t) ? .originalTime;
                a !== void 0 && (n = a)
            }
            const r = this.Qt().ou(),
                o = this.OM(e),
                l = (function(a, u) {
                    const c = a !== null && a.lu instanceof Ft ? a.lu : void 0,
                        d = a ? .wu ? .te,
                        f = u !== void 0 && u !== -1 ? u : void 0;
                    return a === null || a.ee === void 0 ? {
                        NM: c,
                        FM: d
                    } : {
                        NM: c,
                        FM: d,
                        WM: {
                            ds: a.ee,
                            HM: (m = a.lu, p = a.ee, m instanceof ai ? "pane-primitive" : p === "marker" || p === "primitive" ? "series-primitive" : "series"),
                            UM: Mh(a.ee, d),
                            U_: c,
                            $M: d,
                            jM: f
                        }
                    };
                    var m, p
                })(r, o);
            return {
                Qr: n,
                $n: t ? ? void 0,
                qM: i ? ? void 0,
                jM: o !== -1 ? o : void 0,
                NM: l.NM,
                YM: h,
                FM: l.FM,
                WM: l.WM,
                KM: s ? ? void 0
            }
        }
        OM(t) {
            let i = -1;
            if (t) i = this.Gw.indexOf(t);
            else {
                const s = this.Qt().Rd().Kn();
                s !== null && (i = this.Qt().Zn().indexOf(s))
            }
            return i
        }
        AM(t, i, s, e) {
            this.Wm.p((() => this.zM(i, s, e, t)))
        }
        LM(t, i, s, e) {
            this.Hm.p((() => this.zM(i, s, e, t)))
        }
        oM(t, i, s) {
            this.PM(this.Qt().ou() ? .mu ? ? null), this.pd.p((() => this.zM(t, i, s)))
        }
        fM() {
            const t = this.yn.timeScale.visible ? "" : "none";
            this._M.uv().style.display = t
        }
        yM() {
            return this.Gw[0].Sv().K_().N().visible
        }
        kM() {
            return this.Gw[0].Sv().Z_().N().visible
        }
        uM() {
            return "ResizeObserver" in window && (this.sM = new ResizeObserver((t => {
                const i = t[t.length - 1];
                if (!i) return;
                const s = i.contentRect.width,
                    e = i.contentRect.height;
                this.cM(s, e, !0)
            })), this.sM.observe(this.jv, {
                box: "border-box"
            }), !0)
        }
        mM() {
            this.sM !== null && this.sM.disconnect(), this.sM = null
        }
    };

function hi(t) {
    return !!(t.handleScroll.mouseWheel || t.handleScale.mouseWheel)
}

function Ih(t) {
    return t.open === void 0 && t.value === void 0
}

function Qh(t) {
    return (function(i) {
        return i.open !== void 0
    })(t) || (function(i) {
        return i.value !== void 0
    })(t)
}

function as(t, i, s, e) {
    const h = s.value,
        n = {
            $n: i,
            wt: t,
            Wt: [h, h, h, h],
            Qr: e
        };
    return s.color !== void 0 && (n.R = s.color), n
}

function Bh(t, i, s, e) {
    const h = s.value,
        n = {
            $n: i,
            wt: t,
            Wt: [h, h, h, h],
            Qr: e
        };
    return s.lineColor !== void 0 && (n.vt = s.lineColor), s.topColor !== void 0 && (n.ah = s.topColor), s.bottomColor !== void 0 && (n.oh = s.bottomColor), n
}

function qh(t, i, s, e) {
    const h = s.value,
        n = {
            $n: i,
            wt: t,
            Wt: [h, h, h, h],
            Qr: e
        };
    return s.topLineColor !== void 0 && (n._h = s.topLineColor), s.bottomLineColor !== void 0 && (n.uh = s.bottomLineColor), s.topFillColor1 !== void 0 && (n.dh = s.topFillColor1), s.topFillColor2 !== void 0 && (n.fh = s.topFillColor2), s.bottomFillColor1 !== void 0 && (n.ph = s.bottomFillColor1), s.bottomFillColor2 !== void 0 && (n.mh = s.bottomFillColor2), n
}

function Wh(t, i, s, e) {
    const h = {
        $n: i,
        wt: t,
        Wt: [s.open, s.high, s.low, s.close],
        Qr: e
    };
    return s.color !== void 0 && (h.R = s.color), h
}

function Fh(t, i, s, e) {
    const h = {
        $n: i,
        wt: t,
        Wt: [s.open, s.high, s.low, s.close],
        Qr: e
    };
    return s.color !== void 0 && (h.R = s.color), s.borderColor !== void 0 && (h.Ht = s.borderColor), s.wickColor !== void 0 && (h.hh = s.wickColor), h
}

function Oh(t, i, s, e, h) {
    const n = N(h)(s),
        r = Math.max(...n),
        o = Math.min(...n),
        l = n[n.length - 1],
        a = [l, r, o, l],
        {
            time: u,
            color: c,
            ...d
        } = s;
    return {
        $n: i,
        wt: t,
        Wt: a,
        Qr: e,
        ue: d,
        R: c
    }
}

function tt(t) {
    return t.Wt !== void 0
}

function us(t, i) {
    return i.customValues !== void 0 && (t.ZM = i.customValues), t
}

function Y(t) {
    return (i, s, e, h, n, r) => (function(o, l) {
        return l ? l(o) : Ih(o)
    })(e, r) ? us({
        wt: i,
        $n: s,
        Qr: h
    }, e) : us(t(i, s, e, h, n), e)
}

function cs(t) {
    return {
        Candlestick: Y(Fh),
        Bar: Y(Wh),
        Area: Y(Bh),
        Baseline: Y(qh),
        Histogram: Y(as),
        Line: Y(as),
        Custom: Y(Oh)
    }[t]
}

function ds(t) {
    return {
        $n: 0,
        GM: new Map,
        za: t
    }
}

function fs(t, i) {
    if (t !== void 0 && t.length !== 0) return {
        XM: i.key(t[0].wt),
        JM: i.key(t[t.length - 1].wt)
    }
}

function ms(t) {
    let i;
    return t.forEach((s => {
        i === void 0 && (i = s.Qr)
    })), N(i)
}
var Dh = class {
    constructor(t) {
        this.QM = new Map, this.tg = new Map, this.ig = new Map, this.ng = [], this.xu = t
    }
    m() {
        this.QM.clear(), this.tg.clear(), this.ig.clear(), this.ng = []
    }
    sg(t, i) {
        let s = this.QM.size !== 0,
            e = !1;
        const h = this.tg.get(t);
        if (h !== void 0)
            if (this.tg.size === 1) s = !1, e = !0, this.QM.clear();
            else
                for (const o of this.ng) o.pointData.GM.delete(t) && (e = !0);
        let n = [];
        if (i.length !== 0) {
            const o = i.map((d => d.time)),
                l = this.xu.createConverterToInternalObj(i),
                a = cs(t.bh()),
                u = t.ll(),
                c = t.ol();
            n = i.map(((d, f) => {
                const m = l(d.time),
                    p = this.xu.key(m);
                let g = this.QM.get(p);
                g === void 0 && (g = ds(m), this.QM.set(p, g), e = !0);
                const w = a(m, g.$n, d, o[f], u, c);
                return g.GM.set(t, w), w
            }))
        }
        s && this.eg(), this.rg(t, n);
        let r = -1;
        if (e) {
            const o = [];
            this.QM.forEach((l => {
                o.push({
                    timeWeight: 0,
                    time: l.za,
                    pointData: l,
                    originalTime: ms(l.GM)
                })
            })), o.sort(((l, a) => this.xu.key(l.time) - this.xu.key(a.time))), r = this.hg(o)
        }
        return this.ag(t, r, (function(o, l, a) {
            const u = fs(o, a),
                c = fs(l, a);
            if (u !== void 0 && c !== void 0) return {
                lg: !1,
                Ia: u.JM >= c.JM && u.XM >= c.XM
            }
        })(this.tg.get(t), h, this.xu))
    }
    Jd(t) {
        return this.sg(t, [])
    }
    og(t, i, s) {
        if (s && t.Na()) throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
        const e = i;
        (function(g) {
            g.Qr === void 0 && (g.Qr = g.time)
        })(e), this.xu.preprocessData(i);
        const h = this.xu.createConverterToInternalObj([i])(i.time),
            n = this.ig.get(t);
        if (!s && n !== void 0 && this.xu.key(h) < this.xu.key(n)) throw new Error(`Cannot update oldest data, last time=${n}, new time=${h}`);
        let r = this.QM.get(this.xu.key(h));
        if (s && r === void 0) throw new Error("Cannot update non-existing data point when historicalUpdate is true");
        const o = r === void 0;
        r === void 0 && (r = ds(h), this.QM.set(this.xu.key(h), r));
        const l = cs(t.bh()),
            a = t.ll(),
            u = t.ol(),
            c = l(h, r.$n, i, e.Qr, a, u),
            d = !s && !o && n !== void 0 && this.xu.key(h) === this.xu.key(n);
        r.GM.set(t, c), s ? this._g(t, c, r.$n) : d && t.Na() && tt(c) ? (t.Rr(c), this.ug(t, c)) : this.ug(t, c);
        const f = {
            Ia: tt(c),
            lg: s
        };
        if (!o) return this.ag(t, -1, f);
        const m = {
                timeWeight: 0,
                time: r.za,
                pointData: r,
                originalTime: ms(r.GM)
            },
            p = H(this.ng, this.xu.key(m.time), ((g, w) => this.xu.key(g.time) < w));
        this.ng.splice(p, 0, m);
        for (let g = p; g < this.ng.length; ++g) Tt(this.ng[g].pointData, g);
        return this.xu.fillWeightsForPoints(this.ng, p), this.ag(t, p, f)
    }
    cg(t, i) {
        const s = this.tg.get(t);
        if (s === void 0 || i <= 0) return [
            [], this.dg()
        ];
        i = Math.min(i, s.length);
        const e = s.splice(-i).reverse();
        s.length === 0 ? this.ig.delete(t) : this.ig.set(t, s[s.length - 1].wt);
        for (const h of e) {
            const n = this.QM.get(this.xu.key(h.wt));
            if (n && (n.GM.delete(t), n.GM.size === 0)) {
                this.QM.delete(this.xu.key(n.za)), this.ng.splice(n.$n, 1);
                for (let r = n.$n; r < this.ng.length; ++r) Tt(this.ng[r].pointData, r)
            }
        }
        return [e, this.ag(t, this.ng.length - 1, {
            lg: !1,
            Ia: !1
        })]
    }
    ug(t, i) {
        let s = this.tg.get(t);
        s === void 0 && (s = [], this.tg.set(t, s));
        const e = s.length !== 0 ? s[s.length - 1] : null;
        e === null || this.xu.key(i.wt) > this.xu.key(e.wt) ? tt(i) && s.push(i) : tt(i) ? s[s.length - 1] = i : s.splice(-1, 1), this.ig.set(t, i.wt)
    }
    _g(t, i, s) {
        const e = this.tg.get(t);
        if (e === void 0) return;
        const h = H(e, s, ((n, r) => n.$n < r));
        tt(i) ? e[h] = i : e.splice(h, 1)
    }
    rg(t, i) {
        i.length !== 0 ? (this.tg.set(t, i.filter(tt)), this.ig.set(t, i[i.length - 1].wt)) : (this.tg.delete(t), this.ig.delete(t))
    }
    eg() {
        for (const t of this.ng) t.pointData.GM.size === 0 && this.QM.delete(this.xu.key(t.time))
    }
    hg(t) {
        let i = -1;
        for (let s = 0; s < this.ng.length && s < t.length; ++s) {
            const e = this.ng[s],
                h = t[s];
            if (this.xu.key(e.time) !== this.xu.key(h.time)) {
                i = s;
                break
            }
            h.timeWeight = e.timeWeight, Tt(h.pointData, s)
        }
        if (i === -1 && this.ng.length !== t.length && (i = Math.min(this.ng.length, t.length)), i === -1) return -1;
        for (let s = i; s < t.length; ++s) Tt(t[s].pointData, s);
        return this.xu.fillWeightsForPoints(t, i), this.ng = t, i
    }
    fg() {
        if (this.tg.size === 0) return null;
        let t = 0;
        return this.tg.forEach((i => {
            i.length !== 0 && (t = Math.max(t, i[i.length - 1].$n))
        })), t
    }
    ag(t, i, s) {
        const e = this.dg();
        if (i !== -1) this.tg.forEach(((h, n) => {
            e.U_.set(n, {
                ue: h,
                pg: n === t ? s : void 0
            })
        })), this.tg.has(t) || e.U_.set(t, {
            ue: [],
            pg: s
        }), e.Et.vg = this.ng, e.Et.mg = i;
        else {
            const h = this.tg.get(t);
            e.U_.set(t, {
                ue: h || [],
                pg: s
            })
        }
        return e
    }
    dg() {
        return {
            U_: new Map,
            Et: {
                Pc: this.fg()
            }
        }
    }
};

function Tt(t, i) {
    t.$n = i, t.GM.forEach((s => {
        s.$n = i
    }))
}

function Kh(t, i) {
    return t._t < i
}

function Vh(t, i) {
    return i < t._t
}

function vi(t, i, s, e) {
    return H(t, i, Kh, s, e)
}

function pi(t, i, s, e) {
    return wi(t, i, Vh, s, e)
}

function Pt(t, i, s) {
    return {
        ne: t,
        se: i,
        ee: s
    }
}

function vs(t, i, s, e) {
    return t >= i - e && t <= s + e
}

function ut(t, i, s, e, h, n) {
    const r = h - s,
        o = n - e;
    if (r === 0 && o === 0) return Math.hypot(t - s, i - e);
    const l = ((t - s) * r + (i - e) * o) / (r * r + o * o),
        a = Math.max(0, Math.min(1, l)),
        u = s + r * a,
        c = e + o * a;
    return Math.hypot(t - u, i - c)
}
var ni = [0, 0];

function $h(t, i, s) {
    return i === void 0 || i.wt !== t.wt - 1 ? t._t - s / 2 : (i._t + t._t) / 2
}

function Yh(t, i, s) {
    return i === void 0 || i.wt !== t.wt + 1 ? t._t + s / 2 : (t._t + i._t) / 2
}

function Us(t, i, s, e, h, n, r) {
    if (i === null || i.from >= i.to || t.length === 0) return null;
    const o = h / 2 + n,
        l = vi(t, s - o, i.from, i.to),
        a = pi(t, s + o, l, i.to);
    if (l >= a) return null;
    let u = Number.POSITIVE_INFINITY;
    for (let c = l; c < a; c++) {
        const d = t[c],
            f = c > i.from ? t[c - 1] : void 0,
            m = c < i.to - 1 ? t[c + 1] : void 0,
            p = $h(d, f, h) - n,
            g = Yh(d, m, h) + n;
        if (s < p || s > g) continue;
        r(d, ni);
        const w = ni[0],
            M = ni[1],
            b = Math.min(w, M),
            y = Math.max(w, M),
            C = b - n,
            S = y + n;
        if (e >= b && e <= y) u = Math.min(u, 0);
        else if (e >= C && e <= S) {
            const x = Math.min(Math.abs(e - b), Math.abs(y - e));
            u = Math.min(u, x)
        }
    }
    return Number.isFinite(u) ? Pt(u, 0, "series-range") : null
}

function Zh(t, i) {
    return t.wt < i
}

function Ah(t, i) {
    return i < t.wt
}

function js(t, i, s) {
    const e = i.Oa(),
        h = i.bi(),
        n = H(t, e, Zh),
        r = wi(t, h, Ah);
    if (!s) return {
        from: n,
        to: r
    };
    let o = n,
        l = r;
    return n > 0 && n < t.length && t[n].wt >= e && (o = n - 1), r > 0 && r < t.length && t[r - 1].wt <= h && (l = r + 1), {
        from: o,
        to: l
    }
}
var Si = class {
        constructor(t, i, s) {
            this.wg = !0, this.Mg = !0, this.gg = !0, this.bg = [], this.Sg = null, this.xg = -1, this.ae = t, this.le = i, this.Cg = s
        }
        kt(t) {
            this.wg = !0, t === "data" && (this.Mg = !0), t === "options" && (this.gg = !0)
        }
        Tt() {
            return this.ae.It() ? (this.yg(), this.Sg === null ? null : this.kg) : null
        }
        Qs(t, i) {
            return this.ae.It() ? (this.yg(), this.Sg === null ? null : this.Pg(t, i)) : null
        }
        Pg(t, i) {
            return null
        }
        Tg() {
            this.bg = this.bg.map((t => ({ ...t,
                ...this.ae.Sa().Sh(t.wt)
            })))
        }
        Rg() {
            this.Sg = null
        }
        yg() {
            const t = this.le.Et(),
                i = t.N().enableConflation ? t.Qc() : 0;
            i !== this.xg && (this.Mg = !0, this.xg = i), this.Mg && (this.Dg(), this.Mg = !1), this.gg && (this.Tg(), this.gg = !1), this.wg && (this.Ig(), this.wg = !1)
        }
        Ig() {
            const t = this.ae.Ft(),
                i = this.le.Et();
            if (this.Rg(), i.Gi() || t.Gi()) return;
            const s = i.Ee();
            if (s === null || this.ae.Un().Th() === 0) return;
            const e = this.ae.Lt();
            e !== null && (this.Sg = js(this.bg, s, this.Cg), this.Vg(t, i, e.Wt), this.Bg())
        }
    },
    Gh = class {
        constructor(t, i) {
            this.Eg = t, this.Ki = i
        }
        st(t, i, s) {
            this.Eg.draw(t, this.Ki, i, s)
        }
    };

function Hh(t) {
    switch (t) {
        case "point":
            return 2;
        case "range":
            return 0;
        default:
            return 1
    }
}
var Uh = class extends Si {
    constructor(t, i, s) {
        super(t, i, !1), this.Yh = s, this.Eg = this.Yh.renderer(), this.kg = new Gh(this.Eg, (e => this.Ag(e)))
    }
    get ga() {
        return this.Yh.conflationReducer
    }
    Wa(t) {
        return this.Yh.priceValueBuilder(t)
    }
    _l(t) {
        return this.Yh.isWhitespace(t)
    }
    Pg(t, i) {
        const s = this.Eg.hitTest ? .(t, i, (n => this.Ag(n)));
        if (s != null) return {
            ne: (e = s).distance,
            se: Hh(e.type),
            ee: "custom",
            mu: e.cursorStyle,
            te: e.objectId,
            ie: e.hitTestData
        };
        var e;
        const h = Us(this.bg, this.Sg, t, i, this.le.Et().fl(), this.ae.N().hitTestTolerance, ((n, r) => {
            const o = n.Lg;
            let l = NaN,
                a = NaN;
            if (o !== void 0 && !this.Yh.isWhitespace(o))
                for (const u of this.Yh.priceValueBuilder(o)) {
                    const c = this.Ag(u);
                    c !== null && (l = Number.isNaN(l) ? c : Math.min(l, c), a = Number.isNaN(a) ? c : Math.max(a, c))
                }
            r[0] = l, r[1] = a
        }));
        return h === null ? null : { ...h,
            ee: "custom"
        }
    }
    Dg() {
        const t = this.ae.Sa();
        this.bg = this.ae.Ha().Bh().map((i => ({
            wt: i.$n,
            _t: NaN,
            ...t.Sh(i.$n),
            Lg: i.ue
        })))
    }
    Vg(t, i) {
        i.Tc(this.bg, vt(this.Sg))
    }
    Bg() {
        this.Yh.update({
            bars: this.bg.map(jh),
            barSpacing: this.le.Et().fl(),
            visibleRange: this.Sg,
            conflationFactor: this.le.Et().Qc()
        }, this.ae.N())
    }
    Ag(t) {
        const i = this.ae.Lt();
        return i === null ? null : this.ae.Ft().Nt(t, i.Wt)
    }
};

function jh(t) {
    return {
        x: t._t,
        time: t.wt,
        originalData: t.Lg,
        barColor: t.sh
    }
}
var Xh = {
        color: "#2196f3"
    },
    Jh = (t, i, s) => new Uh(t, i, O(s));

function _i(t) {
    const i = {
        value: t.Wt[3],
        time: t.Qr
    };
    return t.ZM !== void 0 && (i.customValues = t.ZM), i
}

function ps(t) {
    const i = _i(t);
    return t.R !== void 0 && (i.color = t.R), i
}

function tn(t) {
    const i = _i(t);
    return t.vt !== void 0 && (i.lineColor = t.vt), t.ah !== void 0 && (i.topColor = t.ah), t.oh !== void 0 && (i.bottomColor = t.oh), i
}

function sn(t) {
    const i = _i(t);
    return t._h !== void 0 && (i.topLineColor = t._h), t.uh !== void 0 && (i.bottomLineColor = t.uh), t.dh !== void 0 && (i.topFillColor1 = t.dh), t.fh !== void 0 && (i.topFillColor2 = t.fh), t.ph !== void 0 && (i.bottomFillColor1 = t.ph), t.mh !== void 0 && (i.bottomFillColor2 = t.mh), i
}

function Xs(t) {
    const i = {
        open: t.Wt[0],
        high: t.Wt[1],
        low: t.Wt[2],
        close: t.Wt[3],
        time: t.Qr
    };
    return t.ZM !== void 0 && (i.customValues = t.ZM), i
}

function en(t) {
    const i = Xs(t);
    return t.R !== void 0 && (i.color = t.R), i
}

function hn(t) {
    const i = Xs(t),
        {
            R: s,
            Ht: e,
            hh: h
        } = t;
    return s !== void 0 && (i.color = s), e !== void 0 && (i.borderColor = e), h !== void 0 && (i.wickColor = h), i
}

function Rt(t) {
    return {
        Area: tn,
        Line: ps,
        Baseline: sn,
        Histogram: ps,
        Bar: en,
        Candlestick: hn,
        Custom: nn
    }[t]
}

function nn(t) {
    const i = t.Qr;
    return { ...t.ue,
        time: i
    }
}
var rn = {
        vertLine: {
            color: "#9598A1",
            width: 1,
            style: 3,
            visible: !0,
            labelVisible: !0,
            labelBackgroundColor: "#131722"
        },
        horzLine: {
            color: "#9598A1",
            width: 1,
            style: 3,
            visible: !0,
            labelVisible: !0,
            labelBackgroundColor: "#131722"
        },
        mode: 1,
        doNotSnapToHiddenSeriesIndices: !1
    },
    on = {
        vertLines: {
            color: "#D6DCDE",
            style: 0,
            visible: !0
        },
        horzLines: {
            color: "#D6DCDE",
            style: 0,
            visible: !0
        }
    },
    ln = {
        background: {
            type: "solid",
            color: "#FFFFFF"
        },
        textColor: "#191919",
        fontSize: 12,
        fontFamily: Ns,
        panes: {
            enableResize: !0,
            separatorColor: "#E0E3EB",
            separatorHoverColor: "rgba(178, 181, 189, 0.2)"
        },
        attributionLogo: !0,
        colorSpace: "srgb",
        colorParsers: []
    },
    ri = {
        autoScale: !0,
        mode: 0,
        invertScale: !1,
        alignLabels: !0,
        borderVisible: !0,
        borderColor: "#2B2B43",
        entireTextOnly: !1,
        visible: !1,
        ticksVisible: !1,
        scaleMargins: {
            bottom: .1,
            top: .2
        },
        minimumWidth: 0,
        ensureEdgeTickMarksVisible: !1,
        tickMarkDensity: 2.5
    },
    an = {
        rightOffset: 0,
        barSpacing: 6,
        minBarSpacing: .5,
        maxBarSpacing: 0,
        fixLeftEdge: !1,
        fixRightEdge: !1,
        lockVisibleTimeRangeOnResize: !1,
        rightBarStaysOnScroll: !1,
        borderVisible: !0,
        borderColor: "#2B2B43",
        visible: !0,
        timeVisible: !1,
        secondsVisible: !0,
        shiftVisibleRangeOnNewBar: !0,
        allowShiftVisibleRangeOnWhitespaceReplacement: !1,
        ticksVisible: !1,
        uniformDistribution: !1,
        minimumHeight: 0,
        allowBoldLabels: !0,
        ignoreWhitespaceIndices: !1,
        enableConflation: !1,
        conflationThresholdFactor: 1,
        precomputeConflationOnInit: !1,
        precomputeConflationPriority: "background"
    };

function gs() {
    return {
        addDefaultPane: !0,
        hoveredSeriesOnTop: !0,
        width: 0,
        height: 0,
        autoSize: !1,
        layout: ln,
        crosshair: rn,
        grid: on,
        overlayPriceScales: { ...ri
        },
        leftPriceScale: { ...ri,
            visible: !1
        },
        rightPriceScale: { ...ri,
            visible: !0
        },
        defaultVisiblePriceScaleId: "right",
        timeScale: an,
        localization: {
            locale: nt ? navigator.language : "",
            dateFormat: "dd MMM 'yy"
        },
        handleScroll: {
            mouseWheel: !0,
            pressedMouseMove: !0,
            horzTouchDrag: !0,
            vertTouchDrag: !0
        },
        handleScale: {
            axisPressedMouseMove: {
                time: !0,
                price: !0
            },
            axisDoubleClickReset: {
                time: !0,
                price: !0
            },
            mouseWheel: !0,
            pinch: !0
        },
        kineticScroll: {
            mouse: !1,
            touch: !0
        },
        trackingMode: {
            exitMode: 1
        }
    }
}
var Js = class {
        constructor(t, i, s) {
            this.sv = t, this.zg = i, this.Og = s ? ? 0
        }
        applyOptions(t) {
            this.sv.Qt().Pd(this.zg, t, this.Og)
        }
        options() {
            return this.Ki().N()
        }
        width() {
            return qt(this.zg) ? this.sv.CM(this.zg) : 0
        }
        setVisibleRange(t) {
            this.setAutoScale(!1), this.Ki().qo(new R(t.from, t.to))
        }
        getVisibleRange() {
            let t, i, s = this.Ki().ar();
            if (s === null) return null;
            if (this.Ki().so()) {
                const e = this.Ki().M_(),
                    h = Zs(e);
                s = st(s, this.Ki().ro()), t = Number((Math.round(s.Je() / e) * e).toFixed(h)), i = Number((Math.round(s.Qe() / e) * e).toFixed(h))
            } else t = s.Je(), i = s.Qe();
            return {
                from: t,
                to: i
            }
        }
        setAutoScale(t) {
            this.applyOptions({
                autoScale: t
            })
        }
        Ki() {
            return v(this.sv.Qt().Td(this.zg, this.Og)).Ft
        }
    },
    un = class {
        constructor(t, i, s, e) {
            this.sv = t, this.yt = s, this.Ng = i, this.Fg = e
        }
        getHeight() {
            return this.yt.$t()
        }
        setHeight(t) {
            const i = this.sv.Qt(),
                s = i.hf(this.yt);
            i.Bd(s, t)
        }
        getStretchFactor() {
            return this.yt.z_()
        }
        setStretchFactor(t) {
            this.yt.O_(t), this.sv.Qt().Pa()
        }
        paneIndex() {
            return this.sv.Qt().hf(this.yt)
        }
        moveTo(t) {
            const i = this.paneIndex();
            i !== t && (z(t >= 0 && t < this.sv.rv().length, "Invalid pane index"), this.sv.Qt().Ad(i, t))
        }
        getSeries() {
            return this.yt.U_().map((t => this.Ng(t))) ? ? []
        }
        getHTMLElement() {
            const t = this.sv.rv();
            return t && t.length !== 0 && t[this.paneIndex()] ? t[this.paneIndex()].uv() : null
        }
        attachPrimitive(t) {
            this.yt.hl(t), t.attached && t.attached({
                chart: this.Fg,
                requestUpdate: () => this.yt.Qt().Pa()
            })
        }
        detachPrimitive(t) {
            this.yt.al(t)
        }
        priceScale(t) {
            if (this.yt.A_(t) === null) throw new Error(`Cannot find price scale with id: ${t}`);
            return new Js(this.sv, t, this.paneIndex())
        }
        setPreserveEmptyPane(t) {
            this.yt.W_(t)
        }
        preserveEmptyPane() {
            return this.yt.H_()
        }
        addCustomSeries(t, i = {}, s = 0) {
            return this.Fg.addCustomSeries(t, i, s)
        }
        addSeries(t, i = {}) {
            return this.Fg.addSeries(t, i, this.paneIndex())
        }
    },
    cn = {
        color: "#FF0000",
        price: 0,
        lineStyle: 2,
        lineWidth: 1,
        lineVisible: !0,
        axisLabelVisible: !0,
        title: "",
        axisLabelColor: "",
        axisLabelTextColor: ""
    },
    ws = class {
        constructor(t) {
            this._r = t
        }
        applyOptions(t) {
            this._r.vr(t)
        }
        options() {
            return this._r.N()
        }
        Wg() {
            return this._r
        }
    },
    dn = class {
        constructor(t, i, s, e, h, n) {
            this.Hg = new T, this.ae = t, this.Ug = i, this.$g = s, this.xu = h, this.Fg = e, this.jg = n
        }
        m() {
            this.Hg.m()
        }
        priceFormatter() {
            return this.ae.tl()
        }
        priceToCoordinate(t) {
            const i = this.ae.Lt();
            return i === null ? null : this.ae.Ft().Nt(t, i.Wt)
        }
        coordinateToPrice(t) {
            const i = this.ae.Lt();
            return i === null ? null : this.ae.Ft().Tn(t, i.Wt)
        }
        barsInLogicalRange(t) {
            if (t === null) return null;
            const i = new kt(new ht(t.from, t.to)).Fu(),
                s = this.ae.Un();
            if (s.Gi()) return null;
            const e = s.Hn(i.Oa(), 1),
                h = s.Hn(i.bi(), -1),
                n = v(s.Rh()),
                r = v(s.Qn());
            if (e !== null && h !== null && e.$n > h.$n) return {
                barsBefore: t.from - n,
                barsAfter: r - t.to
            };
            const o = {
                barsBefore: e === null || e.$n === n ? t.from - n : e.$n - n,
                barsAfter: h === null || h.$n === r ? r - t.to : r - h.$n
            };
            return e !== null && h !== null && (o.from = e.Qr, o.to = h.Qr), o
        }
        setData(t) {
            this.xu, this.ae.bh(), this.Ug.qg(this.ae, t), this.Yg("full")
        }
        update(t, i = !1) {
            this.ae.bh(), this.Ug.Kg(this.ae, t, i), this.Yg("update")
        }
        pop(t = 1) {
            const i = this.Ug.Zg(this.ae, t);
            i.length !== 0 && this.Yg("update");
            const s = Rt(this.seriesType());
            return i.map((e => s(e)))
        }
        dataByIndex(t, i) {
            const s = this.ae.Un().Hn(t, i);
            return s === null ? null : Rt(this.seriesType())(s)
        }
        data() {
            const t = Rt(this.seriesType());
            return this.ae.Un().Bh().map((i => t(i)))
        }
        subscribeDataChanged(t) {
            this.Hg.i(t)
        }
        unsubscribeDataChanged(t) {
            this.Hg._(t)
        }
        applyOptions(t) {
            this.ae.vr(t)
        }
        options() {
            return B(this.ae.N())
        }
        priceScale() {
            return this.$g.priceScale(this.ae.Ft().cl(), this.getPane().paneIndex())
        }
        createPriceLine(t) {
            const i = P(B(cn), t);
            return new ws(this.ae.Ba(i))
        }
        removePriceLine(t) {
            this.ae.Ea(t.Wg())
        }
        priceLines() {
            return this.ae.Aa().map((t => new ws(t)))
        }
        seriesType() {
            return this.ae.bh()
        }
        lastValueData(t) {
            const i = this.ae.Ae(t);
            return i.Le ? {
                noData: !0
            } : {
                noData: !1,
                price: i.Mt,
                color: i.R
            }
        }
        attachPrimitive(t) {
            this.ae.hl(t), t.attached && t.attached({
                chart: this.Fg,
                series: this,
                requestUpdate: () => this.ae.Qt().Pa(),
                horzScaleBehavior: this.xu
            })
        }
        detachPrimitive(t) {
            this.ae.al(t), t.detached && t.detached(), this.ae.Qt().Pa()
        }
        getPane() {
            const t = this.ae,
                i = v(this.ae.Qt().Ks(t));
            return this.jg(i)
        }
        moveToPane(t) {
            this.ae.Qt().nf(this.ae, t)
        }
        seriesOrder() {
            const t = this.ae.Qt().Ks(this.ae);
            return t === null ? -1 : t.U_().indexOf(this.ae)
        }
        setSeriesOrder(t) {
            const i = this.ae.Qt().Ks(this.ae);
            i !== null && i.du(this.ae, t)
        }
        Yg(t) {
            this.Hg.v() && this.Hg.p(t)
        }
    },
    fn = class {
        constructor(t, i, s) {
            this.Gg = new T, this.Gu = new T, this.Bw = new T, this.sn = t, this.ia = t.Et(), this._M = i, this.ia.Yc().i(this.Xg.bind(this)), this.ia.Kc().i(this.Jg.bind(this)), this._M.Fw().i(this.Qg.bind(this)), this.xu = s
        }
        m() {
            this.ia.Yc().u(this), this.ia.Kc().u(this), this._M.Fw().u(this), this.Gg.m(), this.Gu.m(), this.Bw.m()
        }
        scrollPosition() {
            return this.ia.Ac()
        }
        scrollToPosition(t, i) {
            i ? this.ia.$c(t, 1e3) : this.sn.gs(t)
        }
        scrollToRealTime() {
            this.ia.Uc()
        }
        getVisibleRange() {
            const t = this.ia.gc();
            return t === null ? null : {
                from: t.from.originalTime,
                to: t.to.originalTime
            }
        }
        setVisibleRange(t) {
            const i = {
                    from: this.xu.convertHorzItemToInternal(t.from),
                    to: this.xu.convertHorzItemToInternal(t.to)
                },
                s = this.ia.Cc(i);
            this.sn.tf(s)
        }
        getVisibleLogicalRange() {
            const t = this.ia.Mc();
            return t === null ? null : {
                from: t.Oa(),
                to: t.bi()
            }
        }
        setVisibleLogicalRange(t) {
            z(t.from <= t.to, "The from index cannot be after the to index."), this.sn.tf(t)
        }
        resetTimeScale() {
            this.sn.ws()
        }
        fitContent() {
            this.sn.Xc()
        }
        logicalToCoordinate(t) {
            const i = this.sn.Et();
            return i.Gi() ? null : i.jt(t)
        }
        coordinateToLogical(t) {
            return this.ia.Gi() ? null : this.ia.Rc(t)
        }
        timeToIndex(t, i) {
            const s = this.xu.convertHorzItemToInternal(t);
            return this.ia.vc(s, i)
        }
        timeToCoordinate(t) {
            const i = this.timeToIndex(t, !1);
            return i === null ? null : this.ia.jt(i)
        }
        coordinateToTime(t) {
            const i = this.sn.Et(),
                s = i.Rc(t),
                e = i.en(s);
            return e === null ? null : e.originalTime
        }
        width() {
            return this._M.cv().width
        }
        height() {
            return this._M.cv().height
        }
        subscribeVisibleTimeRangeChange(t) {
            this.Gg.i(t)
        }
        unsubscribeVisibleTimeRangeChange(t) {
            this.Gg._(t)
        }
        subscribeVisibleLogicalRangeChange(t) {
            this.Gu.i(t)
        }
        unsubscribeVisibleLogicalRangeChange(t) {
            this.Gu._(t)
        }
        subscribeSizeChange(t) {
            this.Bw.i(t)
        }
        unsubscribeSizeChange(t) {
            this.Bw._(t)
        }
        applyOptions(t) {
            this.ia.vr(t)
        }
        options() {
            return { ...B(this.ia.N()),
                barSpacing: this.ia.fl()
            }
        }
        Xg() {
            this.Gg.v() && this.Gg.p(this.getVisibleRange())
        }
        Jg() {
            this.Gu.v() && this.Gu.p(this.getVisibleLogicalRange())
        }
        Qg(t) {
            this.Bw.p(t.width, t.height)
        }
    };

function bs(t) {
    return (function(i) {
        if (Mt(i.handleScale)) {
            const e = i.handleScale;
            i.handleScale = {
                axisDoubleClickReset: {
                    time: e,
                    price: e
                },
                axisPressedMouseMove: {
                    time: e,
                    price: e
                },
                mouseWheel: e,
                pinch: e
            }
        } else if (i.handleScale !== void 0) {
            const {
                axisPressedMouseMove: e,
                axisDoubleClickReset: h
            } = i.handleScale;
            Mt(e) && (i.handleScale.axisPressedMouseMove = {
                time: e,
                price: e
            }), Mt(h) && (i.handleScale.axisDoubleClickReset = {
                time: h,
                price: h
            })
        }
        const s = i.handleScroll;
        Mt(s) && (i.handleScroll = {
            horzTouchDrag: s,
            vertTouchDrag: s,
            mouseWheel: s,
            pressedMouseMove: s
        })
    })(t), t
}
var mn = class {
    constructor(t, i, s) {
        this.tb = new Map, this.ib = new Map, this.nb = new T, this.sb = new T, this.eb = new T, this.od = new WeakMap, this.rb = new Dh(i);
        const e = s === void 0 ? B(gs()) : P(B(gs()), bs(s));
        this.hb = i, this.sv = new Lh(t, e, i), this.sv.dw().i((n => {
            this.nb.v() && this.nb.p(this.ab(n()))
        }), this), this.sv.fw().i((n => {
            this.sb.v() && this.sb.p(this.ab(n()))
        }), this), this.sv.Dd().i((n => {
            this.eb.v() && this.eb.p(this.ab(n()))
        }), this);
        const h = this.sv.Qt();
        this.lb = new fn(h, this.sv.pM(), this.hb)
    }
    remove() {
        this.sv.dw().u(this), this.sv.fw().u(this), this.sv.Dd().u(this), this.lb.m(), this.sv.m(), this.tb.clear(), this.ib.clear(), this.nb.m(), this.sb.m(), this.eb.m(), this.rb.m()
    }
    resize(t, i, s) {
        this.autoSizeActive() || this.sv.cM(t, i, s)
    }
    addCustomSeries(t, i = {}, s = 0) {
        const e = (h => ({
            type: "Custom",
            isBuiltIn: !1,
            defaultOptions: { ...Xh,
                ...h.defaultOptions()
            },
            ob: Jh,
            _b: h
        }))(O(t));
        return this.ub(e, i, s)
    }
    addSeries(t, i = {}, s = 0) {
        return this.ub(t, i, s)
    }
    removeSeries(t) {
        const i = N(this.tb.get(t)),
            s = this.rb.Jd(i);
        this.sv.Qt().Jd(i), this.cb(s), this.tb.delete(t), this.ib.delete(i)
    }
    qg(t, i) {
        this.cb(this.rb.sg(t, i))
    }
    Kg(t, i, s) {
        this.cb(this.rb.og(t, i, s))
    }
    Zg(t, i) {
        const [s, e] = this.rb.cg(t, i);
        return s.length !== 0 && this.cb(e), s
    }
    subscribeClick(t) {
        this.nb.i(t)
    }
    unsubscribeClick(t) {
        this.nb._(t)
    }
    subscribeCrosshairMove(t) {
        this.eb.i(t)
    }
    unsubscribeCrosshairMove(t) {
        this.eb._(t)
    }
    subscribeDblClick(t) {
        this.sb.i(t)
    }
    unsubscribeDblClick(t) {
        this.sb._(t)
    }
    priceScale(t, i = 0) {
        return new Js(this.sv, t, i)
    }
    timeScale() {
        return this.lb
    }
    applyOptions(t) {
        this.sv.vr(bs(t))
    }
    options() {
        return this.sv.N()
    }
    takeScreenshot(t = !1, i = !1) {
        let s, e;
        try {
            i || (s = this.sv.Qt().N().crosshair.mode, this.sv.vr({
                crosshair: {
                    mode: 2
                }
            })), e = this.sv.SM(t)
        } finally {
            i || s === void 0 || this.sv.Qt().vr({
                crosshair: {
                    mode: s
                }
            })
        }
        return e
    }
    addPane(t = !1) {
        const i = this.sv.Qt().af();
        return i.W_(t), this.fb(i)
    }
    removePane(t) {
        this.sv.Qt().Vd(t)
    }
    swapPanes(t, i) {
        this.sv.Qt().Ed(t, i)
    }
    autoSizeActive() {
        return this.sv.wM()
    }
    chartElement() {
        return this.sv.vv()
    }
    panes() {
        return this.sv.Qt().Zn().map((t => this.fb(t)))
    }
    paneSize(t = 0) {
        const i = this.sv.RM(t);
        return {
            height: i.height,
            width: i.width
        }
    }
    setCrosshairPosition(t, i, s) {
        const e = this.tb.get(s);
        if (e === void 0) return;
        const h = this.sv.Qt().Ks(e);
        h !== null && this.sv.Qt().qd(t, i, h)
    }
    clearCrosshairPosition() {
        this.sv.Qt().Yd(!0)
    }
    horzBehaviour() {
        return this.hb
    }
    ub(t, i = {}, s = 0) {
        z(t.ob !== void 0), (function(o) {
            if (o === void 0 || o.type === "custom") return;
            const l = o;
            l.minMove !== void 0 && l.precision === void 0 && (l.precision = Zs(l.minMove))
        })(i.priceFormat), t.type === "Candlestick" && (function(o) {
            o.borderColor !== void 0 && (o.borderUpColor = o.borderColor, o.borderDownColor = o.borderColor), o.wickColor !== void 0 && (o.wickUpColor = o.wickColor, o.wickDownColor = o.wickColor)
        })(i);
        const e = P(B(zs), B(t.defaultOptions), i),
            h = t.ob,
            n = new Ft(this.sv.Qt(), t.type, e, h, t._b);
        this.sv.Qt().Gd(n, s);
        const r = new dn(n, this, this, this, this.hb, (o => this.fb(o)));
        return this.tb.set(r, n), this.ib.set(n, r), r
    }
    cb(t) {
        const i = this.sv.Qt();
        i.Kd(t.Et.Pc, t.Et.vg, t.Et.mg), t.U_.forEach(((s, e) => e.ht(s.ue, s.pg))), i.Et()._c(), i.Bc()
    }
    pb(t) {
        return N(this.ib.get(t))
    }
    mb(t) {
        return t !== void 0 && this.ib.has(t) ? this.pb(t) : void 0
    }
    ab(t) {
        const i = new Map;
        t.YM.forEach(((h, n) => {
            const r = n.bh(),
                o = Rt(r)(h);
            if (r !== "Custom") z(Qh(o));
            else {
                const l = n.ol();
                z(!l || l(o) === !1)
            }
            i.set(this.pb(n), o)
        }));
        const s = this.mb(t.NM),
            e = t.WM === void 0 ? void 0 : {
                type: t.WM.ds,
                sourceKind: t.WM.HM,
                objectKind: t.WM.UM,
                series: this.mb(t.WM.U_),
                objectId: t.WM.$M,
                paneIndex: t.WM.jM
            };
        return {
            time: t.Qr,
            logical: t.$n,
            point: t.qM,
            paneIndex: t.jM,
            hoveredInfo: e,
            hoveredSeries: s,
            hoveredObjectId: t.FM,
            seriesData: i,
            sourceEvent: t.KM
        }
    }
    fb(t) {
        let i = this.od.get(t);
        return i || (i = new un(this.sv, (s => this.pb(s)), t, this), this.od.set(t, i)), i
    }
};

function vn(t) {
    if (wt(t)) {
        const i = document.getElementById(t);
        return z(i !== null, `Cannot find element in DOM with id=${t}`), i
    }
    return t
}

function pn(t, i, s) {
    const e = new mn(vn(t), i, s);
    return i.setOptions(e.options()), e
}

function Dn(t, i) {
    return pn(t, new is, is.yf(i))
}

function at(t, i, s, e) {
    return Math.hypot(s - t, e - i)
}

function te(t, i, s, e, h, n, r, o = 0) {
    if (i.length === 0 || e.from >= i.length || e.to <= 0) return;
    const {
        context: l,
        horizontalPixelRatio: a,
        verticalPixelRatio: u
    } = t, c = i[e.from];
    let d = n(t, c),
        f = c;
    if (e.to - e.from < 2) {
        const m = h / 2;
        l.beginPath();
        const p = {
                _t: c._t - m,
                ut: c.ut
            },
            g = {
                _t: c._t + m,
                ut: c.ut
            };
        l.moveTo(p._t * a, p.ut * u), l.lineTo(g._t * a, g.ut * u), r(t, d, p, g)
    } else {
        const m = o > 0;
        let p = 0;
        const g = (M, b) => {
            if (r(t, d, f, b), l.beginPath(), d = M, f = b, m) {
                const y = p % o;
                l.lineDashOffset = y, p = y
            }
        };
        let w = f;
        l.beginPath(), l.moveTo(c._t * a, c.ut * u);
        for (let M = e.from + 1; M < e.to; ++M) {
            w = i[M];
            const b = w._t * a,
                y = w.ut * u,
                C = n(t, w);
            switch (s) {
                case 0:
                    if (l.lineTo(b, y), m) {
                        const S = i[M - 1],
                            x = S._t * a,
                            E = S.ut * u;
                        p += at(x, E, b, y)
                    }
                    break;
                case 1:
                    {
                        const S = i[M - 1],
                            x = S.ut * u;l.lineTo(b, x),
                        m && (p += Math.abs(w._t - S._t) * a),
                        C !== d && (g(C, w), l.lineTo(b, x)),
                        l.lineTo(b, y),
                        m && (p += Math.abs(w.ut - S.ut) * u);
                        break
                    }
                case 2:
                    {
                        const [S, x] = xi(i, M - 1, M),
                        E = S._t * a,
                        L = S.ut * u,
                        W = x._t * a,
                        Q = x.ut * u;
                        if (l.bezierCurveTo(E, L, W, Q, b, y), m) {
                            const X = i[M - 1],
                                ot = X._t * a,
                                V = X.ut * u,
                                bt = at(ot, V, b, y),
                                $ = at(ot, V, E, L) + at(E, L, W, Q) + at(W, Q, b, y);
                            p += (bt + $) / 2
                        }
                        break
                    }
            }
            s !== 1 && C !== d && (g(C, w), l.moveTo(b, y))
        }(f !== w || f === w && s === 1) && r(t, d, f, w), m && (l.lineDashOffset = 0)
    }
}
var Ms = 6;

function oi(t, i) {
    return {
        _t: t._t - i._t,
        ut: t.ut - i.ut
    }
}

function ys(t, i) {
    return {
        _t: t._t / i,
        ut: t.ut / i
    }
}

function xi(t, i, s) {
    const e = Math.max(0, i - 1),
        h = Math.min(t.length - 1, s + 1);
    var n, r;
    return [(n = t[i], r = ys(oi(t[s], t[e]), Ms), {
        _t: n._t + r._t,
        ut: n.ut + r.ut
    }), oi(t[s], ys(oi(t[h], t[i]), Ms))]
}

function gn(t, i) {
    const s = t.context;
    s.strokeStyle = i, s.stroke()
}
var wn = class extends K {
        constructor() {
            super(...arguments), this.rt = null
        }
        ht(t) {
            this.rt = t
        }
        et(t) {
            if (this.rt === null) return;
            const {
                ot: i,
                lt: s,
                wb: e,
                Mb: h,
                ct: n,
                Zt: r,
                gb: o
            } = this.rt;
            if (s === null) return;
            const l = t.context;
            l.lineCap = "butt", l.lineWidth = n * t.verticalPixelRatio;
            const a = D(l, r);
            l.lineJoin = "round";
            const u = this.bb.bind(this),
                c = (function(d) {
                    return d.reduce(((f, m) => f + m), 0)
                })(a);
            h !== void 0 && te(t, i, h, s, e, u, gn, c), o && (function(d, f, m, p, g) {
                if (p.to - p.from <= 0) return;
                const {
                    horizontalPixelRatio: w,
                    verticalPixelRatio: M,
                    context: b
                } = d;
                let y = null;
                const C = Math.max(1, Math.floor(w)) % 2 / 2,
                    S = m * M + C;
                for (let x = p.to - 1; x >= p.from; --x) {
                    const E = f[x];
                    if (E) {
                        const L = g(d, E);
                        L !== y && (y !== null && b.fill(), b.beginPath(), b.fillStyle = L, y = L);
                        const W = Math.round(E._t * w) + C,
                            Q = E.ut * M;
                        b.moveTo(W, Q), b.arc(W, Q, S, 0, 2 * Math.PI)
                    }
                }
                b.fill()
            })(t, i, o, s, u)
        }
    },
    bn = class extends wn {
        bb(t, i) {
            return i.vt
        }
    };

function Ss(t, i, s, e, h) {
    const n = 1 - h;
    return n * n * n * t + 3 * n * n * h * i + 3 * n * h * h * s + h * h * h * e
}

function Mn(t, i, s, e, h) {
    if (s === 2) {
        const [n, r] = xi(e, h - 1, h);
        return [Math.min(t._t, i._t, n._t, r._t), Math.max(t._t, i._t, n._t, r._t)]
    }
    return [Math.min(t._t, i._t), Math.max(t._t, i._t)]
}

function yn(t, i, s, e, h, n, r, o) {
    switch (h) {
        case 1:
            {
                const l = ut(t, i, s._t, s.ut, e._t, s.ut),
                    a = ut(t, i, e._t, s.ut, e._t, e.ut),
                    u = Math.min(l, a);
                return u <= o ? u : null
            }
        case 2:
            {
                const [l, a] = xi(n, r - 1, r),
                u = (function(c, d, f) {
                    let m = Number.POSITIVE_INFINITY,
                        p = f[0];
                    for (let g = 1; g <= 12; g++) {
                        const w = g / 12,
                            M = {
                                _t: Ss(f[0]._t, f[1]._t, f[2]._t, f[3]._t, w),
                                ut: Ss(f[0].ut, f[1].ut, f[2].ut, f[3].ut, w)
                            };
                        m = Math.min(m, ut(c, d, p._t, p.ut, M._t, M.ut)), p = M
                    }
                    return m
                })(t, i, [s, l, a, e]);
                return u <= o ? u : null
            }
        default:
            {
                const l = ut(t, i, s._t, s.ut, e._t, e.ut);
                return l <= o ? l : null
            }
    }
}
var Sn = class extends Si {
        constructor(t, i) {
            super(t, i, !0)
        }
        Vg(t, i, s) {
            i.Tc(this.bg, vt(this.Sg)), t.Zo(this.bg, s, vt(this.Sg))
        }
        Sb(t, i) {
            return {
                wt: t,
                Mt: i,
                _t: NaN,
                ut: NaN
            }
        }
        Dg() {
            const t = this.ae.Sa();
            this.bg = this.ae.Ha().Bh().map((i => {
                let s;
                if ((i.Zr ? ? 1) > 1) {
                    const e = i.Wt[1],
                        h = i.Wt[2],
                        n = i.Wt[3];
                    s = Math.abs(e - n) > Math.abs(h - n) ? e : h
                } else s = i.Wt[3];
                return this.xb(i.$n, s, t)
            }))
        }
    },
    _n = class extends Sn {
        Pg(t, i) {
            const s = this.ae.N();
            return (function(e, h, n, r, o, l, a, u = 0, c = 0) {
                if (h === null || h.from >= h.to || e.length === 0) return null;
                const d = Math.max(l / 2, a ? ? 0) + c;
                let f = Number.POSITIVE_INFINITY;
                if (a !== void 0) {
                    const b = a + c,
                        y = vi(e, n - b, h.from, h.to),
                        C = pi(e, n + b, y, h.to);
                    for (let S = y; S < C; S++) {
                        const x = e[S];
                        if (!vs(n, x._t, x._t, a + c)) continue;
                        const E = Math.hypot(n - x._t, r - x.ut);
                        E <= a + c && (f = Math.min(f, E))
                    }
                }
                if (h.to - h.from < 2) {
                    const b = e[h.from],
                        y = Math.max(u / 2, d),
                        C = ut(n, r, b._t - y, b.ut, b._t + y, b.ut);
                    return C <= d && (f = Math.min(f, C)), Number.isFinite(f) ? Pt(f, 2, "series-point") : null
                }
                let m = Number.POSITIVE_INFINITY;
                const p = vi(e, n - d, h.from, h.to),
                    g = pi(e, n + d, p, h.to),
                    w = Math.max(h.from + 1, p),
                    M = Math.min(h.to, g + 1);
                for (let b = w; b < M; b++) {
                    const y = e[b - 1],
                        C = e[b],
                        [S, x] = Mn(y, C, o, e, b);
                    if (!vs(n, S, x, d)) continue;
                    const E = yn(n, r, y, C, o, e, b, d);
                    E !== null && (m = Math.min(m, E))
                }
                return Number.isFinite(f) ? Pt(f, 2, "series-point") : Number.isFinite(m) ? Pt(m, 1, "series-line") : null
            })(this.bg, this.Sg, t, i, s.lineType, s.lineVisible ? s.lineWidth : 1, s.pointMarkersVisible ? s.pointMarkersRadius || s.lineWidth / 2 + 2 : void 0, this.le.Et().fl(), s.hitTestTolerance)
        }
    };

function xn(t, i, s, e, h) {
    const {
        context: n,
        horizontalPixelRatio: r,
        verticalPixelRatio: o
    } = i;
    n.lineTo(h._t * r, t * o), n.lineTo(e._t * r, t * o), n.closePath(), n.fillStyle = s, n.fill()
}
var Cn = class extends K {
        constructor() {
            super(...arguments), this.rt = null
        }
        ht(t) {
            this.rt = t
        }
        et(t) {
            if (this.rt === null) return;
            const {
                ot: i,
                lt: s,
                wb: e,
                ct: h,
                Zt: n,
                Mb: r
            } = this.rt, o = this.rt.Db ? ? (this.rt.Ib ? 0 : t.mediaSize.height);
            if (s === null) return;
            const l = t.context;
            l.lineCap = "butt", l.lineJoin = "round", l.lineWidth = h, D(l, n), l.lineWidth = 1, te(t, i, r, s, e, this.Vb.bind(this), xn.bind(null, o))
        }
    },
    En = class {
        Bb(t, i) {
            const s = this.Eb,
                {
                    Ab: e,
                    Lb: h,
                    zb: n,
                    Ob: r,
                    Db: o,
                    Nb: l,
                    Fb: a
                } = i;
            if (this.Wb === void 0 || s === void 0 || s.Ab !== e || s.Lb !== h || s.zb !== n || s.Ob !== r || s.Db !== o || s.Nb !== l || s.Fb !== a) {
                const {
                    verticalPixelRatio: u
                } = t, c = o || l > 0 ? u : 1, d = l * c, f = a === t.bitmapSize.height ? a : a * c, m = (o ? ? 0) * c, p = t.context.createLinearGradient(0, d, 0, f);
                if (p.addColorStop(0, e), o != null) {
                    const g = et((m - d) / (f - d), 0, 1);
                    p.addColorStop(g, h), p.addColorStop(g, n)
                }
                p.addColorStop(1, r), this.Wb = p, this.Eb = i
            }
            return this.Wb
        }
    },
    Tn = class extends Cn {
        constructor() {
            super(...arguments), this.Hb = new En
        }
        Vb(t, i) {
            return this.Hb.Bb(t, {
                Ab: i.ah,
                Lb: "",
                zb: "",
                Ob: i.oh,
                Nb: this.rt ? .Nb ? ? 0,
                Fb: t.bitmapSize.height
            })
        }
    },
    zn = class extends _n {
        constructor(t, i) {
            super(t, i), this.kg = new Ps, this.qb = new Tn, this.Yb = new bn, this.kg.nt([this.qb, this.Yb])
        }
        xb(t, i, s) {
            return { ...this.Sb(t, i),
                ...s.Sh(t)
            }
        }
        Bg() {
            const t = this.ae.N();
            if (this.Sg === null || this.bg.length === 0) return;
            let i;
            if (t.relativeGradient) {
                i = this.bg[this.Sg.from].ut;
                for (let s = this.Sg.from; s < this.Sg.to; s++) {
                    const e = this.bg[s];
                    e.ut < i && (i = e.ut)
                }
            }
            this.qb.ht({
                Mb: t.lineType,
                ot: this.bg,
                Zt: t.lineStyle,
                ct: t.lineWidth,
                Db: null,
                Nb: i,
                Ib: t.invertFilledArea,
                lt: this.Sg,
                wb: this.le.Et().fl()
            }), this.Yb.ht({
                Mb: t.lineVisible ? t.lineType : void 0,
                ot: this.bg,
                Zt: t.lineStyle,
                ct: t.lineWidth,
                lt: this.Sg,
                wb: this.le.Et().fl(),
                gb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0
            })
        }
    },
    Kn = {
        type: "Area",
        isBuiltIn: !0,
        defaultOptions: {
            topColor: "rgba( 46, 220, 135, 0.4)",
            bottomColor: "rgba( 40, 221, 100, 0)",
            invertFilledArea: !1,
            relativeGradient: !1,
            lineColor: "#33D778",
            lineStyle: 0,
            lineWidth: 3,
            lineType: 0,
            lineVisible: !0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
            pointMarkersVisible: !1
        },
        ob: (t, i) => new zn(t, i)
    },
    kn = class extends Si {
        constructor(t, i) {
            super(t, i, !1)
        }
        Pg(t, i) {
            return Us(this.bg, this.Sg, t, i, this.le.Et().fl(), this.ae.N().hitTestTolerance, ((s, e) => {
                e[0] = s.Qo, e[1] = s.t_
            }))
        }
        Vg(t, i, s) {
            i.Tc(this.bg, vt(this.Sg)), t.Xo(this.bg, s, vt(this.Sg))
        }
        Qb(t, i, s) {
            return {
                wt: t,
                jr: i.Wt[0],
                qr: i.Wt[1],
                Yr: i.Wt[2],
                Kr: i.Wt[3],
                _t: NaN,
                Jo: NaN,
                Qo: NaN,
                t_: NaN,
                i_: NaN
            }
        }
        Dg() {
            const t = this.ae.Sa();
            this.bg = this.ae.Ha().Bh().map((i => this.xb(i.$n, i, t)))
        }
    },
    Nn = class extends K {
        constructor() {
            super(...arguments), this.qt = null, this.Kb = 0
        }
        ht(t) {
            this.qt = t
        }
        et(t) {
            if (this.qt === null || this.qt.Un.length === 0 || this.qt.lt === null) return;
            const {
                horizontalPixelRatio: i
            } = t;
            this.Kb = (function(h, n) {
                if (h >= 2.5 && h <= 4) return Math.floor(3 * n);
                const r = 1 - .2 * Math.atan(Math.max(4, h) - 4) / (.5 * Math.PI),
                    o = Math.floor(h * r * n),
                    l = Math.floor(h * n);
                return Math.max(Math.floor(n), Math.min(o, l))
            })(this.qt.fl, i), this.Kb >= 2 && Math.floor(i) % 2 != this.Kb % 2 && this.Kb--;
            const s = this.qt.Un;
            this.qt.tS && this.iS(t, s, this.qt.lt), this.qt.gi && this.Rm(t, s, this.qt.lt);
            const e = this.nS(i);
            (!this.qt.gi || this.Kb > 2 * e) && this.sS(t, s, this.qt.lt)
        }
        iS(t, i, s) {
            if (this.qt === null) return;
            const {
                context: e,
                horizontalPixelRatio: h,
                verticalPixelRatio: n
            } = t;
            let r = "",
                o = Math.min(Math.floor(h), Math.floor(this.qt.fl * h));
            o = Math.max(Math.floor(h), Math.min(o, this.Kb));
            const l = Math.floor(.5 * o);
            let a = null;
            for (let u = s.from; u < s.to; u++) {
                const c = i[u];
                c.rh !== r && (e.fillStyle = c.rh, r = c.rh);
                const d = Math.round(Math.min(c.Jo, c.i_) * n),
                    f = Math.round(Math.max(c.Jo, c.i_) * n),
                    m = Math.round(c.Qo * n),
                    p = Math.round(c.t_ * n);
                let g = Math.round(h * c._t) - l;
                const w = g + o - 1;
                a !== null && (g = Math.max(a + 1, g), g = Math.min(g, w));
                const M = w - g + 1;
                e.fillRect(g, m, M, d - m), e.fillRect(g, f + 1, M, p - f), a = w
            }
        }
        nS(t) {
            let i = Math.floor(1 * t);
            this.Kb <= 2 * i && (i = Math.floor(.5 * (this.Kb - 1)));
            const s = Math.max(Math.floor(t), i);
            return this.Kb <= 2 * s ? Math.max(Math.floor(t), Math.floor(1 * t)) : s
        }
        Rm(t, i, s) {
            if (this.qt === null) return;
            const {
                context: e,
                horizontalPixelRatio: h,
                verticalPixelRatio: n
            } = t;
            let r = "";
            const o = this.nS(h);
            let l = null;
            for (let a = s.from; a < s.to; a++) {
                const u = i[a];
                u.eh !== r && (e.fillStyle = u.eh, r = u.eh);
                let c = Math.round(u._t * h) - Math.floor(.5 * this.Kb);
                const d = c + this.Kb - 1,
                    f = Math.round(Math.min(u.Jo, u.i_) * n),
                    m = Math.round(Math.max(u.Jo, u.i_) * n);
                if (l !== null && (c = Math.max(l + 1, c), c = Math.min(c, d)), this.qt.fl * h > 2 * o) we(e, c, f, d - c + 1, m - f + 1, o);
                else {
                    const p = d - c + 1;
                    e.fillRect(c, f, p, m - f + 1)
                }
                l = d
            }
        }
        sS(t, i, s) {
            if (this.qt === null) return;
            const {
                context: e,
                horizontalPixelRatio: h,
                verticalPixelRatio: n
            } = t;
            let r = "";
            const o = this.nS(h);
            for (let l = s.from; l < s.to; l++) {
                const a = i[l];
                let u = Math.round(Math.min(a.Jo, a.i_) * n),
                    c = Math.round(Math.max(a.Jo, a.i_) * n),
                    d = Math.round(a._t * h) - Math.floor(.5 * this.Kb),
                    f = d + this.Kb - 1;
                if (a.sh !== r) {
                    const m = a.sh;
                    e.fillStyle = m, r = m
                }
                this.qt.gi && (d += o, u += o, f -= o, c -= o), u > c || e.fillRect(d, u, f - d + 1, c - u + 1)
            }
        }
    },
    Pn = class extends kn {
        constructor() {
            super(...arguments), this.kg = new Nn
        }
        xb(t, i, s) {
            return { ...this.Qb(t, i, s),
                ...s.Sh(t)
            }
        }
        Bg() {
            const t = this.ae.N();
            this.kg.ht({
                Un: this.bg,
                fl: this.le.Et().fl(),
                tS: t.wickVisible,
                gi: t.borderVisible,
                lt: this.Sg
            })
        }
    },
    Vn = {
        type: "Candlestick",
        isBuiltIn: !0,
        defaultOptions: {
            upColor: "#26a69a",
            downColor: "#ef5350",
            wickVisible: !0,
            borderVisible: !0,
            borderColor: "#378658",
            borderUpColor: "#26a69a",
            borderDownColor: "#ef5350",
            wickColor: "#737375",
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350"
        },
        ob: (t, i) => new Pn(t, i)
    },
    Rn = class {
        constructor(t, i) {
            this.ae = t, this.Jh = i, this.oS()
        }
        detach() {
            this.ae.detachPrimitive(this.Jh)
        }
        getSeries() {
            return this.ae
        }
        applyOptions(t) {
            this.Jh && this.Jh.vr && this.Jh.vr(t)
        }
        oS() {
            this.ae.attachPrimitive(this.Jh)
        }
    },
    Ln = {
        autoScale: !0,
        zOrder: "normal"
    };

function ft(t, i) {
    return bi(Math.min(Math.max(t, 12), 30) * i)
}

function rt(t, i) {
    switch (t) {
        case "arrowDown":
        case "arrowUp":
            return ft(i, 1);
        case "circle":
            return ft(i, .8);
        case "square":
            return ft(i, .7)
    }
}

function ie(t) {
    return (function(i) {
        const s = Math.ceil(i);
        return s % 2 != 0 ? s - 1 : s
    })(ft(t, 1))
}

function se(t) {
    return Math.max(ft(t, .1), 3)
}

function _s(t, i, s) {
    return i ? t : s ? Math.ceil(t / 2) : 0
}

function xs(t, i, s, e) {
    const h = (rt("arrowUp", e) - 1) / 2 * s.VS,
        n = (bi(e / 2) - 1) / 2 * s.VS;
    i.beginPath(), t ? (i.moveTo(s._t - h, s.ut), i.lineTo(s._t, s.ut - h), i.lineTo(s._t + h, s.ut), i.lineTo(s._t + n, s.ut), i.lineTo(s._t + n, s.ut + h), i.lineTo(s._t - n, s.ut + h), i.lineTo(s._t - n, s.ut)) : (i.moveTo(s._t - h, s.ut), i.lineTo(s._t, s.ut + h), i.lineTo(s._t + h, s.ut), i.lineTo(s._t + n, s.ut), i.lineTo(s._t + n, s.ut - h), i.lineTo(s._t - n, s.ut - h), i.lineTo(s._t - n, s.ut)), i.fill()
}

function Cs(t, i, s, e, h, n) {
    const r = (rt("arrowUp", e) - 1) / 2,
        o = (bi(e / 2) - 1) / 2;
    return h >= i - o - 2 && h <= i + o + 2 && n >= (t ? s : s - r) - 2 && n <= (t ? s + r : s) + 2 ? !0 : (() => {
        if (h < i - r - 3 || h > i + r + 3 || n < (t ? s - r - 3 : s) || n > (t ? s : s + r + 3)) return !1;
        const l = Math.abs(h - i);
        return Math.abs(n - s) + 3 >= l / 2
    })()
}
var In = class {
    constructor() {
        this.qt = null, this.$s = new gt, this.F = -1, this.W = "", this.nm = "", this.BS = "normal"
    }
    ht(t) {
        this.qt = t
    }
    js(t, i, s) {
        this.F === t && this.W === i || (this.F = t, this.W = i, this.nm = pt(t, i), this.$s.Os()), this.BS = s
    }
    Qs(t, i) {
        if (this.qt === null || this.qt.lt === null) return null;
        for (let s = this.qt.lt.from; s < this.qt.lt.to; s++) {
            const e = this.qt.ot[s];
            if (e && Bn(e, t, i)) return {
                zOrder: "normal",
                externalId: e.te ? ? "",
                itemType: "marker"
            }
        }
        return null
    }
    draw(t) {
        this.BS !== "aboveSeries" && t.useBitmapCoordinateSpace((i => {
            this.et(i)
        }))
    }
    drawBackground(t) {
        this.BS === "aboveSeries" && t.useBitmapCoordinateSpace((i => {
            this.et(i)
        }))
    }
    et({
        context: t,
        horizontalPixelRatio: i,
        verticalPixelRatio: s
    }) {
        if (this.qt !== null && this.qt.lt !== null) {
            t.textBaseline = "middle", t.font = this.nm;
            for (let e = this.qt.lt.from; e < this.qt.lt.to; e++) {
                const h = this.qt.ot[e];
                h.ri !== void 0 && (h.ri.nn = this.$s.Ii(t, h.ri.ES), h.ri.$t = this.F, h.ri._t = h._t - h.ri.nn / 2), Qn(h, t, i, s)
            }
        }
    }
};

function Qn(t, i, s, e) {
    i.fillStyle = t.R, t.ri !== void 0 && (function(h, n, r, o, l, a) {
        h.save(), h.scale(l, a), h.fillText(n, r, o), h.restore()
    })(i, t.ri.ES, t.ri._t, t.ri.ut, s, e), (function(h, n, r) {
        if (h.Th !== 0) {
            switch (h.AS) {
                case "arrowDown":
                    xs(!1, n, r, h.Th);
                    return;
                case "arrowUp":
                    xs(!0, n, r, h.Th);
                    return;
                case "circle":
                    (function(o, l, a) {
                        const u = (rt("circle", a) - 1) / 2;
                        o.beginPath(), o.arc(l._t, l.ut, u * l.VS, 0, 2 * Math.PI, !1), o.fill()
                    })(n, r, h.Th);
                    return;
                case "square":
                    (function(o, l, a) {
                        const u = rt("square", a),
                            c = (u - 1) * l.VS / 2,
                            d = l._t - c,
                            f = l.ut - c;
                        o.fillRect(d, f, u * l.VS, u * l.VS)
                    })(n, r, h.Th);
                    return
            }
            h.AS
        }
    })(t, i, (function(h, n, r) {
        const o = Math.max(1, Math.floor(n)) % 2 / 2;
        return {
            _t: Math.round(h._t * n) + o,
            ut: h.ut * r,
            VS: n
        }
    })(t, s, e))
}

function Bn(t, i, s) {
    return !(t.ri === void 0 || !(function(e, h, n, r, o, l) {
        const a = r / 2;
        return o >= e && o <= e + n && l >= h - a && l <= h + a
    })(t.ri._t, t.ri.ut, t.ri.nn, t.ri.$t, i, s)) || (function(e, h, n) {
        if (e.Th === 0) return !1;
        switch (e.AS) {
            case "arrowDown":
                return Cs(!0, e._t, e.ut, e.Th, h, n);
            case "arrowUp":
                return Cs(!1, e._t, e.ut, e.Th, h, n);
            case "circle":
                return (function(r, o, l, a, u) {
                    const c = 2 + rt("circle", l) / 2,
                        d = r - a,
                        f = o - u;
                    return Math.sqrt(d * d + f * f) <= c
                })(e._t, e.ut, e.Th, h, n);
            case "square":
                return (function(r, o, l, a, u) {
                    const c = rt("square", l),
                        d = (c - 1) / 2,
                        f = r - d,
                        m = o - d;
                    return a >= f && a <= f + c && u >= m && u <= m + c
                })(e._t, e.ut, e.Th, h, n)
        }
    })(t, i, s)
}

function Es(t) {
    return t === "atPriceTop" || t === "atPriceBottom" || t === "atPriceMiddle"
}

function qn(t, i, s, e, h, n, r, o) {
    const l = (function(m, p, g) {
        if (Es(p.position) && p.price !== void 0) return p.price;
        if ("value" in (w = m) && typeof w.value == "number") return m.value;
        var w;
        if ((function(M) {
                return "open" in M && "high" in M && "low" in M && "close" in M
            })(m)) {
            if (p.position === "inBar") return m.close;
            if (p.position === "aboveBar") return g ? m.low : m.high;
            if (p.position === "belowBar") return g ? m.high : m.low
        }
    })(s, i, r.priceScale().options().invertScale);
    if (l === void 0) return;
    const a = Es(i.position),
        u = o.timeScale(),
        c = G(i.size) ? Math.max(i.size, 0) : 1,
        d = ie(u.options().barSpacing) * c,
        f = d / 2;
    switch (t.Th = d, i.position) {
        case "inBar":
        case "atPriceMiddle":
            t.ut = v(r.priceToCoordinate(l)), t.ri !== void 0 && (t.ri.ut = t.ut + f + n + .6 * h);
            return;
        case "aboveBar":
        case "atPriceTop":
            {
                const m = a ? 0 : e.LS;t.ut = v(r.priceToCoordinate(l)) - f - m,
                t.ri !== void 0 && (t.ri.ut = t.ut - f - .6 * h, e.LS += 1.2 * h),
                a || (e.LS += d + n);
                return
            }
        case "belowBar":
        case "atPriceBottom":
            {
                const m = a ? 0 : e.zS;t.ut = v(r.priceToCoordinate(l)) + f + m,
                t.ri !== void 0 && (t.ri.ut = t.ut + f + n + .6 * h, e.zS += 1.2 * h),
                a || (e.zS += d + n);
                return
            }
    }
}
var Wn = class {
    constructor(t, i, s) {
        this.OS = [], this.xt = !0, this.NS = !0, this.Xt = new In, this.Te = t, this.qv = i, this.qt = {
            ot: [],
            lt: null
        }, this.yn = s
    }
    renderer() {
        if (!this.Te.options().visible) return null;
        this.xt && this.yg();
        const t = this.qv.options().layout;
        return this.Xt.js(t.fontSize, t.fontFamily, this.yn.zOrder), this.Xt.ht(this.qt), this.Xt
    }
    FS(t) {
        this.OS = t, this.kt("data")
    }
    kt(t) {
        this.xt = !0, t === "data" && (this.NS = !0)
    }
    WS(t) {
        this.xt = !0, this.yn = t
    }
    zOrder() {
        return this.yn.zOrder === "aboveSeries" ? "top" : this.yn.zOrder
    }
    yg() {
        const t = this.qv.timeScale(),
            i = this.OS;
        this.NS && (this.qt.ot = i.map((l => ({
            wt: l.time,
            _t: 0,
            ut: 0,
            Th: 0,
            AS: l.shape,
            R: l.color,
            te: l.id,
            HS: l.HS,
            ri: void 0
        }))), this.NS = !1);
        const s = this.qv.options().layout;
        this.qt.lt = null;
        const e = t.getVisibleLogicalRange();
        if (e === null) return;
        const h = new ht(Math.floor(e.from), Math.ceil(e.to));
        if (this.Te.data()[0] === null || this.qt.ot.length === 0) return;
        let n = NaN;
        const r = se(t.options().barSpacing),
            o = {
                LS: r,
                zS: r
            };
        this.qt.lt = js(this.qt.ot, h, !0);
        for (let l = this.qt.lt.from; l < this.qt.lt.to; l++) {
            const a = i[l];
            a.time !== n && (o.LS = r, o.zS = r, n = a.time);
            const u = this.qt.ot[l];
            u._t = v(t.logicalToCoordinate(a.time)), a.text !== void 0 && a.text.length > 0 && (u.ri = {
                ES: a.text,
                _t: 0,
                ut: 0,
                nn: 0,
                $t: 0
            });
            const c = this.Te.dataByIndex(a.time, 0);
            c !== null && qn(u, a, c, o, s.fontSize, r, this.Te, this.qv)
        }
        this.xt = !1
    }
};

function Ts(t) {
    return { ...Ln,
        ...t
    }
}
var Fn = class {
        constructor(t) {
            this.Yh = null, this.OS = [], this.US = [], this.$S = null, this.Te = null, this.qv = null, this.jS = !0, this.qS = null, this.YS = null, this.KS = null, this.ZS = !0, this.yn = Ts(t)
        }
        attached(t) {
            this.GS(), this.qv = t.chart, this.Te = t.series, this.Yh = new Wn(this.Te, v(this.qv), this.yn), this.DS = t.requestUpdate, this.Te.subscribeDataChanged((i => this.Yg(i))), this.ZS = !0, this.pS()
        }
        pS() {
            this.DS && this.DS()
        }
        detached() {
            this.Te && this.$S && this.Te.unsubscribeDataChanged(this.$S), this.qv = null, this.Te = null, this.Yh = null, this.$S = null
        }
        FS(t) {
            this.ZS = !0, this.OS = t, this.GS(), this.jS = !0, this.YS = null, this.pS()
        }
        XS() {
            return this.OS
        }
        paneViews() {
            return this.Yh ? [this.Yh] : []
        }
        updateAllViews() {
            this.JS()
        }
        hitTest(t, i) {
            return this.Yh ? this.Yh.renderer() ? .Qs(t, i) ? ? null : null
        }
        autoscaleInfo(t, i) {
            if (this.yn.autoScale && this.Yh) {
                const s = this.QS();
                if (s) return {
                    priceRange: null,
                    margins: s
                }
            }
            return null
        }
        vr(t) {
            this.yn = Ts({ ...this.yn,
                ...t
            }), this.pS && this.pS()
        }
        QS() {
            const t = v(this.qv).timeScale().options().barSpacing;
            if (this.jS || t !== this.KS) {
                if (this.KS = t, this.OS.length > 0) {
                    const i = se(t),
                        s = 1.5 * ie(t) + 2 * i,
                        e = this.tx();
                    this.qS = {
                        above: _s(s, e.aboveBar, e.inBar),
                        below: _s(s, e.belowBar, e.inBar)
                    }
                } else this.qS = null;
                this.jS = !1
            }
            return this.qS
        }
        tx() {
            return this.YS === null && (this.YS = this.OS.reduce(((t, i) => (t[i.position] || (t[i.position] = !0), t)), {
                inBar: !1,
                aboveBar: !1,
                belowBar: !1,
                atPriceTop: !1,
                atPriceBottom: !1,
                atPriceMiddle: !1
            })), this.YS
        }
        GS() {
            if (!this.ZS || !this.qv || !this.Te) return;
            const t = this.qv.timeScale(),
                i = this.Te ? .data();
            if (t.getVisibleLogicalRange() == null || !this.Te || i.length === 0) return void(this.US = []);
            const s = t.timeToIndex(v(i[0].time), !0);
            this.US = this.OS.map(((e, h) => {
                const n = t.timeToIndex(e.time, !0),
                    r = n < s ? 1 : -1,
                    o = v(this.Te).dataByIndex(n, r),
                    l = {
                        time: t.timeToIndex(v(o).time, !1),
                        position: e.position,
                        shape: e.shape,
                        color: e.color,
                        id: e.id,
                        HS: h,
                        text: e.text,
                        size: e.size,
                        price: e.price,
                        Qr: e.time
                    };
                if (e.position === "atPriceTop" || e.position === "atPriceBottom" || e.position === "atPriceMiddle") {
                    if (e.price === void 0) throw new Error(`Price is required for position ${e.position}`);
                    return { ...l,
                        position: e.position,
                        price: e.price
                    }
                }
                return { ...l,
                    position: e.position,
                    price: e.price
                }
            })), this.ZS = !1
        }
        JS(t) {
            this.Yh && (this.GS(), this.Yh.FS(this.US), this.Yh.WS(this.yn), this.Yh.kt(t))
        }
        Yg(t) {
            this.ZS = !0, this.pS()
        }
    },
    On = class extends Rn {
        constructor(t, i, s) {
            super(t, i), s && this.setMarkers(s)
        }
        setMarkers(t) {
            this.Jh.FS(t)
        }
        markers() {
            return this.Jh.XS()
        }
    };

function $n(t, i, s) {
    const e = new On(t, new Fn(s ? ? {}));
    return i && e.setMarkers(i), e
}
var Yn = { ...zs,
    color: "#2196f3"
};
export {
    Dn as a, Kn as i, Li as n, Ti as o, $n as r, Vn as t
};