/**
 * Created by tangben on 2015/7/9.
 */
import Chain = effect.Chain;
class ChainTest extends egret.Sprite
{
    private chain:Chain;
    private angle:number;
    private targetPoint:egret.Point;
    private r:number;
    private mouseX:number;
    private mouseY:number;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.chain = new Chain(this);
        this.chain.move(0, 0);
        this.chain.lineColor = 0xFFFFFF;
        this.chain.lineSize = 10;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }


    private touchBeginHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
        this.chain.move(this.mouseX, this.mouseY);
    }

    private touchHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
    }

    private enterFrameHandler(event:egret.Event):void
    {
        this.chain.update(this.mouseX, this.mouseY);
    }
}