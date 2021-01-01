/**
 * ...摇杆
 * @author ...Kanon
 */
module comp {
export class Joystick extends egret.Sprite 
{
	//移动时的回调
	public mouseMoveHandler:Function;
	public mouseUpHandler:Function;
	public thisObj:any;
	//摇杆移动范围的最大半径
	public maxRadius:number = 100;
	//移动的强弱值
	private _rate:number = 1;
	//摇杆的角度（弧度）
	private _joystickAngleRad:number;
	//底座
	private baseImg:egret.Bitmap;
	//摇杆
	private stickImg:egret.Bitmap;
	//是否按下
	private isMouseDown:boolean;
	//起始位置
	private prevPt:egret.Point;
	//当前位置
	private curPt:egret.Point;
	//x坐标上向量
	private _dx:number;
	//y坐标上向量
	private _dy:number;
	//是否调试
	private _isDrawDebug:boolean;
	//动画
	private tween:egret.Tween;
	//固定类型
	public fixType:number = 0;
	//固定状态枚举
	public static FIXED:number = 0; //固定摇杆
	public static HALF_FIXED:number = 1;//半固定（点击任意位置作为起点）
	public static UNFIXED:number = 2;//不固定（点击任意位置作为起点，并且摇杆跟随拖动的位置移动）
	public isPause:boolean;//暂停
	public constructor()
    {
		super();
		this.initData();
		this.initEvent();
	}
	
	/**
	 * 初始化数据
	 */
	private initData():void
	{
		this._rate = 1;
		this.maxRadius = 100;
		this._joystickAngleRad = 0;
		this._isDrawDebug = false;
		this.fixType = Joystick.FIXED;
		this.prevPt = new egret.Point();
		this.curPt = new egret.Point(this.prevPt.x, this.prevPt.y);
		this.touchEnabled = true;
	}
	
	/**
	 * 初始化事件
	 */
	private initEvent():void
	{
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
	}


