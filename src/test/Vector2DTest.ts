/**
 * Created by tangben on 2015/7/9.
 */
import Vector2D = geom.Vector2D;
import LineSegment = geom.LineSegment;
class Vector2DTest
{
    public constructor(stage:egret.DisplayObjectContainer)
    {
        var v2d:Vector2D = new Vector2D(0, 0);
        var v2d2:Vector2D = new Vector2D(125, 234);
        var dis:number = v2d.dist(v2d2);
        var angle:number = v2d.angleBetween(v2d2)
        console.log("dis:" + dis + " angle:" + angle);


        var line1:LineSegment = new LineSegment(v2d, v2d2);
        var line2:LineSegment = new LineSegment(new Vector2D(20.5, 160.5), new Vector2D(180.45, 160.5));

        console.log("line1 isHorizontal:" + line1.isHorizontal() + " isVertical:" + line1.isVertical());
        console.log("line2 isHorizontal:" + line2.isHorizontal() + " isVertical:" + line2.isVertical());

        console.log("isPerpendicular " + line1.isPerpendicular(line2));
        console.log("isIntersection " + line1.isIntersection(line2));
        console.log("getIntersectionPoint x:" + line1.getIntersectionPoint(line2).x + " y:" + line1.getIntersectionPoint(line2).y);

        console.log("getRelation :" + line1.getRelation(line2));
        

        var v2d:Vector2D = new Vector2D(100, 400);
        var v2d2:Vector2D = new Vector2D(320, 302);

        let spt:egret.Sprite = new egret.Sprite();
        stage.addChild(spt);

        spt.graphics.lineStyle(1, 0xff0000);
        spt.graphics.moveTo(0, 0);
        spt.graphics.lineTo(v2d.x, v2d.y);
        spt.graphics.drawCircle(v2d.x, v2d.y, 10);
        spt.graphics.lineStyle(1, 0x00ff00);
        spt.graphics.moveTo(0, 0);
        spt.graphics.lineTo(v2d2.x, v2d2.y);
        spt.graphics.drawCircle(v2d2.x, v2d2.y, 10);

        console.log(v2d.crossProd(v2d2));
        
    }
}