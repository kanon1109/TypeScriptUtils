var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/9.
 */
var TimeUtilTest = (function () {
    function TimeUtilTest() {
        console.log("monthId", cn.geckos.utils.TimeUtil.monthId());
        console.log("dateId", cn.geckos.utils.TimeUtil.dateId());
        console.log("weekId", cn.geckos.utils.TimeUtil.weekId());
        console.log("getFirstDayOfWeek", cn.geckos.utils.TimeUtil.getFirstDayOfWeek());
        console.log("getFirstOfDay", cn.geckos.utils.TimeUtil.getFirstOfDay());
        console.log("getNextFirstOfDay", cn.geckos.utils.TimeUtil.getNextFirstOfDay());
        console.log("formatDate", cn.geckos.utils.TimeUtil.formatDate(new Date()));
        console.log("formatDateTime", cn.geckos.utils.TimeUtil.formatDateTime(new Date()));
    }
    return TimeUtilTest;
}());
__reflect(TimeUtilTest.prototype, "TimeUtilTest");
//# sourceMappingURL=TimeUtilTest.js.map