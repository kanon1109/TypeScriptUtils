module effect
{
/**
 * 链子效果
 * @author Kanon
 */
export class Chain
{
	//存放线条的字典
	private lineAry:Line[];
	//对象池
	private pool:any[];
	//外部容器
	private parent:egret.DisplayObjectContainer;
	//还未加速度前的位置
	private prevPos:egret.Point;
	//加了速度的位置
	private curPos:egret.Point;
	//线条颜色和粗细
	protected _lineColor:number = 0xFFFFFF;
	protected _lineSize:number = 8;
	public constructor(parent:egret.DisplayObjectContainer)
	{
		this.parent = parent;
		this.lineAry = [];
		this.pool = [];
		this.prevPos = new egret.Point();
		this.curPos = new egret.Point();
	}


	/**
	 * 移动初始点
	 * @param	x	起始点x坐标
	 * @param	y	起始点y坐标
	 */
	public move(x:number, y:number):void
	{
		this.prevPos.x = x;
		this.prevPos.y = y;
	}

	/**
	 * 渲染效果
	 * @param	targetX  链式效果的目标x位置
	 * @param	targetY  链式效果的目标y位置
	 */
	public update(targetX:number, targetY:number):void
	{
		this.curPos.x = targetX;
		this.curPos.y = targetY;
		if (egret.Point.distance(this.prevPos, this.curPos) > 1)
		{
			let line:Line;
			//如果对象池是空的则新建一个line
			if (this.pool.length == 0)
			{
				line = new Line(this.prevPos.x, this.prevPos.y,
        					  this.curPos.x, this.curPos.y,
        					  this.lineColor, this.lineSize);
			}
			else
			{
				//对象池获取
				line = this.pool.shift();
				line.init(this.prevPos.x, this.prevPos.y,
    					  this.curPos.x, this.curPos.y,
    					  this.lineColor, this.lineSize);
			}
			if (this.lineAry.indexOf(line) == -1)
				this.lineAry.push(line);
			this.parent.addChild(line);
			this.prevPos.x = targetX;
			this.prevPos.y = targetY;
		}
		this.updateLine();
	}

	/**
	 * 更新线条状态
	 */
	private updateLine():void
	{
		if (!this.lineAry) return;
		let count:number = this.lineAry.length;
		for(let i:number = count - 1; i >= 0; --i)
		{
			let line:Line = this.lineAry[i];
			line.draw();
			line.thickness--;
			if (line.thickness <= 0)
			{
				line.remove();
				this.lineAry.splice(i, 1);
				this.pool.push(line);
			}
		}
	}

	/**
	 * 清除
	 */
	public clear():void
	{
		let line:Line;
		let length:number = this.pool.length;
		for (let i:number = length - 1; i >= 0; i -= 1)
		{
			line = this.pool[i];
			line.remove();
			this.pool.splice(i, 1);
		}

		let count:number = this.lineAry.length;
		for(let i:number = count - 1; i >= 0; --i)
		{
			let line:Line = this.lineAry[i];
			line.remove();
			this.lineAry.splice(i, 1);
		}
	}

	/**
	 * 销毁
	 */
	public destroy():void
	{
		this.clear();
		this.prevPos = null;
		this.curPos = null;
		this.parent = null;
		this.pool = null;
		this.lineAry = null;
	}

	/**
	 * 设置线条颜色
	 */
	public get lineColor():number{ return this._lineColor; }
	public set lineColor(value:number)
	{
		this._lineColor = value;
	}

	/**
	 * 线条粗细
	 */
	public get lineSize():number{ return this._lineSize; }
	public set lineSize(value:number)
	{
		this._lineSize = value;
	}
}
}

class Line extends egret.Shape
{
	//线条的位置
	private sx:number;
	private sy:number;
	private ex:number;
	private ey:number;
	//线条的粗细
	private _thickness:number;
	//线条颜色
	private color:number;
	public constructor(sx:number, sy:number, ex:number, ey:number, color:number, thickness:number = 5)
	{
        super();
		this.init(sx, sy, ex, ey, color, thickness);
	}

	/**
	 * 初始化
	 * @param	sx
	 * @param	sy
	 * @param	ex
	 * @param	ey
	 * @param	color
	 * @param	thickness
	 */
	public init(sx:number, sy:number, ex:number, ey:number, color:number, thickness:number = 5)
	{
		this.sx = sx;
		this.sy = sy;
		this.ex = ex;
		this.ey = ey;
		this.color = color;
		this.thickness = thickness;
	}

	/**
	 * 绘制
	 */
	public draw():void
	{
		this.graphics.clear();
		this.graphics.lineStyle(this.thickness, this.color);
		this.graphics.moveTo(this.sx, this.sy);
		this.graphics.lineTo(this.ex, this.ey);
	}

	/**
	 * 销毁
	 */
	public remove():void
	{
		this.graphics.clear();
		if (this.parent)
			this.parent.removeChild(this)
	}

	/**
	 * 线条粗细
	 */
	public get thickness():number{ return this._thickness; }
	public set thickness(value:number)
	{
		this._thickness = value;
	}

}
