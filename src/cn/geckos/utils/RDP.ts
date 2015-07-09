/**
 * Created by tangben on 2015/7/9.
 */

module cn.geckos.utils
{
/**
 * 道格拉斯-普克算法(Douglas–Peucker algorithm，
 * 亦称为拉默-道格拉斯-普克算法、迭代适应点算法、分裂与合并算法)是将曲线近似表示为一系列点，
 * 并减少点的数量的一种算法。
 * @author Kanon
 */
export class RDP
{
    /**
     * RDP算法 减少曲线中的点
     * @param	v        需要减少点的曲线坐标列表
     * @param	epsilon  即ε，用于约束全局，，范围介于0.2到0.8。
     * @return  减少点后的曲线坐标
     */
    public static properRDP(v:egret.Point[], epsilon:number):egret.Point[]
    {
        var firstPoint:egret.Point = v[0];
        var lastPoint:egret.Point = v[v.length - 1];
        if (v.length < 3)
            return v;
        var index:number = -1;
        var dist:number = 0;
        for (var i:number = 1; i < v.length - 1; i += 1)
        {
            var cDist:number = RDP.findPerpendicularDistance(v[i], firstPoint, lastPoint);
            if (cDist > dist)
            {
                dist = cDist;
                index = i;
            }
        }
        if (dist > epsilon)
        {
            var l1:egret.Point[] = v.slice(0, index + 1);
            var l2:egret.Point[] = v.slice(index);
            var r1 = RDP.properRDP(l1, epsilon);
            var r2 = RDP.properRDP(l2, epsilon);
            var rs:egret.Point[] = r1.slice(0, r1.length - 1).concat(r2);
            return rs;
        }
        else
        {
            return new Array(firstPoint, lastPoint);
        }
        return null;
    }


    /**
     * 查找垂直距离
     * @param	p    当前点的坐标
     * @param	p1   起始点坐标
     * @param	p2   结束点坐标
     * @return  垂直距离
     */
    public static findPerpendicularDistance(p:egret.Point,
                                            p1:egret.Point,
                                            p2:egret.Point):number
    {
        var result:number;
        if (p1.x == p2.x)
        {
            result = Math.abs(p.x - p1.x);
        }
        else
        {
            var slope:number = (p2.y - p1.y) / (p2.x - p1.x);
            var intercept:number = p1.y - (slope * p1.x);
            result =
                Math.abs(slope * p.x - p.y + intercept) / Math.sqrt(Math.pow(slope, 2) + 1);
        }
        return result;
    }
}
}