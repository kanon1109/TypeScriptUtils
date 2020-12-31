/**
 * Created by tangben on 2015/7/10.
 */
module effect
{
/**
 * 绘制2叉树
 * @author Kanon
 */
export class Tree
{
    /**
     * 绘制方法
     * @param	graphics	绘制的图像
     * @param	startX		树的根节点x坐标
     * @param	startY		树的根节点y坐标
     * @param	length		树干的长度
     * @param	angle		树干的倾斜角度
     * @param	depth		树的茂密度
     * @param	branchWidth	树干的宽度
     */
    public static draw(graphics:egret.Graphics,
                       startX:number, startY:number,
                       length:number, angle:number,
                       depth:number, branchWidth:number):void
    {
        //最大分支数
        let maxBranch:number = 3;
        //最大角度为90度
        let maxAngle:number = 2 * Math.PI / 4;
        //结束点的位置根据角度来倾斜
        let endX:number = startX + length * Math.cos(angle);
        let endY:number = startY + length * Math.sin(angle);
        /*graphics.lineStyle(branchWidth, colorTf.color, 1, true,
                            LineScaleMode.NORMAL, CapsStyle.ROUND);*/
        graphics.lineStyle(branchWidth, 0xff0000, 1, true);
        graphics.moveTo(startX, startY);
        graphics.lineTo(endX, endY);
        let newDepth:number = depth - 1;
        if (newDepth == 0) return;
        let subBranches:number = Math.random() * (maxBranch - 1) + 1;
        //树干宽度缩小
        branchWidth *= .7;
        for (let i:number = 0; i <= subBranches; i += 1)
        {
            //新角度从一个范围中随机
            let newAngle:number = angle + Math.random() * maxAngle - maxAngle * 0.5;
            let newLength:number = length * (0.7 + Math.random() * 0.3);
            Tree.draw(graphics, endX, endY, newLength, newAngle, newDepth, branchWidth);
        }
    }
}
}