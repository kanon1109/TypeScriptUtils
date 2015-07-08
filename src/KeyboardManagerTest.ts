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
        cn.geckos.utils.KeyboardManager.init();
        cn.geckos.utils.KeyboardManager.registerKey(cn.geckos.utils.KeyboardManager.SPACE, this.test, this, cn.geckos.utils.KeyboardManager.TYPE_KEY_UP);
	}

    private test():void
    {
        this.index++;
        console.log("index:" + this.index);
        
        if(this.index == 2) 
        {
            cn.geckos.utils.KeyboardManager.unregisterKey(cn.geckos.utils.KeyboardManager.SPACE, cn.geckos.utils.KeyboardManager.TYPE_KEY_UP);
            cn.geckos.utils.KeyboardManager.registerKey("S", this.test2, this);
        }
    }
    
    private test2():void
    {
        this.index++;
        console.log("test2 index:" + this.index);
        if(this.index == 10) 
        {
            cn.geckos.utils.KeyboardManager.destroy();
        }
    }
}
