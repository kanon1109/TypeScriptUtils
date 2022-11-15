var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SplineCurveTest = (function () {
    function SplineCurveTest(stage) {
        this.stage = stage;
        this.canves = new egret.Sprite();
        stage.addChild(this.canves);
        this.spArr = [];
        this.ball = new egret.Sprite();
        this.ball.width = 40;
        this.ball.height = 20;
        this.ball.graphics.lineStyle(2, 0xCCFF00);
        this.ball.graphics.beginFill(0xCCFF00);
        this.ball.graphics.drawRect(-20, -10, 40, 10);
        this.ball.graphics.endFill();
        this.ball.anchorOffsetX = this.ball.width / 2;
        this.ball.anchorOffsetX = this.ball.height / 2;
        stage.addChild(this.ball);
        this.sc = new curve.SplineCurve();
        this.sc.draw(this.canves.graphics);
        var position = this.sc.getPoint(0);
        this.ball.x = position.x;
        this.ball.y = position.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
    }
    SplineCurveTest.prototype.updateHandler = function () {
        var position = this.sc.getPoint(this.o.value);
        this.prevX = this.ball.x;
        this.prevY = this.ball.y;
        this.ball.x = position.x;
        this.ball.y = position.y;
        var angle = Math.atan2(this.ball.y - this.prevY, this.ball.x - this.prevX);
        this.ball.rotation = utils.MathUtil.rds2dgs(angle);
    };
    SplineCurveTest.prototype.completeHandler = function () {
        if (this.tw) {
            egret.Tween.removeTweens(this.o);
            this.tw = null;
        }
        var value = this.o.value;
        if (value == 1) {
            this.o = {};
            this.o.value = 1;
            value = 0;
        }
        else {
            this.o = {};
            this.o.value = 0;
            value = 1;
        }
        this.tw = egret.Tween.get(this.o, { loop: true, onChange: this.updateHandler, onChangeObj: this }).to({ value: value }, 1000, null).call(this.completeHandler, this);
    };
    SplineCurveTest.prototype.onMouseUpHandler = function (event) {
        this.curSp = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
    };
    SplineCurveTest.prototype.onMouseDownHandler = function (event) {
        var sp = new egret.Sprite();
        sp.x = event.stageX;
        sp.y = event.stageY;
        sp.width = 20;
        sp.height = 20;
        sp.anchorOffsetX = 10;
        sp.anchorOffsetY = 10;
        sp.graphics.lineStyle(2, 0xFFFF00);
        sp.graphics.beginFill(0xFFFF00);
        sp.graphics.drawCircle(10, 10, 10);
        sp.graphics.endFill();
        sp.touchEnabled = true;
        sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSpMouseDownHandler, this);
        this.stage.addChild(sp);
        this.spArr.push(sp);
        this.sc.addPoint(event.stageX, event.stageY);
        this.sc.draw(this.canves.graphics, 32 * this.spArr.length);
        sp.name = (this.spArr.length - 1) + "";
        if (this.spArr.length == 2) {
            this.stage.addChild(this.ball);
            this.o = { value: 0 };
            this.tw = egret.Tween.get(this.o, { loop: true, onChange: this.updateHandler, onChangeObj: this }).to({ value: 1 }, 1000, null).call(this.completeHandler, this);
        }
    };
    SplineCurveTest.prototype.onSpMouseDownHandler = function (event) {
        event.stopPropagation();
        this.curSp = event.target;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
    };
    SplineCurveTest.prototype.onStageMouseMove = function (event) {
        this.curSp.x = event.stageX;
        this.curSp.y = event.stageY;
        var index = parseInt(this.curSp.name);
        this.sc.setPoint(event.stageX, event.stageY, index);
        this.sc.draw(this.canves.graphics, 32 * this.spArr.length);
    };
    return SplineCurveTest;
}());
__reflect(SplineCurveTest.prototype, "SplineCurveTest");
//# sourceMappingURL=SplineCurveTest.js.map