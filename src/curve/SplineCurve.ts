/**
 * ...样条曲线
 * @author ...Kanon
 */
module curve 
{
export class SplineCurve 
{
	private points:egret.Point[];
	public constructor() {}

	/**
	 * 添加一组坐标点
	 * @param	points	坐标点数组
	 */
	public addPoints(points:egret.Point[]):void
	{
		if (!points) return;
		this.points = [];
		let lenght:number = points.length;
		for (let i:number = 0; i < lenght; i++) 
		{
			let v2d:egret.Point = points[i];
			this.points.push(v2d.clone());
		}
	}
	
	/**
	 * 添加一个坐标点
	 * @param	x	x坐标
	 * @param	y	y坐标
	 */
	public addPoint(x:number, y:number):void
	{
		if (!this.points) this.points = [];
		this.points.push(new egret.Point(x, y));
	}
	
	/**
	 * 设置一个点的位置
	 * @param	x	x坐标
	 * @param	y	y坐标
	 * @param	index	索引
	 */
	public setPoint(x:number, y:number, index:number):void
	{
		if (!this.points) return;
		if (index < 0 || index > this.points.length - 1) return;
		let v2d:egret.Point = this.points[index];
		v2d.x = x;
		v2d.y = y;
	}
		
	/**
	 * 获取起始点
	 * @return
	 */
	public getStartPoint():egret.Point
	{
		if (!this.points) return new egret.Point();
		return this.points[0];
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
		if (!this.points) return new egret.Point();
		let points:egret.Point[] = this.points;
		let point:number = (this.points.length - 1) * t;
		let intPoint:number = Math.floor(point);
		let weight:number = point - intPoint;
		let p0:egret.Point = points[(intPoint === 0) ? intPoint : intPoint - 1];
        let p1:egret.Point = points[intPoint];
        let p2:egret.Point = points[(intPoint > points.length - 2) ? points.length - 1 : intPoint + 1];
        let p3:egret.Point = points[(intPoint > points.length - 3) ? points.length - 1 : intPoint + 2];
        return new egret.Point(this.catmullRom(weight, p0.x, p1.x, p2.x, p3.x), this.catmullRom(weight, p0.y, p1.y, p2.y, p3.y));
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
		graphics.lineStyle(2, 0xFFFFFF);
		graphics.moveTo(sp.x, sp.y);
		for (let i:number = 1; i < length; i++) 
		{
			let p:egret.Point = points[i];
			graphics.lineTo(p.x, p.y);
			sp = p;
		}
	}
	
	/**
	 * Calculates a Catmull-Rom value.
	 * @param	t	The percentage of interpolation, between 0 and 1.
	 * @param	p0	
	 * @param	p1
	 * @param	p2
	 * @param	p3
	 * @return	插值
	 */
	private catmullRom(t:number, p0:number, p1:number, p2:number, p3:number):number
	{
		let v0:number = (p2 - p0) * 0.5;
		let v1:number = (p3 - p1) * 0.5;
		let t2:number = t * t;
		let t3:number = t * t2;
		return (2 * p1 - 2 * p2 + v0 + v1) * t3 + ( -3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
	}
	
	/**
	 * 销毁
	 */
	public destroySelf():void
	{
		this.points = null;
	}
}
}