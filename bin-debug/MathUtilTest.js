var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/9.
 */
var MathUtilTest = (function () {
    function MathUtilTest(stage) {
        console.log("rds2dgs():" + cn.geckos.utils.MathUtil.rds2dgs(Math.PI / 2));
        console.log("dgs2rds():" + cn.geckos.utils.MathUtil.dgs2rds(180));
        console.log("fixAngle():" + cn.geckos.utils.MathUtil.fixAngle(370));
        console.log("fixNumber():" + cn.geckos.utils.MathUtil.fixNumber(370, 0, 300));
        console.log("18756 isEven():" + cn.geckos.utils.MathUtil.isEven(18756));
        console.log("1875 isEven():" + cn.geckos.utils.MathUtil.isEven(1875));
        console.log("isEvenByDivided():" + cn.geckos.utils.MathUtil.isEvenByDivided(23241, 3));
        console.log("getSlope():" + cn.geckos.utils.MathUtil.getSlope(1, 1, 2, 2));
        var o = cn.geckos.utils.MathUtil.threeSidesMathAngle(3, 4, 5);
        console.log("threeSidesMathAngle() " + "A:" + o["A"] + " B:" + o["B"] + " C:" + o["C"]);
        console.log("triangleArea() " + cn.geckos.utils.MathUtil.triangleArea(new egret.Point(42.5, 35.5), new egret.Point(42.5, 195.5), new egret.Point(219.45, 195.5)));
        var x0 = 240;
        var y0 = 260;
        var x1 = 220;
        var y1 = 230;
        var x2 = 256;
        var y2 = 280;
        var s = new egret.Sprite();
        stage.addChild(s);
        //红色代表参考方
        s.graphics.lineStyle(3, 0xFF0000);
        s.graphics.moveTo(x0, y0);
        s.graphics.lineTo(x1, y1);
        //黄色代表需要判断方
        s.graphics.lineStyle(3, 0xFFFF00);
        s.graphics.moveTo(x0, y0);
        s.graphics.lineTo(x2, y2);
        console.log(cn.geckos.utils.MathUtil.checkPointDirection(x0, y0, x1, y1, x2, y2));
    }
    return MathUtilTest;
}());
__reflect(MathUtilTest.prototype, "MathUtilTest");
//# sourceMappingURL=MathUtilTest.js.map