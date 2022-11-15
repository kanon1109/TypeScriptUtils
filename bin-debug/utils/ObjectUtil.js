var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
        /**
         * 获取对象长度
         * @param	o
         * @return
         */
        /**
         * 获取对象长度
         * @param	o
         * @return
         */
        ObjectUtil.getLength = function (o) {
            if (!o)
                return 0;
            var count = 0;
            for (var key in o) {
                count++;
            }
            return count;
        };
        /**
         * 转换为数组
         * @param	obj	需要转换的对象
         * @return	转换后的数组
         */
        ObjectUtil.toArray = function (obj) {
            if (!obj)
                return null;
            var newArr = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var element = obj[key];
                    newArr.push(obj[key]);
                }
            }
            return newArr;
        };
        return ObjectUtil;
    }());
    utils.ObjectUtil = ObjectUtil;
    __reflect(ObjectUtil.prototype, "utils.ObjectUtil");
})(utils || (utils = {}));
//# sourceMappingURL=ObjectUtil.js.map