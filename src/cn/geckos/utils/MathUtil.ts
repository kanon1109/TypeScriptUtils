/**
 * Created by kanon on 2015/7/8.
 */
module cn.geckos.utils
{
export class MathUtil
{
    /**
     * 弧度转换成角度  radians -> degrees
     *
     * @param radians 弧度
     * @return 相应的角度
     */
    public static rds2dgs(radians:number):number
    {
        return MathUtil.fixAngle(radians * 180 / Math.PI);
    }


    /**
     * 角度转换成弧度 degrees -> radians
     *
     * @param degrees 角度
     * @return 相应的弧度
     */
    public static dgs2rds(degrees:number):number
    {
        return degrees * Math.PI / 180;
    }


    /**
     * 标准化角度值，将传入的角度值返回成一个确保落在 0 ~ 360 之间的数字。
     *
     * <pre>
     * MathUtil.fixAngle(380); // 返回 20
     * MathUtil.fixAngle(-340); // 返回 20
     * </pre>
     *
     * 该方法详情可查看 《Flash MX 编程与创意实现》的第69页。
     */
    public static fixAngle(angle:number):number
    {
        angle %= 360;
        if (angle < 0) return angle + 360;
        return angle;
    }

    /**
     * 修正数字 在一个范围内
     * @param	num     需要修正的数字
     * @param	min     最小的范围
     * @param	range   最大范围
     * @return  修正后的数字
     */
    public static fixNumber(num:number, min:number, range:number):number
    {
        num %= range;
        if (num < min)
            return num + range;
        return num;
    }


    /**
     * 修正半角
     * @param	angle	需要修正的角度
     * @return	修正半角后的角度
     */
    public static fixHalfAngle(angle:number):number
    {
        angle %= 180;
        if (angle < 0)
            return angle + 180;
        return angle;
    }

    /**
     * 求取阶乘
     * @param	num		需要求阶乘的数组
     * @return
     */
    public static getFactorial(num:number):number
    {
        if(num <= 0) return 1;
        return num * MathUtil.getFactorial(num - 1);
    }


    /**
     * 求乘方
     * @param	num
     * @param	pow  乘方的次数
     * @return
     */
    public static power(num:number, pow:number):number
    {
        if(pow <= 0) return 1;
        return num * MathUtil.power(num, pow - 1);
    }


    /**
     * 对一个数保留指定的小数位数, 然后四舍五入
     * @param	num
     * @param	interval 保留小数点后几位
     * @return  返回一个指定保留小数位的数(四舍五入)
     */
    public static round(num:number, interval:number = .1):number
    {
        return Math.round(num / interval) * interval;
    }


    /**
     * 对一个数保留指定的小数位数, 然后向下取整
     * @param	num
     * @param	interval 保留小数点后几位
     * @return  返回一个指定保留小数位的数(向下取整)
     */
    public static floor(num:number, interval:number = .1):number
    {
        return Math.floor(num / interval) * interval;
    }


    /**
     * 对一个数保留指定的小数位数, 然后向上取整
     * @param	num
     * @param	interval 保留小数点后几位
     * @return  返回一个指定保留小数位的数(向上取整)
     */
    public static ceil(num:number, interval:number = .1):number
    {
        return Math.ceil(num / interval) * interval;
    }

    /**
     * 返回num的绝对值
     * @param	num
     * @return  返回参数num的绝对值
     */
    public static getAbsolute(num:number):number
    {
        return num < 0 ? -num : num;
    }


    /**
     * 返回参数mainNum除以divided的余数
     * @param	mainNum
     * @param	divided
     * @return  返回参数mainNum除以divided的余数
     */
    public static getRemainedNum(mainNum:number, divided:number):number
    {
        return mainNum - ((mainNum / divided) >> 0) * divided;
    }

    /**
     * 判断参数num是否是偶数
     * @param	num
     * @return  判断参数num是否是偶数
     */
    public static isEven(num:number):boolean
    {
        return <boolean>(MathUtil.isEvenByDivided(num, 2));
    }


    /**
     * 得到num除以divided后得到的余数
     * @param	num
     * @param	divided
     * @return
     */
    public static isEvenByDivided(num:number, divided:number):number
    {
        return num & (divided - 1);
    }
}
}