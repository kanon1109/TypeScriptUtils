/**
 * Created by tangben on 2015/7/9.
 */
class TimeUtilTest
{
    public constructor()
    {
        console.log("monthId", cn.geckos.utils.TimeUtil.monthId());
        console.log("dateId", cn.geckos.utils.TimeUtil.dateId());
        console.log("weekId", cn.geckos.utils.TimeUtil.weekId());
        console.log("getFirstDayOfWeek", cn.geckos.utils.TimeUtil.getFirstDayOfWeek());
        console.log("getFirstOfDay", cn.geckos.utils.TimeUtil.getFirstOfDay());
        console.log("getNextFirstOfDay", cn.geckos.utils.TimeUtil.getNextFirstOfDay());
        console.log("formatDate", cn.geckos.utils.TimeUtil.formatDate(new Date()));
        console.log("formatDateTime", cn.geckos.utils.TimeUtil.formatDateTime(new Date()));
    }
}