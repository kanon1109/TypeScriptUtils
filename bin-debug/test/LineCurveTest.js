var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LineCurveTest = (function () {
    function LineCurveTest(stage) {
        this.stage = stage;
        this.canves = new egret.Sprite();
        stage.addChild(this.canves);
        var p0 = new egret.Point(200, 240);
        var p1 = new egret.Point(130, 140);
        this.sp0 = new egret.Sprite();
        this.sp0.x = p0.x;
        this.sp0.y = p0.y;
        this.sp0.width = 20;
        this.sp0.height = 20;
        this.sp0.anchorOffsetX = 10;
        this.sp0.anchorOffsetX = 10;
        this.sp0.graphics.lineStyle(2, 0xFFFF00);
        this.sp0.graphics.beginFill(0xFFFF00);
        this.sp0.graphics.drawCircle(10, 10, 10);
        this.sp0.graphics.endFill();
        stage.addChild(this.sp0);
        this.sp0.touchEnabled = true;
        this.sp0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
        this.prevX = p0.x;
        this.prevY = p0.y;
        this.sp1 = new egret.Sprite();
        this.sp1.x = p1.x;
        this.sp1.y = p1.y;
        this.sp1.width = 20;
        this.sp1.height = 20;
        this.sp1.anchorOffsetX = 10;
        this.sp1.anchorOffsetX = 10;
        this.sp1.graphics.lineStyle(2, 0x00FFFF);
        this.sp1.graphics.beginFill(0x00FFFF);
        this.sp1.graphics.drawCircle(10, 10, 10);
        this.sp1.graphics.endFill();
        stage.addChild(this.sp1);
        this.sp1.touchEnabled = true;
        this.sp1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
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
        this.lc = new curve.LineCurve(p0, p1);
        this.lc.draw(this.canves.graphics);
        var position = this.lc.getPoint(0);
        this.ball.x = position.x;
        this.ball.y = position.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
        this.o = { value: 0 };
        this.tw = egret.Tween.get(this.o, { loop: true, onChange: this.updateHandler, onChangeObj: this }).to({ value: 1 }, 1000, null).call(this.completeHandler, this);
    }
    LineCurveTest.prototype.updateHandler = function () {
        var position = this.lc.getPoint(this.o.value);
        this.prevX = this.ball.x;
        this.prevY = this.ball.y;
        this.ball.x = position.x;
        this.ball.y = position.y;
        var angle = Math.atan2(this.ball.y - this.prevY, this.ball.x - this.prevX);
        this.ball.rotation = utils.MathUtil.rds2dgs(angle);
    };
    LineCurveTest.prototype.completeHandler = function () {
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
    LineCurveTest.prototype.onMouseUpHandler = function (event) {
        this.curSp = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
    };
    LineCurveTest.prototype.onMouseDownHandler = function (event) {
        this.curSp = event.target;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
    };
    LineCurveTest.prototype.onStageMouseMove = function (event) {
        this.curSp.x = event.stageX;
        this.curSp.y = event.stageY;
        var p0 = new egret.Point(this.sp0.x, this.sp0.y);
        var p1 = new egret.Point(this.sp1.x, this.sp1.y);
        this.lc.initPoints(p0, p1);
        this.lc.draw(this.canves.graphics);
    };
    return LineCurveTest;
}());
__reflect(LineCurveTest.prototype, "LineCurveTest");
//# sourceMappingURL=LineCurveTest.js.map