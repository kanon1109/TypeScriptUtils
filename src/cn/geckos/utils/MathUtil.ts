/**
 * Created by kanon on 2015/7/8.
 */
module cn.geckos.utils
{
export class MathUtil
{
    /**
     * 弧度转换成角度  radians -> degrees
     *
     * @param radians 弧度
     * @return 相应的角度
     */
    public static rds2dgs(radians:number):number
    {
        return MathUtil.fixAngle(radians * 180 / Math.PI);
    }


    /**
     * 角度转换成弧度 degrees -> radians
     *
     * @param degrees 角度
     * @return 相应的弧度
     */
    public static dgs2rds(degrees:number):number
    {
        return degrees * Math.PI / 180;
    }


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
    public static fixAngle(angle:number):number
    {
        angle %= 360;
        if (angle < 0) return angle + 360;
        return angle;
    }

    /**
     * 修正数字 在一个范围内
     * @param	num     需要修正的数字
     * @param	min     最小的范围
     * @param	range   最大范围
     * @return  修正后的数字
     */
    public static fixNumber(num:number, min:number, range:number):number
    {
        num %= range;
        if (num < min)
            return num + range;
        return num;
    }


    /**
     * 修正半角
     * @param	angle	需要修正的角度
     * @return	修正半角后的角度
     */
    public static fixHalfAngle(angle:number):number
    {
        angle %= 180;
        if (angle < 0)
            return angle + 180;
        return angle;
    }

    /**
     * 求取阶乘
     * @param	num		需要求阶乘的数组
     * @return
     */
    public static getFactorial(num:number):number
    {
        if(num <= 0) return 1;
        return num * MathUtil.getFactorial(num - 1);
    }


    /**
     * 求乘方
     * @param	num
     * @param	pow  乘方的次数
     * @return
     */
    public static power(num:number, pow:number):number
    {
        if(pow <= 0) return 1;
        return num * MathUtil.power(num, pow - 1);
    }


    /**
     * 对一个数保留指定的小数位数, 然后四舍五入
     * @param	num
     * @param	interval 保留小数点后几位
     * @return  返回一个指定保留小数位的数(四舍五入)
     */
    public static round(num:number, interval:number = .1):number
    {
        return Math.round(num / interval) * interval;
    }


    /**
     * 对一个数保留指定的小数位数, 然后向下取整
     * @param	num
     * @param	interval 保留小数点后几位
     * @return  返回一个指定保留小数位的数(向下取整)
     */
    public static floor(num:number, interval:number = .1):number
    {
        return Math.floor(num / interval) * interval;
    }


    /**
     * 对一个数保留指定的小数位数, 然后向上取整
     * @param	num
     * @param	interval 保留小数点后几位
     * @return  返回一个指定保留小数位的数(向上取整)
     */
    public static ceil(num:number, interval:number = .1):number
    {
        return Math.ceil(num / interval) * interval;
    }

    /**
     * 返回num的绝对值
     * @param	num
     * @return  返回参数num的绝对值
     */
    public static getAbsolute(num:number):number
    {
        return num < 0 ? -num : num;
    }


    /**
     * 返回参数mainNum除以divided的余数
     * @param	mainNum
     * @param	divided
     * @return  返回参数mainNum除以divided的余数
     */
    public static getRemainedNum(mainNum:number, divided:number):number
    {
        return mainNum - ((mainNum / divided) >> 0) * divided;
    }

    /**
     * 判断参数num是否是偶数
     * @param	num
     * @return  判断参数num是否是偶数
     */
    public static isEven(num:number):boolean
    {
        if(MathUtil.isEvenByDivided(num, 2) == 0) return true;
        return false;
    }


    /**
     * 得到num除以divided后得到的余数
     * @param	num
     * @param	divided
     * @return
     */
    public static isEvenByDivided(num:number, divided:number):number
    {
        return num & (divided - 1);
    }

    /**
     * 斜率公式
     * @param	x1 坐标点1x坐标
     * @param	y1 坐标点1y坐标
     * @param	x2 坐标点2x坐标
     * @param	y2 坐标点2y坐标
     * @return  相应的斜率
     */
    public static getSlope(x1:number, y1:number, x2:number, y2:number):number
    {
        var slope:number = (y1 - y2) / (x1 - x2);
        return slope;
    }


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
    public static threeSidesMathAngle(a:number, b:number, c:number):Object
    {
        var cosA:number = (c * c + b * b - a * a) / (2 * b * c);
        var A:number = Math.round(MathUtil.rds2dgs(Math.acos(cosA)));

        var cosB:number = (a * a + c * c - b * b) / (2 * a * c);
        var B:number = Math.round(MathUtil.rds2dgs(Math.acos(cosB)));

        var cosC:number = (a * a + b * b - c * c) / (2 * a * b);
        var C:number = Math.round(MathUtil.rds2dgs(Math.acos(cosC)));

        return { "A":A, "B":B, "C":C };
    }


