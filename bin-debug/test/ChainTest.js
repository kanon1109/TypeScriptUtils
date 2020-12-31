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
var Chain = effect.Chain;
var ChainTest = (function (_super) {
    __extends(ChainTest, _super);
    function ChainTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ChainTest.prototype.onAddToStage = function (event) {
        this.chain = new Chain(this);
        this.chain.move(0, 0);
        this.chain.lineColor = 0xFFFFFF;
        this.chain.lineSize = 10;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    ChainTest.prototype.touchBeginHandler = function (event) {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
        this.chain.move(this.mouseX, this.mouseY);
    };
    ChainTest.prototype.touchHandler = function (event) {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
    };
    ChainTest.prototype.enterFrameHandler = function (event) {
        this.chain.update(this.mouseX, this.mouseY);
    };
    return ChainTest;
}(egret.Sprite));
__reflect(ChainTest.prototype, "ChainTest");
//# sourceMappingURL=ChainTest.js.map