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
 * @author
 *
 */
var Slots = effect.Slots;
var SlotsTest = (function (_super) {
    __extends(SlotsTest, _super);
    function SlotsTest() {
        var _this = _super.call(this) || this;
        _this.slots = new Slots(1, 15, 2, 50);
        _this.slots.push(_this.selectMc, _this);
        var btn1 = new egret.Shape();
        btn1.graphics.beginFill(0xff00ff, 1);
        btn1.graphics.drawRect(0, 0, 50, 50);
        btn1.graphics.endFill();
        btn1.anchorOffsetX = 25;
        btn1.anchorOffsetY = 25;
        btn1.x = 200;
        btn1.y = 200;
        btn1.touchEnabled = true;
        _this.addChild(btn1);
        var btn2 = new egret.Shape();
        btn2.graphics.beginFill(0xff00ff, 1);
        btn2.graphics.drawRect(0, 0, 50, 50);
        btn2.graphics.endFill();
        btn2.anchorOffsetX = 25;
        btn2.anchorOffsetY = 25;
        btn2.x = 300;
        btn2.y = 200;
        btn2.touchEnabled = true;
        _this.addChild(btn2);
        var btn3 = new egret.Shape();
        btn3.graphics.beginFill(0xff00ff, 1);
        btn3.graphics.drawRect(0, 0, 50, 50);
        btn3.graphics.endFill();
        btn3.anchorOffsetX = 25;
        btn3.anchorOffsetY = 25;
        btn3.x = 400;
        btn3.y = 200;
        btn3.touchEnabled = true;
        _this.addChild(btn3);
        btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.btn1ClickHandler, _this);
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.btn2ClickHandler, _this);
        btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.btn3ClickHandler, _this);
        var startX = 100;
        var startY = 300;
        var gapH = 10;
        var gapV = 10;
        var r = 1;
        var c = 1;
        for (var i = 0; i < 15; i++) {
            var mc = new egret.Shape();
            mc.graphics.beginFill(0x00ffff, 1);
            mc.graphics.drawRect(0, 0, 50, 50);
            mc.graphics.endFill();
            mc.anchorOffsetX = 25;
            mc.anchorOffsetY = 25;
            mc.x = startX + (r - 1) * (50 + gapH);
            mc.y = startY + (c - 1) * (50 + gapV);
            mc.name = "mc" + (i + 1);
            _this.addChild(mc);
            r++;
            if (r > 5) {
                r = 1;
                c++;
            }
        }
        _this.stopAllMc();
        _this.selectMc();
        return _this;
    }
    SlotsTest.prototype.btn2ClickHandler = function (event) {
        this.slots.splice(this.randomSelect);
        this.slots.push(this.selectMc, this);
        this.slots.show(Math.floor(Math.random() * 15 + 1));
    };
    SlotsTest.prototype.btn1ClickHandler = function (event) {
        this.slots.splice(this.selectMc);
        this.slots.push(this.randomSelect, this);
        this.slots.show(Math.floor(Math.random() * 15 + 1));
    };
    SlotsTest.prototype.btn3ClickHandler = function (event) {
        this.slots.destroy();
    };
    /**
    * 选中某个mc
    * @param	mc
    */
    SlotsTest.prototype.selectMc = function () {
        this.stopAllMc();
        console.log("this.slotsEffect.curIndex " + this.slots.curIndex);
        var mc = this.getChildByName("mc" + this.slots.curIndex);
        mc.graphics.clear();
        mc.graphics.beginFill(0xffff00, 1);
        mc.graphics.drawRect(0, 0, 50, 50);
        mc.graphics.endFill();
    };
    SlotsTest.prototype.randomSelect = function () {
        this.stopAllMc();
        console.log("randomSelect this.slotsEffect.randomIndex " + this.slots.randomIndex);
        var mc = this.getChildByName("mc" + this.slots.randomIndex);
        mc.graphics.clear();
        mc.graphics.beginFill(0xffff00, 1);
        mc.graphics.drawRect(0, 0, 50, 50);
        mc.graphics.endFill();
    };
    SlotsTest.prototype.stopAllMc = function () {
        for (var i = 1; this.getChildByName("mc" + i); i++) {
            var mc = this.getChildByName("mc" + i);
            mc.graphics.clear();
            mc.graphics.beginFill(0x00ffff, 1);
            mc.graphics.drawRect(0, 0, 50, 50);
            mc.graphics.endFill();
        }
    };
    return SlotsTest;
}(egret.Sprite));
__reflect(SlotsTest.prototype, "SlotsTest");
//# sourceMappingURL=SlotsTest.js.map