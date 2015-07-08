/**
 * Created by tangben on 2015/7/8.
 */
class TimeFormatTest
{
    public constructor()
    {
        console.log("secondToTime: " + cn.geckos.utils.TimeFormat.secondToTime(4351));
        console.log("timeToMillisecond: " + cn.geckos.utils.TimeFormat.timeToMillisecond("00:60:00"));
    }
}