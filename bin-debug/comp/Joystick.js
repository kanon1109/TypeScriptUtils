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
 * ...摇杆
 * @author ...Kanon
 */
var comp;
(function (comp) {
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick() {
            var _this = _super.call(this) || this;
            //摇杆移动范围的最大半径
            _this.maxRadius = 100;
            //移动的强弱值
            _this._rate = 1;
            //固定类型
            _this.fixType = 0;
            _this.initData();
            _this.initEvent();
            return _this;
        }
        /**
         * 初始化数据
         */
        Joystick.prototype.initData = function () {
            this._rate = 1;
            this.maxRadius = 100;
            this._joystickAngleRad = 0;
            this._isDrawDebug = false;
            this.fixType = Joystick.FIXED;
            this.prevPt = new egret.Point();
            this.curPt = new egret.Point(this.prevPt.x, this.prevPt.y);
            this.touchEnabled = true;
        };
        /**
         * 初始化事件
         */
        Joystick.prototype.initEvent = function () {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        };
        Joystick.prototype.addToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
        };
        Joystick.prototype.onMouseDownHandler = function (event) {
            this.removeTween();
            if (this.isPause)
                return;
            this.isMouseDown = true;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this);
            if (this.fixType == Joystick.UNFIXED || this.fixType == Joystick.HALF_FIXED) {
                var pt = this.globalToLocal(event.stageX, event.stageY);
                this.setStickPos(pt.x, pt.y);
            }
            if (this.mouseMoveHandler && this.thisObj)
                this.mouseMoveHandler.call(this.thisObj);
        };
        Joystick.prototype.onMouseMoveHandler = function (event) {
            if (this.isPause)
                return;
            this.curPt = this.globalToLocal(event.stageX, event.stageY);
            this._dx = this.curPt.x - this.prevPt.x;
            this._dy = this.curPt.y - this.prevPt.y;
            this._joystickAngleRad = Math.atan2(this._dy, this._dx);
            var dis = egret.Point.distance(this.curPt, this.prevPt);
            if (this.fixType < Joystick.UNFIXED && dis > this.maxRadius)
                dis = this.maxRadius;
            var x = Math.cos(this._joystickAngleRad) * dis + this.prevPt.x;
            var y = Math.sin(this._joystickAngleRad) * dis + this.prevPt.y;
            if (this.stickImg) {
                this.stickImg.x = x;
                this.stickImg.y = y;
            }
            if (this.fixType == Joystick.UNFIXED) {
                if (dis >= this.maxRadius) {
                    var sx = Math.cos(this._joystickAngleRad) * this.maxRadius;
                    var sy = Math.sin(this._joystickAngleRad) * this.maxRadius;
                    this.prevPt.x = x - sx;
                    this.prevPt.y = y - sy;
                    if (this.baseImg) {
                        this.baseImg.x = this.prevPt.x;
                        this.baseImg.y = this.prevPt.y;
                    }
                }
            }
            this._rate = dis / this.maxRadius;
            if (this.mouseMoveHandler && this.thisObj)
                this.mouseMoveHandler.call(this.thisObj);
        };
        Joystick.prototype.onMouseUpHandler = function () {
            this.isMouseDown = false;
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this);
            this.removeTween();
            if (this.mouseUpHandler && this.thisObj)
                this.mouseUpHandler.call(this.thisObj);
            if (this.fixType == Joystick.HALF_FIXED) {
                if (this.stickImg) {
                    this.stickImg.x = 0;
                    this.stickImg.y = 0;
                }
                if (this.baseImg) {
                    this.baseImg.x = 0;
                    this.baseImg.y = 0;
                }
            }
            else {
                if (this.stickImg) {
                    this.tween = egret.Tween.get(this.stickImg);
                    this.tween.to({ x: this.prevPt.x, y: this.prevPt.y }, 200, egret.Ease.circOut);
                }
            }
        };
        /**
         * 删除动画
         */
        Joystick.prototype.removeTween = function () {
            if (this.tween) {
                this.tween.setPaused(true);
                egret.Tween.removeTweens(this.tween);
                this.tween = null;
            }
        };
        /**
         * 初始化UI
         * @param	stick	摇杆
         * @param	base	底座
         */
        Joystick.prototype.initUI = function (stick, base) {
            if (stick === void 0) { stick = ""; }
            if (base === void 0) { base = ""; }
            if (base && !this.baseImg) {
                if (!this.baseImg) {
                    this.baseImg = new egret.Bitmap();
                    this.baseImg.texture = RES.getRes(base);
                    this.baseImg.anchorOffsetX = this.baseImg.width / 2;
                    this.baseImg.anchorOffsetY = this.baseImg.height / 2;
                    this.addChild(this.baseImg);
                    this.baseImg.alpha = .6;
                }
                else {
                    this.baseImg.texture = RES.getRes(base);
                }
            }
            if (stick) {
                if (!this.stickImg) {
                    this.stickImg = new egret.Bitmap();
                    this.stickImg.texture = RES.getRes(stick);
                    this.stickImg.anchorOffsetX = this.stickImg.width / 2;
                    this.stickImg.anchorOffsetY = this.stickImg.height / 2;
                    this.stickImg.alpha = .8;
                    this.addChild(this.stickImg);
                }
                else {
                    this.stickImg.texture = RES.getRes(stick);
                }
            }
            this.setStickPos(this.prevPt.x, this.prevPt.y);
        };
        /**
         * 设置摇杆的位置
         * @param	x	x位置
         * @param	y	y位置
         */
        Joystick.prototype.setStickPos = function (x, y) {
            this.prevPt.x = x;
            this.prevPt.y = y;
            this.curPt.x = this.prevPt.x;
            this.curPt.y = this.prevPt.y;
            if (this.baseImg) {
                this.baseImg.x = x;
                this.baseImg.y = y;
            }
            if (this.stickImg) {
                this.stickImg.x = x;
                this.stickImg.y = y;
            }
        };
        Object.defineProperty(Joystick.prototype, "rate", {
            /**
             * 摇杆强弱
             */
            get: function () { return this._rate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Joystick.prototype, "joystickAngleRad", {
            /**
             * 摇杆的弧度
             */
            get: function () { return this._joystickAngleRad; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Joystick.prototype, "joystickAngleDeg", {
            /**
             * 摇杆的角度
             */
            get: function () {
                return this._joystickAngleRad * 180 / Math.PI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Joystick.prototype, "dx", {
            /**
             * x坐标上向量
             */
            get: function () { return this._dx; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Joystick.prototype, "dy", {
            /**
             * y坐标上向量
             */
            get: function () { return this._dy; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Joystick.prototype, "isDrawDebug", {
            /**
             * 是否绘制调试
             */
            get: function () { return this._isDrawDebug; },
            set: function (value) {
                this._isDrawDebug = value;
                this.graphics.clear();
                if (value) {
                    this.graphics.beginFill(0xff0000);
                    this.graphics.drawRect(0, 0, this.width, this.height);
                    this.graphics.endFill();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否点击
         */
        Joystick.prototype.isTouched = function () {
            return this.isMouseDown;
        };
        /**
         * 销毁
         */
        Joystick.prototype.destroySelf = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMouseUpHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUpHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouseUpHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this);
            if (this.baseImg && this.baseImg.parent) {
                this.baseImg.texture = null;
                this.baseImg.parent.removeChild(this.baseImg);
                this.baseImg = null;
            }
            if (this.stickImg && this.stickImg.parent) {
                this.stickImg.texture = null;
                this.stickImg.parent.removeChild(this.stickImg);
                this.stickImg = null;
            }
            this.removeTween();
            this.mouseMoveHandler = null;
            this.thisObj = null;
            if (this.parent)
                this.parent.removeChild(this);
        };
        //固定状态枚举
        Joystick.FIXED = 0; //固定摇杆
        Joystick.HALF_FIXED = 1; //半固定（点击任意位置作为起点）
        Joystick.UNFIXED = 2; //不固定（点击任意位置作为起点，并且摇杆跟随拖动的位置移动）
        return Joystick;
    }(egret.Sprite));
    comp.Joystick = Joystick;
    __reflect(Joystick.prototype, "comp.Joystick");
})(comp || (comp = {}));
//# sourceMappingURL=Joystick.js.map