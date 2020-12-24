var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
                    var x = ((b.y - a.y) * (cyp - ayp + cxp - axp) - (c.y - a.y) * (byp - ayp + bxp - axp)) /
                        (2 * (c.x - a.x) * (b.y - a.y) - 2 * ((b.x - a.x) * (c.y - a.y)));
                    var y = ((b.x - a.x) * (cxp - axp + cyp - ayp) - (c.x - a.x) * (bxp - axp + byp - ayp)) /
                        (2 * (c.y - a.y) * (b.x - a.x) - 2 * ((b.y - a.y) * (c.x - a.x)));
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
                    if (MathUtil.triangleArea(a, b, p) > 0 ||
                        MathUtil.triangleArea(b, c, p) > 0 ||
                        MathUtil.triangleArea(c, d, p) > 0 ||
                        MathUtil.triangleArea(d, a, p) > 0)
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
                /**
                 * 将数字四舍五入为输入的最接近的倍数。 例如，四舍五入
                 * 16到最接近的10，您将收到20.类似于内置函数Math.round（）。
                 * @param	number		需要四舍五入的数字
                 * @param	nearest		必须找到其倍数的数字
                 * @return	接近的倍数
                 */
                MathUtil.roundToNearest = function (number, nearest) {
                    if (nearest === void 0) { nearest = 1; }
                    if (nearest == 0)
                        return number;
                    var roundednumber = Math.round(MathUtil.roundToPrecision(number / nearest, 10)) * nearest;
                    return MathUtil.roundToPrecision(roundednumber, 10);
                };
                /**
                 * 四舍五入到一定的精确度。 用于限制数量
                 * 小数部分的小数位数。
                 * @param	number		输入数字四舍五入。
                 * @param	precision	要保留的小数位数
                 * @return	如果不需要舍入，则舍入数字或原始输入
                 */
                MathUtil.roundToPrecision = function (number, precision) {
                    if (precision === void 0) { precision = 0; }
                    var decimalPlaces = Math.pow(10, precision);
                    return Math.round(decimalPlaces * number) / decimalPlaces;
                };
                /**
                 * 获取向量与向量之间的夹角
                 * @param    p1 向量对象
                 * @param    p2 向量对象
                 * @param    degrees 指定是否返回角度值，默认为true
                 * @reutrn   如果degrees为true，则返回向量夹角的角度值，否则返回向量夹角的弧度值。
                 */
                MathUtil.angleBetween = function (p1, p2, degrees) {
                    if (degrees === void 0) { degrees = true; }
                    var dx = p1.x - p2.x;
                    var dy = p1.y - p2.y;
                    var radians = Math.atan2(dy, dx);
                    if (degrees)
                        return MathUtil.rds2dgs(radians);
                    return radians;
                };
                /**
                 * 获取向量与向量之间的夹角
                 * @param    originX 原点位置x
                 * @param    originY 原点位置y
                 * @param    targetX 目标位置x
                 * @param    targetY 目标位置y
                 * @param    degrees 指定是否返回角度值，默认为true
                 * @reutrn   如果degrees为true，则返回向量夹角的角度值，否则返回向量夹角的弧度值。
                 */
                MathUtil.angleBetween2 = function (originX, originY, targetX, targetY, degrees) {
                    if (degrees === void 0) { degrees = true; }
                    var dx = (originX - targetX);
                    var dy = (originY - targetY);
                    var radians = Math.atan2(dy, dx);
                    if (degrees)
                        return MathUtil.rds2dgs(radians);
                    return radians;
                };
                /**
                 * 在数字后面格式化为 k，m，b，t，q，Q，s，S
                 * @param	value		需要格式化的数字
                 * @param	interval	保留小数点
                 * @return	返回格式化后的字符串形式数字
                 */
                MathUtil.convertNumber = function (value, interval) {
                    if (interval === void 0) { interval = .1; }
                    var arr = ["k", "m", "b", "t", "q", "Q", "s", "S"];
                    var num = Math.pow(10, 24);
                    var multi = 1000;
                    for (var i = arr.length - 1; i >= 0; --i) {
                        if (value > num)
                            return MathUtil.round((value / num), interval).toString() + arr[i];
                        num /= multi;
                    }
                    return Math.round(value).toString();
                };
                /**
                 * 缓动角度跟随
                 */
                MathUtil.rotateEase = function (originRot, originX, originY, targetX, targetY, ease) {
                    if (ease === void 0) { ease = .2; }
                    var dx = (originX - targetX);
                    var dy = (originY - targetY);
                    var r = Math.atan2(dy, dx); //通过两点间的角度获取
                    var targetRotation = r * 180 / Math.PI;
                    if (targetRotation > originRot + 180)
                        targetRotation -= 360;
                    if (targetRotation < originRot - 180)
                        targetRotation += 360;
                    return (targetRotation - originRot) * ease;
                };
                /**
                 * 给定两个有公共端点的矢量 (px0, py0, px1, py1), (px0, py0, px2, py2) 获取两个点的位置关系
                 * @reutrn   如果为>0，说明在顺时针位置（右边），
                 *           如果为<0，在逆时针（左边）
                 *           如果为==0，则p1和p2共线，方向相同或相反
                 */
                MathUtil.checkPointDirection = function (px0, py0, px1, py1, px2, py2) {
                    //以p0为原点建立坐标系，那么P1 = p1 - p0, P2 = p2 - p0,
                    //它们的叉积t = (p1 - p0) * (p2 - p0) = (px1 - px0) * (py2 - py0) - (px2 - px0) * (py1 - py0);
                    var t = (px1 - px0) * (py2 - py0) - (px2 - px0) * (py1 - py0);
                    if (t > 0)
                        return 1;
                    else if (t < 0)
                        return -1;
                    return 0;
                };
                /**
                 * 判断 点 是否在 多边形 范围内
                 * @param point 点x,y
                 * @param ps 多边形顶点数组
                 * @returns boolean
                 */
                MathUtil.isInPolygon = function (point, ps) {
                    //http://www.html-js.com/article/1528
                    var px = point.x, py = point.y, flag = false;
                    for (var i = 0, l = ps.length, j = l - 1; i < l; j = i, i++) {
                        var sx = ps[i].x, sy = ps[i].y, tx = ps[j].x, ty = ps[j].y;
                        // 点与多边形顶点重合
                        if ((sx === px && sy === py) || (tx === px && ty === py))
                            return true;
                        // 判断线段两端点是否在射线两侧
                        if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
                            // 线段上与射线 Y 坐标相同的点的 X 坐标
                            var x = sx + (py - sy) * (tx - sx) / (ty - sy);
                            if (x === px) {
                                return true;
                            }
                            if (x > px) {
                                flag = !flag;
                            }
                        }
                    }
                    return flag;
                };
                /**
                 * 计算点到直线的距离。如果这是一条线段并且垂足不在线段内，则会计算点到线段端点的距离。
                 * @method pointLineDistance
                 * @param point - The point
                 * @param start - The start point of line
                 * @param end - The end point of line
                 * @param isSegment - whether this line is a segment
                 * @return {number}
                 */
                MathUtil.pointLineDistance = function (point, start, end, isSegment) {
                    var dx = end.x - start.x;
                    var dy = end.y - start.y;
                    var d = dx * dx + dy * dy;
                    var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
                    var p;
                    if (!isSegment) {
                        p = new egret.Point(start.x + t * dx, start.y + t * dy);
                    }
                    else {
                        if (d) {
                            if (t < 0)
                                p = start;
                            else if (t > 1)
                                p = end;
                            else
                                p = new egret.Point(start.x + t * dx, start.y + t * dy);
                        }
                        else {
                            p = start;
                        }
                    }
                    dx = point.x - p.x;
                    dy = point.y - p.y;
                    return Math.sqrt(dx * dx + dy * dy);
                };
                /**
                 * 根据坐标计算这个坐标形成的图形的尺寸高宽
                 * @param	path 路径列表 二维数组[[x,y],[x,y]]
                 * @return  尺寸对象
                 */
                MathUtil.mathSizeByPath = function (path) {
                    var minX;
                    var maxX;
                    var minY;
                    var maxY;
                    var length = path.length;
                    for (var i = 0; i < length; i += 1) {
                        var posX = path[i][0];
                        var posY = path[i][1];
                        if (isNaN(minX))
                            minX = posX;
                        else if (posX < minX)
                            minX = posX;
                        if (isNaN(maxX))
                            maxX = posX;
                        else if (posX > maxX)
                            maxX = posX;
                        if (isNaN(minY))
                            minY = posY;
                        else if (posY < minY)
                            minY = posY;
                        if (isNaN(maxY))
                            maxY = posY;
                        else if (posY > maxY)
                            maxY = posY;
                    }
                    var width = (maxX - minX);
                    var height = (maxY - minY);
                    return { "width": width, "height": height,
                        "minX": minX, "maxX": maxX,
                        "minY": minY, "maxY": maxY };
                };
                /**
                 * 查找多边形的中心
                 * @param	vs    	   多边形顶点坐标
                 * @param	count      顶点数量
                 * @return  中心坐标
                 */
                MathUtil.findCentroid = function (vs, count) {
                    var c = new egret.Point();
                    var area = 0.0;
                    var p1X = 0.0;
                    var p1Y = 0.0;
                    var inv3 = 1.0 / 3.0;
                    for (var i = 0; i < count; ++i) {
                        var p2 = vs[i];
                        var p3 = i + 1 < count ? vs[i + 1] : vs[0];
                        var e1X = p2.x - p1X;
                        var e1Y = p2.y - p1Y;
                        var e2X = p3.x - p1X;
                        var e2Y = p3.y - p1Y;
                        var d = (e1X * e2Y - e1Y * e2X);
                        var triangleArea = 0.5 * d;
                        area += triangleArea;
                        c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
                        c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
                    }
                    c.x *= 1.0 / area;
                    c.y *= 1.0 / area;
                    return c;
                };
                return MathUtil;
            }());
            utils.MathUtil = MathUtil;
            __reflect(MathUtil.prototype, "cn.geckos.utils.MathUtil");
        })(utils = geckos.utils || (geckos.utils = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=MathUtil.js.map