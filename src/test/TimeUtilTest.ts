/**
 * Created by tangben on 2015/7/9.
 */
class TimeUtilTest
{
    public constructor()
    {
        console.log("monthId", utils.TimeUtil.monthId());
        console.log("dateId", utils.TimeUtil.dateId());
        console.log("weekId", utils.TimeUtil.weekId());
        console.log("getFirstDayOfWeek", utils.TimeUtil.getFirstDayOfWeek());
        console.log("getFirstOfDay", utils.TimeUtil.getFirstOfDay());
        console.log("getNextFirstOfDay", utils.TimeUtil.getNextFirstOfDay());
        console.log("formatDate", utils.TimeUtil.formatDate(new Date()));
        console.log("formatDateTime", utils.TimeUtil.formatDateTime(new Date()));
    }
}