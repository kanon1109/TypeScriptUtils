/**
 * Created by kanon on 2015/7/11.
 */
module effect
{
/**
 * 字符串文本工具
 * @author Kanon
 */
export class TextEffect
{
    //计时器
    private timer:egret.Timer;
    //需要显示的字符串
    private str:string;
    //文本
    private text:egret.TextField;
    //字符串显示的当前索引
    private index:number;
    //结束后的回调
    private completeFun:Function;
    //回调的this指向
    private thisObj:any;
    /**
     * 逐行显示
     * @param	text  	文本
     * @param	str   	字符串
     * @param	delay   显示的间隔毫秒数
     */
    public progressShow(text:egret.TextField, str:string, delay:number):void
    {
        this.text = text;
        this.str = str;
        this.addTimer(delay);
    }

    /**
     * 创建计时器
     * @param	delay  间隔毫秒数
     */
    private addTimer(delay:number):void
    {
        this.removeTimer();
        this.index = 0;
        this.timer = new egret.Timer(delay);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timer.start();
    }

    private timerHandler(event:egret.TimerEvent):void
    {
        let subStr:string = this.str.charAt(this.index);
        this.text.appendText(subStr);
        this.index++;
        if (this.index == this.str.length)
        {
            if(this.completeFun && this.thisObj)
                this.completeFun.call(this.thisObj);
            this.removeTimer();
        }
    }

    /**
     * 销毁计时器
     */
    private removeTimer():void
    {
        if (this.timer)
        {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            this.timer.stop();
            this.timer = null;
        }
    }

    /**
     * 销毁
     */
    public destroy():void
    {
        this.text = null;
        this.removeTimer();
    }

    /**
     * 设置回调方法
     */
    public setCallBackFunction(fun:Function, thisObj:any):void
    {
        this.completeFun = fun;
        this.thisObj = thisObj;
    }
}
}