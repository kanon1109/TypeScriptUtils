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
                /**
                 * 返回2个数组中不同的部分
                 * 比如数组A = [1, 2, 3, 4, 6]
                 *    数组B = [0, 2, 1, 3, 4]
                 * 返回[6, 0]
                 * @param	aryA
                 * @param	aryB
                 * @return
                 */
                ArrayUtil.getDifferAry = function (aryA, aryB) {
                    aryA = ArrayUtil.getUniqueAry(aryA);
                    aryB = ArrayUtil.getUniqueAry(aryB);
                    var ary = aryA.concat(aryB);
                    var uObj = new Object();
                    var newAry = [];
                    var count = ary.length;
                    for (var j = 0; j < count; ++j) {
                        if (!uObj[ary[j]]) {
                            uObj[ary[j]] = new Object();
                            uObj[ary[j]].count = 0;
                            uObj[ary[j]].key = ary[j];
                            uObj[ary[j]].count++;
                        }
                        else {
                            if (uObj[ary[j]] instanceof Object) {
                                uObj[ary[j]].count++;
                            }
                        }
                    }
                    for (var i in uObj) {
                        if (uObj[i].count != 2) {
                            newAry.unshift(uObj[i].key);
                        }
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
