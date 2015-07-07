/**
 * Created by tangben on 2015/7/7.
 */
class EnterFrameTest
{
    public index:number = 0;
    public constructor()
    {
        cn.geckos.utils.EnterFrame.init();
        console.log("2 this.test :" + this.test);
        cn.geckos.utils.EnterFrame.push(this.test, this);
        cn.geckos.utils.EnterFrame.push(this.test2, this);
    }

    public test():void
    {
        console.log("test fun");
    }

    public test2():void
    {
        this.index++;
        console.log("this.index: " + this.index);
        if(this.index == 100)
        {
            console.log("indexOf :" + cn.geckos.utils.EnterFrame.indexOf(this.test));
            cn.geckos.utils.EnterFrame.pop(this.test);
        }
        if(this.index == 200)
        {
            cn.geckos.utils.EnterFrame.destroy();
        }
    }
}