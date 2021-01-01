module comp 
{
/**
 * 圆形进度
 */
export class CircleProgress
{
    private target:egret.DisplayObject;  //遮罩的目标
    private shape:egret.Shape;           //遮罩
    private anticlockwise:boolean;       //true逆时针 false顺时针
    private dic:number;                  //角度增加方向
 
    /**
     * (anticlockwise, dic)  (false,1)顺时针显示对象  (true,1)顺时针隐藏对象  (true,-1)逆时针显示对象 (false,-1)逆时针隐藏对象
     * @param target 遮罩的对象
     * @param anticlockwise
     * @param dic
     */
    public constructor(target:egret.DisplayObject, anticlockwise:boolean, dic:number)
	{
        this.target = target;
        this.shape = new egret.Shape();
        this.shape.x = this.target.x + this.target.width / 2;
        this.shape.y = this.target.y + this.target.height / 2;
        target.parent && target.parent.addChild(this.shape);
        this.target.mask = this.shape;
        this.anticlockwise = anticlockwise;
        this.dic = dic;
    }
 
 
    /**
     * 绘制进度
     * @param value 0-1  进度
     * @param offerAngle 角度偏移值,默认从0度开始画
     */
    public drawProgress(value:number, offerAngle:number = 0){
        if(value > 1) value = 1;
        var r = Math.max(this.target.width/2, this.target.height/2);
        let startAngle = offerAngle;
        let endAngle = (360*value + offerAngle)*this.dic;
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0x00ffff, 1);
        this.shape.graphics.lineTo(r, 0);
        this.shape.graphics.drawArc(0, 0, r, startAngle * Math.PI / 180, endAngle * Math.PI / 180, this.anticlockwise);
        this.shape.graphics.lineTo(0, 0);
        this.shape.graphics.endFill();
    }
 
    //销毁
    public destroy()
    {
        this.target = null;
        if(this.shape && this.shape.parent)
        {
            this.shape.graphics.clear();
            this.shape.parent.removeChild(this.shape);
        }
        this.shape = null;
    }
}
}