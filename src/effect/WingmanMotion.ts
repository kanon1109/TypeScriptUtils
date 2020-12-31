/**
 * Created by kanon on 2015/7/11.
 */
module effect
{
/**
 * 僚机的跟随效果
 * @author Kanon
 */
export class WingmanMotion
{
    //僚机
    private wingMc:egret.DisplayObject;
    //僚机速度
    private vx:number;
    private vy:number;
    public constructor (wingMc:egret.DisplayObject)
    {
        this.wingMc = wingMc;
        this.vx = 0;
        this.vy = 0;
    }

    /**
     * 跟随
     * @param	targetX		目标位置x
     * @param	targetY		目标位置y
     */
    public follow(targetX:number, targetY:number):void
    {
        if (!this.wingMc) return;
        //缓动系数
        let ease:number = .002;
        //衰减系数
        let decay:number = .98;
        //阻力
        let resistance:number = .05;
        //加速度
        let ax:number = -(this.wingMc.x - targetX) * ease;
        let ay:number = -(this.wingMc.y - targetY) * ease;

        if (ax > 0) ax -= resistance;
        else ax += resistance;
        if (ay > 0) ay -= resistance;
        else ay += resistance;

        this.vx += ax;
        this.vy += ay;
        //衰减
        this.vx *= decay;
        this.vy *= decay;
        this.wingMc.x += this.vx;
        this.wingMc.y += this.vy;
    }
}
}