var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var curve;
(function (curve) {
    var EllipseCurve = (function () {
        function EllipseCurve(x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (xRadius === void 0) { xRadius = 0; }
            if (yRadius === void 0) { yRadius = 0; }
            if (startAngle === void 0) { startAngle = 0; }
            if (endAngle === void 0) { endAngle = 360; }
            if (clockwise === void 0) { clockwise = false; }
            if (rotation === void 0) { rotation = 0; }
            this.init(x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation);
        }
        /**
         * 初始化
         * @param	x			起始x坐标
         * @param	y			起始y坐标
         * @param	xRadius		横向半径
         * @param	yRadius		纵向半径
         * @param	startAngle	起点角度（0-360）
         * @param	endAngle	终点角度（0-360）
         * @param	clockwise	顺时针
         * @param	rotation	角度
         */
        EllipseCurve.prototype.init = function (x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (xRadius === void 0) { xRadius = 0; }
            if (yRadius === void 0) { yRadius = 0; }
            if (startAngle === void 0) { startAngle = 0; }
            if (endAngle === void 0) { endAngle = 360; }
            if (clockwise === void 0) { clockwise = false; }
            if (rotation === void 0) { rotation = 0; }
            this.p0 = new egret.Point(x, y);
            this._xRadius = xRadius;
            this._yRadius = yRadius;
            this._startAngle = utils.MathUtil.dgs2rds(startAngle);
            this._endAngle = utils.MathUtil.dgs2rds(endAngle);
            this._clockwise = clockwise;
            this._rotation = utils.MathUtil.dgs2rds(rotation);
        };
        /**
         * 获取起始点
         * @return
         */
        EllipseCurve.prototype.getStartPoint = function () {
            return this.getPoint(0);
        };
        /**
         * 获取曲线上某一点的位置
         * @param	t 沿曲线的位置其中0是开始，1是结束。
         * @return	位置坐标
         */
        EllipseCurve.prototype.getPoint = function (t) {
            var twoPi = Math.PI * 2;
            var deltaAngle = this._endAngle - this._startAngle;
            var samePoints = Math.abs(deltaAngle) < .001;
            // ensures that deltaAngle is 0 .. 2 PI
            while (deltaAngle < 0) {
                deltaAngle += twoPi;
            }
            while (deltaAngle > twoPi) {
                deltaAngle -= twoPi;
            }
            if (deltaAngle < .001) {
                if (samePoints)
                    deltaAngle = 0;
                else
                    deltaAngle = twoPi;
            }
            if (this._clockwise && !samePoints) {
                if (deltaAngle === twoPi)
                    deltaAngle = -twoPi;
                else
                    deltaAngle = deltaAngle - twoPi;
            }
            var angle = this._startAngle + t * deltaAngle;
            var x = this.p0.x + this._xRadius * Math.cos(angle);
            var y = this.p0.y + this._yRadius * Math.sin(angle);
            if (this._rotation !== 0) {
                var cos = Math.cos(this._rotation);
                var sin = Math.sin(this._rotation);
                var tx = x - this.p0.x;
                var ty = y - this.p0.y;
                // Rotate the point about the center of the ellipse.
                x = tx * cos - ty * sin + this.p0.x;
                y = tx * sin + ty * cos + this.p0.y;
            }
            return new egret.Point(x, y);
        };
        /**
         * 使用getPoint获取点序列
         * @param	divisions		分割数量
         * @return	坐标列表
         */
        EllipseCurve.prototype.getPoints = function (divisions) {
            if (divisions === void 0) { divisions = 5; }
            var points = [];
            for (var i = 0; i <= divisions; i++) {
                points.push(this.getPoint(i / divisions));
            }
            return points;
        };
        /**
         * 绘制
         * @param	graphics		画布
         * @param	pointsTotal		点的数量
         */
        EllipseCurve.prototype.draw = function (graphics, pointsTotal) {
            if (pointsTotal === void 0) { pointsTotal = 32; }
            if (!graphics)
                return;
            graphics.clear();
            var points = this.getPoints(pointsTotal);
            var length = points.length;
            var sp = points[0];
            graphics.lineStyle(2, 0xFFFFFF);
            graphics.moveTo(sp.x, sp.y);
            for (var i = 1; i < length; i++) {
                var p = points[i];
                graphics.lineTo(p.x, p.y);
                sp = p;
            }
        };
        Object.defineProperty(EllipseCurve.prototype, "xRadius", {
            /**
             * 横向半径
             */
            get: function () { return this._xRadius; },
            set: function (value) {
                this._xRadius = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "yRadius", {
            /**
             * 纵向半径
             */
            get: function () { return this._yRadius; },
            set: function (value) {
                this._yRadius = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "width", {
            /**
             * 椭圆宽度
             */
            set: function (value) {
                this._xRadius = value * 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "height", {
            /**
             * 椭圆高度
             */
            set: function (value) {
                this._yRadius = value * 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "startAngle", {
            /**
             * 起点角度
             */
            get: function () { return utils.MathUtil.rds2dgs(this._startAngle); },
            set: function (value) {
                this._startAngle = utils.MathUtil.dgs2rds(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "endAngle", {
            /**
             * 终点角度
             */
            get: function () { return utils.MathUtil.rds2dgs(this._endAngle); },
            set: function (value) {
                this._endAngle = utils.MathUtil.dgs2rds(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "clockwise", {
            /**
             * 是否顺时针
             */
            get: function () { return this._clockwise; },
            set: function (value) {
                this._clockwise = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "rotation", {
            /**
             * 椭圆角度
             */
            get: function () { return utils.MathUtil.rds2dgs(this._rotation); },
            set: function (value) {
                this.rotation = utils.MathUtil.dgs2rds(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "x", {
            /**
             * x坐标
             */
            get: function () { return this.p0.x; },
            set: function (value) {
                this.p0.x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EllipseCurve.prototype, "y", {
            /**
             * y坐标
             */
            get: function () { return this.p0.y; },
            set: function (value) {
                this.p0.y = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 销毁
         */
        EllipseCurve.prototype.destroySelf = function () {
            this.p0 = null;
        };
        return EllipseCurve;
    }());
    curve.EllipseCurve = EllipseCurve;
    __reflect(EllipseCurve.prototype, "curve.EllipseCurve");
})(curve || (curve = {}));
//# sourceMappingURL=EllipseCurve.js.map