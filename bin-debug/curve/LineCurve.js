var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ...线段曲线
 * @author ...Kanon
 */
var curve;
(function (curve) {
    var LineCurve = (function () {
        function LineCurve(p0, p1) {
            this.initPoints(p0, p1);
        }
        /**
         * 初始化点
         * @param	p0	起始点
         * @param	p1	结束点
         */
        LineCurve.prototype.initPoints = function (p0, p1) {
            this.p0 = p0;
            this.p1 = p1;
        };
        /**
         * 获取起始点
         * @return
         */
        LineCurve.prototype.getStartPoint = function () {
            return this.p0;
        };
        /**
         * 获取曲线上某一点的位置
         * @param	t 沿曲线的位置其中0是开始，1是结束。
         * @return	位置坐标
         */
        LineCurve.prototype.getPoint = function (t) {
            if (t < 0)
                t = 0;
            else if (t > 1)
                t = 1;
            if (t == 0)
                return this.p0;
            else if (t == 1)
                return this.p1;
            var x = this.p1.x - this.p0.x;
            var y = this.p1.y - this.p0.y;
            var out = new egret.Point(x * t, y * t);
            return new egret.Point(this.p0.x + out.x, this.p0.y + out.y);
        };
        /**
         * 获取范围
         * @return	范围矩形
         */
        LineCurve.prototype.getBounds = function () {
            return new egret.Rectangle(this.p0.x, this.p0.y, this.p1.x - this.p0.x, this.p1.y - this.p0.y);
        };
        /**
         * 绘制
         * @param	graphics		画布
         */
        LineCurve.prototype.draw = function (graphics) {
            if (!graphics)
                return;
            graphics.clear();
            graphics.lineStyle(2, 0xFFFFFF);
            graphics.moveTo(this.p0.x, this.p0.y);
            graphics.lineTo(this.p1.x, this.p1.y);
        };
        /**
         * 销毁
         */
        LineCurve.prototype.destroySelf = function () {
            this.p0 = null;
            this.p1 = null;
        };
        return LineCurve;
    }());
    curve.LineCurve = LineCurve;
    __reflect(LineCurve.prototype, "curve.LineCurve");
})(curve || (curve = {}));
//# sourceMappingURL=LineCurve.js.map