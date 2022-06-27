const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
let processor = (() => {
    var t = {
        321: (t, e, r) => {
            var n, o = void 0 !== o ? o : {}, i = {};
            for (n in o)
                o.hasOwnProperty(n) && (i[n] = o[n]);
            var a, u, s, c, f, l = [], p = "./this.program", d = "object" == typeof window, h = "function" == typeof importScripts, y = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, m = "";
            y ? (m = h ? r(997).dirname(m) + "/" : "//",
                a = function (t, e) {
                    return c || (c = r(194)),
                        f || (f = r(997)),
                        t = f.normalize(t),
                        c.readFileSync(t, e ? null : "utf8")
                }
                ,
                s = function (t) {
                    var e = a(t, !0);
                    return e.buffer || (e = new Uint8Array(e)),
                        T(e.buffer),
                        e
                }
                ,
                u = function (t, e, n) {
                    c || (c = r(194)),
                        f || (f = r(997)),
                        t = f.normalize(t),
                        c.readFile(t, (function (t, r) {
                            t ? n(t) : e(r.buffer)
                        }
                        ))
                }
                ,
                process.argv.length > 1 && (p = process.argv[1].replace(/\\/g, "/")),
                l = process.argv.slice(2),
                t.exports = o,
                process.on("uncaughtException", (function (t) {
                    if (!(t instanceof Re))
                        throw t
                }
                )),
                process.on("unhandledRejection", (function (t) {
                    throw t
                }
                )),
                function (t, e) {
                    if (_)
                        throw process.exitCode = t,
                        e;
                    var r;
                    (r = e) instanceof Re || g("exiting due to exception: " + r),
                        process.exit(t)
                }
                ,
                o.inspect = function () {
                    return "[Emscripten Module object]"
                }
            ) : (d || h) && (h ? m = self.location.href : "undefined" != typeof document && document.currentScript && (m = document.currentScript.src),
                m = 0 !== m.indexOf("blob:") ? m.substr(0, m.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "",
                a = function (t) {
                    var e = new XMLHttpRequest;
                    return e.open("GET", t, !1),
                        e.send(null),
                        e.responseText
                }
                ,
                h && (s = function (t) {
                    var e = new XMLHttpRequest;
                    return e.open("GET", t, !1),
                        e.responseType = "arraybuffer",
                        e.send(null),
                        new Uint8Array(e.response)
                }
                ),
                u = function (t, e, r) {
                    var n = new XMLHttpRequest;
                    n.open("GET", t, !0),
                        n.responseType = "arraybuffer",
                        n.onload = function () {
                            200 == n.status || 0 == n.status && n.response ? e(n.response) : r()
                        }
                        ,
                        n.onerror = r,
                        n.send(null)
                }
            );
            var v = o.print || console.log.bind(console)
                , g = o.printErr || console.warn.bind(console);
            for (n in i)
                i.hasOwnProperty(n) && (o[n] = i[n]);
            i = null,
                o.arguments && (l = o.arguments),
                o.thisProgram && (p = o.thisProgram),
                o.quit && o.quit;
            var w;
            o.wasmBinary && (w = o.wasmBinary);
            var b, _ = o.noExitRuntime || !0;
            "object" != typeof WebAssembly && K("no native wasm support detected");
            var C = !1;
            function T(t, e) {
                t || K("Assertion failed: " + e)
            }
            var $ = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
            function P(t, e, r) {
                for (var n = e + r, o = e; t[o] && !(o >= n);)
                    ++o;
                if (o - e > 16 && t.subarray && $)
                    return $.decode(t.subarray(e, o));
                for (var i = ""; e < o;) {
                    var a = t[e++];
                    if (128 & a) {
                        var u = 63 & t[e++];
                        if (192 != (224 & a)) {
                            var s = 63 & t[e++];
                            if ((a = 224 == (240 & a) ? (15 & a) << 12 | u << 6 | s : (7 & a) << 18 | u << 12 | s << 6 | 63 & t[e++]) < 65536)
                                i += String.fromCharCode(a);
                            else {
                                var c = a - 65536;
                                i += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)
                            }
                        } else
                            i += String.fromCharCode((31 & a) << 6 | u)
                    } else
                        i += String.fromCharCode(a)
                }
                return i
            }
            function A(t, e) {
                return t ? P(O, t, e) : ""
            }
            function D(t, e, r, n) {
                if (!(n > 0))
                    return 0;
                for (var o = r, i = r + n - 1, a = 0; a < t.length; ++a) {
                    var u = t.charCodeAt(a);
                    if (u >= 55296 && u <= 57343)
                        u = 65536 + ((1023 & u) << 10) | 1023 & t.charCodeAt(++a);
                    if (u <= 127) {
                        if (r >= i)
                            break;
                        e[r++] = u
                    } else if (u <= 2047) {
                        if (r + 1 >= i)
                            break;
                        e[r++] = 192 | u >> 6,
                            e[r++] = 128 | 63 & u
                    } else if (u <= 65535) {
                        if (r + 2 >= i)
                            break;
                        e[r++] = 224 | u >> 12,
                            e[r++] = 128 | u >> 6 & 63,
                            e[r++] = 128 | 63 & u
                    } else {
                        if (r + 3 >= i)
                            break;
                        e[r++] = 240 | u >> 18,
                            e[r++] = 128 | u >> 12 & 63,
                            e[r++] = 128 | u >> 6 & 63,
                            e[r++] = 128 | 63 & u
                    }
                }
                return e[r] = 0,
                    r - o
            }
            function F(t) {
                for (var e = 0, r = 0; r < t.length; ++r) {
                    var n = t.charCodeAt(r);
                    n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & t.charCodeAt(++r)),
                        n <= 127 ? ++e : e += n <= 2047 ? 2 : n <= 65535 ? 3 : 4
                }
                return e
            }
            var E, S, O, k, W, j, R, M, I, x = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
            function U(t, e) {
                for (var r = t, n = r >> 1, o = n + e / 2; !(n >= o) && W[n];)
                    ++n;
                if ((r = n << 1) - t > 32 && x)
                    return x.decode(O.subarray(t, r));
                for (var i = "", a = 0; !(a >= e / 2); ++a) {
                    var u = k[t + 2 * a >> 1];
                    if (0 == u)
                        break;
                    i += String.fromCharCode(u)
                }
                return i
            }
            function H(t, e, r) {
                if (void 0 === r && (r = 2147483647),
                    r < 2)
                    return 0;
                for (var n = e, o = (r -= 2) < 2 * t.length ? r / 2 : t.length, i = 0; i < o; ++i) {
                    var a = t.charCodeAt(i);
                    k[e >> 1] = a,
                        e += 2
                }
                return k[e >> 1] = 0,
                    e - n
            }
            function Y(t) {
                return 2 * t.length
            }
            function V(t, e) {
                for (var r = 0, n = ""; !(r >= e / 4);) {
                    var o = j[t + 4 * r >> 2];
                    if (0 == o)
                        break;
                    if (++r,
                        o >= 65536) {
                        var i = o - 65536;
                        n += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
                    } else
                        n += String.fromCharCode(o)
                }
                return n
            }
            function z(t, e, r) {
                if (void 0 === r && (r = 2147483647),
                    r < 4)
                    return 0;
                for (var n = e, o = n + r - 4, i = 0; i < t.length; ++i) {
                    var a = t.charCodeAt(i);
                    if (a >= 55296 && a <= 57343)
                        a = 65536 + ((1023 & a) << 10) | 1023 & t.charCodeAt(++i);
                    if (j[e >> 2] = a,
                        (e += 4) + 4 > o)
                        break
                }
                return j[e >> 2] = 0,
                    e - n
            }
            function B(t) {
                for (var e = 0, r = 0; r < t.length; ++r) {
                    var n = t.charCodeAt(r);
                    n >= 55296 && n <= 57343 && ++r,
                        e += 4
                }
                return e
            }
            o.INITIAL_MEMORY;
            var L, G = [], N = [], q = [];
            var J = 0
                , X = null
                , Z = null;
            function K(t) {
                throw o.onAbort && o.onAbort(t),
                g(t = "Aborted(" + t + ")"),
                C = !0,
                1,
                t += ". Build with -s ASSERTIONS=1 for more info.",
                new WebAssembly.RuntimeError(t)
            }
            o.preloadedImages = {},
                o.preloadedAudios = {};
            var Q;
            function tt(t) {
                return t.startsWith("data:application/octet-stream;base64,")
            }
            function et(t) {
                return t.startsWith("file://")
            }
            function rt(t) {
                try {
                    if (t == Q && w)
                        return new Uint8Array(w);
                    if (s)
                        return s(t);
                    throw "both async and sync fetching of the wasm failed"
                } catch (t) {
                    K(t)
                }
            }
            function nt(t) {
                for (; t.length > 0;) {
                    var e = t.shift();
                    if ("function" != typeof e) {
                        var r = e.func;
                        "number" == typeof r ? void 0 === e.arg ? it(r)() : it(r)(e.arg) : r(void 0 === e.arg ? null : e.arg)
                    } else
                        e(o)
                }
            }
            tt(Q = "/afp.wasm") || (Q = function (t) {
                return path.join(process.cwd(), "afp.wasm")
            }(Q));
            var ot = [];
            function it(t) {
                var e = ot[t];
                return e || (t >= ot.length && (ot.length = t + 1),
                    ot[t] = e = L.get(t)),
                    e
            }
            function at(t) {
                this.excPtr = t,
                    this.ptr = t - 16,
                    this.set_type = function (t) {
                        j[this.ptr + 4 >> 2] = t
                    }
                    ,
                    this.get_type = function () {
                        return j[this.ptr + 4 >> 2]
                    }
                    ,
                    this.set_destructor = function (t) {
                        j[this.ptr + 8 >> 2] = t
                    }
                    ,
                    this.get_destructor = function () {
                        return j[this.ptr + 8 >> 2]
                    }
                    ,
                    this.set_refcount = function (t) {
                        j[this.ptr >> 2] = t
                    }
                    ,
                    this.set_caught = function (t) {
                        t = t ? 1 : 0,
                            S[this.ptr + 12 >> 0] = t
                    }
                    ,
                    this.get_caught = function () {
                        return 0 != S[this.ptr + 12 >> 0]
                    }
                    ,
                    this.set_rethrown = function (t) {
                        t = t ? 1 : 0,
                            S[this.ptr + 13 >> 0] = t
                    }
                    ,
                    this.get_rethrown = function () {
                        return 0 != S[this.ptr + 13 >> 0]
                    }
                    ,
                    this.init = function (t, e) {
                        this.set_type(t),
                            this.set_destructor(e),
                            this.set_refcount(0),
                            this.set_caught(!1),
                            this.set_rethrown(!1)
                    }
                    ,
                    this.add_ref = function () {
                        var t = j[this.ptr >> 2];
                        j[this.ptr >> 2] = t + 1
                    }
                    ,
                    this.release_ref = function () {
                        var t = j[this.ptr >> 2];
                        return j[this.ptr >> 2] = t - 1,
                            1 === t
                    }
            }
            function ut(t) {
                switch (t) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                    case 4:
                        return 2;
                    case 8:
                        return 3;
                    default:
                        throw new TypeError("Unknown type size: " + t)
                }
            }
            var st = void 0;
            function ct(t) {
                for (var e = "", r = t; O[r];)
                    e += st[O[r++]];
                return e
            }
            var ft = {}
                , lt = {}
                , pt = {};
            function dt(t) {
                if (void 0 === t)
                    return "_unknown";
                var e = (t = t.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
                return e >= 48 && e <= 57 ? "_" + t : t
            }
            function ht(t, e) {
                return t = dt(t),
                    new Function("body", "return function " + t + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(e)
            }
            function yt(t, e) {
                var r = ht(e, (function (t) {
                    this.name = e,
                        this.message = t;
                    var r = new Error(t).stack;
                    void 0 !== r && (this.stack = this.toString() + "\n" + r.replace(/^Error(:[^\n]*)?\n/, ""))
                }
                ));
                return r.prototype = Object.create(t.prototype),
                    r.prototype.constructor = r,
                    r.prototype.toString = function () {
                        return void 0 === this.message ? this.name : this.name + ": " + this.message
                    }
                    ,
                    r
            }
            var mt = void 0;
            function vt(t) {
                throw new mt(t)
            }
            var gt = void 0;
            function wt(t) {
                throw new gt(t)
            }
            function bt(t, e, r) {
                function n(e) {
                    var n = r(e);
                    n.length !== t.length && wt("Mismatched type converter count");
                    for (var o = 0; o < t.length; ++o)
                        _t(t[o], n[o])
                }
                t.forEach((function (t) {
                    pt[t] = e
                }
                ));
                var o = new Array(e.length)
                    , i = []
                    , a = 0;
                e.forEach((function (t, e) {
                    lt.hasOwnProperty(t) ? o[e] = lt[t] : (i.push(t),
                        ft.hasOwnProperty(t) || (ft[t] = []),
                        ft[t].push((function () {
                            o[e] = lt[t],
                                ++a === i.length && n(o)
                        }
                        )))
                }
                )),
                    0 === i.length && n(o)
            }
            function _t(t, e, r) {
                if (r = r || {},
                    !("argPackAdvance" in e))
                    throw new TypeError("registerType registeredInstance requires argPackAdvance");
                var n = e.name;
                if (t || vt('type "' + n + '" must have a positive integer typeid pointer'),
                    lt.hasOwnProperty(t)) {
                    if (r.ignoreDuplicateRegistrations)
                        return;
                    vt("Cannot register type '" + n + "' twice")
                }
                if (lt[t] = e,
                    delete pt[t],
                    ft.hasOwnProperty(t)) {
                    var o = ft[t];
                    delete ft[t],
                        o.forEach((function (t) {
                            t()
                        }
                        ))
                }
            }
            function Ct(t) {
                if (!(this instanceof Rt))
                    return !1;
                if (!(t instanceof Rt))
                    return !1;
                for (var e = this.$$.ptrType.registeredClass, r = this.$$.ptr, n = t.$$.ptrType.registeredClass, o = t.$$.ptr; e.baseClass;)
                    r = e.upcast(r),
                        e = e.baseClass;
                for (; n.baseClass;)
                    o = n.upcast(o),
                        n = n.baseClass;
                return e === n && r === o
            }
            function Tt(t) {
                vt(t.$$.ptrType.registeredClass.name + " instance already deleted")
            }
            var $t = !1;
            function Pt(t) { }
            function At(t) {
                t.count.value -= 1,
                    0 === t.count.value && function (t) {
                        t.smartPtr ? t.smartPtrType.rawDestructor(t.smartPtr) : t.ptrType.registeredClass.rawDestructor(t.ptr)
                    }(t)
            }
            function Dt(t) {
                return "undefined" == typeof FinalizationRegistry ? (Dt = function (t) {
                    return t
                }
                    ,
                    t) : ($t = new FinalizationRegistry((function (t) {
                        At(t.$$)
                    }
                    )),
                        Dt = function (t) {
                            var e = {
                                $$: t.$$
                            };
                            return $t.register(t, e, t),
                                t
                        }
                        ,
                        Pt = function (t) {
                            $t.unregister(t)
                        }
                        ,
                        Dt(t))
            }
            function Ft() {
                if (this.$$.ptr || Tt(this),
                    this.$$.preservePointerOnDelete)
                    return this.$$.count.value += 1,
                        this;
                var t, e = Dt(Object.create(Object.getPrototypeOf(this), {
                    $$: {
                        value: (t = this.$$,
                        {
                            count: t.count,
                            deleteScheduled: t.deleteScheduled,
                            preservePointerOnDelete: t.preservePointerOnDelete,
                            ptr: t.ptr,
                            ptrType: t.ptrType,
                            smartPtr: t.smartPtr,
                            smartPtrType: t.smartPtrType
                        })
                    }
                }));
                return e.$$.count.value += 1,
                    e.$$.deleteScheduled = !1,
                    e
            }
            function Et() {
                this.$$.ptr || Tt(this),
                    this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && vt("Object already scheduled for deletion"),
                    Pt(this),
                    At(this.$$),
                    this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0,
                        this.$$.ptr = void 0)
            }
            function St() {
                return !this.$$.ptr
            }
            var Ot = void 0
                , kt = [];
            function Wt() {
                for (; kt.length;) {
                    var t = kt.pop();
                    t.$$.deleteScheduled = !1,
                        t.delete()
                }
            }
            function jt() {
                return this.$$.ptr || Tt(this),
                    this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && vt("Object already scheduled for deletion"),
                    kt.push(this),
                    1 === kt.length && Ot && Ot(Wt),
                    this.$$.deleteScheduled = !0,
                    this
            }
            function Rt() { }
            var Mt = {};
            function It(t, e, r) {
                if (void 0 === t[e].overloadTable) {
                    var n = t[e];
                    t[e] = function () {
                        return t[e].overloadTable.hasOwnProperty(arguments.length) || vt("Function '" + r + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + t[e].overloadTable + ")!"),
                            t[e].overloadTable[arguments.length].apply(this, arguments)
                    }
                        ,
                        t[e].overloadTable = [],
                        t[e].overloadTable[n.argCount] = n
                }
            }
            function xt(t, e, r) {
                o.hasOwnProperty(t) ? ((void 0 === r || void 0 !== o[t].overloadTable && void 0 !== o[t].overloadTable[r]) && vt("Cannot register public name '" + t + "' twice"),
                    It(o, t, t),
                    o.hasOwnProperty(r) && vt("Cannot register multiple overloads of a function with the same number of arguments (" + r + ")!"),
                    o[t].overloadTable[r] = e) : (o[t] = e,
                        void 0 !== r && (o[t].numArguments = r))
            }
            function Ut(t, e, r, n, o, i, a, u) {
                this.name = t,
                    this.constructor = e,
                    this.instancePrototype = r,
                    this.rawDestructor = n,
                    this.baseClass = o,
                    this.getActualType = i,
                    this.upcast = a,
                    this.downcast = u,
                    this.pureVirtualFunctions = []
            }
            function Ht(t, e, r) {
                for (; e !== r;)
                    e.upcast || vt("Expected null or instance of " + r.name + ", got an instance of " + e.name),
                        t = e.upcast(t),
                        e = e.baseClass;
                return t
            }
            function Yt(t, e) {
                if (null === e)
                    return this.isReference && vt("null is not a valid " + this.name),
                        0;
                e.$$ || vt('Cannot pass "' + ge(e) + '" as a ' + this.name),
                    e.$$.ptr || vt("Cannot pass deleted object as a pointer of type " + this.name);
                var r = e.$$.ptrType.registeredClass;
                return Ht(e.$$.ptr, r, this.registeredClass)
            }
            function Vt(t, e) {
                var r;
                if (null === e)
                    return this.isReference && vt("null is not a valid " + this.name),
                        this.isSmartPointer ? (r = this.rawConstructor(),
                            null !== t && t.push(this.rawDestructor, r),
                            r) : 0;
                e.$$ || vt('Cannot pass "' + ge(e) + '" as a ' + this.name),
                    e.$$.ptr || vt("Cannot pass deleted object as a pointer of type " + this.name),
                    !this.isConst && e.$$.ptrType.isConst && vt("Cannot convert argument of type " + (e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name) + " to parameter type " + this.name);
                var n = e.$$.ptrType.registeredClass;
                if (r = Ht(e.$$.ptr, n, this.registeredClass),
                    this.isSmartPointer)
                    switch (void 0 === e.$$.smartPtr && vt("Passing raw pointer to smart pointer is illegal"),
                    this.sharingPolicy) {
                        case 0:
                            e.$$.smartPtrType === this ? r = e.$$.smartPtr : vt("Cannot convert argument of type " + (e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name) + " to parameter type " + this.name);
                            break;
                        case 1:
                            r = e.$$.smartPtr;
                            break;
                        case 2:
                            if (e.$$.smartPtrType === this)
                                r = e.$$.smartPtr;
                            else {
                                var o = e.clone();
                                r = this.rawShare(r, ve.toHandle((function () {
                                    o.delete()
                                }
                                ))),
                                    null !== t && t.push(this.rawDestructor, r)
                            }
                            break;
                        default:
                            vt("Unsupporting sharing policy")
                    }
                return r
            }
            function zt(t, e) {
                if (null === e)
                    return this.isReference && vt("null is not a valid " + this.name),
                        0;
                e.$$ || vt('Cannot pass "' + ge(e) + '" as a ' + this.name),
                    e.$$.ptr || vt("Cannot pass deleted object as a pointer of type " + this.name),
                    e.$$.ptrType.isConst && vt("Cannot convert argument of type " + e.$$.ptrType.name + " to parameter type " + this.name);
                var r = e.$$.ptrType.registeredClass;
                return Ht(e.$$.ptr, r, this.registeredClass)
            }
            function Bt(t) {
                return this.fromWireType(R[t >> 2])
            }
            function Lt(t) {
                return this.rawGetPointee && (t = this.rawGetPointee(t)),
                    t
            }
            function Gt(t) {
                this.rawDestructor && this.rawDestructor(t)
            }
            function Nt(t) {
                null !== t && t.delete()
            }
            function qt(t, e, r) {
                if (e === r)
                    return t;
                if (void 0 === r.baseClass)
                    return null;
                var n = qt(t, e, r.baseClass);
                return null === n ? null : r.downcast(n)
            }
            function Jt() {
                return Object.keys(Kt).length
            }
            function Xt() {
                var t = [];
                for (var e in Kt)
                    Kt.hasOwnProperty(e) && t.push(Kt[e]);
                return t
            }
            function Zt(t) {
                Ot = t,
                    kt.length && Ot && Ot(Wt)
            }
            var Kt = {};
            function Qt(t, e) {
                return e = function (t, e) {
                    for (void 0 === e && vt("ptr should not be undefined"); t.baseClass;)
                        e = t.upcast(e),
                            t = t.baseClass;
                    return e
                }(t, e),
                    Kt[e]
            }
            function te(t, e) {
                return e.ptrType && e.ptr || wt("makeClassHandle requires ptr and ptrType"),
                    !!e.smartPtrType !== !!e.smartPtr && wt("Both smartPtrType and smartPtr must be specified"),
                    e.count = {
                        value: 1
                    },
                    Dt(Object.create(t, {
                        $$: {
                            value: e
                        }
                    }))
            }
            function ee(t) {
                var e = this.getPointee(t);
                if (!e)
                    return this.destructor(t),
                        null;
                var r = Qt(this.registeredClass, e);
                if (void 0 !== r) {
                    if (0 === r.$$.count.value)
                        return r.$$.ptr = e,
                            r.$$.smartPtr = t,
                            r.clone();
                    var n = r.clone();
                    return this.destructor(t),
                        n
                }
                function o() {
                    return this.isSmartPointer ? te(this.registeredClass.instancePrototype, {
                        ptrType: this.pointeeType,
                        ptr: e,
                        smartPtrType: this,
                        smartPtr: t
                    }) : te(this.registeredClass.instancePrototype, {
                        ptrType: this,
                        ptr: t
                    })
                }
                var i, a = this.registeredClass.getActualType(e), u = Mt[a];
                if (!u)
                    return o.call(this);
                i = this.isConst ? u.constPointerType : u.pointerType;
                var s = qt(e, this.registeredClass, i.registeredClass);
                return null === s ? o.call(this) : this.isSmartPointer ? te(i.registeredClass.instancePrototype, {
                    ptrType: i,
                    ptr: s,
                    smartPtrType: this,
                    smartPtr: t
                }) : te(i.registeredClass.instancePrototype, {
                    ptrType: i,
                    ptr: s
                })
            }
            function re(t, e, r, n, o, i, a, u, s, c, f) {
                this.name = t,
                    this.registeredClass = e,
                    this.isReference = r,
                    this.isConst = n,
                    this.isSmartPointer = o,
                    this.pointeeType = i,
                    this.sharingPolicy = a,
                    this.rawGetPointee = u,
                    this.rawConstructor = s,
                    this.rawShare = c,
                    this.rawDestructor = f,
                    o || void 0 !== e.baseClass ? this.toWireType = Vt : n ? (this.toWireType = Yt,
                        this.destructorFunction = null) : (this.toWireType = zt,
                            this.destructorFunction = null)
            }
            function ne(t, e, r) {
                o.hasOwnProperty(t) || wt("Replacing nonexistant public symbol"),
                    void 0 !== o[t].overloadTable && void 0 !== r ? o[t].overloadTable[r] = e : (o[t] = e,
                        o[t].argCount = r)
            }
            function oe(t, e, r) {
                return t.includes("j") ? function (t, e, r) {
                    var n = o["dynCall_" + t];
                    return r && r.length ? n.apply(null, [e].concat(r)) : n.call(null, e)
                }(t, e, r) : it(e).apply(null, r)
            }
            function ie(t, e) {
                var r, n, o, i = (t = ct(t)).includes("j") ? (r = t,
                    n = e,
                    o = [],
                    function () {
                        o.length = arguments.length;
                        for (var t = 0; t < arguments.length; t++)
                            o[t] = arguments[t];
                        return oe(r, n, o)
                    }
                ) : it(e);
                return "function" != typeof i && vt("unknown function pointer with signature " + t + ": " + e),
                    i
            }
            var ae = void 0;
            function ue(t) {
                var e = je(t)
                    , r = ct(e);
                return We(e),
                    r
            }
            function se(t, e) {
                var r = []
                    , n = {};
                throw e.forEach((function t(e) {
                    n[e] || lt[e] || (pt[e] ? pt[e].forEach(t) : (r.push(e),
                        n[e] = !0))
                }
                )),
                new ae(t + ": " + r.map(ue).join([", "]))
            }
            function ce(t, e) {
                for (var r = [], n = 0; n < t; n++)
                    r.push(j[(e >> 2) + n]);
                return r
            }
            function fe(t) {
                for (; t.length;) {
                    var e = t.pop();
                    t.pop()(e)
                }
            }
            function le(t, e, r, n, o) {
                var i = e.length;
                i < 2 && vt("argTypes array size mismatch! Must at least get return value and 'this' types!");
                for (var a = null !== e[1] && null !== r, u = !1, s = 1; s < e.length; ++s)
                    if (null !== e[s] && void 0 === e[s].destructorFunction) {
                        u = !0;
                        break
                    }
                var c = "void" !== e[0].name
                    , f = ""
                    , l = "";
                for (s = 0; s < i - 2; ++s)
                    f += (0 !== s ? ", " : "") + "arg" + s,
                        l += (0 !== s ? ", " : "") + "arg" + s + "Wired";
                var p = "return function " + dt(t) + "(" + f + ") {\nif (arguments.length !== " + (i - 2) + ") {\nthrowBindingError('function " + t + " called with ' + arguments.length + ' arguments, expected " + (i - 2) + " args!');\n}\n";
                u && (p += "var destructors = [];\n");
                var d = u ? "destructors" : "null"
                    , h = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"]
                    , y = [vt, n, o, fe, e[0], e[1]];
                a && (p += "var thisWired = classParam.toWireType(" + d + ", this);\n");
                for (s = 0; s < i - 2; ++s)
                    p += "var arg" + s + "Wired = argType" + s + ".toWireType(" + d + ", arg" + s + "); // " + e[s + 2].name + "\n",
                        h.push("argType" + s),
                        y.push(e[s + 2]);
                if (a && (l = "thisWired" + (l.length > 0 ? ", " : "") + l),
                    p += (c ? "var rv = " : "") + "invoker(fn" + (l.length > 0 ? ", " : "") + l + ");\n",
                    u)
                    p += "runDestructors(destructors);\n";
                else
                    for (s = a ? 1 : 2; s < e.length; ++s) {
                        var m = 1 === s ? "thisWired" : "arg" + (s - 2) + "Wired";
                        null !== e[s].destructorFunction && (p += m + "_dtor(" + m + "); // " + e[s].name + "\n",
                            h.push(m + "_dtor"),
                            y.push(e[s].destructorFunction))
                    }
                return c && (p += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
                    p += "}\n",
                    h.push(p),
                    function (t, e) {
                        if (!(t instanceof Function))
                            throw new TypeError("new_ called with constructor type " + typeof t + " which is not a function");
                        var r = ht(t.name || "unknownFunctionName", (function () { }
                        ));
                        r.prototype = t.prototype;
                        var n = new r
                            , o = t.apply(n, e);
                        return o instanceof Object ? o : n
                    }(Function, h).apply(null, y)
            }
            var pe = []
                , de = [{}, {
                    value: void 0
                }, {
                    value: null
                }, {
                    value: !0
                }, {
                    value: !1
                }];
            function he(t) {
                t > 4 && 0 == --de[t].refcount && (de[t] = void 0,
                    pe.push(t))
            }
            function ye() {
                for (var t = 0, e = 5; e < de.length; ++e)
                    void 0 !== de[e] && ++t;
                return t
            }
            function me() {
                for (var t = 5; t < de.length; ++t)
                    if (void 0 !== de[t])
                        return de[t];
                return null
            }
            var ve = {
                toValue: function (t) {
                    return t || vt("Cannot use deleted val. handle = " + t),
                        de[t].value
                },
                toHandle: function (t) {
                    switch (t) {
                        case void 0:
                            return 1;
                        case null:
                            return 2;
                        case !0:
                            return 3;
                        case !1:
                            return 4;
                        default:
                            var e = pe.length ? pe.pop() : de.length;
                            return de[e] = {
                                refcount: 1,
                                value: t
                            },
                                e
                    }
                }
            };
            function ge(t) {
                if (null === t)
                    return "null";
                var e = typeof t;
                return "object" === e || "array" === e || "function" === e ? t.toString() : "" + t
            }
            function we(t, e) {
                switch (e) {
                    case 2:
                        return function (t) {
                            return this.fromWireType(M[t >> 2])
                        }
                            ;
                    case 3:
                        return function (t) {
                            return this.fromWireType(I[t >> 3])
                        }
                            ;
                    default:
                        throw new TypeError("Unknown float type: " + t)
                }
            }
            function be(t, e, r) {
                switch (e) {
                    case 0:
                        return r ? function (t) {
                            return S[t]
                        }
                            : function (t) {
                                return O[t]
                            }
                            ;
                    case 1:
                        return r ? function (t) {
                            return k[t >> 1]
                        }
                            : function (t) {
                                return W[t >> 1]
                            }
                            ;
                    case 2:
                        return r ? function (t) {
                            return j[t >> 2]
                        }
                            : function (t) {
                                return R[t >> 2]
                            }
                            ;
                    default:
                        throw new TypeError("Unknown integer type: " + t)
                }
            }
            var _e = {};
            function Ce() {
                if (!Ce.strings) {
                    var t = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: p || "./this.program"
                    };
                    for (var e in _e)
                        void 0 === _e[e] ? delete t[e] : t[e] = _e[e];
                    var r = [];
                    for (var e in t)
                        r.push(e + "=" + t[e]);
                    Ce.strings = r
                }
                return Ce.strings
            }
            var Te = {
                mappings: {},
                buffers: [null, [], []],
                printChar: function (t, e) {
                    var r = Te.buffers[t];
                    0 === e || 10 === e ? ((1 === t ? v : g)(P(r, 0)),
                        r.length = 0) : r.push(e)
                },
                varargs: void 0,
                get: function () {
                    return Te.varargs += 4,
                        j[Te.varargs - 4 >> 2]
                },
                getStr: function (t) {
                    return A(t)
                },
                get64: function (t, e) {
                    return t
                }
            };
            function $e(t) {
                return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0)
            }
            function Pe(t, e) {
                for (var r = 0, n = 0; n <= e; r += t[n++])
                    ;
                return r
            }
            var Ae = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                , De = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            function Fe(t, e) {
                for (var r = new Date(t.getTime()); e > 0;) {
                    var n = $e(r.getFullYear())
                        , o = r.getMonth()
                        , i = (n ? Ae : De)[o];
                    if (!(e > i - r.getDate()))
                        return r.setDate(r.getDate() + e),
                            r;
                    e -= i - r.getDate() + 1,
                        r.setDate(1),
                        o < 11 ? r.setMonth(o + 1) : (r.setMonth(0),
                            r.setFullYear(r.getFullYear() + 1))
                }
                return r
            }
            function Ee(t, e, r, n) {
                var o = j[n + 40 >> 2]
                    , i = {
                        tm_sec: j[n >> 2],
                        tm_min: j[n + 4 >> 2],
                        tm_hour: j[n + 8 >> 2],
                        tm_mday: j[n + 12 >> 2],
                        tm_mon: j[n + 16 >> 2],
                        tm_year: j[n + 20 >> 2],
                        tm_wday: j[n + 24 >> 2],
                        tm_yday: j[n + 28 >> 2],
                        tm_isdst: j[n + 32 >> 2],
                        tm_gmtoff: j[n + 36 >> 2],
                        tm_zone: o ? A(o) : ""
                    }
                    , a = A(r)
                    , u = {
                        "%c": "%a %b %d %H:%M:%S %Y",
                        "%D": "%m/%d/%y",
                        "%F": "%Y-%m-%d",
                        "%h": "%b",
                        "%r": "%I:%M:%S %p",
                        "%R": "%H:%M",
                        "%T": "%H:%M:%S",
                        "%x": "%m/%d/%y",
                        "%X": "%H:%M:%S",
                        "%Ec": "%c",
                        "%EC": "%C",
                        "%Ex": "%m/%d/%y",
                        "%EX": "%H:%M:%S",
                        "%Ey": "%y",
                        "%EY": "%Y",
                        "%Od": "%d",
                        "%Oe": "%e",
                        "%OH": "%H",
                        "%OI": "%I",
                        "%Om": "%m",
                        "%OM": "%M",
                        "%OS": "%S",
                        "%Ou": "%u",
                        "%OU": "%U",
                        "%OV": "%V",
                        "%Ow": "%w",
                        "%OW": "%W",
                        "%Oy": "%y"
                    };
                for (var s in u)
                    a = a.replace(new RegExp(s, "g"), u[s]);
                var c = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                    , f = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                function l(t, e, r) {
                    for (var n = "number" == typeof t ? t.toString() : t || ""; n.length < e;)
                        n = r[0] + n;
                    return n
                }
                function p(t, e) {
                    return l(t, e, "0")
                }
                function d(t, e) {
                    function r(t) {
                        return t < 0 ? -1 : t > 0 ? 1 : 0
                    }
                    var n;
                    return 0 === (n = r(t.getFullYear() - e.getFullYear())) && 0 === (n = r(t.getMonth() - e.getMonth())) && (n = r(t.getDate() - e.getDate())),
                        n
                }
                function h(t) {
                    switch (t.getDay()) {
                        case 0:
                            return new Date(t.getFullYear() - 1, 11, 29);
                        case 1:
                            return t;
                        case 2:
                            return new Date(t.getFullYear(), 0, 3);
                        case 3:
                            return new Date(t.getFullYear(), 0, 2);
                        case 4:
                            return new Date(t.getFullYear(), 0, 1);
                        case 5:
                            return new Date(t.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(t.getFullYear() - 1, 11, 30)
                    }
                }
                function y(t) {
                    var e = Fe(new Date(t.tm_year + 1900, 0, 1), t.tm_yday)
                        , r = new Date(e.getFullYear(), 0, 4)
                        , n = new Date(e.getFullYear() + 1, 0, 4)
                        , o = h(r)
                        , i = h(n);
                    return d(o, e) <= 0 ? d(i, e) <= 0 ? e.getFullYear() + 1 : e.getFullYear() : e.getFullYear() - 1
                }
                var m = {
                    "%a": function (t) {
                        return c[t.tm_wday].substring(0, 3)
                    },
                    "%A": function (t) {
                        return c[t.tm_wday]
                    },
                    "%b": function (t) {
                        return f[t.tm_mon].substring(0, 3)
                    },
                    "%B": function (t) {
                        return f[t.tm_mon]
                    },
                    "%C": function (t) {
                        return p((t.tm_year + 1900) / 100 | 0, 2)
                    },
                    "%d": function (t) {
                        return p(t.tm_mday, 2)
                    },
                    "%e": function (t) {
                        return l(t.tm_mday, 2, " ")
                    },
                    "%g": function (t) {
                        return y(t).toString().substring(2)
                    },
                    "%G": function (t) {
                        return y(t)
                    },
                    "%H": function (t) {
                        return p(t.tm_hour, 2)
                    },
                    "%I": function (t) {
                        var e = t.tm_hour;
                        return 0 == e ? e = 12 : e > 12 && (e -= 12),
                            p(e, 2)
                    },
                    "%j": function (t) {
                        return p(t.tm_mday + Pe($e(t.tm_year + 1900) ? Ae : De, t.tm_mon - 1), 3)
                    },
                    "%m": function (t) {
                        return p(t.tm_mon + 1, 2)
                    },
                    "%M": function (t) {
                        return p(t.tm_min, 2)
                    },
                    "%n": function () {
                        return "\n"
                    },
                    "%p": function (t) {
                        return t.tm_hour >= 0 && t.tm_hour < 12 ? "AM" : "PM"
                    },
                    "%S": function (t) {
                        return p(t.tm_sec, 2)
                    },
                    "%t": function () {
                        return "\t"
                    },
                    "%u": function (t) {
                        return t.tm_wday || 7
                    },
                    "%U": function (t) {
                        var e = new Date(t.tm_year + 1900, 0, 1)
                            , r = 0 === e.getDay() ? e : Fe(e, 7 - e.getDay())
                            , n = new Date(t.tm_year + 1900, t.tm_mon, t.tm_mday);
                        if (d(r, n) < 0) {
                            var o = Pe($e(n.getFullYear()) ? Ae : De, n.getMonth() - 1) - 31
                                , i = 31 - r.getDate() + o + n.getDate();
                            return p(Math.ceil(i / 7), 2)
                        }
                        return 0 === d(r, e) ? "01" : "00"
                    },
                    "%V": function (t) {
                        var e, r = new Date(t.tm_year + 1900, 0, 4), n = new Date(t.tm_year + 1901, 0, 4), o = h(r), i = h(n), a = Fe(new Date(t.tm_year + 1900, 0, 1), t.tm_yday);
                        return d(a, o) < 0 ? "53" : d(i, a) <= 0 ? "01" : (e = o.getFullYear() < t.tm_year + 1900 ? t.tm_yday + 32 - o.getDate() : t.tm_yday + 1 - o.getDate(),
                            p(Math.ceil(e / 7), 2))
                    },
                    "%w": function (t) {
                        return t.tm_wday
                    },
                    "%W": function (t) {
                        var e = new Date(t.tm_year, 0, 1)
                            , r = 1 === e.getDay() ? e : Fe(e, 0 === e.getDay() ? 1 : 7 - e.getDay() + 1)
                            , n = new Date(t.tm_year + 1900, t.tm_mon, t.tm_mday);
                        if (d(r, n) < 0) {
                            var o = Pe($e(n.getFullYear()) ? Ae : De, n.getMonth() - 1) - 31
                                , i = 31 - r.getDate() + o + n.getDate();
                            return p(Math.ceil(i / 7), 2)
                        }
                        return 0 === d(r, e) ? "01" : "00"
                    },
                    "%y": function (t) {
                        return (t.tm_year + 1900).toString().substring(2)
                    },
                    "%Y": function (t) {
                        return t.tm_year + 1900
                    },
                    "%z": function (t) {
                        var e = t.tm_gmtoff
                            , r = e >= 0;
                        return e = (e = Math.abs(e) / 60) / 60 * 100 + e % 60,
                            (r ? "+" : "-") + String("0000" + e).slice(-4)
                    },
                    "%Z": function (t) {
                        return t.tm_zone
                    },
                    "%%": function () {
                        return "%"
                    }
                };
                for (var s in m)
                    a.includes(s) && (a = a.replace(new RegExp(s, "g"), m[s](i)));
                var v = function (t, e, r) {
                    var n = r > 0 ? r : F(t) + 1
                        , o = new Array(n)
                        , i = D(t, o, 0, o.length);
                    e && (o.length = i);
                    return o
                }(a, !1);
                return v.length > e ? 0 : (function (t, e) {
                    S.set(t, e)
                }(v, t),
                    v.length - 1)
            }
            !function () {
                for (var t = new Array(256), e = 0; e < 256; ++e)
                    t[e] = String.fromCharCode(e);
                st = t
            }(),
                mt = o.BindingError = yt(Error, "BindingError"),
                gt = o.InternalError = yt(Error, "InternalError"),
                Rt.prototype.isAliasOf = Ct,
                Rt.prototype.clone = Ft,
                Rt.prototype.delete = Et,
                Rt.prototype.isDeleted = St,
                Rt.prototype.deleteLater = jt,
                re.prototype.getPointee = Lt,
                re.prototype.destructor = Gt,
                re.prototype.argPackAdvance = 8,
                re.prototype.readValueFromPointer = Bt,
                re.prototype.deleteObject = Nt,
                re.prototype.fromWireType = ee,
                o.getInheritedInstanceCount = Jt,
                o.getLiveInheritedInstances = Xt,
                o.flushPendingDeletes = Wt,
                o.setDelayFunction = Zt,
                ae = o.UnboundTypeError = yt(Error, "UnboundTypeError"),
                o.count_emval_handles = ye,
                o.get_first_emval = me;
            var Se, Oe = {
                d: function (t, e, r, n) {
                    K("Assertion failed: " + A(t) + ", at: " + [e ? A(e) : "unknown filename", r, n ? A(n) : "unknown function"])
                },
                g: function (t) {
                    return ke(t + 16) + 16
                },
                f: function (t, e, r) {
                    throw new at(t).init(e, r),
                    t,
                    t
                },
                p: function (t, e, r, n, o) { },
                y: function (t, e, r, n, o) {
                    var i = ut(r);
                    _t(t, {
                        name: e = ct(e),
                        fromWireType: function (t) {
                            return !!t
                        },
                        toWireType: function (t, e) {
                            return e ? n : o
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: function (t) {
                            var n;
                            if (1 === r)
                                n = S;
                            else if (2 === r)
                                n = k;
                            else {
                                if (4 !== r)
                                    throw new TypeError("Unknown boolean type size: " + e);
                                n = j
                            }
                            return this.fromWireType(n[t >> i])
                        },
                        destructorFunction: null
                    })
                },
                A: function (t, e, r, n, o, i, a, u, s, c, f, l, p) {
                    f = ct(f),
                        i = ie(o, i),
                        u && (u = ie(a, u)),
                        c && (c = ie(s, c)),
                        p = ie(l, p);
                    var d = dt(f);
                    xt(d, (function () {
                        se("Cannot construct " + f + " due to unbound types", [n])
                    }
                    )),
                        bt([t, e, r], n ? [n] : [], (function (e) {
                            var r, o;
                            e = e[0],
                                o = n ? (r = e.registeredClass).instancePrototype : Rt.prototype;
                            var a = ht(d, (function () {
                                if (Object.getPrototypeOf(this) !== s)
                                    throw new mt("Use 'new' to construct " + f);
                                if (void 0 === l.constructor_body)
                                    throw new mt(f + " has no accessible constructor");
                                var t = l.constructor_body[arguments.length];
                                if (void 0 === t)
                                    throw new mt("Tried to invoke ctor of " + f + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(l.constructor_body).toString() + ") parameters instead!");
                                return t.apply(this, arguments)
                            }
                            ))
                                , s = Object.create(o, {
                                    constructor: {
                                        value: a
                                    }
                                });
                            a.prototype = s;
                            var l = new Ut(f, a, s, p, r, i, u, c)
                                , h = new re(f, l, !0, !1, !1)
                                , y = new re(f + "*", l, !1, !1, !1)
                                , m = new re(f + " const*", l, !1, !0, !1);
                            return Mt[t] = {
                                pointerType: y,
                                constPointerType: m
                            },
                                ne(d, a),
                                [h, y, m]
                        }
                        ))
                },
                w: function (t, e, r, n, o, i) {
                    T(e > 0);
                    var a = ce(e, r);
                    o = ie(n, o),
                        bt([], [t], (function (t) {
                            var r = "constructor " + (t = t[0]).name;
                            if (void 0 === t.registeredClass.constructor_body && (t.registeredClass.constructor_body = []),
                                void 0 !== t.registeredClass.constructor_body[e - 1])
                                throw new mt("Cannot register multiple constructors with identical number of parameters (" + (e - 1) + ") for class '" + t.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
                            return t.registeredClass.constructor_body[e - 1] = function () {
                                se("Cannot construct " + t.name + " due to unbound types", a)
                            }
                                ,
                                bt([], a, (function (n) {
                                    return n.splice(1, 0, null),
                                        t.registeredClass.constructor_body[e - 1] = le(r, n, null, o, i),
                                        []
                                }
                                )),
                                []
                        }
                        ))
                },
                c: function (t, e, r, n, o, i, a, u) {
                    var s = ce(r, n);
                    e = ct(e),
                        i = ie(o, i),
                        bt([], [t], (function (t) {
                            var n = (t = t[0]).name + "." + e;
                            function o() {
                                se("Cannot call " + n + " due to unbound types", s)
                            }
                            e.startsWith("@@") && (e = Symbol[e.substring(2)]),
                                u && t.registeredClass.pureVirtualFunctions.push(e);
                            var c = t.registeredClass.instancePrototype
                                , f = c[e];
                            return void 0 === f || void 0 === f.overloadTable && f.className !== t.name && f.argCount === r - 2 ? (o.argCount = r - 2,
                                o.className = t.name,
                                c[e] = o) : (It(c, e, n),
                                    c[e].overloadTable[r - 2] = o),
                                bt([], s, (function (o) {
                                    var u = le(n, o, t, i, a);
                                    return void 0 === c[e].overloadTable ? (u.argCount = r - 2,
                                        c[e] = u) : c[e].overloadTable[r - 2] = u,
                                        []
                                }
                                )),
                                []
                        }
                        ))
                },
                x: function (t, e) {
                    _t(t, {
                        name: e = ct(e),
                        fromWireType: function (t) {
                            var e = ve.toValue(t);
                            return he(t),
                                e
                        },
                        toWireType: function (t, e) {
                            return ve.toHandle(e)
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: Bt,
                        destructorFunction: null
                    })
                },
                j: function (t, e, r) {
                    var n = ut(r);
                    _t(t, {
                        name: e = ct(e),
                        fromWireType: function (t) {
                            return t
                        },
                        toWireType: function (t, e) {
                            if ("number" != typeof e && "boolean" != typeof e)
                                throw new TypeError('Cannot convert "' + ge(e) + '" to ' + this.name);
                            return e
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: we(e, n),
                        destructorFunction: null
                    })
                },
                l: function (t, e, r, n, o, i) {
                    var a = ce(e, r);
                    t = ct(t),
                        o = ie(n, o),
                        xt(t, (function () {
                            se("Cannot call " + t + " due to unbound types", a)
                        }
                        ), e - 1),
                        bt([], a, (function (r) {
                            var n = [r[0], null].concat(r.slice(1));
                            return ne(t, le(t, n, null, o, i), e - 1),
                                []
                        }
                        ))
                },
                b: function (t, e, r, n, o) {
                    e = ct(e),
                        -1 === o && (o = 4294967295);
                    var i = ut(r)
                        , a = function (t) {
                            return t
                        };
                    if (0 === n) {
                        var u = 32 - 8 * r;
                        a = function (t) {
                            return t << u >>> u
                        }
                    }
                    var s = e.includes("unsigned");
                    _t(t, {
                        name: e,
                        fromWireType: a,
                        toWireType: function (t, r) {
                            if ("number" != typeof r && "boolean" != typeof r)
                                throw new TypeError('Cannot convert "' + ge(r) + '" to ' + this.name);
                            if (r < n || r > o)
                                throw new TypeError('Passing a number "' + ge(r) + '" from JS side to C/C++ side to an argument of type "' + e + '", which is outside the valid range [' + n + ", " + o + "]!");
                            return s ? r >>> 0 : 0 | r
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: be(e, i, 0 !== n),
                        destructorFunction: null
                    })
                },
                a: function (t, e, r) {
                    var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][e];
                    function o(t) {
                        var e = R
                            , r = e[t >>= 2]
                            , o = e[t + 1];
                        return new n(E, o, r)
                    }
                    _t(t, {
                        name: r = ct(r),
                        fromWireType: o,
                        argPackAdvance: 8,
                        readValueFromPointer: o
                    }, {
                        ignoreDuplicateRegistrations: !0
                    })
                },
                k: function (t, e) {
                    var r = "std::string" === (e = ct(e));
                    _t(t, {
                        name: e,
                        fromWireType: function (t) {
                            var e, n = R[t >> 2];
                            if (r)
                                for (var o = t + 4, i = 0; i <= n; ++i) {
                                    var a = t + 4 + i;
                                    if (i == n || 0 == O[a]) {
                                        var u = A(o, a - o);
                                        void 0 === e ? e = u : (e += String.fromCharCode(0),
                                            e += u),
                                            o = a + 1
                                    }
                                }
                            else {
                                var s = new Array(n);
                                for (i = 0; i < n; ++i)
                                    s[i] = String.fromCharCode(O[t + 4 + i]);
                                e = s.join("")
                            }
                            return We(t),
                                e
                        },
                        toWireType: function (t, e) {
                            e instanceof ArrayBuffer && (e = new Uint8Array(e));
                            var n = "string" == typeof e;
                            n || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || vt("Cannot pass non-string to std::string");
                            var o = (r && n ? function () {
                                return F(e)
                            }
                                : function () {
                                    return e.length
                                }
                            )()
                                , i = ke(4 + o + 1);
                            if (R[i >> 2] = o,
                                r && n)
                                D(e, O, i + 4, o + 1);
                            else if (n)
                                for (var a = 0; a < o; ++a) {
                                    var u = e.charCodeAt(a);
                                    u > 255 && (We(i),
                                        vt("String has UTF-16 code units that do not fit in 8 bits")),
                                        O[i + 4 + a] = u
                                }
                            else
                                for (a = 0; a < o; ++a)
                                    O[i + 4 + a] = e[a];
                            return null !== t && t.push(We, i),
                                i
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: Bt,
                        destructorFunction: function (t) {
                            We(t)
                        }
                    })
                },
                e: function (t, e, r) {
                    var n, o, i, a, u;
                    r = ct(r),
                        2 === e ? (n = U,
                            o = H,
                            a = Y,
                            i = function () {
                                return W
                            }
                            ,
                            u = 1) : 4 === e && (n = V,
                                o = z,
                                a = B,
                                i = function () {
                                    return R
                                }
                                ,
                                u = 2),
                        _t(t, {
                            name: r,
                            fromWireType: function (t) {
                                for (var r, o = R[t >> 2], a = i(), s = t + 4, c = 0; c <= o; ++c) {
                                    var f = t + 4 + c * e;
                                    if (c == o || 0 == a[f >> u]) {
                                        var l = n(s, f - s);
                                        void 0 === r ? r = l : (r += String.fromCharCode(0),
                                            r += l),
                                            s = f + e
                                    }
                                }
                                return We(t),
                                    r
                            },
                            toWireType: function (t, n) {
                                "string" != typeof n && vt("Cannot pass non-string to C++ string type " + r);
                                var i = a(n)
                                    , s = ke(4 + i + e);
                                return R[s >> 2] = i >> u,
                                    o(n, s + 4, i + e),
                                    null !== t && t.push(We, s),
                                    s
                            },
                            argPackAdvance: 8,
                            readValueFromPointer: Bt,
                            destructorFunction: function (t) {
                                We(t)
                            }
                        })
                },
                z: function (t, e) {
                    _t(t, {
                        isVoid: !0,
                        name: e = ct(e),
                        argPackAdvance: 0,
                        fromWireType: function () { },
                        toWireType: function (t, e) { }
                    })
                },
                m: he,
                n: function (t) {
                    t > 4 && (de[t].refcount += 1)
                },
                o: function (t, e) {
                    var r, n, o;
                    n = "_emval_take_value",
                        void 0 === (o = lt[r = t]) && vt(n + " has unknown type " + ue(r));
                    var i = (t = o).readValueFromPointer(e);
                    return ve.toHandle(i)
                },
                h: function () {
                    K("")
                },
                r: function (t, e, r) {
                    O.copyWithin(t, e, e + r)
                },
                s: function (t) {
                    O.length,
                        K("OOM")
                },
                u: function (t, e) {
                    var r = 0;
                    return Ce().forEach((function (n, o) {
                        var i = e + r;
                        j[t + 4 * o >> 2] = i,
                            function (t, e, r) {
                                for (var n = 0; n < t.length; ++n)
                                    S[e++ >> 0] = t.charCodeAt(n);
                                r || (S[e >> 0] = 0)
                            }(n, i),
                            r += n.length + 1
                    }
                    )),
                        0
                },
                v: function (t, e) {
                    var r = Ce();
                    j[t >> 2] = r.length;
                    var n = 0;
                    return r.forEach((function (t) {
                        n += t.length + 1
                    }
                    )),
                        j[e >> 2] = n,
                        0
                },
                i: function (t, e, r, n) {
                    for (var o = 0, i = 0; i < r; i++) {
                        var a = j[e >> 2]
                            , u = j[e + 4 >> 2];
                        e += 8;
                        for (var s = 0; s < u; s++)
                            Te.printChar(t, O[a + s]);
                        o += u
                    }
                    return j[n >> 2] = o,
                        0
                },
                q: function (t) {
                    t
                },
                t: function (t, e, r, n) {
                    return Ee(t, e, r, n)
                }
            }, ke = (function () {
                var t = {
                    a: Oe
                };
                function e(t, e) {
                    var r, n, i = t.exports;
                    o.asm = i,
                        b = o.asm.B,
                        r = b.buffer,
                        E = r,
                        o.HEAP8 = S = new Int8Array(r),
                        o.HEAP16 = k = new Int16Array(r),
                        o.HEAP32 = j = new Int32Array(r),
                        o.HEAPU8 = O = new Uint8Array(r),
                        o.HEAPU16 = W = new Uint16Array(r),
                        o.HEAPU32 = R = new Uint32Array(r),
                        o.HEAPF32 = M = new Float32Array(r),
                        o.HEAPF64 = I = new Float64Array(r),
                        L = o.asm.D,
                        n = o.asm.C,
                        N.unshift(n),
                        function (t) {
                            if (J--,
                                o.monitorRunDependencies && o.monitorRunDependencies(J),
                                0 == J && (null !== X && (clearInterval(X),
                                    X = null),
                                    Z)) {
                                var e = Z;
                                Z = null,
                                    e()
                            }
                        }()
                }
                function r(t) {
                    e(t.instance)
                    console.log("Module loaded: " + t.instance)
                }
                function n(e) {
                    return function () {
                        if (!w && (d || h)) {
                            if ("function" == typeof fetch && !et(Q))
                                return fetch(Q, {
                                    credentials: "same-origin"
                                }).then((function (t) {
                                    if (!t.ok)
                                        throw "failed to load wasm binary file at '" + Q + "'";
                                    return t.arrayBuffer()
                                }
                                )).catch((function () {
                                    return rt(Q)
                                }
                                ));
                            if (u)
                                return new Promise((function (t, e) {
                                    u(Q, (function (e) {
                                        t(new Uint8Array(e))
                                    }
                                    ), e)
                                }
                                ))
                        }
                        return Promise.resolve().then((function () {
                            return rt(Q)
                        }
                        ))
                    }().then((function (e) {
                        return WebAssembly.instantiate(e, t)
                    }
                    )).then((function (t) {
                        return t
                    }
                    )).then(e, (function (t) {
                        g("failed to asynchronously prepare wasm: " + t),
                            K(t)
                    }
                    ))
                }
                if (J++,
                    o.monitorRunDependencies && o.monitorRunDependencies(J),
                    o.instantiateWasm)
                    try {
                        return o.instantiateWasm(t, e)
                    } catch (t) {
                        return g("Module.instantiateWasm callback failed with error: " + t),
                            !1
                    }
                w || "function" != typeof WebAssembly.instantiateStreaming || tt(Q) || et(Q) || "function" != typeof fetch ? n(r) : fetch(Q, {
                    credentials: "same-origin"
                }).then((function (e) {
                    return WebAssembly.instantiateStreaming(e, t).then(r, (function (t) {
                        return g("wasm streaming compile failed: " + t),
                            g("falling back to ArrayBuffer instantiation"),
                            n(r)
                    }
                    ))
                }
                ))
                console.log("Module loading: " + Q)
            }(),
                o.___wasm_call_ctors = function () {
                    return (o.___wasm_call_ctors = o.asm.C).apply(null, arguments)
                }
                ,
                o._malloc = function () {
                    return (ke = o._malloc = o.asm.E).apply(null, arguments)
                }
            ), We = o._free = function () {
                return (We = o._free = o.asm.F).apply(null, arguments)
            }
                , je = o.___getTypeName = function () {
                    return (je = o.___getTypeName = o.asm.G).apply(null, arguments)
                }
                ;
            o.___embind_register_native_and_builtin_types = function () {
                return (o.___embind_register_native_and_builtin_types = o.asm.H).apply(null, arguments)
            }
                ,
                o.dynCall_jiji = function () {
                    return (o.dynCall_jiji = o.asm.I).apply(null, arguments)
                }
                ,
                o.dynCall_iiiiij = function () {
                    return (o.dynCall_iiiiij = o.asm.J).apply(null, arguments)
                }
                ,
                o.dynCall_iiiiijj = function () {
                    return (o.dynCall_iiiiijj = o.asm.K).apply(null, arguments)
                }
                ,
                o.dynCall_iiiiiijj = function () {
                    return (o.dynCall_iiiiiijj = o.asm.L).apply(null, arguments)
                }
                ,
                o.dynCall_viijii = function () {
                    return (o.dynCall_viijii = o.asm.M).apply(null, arguments)
                }
                ;
            function Re(t) {
                this.name = "ExitStatus",
                    this.message = "Program terminated with exit(" + t + ")",
                    this.status = t
            }
            function Me(t) {
                function e() {
                    Se || (Se = !0,
                        o.calledRun = !0,
                        C || (!0,
                            nt(N),
                            o.onRuntimeInitialized && o.onRuntimeInitialized(),
                            function () {
                                if (o.postRun)
                                    for ("function" == typeof o.postRun && (o.postRun = [o.postRun]); o.postRun.length;)
                                        t = o.postRun.shift(),
                                            q.unshift(t);
                                var t;
                                nt(q)
                            }()))
                }
                t = t || l,
                    J > 0 || (!function () {
                        if (o.preRun)
                            for ("function" == typeof o.preRun && (o.preRun = [o.preRun]); o.preRun.length;)
                                t = o.preRun.shift(),
                                    G.unshift(t);
                        var t;
                        nt(G)
                    }(),
                        J > 0 || (o.setStatus ? (o.setStatus("Running..."),
                            setTimeout((function () {
                                setTimeout((function () {
                                    o.setStatus("")
                                }
                                ), 1),
                                    e()
                            }
                            ), 1)) : e()))
            }
            if (Z = function t() {
                Se || Me(),
                    Se || (Z = t)
            }
                ,
                o.run = Me,
                o.preInit)
                for ("function" == typeof o.preInit && (o.preInit = [o.preInit]); o.preInit.length > 0;)
                    o.preInit.pop()();
            Me(),

                t.exports = o;

        }
        ,
        194: t => {
            "use strict";
            t.exports = fs
        }
        ,
        997: t => {
            "use strict";
            t.exports = path
        }
    }
        , e = {};
    function r(n) {
        var o = e[n];
        if (void 0 !== o)
            return o.exports;
        var i = e[n] = {
            exports: {}
        };
        return t[n](i, i.exports, r),
            i.exports
    }
    r.n = t => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return r.d(e, {
            a: e
        }), e
    },
        r.d = (t, e) => {
            for (var n in e)
                r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: e[n]
                })
        }
        ,
        r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e);

    return (() => {
        "use strict";
        var t, e = new Uint8Array(16);
        function n() {
            if (!t && !(t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return t(e)
        }
        const o = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        const i = function (t) {
            return "string" == typeof t && o.test(t)
        };
        for (var a = [], u = 0; u < 256; ++u)
            a.push((u + 256).toString(16).substr(1));
        const s = function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                , r = (a[t[e + 0]] + a[t[e + 1]] + a[t[e + 2]] + a[t[e + 3]] + "-" + a[t[e + 4]] + a[t[e + 5]] + "-" + a[t[e + 6]] + a[t[e + 7]] + "-" + a[t[e + 8]] + a[t[e + 9]] + "-" + a[t[e + 10]] + a[t[e + 11]] + a[t[e + 12]] + a[t[e + 13]] + a[t[e + 14]] + a[t[e + 15]]).toLowerCase();
            if (!i(r))
                throw TypeError("Stringified UUID is invalid");
            return r
        };
        const c = function (t, e, r) {
            var o = (t = t || {}).random || (t.rng || n)();
            if (o[6] = 15 & o[6] | 64,
                o[8] = 63 & o[8] | 128,
                e) {
                r = r || 0;
                for (var i = 0; i < 16; ++i)
                    e[r + i] = o[i];
                return e
            }
            return s(o)
        };
        var f = r(321);
        var l = r.n(f);

        return new class {
            config = {
                numChannels: 1,
                simpleRate: 8e3
            };
            buffers = [];
            init({ config: t }) {
                this.config = t
            }
            start() {
                this.recbuffer = new Float32Array(0),
                    this.times = 1,
                    this.sessionId = c()
                return l()
            }
            record({ buffer: t }) {
                var e, r, n, o;
                if (this.recbuffer = (e = this.recbuffer,
                    r = t[0],
                    n = e.length,
                    (o = new Float32Array(n + r.length)).set(e),
                    o.set(r, n),
                    o),
                    this.recbuffer.length >= 48e3 && 1 === this.times)
                    return this.times = 2,
                        this.duration = 6,
                        this.match(function (t, e) {
                            const r = new Float32Array(e);
                            for (let n = 0; n < e; n++)
                                r[n] = t[n];
                            return r
                        }(this.recbuffer, 48e3).buffer)
            }
            match(t) {
                const e = l().ExtractQueryFP(t), r = new Int8Array(e.size());
                for (let t = 0; t < e.size(); t++) {
                    r[t] = e.get(t);
                }
                return {
                    result: r.buffer,
                    times: this.times,
                    duration: this.duration,
                    sessionId: this.sessionId
                }
            }
        };
    })()
})();

function NeteaseRecordArrayToBase64(data) {
    return new Promise((resolve, reject) => {
        Ze = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        qe = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256);
        for (Qe = 0; Qe < Ze.length; Qe++) {
            qe[Ze.charCodeAt(Qe)] = Qe
        }
        var Ke = function (e) {
            var t, n = new Uint8Array(e), r = n.length, o = "";
            for (t = 0; t < r; t += 3)
                o += Ze[n[t] >> 2],
                    o += Ze[(3 & n[t]) << 4 | n[t + 1] >> 4],
                    o += Ze[(15 & n[t + 1]) << 2 | n[t + 2] >> 6],
                    o += Ze[63 & n[t + 2]];
            return r % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="),
                o
        };
        let fn = processor.start()
        let interval = setInterval(() => {
            if (typeof fn.ExtractQueryFP === "function") {
                clearInterval(interval)
                let r = Object.keys(data).map(key => {
                    return data[key];
                })
                let arraybuffer = new Float32Array(r);
                let converted_buf = fn.ExtractQueryFP(arraybuffer.buffer)
                let result_buf = new Int8Array(converted_buf.size());
                for (let t = 0; t < converted_buf.size(); t++) {
                    result_buf[t] = converted_buf.get(t);
                }
                let bufLen = result_buf.buffer.byteLength;
                if (bufLen <= 64) {
                    return reject(`Buffer length(${bufLen}) is too short`)
                }
                return resolve(Ke(result_buf.buffer))
            }
        })
    })
}
function toNCMBuffer(audiodata, from, len, channel) {
    let now = 0;
    let json = {}
    if (audiodata.sampleRate !== 48000) {
        throw new Error("sampleRate is not 48000Hz")
    }
    let buf = audiodata.getChannelData(channel)
    while (now < len * 8e3) {
        json[now] = buf[now * audiodata.sampleRate / 8e3 + from * audiodata.sampleRate];
        now += 1;
    }
    return json;
}
module.exports = {
    Encode: (audiodata, from, len, channel = 0) => {
        return NeteaseRecordArrayToBase64(toNCMBuffer(audiodata, from, len, channel))
    }
};