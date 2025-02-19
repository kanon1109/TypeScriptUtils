var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var TimeUtil = (function () {
        function TimeUtil() {
        }
        /**
         * 计算月份ID
         * @param d 指定计算日期
         * @returns 月ID
         */
        TimeUtil.monthId = function (d) {
            if (d === void 0) { d = null; }
            d = d ? d : new Date();
            var y = d.getFullYear();
            var m = d.getMonth() + 1;
            var g = m < 10 ? "0" : "";
            return parseInt(y + g + m);
        };
        /**
         * 计算日期ID
         * @param d 指定计算日期
         * @returns 日期ID
         */
        TimeUtil.dateId = function (t) {
            if (t === void 0) { t = null; }
            t = t ? t : new Date();
            var m = t.getMonth() + 1;
            var a = m < 10 ? "0" : "";
            var d = t.getDate();
            var b = d < 10 ? "0" : "";
            return parseInt(t.getFullYear() + a + m + b + d);
        };
        /**
         * 计算周ID
         * @param d 指定计算日期
         * @returns 周ID
         */
        TimeUtil.weekId = function (d, first) {
            if (d === void 0) { d = null; }
            if (first === void 0) { first = true; }
            d = d ? d : new Date();
            var c = new Date();
            c.setTime(d.getTime());
            c.setDate(1);
            c.setMonth(0); //当年第一天
            var year = c.getFullYear();
            var firstDay = c.getDay();
            if (firstDay == 0) {
                firstDay = 7;
            }
            var max = false;
            if (firstDay <= 4) {
                max = firstDay > 1;
                c.setDate(c.getDate() - (firstDay - 1));
            }
            else {
                c.setDate(c.getDate() + 7 - firstDay + 1);
            }
            var num = TimeUtil.diffDay(d, c, false);
            if (num < 0) {
                c.setDate(1);
                c.setMonth(0); //当年第一天
                c.setDate(c.getDate() - 1);
                return TimeUtil.weekId(c, false);
            }
            var week = num / 7;
            var weekIdx = Math.floor(week) + 1;
            if (weekIdx == 53) {
                c.setTime(d.getTime());
                c.setDate(c.getDate() - 1);
                var endDay = c.getDay();
                if (endDay == 0) {
                    endDay = 7;
                }
                if (first && (!max || endDay < 4)) {
                    c.setFullYear(c.getFullYear() + 1);
                    c.setDate(1);
                    c.setMonth(0); //当年第一天
                    return TimeUtil.weekId(c, false);
                }
            }
            var g = weekIdx > 9 ? "" : "0";
            var s = year + "00" + g + weekIdx; //加上00防止和月份ID冲突
            return parseInt(s);
        };
        /**
         * 计算俩日期时间差，如果a比b小，返回负数
         */
        TimeUtil.diffDay = function (a, b, fixOne) {
            if (fixOne === void 0) { fixOne = false; }
            var x = (a.getTime() - b.getTime()) / 86400000;
            return fixOne ? Math.ceil(x) : Math.floor(x);
        };
        /**
         * 获取本周一 凌晨时间
         */
        TimeUtil.getFirstDayOfWeek = function (d) {
            d = d ? d : new Date();
            var day = d.getDay() || 7;
            return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1 - day, 0, 0, 0, 0);
        };
        /**
         * 获取当日凌晨时间
         */
        TimeUtil.getFirstOfDay = function (d) {
            d = d ? d : new Date();
            d.setHours(0, 0, 0, 0);
            return d;
        };
        /**
         * 获取次日凌晨时间
         */
        TimeUtil.getNextFirstOfDay = function (d) {
            return new Date(TimeUtil.getFirstOfDay(d).getTime() + 86400000);
        };
        /**
         * @returns 2018-12-12
         */
        TimeUtil.formatDate = function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        };
        /**
         * @returns 2018-12-12 12:12:12
         */
        TimeUtil.formatDateTime = function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            var i = date.getMinutes();
            i = i < 10 ? ('0' + i) : i;
            var s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + m + '-' + d + ' ' + h + ':' + i + ":" + s;
        };
        /**
         * @returns s 2018-12-12 或者 2018-12-12 12:12:12
         */
        TimeUtil.parseDate = function (s) {
            var t = Date.parse(s);
            if (!isNaN(t)) {
                return new Date(Date.parse(s.replace(/-/g, "/")));
            }
            else {
                return new Date();
            }
        };
        /**
         * 获取年龄
         */
        TimeUtil.getAges = function (str) {
            var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null)
                return 0;
            var d = new Date(r[1], r[3] - 1, r[4]);
            if (d.getFullYear() == r[1] &&
                (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                var y = new Date().getFullYear();
                return y - r[1];
            }
            return 0;
        };
        /**
         * 获取某月份的天数
         */
        TimeUtil.getMonthDays = function (year, month) {
            var d = new Date(year, month, 0);
            return d.getDate();
        };
        /**
         * 格式化日期
         */
        TimeUtil.formatDateId = function (dateId, partition) {
            if (partition === void 0) { partition = "-"; }
            if ((dateId + "").length != 8)
                return "";
            var year = (dateId + "").substr(0, 4);
            var month = (dateId + "").substr(4, 2);
            var day = (dateId + "").substr(6, 2);
            return year + partition + month + partition + day;
        };
        /**
         * 获取星期
         */
        TimeUtil.getWeek = function (d) {
            d = d ? d : new Date();
            var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            return weeks[d.getDay()];
        };
        /**
         * 获取b-a之间的所有年份+月份
         */
        TimeUtil.getBetweenDateList = function (a, b) {
            if (!a || !b)
                return null;
            var dataList = [];
            var year = a.getFullYear();
            var month = a.getMonth() + 1;
            var nowYear = b.getFullYear();
            var nowMonth = b.getMonth() + 1;
            var yearCount = nowYear - year;
            for (var i = nowMonth; i >= 1; i--) {
                var data = { year: nowYear, month: i };
                dataList.push(data);
            }
            for (var i = 1; i <= yearCount; i++) {
                var year_1 = nowYear - i;
                for (var j = 12; j >= 1; j--) {
                    var data = { year: year_1, month: j };
                    dataList.push(data);
                }
            }
            return dataList;
        };
        return TimeUtil;
    }());
    utils.TimeUtil = TimeUtil;
    __reflect(TimeUtil.prototype, "utils.TimeUtil");
})(utils || (utils = {}));
//# sourceMappingURL=TimeUtil.js.map