/**
 * Created by kanon on 2015/7/8.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var utils;
        (function (utils) {
            var MathUtil = (function () {
                function MathUtil() {
                }
                var __egretProto__ = MathUtil.prototype;
                /**
                 * 弧度转换成角度  radians -> degrees
                 *
                 * @param radians 弧度
                 * @return 相应的角度
                 */
                MathUtil.rds2dgs = function (radians) {
                    return MathUtil.fixAngle(radians * 180 / Math.PI);
                };
                /**
                 * 角度转换成弧度 degrees -> radians
                 *
                 * @param degrees 角度
                 * @return 相应的弧度
                 */
                MathUtil.dgs2rds = function (degrees) {
                    return degrees * Math.PI / 180;
                };
                /**
                 * 标准化角度值，将传入的角度值返回成一个确保落在 0 ~ 360 之间的数字。
                 *
                 * <pre>
                 * MathUtil.fixAngle(380); // 返回 20
                 * MathUtil.fixAngle(-340); // 返回 20
                 * </pre>
                 *
                 * 该方法详情可查看 《Flash MX 编程与创意实现》的第69页。
                 */
                MathUtil.fixAngle = function (angle) {
                    angle %= 360;
                    if (angle < 0)
                        return angle + 360;
                    return angle;
                };
                /**
                 * 修正数字 在一个范围内
                 * @param	num     需要修正的数字
                 * @param	min     最小的范围
                 * @param	range   最大范围
                 * @return  修正后的数字
                 */
                MathUtil.fixNumber = function (num, min, range) {
                    num %= range;
                    if (num < min)
                        return num + range;
                    return num;
                };
                /**
                 * 修正半角
                 * @param	angle	需要修正的角度
                 * @return	修正半角后的角度
                 */
                MathUtil.fixHalfAngle = function (angle) {
                    angle %= 180;
                    if (angle < 0)
                        return angle + 180;
                    return angle;
                };
                /**
                 * 求取阶乘
                 * @param	num		需要求阶乘的数组
                 * @return
                 */
                MathUtil.getFactorial = function (num) {
                    if (num <= 0)
                        return 1;
                    return num * MathUtil.getFactorial(num - 1);
                };
                /**
                 * 求乘方
                 * @param	num
                 * @param	pow  乘方的次数
                 * @return
                 */
                MathUtil.power = function (num, pow) {
                    if (pow <= 0)
                        return 1;
                    return num * MathUtil.power(num, pow - 1);
                };
                /**
                 * 对一个数保留指定的小数位数, 然后四舍五入
                 * @param	num
                 * @param	interval 保留小数点后几位
                 * @return  返回一个指定保留小数位的数(四舍五入)
                 */
                MathUtil.round = function (num, interval) {
                    if (interval === void 0) { interval = .1; }
                    return Math.round(num / interval) * interval;
                };
                /**
                 * 对一个数保留指定的小数位数, 然后向下取整
                 * @param	num
                 * @param	interval 保留小数点后几位
                 * @return  返回一个指定保留小数位的数(向下取整)
                 */
                MathUtil.floor = function (num, interval) {
                    if (interval === void 0) { interval = .1; }
                    return Math.floor(num / interval) * interval;
                };
                /**
                 * 对一个数保留指定的小数位数, 然后向上取整
                 * @param	num
                 * @param	interval 保留小数点后几位
                 * @return  返回一个指定保留小数位的数(向上取整)
                 */
                MathUtil.ceil = function (num, interval) {
                    if (interval === void 0) { interval = .1; }
                    return Math.ceil(num / interval) * interval;
                };
                /**
                 * 返回num的绝对值
                 * @param	num
                 * @return  返回参数num的绝对值
                 */
                MathUtil.getAbsolute = function (num) {
                    return num < 0 ? -num : num;
                };
                /**
                 * 返回参数mainNum除以divided的余数
                 * @param	mainNum
                 * @param	divided
                 * @return  返回参数mainNum除以divided的余数
                 */
                MathUtil.getRemainedNum = function (mainNum, divided) {
                    return mainNum - ((mainNum / divided) >> 0) * divided;
                };
                /**
                 * 判断参数num是否是偶数
                 * @param	num
                 * @return  判断参数num是否是偶数
                 */
                MathUtil.isEven = function (num) {
                    if (MathUtil.isEvenByDivided(num, 2) == 0)
                        return true;
                    return false;
                };
                /**
                 * 得到num除以divided后得到的余数
                 * @param	num
                 * @param	divided
                 * @return
                 */
                MathUtil.isEvenByDivided = function (num, divided) {
                    return num & (divided - 1);
                };
                /**
                 * 斜率公式
                 * @param	x1 坐标点1x坐标
                 * @param	y1 坐标点1y坐标
                 * @param	x2 坐标点2x坐标
                 * @param	y2 坐标点2y坐标
                 * @return  相应的斜率
                 */
                MathUtil.getSlope = function (x1, y1, x2, y2) {
                    var slope = (y1 - y2) / (x1 - x2);
                    return slope;
                };
                /**
                 * 余弦公式
                 * CosC=(a^2+b^2-c^2)/2ab
                 * CosB=(a^2+c^2-b^2)/2ac
                 * CosA=(c^2+b^2-a^2)/2bc
                 * 已知3边求出某边对应的角的角度
                 * @param	a 边
                 * @param	b 边
                 * @param	c 边
                 * @return  一个对象包含三个对应的角度
                 */
                MathUtil.threeSidesMathAngle = function (a, b, c) {
                    var cosA = (c * c + b * b - a * a) / (2 * b * c);
                    var A = Math.round(MathUtil.rds2dgs(Math.acos(cosA)));
                    var cosB = (a * a + c * c - b * b) / (2 * a * c);
                    var B = Math.round(MathUtil.rds2dgs(Math.acos(cosB)));
                    var cosC = (a * a + b * b - c * c) / (2 * a * b);
                    var C = Math.round(MathUtil.rds2dgs(Math.acos(cosC)));
                    return { "A": A, "B": B, "C": C };
                };
                /**
                 * 正弦公式
                 * a/sinA=b/sinB=c/sinC=2R
                 * 已知一个角度以及角度对应的边长 可以求出三角外接圆半径R的2倍
                 * @param	angle               弧度
                 * @param	line                弧度应的变长
                 * @return  三角外接圆半径R
                 */
                MathUtil.sineLaw = function (angle, line) {
                    return line / Math.sin(angle) / 2;
                };
                /**
                 * 坐标旋转公式
                 * @param	cx			中心点x坐标
                 * @param	cy			中心点y坐标
                 * @param	x			需要旋转的物体的x坐标
                 * @param	y			需要旋转的物体的y坐标
                 * @param	sin			sin(旋转角度);
                 * @param	cos			cos(旋转角度);
                 * @param	reverse		是否逆时针旋转
                 * @return	旋转后坐标
                 */
                MathUtil.rotate = function (cx, cy, x, y, sin, cos, reverse) {
                    var point = new egret.Point();
                    var dx = x - cx;
                    var dy = y - cy;
                    if (reverse) {
                        point.x = dx * cos + dy * sin + cx;
                        point.y = dy * cos - dx * sin + cy;
                    }
                    else {
                        point.x = dx * cos - dy * sin + cx;
                        point.y = dy * cos + dx * sin + cy;
                    }
                    return point;
                };
                /**
                 * 求出直角坐标系 三角形的重心
                 * @param	a      三角形顶点a
                 * @param	b      三角形顶点b
                 * @param	c      三角形顶点c
                 * @return  三角形的重心
                 */
                MathUtil.triangleCentroid = function (a, b, c) {
                    return new egret.Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);
                };
                /**
                 * 求出直角坐标系 三角形外接圆中心坐标
                 * x = ((y2 - y1) * (y3 * y3 - y1 * y1 + x3 * x3 - x1 * x1) -
                 *      (y3 - y1) * (y2 * y2 - y1 * y1 + x2 * x2 - x1 * x1)) /
                 *      (2 * (x3 - x1) * (y2 - y1) - 2 * ((x2 - x1) * (y3 - y1)));
                 *
                 * y = ((x2 - x1) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1) -
                 *      (x3 - x1) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1)) /
                 *      (2 * (y3 - y1) * (x2 - x1) - 2 * ((y2 - y1) * (x3 - x1)));
                 * @param	a      三角形顶点a
                 * @param	b      三角形顶点b
                 * @param	c      三角形顶点c
                 * @return  外接圆中心坐标
                 */
                MathUtil.triangleCircumscribedCircleCenter = function (a, b, c) {
                    var axp = Math.pow(a.x, 2);
                    var bxp = Math.pow(b.x, 2);
                    var cxp = Math.pow(c.x, 2);
                    var ayp = Math.pow(a.y, 2);
                    var byp = Math.pow(b.y, 2);
                    var cyp = Math.pow(c.y, 2);
                    var x = ((b.y - a.y) * (cyp - ayp + cxp - axp) - (c.y - a.y) * (byp - ayp + bxp - axp)) / (2 * (c.x - a.x) * (b.y - a.y) - 2 * ((b.x - a.x) * (c.y - a.y)));
                    var y = ((b.x - a.x) * (cxp - axp + cyp - ayp) - (c.x - a.x) * (bxp - axp + byp - ayp)) / (2 * (c.y - a.y) * (b.x - a.x) - 2 * ((b.y - a.y) * (c.x - a.x)));
                    return new egret.Point(x, y);
                };
                /**
                 * 根据项数和公差求出等差数列项数所对应的值
                 * @param	sn  n项的和
                 * @param	d   公差
                 * @return  项数所对应的值
                 */
                MathUtil.arithmeticSequenceIndexValue = function (sn, d) {
                    sn = Math.floor(sn);
                    d = Math.floor(d);
                    var n = Math.floor(MathUtil.arithmeticSequenceIndex(sn, d));
                    return (n + 1) * d - (d - 1);
                };
                /**
                 * 根据数列的和求出等差数列项的次数
                 * @param	sn  n项的和
                 * @param	d   公差
                 * @return  项的次数
                 */
                MathUtil.arithmeticSequenceIndex = function (sn, d) {
                    //前n项和公式为：Sn=n×a1+n×(n-1)×(d/2);
                    //等差数列分解因式公式
                    //d/2×n^2-(1-d/2)×n-dis = 0
                    //一元二次方程表示法 ax^2+bx+c = 0;
                    //一元二次方程 带入公式法  x = -b+Math.sqrt(b^2-4ac)/2a;
                    var hd = d * .5;
                    var a = hd;
                    var b = 1 - hd;
                    var c = Math.floor(-sn);
                    return (-b + Math.sqrt(b * b - (4 * a * c))) / (2 * a);
                };
                /**
                 * 计算距离
                 * @param	x1	点1的x坐标
                 * @param	y1	点1的y坐标
                 * @param	x2	点2的x坐标
                 * @param	y2	点2的y坐标
                 * @return	2点之间的距离
                 */
                MathUtil.distance = function (x1, y1, x2, y2) {
                    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                };
                /**
                 * 判断点是否在任意三角形内部
                 * @param	a		三角形点a
                 * @param	b		三角形点b
                 * @param	c		三角形点c
                 * @param	p		点
                 * @return	是否在三角形内部
                 */
                MathUtil.isInsideTriangle = function (a, b, c, p) {
                    var planeAB = (a.x - p.x) * (b.y - p.y) - (b.x - p.x) * (a.y - p.y);
                    var planeBC = (b.x - p.x) * (c.y - p.y) - (c.x - p.x) * (b.y - p.y);
                    var planeCA = (c.x - p.x) * (a.y - p.y) - (a.x - p.x) * (c.y - p.y);
                    return MathUtil.sign(planeAB) == MathUtil.sign(planeBC) && MathUtil.sign(planeBC) == MathUtil.sign(planeCA);
                };
                MathUtil.sign = function (n) {
                    return Math.floor(Math.abs(n) / n);
                };
                /**
                 * 求三角形面积
                 * @param	a		点a
                 * @param	b		点b
                 * @param	c		点c
                 * @return	面积
                 */
                MathUtil.triangleArea = function (a, b, c) {
                    return (c.x * b.y - b.x * c.y) - (c.x * a.y - a.x * c.y) + (b.x * a.y - a.x * b.y);
                };
                /**
                 * 判断点是否在一个矩形范围内（矩形可旋转）点必须是顺时针
                 * @param	a		点a
                 * @param	b		点b
                 * @param	c		点c
                 * @param	d		点d
                 * @param	p		点坐标
                 * @return	是否在一个矩形范围内
                 */
                MathUtil.isInsideSquare = function (a, b, c, d, p) {
                    if (MathUtil.triangleArea(a, b, p) > 0 || MathUtil.triangleArea(b, c, p) > 0 || MathUtil.triangleArea(c, d, p) > 0 || MathUtil.triangleArea(d, a, p) > 0)
                        return false;
                    return true;
                };
                /**
                 * 求线段交点	参考（http://fins.iteye.com/blog/1522259）
                 * @param	a		线段A的顶点1
                 * @param	b		线段A的顶点2
                 * @param	c		线段B的顶点1
                 * @param	d		线段B的顶点2
                 * @return	交点
                 */
                MathUtil.segmentsIntr = function (a, b, c, d) {
                    // 三角形abc 面积的2倍
                    var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
                    // 三角形abd 面积的2倍
                    var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
                    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
                    if (area_abc * area_abd >= 0) {
                        return null;
                    }
                    // 三角形cda 面积的2倍
                    var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
                    // 三角形cdb 面积的2倍
                    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
                    var area_cdb = area_cda + area_abc - area_abd;
                    if (area_cda * area_cdb >= 0) {
                        return null;
                    }
                    //计算交点坐标
                    var t = area_cda / (area_abd - area_abc);
                    var dx = t * (b.x - a.x);
                    var dy = t * (b.y - a.y);
                    return new egret.Point(a.x + dx, a.y + dy);
                };
                /**
                 * 获取角度象限值
                 * @param	angle	角度
                 * @return	象限值
                 */
                MathUtil.getAngleQuadrant = function (angle) {
                    angle = MathUtil.fixAngle(angle);
                    if (angle >= 0 && angle < 90)
                        return 1;
                    if (angle >= 90 && angle < 180)
                        return 2;
                    if (angle >= 180 && angle < 270)
                        return 3;
                    return 4;
                };
                return MathUtil;
            })();
            utils.MathUtil = MathUtil;
            MathUtil.prototype.__class__ = "cn.geckos.utils.MathUtil";
        })(utils = geckos.utils || (geckos.utils = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=MathUtil.js.map