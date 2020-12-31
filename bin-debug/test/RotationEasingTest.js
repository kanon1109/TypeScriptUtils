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
 *
 * @author Kanon
 *
 */
var RotationEasing = effect.RotationEasing;
var RotationEasingTest = (function (_super) {
    __extends(RotationEasingTest, _super);
    function RotationEasingTest() {
        var _this = _super.call(this) || this;
        _this.mouseX = 0;
        _this.mouseY = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    RotationEasingTest.prototype.onAddToStage = function (event) {
        this.mc = new egret.Shape();
        this.mc.graphics.beginFill(0xff00ff, 1);
        this.mc.graphics.drawRect(0, 0, 230, 50);
        this.mc.graphics.endFill();
        this.mc.anchorOffsetX = .5 * 230;
        this.mc.anchorOffsetY = .5 * 50;
        this.mc.x = 200;
        this.mc.y = 200;
        this.addChild(this.mc);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    RotationEasingTest.prototype.loop = function (event) {
        this.mc.rotation += RotationEasing.rotate(this.mc.rotation, this.mc.x, this.mc.y, this.mouseX, this.mouseY);
    };
    RotationEasingTest.prototype.touchHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    };
    return RotationEasingTest;
}(egret.Sprite));
__reflect(RotationEasingTest.prototype, "RotationEasingTest");
//# sourceMappingURL=RotationEasingTest.js.map