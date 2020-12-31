/**
 * Created by tangben on 2015/7/10.
 */
module effect
{
/**
 * 油画效果
 * @author Kanon
 */
export class OilPainting
{
    private prevX:number;
    private prevY:number;
    //笔画的起始位置
    private startPosX:number;
    private startPosY:number;
    //笔触颜色
    private _color:number;
    //图形
    private graphics:egret.Graphics;
    public constructor(graphics:egret.Graphics, color:number = 0)
    {
        this.graphics = graphics;
        this.color = color;
    }

    /**
     * 移动笔触
     * @param	posX    当前绘制的x坐标
     * @param	posY    当前绘制的y坐标
     */
    public paintMove(posX:number, posY:number):void
    {
        //求出一次移动时2个坐标的距离
        let distance:number = Math.sqrt(Math.pow(this.prevX - this.startPosX, 2) +
            Math.pow(this.prevY - this.startPosY, 2));
        //飞溅出的墨汁点的位置增量
        let a:number = distance * 10 * (Math.pow(Math.random(), 2) - 0.5); //根据移动距离大小计算墨汁点起始位置的增量
        let r:number = Math.random() - 0.5; //随机一个增量墨点结束位置的增量
        //let r:number = 0;
        //根据距离移动速度显示笔触大小
        let size:number = Math.random() * 15 / distance;
        //贝塞尔曲线的控制点的坐标
        let disX:number = (this.prevX - this.startPosX) * Math.sin(0.5) + this.startPosX;
        let disY:number = (this.prevY - this.startPosY) * Math.cos(0.5) + this.startPosY;

        this.startPosX = this.prevX;
        this.startPosY = this.prevY;

        this.prevX = posX;
        this.prevY = posY;

        //绘制出带贝塞尔曲线的线条
        this.graphics.moveTo(this.startPosX, this.startPosY);
        this.graphics.curveTo(disX, disY, this.prevX, this.prevY);
        /*this.graphics.lineStyle(((Math.random() + 20 / 10 - 0.5) * size +
         (1 - Math.random() + 30 / 20 - 0.5) * size),
         this.color, 1, false, LineScaleMode.NONE, CapsStyle.ROUND);*/
        this.graphics.lineStyle(((Math.random() + 20 / 10 - 0.5) * size +
            (1 - Math.random() + 30 / 20 - 0.5) * size),
            this.color, 1, false);
        //增加周围墨点
        this.graphics.moveTo(this.startPosX + a, this.startPosY + a);
        this.graphics.lineTo(this.startPosX + r + a, this.startPosY + r + a);
        this.graphics.endFill();
    }

    /**
     * 清除
     */
    public clear():void
    {
        this.graphics.clear();
    }

    /**
     * 线条颜色
     */
    public get color():number { return this._color; }
    public set color(value:number)
    {
        this._color = value;
    }
}
}
