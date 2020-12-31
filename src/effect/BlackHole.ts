/**
 * Created by tangben on 2015/7/10.
 */
module effect
{
export class BlackHole extends egret.EventDispatcher
{
    //引力
    private g:number;
    //黑洞作用半径范围
    private range:number;
    //旋转的角速度
    private angleSpeed:number;
    //物质列表存放被吸引的物质
    private subList:egret.DisplayObject[];
    //黑洞位置
    private holePosX:number;
    private holePosY:number;
    //是否开启黑洞
    private isStart:boolean;
    //是否结束
    private isOver:boolean;
    //最短距离
    private minDis:number = 10;
    //持续时间（毫秒）
    private time:number;
    //持续时间（帧）
    private timeFrame:number;
    //结束后缓动时间（毫秒）
    private overTime:number = 1000;
    //结束后缓动时间（帧）
    private overTimeFrame:number;
    //帧频
    private fps:number;
    //摩擦力
    private f:number = .99;
    //调试容器
    private debugSprite:egret.Sprite;
    //玩家可以设置一个附加在黑洞对象上的数据对象可以是显示对象或者其他类的对象
    public useData:Object;
    public constructor(g:number = 10, range:number = 400, angleSpeed:number = 5, time:number = 1000, fps:number = 60)
    {
        super();
        this.g = g;
        this.range = range;
        this.angleSpeed = angleSpeed;
        this.time = time;
        this.fps = fps;
    }


    /**
     * 添加黑洞
     * @param	holePosX	黑洞位置x
     * @param	holePosY	黑洞位置y
     */
    public addHole(holePosX:number, holePosY:number):void
    {
        this.holePosX = holePosX;
        this.holePosY = holePosY;
        this.isStart = true;
        this.isOver = false;
        this.timeFrame = this.time / 1000 * this.fps;
        this.overTimeFrame = this.overTime / 1000 * this.fps;
    }

    /**
     * 添加被吸引的物质列表
     * @param	ary		物质列表
     */
    public addSubstanceList(ary:egret.DisplayObject[]):void
    {
        this.subList = ary;
    }

    /**
     * 更新
     */
    public update():void
    {
        if (!this.isStart) return;
        if (!this.subList) return;
        let length:number = this.subList.length;
        let obj:egret.DisplayObject;
        let dis:number;
        for (let i:number = length - 1; i >= 0; i--)
        {
            obj = this.subList[i];
            dis = this.mathDistance(this.holePosX, this.holePosY, obj.x, obj.y);
            if (dis <= this.range)
            {
                let speed:number = this.g * (1 - dis / this.range);
                if (!this.isOver)
                {
                    if (dis <= this.minDis)
                    {
                        //小于最短距离
                        let blackHoleEvent:BlackHoleEvent =
                            new BlackHoleEvent(BlackHoleEvent.IN_HOLE, obj);
                        this.dispatchEvent(blackHoleEvent);
                        //这里外部可能将物体销毁，所以循环下面不做处理。
                        continue;
                    }
                    if (speed > dis) speed = dis;
                }
                else
                {
                    //黑洞生命周期结束
                    speed = 0;
                    this.angleSpeed = this.angleSpeed * this.f;
                }
                //如果在影响范围内
                let dx:number = obj.x - this.holePosX;
                let dy:number = obj.y - this.holePosY;
                let radians:number = Math.atan2(dy, dx);
                let vx:number = speed * Math.cos(radians);
                let vy:number = speed * Math.sin(radians);
                obj.x -= vx;
                obj.y -= vy;
                //算出角速度
                radians += Math.PI / 2;
                vx = this.angleSpeed * Math.cos(radians);
                vy = this.angleSpeed * Math.sin(radians);
                obj.x += vx;
                obj.y += vy;
                obj.rotation = radians / Math.PI * 180;
            }
        }
        this.timeFrame--;
        if (this.timeFrame <= 0 && !this.isOver)
        {
            this.timeFrame = 0;
            //黑洞持续时间结束
            this.isOver = true;
            this.dispatchEvent(new BlackHoleEvent(BlackHoleEvent.ATTENUATION));
        }
        if (this.isOver)
        {
            //进入衰减期
            this.overTimeFrame--;
            if (this.overTimeFrame <= 0)
            {
                //衰减期结束
                this.overTimeFrame = 0;
                this.isStart = false;
                this.dispatchEvent(new BlackHoleEvent(BlackHoleEvent.OVER));
            }
        }
    }

    /**
     * 设置调试容器
     * @param	container
     */
    public setDebugContainer(c:egret.Sprite):void
    {
        this.debugSprite = c;
    }

    /**
     * 销毁
     */
    public destroy():void
    {
        this.subList = null;
        if (this.debugSprite)
            this.debugSprite.graphics.clear();
    }

    /**
     * 调试
     */
    public debug():void
    {
        if (!this.debugSprite) return;
        if (!this.isStart) return;
        this.debugSprite.graphics.clear();
        this.debugSprite.graphics.lineStyle(1, 0xFF0000);
        this.debugSprite.graphics.drawCircle(this.holePosX, this.holePosY, this.range);
    }

    /**
     * 计算距离
     * @param	x1	点1的x坐标
     * @param	y1	点1的y坐标
     * @param	x2	点2的x坐标
     * @param	y2	点2的y坐标
     * @return	2点之间的距离
     */
    private mathDistance(x1:number, y1:number, x2:number, y2:number):number
    {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
}

export class BlackHoleEvent extends egret.Event
{
    //进入黑洞消息
    public static IN_HOLE:string = "inHole";
    //结束消息
    public static OVER:string = "over";
    //黑洞衰减消息
    public static ATTENUATION:string = "Attenuation";
    public dObj:egret.DisplayObject;
    public constructor(type:string, obj:egret.DisplayObject=null,
                       bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type, bubbles, cancelable);
        this.dObj = obj;
    }

    public clone():BlackHoleEvent
    {
        return new BlackHoleEvent(this.type, this.dObj, this.bubbles, this.cancelable);
    }
}
}