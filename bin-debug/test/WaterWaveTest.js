var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by tangben on 2015/7/9.
 */
var WaterWave = effect.WaterWave;
var WaterWaveTest = (function (_super) {
    __extends(WaterWaveTest, _super);
    function WaterWaveTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    WaterWaveTest.prototype.onAddToStage = function (event) {
        var _this = this;
        this.bg = new egret.Bitmap(RES.getRes("water_jpg"));
        this.bg.y = this.stage.stageHeight - this.bg.height;
        this.addChild(this.bg);
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        this.bg.mask = this.shape;
        this.ww = new WaterWave(this.shape, this.stage.stageWidth, this.stage.stageHeight, 500);
        egret.Ticker.getInstance().register(function (dt) {
            if (_this.ww)
                _this.ww.update(dt);
        }, this);
    };
    return WaterWaveTest;
}(egret.Sprite));
__reflect(WaterWaveTest.prototype, "WaterWaveTest");
//# sourceMappingURL=WaterWaveTest.js.map