module effect
{
export class WaterWave 
{
	private waterY:number;//水面高度
	private n:number;
	private nodeArray:{x:number, y:number}[];
	private nodeEnergy:any[];
	private shape:egret.Shape;
	private width:number;
	private height:number;
	public constructor(shape:egret.Shape, width:number, height:number, waterY:number) 
	{
		this.shape = shape;
		this.width = width;
		this.height = height;
		this.waterY = waterY;
		this.init();
	}

	private init():void
	{
        this.n = 20;                 // 细分数
        this.nodeArray = [];         // 装载水面上的点
        this.nodeEnergy = [];        // 每个点的能量
        // 赋予初始值
        for (let i = 0; i < this.n; i++) 
		{
            this.nodeEnergy[i] = 0;
        }
		for (let i = 0; i < this.n; i++) 
		{
            let node:{x:number, y:number} = {x:0, y:0};
            node.x = (i + 1) * this.width / this.n;
            node.y = this.waterY;
            this.nodeArray[i] = node;
        }

		 // 最右侧点缓动
        let obj:{x:number, y:number} = this.nodeArray[this.n - 1];
        let time:number = 500;
		egret.Tween.get(obj,{loop:true}).to({y:40 + this.waterY}, time, egret.Ease.sineOut)
				.to({ y: 0 + this.waterY}, time, egret.Ease.sineIn)
				.to({ y: -40 + this.waterY}, time, egret.Ease.sineOut)
				.to({ y: 0 + this.waterY}, time, egret.Ease.sineIn)
	}

	private showWater():void
	{
        let draw = this.shape.graphics;
        draw.clear();
		draw.lineStyle(1, 0xFF0000);
		draw.beginFill(0xff0000);
        draw.moveTo(0, this.waterY);
        for (let i = 0; i < this.n; i+=2) {
            // 贝塞尔
            draw.curveTo(this.nodeArray[i].x, this.nodeArray[i].y, this.nodeArray[i+1].x, this.nodeArray[i+1].y);
        }
        // 封闭区域
        draw.lineTo(this.width, this.height);
        draw.lineTo(0, this.height);
        draw.lineTo(0, this.waterY);
		draw.endFill();
    }

	public update (dt:number):void
	{
        // 左右点互相影响 2 次, 决定波的传播快慢
        for (let k = 0; k < 2; k++) 
		{
            for (let i = 0; i < this.n; i++) 
			{
                if (i > 0) {
                    // 0.02 的传播损失
                    // 向左传
                    this.nodeEnergy[i-1] += 0.98 * (this.nodeArray[i].y - this.nodeArray[i-1].y);
                }
                if (i < this.n - 1) {
                    // 向右传
                    this.nodeEnergy[i+1] += 0.98 * (this.nodeArray[i].y - this.nodeArray[i+1].y);
                }
            }
        }  
        // 最右侧的跳过
        for (let i = 0; i < this.n - 1; i++) 
		{
            // 0.02 速度损失
            this.nodeEnergy[i] *= 0.98;
            // 改变位置
            this.nodeArray[i].y += this.nodeEnergy[i] * dt / 1000;
        }
        this.showWater();
    }

}
}