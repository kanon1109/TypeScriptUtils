module utils 
{
export class TimeUtil 
{
	/**
	 * 计算月份ID
	 * @param d 指定计算日期
	 * @returns 月ID
	 */
	public static monthId(d:Date= null):number
	{
		d = d ? d : new Date();
		let y:any = d.getFullYear();
		let m:any = d.getMonth() + 1;
		let g:any = m < 10 ? "0" :"";
		return parseInt(y + g + m);
	}

	/**
	 * 计算日期ID
	 * @param d 指定计算日期
	 * @returns 日期ID
	 */
	public static dateId(t:Date = null):number {
		t = t ? t : new Date();
		let m:number = t.getMonth() + 1;
		let a:string = m < 10 ? "0" :"";
		let d:number = t.getDate();
		let b:string = d < 10 ? "0" :"";
		return parseInt(t.getFullYear() + a + m + b + d);
	}

	/**
	 * 计算周ID
	 * @param d 指定计算日期
	 * @returns 周ID
	 */
	public static weekId(d:Date = null, first:boolean = true):number {
		d = d ? d : new Date();
		let c:Date = new Date();
		c.setTime(d.getTime());
		c.setDate(1); c.setMonth(0);//当年第一天
		let year:number = c.getFullYear();
		let firstDay:number = c.getDay();
		if (firstDay == 0) {
			firstDay = 7;
		}
		let max:boolean = false;
		if (firstDay <= 4) {
			max = firstDay > 1;
			c.setDate(c.getDate() - (firstDay - 1));
		} else {
			c.setDate(c.getDate() + 7 - firstDay + 1);
		}
		let num:number = TimeUtil.diffDay(d, c, false);
		if (num < 0) {
			c.setDate(1); c.setMonth(0);//当年第一天
			c.setDate(c.getDate() - 1);
			return TimeUtil.weekId(c, false);
		}
		let week:number = num / 7;
		let weekIdx:number = Math.floor(week) + 1;
		if (weekIdx == 53) {
			c.setTime(d.getTime());
			c.setDate(c.getDate() - 1);
			let endDay:number = c.getDay();
			if (endDay == 0) {
				endDay = 7;
			}
			if (first && (!max || endDay < 4)) {
				c.setFullYear(c.getFullYear() + 1);
				c.setDate(1); c.setMonth(0);//当年第一天
				return TimeUtil.weekId(c, false);
			}
		}
		let g:string = weekIdx > 9 ? "" :"0";
		let s:string = year + "00" + g + weekIdx;//加上00防止和月份ID冲突
		return parseInt(s);
	}

	/**
	 * 计算俩日期时间差，如果a比b小，返回负数
	 */
	public static diffDay(a:Date, b:Date, fixOne:boolean = false):number {
		let x:number = (a.getTime() - b.getTime()) / 86400000;
		return fixOne ? Math.ceil(x) :Math.floor(x);
	}

	/**
	 * 获取本周一 凌晨时间
	 */
	public static getFirstDayOfWeek(d?:Date):Date {
		d = d ? d : new Date();
		let day = d.getDay() || 7;
		return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1 - day, 0, 0, 0, 0);
	}

	/**
	 * 获取当日凌晨时间
	 */
	public static getFirstOfDay(d?:Date):Date {
		d = d ? d : new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	}

	/**
	 * 获取次日凌晨时间
	 */
	public static getNextFirstOfDay(d?:Date):Date {
		return new Date(TimeUtil.getFirstOfDay(d).getTime() + 86400000);
	}

	/**
	 * @returns 2018-12-12
	 */
	public static formatDate(date:Date):string {
		let y:number = date.getFullYear();
		let m:any = date.getMonth() + 1;
		m = m < 10 ? '0' + m :m;
		let d:any = date.getDate();
		d = d < 10 ? ('0' + d) :d;
		return y + '-' + m + '-' + d;
	}

	/**
	 * @returns 2018-12-12 12:12:12
	 */
	public static formatDateTime(date:Date):string {
		let y:number = date.getFullYear();
		let m:any = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) :m;
		let d:any = date.getDate();
		d = d < 10 ? ('0' + d) :d;
		let h = date.getHours();
		let i:any = date.getMinutes();
		i = i < 10 ? ('0' + i) :i;
		let s:any = date.getSeconds();
		s = s < 10 ? ('0' + s) :s;
		return y + '-' + m + '-' + d + ' ' + h + ':' + i + ":" + s;
	}

	/**
	 * @returns s 2018-12-12 或者 2018-12-12 12:12:12
	 */
	public static parseDate(s:string):Date {
		let t:number = Date.parse(s);
		if (!isNaN(t)) {
			return new Date(Date.parse(s.replace(/-/g, "/")));
		} else {
			return new Date();
		}
	}

	/**
	 * 获取年龄
	 */
	public static getAges(str:string):number 
	{ 
		let r:any = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);   
		if(r == null) return 0;   
		let d:Date = new Date(r[1], r[3]-1, r[4]);   
		if (d.getFullYear() == r[1] && 
		   (d.getMonth()+1) == r[3] && d.getDate() == r[4]) 
		{ 
			let y:number = new Date().getFullYear(); 
			return y - r[1];
		} 
		return 0;
	} 
	
	/**
	 * 获取某月份的天数
	 */
	public static getMonthDays(year:number, month:number):number
	{
		let d:Date = new Date(year, month, 0)
		return d.getDate()
	}

	/**
	 * 格式化日期
	 */
	public static formatDateId(dateId:number, partition:string="-"):string
	{
		if((dateId + "").length != 8) return "";
		let year:string = (dateId + "").substr(0, 4);
		let month:string = (dateId + "").substr(4, 2);
		let day:string = (dateId + "").substr(6, 2);
		return year + partition + month + partition + day
	}

	/**
	 * 获取星期
	 */
	public static getWeek(d?:Date):string
	{
		d = d ? d : new Date();
		let weeks:string[] = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
		return weeks[d.getDay()];
	}

	/**
	 * 获取b-a之间的所有年份+月份
	 */
	public static getBetweenDateList(a:Date, b:Date):{year:number, month:number}[]
	{
		if(!a || !b) return null;
		let dataList:{year:number, month:number}[] = [];
		let year:number = a.getFullYear();
		let month:number = a.getMonth() + 1;
		let nowYear:number = b.getFullYear();
		let nowMonth:number = b.getMonth() + 1;
		let yearCount:number = nowYear - year;
		for(let i:number = nowMonth; i >= 1; i--)
		{
			let data:any = {year:nowYear, month:i};
			dataList.push(data);
		}
		for(let i:number = 1; i <= yearCount; i++)
		{
			let year:number = nowYear - i;
			for(let j:number = 12; j >= 1; j--)
			{
				let data:any = {year:year, month:j};
				dataList.push(data);
			}
		}
		return dataList;
	}
}
}