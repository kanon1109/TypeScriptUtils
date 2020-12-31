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
 * Created by kanon on 2015/7/11.
 */
var FlameGun = effect.FlameGun;
var FlameGunTest = (function (_super) {
    __extends(FlameGunTest, _super);
    function FlameGunTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    FlameGunTest.prototype.onAddToStage = function (event) {
        this.pMc = new egret.Shape();
        this.pMc.graphics.beginFill(0xff00ff, 1);
        this.pMc.graphics.drawCircle(0, 0, 30);
        this.pMc.graphics.endFill();
        this.pMc.x = 100;
        this.pMc.y = 200;
        this.addChild(this.pMc);
        this.pMc.touchEnabled = true;
        this.fge = new FlameGun(this, 0, 0, 15, -90, 2, .5, 500, 10, .2, .05, 0);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    FlameGunTest.prototype.touchHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
        if (!this.isTouched)
            return;
        this.pMc.x = event.stageX;
        this.pMc.y = event.stageY;
    };
    FlameGunTest.prototype.touchEndHandler = function (event) {
        this.isTouched = false;
        this.fge.status = FlameGun.STOP;
    };
    FlameGunTest.prototype.touchBeginHandler = function (event) {
        if (event.target instanceof egret.Shape) {
            this.isTouched = true;
            var mc = event.target;
            mc.x = event.stageX;
            mc.y = event.stageY;
        }
        else {
            this.fge.status = FlameGun.FIRE;
            this.mouseX = event.stageX;
            this.mouseY = event.stageY;
        }
    };
    FlameGunTest.prototype.loop = function (event) {
        var rad = Math.atan2(this.mouseY - this.fge.startY, this.mouseX - this.fge.startX);
        this.fge.rotation = rad / Math.PI * 180;
        this.fge.move(this.pMc.x, this.pMc.y);
        this.fge.update();
    };
    return FlameGunTest;
}(egret.Sprite));
__reflect(FlameGunTest.prototype, "FlameGunTest");
//# sourceMappingURL=FlameGunTest.js.map