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
 * Created by tangben on 2015/7/10.
 */
var BloodSplatter = effect.BloodSplatter;
var BloodSplatterTest = (function (_super) {
    __extends(BloodSplatterTest, _super);
    function BloodSplatterTest() {
        var _this = _super.call(this) || this;
        _this.bloodSplatter = new BloodSplatter(_this, "blood_png");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BloodSplatterTest.prototype.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
    };
    BloodSplatterTest.prototype.mouseDownHandler = function (event) {
        //this.bloodSplatter.clear();
        this.bloodSplatter.doSplatter(event.stageX, event.stageY);
    };
    return BloodSplatterTest;
}(egret.Sprite));
__reflect(BloodSplatterTest.prototype, "BloodSplatterTest");
//# sourceMappingURL=BloodSplatterTest.js.map