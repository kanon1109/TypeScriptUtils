var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/9.
 */
var TimeUtilTest = (function () {
    function TimeUtilTest() {
        console.log("monthId", utils.TimeUtil.monthId());
        console.log("dateId", utils.TimeUtil.dateId());
        console.log("weekId", utils.TimeUtil.weekId());
        console.log("getFirstDayOfWeek", utils.TimeUtil.getFirstDayOfWeek());
        console.log("getFirstOfDay", utils.TimeUtil.getFirstOfDay());
        console.log("getNextFirstOfDay", utils.TimeUtil.getNextFirstOfDay());
        console.log("formatDate", utils.TimeUtil.formatDate(new Date()));
        console.log("formatDateTime", utils.TimeUtil.formatDateTime(new Date()));
    }
    return TimeUtilTest;
}());
__reflect(TimeUtilTest.prototype, "TimeUtilTest");
//# sourceMappingURL=TimeUtilTest.js.map