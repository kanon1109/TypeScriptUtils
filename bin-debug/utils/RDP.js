/**
 * Created by tangben on 2015/7/9.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     * 道格拉斯-普克算法(Douglas–Peucker algorithm，
     * 亦称为拉默-道格拉斯-普克算法、迭代适应点算法、分裂与合并算法)是将曲线近似表示为一系列点，
     * 并减少点的数量的一种算法。
     * @author Kanon
     */
    var RDP = (function () {
        function RDP() {
        }
        /**
         * RDP算法 减少曲线中的点
         * @param	v        需要减少点的曲线坐标列表
         * @param	epsilon  即ε，用于约束全局，，范围介于0.2到0.8。
         * @return  减少点后的曲线坐标
         */
        RDP.properRDP = function (v, epsilon) {
            var firstPoint = v[0];
            var lastPoint = v[v.length - 1];
            if (v.length < 3)
                return v;
            var index = -1;
            var dist = 0;
            for (var i = 1; i < v.length - 1; i += 1) {
                var cDist = RDP.findPerpendicularDistance(v[i], firstPoint, lastPoint);
                if (cDist > dist) {
                    dist = cDist;
                    index = i;
                }
            }
            if (dist > epsilon) {
                var l1 = v.slice(0, index + 1);
                var l2 = v.slice(index);
                var r1 = RDP.properRDP(l1, epsilon);
                var r2 = RDP.properRDP(l2, epsilon);
                var rs = r1.slice(0, r1.length - 1).concat(r2);
                return rs;
            }
            else {
                return new Array(firstPoint, lastPoint);
            }
        };
        /**
         * 查找垂直距离
         * @param	p    当前点的坐标
         * @param	p1   起始点坐标
         * @param	p2   结束点坐标
         * @return  垂直距离
         */
        RDP.findPerpendicularDistance = function (p, p1, p2) {
            var result;
            if (p1.x == p2.x) {
                result = Math.abs(p.x - p1.x);
            }
            else {
                var slope = (p2.y - p1.y) / (p2.x - p1.x);
                var intercept = p1.y - (slope * p1.x);
                result = Math.abs(slope * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
            }
            return result;
        };
        return RDP;
    }());
    utils.RDP = RDP;
    __reflect(RDP.prototype, "utils.RDP");
})(utils || (utils = {}));
//# sourceMappingURL=RDP.js.map