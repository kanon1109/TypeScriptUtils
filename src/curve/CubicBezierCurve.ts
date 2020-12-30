/**
 * ... 三次贝塞尔测试
 * @author ...Kanon
 */
module curve 
{
export class CubicBezierCurve 
{
	//起始点
	private p0:egret.Point;
	//控制点1
	private p1:egret.Point;
	//控制点2
	private p2:egret.Point;
	//结束点
	private p3:egret.Point;
	public constructor(p0:egret.Point, p1:egret.Point, p2:egret.Point, p3:egret.Point)
	{
		this.initPoints(p0, p1, p2, p3);
	}
	
	/**
	 * 初始化点
	 * @param	p0	起始点
	 * @param	p1	控制点1
	 * @param	p2	控制点2
	 * @param	p3	结束点
	 */
	public initPoints(p0:egret.Point, p1:egret.Point, p2:egret.Point, p3:egret.Point):void
	{
		this.p0 = p0;
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
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
		return new egret.Point(this.cubicBezier(t, this.p0.x, this.p1.x, this.p2.x, this.p3.x), 
						   	   this.cubicBezier(t, this.p0.y, this.p1.y, this.p2.y, this.p3.y));
	}
	
	/**
	 * 使用getPoint获取点序列
	 * @param	divisions		分割数量
	 * @return	坐标列表
	 */
	public getPoints(divisions:number = 5):egret.Point[]
	{
		let points:egret.Point[] = [];
		for (let i:number = 0; i <= divisions; i++) 
		{
			points.push(this.getPoint(i / divisions));
		}
		return points;
	}
	
	/**
	 * 绘制
	 * @param	graphics		画布
	 * @param	pointsTotal		点的数量	
	 */
	public draw(graphics:egret.Graphics, pointsTotal:number = 32):void
	{
		if (!graphics) return;
		graphics.clear();
		let points:egret.Point[] = this.getPoints(pointsTotal);
		let length:number = points.length;
		let sp:egret.Point = points[0]
		graphics.lineStyle(2, 0xff0000);
		graphics.moveTo(sp.x, sp.y);
		for (let i:number = 1; i < length; i++) 
		{
			let p:egret.Point = points[i];
			graphics.lineTo(p.x, p.y);
			sp = p;
		}
	}
	
	private P0(t:number, p:number):number
	{
		let k:number = 1 - t;
		return k * k * k * p;
	}
	
	private P1(t:number, p:number):number
	{
		let k:number = 1 - t;
		return 3 * k * k * t * p;
	}
	
	private P2(t:number, p:number):number
	{
		return 3 * (1 - t) * t * t * p;
	}
	
	private P3(t:number, p:number):number
	{
		return t * t * t * p;
	}
	
	/**
	 * 一种三次贝塞尔插值方法。
	 * @param	t	The percentage of interpolation, between 0 and 1.
	 * @param	p0	起始点
	 * @param	p1	第一个控制点
	 * @param	p2	第二个控制点
	 * @param	p3	结束点
	 * @return	插值
	 */
	public cubicBezier(t:number, p0:number, p1:number, p2:number, p3:number):number
	{
		return this.P0(t, p0) + this.P1(t, p1) + this.P2(t, p2) + this.P3(t, p3);
	}
	
	/**
	 * 销毁
	 */
	public destroySelf():void
	{
		this.p0 = null;
		this.p1 = null;
		this.p2 = null;
		this.p3 = null;
	}
}
}