    /**
     * 正弦公式
     * a/sinA=b/sinB=c/sinC=2R
     * 已知一个角度以及角度对应的边长 可以求出三角外接圆半径R的2倍
     * @param	angle               弧度
     * @param	line                弧度应的变长
     * @return  三角外接圆半径R
     */
    public static sineLaw(angle:number, line:number):number
    {
        return line / Math.sin(angle) / 2;
    }


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
    public static rotate(cx:number, cy:number,
                          x:number, y:number,
                          sin:number, cos:number,
                          reverse:boolean):egret.Point
    {
        var point:egret.Point = new egret.Point();
        var dx:number = x - cx;
        var dy:number = y - cy;
        if (reverse)
        {
            point.x = dx * cos + dy * sin + cx;
            point.y = dy * cos - dx * sin + cy;
        }
        else
        {
            point.x = dx * cos - dy * sin + cx;
            point.y = dy * cos + dx * sin + cy;
        }
        return point;
    }


    /**
     * 求出直角坐标系 三角形的重心
     * @param	a      三角形顶点a
     * @param	b      三角形顶点b
     * @param	c      三角形顶点c
     * @return  三角形的重心
     */
    public static triangleCentroid(a:egret.Point, b:egret.Point, c:egret.Point):egret.Point
    {
        return new egret.Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);
    }


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
    public static triangleCircumscribedCircleCenter(a:egret.Point,
                                                    b:egret.Point,
                                                    c:egret.Point):egret.Point
    {
        var axp:number = Math.pow(a.x, 2);
        var bxp:number = Math.pow(b.x, 2);
        var cxp:number = Math.pow(c.x, 2);

        var ayp:number = Math.pow(a.y, 2);
        var byp:number = Math.pow(b.y, 2);
        var cyp:number = Math.pow(c.y, 2);

        var x:number = ((b.y - a.y) * (cyp - ayp + cxp - axp) - (c.y - a.y) * (byp - ayp + bxp - axp)) /
            (2 * (c.x - a.x) * (b.y - a.y) - 2 * ((b.x - a.x) * (c.y - a.y)));

        var y:number = ((b.x - a.x) * (cxp - axp + cyp - ayp) - (c.x - a.x) * (bxp - axp + byp - ayp)) /
            (2 * (c.y - a.y) * (b.x - a.x) - 2 * ((b.y - a.y) * (c.x - a.x)));
        return new egret.Point(x, y);
    }


    /**
     * 根据项数和公差求出等差数列项数所对应的值
     * @param	sn  n项的和
     * @param	d   公差
     * @return  项数所对应的值
     */
    public static arithmeticSequenceIndexValue(sn:number, d:number):number
    {
        sn = Math.floor(sn);
        d = Math.floor(d);
        var n:number = Math.floor(MathUtil.arithmeticSequenceIndex(sn, d));
        return (n + 1) * d - (d - 1);
    }


    /**
     * 根据数列的和求出等差数列项的次数
     * @param	sn  n项的和
     * @param	d   公差
     * @return  项的次数
     */
    public static arithmeticSequenceIndex(sn:number, d:number):number
    {
        //前n项和公式为：Sn=n×a1+n×(n-1)×(d/2);
        //等差数列分解因式公式
        //d/2×n^2-(1-d/2)×n-dis = 0
        //一元二次方程表示法 ax^2+bx+c = 0;
        //一元二次方程 带入公式法  x = -b+Math.sqrt(b^2-4ac)/2a;
        var hd:number = d * .5;
        var a:number = hd;
        var b:number = 1 - hd;
        var c:number = Math.floor(-sn);
        return ( -b + Math.sqrt(b * b - (4 * a * c))) / (2 * a);
    }


    /**
     * 计算距离
     * @param	x1	点1的x坐标
     * @param	y1	点1的y坐标
     * @param	x2	点2的x坐标
     * @param	y2	点2的y坐标
     * @return	2点之间的距离
     */
    public static distance(x1:number, y1:number, x2:number, y2:number):number
    {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }


