/**
 *
 * @author Kanon
 *
 */
class KeyboardManagerTest
{
    private index:number = 0;
	public constructor()
	{
        utils.KeyboardManager.init();
        utils.KeyboardManager.registerKey(utils.KeyboardManager.SPACE, this.test, this, utils.KeyboardManager.TYPE_KEY_UP);
	}

    private test():void
    {
        this.index++;
        console.log("index:" + this.index);
        
        if(this.index == 2) 
        {
            utils.KeyboardManager.unregisterKey(utils.KeyboardManager.SPACE, utils.KeyboardManager.TYPE_KEY_UP);
            utils.KeyboardManager.registerKey("S", this.test2, this);
        }
    }
    
    private test2():void
    {
        this.index++;
        console.log("test2 index:" + this.index);
        if(this.index == 10) 
        {
            utils.KeyboardManager.destroy();
        }
    }
}
