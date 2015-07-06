/**
 * Created by tangben on 2015/7/6.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var utils;
        (function (utils) {
            var ArrayUtil = (function () {
                function ArrayUtil() {
                }
                var __egretProto__ = ArrayUtil.prototype;
                /**
                 * 返回匹配项的索引
                 * @param	ary
                 * @param	num
                 * @return  返回匹配项的索引
                 */
                ArrayUtil.findElementIndex = function (ary, num) {
                    var len = ary.length;
                    for (var i = 0; i < len; ++i) {
                        if (ary[i] == num)
                            return i;
                    }
                    return null;
                };
                /**
                 * 返回数组中最大值的索引
                 * @param	ary
                 * @return  返回数组中最大值的索引
                 */
                ArrayUtil.getMaxElementIndex = function (ary) {
                    var matchIndex = 0;
                    var len = ary.length;
                    for (var j = 1; j < len; j++) {
                        if (ary[j] > ary[matchIndex])
                            matchIndex = j;
                    }
                    return matchIndex;
                };
                /**
                * 返回数组中最小值的索引
                * @param	ary
                * @return  返回数组中最小值的索引
                */
                ArrayUtil.getMinElementIndex = function (ary) {
                    var matchIndex = 0;
                    var len = ary.length;
                    for (var j = 1; j < len; j++) {
                        if (ary[j] < ary[matchIndex])
                            matchIndex = j;
                    }
                    return matchIndex;
                };
                /**
                 * 返回一个"唯一性"数组
                 * @param	ary		需要唯一性的数组
                 * @return	唯一性的数组
                 * 比如: [1, 2, 2, 3, 4]
                 * 返回: [1, 2, 3, 4]
                 */
                ArrayUtil.getUniqueAry = function (ary) {
                    var uAry = [];
                    var newAry = [];
                    var count = ary.length;
                    for (var i = 0; i < count; ++i) {
                        var value = ary[i];
                        if (uAry.indexOf(value) == -1)
                            uAry.push(value);
                    }
                    count = uAry.length;
                    for (var i = count - 1; i >= 0; --i) {
                        newAry.unshift(uAry[i]);
                    }
                    return newAry;
                };
                return ArrayUtil;
            })();
            utils.ArrayUtil = ArrayUtil;
            ArrayUtil.prototype.__class__ = "cn.geckos.utils.ArrayUtil";
        })(utils = geckos.utils || (geckos.utils = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=ArrayUtil.js.map