/**
 * Created by tangben on 2015/7/10.
 */
import OilPainting = effect.OilPainting;
class OilPaintingTest extends egret.Sprite
{
    private oilPainting:OilPainting;
    private isDown:boolean;
    public constructor()
    {
        super();
        this.oilPainting = new OilPainting(this.graphics, 0);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);        
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
            this.oilPainting.paintMove(event.stageX, event.stageY);
    }

    private mouseDownHandler(event:egret.TouchEvent):void
    {
        this.isDown = true;
        this.oilPainting.color = Math.random() * 0xFFFFFF;
        this.oilPainting.clear();
    }
}