/**
 *
 * @author 
 *
 */
class KeyboardManagerTest
{
    private index:number = 0;
	public constructor()
	{
        cn.geckos.utils.KeyboardManager.init();
        cn.geckos.utils.KeyboardManager.registerKey("a", this.test, this);

        console.log("String.fromCharCode(charCode);" + String.fromCharCode(65));

	}

    private test():void
    {
        this.index++;
        console.log("index:" + this.index);
    }
}
