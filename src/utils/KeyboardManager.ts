/**
 * Created by tangben on 2015/7/7.
 */
module utils
{
/**
 * ...键盘管理
 * @author Kanon
 */
export class KeyboardManager
{
    /**
     * 键盘事件类型
     */
    public static TYPE_KEY_DOWN:number = 0;
    public static TYPE_KEY_UP:number = 1;

    //存放按下注册数据的字典
    private static keyDownDict:Object;
    //存放按起注册数据的字典
    private static keyUpDict:Object;

    /**
     * 键值字符串枚举
     */
    public static  A : string = "A";
    public static  B : string = "B";
    public static  C : string = "C";
    public static  D : string = "D";
    public static  E : string = "E";
    public static  F : string = "F";
    public static  G : string = "G";
    public static  H : string = "H";
    public static  I : string = "I";
    public static  J : string = "J";
    public static  K : string = "K";
    public static  L : string = "L";
    public static  M : string = "M";
    public static  N : string = "N";
    public static  O : string = "O";
    public static  P : string = "P";
    public static  Q : string = "Q";
    public static  R : string = "R";
    public static  S : string = "S";
    public static  T : string = "T";
    public static  U : string = "U";
    public static  V : string = "V";
    public static  W : string = "W";
    public static  X : string = "X";
    public static  Y : string = "Y";
    public static  Z : string = "Z";

    public static  ESC: string = "Esc";
    public static  F1: string = "F1";
    public static  F2: string = "F2";
    public static  F3: string = "F3";
    public static  F4: string = "F4";
    public static  F5: string = "F5";
    public static  F6: string = "F6";
    public static  F7: string = "F7";
    public static  F8: string = "F8";
    public static  F9: string = "F9";
    public static  F10: string = "F10";
    public static  F11: string = "F11";
    public static  F12: string = "F12";

    public static  NUM_1: string = "1";
    public static  NUM_2: string = "2";
    public static  NUM_3: string = "3";
    public static  NUM_4: string = "4";
    public static  NUM_5: string = "5";
    public static  NUM_6: string = "6";
    public static  NUM_7: string = "7";
    public static  NUM_8: string = "8";
    public static  NUM_9: string = "9";
    public static  NUM_0: string = "0";

    public static  TAB: string = "Tab";
    public static  CTRL: string = "Ctrl";
    public static  ALT: string = "Alt";
    public static  SHIFT: string = "Shift";
    public static  CAPS_LOCK: string = "Caps Lock";
    public static  ENTER: string = "Enter";
    public static  SPACE: string = "Space";
    public static  BACK_SPACE: string = "Back Space";

    public static  INSERT: string = "Insert";
    public static  DELETE: string = "Page Down";
    public static  HOME: string = "Home";
    public static  END: string = "Page Down";
    public static  PAGE_UP: string = "Page Up";
    public static  PAGE_DOWN: string = "Page Down";

    public static  LEFT: string = "Left";
    public static  RIGHT: string = "Right";
    public static  UP: string = "Up";
    public static  DOWN: string = "Down";

    public static  PAUSE_BREAK: string = "Pause Break";
    public static  NUM_LOCK: string = "Num Lock";
    public static  SCROLL_LOCK: string = "Scroll Lock";

    public static  WINDOWS: string = "Windows";


    public static init():void
    {
        KeyboardManager.keyDownDict = {};
        KeyboardManager.keyUpDict = {};
        document.addEventListener("keydown", KeyboardManager.onKeyDonwHander);
        document.addEventListener("keyup", KeyboardManager.onKeyUpHander);
    }
    
