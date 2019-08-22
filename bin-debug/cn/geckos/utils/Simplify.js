var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2019/8/22.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var utils;
        (function (utils) {
            /**
             * 优化版的道格拉斯-普克算法(Douglas–Peucker algorithm)
             */
            var Simplify = (function () {
                function Simplify() {
                }
                Simplify.getSquareDistance = function (p1, p2) {
                    var dx = p1.x - p2.x, dy = p1.y - p2.y;
                    return dx * dx + dy * dy;
                };
                Simplify.getSquareSegmentDistance = function (p, p1, p2) {
                    var x = p1.x;
                    var y = p1.y;
                    var dx = p2.x - x;
                    var dy = p2.y - y;
                    var t;
                    if (dx !== 0 || dy !== 0) {
                        t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
                        if (t > 1) {
                            x = p2.x;
                            y = p2.y;
                        }
                        else if (t > 0) {
                            x += dx * t;
                            y += dy * t;
                        }
                    }
                    dx = p.x - x;
                    dy = p.y - y;
                    return dx * dx + dy * dy;
                };
                // the rest of the code doesn't care for the point format
                Simplify.simplifyRadialDistance = function (points, sqTolerance) {
                    var i;
                    var len = points.length;
                    var point;
                    var prevPoint = points[0];
                    var newPoints = [prevPoint];
                    for (i = 1; i < len; i++) {
                        point = points[i];
                        if (Simplify.getSquareDistance(point, prevPoint) > sqTolerance) {
                            newPoints.push(point);
                            prevPoint = point;
                        }
                    }
                    if (prevPoint !== point)
                        newPoints.push(point);
                    return newPoints;
                };
                // simplification using optimized Douglas-Peucker algorithm with recursion elimination
                Simplify.simplifyDouglasPeucker = function (points, sqTolerance) {
                    var len = points.length;
                    var markers = [];
                    var first = 0;
                    var last = len - 1;
                    var i;
                    var maxSqDist;
                    var sqDist;
                    var index;
                    var firstStack = [];
                    var lastStack = [];
                    var newPoints = [];
                    markers[first] = markers[last] = 1;
                    while (last) {
                        maxSqDist = 0;
                        for (i = first + 1; i < last; i++) {
                            sqDist = Simplify.getSquareSegmentDistance(points[i], points[first], points[last]);
                            if (sqDist > maxSqDist) {
                                index = i;
                                maxSqDist = sqDist;
                            }
                        }
                        if (maxSqDist > sqTolerance) {
                            markers[index] = 1;
                            firstStack.push(first);
                            lastStack.push(index);
                            firstStack.push(index);
                            lastStack.push(last);
                        }
                        first = firstStack.pop();
                        last = lastStack.pop();
                    }
                    for (i = 0; i < len; i++) {
                        if (markers[i])
                            newPoints.push(points[i]);
                    }
                    return newPoints;
                };
                /**
                 * 减少曲线中的点
                 * @param	points        		需要减少点的曲线坐标列表
                 * @param	tolerance 	  		即ε，用于约束全局
                 * @param	highestQuality 	 	是否使用高清晰度
                 * @return  减少点后的曲线坐标
                 */
                Simplify.simplify = function (points, tolerance, highestQuality) {
                    if (tolerance === void 0) { tolerance = 1; }
                    if (highestQuality === void 0) { highestQuality = false; }
                    var sqTolerance = tolerance * tolerance;
                    if (!highestQuality)
                        points = Simplify.simplifyRadialDistance(points, sqTolerance);
                    points = Simplify.simplifyDouglasPeucker(points, sqTolerance);
                    return points;
                };
                return Simplify;
            }());
            __reflect(Simplify.prototype, "Simplify");
        })(utils = geckos.utils || (geckos.utils = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=Simplify.js.map