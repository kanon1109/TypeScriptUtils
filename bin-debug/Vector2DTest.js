var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/9.
 */
var Vector2D = cn.geckos.geom.Vector2D;
var LineSegment = cn.geckos.geom.LineSegment;
var Vector2DTest = (function () {
    function Vector2DTest() {
        var v2d = new Vector2D(0, 0);
        var v2d2 = new Vector2D(125, 234);
        var dis = v2d.dist(v2d2);
        var angle = v2d.angleBetween(v2d2);
        console.log("dis:" + dis + " angle:" + angle);
        var line1 = new LineSegment(v2d, v2d2);
        var line2 = new LineSegment(new Vector2D(20.5, 160.5), new Vector2D(180.45, 160.5));
        console.log("line1 isHorizontal:" + line1.isHorizontal() + " isVertical:" + line1.isVertical());
        console.log("line2 isHorizontal:" + line2.isHorizontal() + " isVertical:" + line2.isVertical());
        console.log("isPerpendicular " + line1.isPerpendicular(line2));
        console.log("isIntersection " + line1.isIntersection(line2));
        console.log("getIntersectionPoint x:" + line1.getIntersectionPoint(line2).x + " y:" + line1.getIntersectionPoint(line2).y);
        console.log("getRelation :" + line1.getRelation(line2));
    }
    return Vector2DTest;
}());
__reflect(Vector2DTest.prototype, "Vector2DTest");
//# sourceMappingURL=Vector2DTest.js.map