    private static onKeyDonwHander(event:KeyboardEvent):void
    {
        console.log("onKeyDonwHander");
        if(!KeyboardManager.keyDownDict) return;
        var key:string = KeyboardManager.keyCodeToString(event.keyCode);
        var o:Object = KeyboardManager.keyDownDict[key];
        if (o)
        {
            var fun:Function = o["fun"];
            var thisObj:any = o["thisObj"];
            var args:any = o["args"];
            fun.apply(thisObj, args);
        }
    }
    
    
    private static onKeyUpHander(event:KeyboardEvent):void
    {
        console.log("onKeyUpHander");
        if(!KeyboardManager.keyUpDict) return;
        var key:string = KeyboardManager.keyCodeToString(event.keyCode);
        var o:Object = KeyboardManager.keyUpDict[key];
        if (o)
        {
            var fun:Function = o["fun"];
            var thisObj:any = o["thisObj"];
            var args:any = o["args"];
            fun.apply(thisObj, args);
        }
    }


    /**
     * 注册按键
     * @param	key		键值
     * @param	fun		回调方法
     * @param	type	按键类型 TYPE_KEY_DOWN、TYPE_KEY_UP
     */
    public static registerKey(key:string, fun:Function, thisObj:any, type:number = 0, ...args):void
    {
        var keyDict:Object = type ? KeyboardManager.keyUpDict : KeyboardManager.keyDownDict;
        keyDict[key] = { "fun":fun, args:args, "thisObj":thisObj };
    }

    /**
     * 注销按键
     * @param	key		键值
     * @param	type	注销的类型
     */
    public static unregisterKey(key:string, type:number = 0):void
    {
        var keyDict:Object = type ? KeyboardManager.keyUpDict : KeyboardManager.keyDownDict;
        delete keyDict[key];
    }


    /**
     * 根据keyCode或charCode获取相应的字符串代号
     * @param	keyCode
     * @return	键盘所指字符串代号
     */
    private static keyCodeToString(keyCode:number):string
    {
        switch (keyCode)
        {
            case 8 :
                return KeyboardManager.BACK_SPACE;
            case 9 :
                return KeyboardManager.TAB;
            case 13 :
                return KeyboardManager.ENTER;
            case 16 :
                return KeyboardManager.SHIFT;
            case 17 :
                return KeyboardManager.CTRL;
            case 19 :
                return KeyboardManager.PAUSE_BREAK;
            case 20 :
                return KeyboardManager.CAPS_LOCK;
            case 27 :
                return KeyboardManager.ESC;
            case 32 :
                return KeyboardManager.SPACE;
            case 33 :
                return KeyboardManager.PAGE_UP;
            case 34 :
                return KeyboardManager.PAGE_DOWN;
            case 35 :
                return KeyboardManager.END;
            case 36 :
                return KeyboardManager.HOME;
            case 37 :
                return KeyboardManager.LEFT;
            case 38 :
                return KeyboardManager.UP;
            case 39 :
                return KeyboardManager.RIGHT;
            case 40 :
                return KeyboardManager.DOWN;
            case 45 :
                return KeyboardManager.INSERT;
            case 46 :
                return KeyboardManager.DELETE;
            case 91 :
                return KeyboardManager.WINDOWS;
            case 112 :
                return KeyboardManager.F1;
            case 113 :
                return KeyboardManager.F2;
            case 114 :
                return KeyboardManager.F3;
            case 115 :
                return KeyboardManager.F4;
            case 116 :
                return KeyboardManager.F5;
            case 117 :
                return KeyboardManager.F6;
            case 118 :
                return KeyboardManager.F7;
            case 119 :
                return KeyboardManager.F8;
            case 120 :
                return KeyboardManager.F9;
            case 122 :
                return KeyboardManager.F11;
            case 123 :
                return KeyboardManager.F12;
            case 144 :
                return KeyboardManager.NUM_LOCK;
            case 145 :
                return KeyboardManager.SCROLL_LOCK;
            default :
                return String.fromCharCode(keyCode);
        }
    }
    
    
    /**
    * 销毁方法
    */
    public static destroy():void
    {
        KeyboardManager.keyDownDict = null;
        KeyboardManager.keyUpDict = null;
        document.removeEventListener("keydown", KeyboardManager.onKeyDonwHander);
        document.removeEventListener("keyup", KeyboardManager.onKeyUpHander);
    }
}
}