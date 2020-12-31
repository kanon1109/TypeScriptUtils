/**
 * Created by tangben on 2015/7/10.
 */
import Rope = effect.Rope;
class RopeTest extends egret.Sprite
{
    private rope:Rope;
    private sp:egret.Point;
    private ep:egret.Point;
    private curMc:egret.Bitmap;
    private mc1:egret.Bitmap;
    private mc2:egret.Bitmap;
    private isTouched:boolean;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        let texture:egret.Texture = RES.getRes("mc_png");
        this.mc1 = new egret.Bitmap(texture);
        this.mc2 = new egret.Bitmap(texture);
        this.addChild(this.mc1);
        this.addChild(this.mc2);
        this.mc1.anchorOffsetX = .5 * this.mc1.width;
        this.mc1.anchorOffsetY = .5 * this.mc1.height;
        this.mc2.anchorOffsetX = .5 * this.mc2.width;
        this.mc2.anchorOffsetY = .5 * this.mc2.height;
        this.mc1.touchEnabled = true;
        this.mc2.touchEnabled = true;
        this.mc1.x = 100;
        this.mc1.y = 100;

        this.mc2.x = 300;
        this.mc2.y = 300;

        this.sp = new egret.Point(this.mc1.x, this.mc1.y);
        this.ep = new egret.Point(this.mc2.x, this.mc2.y);
        this.rope = new Rope(this.sp, this.ep);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        
        this.rope.update();
        this.rope.render(this.graphics, 3, 0x00F0FF);
    }

    private touchHandler(event:egret.TouchEvent):void
    {
        if(!this.isTouched) return;
        this.curMc.x = event.stageX;
        this.curMc.y = event.stageY;
    }

    private touchBeginHandler(event:egret.TouchEvent):void
    {
        if(event.target instanceof egret.Bitmap)
        {
            this.isTouched = true;
            let mc:egret.Bitmap = event.target;
            mc.x = event.stageX;
            mc.y = event.stageY;
            this.curMc = mc;
            this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
    }

    private touchEndHandler(event:egret.TouchEvent):void
    {
        this.isTouched = false;
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    private enterFrameHandler(event:egret.Event):void
    {
        this.sp.x = this.mc1.x;
        this.sp.y = this.mc1.y;
        this.ep.x = this.mc2.x;
        this.ep.y = this.mc2.y;
        this.rope.update();
        this.rope.render(this.graphics, 3, 0x00F0FF);
    }
}