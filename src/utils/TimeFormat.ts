/**
 * Created by tangben on 2015/7/8.
 */
/**
 * 毫秒转换工具
 * @author Kanon
 */
module utils
{
export class TimeFormat
{
    /**
     * 秒数转换为时间形式。
     * @param	time 秒数
     * @param	partition 分隔符
     * @param	showHour  是否显示小时
     * @return  返回一个以分隔符分割的时, 分, 秒
     *
     * 比如: time = 4351; secondToTime(time)返回字符串01:12:31;
     */
    public static secondToTime(time:number = 0, partition:string = ":", showHour:boolean = true):string
    {
        var hours:number = Math.floor(time / 3600);
        var minutes:number = Math.floor(time % 3600 / 60);
        var seconds:number = Math.floor(time % 3600 % 60);

        var h:string = hours.toString();
        var m:string = minutes.toString();
        var s:string = seconds.toString();

        if (hours < 10)  h = "0" + h;
        if (minutes < 10) m = "0" + m;
        if (seconds < 10) s = "0" + s;

        var timeStr:string;
        if (showHour)
            timeStr = h + partition + m + partition + s;
        else
            timeStr = m + partition + s;

        return  timeStr;
    }


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
    public static timeToMillisecond(time:string, partition:string = ":"):string
    {
        var _ary:any[] = time.split(partition);
        var timeNum:number = 0;
        var len:number = _ary.length;
        for (var i:number = 0; i < len; i++)
        {
            var n:number = <number>_ary[i];
            timeNum += n * Math.pow(60, (len - 1 - i));
        }
        timeNum *= 1000;
        return timeNum.toString();
    }

    /**
     * 获取一个时间范围内得所有日期数据
     */
    public static getDateRange(startDate:Date, endDate:Date):any[]
    {
        let dateArr:any[] = []
		let weeks:string[] = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
		while ((endDate.getTime() - startDate.getTime()) >= 0) {
			let year:number = startDate.getFullYear()
			let month:string = (startDate.getMonth() + 1).toString().length === 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString()
			let day:string = startDate.getDate().toString().length === 1 ? "0" + startDate.getDate() : startDate.getDate().toString()
			let week:string = weeks[startDate.getDay()]
			let dataObj:any = {}
			dataObj["year"] = year
			dataObj["date"] = month + "-" + day
			dataObj["week"] = week
			dateArr.push(dataObj)
			startDate.setDate(startDate.getDate() + 1)
		}
		dateArr[0].week = "今天";
        return dateArr;
    }
}
}