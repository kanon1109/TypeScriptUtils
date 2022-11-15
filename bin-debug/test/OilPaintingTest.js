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
var OilPainting = effect.OilPainting;
var OilPaintingTest = (function (_super) {
    __extends(OilPaintingTest, _super);
    function OilPaintingTest() {
        var _this = _super.call(this) || this;
        _this.oilPainting = new OilPainting(_this.graphics, 0);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    OilPaintingTest.prototype.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    };
    OilPaintingTest.prototype.mouseUpHandler = function (event) {
        this.isDown = false;
    };
    OilPaintingTest.prototype.mouseMoveHandler = function (event) {
        if (this.isDown)
            this.oilPainting.paintMove(event.stageX, event.stageY);
    };
    OilPaintingTest.prototype.mouseDownHandler = function (event) {
        this.isDown = true;
        this.oilPainting.color = Math.random() * 0xFFFFFF;
        this.oilPainting.clear();
    };
    return OilPaintingTest;
}(egret.Sprite));
__reflect(OilPaintingTest.prototype, "OilPaintingTest");
//# sourceMappingURL=OilPaintingTest.js.map