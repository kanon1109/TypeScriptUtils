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
var TextEffect = effect.TextEffect;
var TextEffectTest = (function (_super) {
    __extends(TextEffectTest, _super);
    function TextEffectTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TextEffectTest.prototype.onAddToStage = function (event) {
        this.text = new egret.TextField();
        this.text.multiline = true;
        this.text.x = 10;
        this.text.y = 200;
        this.text.width = 450;
        this.text.height = 500;
        this.addChild(this.text);
        this.textEffect = new TextEffect();
        this.textEffect.progressShow(this.text, "asdasdasdqe12sdqwasd啊吴涤清我的阿斯达阿斯顿请问阿斯达", 10);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClickHandler, this);
    };
    TextEffectTest.prototype.stageClickHandler = function (event) {
        this.textEffect.destroy();
    };
    return TextEffectTest;
}(egret.Sprite));
__reflect(TextEffectTest.prototype, "TextEffectTest");
//# sourceMappingURL=TextEffectTest.js.map