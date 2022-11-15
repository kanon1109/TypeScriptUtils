var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ...二次贝塞尔曲线
 * @author ...Kanon
 */
var curve;
(function (curve) {
    var QuadraticBezierCurve = (function () {
        function QuadraticBezierCurve(p0, p1, p2) {
            this.initPoints(p0, p1, p2);
        }
        /**
         * 初始化点
         * @param	p0	起始点
         * @param	p1	控制点
         * @param	p2	结束点
         */
        QuadraticBezierCurve.prototype.initPoints = function (p0, p1, p2) {
            this.p0 = p0;
            this.p1 = p1;
            this.p2 = p2;
        };
        /**
         * 获取起始点
         * @return
         */
        QuadraticBezierCurve.prototype.getStartPoint = function () {
            return this.p0;
        };
        /**
         * 获取曲线上某一点的位置
         * @param	t 沿曲线的位置其中0是开始，1是结束。
         * @return	位置坐标
         */
        QuadraticBezierCurve.prototype.getPoint = function (t) {
            if (t < 0)
                t = 0;
            else if (t > 1)
                t = 1;
            return new egret.Point(this.quadraticBezier(t, this.p0.x, this.p1.x, this.p2.x), this.quadraticBezier(t, this.p0.y, this.p1.y, this.p2.y));
        };
        /**
         * 使用getPoint获取点序列
         * @param	divisions		分割数量
         * @return	坐标列表
         */
        QuadraticBezierCurve.prototype.getPoints = function (divisions) {
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
        QuadraticBezierCurve.prototype.draw = function (graphics, pointsTotal) {
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
        QuadraticBezierCurve.prototype.P0 = function (t, p) {
            var k = 1 - t;
            return k * k * p;
        };
        QuadraticBezierCurve.prototype.P1 = function (t, p) {
            return 2 * (1 - t) * t * p;
        };
        QuadraticBezierCurve.prototype.P2 = function (t, p) {
            return t * t * p;
        };
        /**
         * 一种两次次贝塞尔插值方法。
         * @param	t	The percentage of interpolation, between 0 and 1.
         * @param	p0	起始点
         * @param	p1	控制点
         * @param	p2	结束点
         * @return	插值
         */
        QuadraticBezierCurve.prototype.quadraticBezier = function (t, p0, p1, p2) {
            return this.P0(t, p0) + this.P1(t, p1) + this.P2(t, p2);
        };
        /**
         * 销毁
         */
        QuadraticBezierCurve.prototype.destroySelf = function () {
            this.p0 = null;
            this.p1 = null;
            this.p2 = null;
        };
        return QuadraticBezierCurve;
    }());
    curve.QuadraticBezierCurve = QuadraticBezierCurve;
    __reflect(QuadraticBezierCurve.prototype, "curve.QuadraticBezierCurve");
})(curve || (curve = {}));
//# sourceMappingURL=QuadraticBezierCurve.js.map