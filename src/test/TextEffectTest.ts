/**
 * Created by kanon on 2015/7/11.
 */
import TextEffect = effect.TextEffect;
class TextEffectTest extends egret.Sprite
{
    private textEffect:TextEffect;
    private text:egret.TextField;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.text = new egret.TextField();
        this.text.multiline = true;
        this.text.x = 10;
        this.text.y = 200;
        this.text.width = 450;
        this.text.height = 500;
        this.addChild(this.text);

        this.textEffect = new TextEffect();
        this.textEffect.progressShow(this.text, "asdasdasdqe12sdqwasd啊吴涤清我的阿斯达阿斯顿请问阿斯达", 10);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClickHandler, this);
    }

    private stageClickHandler(event:egret.TouchEvent):void
    {
        this.textEffect.destroy();
    }
}