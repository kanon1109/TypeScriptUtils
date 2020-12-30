/**
 * ...线段曲线
 * @author ...Kanon
 */
module curve 
{
export class LineCurve 
{
	//起始点
	private p0:egret.Point;
	//结束点
	private p1:egret.Point;
	public constructor(p0:egret.Point, p1:egret.Point) 
	{
		this.initPoints(p0, p1);
	}

	/**
	 * 初始化点	
	 * @param	p0	起始点
	 * @param	p1	结束点
	 */
	public initPoints(p0:egret.Point, p1:egret.Point):void
	{
		this.p0 = p0;
		this.p1 = p1;
	}
	
	/**
	 * 获取起始点
	 * @return
	 */
	public getStartPoint():egret.Point
	{
		return this.p0;
	}
	
	/**
	 * 获取曲线上某一点的位置
	 * @param	t 沿曲线的位置其中0是开始，1是结束。
	 * @return	位置坐标
	 */
	public getPoint(t:number):egret.Point
	{
		if (t < 0) t = 0;
		else if (t > 1) t = 1;
		if (t == 0) return this.p0;
		else if (t == 1) return this.p1;
		let x:number = this.p1.x - this.p0.x;
		let y:number = this.p1.y - this.p0.y;
		let out:egret.Point = new egret.Point(x * t, y * t);
		return new egret.Point(this.p0.x + out.x, this.p0.y + out.y);
	}
	
	/**
	 * 获取范围
	 * @return	范围矩形
	 */
	public getBounds():egret.Rectangle
	{
		return new egret.Rectangle(this.p0.x, this.p0.y, 
									this.p1.x - this.p0.x, 
									this.p1.y - this.p0.y);
	}
	
	/**
	 * 绘制
	 * @param	graphics		画布
	 */
	public draw(graphics:egret.Graphics):void
	{
		if (!graphics) return;
		graphics.clear();
		graphics.lineStyle(2, 0xFFFFFF);
		graphics.moveTo(this.p0.x, this.p0.y);
		graphics.lineTo(this.p1.x, this.p1.y);
	}
	
	/**
	 * 销毁
	 */
	public destroySelf():void
	{
		this.p0 = null;
		this.p1 = null;
	}
}
}