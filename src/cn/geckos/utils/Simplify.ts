/**
 * Created by tangben on 2019/8/22.
 */
module cn.geckos.utils
{
/**
 * 优化版的道格拉斯-普克算法(Douglas–Peucker algorithm)
 */
class Simplify 
{
	public static getSquareDistance(p1:egret.Point, p2:egret.Point):number { // square distance between 2 points
		
		var dx:number = p1.x - p2.x, dy:number = p1.y - p2.y;
		return dx * dx + dy * dy;
	}

	public static getSquareSegmentDistance(p:egret.Point, p1:egret.Point, p2:egret.Point):number { // square distance from a point to a segment
		
		var x:number = p1.x;
		var y:number = p1.y;
		var dx:number = p2.x - x;
		var dy:number = p2.y - y;
		var t:number;
		
		if (dx !== 0 || dy !== 0) 
		{
		
			t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
			
			if (t > 1) {
				x = p2.x;
				y = p2.y;
				
			} 
			else if (t > 0) 
			{
				x += dx * t;
				y += dy * t;
			}
		}
		
		dx = p.x - x;
		dy = p.y - y;
		
		return dx * dx + dy * dy;
	}

	// the rest of the code doesn't care for the point format
	public static simplifyRadialDistance(points:egret.Point[], sqTolerance:number):egret.Point[] { // distance-based simplification
		
		var i:number;
		var len:number = points.length;
		var point:egret.Point;
		var prevPoint:egret.Point = points[0];
		var newPoints:egret.Point[] = [prevPoint];
		
		for (i = 1; i < len; i++) 
		{
			point = points[i];
			
			if (Simplify.getSquareDistance(point, prevPoint) > sqTolerance) 
			{
				newPoints.push(point);
				prevPoint = point;
			}
		}
		
		if (prevPoint !== point) 
			newPoints.push(point);
		
		return newPoints;
	}


	// simplification using optimized Douglas-Peucker algorithm with recursion elimination

	public static simplifyDouglasPeucker(points:egret.Point[], sqTolerance:number):egret.Point[] 
	{
		var len:number = points.length;
		var markers:number[] = [];
		var first:number = 0;
		var last:number = len - 1;
		var i:number;
		var maxSqDist:number;
		var sqDist:number;
		var index:number;
		var firstStack:number[] = [];
		var lastStack:number[] = [];
		var newPoints:egret.Point[] = [];
		markers[first] = markers[last] = 1;

		while (last) 
		{
			maxSqDist = 0;
			for (i = first + 1; i < last; i++) 
			{
				sqDist = Simplify.getSquareSegmentDistance(points[i], points[first], points[last]);
				if (sqDist > maxSqDist) 
				{
					index = i;
					maxSqDist = sqDist;
				}
			}
		
			if (maxSqDist > sqTolerance) 
			{
				markers[index] = 1;
				
				firstStack.push(first);
				lastStack.push(index);
				
				firstStack.push(index);
				lastStack.push(last);
			}
		
			first = firstStack.pop();
			last = lastStack.pop();
		}
		
		for (i = 0; i < len; i++) 
		{
			if (markers[i]) 
				newPoints.push(points[i]);
		}
		
		return newPoints;
	}

	/**
	 * 减少曲线中的点
	 * @param	points        		需要减少点的曲线坐标列表
     * @param	tolerance 	  		即ε，用于约束全局
     * @param	highestQuality 	 	是否使用高清晰度
     * @return  减少点后的曲线坐标
	 */
	public static simplify(points:egret.Point[], tolerance:number = 1, highestQuality:Boolean = false):egret.Point[] 
	{
		var sqTolerance:number = tolerance * tolerance;
		if (!highestQuality)
			points = Simplify.simplifyRadialDistance(points, sqTolerance);
		points = Simplify.simplifyDouglasPeucker(points, sqTolerance);
		return points;
	}
}
}