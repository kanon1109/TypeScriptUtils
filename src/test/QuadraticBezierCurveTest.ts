class QuadraticBezierCurveTest 
{
	private qbc:curve.QuadraticBezierCurve;
	private canves:egret.Sprite;
	private sp0:egret.Sprite;
	private sp1:egret.Sprite;
	private sp2:egret.Sprite;
	private ball:egret.Sprite;
	private curSp:egret.Sprite;
	private tw:egret.Tween;
	private stage:egret.Stage;
	private o:any;
	private prevX:number;
	private prevY:number;
    public constructor(stage:egret.Stage)
    {
		this.stage = stage;
		this.canves = new egret.Sprite();
        stage.addChild(this.canves);

		let p0:egret.Point = new egret.Point(200, 240);
		let p1:egret.Point = new egret.Point(130, 140);
		let p2:egret.Point = new egret.Point(330, 140);

		this.sp0 = new egret.Sprite();
		this.sp0.x = p0.x;
		this.sp0.y = p0.y;
		this.sp0.width = 20;
		this.sp0.height = 20;
		this.sp0.anchorOffsetX = 10;
		this.sp0.anchorOffsetX = 10;
		this.sp0.graphics.lineStyle(2, 0xFFFF00)
		this.sp0.graphics.beginFill(0xFFFF00);
		this.sp0.graphics.drawCircle(10, 10, 10);
		this.sp0.graphics.endFill();
		stage.addChild(this.sp0);
		this.sp0.touchEnabled = true;
		this.sp0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
		this.prevX = p0.x;
		this.prevY = p0.y; 

		this.sp1 = new egret.Sprite();
		this.sp1.x = p1.x;
		this.sp1.y = p1.y;
		this.sp1.width = 20;
		this.sp1.height = 20;
		this.sp1.anchorOffsetX = 10;
		this.sp1.anchorOffsetX = 10;
		this.sp1.graphics.lineStyle(2, 0x00FFFF)
		this.sp1.graphics.beginFill(0x00FFFF);
		this.sp1.graphics.drawCircle(10, 10, 10);
		this.sp1.graphics.endFill();
		stage.addChild(this.sp1);
		this.sp1.touchEnabled = true;
		this.sp1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);

		this.sp2 = new egret.Sprite();
		this.sp2.x = p2.x;
		this.sp2.y = p2.y;
		this.sp2.width = 20;
		this.sp2.height = 20;
		this.sp2.anchorOffsetX = 10;
		this.sp2.anchorOffsetX = 10;
		this.sp2.graphics.lineStyle(2, 0x00FFFF)
		this.sp2.graphics.beginFill(0x00FFFF);
		this.sp2.graphics.drawCircle(10, 10, 10);
		this.sp2.graphics.endFill();
		stage.addChild(this.sp2);
		this.sp2.touchEnabled = true;
		this.sp2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);

		this.ball = new egret.Sprite();
		this.ball.width = 40;
		this.ball.height = 20;
		this.ball.graphics.lineStyle(2, 0xCCFF00)
		this.ball.graphics.beginFill(0xCCFF00);
		this.ball.graphics.drawRect(-20, -10, 40, 10);
		this.ball.graphics.endFill();
		this.ball.anchorOffsetX = this.ball.width / 2;
		this.ball.anchorOffsetX = this.ball.height / 2;
		stage.addChild(this.ball);

		this.qbc = new curve.QuadraticBezierCurve(p0, p1, p2);
		this.qbc.draw(this.canves.graphics);
		let position:egret.Point = this.qbc.getPoint(0);
		this.ball.x = position.x;
		this.ball.y = position.y;
		
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
		
		this.o = {value : 0};
		this.tw = egret.Tween.get(this.o, {loop:true, onChange:this.updateHandler, onChangeObj:this}).to({value:1}, 1000, null).call(this.completeHandler, this)
	}

	private updateHandler():void
	{
		let position:egret.Point = this.qbc.getPoint(this.o.value);
		this.prevX = this.ball.x;
		this.prevY = this.ball.y;
		this.ball.x = position.x;
		this.ball.y = position.y;
		let angle:number = Math.atan2(this.ball.y - this.prevY, this.ball.x - this.prevX);
		this.ball.rotation = utils.MathUtil.rds2dgs(angle);
	}

	private completeHandler():void
	{
		if (this.tw)
		{
			egret.Tween.removeTweens(this.o);
			this.tw = null
		}
		let value:number = this.o.value;
		if (value == 1) 
		{
			this.o = {};
			this.o.value = 1;
			value = 0;
		}
		else
		{
			this.o = {};
			this.o.value = 0;
			value = 1;
		}
		this.tw = egret.Tween.get(this.o, {loop:true, onChange:this.updateHandler, onChangeObj:this}).to({value:value}, 1000, null).call(this.completeHandler, this)
	}

	private onMouseUpHandler(event:egret.TouchEvent):void 
	{
		this.curSp = null;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
	}

	private onMouseDownHandler(event:egret.TouchEvent):void
	{
		this.curSp = event.target as egret.Sprite;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
	}

	private onStageMouseMove(event:egret.TouchEvent):void 
	{
		this.curSp.x = event.stageX;
		this.curSp.y = event.stageY;
		
		let p0:egret.Point = new egret.Point(this.sp0.x, this.sp0.y)
		let p1:egret.Point = new egret.Point(this.sp1.x, this.sp1.y)
		let p2:egret.Point = new egret.Point(this.sp2.x, this.sp2.y)
		
		this.qbc.initPoints(p0, p1, p2);
		this.qbc.draw(this.canves.graphics);
	}
}