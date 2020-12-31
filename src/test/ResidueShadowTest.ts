/**
 * Created by tangben on 2015/7/24.
 */
import ResidueShadow = effect.ResidueShadowEffect;
class ResidueShadowTest extends egret.Sprite
{
    private residueShadow:ResidueShadow;
    private isDown:boolean;
    private mc:egret.Bitmap;
    private mc2:egret.Bitmap;
    private batMc:egret.MovieClip;
    public constructor()
    {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        let texture:egret.Texture = RES.getRes("mc_png");
        this.mc = new egret.Bitmap(texture);
        this.addChild(this.mc);

        this.mc2 = new egret.Bitmap(texture);
        this.addChild(this.mc2);

        texture = RES.getRes("m1_png");
        let json = RES.getRes("m1_json");
        let mcdf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json, texture);
        this.batMc = new egret.MovieClip(mcdf.generateMovieClipData());
        this.addChild(this.batMc);
        this.batMc.rotation = 40;
        this.batMc.anchorOffsetX = .5 * this.batMc.width;
        this.batMc.anchorOffsetY = .5 * this.batMc.width;

        this.batMc.play(-1);

        this.residueShadow = new ResidueShadow(this);
        this.residueShadow.addGoods(this.mc);
        //this.residueShadowEffect.addGoods(this.mc2);
        this.residueShadow.addGoods(this.batMc);

        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }

    private loop(event:egret.Event):void
    {
        this.mc.x += 2;
        this.mc.y += 2;
        this.residueShadow.renderer();
    }

    private onAddToStage(event:egret.Event):void
    {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    }

    private mouseUpHandler(event:egret.TouchEvent):void
    {
        this.isDown = false;
    }

    private mouseMoveHandler(event:egret.TouchEvent):void
    {
        if (this.isDown)
        {
            this.batMc.x = event.stageX;
            this.batMc.y = event.stageY;
        }
    }

    private mouseDownHandler(event:egret.TouchEvent):void
    {
        this.isDown = true;
        //this.residueShadowEffect.removeGoods(this.batMc);
    }
}