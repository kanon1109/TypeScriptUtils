/**
 *
 * @author 
 *
 */
import Slots = effect.Slots;
class SlotsTest extends egret.Sprite
{
	private slots:Slots;
	public constructor()
	{
		super();
        this.slots = new Slots(1, 15, 2, 50);
        this.slots.push(this.selectMc, this);

		let btn1:egret.Shape = new egret.Shape();
		btn1.graphics.beginFill(0xff00ff, 1);
		btn1.graphics.drawRect(0, 0, 50, 50);
		btn1.graphics.endFill();
		btn1.anchorOffsetX = 25;
		btn1.anchorOffsetY = 25;
		btn1.x = 200;
		btn1.y = 200;
        btn1.touchEnabled = true;
		this.addChild(btn1);

		let btn2:egret.Shape = new egret.Shape();
		btn2.graphics.beginFill(0xff00ff, 1);
		btn2.graphics.drawRect(0, 0, 50, 50);
		btn2.graphics.endFill();
		btn2.anchorOffsetX = 25;
		btn2.anchorOffsetY = 25;
		btn2.x = 300;
		btn2.y = 200;
        btn2.touchEnabled = true;
		this.addChild(btn2);
		
		
        let btn3:egret.Shape = new egret.Shape();
        btn3.graphics.beginFill(0xff00ff, 1);
        btn3.graphics.drawRect(0, 0, 50, 50);
        btn3.graphics.endFill();
        btn3.anchorOffsetX = 25;
		btn3.anchorOffsetY = 25;
        btn3.x = 400;
        btn3.y = 200;
        btn3.touchEnabled = true;
        this.addChild(btn3);

        btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn1ClickHandler, this);
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn2ClickHandler, this);
		btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn3ClickHandler, this);

        
        let startX:number = 100;
        let startY:number = 300;
		let gapH:number = 10;
		let gapV:number = 10;
		let r:number = 1;
		let c:number = 1;
        for(let i:number = 0; i < 15; i++)
		{
			let mc:egret.Shape = new egret.Shape();
			mc.graphics.beginFill(0x00ffff, 1);
			mc.graphics.drawRect(0, 0, 50, 50);
			mc.graphics.endFill();
			mc.anchorOffsetX = 25;
			mc.anchorOffsetY = 25;
			mc.x = startX + (r - 1) * (50 + gapH);
			mc.y = startY + (c - 1) * (50 + gapV);
			mc.name = "mc" + (i + 1);
			this.addChild(mc);
			r++;
			if(r > 5)
			{
				r = 1;
				c++;
			}
		}
		
        this.stopAllMc();
        this.selectMc();
	}
	
	
    private btn2ClickHandler(event:egret.TouchEvent):void
    {
        this.slots.splice(this.randomSelect);
        this.slots.push(this.selectMc, this);
        this.slots.show(Math.floor(Math.random() * 15 + 1));
    }
            	
    private btn1ClickHandler(event:egret.TouchEvent):void
    {
        this.slots.splice(this.selectMc);
        this.slots.push(this.randomSelect, this);
        this.slots.show(Math.floor(Math.random() * 15 + 1));
    }

	private btn3ClickHandler(event:egret.TouchEvent):void
	{
		this.slots.destroy();
	}

    /**
    * 选中某个mc
    * @param	mc
    */
    private selectMc():void
    {
        this.stopAllMc();
        console.log("this.slotsEffect.curIndex " + this.slots.curIndex);
        let mc:egret.Shape = <egret.Shape>this.getChildByName("mc" + this.slots.curIndex);
		mc.graphics.clear();
		mc.graphics.beginFill(0xffff00, 1);
		mc.graphics.drawRect(0, 0, 50, 50);
		mc.graphics.endFill();
    }
    	
    private randomSelect():void
    {
        this.stopAllMc();
        console.log("randomSelect this.slotsEffect.randomIndex " + this.slots.randomIndex);
		let mc:egret.Shape = <egret.Shape>this.getChildByName("mc" + this.slots.randomIndex);
		mc.graphics.clear();
		mc.graphics.beginFill(0xffff00, 1);
		mc.graphics.drawRect(0, 0, 50, 50);
		mc.graphics.endFill();
    }
    	
    private stopAllMc():void
    {
        for (let i:number = 1; this.getChildByName("mc" + i); i++)
        {
            let mc:egret.Shape = <egret.Shape>this.getChildByName("mc" + i);
			mc.graphics.clear();
			mc.graphics.beginFill(0x00ffff, 1);
			mc.graphics.drawRect(0, 0, 50, 50);
			mc.graphics.endFill();
        }
    }
}
