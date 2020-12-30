module utils
{
/**
 * enterFrame工具
 * @author Kanon
 */
export class EnterFrame
{
	//计时器
	private static timer:egret.Timer;
	//存放方法列表
    private static funList:Function[];
    private static thisObjList:any[];
	//是否初始化
	private static isInit:boolean;


	/**
	 * 初始化
	 * @param	fps	enterFrame执行的帧频
	 */
	public static init(fps:number = 24):void
	{
		EnterFrame.funList = [];
		EnterFrame.thisObjList = [];
		EnterFrame.timer = new egret.Timer(Math.floor(1000 / fps));
		EnterFrame.timer.addEventListener(egret.TimerEvent.TIMER, EnterFrame.timerHandler, this);
		EnterFrame.isInit = true;
		EnterFrame.timer.start();
	}

	/**
	 * 实时执行函数
	 * @param	event
	 */
	private static timerHandler(event:egret.TimerEvent):void
	{
		var length:number = EnterFrame.funList.length;
		for (var i:number = 0; i < length; i += 1)
		{
			var thisObj:any = EnterFrame.thisObjList[i];
			EnterFrame.funList[i].call(thisObj);
		}
	}


	/**
	 * 添加一个需要实时执行的方法
	 * @param	fun		方法对象
	 * @param	thisObj	this指向
	 */
	public static push(fun:Function, thisObj:any):void
	{
		if (!EnterFrame.isInit) return;
		if (EnterFrame.funList.indexOf(fun) == -1)
		{
			EnterFrame.funList.push(fun);
			EnterFrame.thisObjList.push(thisObj);
		}
	}

	/**
	 * 删除一个方法
	 * @param	fun	方法对象
	 */
	public static pop(fun:Function):void
	{
		if (!EnterFrame.isInit) return;
		var index:number = EnterFrame.funList.indexOf(fun);
		if (index == -1) return;
		EnterFrame.thisObjList.splice(index, 1);
		EnterFrame.funList.splice(index, 1);
	}

	/**
	 * 暂停
	 */
	public static pause():void
	{
		if (!EnterFrame.isInit) return;
		if (EnterFrame.timer.running)
			EnterFrame.timer.stop();
	}

	/**
	 * 播放
	 */
	public static unPause():void
	{
		if (!EnterFrame.isInit) return;
		if (!EnterFrame.timer.running)
			EnterFrame.timer.start();
	}

	/**
	 * 查找存放的方法的索引	如果不存在则返回-1。
	 * @param	fun		查找的方法
	 * @return	索引
	 */
	public static indexOf(fun:Function):number
	{
		return EnterFrame.funList.indexOf(fun);
	}

	/**
	 * 销毁enterFrame
	 */
	public static destroy():void
	{
		if (EnterFrame.funList)
		{
			var length:number = EnterFrame.funList.length;
			for (var i:number = length - 1; i >= 0; i -= 1)
			{
				EnterFrame.funList.splice(i, 1);
			}
			EnterFrame.funList = null;
		}

		if(EnterFrame.thisObjList)
		{
			var length:number = EnterFrame.thisObjList.length;
			for (var i:number = length - 1; i >= 0; i -= 1)
			{
				EnterFrame.thisObjList.splice(i, 1);
			}
			EnterFrame.thisObjList = null;
		}

		if (EnterFrame.timer)
		{
			EnterFrame.timer.removeEventListener(egret.TimerEvent.TIMER, EnterFrame.timerHandler, this);
			EnterFrame.timer.stop();
			EnterFrame.timer = null;
		}
		EnterFrame.isInit = false;
	}

}
}
