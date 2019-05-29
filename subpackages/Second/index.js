window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  "test-second": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f43242HNENDFpDggQECDo13", "test-second");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tips: require("LabelLocalized")
      },
      start: function start() {
        this.tips.textKey = "cases/subpackage2.loaded";
      },
      goLoadSubpackage: function goLoadSubpackage() {
        cc.director.loadScene("Subpackages");
      }
    });
    cc._RF.pop();
  }, {
    LabelLocalized: void 0
  } ]
}, {}, [ "test-second" ]);
//# sourceMappingURL=index.js.map