var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/6.
 */
var utils;
(function (utils) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * 匹配中文字符
         * @param    str	需要匹配的字符串
         * @return
         */
        StringUtil.matchChineseWord = function (str) {
            //中文字符的unicode值[\u4E00-\u9FA5]
            var patternA = /[\u4E00-\u9FA5]+/gim;
            return str.match(patternA);
        };
        /**
         * 去除字符串左端的空白字符
         * @param    target		目标字符串
         * @return
         */
        StringUtil.lTrim = function (target) {
            var startIndex = 0;
            while (StringUtil.isWhiteSpace(target.charAt(startIndex))) {
                startIndex++;
            }
            return target.slice(startIndex, target.length);
        };
        /**
         * 去除字符串右端的空白字符
         * @param    target		目标字符串
         * @return
         */
        StringUtil.rTrim = function (target) {
            var endIndex = target.length - 1;
            while (StringUtil.isWhiteSpace(target.charAt(endIndex))) {
                endIndex--;
            }
            return target.slice(0, endIndex + 1);
        };
        /**
         * 返回一个去除2段空白字符的字符串
         * @param    target
         * @return  返回一个去除2段空白字符的字符串
         */
        StringUtil.trim = function (target) {
            if (target == null) {
                return null;
            }
            return StringUtil.rTrim(StringUtil.lTrim(target));
        };
        /**
         * 返回该字符是否为空白字符
         * @param    str
         * @return  返回该字符是否为空白字符
         */
        StringUtil.isWhiteSpace = function (str) {
            if (str == " " || str == "\t" || str == "\r" || str == "\n")
                return true;
            return false;
        };
        /**
         * 返回执行替换后的字符串
         * @param    mainStr   待查找字符串
         * @param    targetStr 目标字符串
         * @param    replaceStr 替换字符串
         * @param    caseMark  是否忽略大小写
         * @return  返回执行替换后的字符串
         */
        StringUtil.replaceMatch = function (mainStr, targetStr, replaceStr, caseMark) {
            if (caseMark === void 0) { caseMark = false; }
            var len = mainStr.length;
            var tempStr = "";
            var isMatch = false;
            var tempTarget = caseMark == true ? targetStr.toLowerCase() : targetStr;
            for (var i = 0; i < len; i++) {
                isMatch = false;
                if (mainStr.charAt(i) == tempTarget.charAt(0)) {
                    if (mainStr.substr(i, tempTarget.length) == tempTarget) {
                        isMatch = true;
                    }
                }
                if (isMatch) {
                    tempStr += replaceStr;
                    i = i + tempTarget.length - 1;
                }
                else {
                    tempStr += mainStr.charAt(i);
                }
            }
            return tempStr;
        };
        /**
         * 用html实体换掉字符窜中的特殊字符
         * @param 	str		        需要替换的字符串
         * @param 	reversion		是否翻转替换：将转义符号替换为正常的符号
         * @return 	换掉特殊字符后的字符串
         */
        StringUtil.htmlSpecialChars = function (str, reversion) {
            if (reversion === void 0) { reversion = false; }
            var len = StringUtil.specialSigns.length;
            for (var i = 0; i < len; i += 2) {
                var from;
                var to;
                from = StringUtil.specialSigns[i];
                to = StringUtil.specialSigns[i + 1];
                if (reversion) {
                    var temp = from;
                    from = to;
                    to = temp;
                }
                str = StringUtil.replaceMatch(str, from, to);
            }
            return str;
        };
        /**
        * 给数字字符前面添 "0"
        *
        * <pre>
        *
        * trace( StringFormat.zfill('1') );
        * // 01
        *
        * trace( StringFormat.zfill('16', 5) );
        * // 00016
        *
        * trace( StringFormat.zfill('-3', 3) );
        * // -03
        *
        * </pre>
        *
        * @param str 要进行处理的字符串
        * @param width 处理后字符串的长度，
        *              如果str.length >= width，将不做任何处理直接返回原始的str。
        * @return
        *
        */
        StringUtil.zfill = function (str, width) {
            if (width === void 0) { width = 2; }
            if (!str) {
                return str;
            }
            width = Math.floor(width);
            var slen = str.length;
            if (slen >= width) {
                return str;
            }
            var negative = false;
            if (str.substr(0, 1) == '-') {
                negative = true;
                str = str.substr(1);
            }
            var len = width - slen;
            for (var i = 0; i < len; i++) {
                str = '0' + str;
            }
            if (negative) {
                str = '-' + str;
            }
            return str;
        };
        /**
         * 翻转字符串
         * @param	str 字符串
         * @return  翻转后的字符串
         */
        StringUtil.reverse = function (str) {
            if (str.length > 1)
                return StringUtil.reverse(str.substring(1)) + str.substring(0, 1);
            else
                return str;
        };
        /**
         * 截断某段字符串
         * @param	str		目标字符串
         * @param	start	需要截断的起始索引
         * @param	len		截断长度
         * @param	order	顺序，true从字符串头部开始计算，false从字符串尾巴开始结算。
         * @return	截断后的字符串
         */
        StringUtil.cutOff = function (str, start, len, order) {
            if (order === void 0) { order = true; }
            start = Math.floor(start);
            len = Math.floor(len);
            var length = str.length;
            if (start > length)
                start = length;
            var s = start;
            var e = start + len;
            var newStr;
            if (order) {
                newStr = str.substring(0, s) + str.substr(e, length);
            }
            else {
                s = length - 1 - start - len;
                e = s + len;
                newStr = str.substring(0, s + 1) + str.substr(e + 1, length);
            }
            return newStr;
        };
        /**{0} 字符替换   */
        StringUtil.strReplace = function (str, rStr) {
            var i = 0, len = rStr.length;
            for (; i < len; i++) {
                if (rStr[i] == null || rStr[i] == "") {
                    rStr[i] = "无";
                    console.log("not word ", str);
                }
                str = str.replace("{" + i + "}", rStr[i]);
            }
            return str;
        };
        /**
         * 移除json字符串中egret类信息
         */
        StringUtil.cleanClassDesc = function (json) {
            //var s = "\"wh\":21,\"__class__\":\"vo.GuestVo\",\"__types__\":[\"vo.GuestVo\"]}"
            var idx = json.indexOf(',"__class__');
            while (idx > 0) {
                var end = json.indexOf(']', idx);
                json = json.substr(0, idx) + json.substr(end + 1);
                idx = json.indexOf(',"__class__');
            }
            return json;
        };
        /**
         * 排序中文字符串
         */
        StringUtil.sortChinese = function (arr) {
            var resultArray = arr.sort(function (p1, p2) {
                return p1.localeCompare(p2, "zh");
            });
            return resultArray;
        };
        /**
         * 根据数字生产26进制的字母
         */
        StringUtil.createCellPos = function (n) {
            var ordA = 'A'.charCodeAt(0);
            var ordZ = 'Z'.charCodeAt(0);
            var len = ordZ - ordA + 1;
            var s = "";
            while (n >= 0) {
                s = String.fromCharCode(n % len + ordA) + s;
                n = Math.floor(n / len) - 1;
            }
            return s;
        };
        // 字符串转ArrayBuffer
        StringUtil.prototype.stringToArrayBuffer = function (s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        };
        /**
         * 特殊符号字符串
         */
        StringUtil.specialSigns = [
            '&', '&amp;',
            '<', '&lt;',
            '>', '&gt;',
            '"', '&quot;',
            "'", '&apos;',
            '®', '&reg;',
            '©', '&copy;',
            '™', '&trade;',
        ];
        return StringUtil;
    }());
    utils.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "utils.StringUtil");
})(utils || (utils = {}));
//# sourceMappingURL=StringUtil.js.map