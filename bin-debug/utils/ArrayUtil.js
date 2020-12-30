var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/6.
 */
var utils;
(function (utils) {
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        /**
         * 执行冒泡排序
         * @param	ary
         * 算法参考 -- http://www.hiahia.org/datastructure/paixu/paixu8.3.1.1-1.htm
         */
        ArrayUtil.bubbleSort = function (ary) {
            var isExchange = false;
            for (var i = 0; i < ary.length; i++) {
                isExchange = false;
                for (var j = ary.length - 1; j > i; j--) {
                    if (ary[j] < ary[j - 1]) {
                        var temp = ary[j];
                        ary[j] = ary[j - 1];
                        ary[j - 1] = temp;
                        isExchange = true;
                    }
                }
                if (!isExchange)
                    break;
            }
        };
        /**
         * 执行插入排序
         * @param	ary
         */
        ArrayUtil.insertionSort = function (ary) {
            var len = ary.length;
            for (var i = 1; i < len; i++) {
                var val = ary[i];
                for (var j = i; j > 0 && ary[j - 1] > val; j--) {
                    ary[j] = ary[j - 1];
                }
                ary[j] = val;
            }
        };
        /**
         * 执行二分搜索
         * @param	ary		搜索的数组（必须排序过）
         * @param	value	需要搜索的值
         * @return  返回匹配结果的数组索引
         */
        ArrayUtil.binarySearch = function (ary, value) {
            var startIndex = 0;
            var endIndex = ary.length;
            var sub = (startIndex + endIndex) >> 1;
            while (startIndex < endIndex) {
                if (value <= ary[sub])
                    endIndex = sub;
                else if (value >= ary[sub])
                    startIndex = sub + 1;
                sub = (startIndex + endIndex) >> 1;
            }
            if (ary[startIndex] == value)
                return startIndex;
            return -1;
        };
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
        /**
         * 交换数组元素
         * @param	array	目标数组
         * @param	index1	交换后的索引
         * @param	index2	交换前的索引
         */
        ArrayUtil.swap = function (array, index1, index2) {
            var temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
        };
        /**
         * 清除列表
         * @param	ary 列表
         */
        ArrayUtil.clearList = function (ary) {
            if (!ary)
                return;
            var length = ary.length;
            for (var i = length - 1; i >= 0; i -= 1) {
                ary.splice(i, 1);
            }
        };
        /**
         * 克隆一个数组
         * @param	ary 需要克隆的数组
         * @return  克隆的数组
         */
        ArrayUtil.cloneList = function (ary) {
            if (!ary)
                return null;
            return ary.slice(0, ary.length);
        };
        /**
         * 判断2个数组是否相同
         * @param	ary1	数组1
         * @param	ary2	数组2
         * @return	是否相同
         */
        ArrayUtil.equals = function (ary1, ary2) {
            if (ary1 == ary2)
                return true;
            var length = ary1.length;
            if (length != ary2.length)
                return false;
            while (length--) {
                if (ary1[length] != ary2[length])
                    return false;
            }
            return true;
        };
        /**
         * 根据索引插入元素，索引和索引后的元素都向后移动一位
         * @param	index   插入索引
         * @param	value   插入的元素
         * @return  插入的元素 未插入则返回空
         */
        ArrayUtil.insert = function (ary, index, value) {
            if (!ary)
                return null;
            var length = ary.length;
            if (index > length)
                index = length;
            if (index < 0)
                index = 0;
            if (index == length)
                ary.push(value); //插入最后
            else if (index == 0)
                ary.unshift(value); //插入头
            else {
                for (var i = length - 1; i >= index; i -= 1) {
                    ary[i + 1] = ary[i];
                }
                ary[index] = value;
            }
            return value;
        };
        return ArrayUtil;
    }());
    utils.ArrayUtil = ArrayUtil;
    __reflect(ArrayUtil.prototype, "utils.ArrayUtil");
})(utils || (utils = {}));
//# sourceMappingURL=ArrayUtil.js.map