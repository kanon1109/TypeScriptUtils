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
var WingmanMotion = effect.WingmanMotion;
var WingmanMotionTest = (function (_super) {
    __extends(WingmanMotionTest, _super);
    function WingmanMotionTest() {
        var _this = _super.call(this) || this;
        _this.mouseX = 0;
        _this.mouseY = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    WingmanMotionTest.prototype.onAddToStage = function (event) {
        this.mc = new egret.Bitmap(RES.getRes("guaiwu208_png"));
        this.mc.anchorOffsetX = .5 * this.mc.width / 2;
        this.mc.anchorOffsetY = .5 * this.mc.height / 2;
        this.mc.x = 200;
        this.mc.y = 200;
        this.addChild(this.mc);
        this.wme = new WingmanMotion(this.mc);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.residueShadow = new ResidueShadow(this, 500);
        this.residueShadow.addGoods(this.mc);
    };
    WingmanMotionTest.prototype.loop = function (event) {
        this.mc.rotation += RotationEasing.rotate(this.mc.rotation, this.mc.x, this.mc.y, this.mouseX, this.mouseY);
        this.wme.follow(this.mouseX, this.mouseY);
        this.residueShadow.renderer();
    };
    WingmanMotionTest.prototype.touchHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    };
    WingmanMotionTest.prototype.touchBeginHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    };
    return WingmanMotionTest;
}(egret.Sprite));
__reflect(WingmanMotionTest.prototype, "WingmanMotionTest");
//# sourceMappingURL=WingmanMotionTest.js.map