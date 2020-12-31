/**
 * Created by tangben on 2015/7/9.
 */
import WaterWave = effect.WaterWave;
class WaterWaveTest extends egret.Sprite
{
    private ww:WaterWave;
    private shape:egret.Shape;
    private bg:egret.Bitmap;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
        this.bg = new egret.Bitmap(RES.getRes("water_jpg"));
        this.bg.y = this.stage.stageHeight - this.bg.height;
        this.addChild(this.bg);
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        this.bg.mask = this.shape;
        this.ww = new WaterWave(this.shape, this.stage.stageWidth, this.stage.stageHeight, 500);
        egret.Ticker.getInstance().register((dt) =>
		{
			if(this.ww) this.ww.update(dt);
		}, this);
    }
}