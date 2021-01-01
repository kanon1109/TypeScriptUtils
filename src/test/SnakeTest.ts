class SnakeTest extends egret.Sprite
{
	private snake:effect.Snake;
	private js:comp.Joystick;
	public constructor() 
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage():void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.snake = new effect.Snake(this, RES.getRes("head_png"), RES.getRes("body_png"), this.stage.stageWidth / 2, this.stage.stageHeight / 2);
		this.js = new comp.Joystick();
		this.js.thisObj = this;
		this.js.fixType = comp.Joystick.HALF_FIXED;
		this.addChild(this.js);
		this.js.mouseMoveHandler = ()=>{
			let vx:number = Math.cos(this.js.joystickAngleRad);
			let vy:number = Math.sin(this.js.joystickAngleRad);
			this.snake.snakeMoving(new egret.Point(vx, vy), this.js.joystickAngleDeg)
		}
		this.js.mouseUpHandler = ()=>{
			this.snake.snakeMoving(new egret.Point(0, 0), this.js.joystickAngleDeg)
		}

		egret.Ticker.getInstance().register((dt)=>{
			this.snake.update(dt);
		}, this)
	}
}