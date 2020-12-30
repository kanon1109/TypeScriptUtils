var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EllipseCurveTest = (function () {
    function EllipseCurveTest(stage) {
        this.stage = stage;
        this.canves = new egret.Sprite();
        stage.addChild(this.canves);
        this.ec = new curve.EllipseCurve(stage.stageWidth / 2, stage.stageHeight / 2, 50, 150, 0);
        this.ec.draw(this.canves.graphics);
        this.sp0 = new egret.Sprite();
        this.sp0.width = 20;
        this.sp0.height = 20;
        this.sp0.anchorOffsetX = 10;
        this.sp0.anchorOffsetX = 10;
        this.sp0.graphics.lineStyle(2, 0xFFFF00);
        this.sp0.graphics.beginFill(0xFFFF00);
        this.sp0.graphics.drawCircle(10, 10, 10);
        this.sp0.graphics.endFill();
        this.sp0.name = "sp0";
        stage.addChild(this.sp0);
        this.sp0.touchEnabled = true;
        this.sp0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
        this.sp0.x = this.ec.x;
        this.sp0.y = this.ec.y;
        this.prevX = this.sp0.x;
        this.prevY = this.sp0.y;
        this.sp1 = new egret.Sprite();
        this.sp1.width = 20;
        this.sp1.height = 20;
        this.sp1.anchorOffsetX = 10;
        this.sp1.anchorOffsetX = 10;
        this.sp1.graphics.lineStyle(2, 0x00FFFF);
        this.sp1.graphics.beginFill(0x00FFFF);
        this.sp1.graphics.drawCircle(10, 10, 10);
        this.sp1.graphics.endFill();
        this.sp1.name = "sp1";
        stage.addChild(this.sp1);
        this.sp1.touchEnabled = true;
        this.sp1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
        this.sp1.x = this.ec.x + this.ec.xRadius;
        this.sp1.y = this.ec.y + this.ec.yRadius;
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
        var position = this.ec.getPoint(0);
        this.ball.x = position.x;
        this.ball.y = position.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
        this.o = { value: 0 };
        this.tw = egret.Tween.get(this.o, { loop: true, onChange: this.updateHandler, onChangeObj: this }).to({ value: 1 }, 1000, null).call(this.completeHandler, this);
    }
    EllipseCurveTest.prototype.updateHandler = function () {
        var position = this.ec.getPoint(this.o.value);
        this.prevX = this.ball.x;
        this.prevY = this.ball.y;
        this.ball.x = position.x;
        this.ball.y = position.y;
        var angle = Math.atan2(this.ball.y - this.prevY, this.ball.x - this.prevX);
        this.ball.rotation = utils.MathUtil.rds2dgs(angle);
    };
    EllipseCurveTest.prototype.completeHandler = function () {
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
    EllipseCurveTest.prototype.onMouseUpHandler = function (event) {
        this.curSp = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
    };
    EllipseCurveTest.prototype.onMouseDownHandler = function (event) {
        this.curSp = event.target;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
    };
    EllipseCurveTest.prototype.onStageMouseMove = function (event) {
        this.curSp.x = event.stageX;
        this.curSp.y = event.stageY;
        if (this.curSp.name == "sp0") {
            this.ec.x = event.stageX;
            this.ec.y = event.stageY;
            this.sp1.x = this.ec.x + this.ec.xRadius;
            this.sp1.y = this.ec.y + this.ec.yRadius;
        }
        else {
            this.ec.xRadius = this.curSp.x - this.ec.x;
            this.ec.yRadius = this.curSp.y - this.ec.y;
        }
        this.ec.draw(this.canves.graphics);
    };
    return EllipseCurveTest;
}());
__reflect(EllipseCurveTest.prototype, "EllipseCurveTest");
//# sourceMappingURL=EllipseCurveTest.js.map