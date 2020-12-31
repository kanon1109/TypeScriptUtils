/**
 * Created by tangben on 2015/7/10.
 */
import BlackHole = effect.BlackHole;
import BlackHoleEvent = effect.BlackHoleEvent;
class BlackHoleTest extends egret.Sprite
{
    private blackHole:BlackHole;
    private ary:any[];
    private holeList:BlackHole[];
    private holeSpt:egret.Sprite;
    private btnSpt:egret.Sprite;
    private mcSpt:egret.Sprite;
    private btn:egret.Shape;
    private texture:egret.Texture;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private onAddToStage(event:egret.Event):void
    {
        this.ary = [];
        this.holeList = [];
        this.holeSpt = new egret.Sprite();
        this.addChild(this.holeSpt);
        this.mcSpt = new egret.Sprite();
        this.addChild(this.mcSpt);

        this.btn = new egret.Shape();
        this.btn.graphics.beginFill(0xff00ff, 1);
        this.btn.graphics.drawRect(0, 0, 200, 100);
        this.btn.graphics.endFill();
        this.addChild(this.btn);
        this.btn.touchEnabled = true;

        this.texture = RES.getRes("blackHole_png");

        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseClickHandler, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnClickHandler, this);
        this.addObj();
    }


    private btnClickHandler(event:egret.TouchEvent):void
    {
        event.stopPropagation();
        this.addObj();
    }

    private loop(event:egret.Event):void
    {
        let length:number = this.holeList.length;
        for (let i:number = length - 1; i >= 0; i--)
        {
            let blackHole:BlackHole = this.holeList[i];
            blackHole.update();
        }
    }

    private mouseClickHandler(event:egret.TouchEvent):void
    {
        let blackHole:BlackHole = new BlackHole();
        blackHole.addEventListener(BlackHoleEvent.IN_HOLE, this.inHoleHandler, this);
        blackHole.addEventListener(BlackHoleEvent.OVER, this.blackHoleOverHandler, this);
        blackHole.addEventListener(BlackHoleEvent.ATTENUATION, this.attenuationHandler, this);
        blackHole.addSubstanceList(this.ary);
        blackHole.addHole(event.stageX, event.stageY);
        this.holeList.push(blackHole);

        let bhMc:egret.Bitmap = new egret.Bitmap(this.texture);
        bhMc.anchorOffsetX = .5 * bhMc.width;
        bhMc.anchorOffsetY = .5 * bhMc.height;
        bhMc.x = event.stageX;
        bhMc.y = event.stageY;
        bhMc.scaleX = 0;
        bhMc.scaleY = 0;
        this.holeSpt.addChild(bhMc);
        blackHole.useData = bhMc;
        egret.Tween.get(bhMc).to({ scaleX:1, scaleY:1 }, 700 );
        egret.Tween.get(bhMc).to({ rotation:1440, repeat: -1 }, 3000 );
    }


    private attenuationHandler(event:BlackHoleEvent):void
    {
        //这里可以将黑洞的显示效果慢慢缩小。
        let blackHole:BlackHole = event.currentTarget;
        let bhMc:egret.Bitmap = <egret.Bitmap>blackHole.useData;
        egret.Tween.get(bhMc).to({ scaleX:0, scaleY:0 }, 1000 );
    }


    private blackHoleOverHandler(event:BlackHoleEvent):void
    {
        //黑洞完全消失，可以将黑洞显示对象删除
        let blackHole:BlackHole = event.currentTarget;
        blackHole.destroy();
        let length:number = this.holeList.length;
        for (let i:number = length - 1; i >= 0; i--)
        {
            let bh:BlackHole = this.holeList[i];
            if (bh == blackHole)
            {
                this.holeList.splice(i, 1);
                let bhMc:egret.Bitmap = <egret.Bitmap>bh.useData;
                bh.useData = null;
                if (bhMc && bhMc.parent)
                    bhMc.parent.removeChild(bhMc);
                break;
            }
        }
    }


    private inHoleHandler(event:BlackHoleEvent):void
    {
        let dObj:egret.DisplayObject = event.dObj;
        let length:number = this.ary.length;
        for (let i:number = 0; i < length; i++)
        {
            let sp:egret.Sprite = this.ary[i];
            if (dObj == sp)
            {
                this.ary.splice(i, 1);
                break;
            }
        }
        if (dObj.parent) dObj.parent.removeChild(dObj);
    }


    private addObj():void
    {
        let num:number = this.randnum(10, 20);
        let texture:egret.Texture = RES.getRes("bee_png");
        for (let i:number = 1; i <= num; i++)
        {
            let index:number = this.randnum(1, 4);
            let sp:egret.Bitmap = new egret.Bitmap(texture);
            sp.x = this.randnum(0, this.stage.stageWidth);
            sp.y = this.randnum(0, this.stage.stageHeight);
            this.ary.push(sp);
            this.mcSpt.addChild(sp);
        }
    }

    public randnum(a:number, b:number):number
    {
        return Math.random() * (b - a) + a;
    }
}