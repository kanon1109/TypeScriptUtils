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
var RadarMapTest = (function (_super) {
    __extends(RadarMapTest, _super);
    function RadarMapTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    RadarMapTest.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var bg = new egret.Bitmap(RES.getRes("bg_attr_jpg"));
        bg.anchorOffsetX = 155;
        bg.anchorOffsetY = 204;
        this.addChild(bg);
        var spt = new egret.Sprite();
        this.addChild(spt);
        spt.x = this.stage.stageWidth / 2;
        spt.y = this.stage.stageHeight / 2;
        var spt2 = new egret.Sprite();
        this.addChild(spt2);
        spt2.x = spt.x;
        spt2.y = spt.y;
        bg.x = spt.x;
        bg.y = spt.y;
        this.raderMap = new effect.RadarMap(spt, spt2);
        this.raderMap.showDraw = true;
        this.raderMap.radius = 100;
        this.raderMap.drawGraph([utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
        ]);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageClickHandler, this);
    };
    RadarMapTest.prototype.onStageClickHandler = function () {
        this.raderMap.drawGraph([utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
            utils.Random.randint(0, 100),
        ]);
    };
    return RadarMapTest;
}(egret.Sprite));
__reflect(RadarMapTest.prototype, "RadarMapTest");
//# sourceMappingURL=RadarMapTest.js.map