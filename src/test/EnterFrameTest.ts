/**
 * Created by tangben on 2015/7/7.
 */
class EnterFrameTest
{
    public index:number = 0;
    public constructor()
    {
        utils.EnterFrame.init();
        console.log("2 this.test :" + this.test);
        utils.EnterFrame.push(this.test, this);
        utils.EnterFrame.push(this.test2, this);
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
            console.log("indexOf :" + utils.EnterFrame.indexOf(this.test));
            utils.EnterFrame.pop(this.test);
        }
        if(this.index == 200)
        {
            utils.EnterFrame.destroy();
        }
    }
}