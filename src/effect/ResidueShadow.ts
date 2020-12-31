module effect 
{
/**
 * 残影效果
 * @author	Kanon
 */
export class ResidueShadowEffect
{
    //物品列表
    private goodsList:egret.DisplayObject[];
    //物品的数据列表 存放物品的坐标信息
    private goodsDataList:Object[];
    //父容器
    private parent:egret.DisplayObjectContainer;
    //衰减时间（毫秒）
    private attenuation: number;
    /**
     * 构造
     * @param parent        父级容器
     * @param attenuation   衰减时间（毫秒）
     */
	public constructor(parent:egret.DisplayObjectContainer, attenuation:number = 500)
	{
        this.goodsList = [];
        this.goodsDataList = [];
        this.parent = parent;
        this.attenuation = attenuation;
	}

    /**
     * 添加物品
     * @param dspObj   需要加残影的物品
     */
    public addGoods(dspObj:egret.DisplayObject):void
    {
        if(!this.goodsList) return;
        let index:number = this.goodsList.indexOf(dspObj);
        if(index == -1)
        {
            this.goodsList.push(dspObj);
            let obj:Object = {"x":dspObj.x, "y":dspObj.y};
            this.goodsDataList.push(obj);
        }
    }

    /**
     * 删除物品
     * @param dspObj   需要删除的物品
     */
    public removeGoods(dspObj:egret.DisplayObject):void
    {
        if(!this.goodsList) return;
        let index:number = this.goodsList.indexOf(dspObj);
        if(index != -1)
        {
            this.goodsList.splice(index, 1);
            this.goodsDataList.splice(index, 1);
        }
    }

    /**
     * 渲染
     */
    public renderer():void
    {
        if(!this.goodsList) return;
        for(let i:number = 0; i < this.goodsList.length; ++i)
        {
            let goodsObj:egret.DisplayObject = this.goodsList[i];
            let obj:Object = this.goodsDataList[i];
            let x:number = obj["x"];
            let y:number = obj["y"];
            let dis:number = this.mathDistance(x, y, goodsObj.x, goodsObj.y);
            if(dis > 0) this.createShadow(goodsObj);
            obj["x"] = goodsObj.x;
            obj["y"] = goodsObj.y;
        }
    }

    /**
     * 创建阴影
     * @param obj
     */
    private createShadow(obj:egret.DisplayObject):void
    {
        if(!obj) return;
        let texture:egret.Texture;
        if(obj instanceof egret.Bitmap)
        {
            texture = obj.texture;
        }
        else if(obj instanceof egret.MovieClip)
        {
            let mc:egret.MovieClip = <egret.MovieClip>obj;
            texture = mc.movieClipData.getTextureByFrame(mc.currentFrame);
        }
        if(texture)
        {
            let shadowBmp:egret.Bitmap = new egret.Bitmap(texture);
            shadowBmp.x = obj.x;
            shadowBmp.y = obj.y;
            shadowBmp.anchorOffsetX = obj.anchorOffsetX;
            shadowBmp.anchorOffsetY = obj.anchorOffsetY;
            shadowBmp.alpha = obj.alpha;
            shadowBmp.skewX = obj.skewX;
            shadowBmp.skewY = obj.skewY;
            shadowBmp.rotation = obj.rotation;
            shadowBmp.anchorOffsetX = obj.anchorOffsetX;
            shadowBmp.anchorOffsetY = obj.anchorOffsetY;
            shadowBmp.scaleX = obj.scaleX;
            shadowBmp.scaleY = obj.scaleY;
            this.parent.addChild(shadowBmp);
            egret.Tween.get(shadowBmp).to({ alpha:0}, this.attenuation).call(this.hideComplete, this, [shadowBmp]);
        }
    }

    /**
     * 隐藏结束
     */
    private hideComplete(shadowBmp:egret.DisplayObject):void
    {
        if(shadowBmp && shadowBmp.parent)
        {
            egret.Tween.removeTweens(shadowBmp);
            shadowBmp.parent.removeChild(shadowBmp);
        }
    }

    /**
     * 计算距离
     * @param    x1    点1的x坐标
     * @param    y1    点1的y坐标
     * @param    x2    点2的x坐标
     * @param    y2    点2的y坐标
     * @return    2点之间的距离
     */
    private mathDistance(x1:number, y1:number, x2:number, y2:number):number
    {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    /**
     * 销毁
     */
    public destroy():void
    {
        if(!this.goodsList) return;
        let length:number = this.goodsList.length;
        for(let i:number = length - 1; i >= 0; --i)
        {
            this.goodsList.splice(i, 1);
        }
        this.goodsList = null;

        length = this.goodsDataList.length;
        for(let i:number = length - 1; i >= 0; --i)
        {
            this.goodsDataList.splice(i, 1);
        }
        this.goodsDataList = null;
    }
}
}
