module cn.geckos.utils {
	export class TimeUtil {
		/**
		 * 计算月份ID
		 * @param d 指定计算日期
		 * @returns 月ID
		 */
		public static monthId(d: Date = null): number {
			d = d ? d : new Date();
			let y = d.getFullYear();
			let m = d.getMonth() + 1;
			let g = m < 10 ? "0" : "";
			return parseInt(y + g + m);
		}

		/**
		 * 计算日期ID
		 * @param d 指定计算日期
		 * @returns 日期ID
		 */
		public static dateId(t: Date = null): number {
			t = t ? t : new Date();
			let m: number = t.getMonth() + 1;
			let a = m < 10 ? "0" : "";
			let d: number = t.getDate();
			let b = d < 10 ? "0" : "";
			return parseInt(t.getFullYear() + a + m + b + d);
		}

		/**
		 * 计算周ID
		 * @param d 指定计算日期
		 * @returns 周ID
		 */
		public static weekId(d: Date = null, first: boolean = true): number {
			d = d ? d : new Date();
			let c: Date = new Date();
			c.setTime(d.getTime());
			c.setDate(1); c.setMonth(0);//当年第一天

			let year: number = c.getFullYear();
			let firstDay: number = c.getDay();
			if (firstDay == 0) {
				firstDay = 7;
			}
			let max: boolean = false;
			if (firstDay <= 4) {
				max = firstDay > 1;
				c.setDate(c.getDate() - (firstDay - 1));
			} else {
				c.setDate(c.getDate() + 7 - firstDay + 1);
			}
			let num: number = TimeUtil.diffDay(d, c, false);
			if (num < 0) {
				c.setDate(1); c.setMonth(0);//当年第一天
				c.setDate(c.getDate() - 1);
				return TimeUtil.weekId(c, false);
			}
			let week: number = num / 7;
			let weekIdx: number = Math.floor(week) + 1;
			if (weekIdx == 53) {
				c.setTime(d.getTime());
				c.setDate(c.getDate() - 1);
				let endDay: number = c.getDay();
				if (endDay == 0) {
					endDay = 7;
				}
				if (first && (!max || endDay < 4)) {
					c.setFullYear(c.getFullYear() + 1);
					c.setDate(1); c.setMonth(0);//当年第一天
					return TimeUtil.weekId(c, false);
				}
			}
			let g: string = weekIdx > 9 ? "" : "0";
			let s: string = year + "00" + g + weekIdx;//加上00防止和月份ID冲突
			return parseInt(s);
		}

		/**
		 * 计算俩日期时间差，如果a比b小，返回负数
		 */
		public static diffDay(a: Date, b: Date, fixOne: boolean = false): number {
			let x = (a.getTime() - b.getTime()) / 86400000;
			return fixOne ? Math.ceil(x) : Math.floor(x);
		}

		/**
		 * 获取本周一 凌晨时间
		 */
		public static getFirstDayOfWeek(d?: Date): Date {
			d = d ? d : new Date();
			var day = d.getDay() || 7;
			return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1 - day, 0, 0, 0, 0);
		}

		/**
		 * 获取当日凌晨时间
		 */
		public static getFirstOfDay(d?: Date): Date {
			d = d ? d : new Date();
			d.setHours(0, 0, 0, 0);
			return d;
		}

		/**
		 * 获取次日凌晨时间
		 */
		public static getNextFirstOfDay(d?: Date): Date {
			return new Date(TimeUtil.getFirstOfDay(d).getTime() + 86400000);
		}

		/**
		 * @returns 2018-12-12
		 */
		public static formatDate(date: Date): string {
			var y = date.getFullYear();
			var m: any = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d: any = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			return y + '-' + m + '-' + d;
		}

		/**
		 * @returns 2018-12-12 12:12:12
		 */
		public static formatDateTime(date: Date): string {
			var y = date.getFullYear();
			var m: any = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d: any = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			var i: any = date.getMinutes();
			i = i < 10 ? ('0' + i) : i;
			var s: any = date.getSeconds();
			s = s < 10 ? ('0' + s) : s;
			return y + '-' + m + '-' + d + ' ' + h + ':' + i + ":" + s;
		}

		/**
		 * @returns s 2018-12-12 或者 2018-12-12 12:12:12
		 */
		public static parseDate(s: string): Date {
			var t = Date.parse(s);
			if (!isNaN(t)) {
				return new Date(Date.parse(s.replace(/-/g, "/")));
			} else {
				return new Date();
			}
		}
	}
}