/**
 * Created by tangben on 2015/7/9.
 */
module geom
{
/////////////////////////////////////////
//
// LineSegment类(2D)
//
/////////////////////////////////////////
import MathUtil = utils.MathUtil;
export class LineSegment
{
    private static LINE_HORIZONTAL:string = "horizontal";//水平

    private static LINE_VERTICAL:string = "vertical";//垂直

    private static LINE_PARALLEL:string = "parallel";//平行

    private static LINE_OVERLAP:string = "overlap";//覆盖

    private static LINE_UNEXPECTED:string = "unexpected";//其它

    private startPoint:Vector2D;

    private endPoint:Vector2D;


    /**
     * 初始化
     * @param	sp
     * @param	ep
     */
    public constructor(sp:Vector2D, ep:Vector2D)
    {
        this.startPoint = sp;
        this.endPoint = ep;
    }


    /**
     * 获得该线段的截距(和y轴相交的点的y值)
     * @return
     */
    public getIntercept():number
    {
        var slope:number = this.getLineSlope();
        return this.endPoint.y - slope * this.endPoint.x;
    }



    /**
     * 获得一个线段的斜率
     * @return
     */
    public getLineSlope():number
    {
        var sp:Vector2D = this.startPoint;
        var ep:Vector2D = this.endPoint;
        return (ep.y - sp.y) / (ep.x - sp.x);
    }


    /**
     * 返回一个复制的line对象
     * @return
     */
    public clone():LineSegment
    {
        return new LineSegment(this.startPoint, this.endPoint);
    }


    /**
     * 输出起始点和结尾点
     * @return
     */
    public toString():String
    {
        return "startPoint-[" + this.startPoint + "]" + "::" +
               "endPoint-[" + this.endPoint + "]";
    }


    /**
     * 输出线段的数学表达式y = kx + b
     * @return
     */
    public toMathString():String
    {
        var slope:number = this.getLineSlope();
        var intercept:number = this.getIntercept();
        return "[" + "y = " + slope + "X" + " + " + intercept + "]";
    }


    /**
     * 判断线段是否是水平于x轴
     * @return
     */
    public isHorizontal():boolean
    {
        return (this.endPoint.y - this.startPoint.y) == 0;
    }


    /**
     * 判断线段是否是水平于y轴
     * @return
     */
    public isVertical():boolean
    {
        return (this.endPoint.x - this.startPoint.x) == 0;
    }


    /**
     * 检测2线条是否互相垂直
     * 对垂直线不起作用, 垂直的线会遇到(y / 0)的情况
     * @param	line
     * @return
     */
    public isPerpendicular(line:LineSegment):boolean
    {
        var slopeA:number = this.getLineSlope();
        var slopeB:number = line.getLineSlope();
        return (slopeA * slopeB) == -1;
    }

    /**
     * 判断2条线是否平行
     * 对垂直线不起作用, 垂直的线会遇到(y / 0)的情况
     * @param	line
     * @return
     */
    public isParallel(line:LineSegment):boolean
    {
        var slopA:number = this.getLineSlope();
        var slopB:number = line.getLineSlope();
        return (slopA == slopB);
    }


    /**
     * 求出2条线之间的夹角
     * 公式 tanA = |(k2-k1)/(1-k1*k2)| (0 < A < 90);
     * 对垂直线不起作用, 垂直的线会遇到(y / 0)的情况
     * @param	line  求出2条线之间的夹角
     * @param	degrees 是否返回角度值
     * @return
     */
    public angleBetween(line:LineSegment,degrees:boolean = true):number
    {
        var slopA:number = this.getLineSlope();
        var slopB:number = line.getLineSlope();
        var tanA:number = Math.abs((slopB - slopA) / (1 + slopA * slopB));
        var angle:number = Math.atan(tanA);
        if (degrees) angle = MathUtil.rds2dgs(angle);
        return angle;
    }

    /**
     * 如果已知改线段和参数line线段垂直, 取得改line线段的斜率
     * @param	line
     * @return
     */
    public getSibling(line:LineSegment):number
    {
        if(this.isPerpendicular(line))
        {
            return (-1 / this.getLineSlope());
        }
        return null;
    }


    /**
     * 取得另一条线段(垂直于己的2条线段)
     * @return
     */
    public getSiblingLine():Object
    {
        var oSlope:number = (-1 / this.getLineSlope());
        var tempA:Vector2D = this.startPoint;
        var tempB:Vector2D = this.endPoint;
        var tempLine:Object = {};
        var interceptA:number = tempA.y - oSlope * tempA.x;
        var interceptB:number = tempB.y - oSlope * tempB.x;
        var lineAStr:String = "[" + "y = " + oSlope + "X" + " + " + interceptA + "]";
        var lineBStr:String = "[" + "y = " + oSlope + "X" + " + " + interceptB + "]";
        tempLine["lineA"] = lineAStr;
        tempLine["lineB"] = lineBStr;
        return tempLine;
    }


