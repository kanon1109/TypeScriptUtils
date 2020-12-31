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
var Rope = effect.Rope;
var RopeTest = (function (_super) {
    __extends(RopeTest, _super);
    function RopeTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    RopeTest.prototype.onAddToStage = function (event) {
        var texture = RES.getRes("mc_png");
        this.mc1 = new egret.Bitmap(texture);
        this.mc2 = new egret.Bitmap(texture);
        this.addChild(this.mc1);
        this.addChild(this.mc2);
        this.mc1.anchorOffsetX = .5 * this.mc1.width;
        this.mc1.anchorOffsetY = .5 * this.mc1.height;
        this.mc2.anchorOffsetX = .5 * this.mc2.width;
        this.mc2.anchorOffsetY = .5 * this.mc2.height;
        this.mc1.touchEnabled = true;
        this.mc2.touchEnabled = true;
        this.mc1.x = 100;
        this.mc1.y = 100;
        this.mc2.x = 300;
        this.mc2.y = 300;
        this.sp = new egret.Point(this.mc1.x, this.mc1.y);
        this.ep = new egret.Point(this.mc2.x, this.mc2.y);
        this.rope = new Rope(this.sp, this.ep);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.rope.update();
        this.rope.render(this.graphics, 3, 0x00F0FF);
    };
    RopeTest.prototype.touchHandler = function (event) {
        if (!this.isTouched)
            return;
        this.curMc.x = event.stageX;
        this.curMc.y = event.stageY;
    };
    RopeTest.prototype.touchBeginHandler = function (event) {
        if (event.target instanceof egret.Bitmap) {
            this.isTouched = true;
            var mc = event.target;
            mc.x = event.stageX;
            mc.y = event.stageY;
            this.curMc = mc;
            this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
    };
    RopeTest.prototype.touchEndHandler = function (event) {
        this.isTouched = false;
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    RopeTest.prototype.enterFrameHandler = function (event) {
        this.sp.x = this.mc1.x;
        this.sp.y = this.mc1.y;
        this.ep.x = this.mc2.x;
        this.ep.y = this.mc2.y;
        this.rope.update();
        this.rope.render(this.graphics, 3, 0x00F0FF);
    };
    return RopeTest;
}(egret.Sprite));
__reflect(RopeTest.prototype, "RopeTest");
//# sourceMappingURL=RopeTest.js.map