    /**
     * 判断点是否在任意三角形内部
     * @param	a		三角形点a
     * @param	b		三角形点b
     * @param	c		三角形点c
     * @param	p		点
     * @return	是否在三角形内部
     */
    public static isInsideTriangle(a:egret.Point, b:egret.Point, c:egret.Point, p:egret.Point):boolean
    {
        var planeAB:number = (a.x - p.x) * (b.y - p.y) - (b.x - p.x) * (a.y - p.y);
        var planeBC:number = (b.x - p.x) * (c.y - p.y) - (c.x - p.x) * (b.y - p.y);
        var planeCA:number = (c.x - p.x) * (a.y - p.y) - (a.x - p.x) * (c.y - p.y);
        return MathUtil.sign(planeAB) == MathUtil.sign(planeBC) && MathUtil.sign(planeBC) == MathUtil.sign(planeCA);
    }

    private static sign(n:number):number
    {
        return Math.floor(Math.abs(n) / n);
    }


    /**
     * 求三角形面积
     * @param	a		点a
     * @param	b		点b
     * @param	c		点c
     * @return	面积
     */
    public static triangleArea(a:egret.Point, b:egret.Point, c:egret.Point):number
    {
        return (c.x * b.y - b.x * c.y) - (c.x * a.y - a.x * c.y) + (b.x * a.y - a.x * b.y);
    }

    /**
     * 判断点是否在一个矩形范围内（矩形可旋转）点必须是顺时针
     * @param	a		点a
     * @param	b		点b
     * @param	c		点c
     * @param	d		点d
     * @param	p		点坐标
     * @return	是否在一个矩形范围内
     */
    public static isInsideSquare(a:egret.Point, b:egret.Point,
                                 c:egret.Point, d:egret.Point,
                                 p:egret.Point):boolean
    {
        if (MathUtil.triangleArea(a, b, p) > 0 ||
            MathUtil.triangleArea(b, c, p) > 0 ||
            MathUtil.triangleArea(c, d, p) > 0 ||
            MathUtil.triangleArea(d, a, p) > 0)
            return false;
        return true;
    }


    /**
     * 求线段交点	参考（http://fins.iteye.com/blog/1522259）
     * @param	a		线段A的顶点1
     * @param	b		线段A的顶点2
     * @param	c		线段B的顶点1
     * @param	d		线段B的顶点2
     * @return	交点
     */
    public static segmentsIntr(a:egret.Point, b:egret.Point, c:egret.Point, d:egret.Point):egret.Point
    {
        // 三角形abc 面积的2倍
        var area_abc:number = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);

