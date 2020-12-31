/**
 * Created by tangben on 2015/7/10.
 */
module effect
{
/**
 * 血液飞溅效果
 * @author Kanon
 */
export class BloodSplatter
{
    //飞溅数量
    private num:number;
    //飞溅距离
    private dis:number;
    //飞溅强度
    private intensity:number;
    //飞溅大小
    private size:number;
    //资源链接
    private assest:string;
    //容器
    private container:egret.DisplayObjectContainer;
    //血的纹理
    private bloodTextrue:egret.Texture;
    //存放血液的列表
    private bloodList:egret.Bitmap[];
    /**
     * @param	container		效果外部容器
     * @param	assest			飞溅资源
     * @param	width			舞台宽度
     * @param	height			舞台高度
     * @param	num				飞溅数量
     * @param	dis				飞溅距离
     * @param	intensity		飞溅强度
     * @param	size			飞溅大小
     */
    public constructor(container:egret.DisplayObjectContainer,
                          assest:string,
                          num:number = 12,
                          dis:number = 65,
                          intensity:number = .8,
                          size:number = 1.6)
    {
        this.num = num;
        this.dis = dis;
        this.intensity = intensity;
        this.size = size;
        this.assest = assest;
        this.container = container;
        this.bloodTextrue = RES.getRes(assest);
        this.bloodList = [];
    }

    /**
     * 根据位置绘制血迹
     * @param	targetX		x坐标
     * @param	targetY		y坐标
     */
    public doSplatter(targetX:number, targetY:number):void
    {
        for (let i:number = 0; i < this.num; i += 1)
        {
            //创建血迹
            let blood:egret.Bitmap = new egret.Bitmap(this.bloodTextrue);

            //设置位置
            blood.x = targetX + Math.random() * (this.dis + 1) - (this.dis / 2);
            blood.y = targetY + Math.random() * (this.dis + 1) - (this.dis / 2);

            //trace(Math.random() * (this.dis + 1) - (this.dis / 2));

            //设置缩放
            blood.scaleX = Math.random() * this.size + this.size / 4;
            blood.scaleY = Math.random() * this.size + this.size / 4;

            //角度
            blood.rotation = Math.random() * 360;

            //透明度
            blood.alpha = Math.random() * this.intensity + this.intensity / 4;

            this.container.addChild(blood);

            this.bloodList.push(blood);
        }
    }

    /**
     * 清除画布
     */
    public clear():void
    {
        let count:number = this.bloodList.length;
        for(let i:number = count - 1; i >= 0; --i)
        {
            let blood:egret.Bitmap = this.bloodList[i];
            if(blood &&
               blood.parent)
               blood.parent.removeChild(blood);
            this.bloodList.splice(i, 1);
        }
    }

    /**
     * 销毁
     */
    public destroy():void
    {
        this.clear();
        this.bloodList = null;
        this.bloodTextrue.dispose();
    }
}
}