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
var BeeBehavior = effect.BeeBehavior;
var Bee = effect.Bee;
var BeeBehaviorTest = (function (_super) {
    __extends(BeeBehaviorTest, _super);
    function BeeBehaviorTest() {
        var _this = _super.call(this) || this;
        _this.beeBehavior = new BeeBehavior(2, 1);
        _this.texture = RES.getRes("bee_png");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BeeBehaviorTest.prototype.onAddToStage = function (event) {
        for (var i = 0; i < 200; i++) {
            var beeBitmap = new egret.Bitmap(this.texture);
            beeBitmap.anchorOffsetX = beeBitmap.width / 2;
            beeBitmap.anchorOffsetY = beeBitmap.height / 2;
            beeBitmap.x = Math.random() * this.stage.stageWidth;
            beeBitmap.y = Math.random() * this.stage.stageHeight;
            var bee = new Bee(beeBitmap);
            this.addChild(bee);
            this.beeBehavior.addBee(bee);
        }
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
    };
    BeeBehaviorTest.prototype.enterFrameHandler = function (event) {
        this.beeBehavior.update();
    };
    BeeBehaviorTest.prototype.mouseDownHandler = function (event) {
        var beeBitmap = new egret.Bitmap(this.texture);
        beeBitmap.anchorOffsetX = beeBitmap.width / 2;
        beeBitmap.anchorOffsetY = beeBitmap.height / 2;
        beeBitmap.x = Math.random() * this.stage.stageWidth;
        beeBitmap.y = Math.random() * this.stage.stageHeight;
        var bee = new Bee(beeBitmap);
        this.addChild(bee);
        this.beeBehavior.addBee(bee);
    };
    return BeeBehaviorTest;
}(egret.Sprite));
__reflect(BeeBehaviorTest.prototype, "BeeBehaviorTest");
//# sourceMappingURL=BeeBehaviorTest.js.map