        // 三角形abd 面积的2倍
        var area_abd:number = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);
        if ( area_abc * area_abd >= 0 )
        {
            return null;
        }

        // 三角形cda 面积的2倍
        var area_cda:number = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        // 三角形cdb 面积的2倍
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.
        var area_cdb:number = area_cda + area_abc - area_abd;
        if (  area_cda * area_cdb >= 0 )
        {
            return null;
        }

        //计算交点坐标
        var t:number = area_cda / ( area_abd - area_abc );
        var dx:number = t * (b.x - a.x);
        var dy:number = t * (b.y - a.y);
        return new egret.Point(a.x + dx , a.y + dy);
    }


    /**
     * 获取角度象限值
     * @param	angle	角度
     * @return	象限值
     */
    public static getAngleQuadrant(angle:number):number
    {
        angle = MathUtil.fixAngle(angle);
        if (angle >= 0 && angle < 90) return 1;
        if (angle >= 90 && angle < 180) return 2;
        if (angle >= 180 && angle < 270) return 3;
        return 4;
    }

    /**
	 * 将数字四舍五入为输入的最接近的倍数。 例如，四舍五入
	 * 16到最接近的10，您将收到20.类似于内置函数Math.round（）。
	 * @param	number		需要四舍五入的数字
	 * @param	nearest		必须找到其倍数的数字
	 * @return	接近的倍数
	 */
	public static roundToNearest(number:number, nearest:number = 1):number
	{
		if(nearest == 0) return number;
		var roundednumber:number = Math.round(MathUtil.roundToPrecision(number / nearest, 10)) * nearest;
		return MathUtil.roundToPrecision(roundednumber, 10);
	}
	
	/**
	 * 四舍五入到一定的精确度。 用于限制数量
	 * 小数部分的小数位数。
	 * @param	number		输入数字四舍五入。
	 * @param	precision	要保留的小数位数
	 * @return	如果不需要舍入，则舍入数字或原始输入
	 */
	public static roundToPrecision(number:number, precision:number = 0):number
	{
		var decimalPlaces:number = Math.pow(10, precision);
		return Math.round(decimalPlaces * number) / decimalPlaces;
	}
	
	/**
     * 获取向量与向量之间的夹角
     * @param    p1 向量对象
     * @param    p2 向量对象
     * @param    degrees 指定是否返回角度值，默认为true
     * @reutrn   如果degrees为true，则返回向量夹角的角度值，否则返回向量夹角的弧度值。
     */
    public static angleBetween(p1:egret.Point, p2:egret.Point, degrees:Boolean = true):number
    {
        var dx:number = p1.x - p2.x;
        var dy:number = p1.y - p2.y;
        var radians:number =  Math.atan2(dy, dx);
        if (degrees) return MathUtil.rds2dgs(radians);
        return radians;
    }

    /**
     * 获取向量与向量之间的夹角
     * @param    originX 原点位置x
     * @param    originY 原点位置y
     * @param    targetX 目标位置x
     * @param    targetY 目标位置y
     * @param    degrees 指定是否返回角度值，默认为true
     * @reutrn   如果degrees为true，则返回向量夹角的角度值，否则返回向量夹角的弧度值。
     */
    public static angleBetween2(originX:number, originY:number, 
                                targetX:number, targetY:number, degrees:Boolean = true):number
    {
        var dx:number = (originX - targetX);
		var dy:number = (originY - targetY);
        var radians:number =  Math.atan2(dy, dx);
        if (degrees) return MathUtil.rds2dgs(radians);
        return radians;
    }

    /**
	 * 在数字后面格式化为 k，m，b，t，q，Q，s，S
	 * @param	value		需要格式化的数字
	 * @param	interval	保留小数点 
	 * @return	返回格式化后的字符串形式数字
	 */
	public static convertNumber(value:number, interval:number = .1):string
	{
		var arr:string[] = ["k", "m", "b", "t", "q", "Q", "s", "S"];
		var num:number = Math.pow(10, 24);
		var multi:number = 1000;
		for(var i:number = arr.length - 1; i >= 0; --i)
		{
			if(value > num) return MathUtil.round((value / num), interval).toString() + arr[i];
			num /= multi;
		}
        return Math.round(value).toString();
	}

    /**
	 * 缓动角度跟随
	 */
	public static rotateEase(originRot:number, 
                             originX:number, originY:number, 
                             targetX:number, targetY:number, 
                             ease:number = .2):number
	{
		var dx:number = (originX - targetX);
		var dy:number = (originY - targetY);
		var r:number = Math.atan2(dy, dx);//通过两点间的角度获取
		
		var targetRotation:number = r * 180 / Math.PI;
		if (targetRotation > originRot + 180) targetRotation -= 360;
		if (targetRotation < originRot - 180) targetRotation += 360;
		return (targetRotation - originRot) * ease;
	}
    
    /**
     * 给定两个有公共端点的矢量 (px0, py0, px1, py1), (px0, py0, px2, py2) 获取两个点的位置关系
     * @reutrn   如果为>0，说明在顺时针位置（右边），
     *           如果为<0，在逆时针（左边）
     *           如果为==0，则p1和p2共线，方向相同或相反 
     */
    public static checkPointDirection(px0:number, py0:number, 
                                      px1:number, py1:number,
                                      px2:number, py2:number):number
    {
        //以p0为原点建立坐标系，那么P1 = p1 - p0, P2 = p2 - p0,
        //它们的叉积t = (p1 - p0) * (p2 - p0) = (px1 - px0) * (py2 - py0) - (px2 - px0) * (py1 - py0);
        let t:number = (px1 - px0) * (py2 - py0) - (px2 - px0) * (py1 - py0);
        if(t > 0) return 1;
        else if(t < 0) return -1
        return 0
    }

    /**
	 * 判断 点 是否在 多边形 范围内
	 * @param point 点x,y 
	 * @param ps 多边形顶点数组
	 * @returns boolean
	 */
	public static isInPolygon(point:{x:number, y:number}, ps:Array<{x:number, y:number}>):boolean
    {
		//http://www.html-js.com/article/1528
		var px = point.x, py = point.y, flag = false
		for(var i = 0, l = ps.length, j = l - 1; i < l; j = i, i++) 
        {
			var sx = ps[i].x, sy = ps[i].y, tx = ps[j].x, ty = ps[j].y
			// 点与多边形顶点重合
			if((sx === px && sy === py) || (tx === px && ty === py)) 
				return true;
            
			// 判断线段两端点是否在射线两侧
			if((sy < py && ty >= py) || (sy >= py && ty < py)) 
            {
				// 线段上与射线 Y 坐标相同的点的 X 坐标
				var x = sx + (py - sy) * (tx - sx) / (ty - sy)
				if(x === px) {// 点在多边形的边上
					return true;
				}
				if(x > px) {// 射线穿过多边形的边界
					flag = !flag
				}
			}
		}
		return flag;
    }

    /**
     * 计算点到直线的距离。如果这是一条线段并且垂足不在线段内，则会计算点到线段端点的距离。
     * @method pointLineDistance
     * @param point - The point
     * @param start - The start point of line
     * @param end - The end point of line
     * @param isSegment - whether this line is a segment
     * @return {number}
     */
    public static pointLineDistance(point:egret.Point, start:egret.Point, end:egret.Point, isSegment:boolean):number 
    {
        var dx:number = end.x - start.x;
        var dy:number = end.y - start.y;
        var d:number = dx*dx + dy*dy;
        var t:number = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
        var p:egret.Point;
        if (!isSegment) {
            p = new egret.Point(start.x + t * dx, start.y + t * dy);
        }
        else 
        {
            if (d) 
            {
                if (t < 0) p = start;
                else if (t > 1) p = end;
                else p = new egret.Point(start.x + t * dx, start.y + t * dy);
            }
            else 
            {
                p = start;
            }
        }
        dx = point.x - p.x;
        dy = point.y - p.y;
        return Math.sqrt(dx*dx + dy*dy);
    }


    /**
	 * 根据坐标计算这个坐标形成的图形的尺寸高宽
	 * @param	path 路径列表 二维数组[[x,y],[x,y]]
	 * @return  尺寸对象
	 */
	public static mathSizeByPath(path:number[][]):any
	{
		let minX:number;
		let maxX:number;
		let minY:number;
		let maxY:number;
		let length:number = path.length;
		for (let i:number = 0; i < length; i += 1) 
		{
			let posX:number = path[i][0];
			let posY:number = path[i][1];
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
		let width:number = (maxX - minX);
		let height:number = (maxY - minY);
		return { "width":width, "height":height, 
				 "minX":minX, "maxX":maxX,
				 "minY":minY, "maxY":maxY };
	}
	
	/**
	 * 查找多边形的中心
	 * @param	vs    	   多边形顶点坐标
	 * @param	count      顶点数量
	 * @return  中心坐标
	 */
    public static findCentroid(vs:egret.Point[], count:number):egret.Point
	{
		let c:egret.Point = new egret.Point();
		let area:number = 0.0;
		let p1X:number = 0.0;
		let p1Y:number = 0.0;
		let inv3:number = 1.0 / 3.0;
		for (let i:number = 0; i < count; ++i)
		{
			let p2:egret.Point = vs[i];
			let p3:egret.Point = i + 1 < count ? vs[i + 1] : vs[0];
			let e1X:number = p2.x - p1X;
			let e1Y:number = p2.y - p1Y;
			let e2X:number = p3.x - p1X;
			let e2Y:number = p3.y - p1Y;
			let d:number = (e1X * e2Y - e1Y * e2X);
			let triangleArea:number = 0.5 * d;
			area += triangleArea;
			c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
			c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
		}
		c.x *= 1.0 / area;
		c.y *= 1.0 / area;
		return c;
	}

    /**
     * 瞄准线公式
     * s = v_x * t
     * h = v_y * t + 0.5 * a * t * t
     * @param	sx    	起始x
	 * @param	sy      起始y
     * @param	vx    	向量x
	 * @param	vy      向量y
	 * @param	a       加速度
	 * @param	count   数量
	 * @param	dt      时间间隔
     * @param	back    回调
     */
    public static paraCurve(sx:number, sy:number, 
                     vx:number, vy:number, 
                     a:number,
                     count:number, 
                     dt:number=.1,
                     back?:(x:number, y:number)=>void):void
    {
        // s = v_x * t
        // h = v_y * t + 0.5 * a * t * t
        for(let i:number = 0; i < count; i++)
        {
            let time:number = dt * i;
            console.log(time);
            let tx:number = sx + vx * time;
            let ty:number = sy + vy * time + .5 * a * time * time;
            if(back) back.call(this, tx, ty);
        }

    }

}
}