var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/8.
 */
var TimeFormatTest = (function () {
    function TimeFormatTest() {
        console.log("secondToTime: " + utils.TimeFormat.secondToTime(4351));
        console.log("timeToMillisecond: " + utils.TimeFormat.timeToMillisecond("00:60:00"));
    }
    return TimeFormatTest;
}());
__reflect(TimeFormatTest.prototype, "TimeFormatTest");
//# sourceMappingURL=TimeFormatTest.js.map