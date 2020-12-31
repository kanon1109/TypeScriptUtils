/**
 * Created by tangben on 2015/7/10.
 */
module effect
{
/**
 * 蜜蜂行为
 * @author Kanon
 */
export class BeeBehavior
{
    //蜜蜂字典
    private beeList:Bee[];
    //随机范围
    private rangeX:number;
    private rangeY:number;
    //摩擦力
    private friction:number = .95;
    public constructor(rangeX:number, rangeY:number)
    {
        this.rangeX = rangeX;
        this.rangeY = rangeY;
        this.beeList = [];
    }

    /**
     * 添加蜜蜂
     * @param	bee 蜜蜂对象
     */
    public addBee(bee:Bee):void
    {
        if (this.beeList.indexOf(bee) == -1)
            this.beeList.push(bee);
    }

    /**
     * 去除一个蜜蜂
     * @param	bee	蜜蜂对象
     */
    public removeBee(bee:Bee):void
    {
        if(!bee) return;
        if (!this.beeList) return;
        let index:number = this.beeList.indexOf(bee);
        if(index == -1) return;
        this.beeList.splice(index, 1);
        if(bee.parent)
           bee.parent.removeChild(bee);
    }

    //主循环
    public update():void
    {
        if (!this.beeList) return;
        let count:number = this.beeList.length;
        for(let i:number = 0; i < count; ++i)
        {
            let bee:Bee = this.beeList[i];
            if(bee)
            {
                bee.vx += Math.random() * this.rangeX - this.rangeX * .5;
                bee.vy += Math.random() * this.rangeY - this.rangeY * .5;
                bee.x += bee.vx;
                bee.y += bee.vy;
                bee.vx *= this.friction;
                bee.vy *= this.friction;
            }
        }
    }

    /**
     * 销毁
     */
    public destroy():void
    {
		if(!this.beeList) return;
        let count:number = this.beeList.length;
        for(let i:number = count - 1; i >= 0; --i)
        {
            let bee:Bee = this.beeList[i];
            if(bee && bee.parent)
               bee.parent.removeChild(bee);
            this.beeList.splice(i, 1);
        }
        this.beeList = null;
    }
}

export class Bee extends egret.Sprite
{
    public vx:number = 0;
    public vy:number = 0;
    private _dObj:egret.DisplayObject;
    public constructor(dObj:egret.DisplayObject)
    {
        super();
        if(this._dObj && this._dObj.parent)
           this._dObj.parent.removeChild(this._dObj);
        this._dObj = dObj;
        this.addChild(dObj);
    }
}
}

