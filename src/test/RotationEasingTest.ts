/**
 *
 * @author Kanon
 *
 */
import RotationEasing = effect.RotationEasing;
class RotationEasingTest extends egret.Sprite
{
    private mouseX:number = 0;
    private mouseY:number = 0;
    private mc:egret.Shape;
	public constructor() 
	{
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.mc = new egret.Shape();
        this.mc.graphics.beginFill(0xff00ff, 1);
        this.mc.graphics.drawRect(0, 0, 230, 50);
        this.mc.graphics.endFill();
        this.mc.anchorOffsetX = .5 * 230;
        this.mc.anchorOffsetY = .5 * 50;
        this.mc.x = 200;
        this.mc.y = 200;
        this.addChild(this.mc);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }

    private loop(event:egret.Event):void
    {
        this.mc.rotation += RotationEasing.rotate(this.mc.rotation, this.mc.x, this.mc.y,
                                                  this.mouseX, this.mouseY);
    }

    private touchHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    }
}
