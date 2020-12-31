module effect
{
/**
 * ...老虎机 苹果机
 * 总结：
 * 无论起始索引是几，如何判断一个循环滚动是否结束。
 *
 * if (this.timer.currentCount >= this.loop * this.maxIndex)
 * 这个判断滚动次数是否大于快速滚动次数，才做慢速滚动判断，
 *
 * 否则如果碰到目标和起始索引相同的情况会出现一次也不滚的情况。
 *
 * 通过改变timer.sdelay来实现慢速缓缓结束。
 * 外部通过一个 funList 来实现 显示和数据的分离。
 *
 * @author Kanon
 */
export class Slots
{
	//最大索引
	private maxIndex:number;
	//非慢速模式的滚动次数
	private loop:number;
	//计时器
	private timer:egret.Timer;
	//当前索引
	private _curIndex:number;
	//慢速滚动的开始索引
	private slowIndex:number;
	//目标索引
	private targetIndex:number;
	//是否是逆序
	private reverse:boolean;
	//运行间隔 毫秒
	private delay:number;
	//需要外部执行的方法列表
	private funList:Function[];
	//存放this指向的列表
	private thisList:any[];
	//是否进入了慢速滚动模式
	private slowing:boolean;
	//在到达从目标索引前，提前gapIndex个索引触发慢速滚动。
	private gapIndex:number;
	//触发的间隔时间变长的增量
	private _delayAdd:number = 300;
	//随机选择的索引
	private _randomIndex:number;
	/**
	 * 老虎机效果
	 * @param	curIndex	初始化的位置索引。
	 * @param	maxIndex	总的索引数量。
	 * @param	loop		快速模式的滚动次数。
	 * 						在快速滚动次数达到后会有一次慢速滚动。一般滚动次数是loop + 1;
	 * @param	delay		运行间隔 毫秒
	 * @param	gapIndex	在到达从目标索引前，提前gapIndex个索引触发慢速滚动。
	 */
	public constructor(curIndex:number, maxIndex:number,
					   loop:number = 1, delay:number = 50,
					   gapIndex:number = 5)
	{
		curIndex = Math.floor(curIndex);
		if (curIndex < 1) curIndex = 1;
		if (maxIndex < 1) maxIndex = 1;
		if (curIndex > maxIndex) curIndex = maxIndex;
		if (loop < 1) loop = 1;
		if (delay <= 0) delay = 10;
		//初始化赋值
		this._curIndex = curIndex;
		this._randomIndex = curIndex;
		this.maxIndex = maxIndex;
		this.gapIndex = Math.abs(gapIndex);
		this.delay = delay;
		this.loop = loop;
		this.funList = [];
		this.thisList = [];
        this.addTimer(delay);
	}

	/**
	 * 添加计时器
	 * @param	delay	运行间隔
	 */
	private addTimer(delay:number):void
	{
		if (!this.timer)
		{
			this.timer = new egret.Timer(delay);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
		}
	}

	/**
	 * 计时器暂停
	 */
	private stop():void
	{
		if(!this.timer) return;
		if (this.timer.running)
		{
			this.timer.stop();
			this.timer.reset();
		}
	}

	/**
	 * 计时器开始
	 */
	private start():void
	{
		if(!this.timer) return;
		this.stop();
		this.timer.start();
	}

	/**
	 * 显示获得
	 * @param	targetIndex	获得索引
	 * @param	reverse		是否逆运行
	 */
	public show(targetIndex:number, reverse:boolean=false):void
	{
		if(!this.funList) return;
		if (!this.timer) return;
		targetIndex = Math.floor(targetIndex);
		if (targetIndex < 1) targetIndex = 1;
		else if (targetIndex > this.maxIndex) targetIndex = this.maxIndex;
		this.slowing = false;
		this.timer.delay = this.delay;
		this.targetIndex = targetIndex;
		//设置间隔后的索引
		if (!reverse)
			this.slowIndex = this.fixNumber(this.targetIndex - this.gapIndex, 1, this.maxIndex);
		else
			this.slowIndex = this.fixNumber(this.targetIndex + this.gapIndex, 1, this.maxIndex);
		this.reverse = reverse;
		this.start();
	}

	private timerHandler(event:egret.TimerEvent):void
	{
		if(!this.funList) return;
		//索引轮回
		if (!this.reverse)
		{
			this._curIndex++;
			if (this._curIndex > this.maxIndex)
				this._curIndex = 1;
		}
		else
		{
			this._curIndex--;
			if (this._curIndex < 1)
				this._curIndex = this.maxIndex;
		}
	
		this._randomIndex = Math.floor(Math.random() * this.maxIndex + 1);
	
		//一个循环结束
		if (this.timer.currentCount >= this.loop * this.maxIndex)
		{
			//是否进入了慢速模式
			if (this._curIndex == this.slowIndex)
			{
				this.slowing = true;
				this.timer.delay += this._delayAdd;
			}
		}
	
		if (this.slowing && this._curIndex == this.targetIndex)
		{
			this._randomIndex = this.targetIndex;
			this.stop();
		}
	
		let length:number = this.funList.length;
		for (let i:number = 0; i < length; i += 1)
		{
			let thisObj:any = this.thisList[i];
			this.funList[i].call(thisObj);
		}
	}

	/**
	 * 修正数字 在一个范围内
	 * @param	num     需要修正的数字
	 * @param	min     最小的范围
	 * @param	range   最大范围
	 * @return  修正后的数字
	 */
	private fixNumber(num:number, min:number, range:number):number
	{
		num %= range;
		if (num < min) return num + range;
		return num;
	}

	/**
	 * 将方法放入列表中
	 * @param	fun		方法引用
	 */
	public push(fun:Function, thisObj:any):void
	{
		if(!this.funList) return;
		if (this.funList.indexOf(fun) == -1)
		{
			this.funList.push(fun);
			this.thisList.push(thisObj);
		}
	}

	/**
	 * 将列表中的方法删除
	 * @param	fun		方法引用
	 */
	public splice(fun:Function):void
	{
		if(!this.funList) return;
		let index:number = this.funList.indexOf(fun);
		if (index != -1)
		{
			this.funList.splice(index, 1);
			this.thisList.splice(index, 1);
		}
	}

	/**
	 * 销毁
	 */
	public destroy():void
	{
		if (this.timer)
		{
			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
			this.timer.stop();
			this.timer = null;
		}

		if (this.funList)
		{
			let length:number = this.funList.length;
			for (let i:number = length - 1; i >= 0; i -= 1)
			{
				this.funList.splice(i, 1);
			}
			this.funList = null;
		}

		if (this.thisList)
		{
			let length:number = this.thisList.length;
			for (let i:number = length - 1; i >= 0; i -= 1) {
				this.thisList.splice(i, 1);
			}
			this.thisList = null;
		}
	}

	/**
	 * 当前索引
	 */
	public get curIndex():number{ return this._curIndex; }

	/**
	 * timer延迟的增量 用于慢速滚动模式中的速度
	 */
	public get delayAdd():number{ return this._delayAdd; }
	public set delayAdd(value:number)
	{
		this._delayAdd = value;
	}

	/**
	 * 随机索引
	 */
	public get randomIndex():number{ return this._randomIndex; }
}
}
