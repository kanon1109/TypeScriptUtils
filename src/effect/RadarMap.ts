/**
 * 雷达图
 */
module utils 
{
export class RadarMap
{
	//动画间隔(毫秒)
	private _duration:number;
	//是否显示过渡动画
	public isShowAnim:boolean = true;
	//数值最大值
	public maxValue:number;
	//数据填充颜色
	public fillColor:number = 0xFF0000;
	//数据线段颜色
	public lineColor:number = 0xFF0000;
	//图形线段颜色
	public graphLineColor:number = 0xFFFFFF;
	//数据点的半径
	public dataPointRadius:number = 3;
	//画布
	private fillCanvas:egret.Sprite;
	private lineCanvas:egret.Sprite;
	//是否显示绘制的线条
	private _showDraw:boolean;
	//角数
	private _count:number;
	//数据线半径
	private _radius:number;
	//数据列表
	private pointList:egret.Point[];
	private pointDataList:egret.Point[];
	//最少角数不小于3个
	private static MIN_COUNT:number = 3;
	public constructor(fillCanvas:egret.Sprite, lineCanvas:egret.Sprite) 
	{
		this._count = 6;
		this._radius = 100;
		this.maxValue = 100;
		this._duration = 400;
		this.fillCanvas = fillCanvas;
		this.lineCanvas = lineCanvas;
		this.initGraphDataPoint();
	}

	/**
	 * 初始化数据点
	 */
	private initGraphDataPoint():void
	{
		this.pointList = [];
		this.pointDataList = [];
		let angle:number = 360 / this._count;
		let curAngle:number = 90;
		let sp:egret.Point = new egret.Point();
		this.pointList.push(sp);
		for (let i:number = 0; i < this._count; i++) 
		{
			let p:egret.Point = new egret.Point();
			let rds:number = MathUtil.dgs2rds(curAngle);
			p.x = Math.cos(rds) * this._radius;
			p.y = Math.sin(rds) * this._radius;
			curAngle -= angle;
			this.pointList.push(p);
			this.pointDataList.push(new egret.Point());
		}
	}

	/**
	 * 绘制外形线条
	 * @param	lineColor	线段颜色
	 * @param	lineWidth	线段宽度
	 */
	public drawGraphLine(lineColor:number = 0xFFFFFF, lineWidth:number = 1):void
	{
		if (!this._showDraw) return;
		if(!this.lineCanvas) return;
		this.lineCanvas.graphics.clear();
		let length:number = this.pointList.length
		let sp:egret.Point = this.pointList[0];
		let np:egret.Point;
		this.lineCanvas.graphics.lineStyle(lineWidth, lineColor);
		for (let i:number = 1; i < length; i++) 
		{
			let p:egret.Point = this.pointList[i];
			if (i < length - 1) np = this.pointList[i + 1];
			else np = this.pointList[1];
			this.lineCanvas.graphics.moveTo(sp.x, sp.y);
			this.lineCanvas.graphics.lineTo(p.x, p.y);
			this.lineCanvas.graphics.moveTo(p.x, p.y);
			this.lineCanvas.graphics.lineTo(np.x, np.y);
		}
	}

	/**
	 * 绘制图形
	 * @param	dataList	数量列表 [0 到 maxValue, 0 到 maxValue ]
	 */
	public drawGraph(dataList:number[]):void
	{	
		if (!dataList || dataList.length == 0) return;
		let length:number = this.pointDataList.length;
		let angle:number = 360 / this.count;
		let curAngle:number = -90;
		for (let i:number = 0; i < length; i++) 
		{
			let value:number = 0;
			if (i < dataList.length) value = dataList[i];
			if (value < 0) value = 0;
			else if (value > this.maxValue) value = this.maxValue;
			let rds:number = MathUtil.dgs2rds(curAngle);
			let r:number = this._radius * (value / this.maxValue);
			let x:number = Math.cos(rds) * r;
			let y:number = Math.sin(rds) * r;
			let point:egret.Point = this.pointDataList[i];
			curAngle += angle;
			if (this.isShowAnim) 
			{
				// egret.Ticker.getInstance().register(this.loopHandler, this);
				if (i == length - 1)
					egret.Tween.get(point, {onChange:this.loopHandler, onChangeObj:this}).to({x:x, y:y}, this._duration, egret.Ease.sineOut).call(this.completeHandler, this);
				else
					egret.Tween.get(point).to({x:x, y:y}, this._duration, egret.Ease.sineOut);
			}
			else
			{
				point.x = x;
				point.y = y;
			}
		}
		if (!this.isShowAnim)
			this.loopHandler();
	}
	
	private completeHandler():void
	{
		// egret.Ticker.getInstance().unregister(this.loopHandler, this);
		this.loopHandler();
	}

	private loopHandler():void 
	{
		this.fillCanvas.graphics.clear();
		this.fillCanvas.graphics.lineStyle(1, this.lineColor);
		let length:number = this.pointDataList.length;
		this.fillCanvas.graphics.beginFill(this.fillColor)
		for (let i:number = 0; i < length; i++) 
		{
			let point:egret.Point = this.pointDataList[i];
			if(i == 0) this.fillCanvas.graphics.moveTo(point.x, point.y)
			else this.fillCanvas.graphics.lineTo(point.x, point.y)		
		}
		this.fillCanvas.graphics.lineTo(this.pointDataList[0].x, this.pointDataList[0].y);
		this.fillCanvas.graphics.endFill();	
	}

	/**
	 * 是否绘制图形
	 */
	public get showDraw():boolean {return this._showDraw;}
	public set showDraw(value:boolean)
	{
		this._showDraw = value;
		this.drawGraphLine(this.graphLineColor);
	}
	
	/**
	 * 角数
	 */
	public get count():number {return this._count;}
	public set count(value:number)
	{
		this._count = value;
		if (this._count < RadarMap.MIN_COUNT) this._count = RadarMap.MIN_COUNT;
		this.initGraphDataPoint();
		this.drawGraphLine(this.graphLineColor);
	}
	
	/**
	 * 半径
	 */
	public get radius():number {return this._radius;}
	public set radius(value:number)
	{
		this._radius = value;
		this.initGraphDataPoint();
		this.drawGraphLine(this.graphLineColor);
	}
	
	/**
	 * 过渡动画的时间间隔
	 */
	public get duration():number {return this._duration;}
	public set duration(value:number)
	{
		if (value < 0) value = 0;
		if (value == 0) this.isShowAnim = false;
		else this.isShowAnim = true;
		this._duration = value;
	}
	
	/**
	 * 销毁
	 */
	public destroySelf():void
	{
		// egret.Ticker.getInstance().unregister(this.loopHandler, this);
		let length:number = this.pointDataList.length;
		for (let i:number = 0; i < length; i++) 
		{
			let point:egret.Point = this.pointDataList[i];
			egret.Tween.removeTweens(point);
		}
		this.pointList = null;
		this.pointDataList = null;
		if (this.fillCanvas)
		{
			this.fillCanvas.graphics.clear();
			if(this.fillCanvas.parent)
				this.fillCanvas.parent.removeChild(this.fillCanvas);
			this.fillCanvas = null;
		}
		if (this.lineCanvas)
		{
			this.lineCanvas.graphics.clear();
			if(this.lineCanvas.parent)
				this.lineCanvas.parent.removeChild(this.lineCanvas);
			this.lineCanvas = null;
		}
	}
}
}