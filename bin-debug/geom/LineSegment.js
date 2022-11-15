var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/9.
 */
var geom;
(function (geom) {
    /////////////////////////////////////////
    //
    // LineSegment类(2D)
    //
    /////////////////////////////////////////
    var MathUtil = utils.MathUtil;
    var LineSegment = (function () {
        /**
         * 初始化
         * @param	sp
         * @param	ep
         */
        function LineSegment(sp, ep) {
            this.startPoint = sp;
            this.endPoint = ep;
        }
        /**
         * 获得该线段的截距(和y轴相交的点的y值)
         * @return
         */
        LineSegment.prototype.getIntercept = function () {
            var slope = this.getLineSlope();
            return this.endPoint.y - slope * this.endPoint.x;
        };
        /**
         * 获得一个线段的斜率
         * @return
         */
        LineSegment.prototype.getLineSlope = function () {
            var sp = this.startPoint;
            var ep = this.endPoint;
            return (ep.y - sp.y) / (ep.x - sp.x);
        };
        /**
         * 返回一个复制的line对象
         * @return
         */
        LineSegment.prototype.clone = function () {
            return new LineSegment(this.startPoint, this.endPoint);
        };
        /**
         * 输出起始点和结尾点
         * @return
         */
        LineSegment.prototype.toString = function () {
            return "startPoint-[" + this.startPoint + "]" + "::" +
                "endPoint-[" + this.endPoint + "]";
        };
        /**
         * 输出线段的数学表达式y = kx + b
         * @return
         */
        LineSegment.prototype.toMathString = function () {
            var slope = this.getLineSlope();
            var intercept = this.getIntercept();
            return "[" + "y = " + slope + "X" + " + " + intercept + "]";
        };
        /**
         * 判断线段是否是水平于x轴
         * @return
         */
        LineSegment.prototype.isHorizontal = function () {
            return (this.endPoint.y - this.startPoint.y) == 0;
        };
        /**
         * 判断线段是否是水平于y轴
         * @return
         */
        LineSegment.prototype.isVertical = function () {
            return (this.endPoint.x - this.startPoint.x) == 0;
        };
        /**
         * 检测2线条是否互相垂直
         * 对垂直线不起作用, 垂直的线会遇到(y / 0)的情况
         * @param	line
         * @return
         */
        LineSegment.prototype.isPerpendicular = function (line) {
            var slopeA = this.getLineSlope();
            var slopeB = line.getLineSlope();
            return (slopeA * slopeB) == -1;
        };
        /**
         * 判断2条线是否平行
         * 对垂直线不起作用, 垂直的线会遇到(y / 0)的情况
         * @param	line
         * @return
         */
        LineSegment.prototype.isParallel = function (line) {
            var slopA = this.getLineSlope();
            var slopB = line.getLineSlope();
            return (slopA == slopB);
        };
        /**
         * 求出2条线之间的夹角
         * 公式 tanA = |(k2-k1)/(1-k1*k2)| (0 < A < 90);
         * 对垂直线不起作用, 垂直的线会遇到(y / 0)的情况
         * @param	line  求出2条线之间的夹角
         * @param	degrees 是否返回角度值
         * @return
         */
        LineSegment.prototype.angleBetween = function (line, degrees) {
            if (degrees === void 0) { degrees = true; }
            var slopA = this.getLineSlope();
            var slopB = line.getLineSlope();
            var tanA = Math.abs((slopB - slopA) / (1 + slopA * slopB));
            var angle = Math.atan(tanA);
            if (degrees)
                angle = MathUtil.rds2dgs(angle);
            return angle;
        };
        /**
         * 如果已知改线段和参数line线段垂直, 取得改line线段的斜率
         * @param	line
         * @return
         */
        LineSegment.prototype.getSibling = function (line) {
            if (this.isPerpendicular(line)) {
                return (-1 / this.getLineSlope());
            }
            return null;
        };
        /**
         * 取得另一条线段(垂直于己的2条线段)
         * @return
         */
        LineSegment.prototype.getSiblingLine = function () {
            var oSlope = (-1 / this.getLineSlope());
            var tempA = this.startPoint;
            var tempB = this.endPoint;
            var tempLine = {};
            var interceptA = tempA.y - oSlope * tempA.x;
            var interceptB = tempB.y - oSlope * tempB.x;
            var lineAStr = "[" + "y = " + oSlope + "X" + " + " + interceptA + "]";
            var lineBStr = "[" + "y = " + oSlope + "X" + " + " + interceptB + "]";
            tempLine["lineA"] = lineAStr;
            tempLine["lineB"] = lineBStr;
            return tempLine;
        };
        /**
         * 指定点是否在线条的轨迹上
         * @param	point
         * @return
         */
        LineSegment.prototype.isInLineTrack = function (point) {
            var slope = this.getLineSlope();
            var startPoint = this.startPoint;
            var endPoint = point;
            return Math.abs(((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)) - slope) < .0000001;
        };
        /**
         * 返回线段的斜率和截距
         * @return
         */
        LineSegment.prototype.getLineObj = function () {
            return { slope: this.getLineSlope(), intercept: this.getIntercept() };
        };
        /**
         * 判断2线段是否有可能相交
         * @param	line
         * @return
         */
        LineSegment.prototype.hasIntersection = function (line) {
            var lineASlope = this.getLineSlope();
            var lineBSlope = line.getLineSlope();
            return lineASlope != lineBSlope;
        };
        /**
         * 取得2线段的基本关系
         * @return
         */
        LineSegment.prototype.getRelation = function (line) {
            if (this.isHorizontal() && line.isHorizontal()) {
                return LineSegment.LINE_HORIZONTAL;
            }
            if (this.isVertical() && line.isVertical()) {
                return LineSegment.LINE_VERTICAL;
            }
            if (this.getLineSlope() == line.getLineSlope()) {
                return LineSegment.LINE_PARALLEL;
            }
            if (this.getLineObj()["slope"] == line.getLineObj()["slope"] &&
                this.getLineObj()["intercept"] == line.getLineObj()["intercept"]) {
                return LineSegment.LINE_OVERLAP;
            }
            else {
                return LineSegment.LINE_UNEXPECTED;
            }
        };
        //TODO
        LineSegment.prototype.isEqual = function (line) {
            return (this.startPoint.equals(line.startPoint) &&
                this.endPoint.equals(line.endPoint)) ||
                (this.startPoint.equals(line.endPoint) &&
                    this.endPoint.equals(line.startPoint));
        };
        /**
         * 获得2条线段的可能的相交点
         * @param	line
         * @return
         */
        LineSegment.prototype.getIntersectionPoint = function (line) {
            if (this.getRelation(line) != LineSegment.LINE_UNEXPECTED)
                return null;
            var lineA = this.getLineObj();
            var lineB = line.getLineObj();
            var slopeA = lineA["slope"];
            var slopeB = lineB["slope"];
            if (slopeA == -Infinity ||
                slopeA == Infinity) {
                //线段slopeA垂直 找到slopeB的交叉点
                if (slopeB == 0) {
                    //另一条线为水平
                    return new geom.Vector2D(this.startPoint.x, line.startPoint.y);
                }
            }
            if (slopeB == -Infinity ||
                slopeB == Infinity) {
                //线段slopeB垂直 找到slopeA的交叉点
                if (slopeA == 0) {
                    //另一条线为水平
                    return new geom.Vector2D(line.startPoint.x, this.startPoint.y);
                }
            }
            var interceptA = lineA["intercept"];
            var interceptB = lineB["intercept"];
            var tempX = (interceptB - interceptA) / (slopeA - slopeB);
            var tempY = slopeA * tempX + interceptA;
            return new geom.Vector2D(tempX, tempY);
        };
        /**
         * 判断2条线段相交的点是否在这2条线段上
         * @param	line
         * @return
         */
        LineSegment.prototype.isIntersection = function (line) {
            var value = this.getIntersectionPoint(line);
            if (!value)
                return false;
            return this.isContainPoint(value);
        };
        /**
         * 判断一个点是否在指定的线段上
         * @param	point
         * @return
         */
        LineSegment.prototype.isContainPoint = function (point) {
            if (this.isHorizontal()) {
                var hn = Math.min(this.startPoint.x, this.endPoint.x);
                var hx = Math.max(this.startPoint.x, this.endPoint.x);
                return (point.x <= hx && point.x >= hn) && (point.y == this.startPoint.y);
            }
            else if (this.isVertical()) {
                var vn = Math.min(this.startPoint.y, this.endPoint.y);
                var vx = Math.max(this.startPoint.y, this.endPoint.y);
                return (point.y <= vx && point.y >= vn) && (point.x == this.startPoint.x);
            }
            //method 1:
            if (!this.isInLineTrack(point))
                return false;
            var spTempDx = this.startPoint.x - point.x;
            var spTempDy = this.startPoint.y - point.y;
            var epTempDx = this.endPoint.x - point.x;
            var epTempDy = this.endPoint.y - point.y;
            //差积是否为0，判断是否在同一直线上
            if ((spTempDx * epTempDy - epTempDx * spTempDy) > .0000001)
                return false;
            //判断是否在线段上
            if ((point.x > this.startPoint.x && point.x > this.endPoint.x) ||
                (point.x < this.startPoint.x && point.x < this.endPoint.x))
                return false;
            if ((point.y > this.startPoint.y && point.y > this.endPoint.y) ||
                (point.y < this.startPoint.y && point.y < this.endPoint.y))
                return false;
            return true;
        };
        LineSegment.LINE_HORIZONTAL = "horizontal"; //水平
        LineSegment.LINE_VERTICAL = "vertical"; //垂直
        LineSegment.LINE_PARALLEL = "parallel"; //平行
        LineSegment.LINE_OVERLAP = "overlap"; //覆盖
        LineSegment.LINE_UNEXPECTED = "unexpected"; //其它
        return LineSegment;
    }());
    geom.LineSegment = LineSegment;
    __reflect(LineSegment.prototype, "geom.LineSegment");
})(geom || (geom = {}));
//# sourceMappingURL=LineSegment.js.map