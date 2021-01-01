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
var SnakeTest = (function (_super) {
    __extends(SnakeTest, _super);
    function SnakeTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    SnakeTest.prototype.onAddToStage = function () {
        var _this = this;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.snake = new effect.Snake(this, RES.getRes("head_png"), RES.getRes("body_png"), this.stage.stageWidth / 2, this.stage.stageHeight / 2);
        this.js = new comp.Joystick();
        this.js.thisObj = this;
        this.js.fixType = comp.Joystick.HALF_FIXED;
        this.addChild(this.js);
        this.js.mouseMoveHandler = function () {
            var vx = Math.cos(_this.js.joystickAngleRad);
            var vy = Math.sin(_this.js.joystickAngleRad);
            _this.snake.snakeMoving(new egret.Point(vx, vy), _this.js.joystickAngleDeg);
        };
        this.js.mouseUpHandler = function () {
            _this.snake.snakeMoving(new egret.Point(0, 0), _this.js.joystickAngleDeg);
        };
        egret.Ticker.getInstance().register(function (dt) {
            _this.snake.update(dt);
        }, this);
    };
    return SnakeTest;
}(egret.Sprite));
__reflect(SnakeTest.prototype, "SnakeTest");
//# sourceMappingURL=SnakeTest.js.map