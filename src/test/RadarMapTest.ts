class RadarMapTest extends  egret.Sprite
{
	private raderMap:effect.RadarMap;
	public constructor() 
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		
	}

	private onAddToStage():void
	{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_attr_jpg"));
		bg.anchorOffsetX = 155;
		bg.anchorOffsetY = 204;
		this.addChild(bg);
		let spt:egret.Sprite = new egret.Sprite();
		this.addChild(spt);
		spt.x = this.stage.stageWidth / 2;
		spt.y = this.stage.stageHeight / 2;
		let spt2:egret.Sprite = new egret.Sprite();
		this.addChild(spt2);
		spt2.x = spt.x;
		spt2.y = spt.y;
		bg.x = spt.x;
		bg.y = spt.y;
		this.raderMap = new effect.RadarMap(spt, spt2);
		this.raderMap.showDraw = true;
		this.raderMap.radius = 100;
		this.raderMap.drawGraph([utils.Random.randint(0, 100), 
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 ])
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageClickHandler, this);

	}

	private onStageClickHandler():void
	{
		this.raderMap.drawGraph([utils.Random.randint(0, 100), 
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 utils.Random.randint(0, 100),
								 ])
	}
}