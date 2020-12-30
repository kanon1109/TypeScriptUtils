var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ...样条曲线
 * @author ...Kanon
 */
var curve;
(function (curve) {
    var SplineCurve = (function () {
        function SplineCurve() {
        }
        /**
         * 添加一组坐标点
         * @param	points	坐标点数组
         */
        SplineCurve.prototype.addPoints = function (points) {
            if (!points)
                return;
            this.points = [];
            var lenght = points.length;
            for (var i = 0; i < lenght; i++) {
                var v2d = points[i];
                this.points.push(v2d.clone());
            }
        };
        /**
         * 添加一个坐标点
         * @param	x	x坐标
         * @param	y	y坐标
         */
        SplineCurve.prototype.addPoint = function (x, y) {
            if (!this.points)
                this.points = [];
            this.points.push(new egret.Point(x, y));
        };
        /**
         * 设置一个点的位置
         * @param	x	x坐标
         * @param	y	y坐标
         * @param	index	索引
         */
        SplineCurve.prototype.setPoint = function (x, y, index) {
            if (!this.points)
                return;
            if (index < 0 || index > this.points.length - 1)
                return;
            var v2d = this.points[index];
            v2d.x = x;
            v2d.y = y;
        };
        /**
         * 获取起始点
         * @return
         */
        SplineCurve.prototype.getStartPoint = function () {
            if (!this.points)
                return new egret.Point();
            return this.points[0];
        };
        /**
         * 获取曲线上某一点的位置
         * @param	t 沿曲线的位置其中0是开始，1是结束。
         * @return	位置坐标
         */
        SplineCurve.prototype.getPoint = function (t) {
            if (t < 0)
                t = 0;
            else if (t > 1)
                t = 1;
            if (!this.points)
                return new egret.Point();
            var points = this.points;
            var point = (this.points.length - 1) * t;
            var intPoint = Math.floor(point);
            var weight = point - intPoint;
            var p0 = points[(intPoint === 0) ? intPoint : intPoint - 1];
            var p1 = points[intPoint];
            var p2 = points[(intPoint > points.length - 2) ? points.length - 1 : intPoint + 1];
            var p3 = points[(intPoint > points.length - 3) ? points.length - 1 : intPoint + 2];
            return new egret.Point(this.catmullRom(weight, p0.x, p1.x, p2.x, p3.x), this.catmullRom(weight, p0.y, p1.y, p2.y, p3.y));
        };
        /**
         * 使用getPoint获取点序列
         * @param	divisions		分割数量
         * @return	坐标列表
         */
        SplineCurve.prototype.getPoints = function (divisions) {
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
        SplineCurve.prototype.draw = function (graphics, pointsTotal) {
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
        /**
         * Calculates a Catmull-Rom value.
         * @param	t	The percentage of interpolation, between 0 and 1.
         * @param	p0
         * @param	p1
         * @param	p2
         * @param	p3
         * @return	插值
         */
        SplineCurve.prototype.catmullRom = function (t, p0, p1, p2, p3) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        };
        /**
         * 销毁
         */
        SplineCurve.prototype.destroySelf = function () {
            this.points = null;
        };
        return SplineCurve;
    }());
    curve.SplineCurve = SplineCurve;
    __reflect(SplineCurve.prototype, "curve.SplineCurve");
})(curve || (curve = {}));
//# sourceMappingURL=SplineCurve.js.map