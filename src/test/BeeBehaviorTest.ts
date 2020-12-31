/**
 * Created by tangben on 2015/7/10.
 */
import BeeBehavior = effect.BeeBehavior;
import Bee = effect.Bee;
class BeeBehaviorTest extends egret.Sprite
{
    private beeBehavior:BeeBehavior;
    private texture:egret.Texture;
    public constructor()
    {
        super();
        this.beeBehavior = new BeeBehavior(2, 1);
        this.texture = RES.getRes("bee_png");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        for (let i:number = 0; i < 200; i++)
        {
            let beeBitmap:egret.Bitmap = new egret.Bitmap(this.texture);
            beeBitmap.anchorOffsetX = beeBitmap.width / 2;
            beeBitmap.anchorOffsetY = beeBitmap.height / 2;
            beeBitmap.x = Math.random() * this.stage.stageWidth;
            beeBitmap.y = Math.random() * this.stage.stageHeight;
            let bee:Bee = new Bee(beeBitmap);
            this.addChild(bee);
            this.beeBehavior.addBee(bee);
        }
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
    }

    private enterFrameHandler(event:egret.Event):void
    {
        this.beeBehavior.update();
    }

    private mouseDownHandler(event:egret.TouchEvent):void
    {
        let beeBitmap:egret.Bitmap = new egret.Bitmap(this.texture);
        beeBitmap.anchorOffsetX = beeBitmap.width / 2;
        beeBitmap.anchorOffsetY = beeBitmap.height / 2;
        beeBitmap.x = Math.random() * this.stage.stageWidth;
        beeBitmap.y = Math.random() * this.stage.stageHeight;
        let bee:Bee = new Bee(beeBitmap);
        this.addChild(bee);
        this.beeBehavior.addBee(bee);
    }
}