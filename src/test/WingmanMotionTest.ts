/**
 * Created by kanon on 2015/7/11.
 */
import WingmanMotion = effect.WingmanMotion;
class WingmanMotionTest extends egret.Sprite
{
    private mouseX:number = 0;
    private mouseY:number = 0;
    private mc:egret.Bitmap;
    private wme:WingmanMotion;
    private residueShadow:ResidueShadow;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.mc = new egret.Bitmap(RES.getRes("guaiwu208_png"))
        this.mc.anchorOffsetX = .5 * this.mc.width / 2;
        this.mc.anchorOffsetY = .5 * this.mc.height / 2;
        this.mc.x = 200;
        this.mc.y = 200;
        this.addChild(this.mc);
        this.wme = new WingmanMotion(this.mc);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);

        this.residueShadow = new ResidueShadow(this, 500);
        this.residueShadow.addGoods(this.mc);
    }

    private loop(event:egret.Event):void
    {
        this.mc.rotation += RotationEasing.rotate(this.mc.rotation, this.mc.x, this.mc.y,
                                                  this.mouseX, this.mouseY);
        this.wme.follow(this.mouseX, this.mouseY);
        this.residueShadow.renderer();
    }

    private touchHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    }
    
    private touchBeginHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    }
}