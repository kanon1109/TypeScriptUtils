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
var BlackHole = effect.BlackHole;
var BlackHoleEvent = effect.BlackHoleEvent;
var BlackHoleTest = (function (_super) {
    __extends(BlackHoleTest, _super);
    function BlackHoleTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BlackHoleTest.prototype.onAddToStage = function (event) {
        this.ary = [];
        this.holeList = [];
        this.holeSpt = new egret.Sprite();
        this.addChild(this.holeSpt);
        this.mcSpt = new egret.Sprite();
        this.addChild(this.mcSpt);
        this.btn = new egret.Shape();
        this.btn.graphics.beginFill(0xff00ff, 1);
        this.btn.graphics.drawRect(0, 0, 200, 100);
        this.btn.graphics.endFill();
        this.addChild(this.btn);
        this.btn.touchEnabled = true;
        this.texture = RES.getRes("blackHole_png");
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseClickHandler, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnClickHandler, this);
        this.addObj();
    };
    BlackHoleTest.prototype.btnClickHandler = function (event) {
        event.stopPropagation();
        this.addObj();
    };
    BlackHoleTest.prototype.loop = function (event) {
        var length = this.holeList.length;
        for (var i = length - 1; i >= 0; i--) {
            var blackHole = this.holeList[i];
            blackHole.update();
        }
    };
    BlackHoleTest.prototype.mouseClickHandler = function (event) {
        var blackHole = new BlackHole();
        blackHole.addEventListener(BlackHoleEvent.IN_HOLE, this.inHoleHandler, this);
        blackHole.addEventListener(BlackHoleEvent.OVER, this.blackHoleOverHandler, this);
        blackHole.addEventListener(BlackHoleEvent.ATTENUATION, this.attenuationHandler, this);
        blackHole.addSubstanceList(this.ary);
        blackHole.addHole(event.stageX, event.stageY);
        this.holeList.push(blackHole);
        var bhMc = new egret.Bitmap(this.texture);
        bhMc.anchorOffsetX = .5 * bhMc.width;
        bhMc.anchorOffsetY = .5 * bhMc.height;
        bhMc.x = event.stageX;
        bhMc.y = event.stageY;
        bhMc.scaleX = 0;
        bhMc.scaleY = 0;
        this.holeSpt.addChild(bhMc);
        blackHole.useData = bhMc;
        egret.Tween.get(bhMc).to({ scaleX: 1, scaleY: 1 }, 700);
        egret.Tween.get(bhMc).to({ rotation: 1440, repeat: -1 }, 3000);
    };
    BlackHoleTest.prototype.attenuationHandler = function (event) {
        //这里可以将黑洞的显示效果慢慢缩小。
        var blackHole = event.currentTarget;
        var bhMc = blackHole.useData;
        egret.Tween.get(bhMc).to({ scaleX: 0, scaleY: 0 }, 1000);
    };
    BlackHoleTest.prototype.blackHoleOverHandler = function (event) {
        //黑洞完全消失，可以将黑洞显示对象删除
        var blackHole = event.currentTarget;
        blackHole.destroy();
        var length = this.holeList.length;
        for (var i = length - 1; i >= 0; i--) {
            var bh = this.holeList[i];
            if (bh == blackHole) {
                this.holeList.splice(i, 1);
                var bhMc = bh.useData;
                bh.useData = null;
                if (bhMc && bhMc.parent)
                    bhMc.parent.removeChild(bhMc);
                break;
            }
        }
    };
    BlackHoleTest.prototype.inHoleHandler = function (event) {
        var dObj = event.dObj;
        var length = this.ary.length;
        for (var i = 0; i < length; i++) {
            var sp = this.ary[i];
            if (dObj == sp) {
                this.ary.splice(i, 1);
                break;
            }
        }
        if (dObj.parent)
            dObj.parent.removeChild(dObj);
    };
    BlackHoleTest.prototype.addObj = function () {
        var num = this.randnum(10, 20);
        var texture = RES.getRes("bee_png");
        for (var i = 1; i <= num; i++) {
            var index = this.randnum(1, 4);
            var sp = new egret.Bitmap(texture);
            sp.x = this.randnum(0, this.stage.stageWidth);
            sp.y = this.randnum(0, this.stage.stageHeight);
            this.ary.push(sp);
            this.mcSpt.addChild(sp);
        }
    };
    BlackHoleTest.prototype.randnum = function (a, b) {
        return Math.random() * (b - a) + a;
    };
    return BlackHoleTest;
}(egret.Sprite));
__reflect(BlackHoleTest.prototype, "BlackHoleTest");
//# sourceMappingURL=BlackHoleTest.js.map