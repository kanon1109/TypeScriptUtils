var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/8.
 */
/**
 * 毫秒转换工具
 * @author Kanon
 */
var utils;
(function (utils) {
    var TimeFormat = (function () {
        function TimeFormat() {
        }
        /**
         * 秒数转换为时间形式。
         * @param	time 秒数
         * @param	partition 分隔符
         * @param	showHour  是否显示小时
         * @return  返回一个以分隔符分割的时, 分, 秒
         *
         * 比如: time = 4351; secondToTime(time)返回字符串01:12:31;
         */
        TimeFormat.secondToTime = function (time, partition, showHour) {
            if (time === void 0) { time = 0; }
            if (partition === void 0) { partition = ":"; }
            if (showHour === void 0) { showHour = true; }
            var hours = Math.floor(time / 3600);
            var minutes = Math.floor(time % 3600 / 60);
            var seconds = Math.floor(time % 3600 % 60);
            var h = hours.toString();
            var m = minutes.toString();
            var s = seconds.toString();
            if (hours < 10)
                h = "0" + h;
            if (minutes < 10)
                m = "0" + m;
            if (seconds < 10)
                s = "0" + s;
            var timeStr;
            if (showHour)
                timeStr = h + partition + m + partition + s;
            else
                timeStr = m + partition + s;
            return timeStr;
        };
        /**
         * 时间形式转换为毫秒数。
         * @param   time  以指定分隔符分割的时间字符串
         * @param   partition  分隔符
         * @return  毫秒数显示的字符串
         * @throws  Error Exception
         *
         * 用法1 trace(MillisecondTransform.timeToMillisecond("00:60:00"))
         * 输出   3600000
         *
         *
         * 用法2 trace(MillisecondTransform.timeToMillisecond("00.60.00","."))
         * 输出   3600000
         */
        TimeFormat.timeToMillisecond = function (time, partition) {
            if (partition === void 0) { partition = ":"; }
            var _ary = time.split(partition);
            var timeNum = 0;
            var len = _ary.length;
            for (var i = 0; i < len; i++) {
                var n = _ary[i];
                timeNum += n * Math.pow(60, (len - 1 - i));
            }
            timeNum *= 1000;
            return timeNum.toString();
        };
        /**
         * 获取一个时间范围内得所有日期数据
         */
        TimeFormat.getDateRange = function (startDate, endDate) {
            var dateArr = [];
            var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            while ((endDate.getTime() - startDate.getTime()) >= 0) {
                var year = startDate.getFullYear();
                var month = (startDate.getMonth() + 1).toString().length === 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString();
                var day = startDate.getDate().toString().length === 1 ? "0" + startDate.getDate() : startDate.getDate().toString();
                var week = weeks[startDate.getDay()];
                var dataObj = {};
                dataObj["year"] = year;
                dataObj["date"] = month + "-" + day;
                dataObj["week"] = week;
                dateArr.push(dataObj);
                startDate.setDate(startDate.getDate() + 1);
            }
            dateArr[0].week = "今天";
            return dateArr;
        };
        return TimeFormat;
    }());
    utils.TimeFormat = TimeFormat;
    __reflect(TimeFormat.prototype, "utils.TimeFormat");
})(utils || (utils = {}));
//# sourceMappingURL=TimeFormat.js.map