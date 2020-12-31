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
 * Created by tangben on 2015/7/24.
 */
var ResidueShadow = effect.ResidueShadowEffect;
var ResidueShadowTest = (function (_super) {
    __extends(ResidueShadowTest, _super);
    function ResidueShadowTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        var texture = RES.getRes("mc_png");
        _this.mc = new egret.Bitmap(texture);
        _this.addChild(_this.mc);
        _this.mc2 = new egret.Bitmap(texture);
        _this.addChild(_this.mc2);
        texture = RES.getRes("m1_png");
        var json = RES.getRes("m1_json");
        var mcdf = new egret.MovieClipDataFactory(json, texture);
        _this.batMc = new egret.MovieClip(mcdf.generateMovieClipData());
        _this.addChild(_this.batMc);
        _this.batMc.rotation = 40;
        _this.batMc.anchorOffsetX = .5 * _this.batMc.width;
        _this.batMc.anchorOffsetY = .5 * _this.batMc.width;
        _this.batMc.play(-1);
        _this.residueShadow = new ResidueShadow(_this);
        _this.residueShadow.addGoods(_this.mc);
        //this.residueShadowEffect.addGoods(this.mc2);
        _this.residueShadow.addGoods(_this.batMc);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    ResidueShadowTest.prototype.loop = function (event) {
        this.mc.x += 2;
        this.mc.y += 2;
        this.residueShadow.renderer();
    };
    ResidueShadowTest.prototype.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    };
    ResidueShadowTest.prototype.mouseUpHandler = function (event) {
        this.isDown = false;
    };
    ResidueShadowTest.prototype.mouseMoveHandler = function (event) {
        if (this.isDown) {
            this.batMc.x = event.stageX;
            this.batMc.y = event.stageY;
        }
    };
    ResidueShadowTest.prototype.mouseDownHandler = function (event) {
        this.isDown = true;
        //this.residueShadowEffect.removeGoods(this.batMc);
    };
    return ResidueShadowTest;
}(egret.Sprite));
__reflect(ResidueShadowTest.prototype, "ResidueShadowTest");
//# sourceMappingURL=ResidueShadowTest.js.map