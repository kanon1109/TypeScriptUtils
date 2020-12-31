/**
 * Created by tangben on 2015/7/10.
 */
import BloodSplatter = effect.BloodSplatter;
class BloodSplatterTest extends egret.Sprite
{
    private bloodSplatter:BloodSplatter;
    public constructor()
    {
        super();
        this.bloodSplatter = new BloodSplatter(this, "blood_png");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
    }

    private mouseDownHandler(event:egret.TouchEvent):void
    {
        //this.bloodSplatter.clear();
        this.bloodSplatter.doSplatter(event.stageX, event.stageY);
    }
}