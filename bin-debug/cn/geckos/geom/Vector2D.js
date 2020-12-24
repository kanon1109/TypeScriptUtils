var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/9.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var geom;
        (function (geom) {
            /**
             * 2D 向量，
             * 取自 Keith Peters 的 《AdvanceED ActionScript Animation》一书第二章的Vector2D类，略有修改
             */
            var Vector2D = (function () {
                function Vector2D(x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this._x = x;
                    this._y = y;
                }
                Object.defineProperty(Vector2D.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (value) {
                        this._x = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2D.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (value) {
                        this._y = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2D.prototype, "length", {
                    /**
                     * 向量长度，如果改变向量长度，x y 值也会随着改变，但是不会影响角度。
                     */
                    get: function () {
                        return Math.sqrt(this._x * this._x + this._y * this._y);
                    },
                    set: function (value) {
                        var a = this.getAngle(false);
                        this._x = Math.cos(a) * value;
                        this._y = Math.sin(a) * value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2D.prototype, "perp", {
                    /**
                     * 得到与当前向量成90度夹角的向量，即法向量。
                     *
                     * @return 当前向量的法向量。
                     */
                    get: function () {
                        return new Vector2D(-this._y, this._x);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 返回此向量的副本。
                 */
                Vector2D.prototype.clone = function () {
                    return new Vector2D(this._x, this._y);
                };
                /**
                 * 获取当前向量与另一个向量之间的距离
                 *
                 * @param v 另一个向量对象
                 * @reutrn 当前向量与v2之间的距离
                 */
                Vector2D.prototype.dist = function (v) {
                    var dx = v.x - this._x;
                    var dy = v.y - this._y;
                    return Math.sqrt(dx * dx + dy * dy);
                };
                /**
                 *  获取当前向量与另一个向量之间的夹角
                 * @param    v 另一个向量对象
                 * @param    degrees 指定是否返回角度值，默认为true
                 * @reutrn  如果degrees为true，则返回向量夹角的角度值，否则返回向量夹角的弧度值。
                 */
                Vector2D.prototype.angleBetween = function (v, degrees) {
                    if (degrees === void 0) { degrees = true; }
                    var dx = this._x - v.x;
                    var dy = this._y - v.y;
                    var radians = Math.atan2(dy, dx);
                    if (degrees)
                        return cn.geckos.utils.MathUtil.rds2dgs(radians);
                    return radians;
                };
                /**
                 * 检测当前向量与另一个向量的值是否相等。
                 *
                 * @param v 另一个向量对象
                 * @return 若当前向量的 x与v.x相等并且y与v.y相等则返回true，否则返回false。
                 */
                Vector2D.prototype.equals = function (v) {
                    return this._x == v.x && this._y == v.y;
                };
                //
                //  角度/弧度
                //
                /**
                 * 获取向量的角度或弧度
                 *
                 * @param degrees 指定是否返回角度值，默认为true
                 *
                 * @return 如果degrees为true，则返回向量的角度值，否则返回向量的弧度值
                 */
                Vector2D.prototype.getAngle = function (degrees) {
                    if (degrees === void 0) { degrees = true; }
                    var radians = Math.atan2(this._y, this._x);
                    if (degrees)
                        return cn.geckos.utils.MathUtil.rds2dgs(radians);
                    return radians;
                };
                /**
                 * 设置向量的角度或弧度
                 *
                 * @param degressOrRadians 弧度或角度值
                 * @param degrees 指示 degressOrRadians 参数是否为角度，若为true， degressOrRadians
                 *                则被认视为角度值，否则被视为弧度值，默认为true。
                 */
                Vector2D.prototype.setAngle = function (degressOrRadians, degress) {
                    if (degress === void 0) { degress = true; }
                    if (degress)
                        degressOrRadians = cn.geckos.utils.MathUtil.dgs2rds(degressOrRadians);
                    var len = this.length;
                    this._x = Math.cos(degressOrRadians) * len;
                    this._y = Math.sin(degressOrRadians) * len;
                };
                /**
                 * 向量加法，将另一个向量对象与当前向量相加。
                 *
                 * @param v 另一个向量对象
                 */
                Vector2D.prototype.add = function (v) {
                    this._x += v.x;
                    this._y += v.y;
                };
                /**
                 * 点积，返回当前向量对象与另一向量的点积。
                 *
                 * @param v 另一向量对象
                 *
                 * @return 当前向量与向量v的点积值
                 */
                Vector2D.prototype.dot = function (v) {
                    return this._x * v.x + this._y * v.y;
                };
                /**
                 * 向量旋转
                 * @param	angle 角度
                 */
                Vector2D.prototype.rotate = function (angle) {
                    var cos = Math.cos(cn.geckos.utils.MathUtil.dgs2rds(angle));
                    var sin = Math.sin(cn.geckos.utils.MathUtil.dgs2rds(angle));
                    var rx = this.x * cos - this.y * sin;
                    var ry = this.x * sin + this.y * cos;
                    this.x = rx;
                    this.y = ry;
                };
                /**
                 * 根据公式 两向量的点积为0则两个向量垂直
                 * @param	v 向量
                 * @return  是否垂直
                 */
                Vector2D.prototype.isPerpTo = function (v) {
                    return (this.dot(v) == 0);
                };
                /**
                 * 求2个向量的中点坐标公式
                 * @param	v  向量
                 * @return  中心坐标
                 */
                Vector2D.prototype.centerPoint = function (v) {
                    var x = (v.x + this._x) / 2;
                    var y = (v.y + this._y) / 2;
                    return new Vector2D(x, y);
                };
                /**
                 * 截取当前向量
                 * @param	max
                 * @return
                 */
                Vector2D.prototype.truncate = function (max) {
                    this.length = Math.min(max, this.length);
                    return this;
                };
                /**
                 * 反转向量
                 * @return
                 */
                Vector2D.prototype.reverse = function () {
                    this._x = -this._x;
                    this._y = -this._y;
                    return this;
                };
                /**
                 * 叉乘   叉乘=0同一条线上
                 * @param	v2
                 * @return
                 */
                Vector2D.prototype.crossProd = function (v2) {
                    return this._x * v2.y - this._y * v2.x;
                };
                /**
                 * 点积法获取这个向量的方向
                 * @return int 如果在左边返回-1. 如果在右边返回+1.
                 */
                Vector2D.prototype.sign = function (v2) {
                    return this.perp.dot(v2) < 0 ? -1 : 1;
                };
                /**
                 * 描述向量实例的字符窜
                 */
                Vector2D.prototype.tostring = function () {
                    return "[Vector2D (x:" + this._x + ", " + "y:" + this._y + ")]";
                };
                return Vector2D;
            }());
            geom.Vector2D = Vector2D;
            __reflect(Vector2D.prototype, "cn.geckos.geom.Vector2D");
        })(geom = geckos.geom || (geckos.geom = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=Vector2D.js.map