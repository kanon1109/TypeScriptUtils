
module curve 
{
export class EllipseCurve 
{
	private p0:egret.Point;
	private _xRadius:number;
	private _yRadius:number;
	private _startAngle:number;
	private _endAngle:number;
	private _clockwise:Boolean;
	private _rotation:number;
	public constructor(x:number=0, y:number=0, 
						xRadius:number=0, yRadius:number=0, 
						startAngle:number=0, endAngle:number=360, 
						clockwise:Boolean=false, rotation:number=0) 
	{
		this.init(x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation);
	}
	
	/**
	 * 初始化
	 * @param	x			起始x坐标
	 * @param	y			起始y坐标
	 * @param	xRadius		横向半径
	 * @param	yRadius		纵向半径
	 * @param	startAngle	起点角度（0-360）
	 * @param	endAngle	终点角度（0-360）
	 * @param	clockwise	顺时针
	 * @param	rotation	角度
	 */
	public init(x:number=0, y:number=0, 
				xRadius:number=0, yRadius:number=0, 
				startAngle:number=0, endAngle:number=360, 
				clockwise:Boolean=false, rotation:number=0):void
	{
		this.p0 = new egret.Point(x, y);
		this._xRadius = xRadius;
		this._yRadius = yRadius;
		this._startAngle = utils.MathUtil.dgs2rds(startAngle);
		this._endAngle = utils.MathUtil.dgs2rds(endAngle);
		this._clockwise = clockwise;
		this._rotation = utils.MathUtil.dgs2rds(rotation);
	}
	
	/**
	 * 获取起始点
	 * @return
	 */
	public getStartPoint():egret.Point
    {
        return this.getPoint(0);
    }
	
	/**
	 * 获取曲线上某一点的位置
	 * @param	t 沿曲线的位置其中0是开始，1是结束。
	 * @return	位置坐标
	 */
	public getPoint(t:number):egret.Point
	{
		let twoPi:number = Math.PI * 2;
        let deltaAngle:number = this._endAngle - this._startAngle;
        let samePoints:Boolean = Math.abs(deltaAngle) < .001

        // ensures that deltaAngle is 0 .. 2 PI
        while (deltaAngle < 0)
        {
            deltaAngle += twoPi;
        }

        while (deltaAngle > twoPi)
        {
            deltaAngle -= twoPi;
        }

        if (deltaAngle < .001)
        {
            if (samePoints)
                deltaAngle = 0;
            else
                deltaAngle = twoPi;
        }

        if (this._clockwise && !samePoints)
        {
            if (deltaAngle === twoPi)
                deltaAngle = - twoPi;
            else
                deltaAngle = deltaAngle - twoPi;
        }

        let angle:number = this._startAngle + t * deltaAngle;
        let x:number = this.p0.x + this._xRadius * Math.cos(angle);
        let y:number = this.p0.y + this._yRadius * Math.sin(angle);

        if (this._rotation !== 0)
        {
            let cos:number = Math.cos(this._rotation);
            let sin:number = Math.sin(this._rotation);

            let tx:number = x - this.p0.x;
            let ty:number = y - this.p0.y;

            // Rotate the point about the center of the ellipse.
            x = tx * cos - ty * sin + this.p0.x;
            y = tx * sin + ty * cos + this.p0.y;
        }
        return new egret.Point(x, y);
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
		let sp:egret.Point = points[0];
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
	 * 横向半径
	 */
	public get xRadius():number {return this._xRadius;}
	public set xRadius(value:number) 
	{
		this._xRadius = value;
	}
	
	/**
	 * 纵向半径
	 */
	public get yRadius():number {return this._yRadius;}
	public set yRadius(value:number) 
	{
		this._yRadius = value;
	}
	
	/**
	 * 椭圆宽度
	 */
	public set width(value:number) 
	{
		this._xRadius = value * 2;
	}	

	/**
	 * 椭圆高度
	 */
	public set height(value:number) 
	{
		this._yRadius = value * 2;
	}
	
	/**
	 * 起点角度
	 */
	public get startAngle():number {return utils.MathUtil.rds2dgs(this._startAngle);}
	public set startAngle(value:number) 
	{
		this._startAngle = utils.MathUtil.dgs2rds(value);
	}
	
	/**
	 * 终点角度
	 */
	public get endAngle():number {return utils.MathUtil.rds2dgs(this._endAngle);}
	public set endAngle(value:number) 
	{
		this._endAngle = utils.MathUtil.dgs2rds(value);
	}
	
	/**
	 * 是否顺时针
	 */
	public get clockwise():Boolean {return this._clockwise;}
	public set clockwise(value:Boolean) 
	{
		this._clockwise = value;
	}
	
	/**
	 * 椭圆角度
	 */
	public get rotation():number {return utils.MathUtil.rds2dgs(this._rotation);}
	public set rotation(value:number) 
	{
		this.rotation = utils.MathUtil.dgs2rds(value);
	}
	
	/**
	 * x坐标
	 */
	public get x():number {return this.p0.x; }
	public set x(value:number) 
	{
		this.p0.x = value;
	}
	
	/**
	 * y坐标
	 */
	public get y():number {return this.p0.y; }
	public set y(value:number) 
	{
		this.p0.y = value;
	}
	
	/**
	 * 销毁
	 */
	public destroySelf():void
	{
		this.p0 = null;
	}
}
}