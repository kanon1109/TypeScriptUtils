/**
 * Created by tangben on 2015/7/9.
 */
module geom
{
/**
 * 2D 向量，
 * 取自 Keith Peters 的 《AdvanceED ActionScript Animation》一书第二章的Vector2D类，略有修改
 */
export class Vector2D
{
    private _x:number;
    private _y:number;

    public constructor(x:number = 0, y:number = 0)
    {
        this._x = x;
        this._y = y;
    }

    public get x():number
    {
        return this._x;
    }

    public set x(value:number)
    {
        this._x = value;
    }

    public get y():number
    {
        return this._y;
    }

    public set y(value:number)
    {
        this._y = value;
    }

    /**
     * 向量长度，如果改变向量长度，x y 值也会随着改变，但是不会影响角度。
     */
    public get length():number
    {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    public set length(value:number)
    {
        var a:number = this.getAngle(false);
        this._x = Math.cos(a) * value;
        this._y = Math.sin(a) * value;
    }

    /**
     * 得到与当前向量成90度夹角的向量，即法向量。
     *
     * @return 当前向量的法向量。
     */
    public get perp():Vector2D
    {
        return new Vector2D(-this._y, this._x);
    }

    /**
     * 返回此向量的副本。
     */
    public clone():Vector2D
    {
        return new Vector2D(this._x, this._y);
    }

    /**
     * 获取当前向量与另一个向量之间的距离
     *
     * @param v 另一个向量对象
     * @reutrn 当前向量与v2之间的距离
     */
    public dist(v:Vector2D):number
    {
        var dx:number = v.x - this._x;
        var dy:number = v.y - this._y;
        return Math.sqrt(dx * dx +  dy * dy);
    }

    /**
     *  获取当前向量与另一个向量之间的夹角
     * @param    v 另一个向量对象
     * @param    degrees 指定是否返回角度值，默认为true
     * @reutrn  如果degrees为true，则返回向量夹角的角度值，否则返回向量夹角的弧度值。
     */
    public angleBetween(v:Vector2D, degrees:boolean = true):number
    {
        var dx:number = this._x - v.x;
        var dy:number = this._y - v.y;
        var radians:number =  Math.atan2(dy, dx);
        if (degrees)
            return utils.MathUtil.rds2dgs(radians);
        return radians;
    }

    /**
     * 检测当前向量与另一个向量的值是否相等。
     *
     * @param v 另一个向量对象
     * @return 若当前向量的 x与v.x相等并且y与v.y相等则返回true，否则返回false。
     */
    public equals(v:Vector2D):boolean
    {
        return this._x == v.x && this._y == v.y;
    }

    //
    //  角度/弧度
    //

    /**
     * 获取向量的角度或弧度
     *
     * @param degrees 指定是否返回角度值，默认为true
     *
     * @return 如果degrees为true，则返回向量的角度值，否则返回向量的弧度值
     */
    public getAngle(degrees:boolean = true):number
    {
        var radians:number = Math.atan2(this._y, this._x);
        if (degrees)
            return utils.MathUtil.rds2dgs(radians);
        return radians;
    }

    /**
     * 设置向量的角度或弧度
     *
     * @param degressOrRadians 弧度或角度值
     * @param degrees 指示 degressOrRadians 参数是否为角度，若为true， degressOrRadians
     *                则被认视为角度值，否则被视为弧度值，默认为true。
     */
    public setAngle(degressOrRadians:number, degress:boolean = true):void
    {
        if (degress)
            degressOrRadians = utils.MathUtil.dgs2rds(degressOrRadians);

        var len:number = this.length;
        this._x = Math.cos(degressOrRadians) * len;
        this._y = Math.sin(degressOrRadians) * len;
    }

    /**
     * 向量加法，将另一个向量对象与当前向量相加。
     *
     * @param v 另一个向量对象
     */
    public add(v:Vector2D):void
    {
        this._x += v.x;
        this._y += v.y;
    }

    /**
     * 点积，返回当前向量对象与另一向量的点积。
     *
     * @param v 另一向量对象
     *
     * @return 当前向量与向量v的点积值
     */
    public dot(v:Vector2D):number
    {
        return this._x * v.x + this._y * v.y;
    }

    /**
     * 向量旋转
     * @param	angle 角度
     */
    public rotate(angle:number):void
    {
        var cos:number = Math.cos(utils.MathUtil.dgs2rds(angle));
        var sin:number = Math.sin(utils.MathUtil.dgs2rds(angle));

        var rx:number = this.x * cos - this.y * sin;
        var ry:number = this.x * sin + this.y * cos;
        this.x = rx;
        this.y = ry;
    }

    /**
     * 根据公式 两向量的点积为0则两个向量垂直
     * @param	v 向量
     * @return  是否垂直
     */
    public isPerpTo(v:Vector2D):boolean
    {
        return (this.dot(v) == 0);
    }

    /**
     * 求2个向量的中点坐标公式
     * @param	v  向量
     * @return  中心坐标
     */
    public centerPoint(v:Vector2D):Vector2D
    {
        var x:number = (v.x + this._x) / 2;
        var y:number = (v.y + this._y) / 2;
        return new Vector2D(x, y);
    }

    /**
	 * 截取当前向量
	 * @param	max
	 * @return
	 */
	public truncate(max: number): Vector2D 
	{
		this.length = Math.min(max, this.length);
		return this;
	}

    /**
	 * 反转向量
	 * @return
	 */
    public reverse(): Vector2D 
    {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    }

    /**
     * 叉乘 
     * @param	v2
     * @return  如果在左边返回-1. 如果在右边返回+1.叉乘=0同一条线上
     */
    public crossProd(v2: Vector2D): number 
    {
        return this._x * v2.y - this._y * v2.x;
    }
	
	/**
	 * 点积法获取这个向量的方向
	 * @return int 如果在左边返回-1. 如果在右边返回+1.
	 */
	public sign(v2:Vector2D):number
	{
		return this.perp.dot(v2) < 0 ? -1 : 1;
	}

    /**
     * 描述向量实例的字符窜
     */
    public tostring():string
    {
        return "[Vector2D (x:" + this._x + ", " + "y:" + this._y + ")]";
    }
}
}