	private addToStage():void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this)
	}
	
	private onMouseDownHandler(event:egret.TouchEvent):void 
	{
		this.removeTween();
		if(this.isPause) return;
		this.isMouseDown = true;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this)
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this)
		this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this)
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this)

		if (this.fixType == Joystick.UNFIXED || this.fixType == Joystick.HALF_FIXED)
		{
			let pt:egret.Point = this.globalToLocal(event.stageX, event.stageY);
			this.setStickPos(pt.x, pt.y);
		}
			
		if (this.mouseMoveHandler && this.thisObj)
			this.mouseMoveHandler.call(this.thisObj);
	}
	
	private onMouseMoveHandler(event:egret.TouchEvent):void 
	{
		if(this.isPause) return;

		this.curPt = this.globalToLocal(event.stageX, event.stageY);
		
		this._dx = this.curPt.x - this.prevPt.x;
		this._dy = this.curPt.y - this.prevPt.y;
		
		this._joystickAngleRad = Math.atan2(this._dy, this._dx);
		
		let dis:number = egret.Point.distance(this.curPt, this.prevPt)
		if (this.fixType < Joystick.UNFIXED && dis > this.maxRadius) dis = this.maxRadius; 
		
		let x:number = Math.cos(this._joystickAngleRad) * dis + this.prevPt.x;
		let y:number = Math.sin(this._joystickAngleRad) * dis + this.prevPt.y;
		
		if (this.stickImg)
		{
			this.stickImg.x = x;
			this.stickImg.y = y;
		}
		
		if (this.fixType == Joystick.UNFIXED)
		{
			if (dis >= this.maxRadius)
			{
				let sx:number = Math.cos(this._joystickAngleRad) * this.maxRadius;
				let sy:number = Math.sin(this._joystickAngleRad) * this.maxRadius;
				this.prevPt.x = x - sx;
				this.prevPt.y = y - sy;
				if (this.baseImg)
				{
					this.baseImg.x = this.prevPt.x;
					this.baseImg.y = this.prevPt.y;
				}
			}
		}
		
		this._rate = dis / this.maxRadius;
		
		if (this.mouseMoveHandler && this.thisObj)
			this.mouseMoveHandler.call(this.thisObj);
	}
	
	private onMouseUpHandler():void 
	{
		this.isMouseDown = false;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this)
		this.removeTween();
		if (this.mouseUpHandler && this.thisObj)
			this.mouseUpHandler.call(this.thisObj);
		if(this.fixType == Joystick.HALF_FIXED)
		{
			if(this.stickImg)
			{
				this.stickImg.x = 0;
				this.stickImg.y = 0;
			}
			
			if(this.baseImg)
			{
				this.baseImg.x = 0;
				this.baseImg.y = 0;
			}
		}
		else
		{
			if(this.stickImg)
			{
				this.tween = egret.Tween.get(this.stickImg);
				this.tween.to({x:this.prevPt.x, y:this.prevPt.y}, 200, egret.Ease.circOut);
			}
		}
	}

	/**
	 * 删除动画
	 */
	private removeTween():void
	{
		if (this.tween)
		{
			this.tween.setPaused(true);
			egret.Tween.removeTweens(this.tween);
			this.tween = null;
		}
	}
	
	/**
	 * 初始化UI
	 * @param	stick	摇杆
	 * @param	base	底座
	 */
	public initUI(stick:string="", base:string=""):void
	{
		if (base && !this.baseImg)
		{
			if (!this.baseImg)
			{
				this.baseImg = new egret.Bitmap();
				this.baseImg.texture = RES.getRes(base);
				this.baseImg.anchorOffsetX = this.baseImg.width / 2;
				this.baseImg.anchorOffsetY = this.baseImg.height / 2;
				this.addChild(this.baseImg);
				this.baseImg.alpha = .6;
			}
			else
			{
				this.baseImg.texture = RES.getRes(base);
			}
		}
		
		if (stick)
		{
			if (!this.stickImg)
			{
				this.stickImg = new egret.Bitmap();
				this.stickImg.texture = RES.getRes(stick);
				this.stickImg.anchorOffsetX = this.stickImg.width / 2;
				this.stickImg.anchorOffsetY = this.stickImg.height / 2;
				this.stickImg.alpha = .8;
				this.addChild(this.stickImg);
			}
			else
			{
				this.stickImg.texture = RES.getRes(stick);
			}
		}
		this.setStickPos(this.prevPt.x, this.prevPt.y);
	}
	
	/**
	 * 设置摇杆的位置
	 * @param	x	x位置
	 * @param	y	y位置
	 */
	public setStickPos(x:number, y:number):void
	{
		this.prevPt.x = x;
		this.prevPt.y = y;
		this.curPt.x = this.prevPt.x;
		this.curPt.y = this.prevPt.y;
		if (this.baseImg)
		{
			this.baseImg.x = x;
			this.baseImg.y = y;
			
		}
		if (this.stickImg)
		{
			this.stickImg.x = x;
			this.stickImg.y = y;
		}
	}
	
	/**
	 * 摇杆强弱
	 */
	public get rate():number {return this._rate; }
	
	/**
	 * 摇杆的弧度
	 */
	public get joystickAngleRad():number {return this._joystickAngleRad; }
	
	/**
	 * 摇杆的角度
	 */
	public get joystickAngleDeg():number 
	{
		return this._joystickAngleRad * 180 / Math.PI;
	}
	
	/**
	 * x坐标上向量
	 */
	public get dx():number{return this._dx; }
	
	/**
	 * y坐标上向量
	 */
	public get dy():number{return this._dy; }
	
	/**
	 * 是否绘制调试
	 */
	public get isDrawDebug():boolean {return this._isDrawDebug; }
	public set isDrawDebug(value:boolean) 
	{
		this._isDrawDebug = value;
		this.graphics.clear();
		if (value) 
		{
			this.graphics.beginFill(0xff0000)
			this.graphics.drawRect(0, 0, this.width, this.height);
			this.graphics.endFill();
		}
	}

	/**
	 * 是否点击
	 */
	public isTouched():boolean
	{
		return this.isMouseDown;
	}
	
	/**
	 * 销毁
	 */
	public destroySelf():void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this)
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this)
		
		if (this.baseImg && this.baseImg.parent)
		{
			this.baseImg.texture = null;
			this.baseImg.parent.removeChild(this.baseImg);
			this.baseImg = null;
		}
		
		if (this.stickImg && this.stickImg.parent)
		{
			this.stickImg.texture = null;
			this.stickImg.parent.removeChild(this.stickImg);
			this.stickImg = null;
		}
		
		this.removeTween();
		this.mouseMoveHandler = null;
		this.thisObj = null;
		if(this.parent)
			this.parent.removeChild(this);
	}
}
}

