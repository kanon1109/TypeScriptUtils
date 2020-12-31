/**
 * Created by kanon on 2015/7/11.
 */
import FlameGun = effect.FlameGun;
class FlameGunTest extends egret.Sprite
{
    private fge:FlameGun;
    private pMc:egret.Shape;
    private isTouched:boolean;
    private mouseX:number;
    private mouseY:number;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.pMc = new egret.Shape();
        this.pMc.graphics.beginFill(0xff00ff, 1);
        this.pMc.graphics.drawCircle(0, 0, 30);
        this.pMc.graphics.endFill();
        this.pMc.x = 100;
        this.pMc.y = 200;
        this.addChild(this.pMc);
        this.pMc.touchEnabled = true;

        this.fge = new FlameGun(this, 0, 0, 15, -90, 2, .5, 500, 10, .2, .05, 0);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }

    private touchHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
        if(!this.isTouched) return;
        this.pMc.x = event.stageX;
        this.pMc.y = event.stageY;
    }

    private touchEndHandler(event:egret.TouchEvent):void
    {
        this.isTouched = false;
        this.fge.status = FlameGun.STOP;
    }

    private touchBeginHandler(event:egret.TouchEvent):void
    {
        if(event.target instanceof egret.Shape)
        {
            this.isTouched = true;
            let mc:egret.Shape = event.target;
            mc.x = event.stageX;
            mc.y = event.stageY;
        }
        else
        {
            this.fge.status = FlameGun.FIRE;
            this.mouseX = event.stageX;
            this.mouseY = event.stageY;
        }
    }

    private loop(event:egret.Event):void
    {
        let rad:number = Math.atan2(this.mouseY - this.fge.startY, this.mouseX - this.fge.startX);
        this.fge.rotation = rad / Math.PI * 180;
        this.fge.move(this.pMc.x, this.pMc.y);
        this.fge.update();
    }
}