    /**
     * 指定点是否在线条的轨迹上
     * @param	point
     * @return
     */
    public isInLineTrack(point:Vector2D):boolean
    {
        var slope:number = this.getLineSlope();
        var startPoint:Vector2D = this.startPoint;
        var endPoint:Vector2D = point;
        return Math.abs(((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x)) - slope)  < .0000001;
    }


    /**
     * 返回线段的斜率和截距
     * @return
     */
    public getLineObj():Object
    {
        return { slope:this.getLineSlope(), intercept:this.getIntercept() };
    }


    /**
     * 判断2线段是否有可能相交
     * @param	line
     * @return
     */
    public hasIntersection(line:LineSegment):boolean
    {
        var lineASlope:number = this.getLineSlope();
        var lineBSlope:number = line.getLineSlope();
        return lineASlope != lineBSlope;
    }


    /**
     * 取得2线段的基本关系
     * @return
     */
    public getRelation(line:LineSegment):String
    {
        if(this.isHorizontal() && line.isHorizontal())
        {
            return LineSegment.LINE_HORIZONTAL;
        }

        if(this.isVertical() && line.isVertical())
        {
            return LineSegment.LINE_VERTICAL;
        }

        if(this.getLineSlope() == line.getLineSlope())
        {
            return LineSegment.LINE_PARALLEL;
        }

        if(this.getLineObj()["slope"] == line.getLineObj()["slope"] &&
           this.getLineObj()["intercept"] == line.getLineObj()["intercept"])
        {
            return LineSegment.LINE_OVERLAP;
        }
        else
        {
            return LineSegment.LINE_UNEXPECTED;
        }
    }

    //TODO
    public isEqual(line:LineSegment):boolean
    {
        return (this.startPoint.equals(line.startPoint) &&
            this.endPoint.equals(line.endPoint)) ||
            (this.startPoint.equals(line.endPoint) &&
            this.endPoint.equals(line.startPoint));
    }

    /**
     * 获得2条线段的可能的相交点
     * @param	line
     * @return
     */
    public getIntersectionPoint(line:LineSegment):Vector2D
    {
        if(this.getRelation(line) != LineSegment.LINE_UNEXPECTED)
            return null;

        var lineA:Object = this.getLineObj();
        var lineB:Object = line.getLineObj();

        var slopeA:number = lineA["slope"];
        var slopeB:number = lineB["slope"];

        if (slopeA == -Infinity ||
            slopeA == Infinity)
        {
            //线段slopeA垂直 找到slopeB的交叉点
            if (slopeB == 0)
            {
                //另一条线为水平
                return new Vector2D(this.startPoint.x, line.startPoint.y);
            }
        }
        if (slopeB == -Infinity ||
            slopeB == Infinity)
        {
            //线段slopeB垂直 找到slopeA的交叉点
            if (slopeA == 0)
            {
                //另一条线为水平
                return new Vector2D(line.startPoint.x, this.startPoint.y);
            }
        }
        var interceptA:number = lineA["intercept"];
        var interceptB:number = lineB["intercept"];
        var tempX:number = (interceptB - interceptA) / (slopeA - slopeB);
        var tempY:number = slopeA * tempX + interceptA;
        return new Vector2D(tempX, tempY);
    }


    /**
     * 判断2条线段相交的点是否在这2条线段上
     * @param	line
     * @return
     */
    public isIntersection(line:LineSegment):boolean
    {
        var value:Vector2D = this.getIntersectionPoint(line);
        if (!value) return false;
        return this.isContainPoint(value);
    }


    /**
     * 判断一个点是否在指定的线段上
     * @param	point
     * @return
     */
    public isContainPoint(point:Vector2D):boolean
    {
        if(this.isHorizontal())
        {
            var hn:number = Math.min(this.startPoint.x, this.endPoint.x);
            var hx:number = Math.max(this.startPoint.x, this.endPoint.x);
            return (point.x <= hx && point.x >= hn) && (point.y == this.startPoint.y);
        }
        else if(this.isVertical())
        {
            var vn:number = Math.min(this.startPoint.y, this.endPoint.y);
            var	vx:number = Math.max(this.startPoint.y, this.endPoint.y);
            return (point.y <= vx && point.y >= vn) && (point.x == this.startPoint.x);
        }
    
        //method 1:
        if(!this.isInLineTrack(point)) return false;
    
        var spTempDx:number = this.startPoint.x - point.x;
        var spTempDy:number = this.startPoint.y - point.y;
    
        var epTempDx:number = this.endPoint.x - point.x;
        var epTempDy:number = this.endPoint.y - point.y;
    
    
        //差积是否为0，判断是否在同一直线上
        if ((spTempDx * epTempDy - epTempDx * spTempDy) > .0000001)
            return false;
    
        //判断是否在线段上
        if ((point.x >  this.startPoint.x && point.x > this.endPoint.x) ||
            (point.x <  this.startPoint.x && point.x < this.endPoint.x))
            return false;
    
        if ((point.y > this.startPoint.y && point.y > this.endPoint.y) ||
            (point.y < this.startPoint.y && point.y < this.endPoint.y))
            return false;
        return true;
    }
}
}