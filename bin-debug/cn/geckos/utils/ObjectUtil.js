var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var utils;
        (function (utils) {
            var ObjectUtil = (function () {
                function ObjectUtil() {
                }
                /**
                 * 对象深度拷贝
                 * @param p any 源对象
                 * @param c any 目标对象, 不传则返回新对象, 传则合并属性, 相同名字的属性则会覆盖
                 */
                ObjectUtil.clone = function (p, c) {
                    if (c === void 0) { c = null; }
                    var c = c || {};
                    for (var i in p) {
                        if (typeof p[i] === 'object') {
                            c[i] = p[i] instanceof Array ? [] : {};
                            ObjectUtil.clone(p[i], c[i]);
                        }
                        else {
                            c[i] = p[i];
                        }
                    }
                    return c;
                };
                return ObjectUtil;
            }());
            utils.ObjectUtil = ObjectUtil;
            __reflect(ObjectUtil.prototype, "cn.geckos.utils.ObjectUtil");
        })(utils = geckos.utils || (geckos.utils = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=ObjectUtil.js.map