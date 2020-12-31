/**
 * Created by tangben on 2015/7/10.
 */
module effect
{
/**
 * 绳子效果
 * @author Kanon
 */
export class Rope
{
    //其实位置
    private sp:egret.Point;
    private ep:egret.Point;
    //2个中心点的坐标 用于双重贝塞尔曲线
    private c1:egret.Point;
    private c2:egret.Point;
    //2个点的速度
    private v1:egret.Point;
    private v2:egret.Point;
    //绳子的长度（下垂的幅度）
    private h:number;
    public constructor(sp:egret.Point, ep:egret.Point, h:number = 150)
    {
        this.sp = sp;
        this.ep = ep;
        this.h = h;
    }

    /**
     * 更新数据
     */
    public update():void
    {
        let dis:number = egret.Point.distance(this.sp, this.ep);
        //.25和.75 修正绳子下垂后的弧度，.5 控制拉伸后的弧度
        let cx1:number = this.sp.x + (this.ep.x - this.sp.x) * .25;
        let cy1:number = this.sp.y + (this.ep.y - this.sp.y) * .25 + 4 * this.h * Math.exp( -.5 * dis / this.h) / 3;
        let cx2:number = this.sp.x + (this.ep.x - this.sp.x) * .75;
        let cy2:number = this.sp.y + (this.ep.y - this.sp.y) * .75 + 4 * this.h * Math.exp( -.5 * dis / this.h) / 3;

        if (this.c1)
        {
            let cvx1:number = cx1 - this.c1.x;
            let cvy1:number = cy1 - this.c1.y;
            //缓动公式 .95和.9控制绳子下垂后摆动的速度
            this.v1.x = .95 * (.9 * this.v1.x + .1 * cvx1);
            this.v1.y = .95 * (.9 * this.v1.y + .1 * cvy1);
            this.c1.x += this.v1.x;
            this.c1.y += this.v1.y;

            let cvx2:number = cx2 - this.c2.x;
            let cvy2:number = cy2 - this.c2.y;
            //缓动公式
            this.v2.x = .95 * (.9 * this.v2.x + .1 * cvx2);
            this.v2.y = .95 * (.9 * this.v2.y + .1 * cvy2);
            this.c2.x += this.v2.x;
            this.c2.y += this.v2.y;
        }
        else
        {
            this.c1 = new egret.Point(cx1, cy1);
            this.c2 = new egret.Point(cx2, cy2);
            this.v1 = new egret.Point();
            this.v2 = new egret.Point();
        }
    }

    /**
     * 渲染绘制
     * @param	graphics    绘制的图形
     * @param	thickness   线宽
     * @param	color       颜色
     */
    public render(graphics:egret.Graphics, thickness:number, color:number):void
    {
        graphics.clear();
        graphics.lineStyle(thickness, color);
        graphics.moveTo(this.sp.x, this.sp.y);
        graphics.cubicCurveTo(this.c1.x, this.c1.y,
                              this.c2.x, this.c2.y,
                              this.ep.x, this.ep.y);
    }
}
}