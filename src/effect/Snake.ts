/**
 * 蛇形移动
 */
module effect {
export class Snake 
{
	private static CELL_TIME:number = 0.02;
	// 蛇身大小
	private static SNAKE_CELL_SIZE:number = 30;
	// 蛇身数量
	private static SNAKE_BODY_COUNT:number = 50;
    // 速度
	private static SNAKE_SPEED:number = 300;
	//头部
	private head:egret.Bitmap;
	//身体的纹理
	private bodyTex:egret.Texture;
	 // 蛇身节点
    private bodyList:egret.Bitmap[];
    // 蛇移动方向
	private vect:egret.Point = new egret.Point();
    // 蛇位置记录
    private posList:egret.Point[];
    private now:number = 0;
	private parent:egret.DisplayObjectContainer
	public constructor(parent:egret.DisplayObjectContainer, 
                        headTex:egret.Texture, 
                        bodyTex:egret.Texture, 
                        x:number, 
                        y:number) 
	{
		this.parent = parent;
		this.head = new egret.Bitmap(headTex);
        this.head.anchorOffsetX = this.head.width / 2;
        this.head.anchorOffsetY = this.head.height / 2;
        this.head.x = x;
        this.head.y = y;
		this.parent.addChild(this.head);
		this.bodyTex = bodyTex;
		this.bodyList = [];
		this.posList = [];
		this.initBody();
	}

	/**
	 * 初始化
	 */
	private initBody():void
	{
		 for (let i:number = 0; i < Snake.SNAKE_BODY_COUNT; i++) {
            const body:egret.Bitmap = new egret.Bitmap(this.bodyTex);
            body.anchorOffsetX = body.width / 2;
            body.anchorOffsetY = body.height / 2;
            this.parent.addChild(body);
			this.parent.setChildIndex(body, Snake.SNAKE_BODY_COUNT - i);
            this.bodyList.push(body);
        }
        this.head.zIndex = Snake.SNAKE_BODY_COUNT + 1;
        // 蛇总长度
        const snakeLength:number = Snake.SNAKE_CELL_SIZE * this.bodyList.length;
        // 每次移动的距离
        const snakeMoveDelta:number = Snake.SNAKE_SPEED * Snake.CELL_TIME;
        // 总共点数
        const snakePosCount:number = Math.ceil(snakeLength / snakeMoveDelta) + 1;
        this.posList = [];
        // 初始化位置信息，按照蛇头的位置往下排
        for (let i:number = 0; i < snakePosCount; i++) {
            this.posList.push(new egret.Point(this.head.x, this.head.y + i * snakeMoveDelta));
        }
        this.updateSnakeBodyPos();
        this.posList.pop();
	}

	/** 摇杆触发回调 */
    public snakeMoving(vector:egret.Point, angle:number) {
        this.vect = vector;
        if (angle) {
            this.head.rotation = angle - 90;
        }
    }
 
    // 更新蛇身体的位置
    private updateSnakeBodyPos() {
        const moveDelta:number = Snake.SNAKE_SPEED * Snake.CELL_TIME;
        this.bodyList.forEach((s, i) => {
            // 计算当前身体在位置中的索引
            const posIndex:number = Math.floor((i + 1) * Snake.SNAKE_CELL_SIZE / moveDelta);
            const pos:egret.Point = this.posList[posIndex];
            if (pos) {
                s.x = pos.x;
                s.y = pos.y;
            } else {
				console.log(`!pos`, i, posIndex, this.posList.length)
            }
        })
    }

	private fixUpdate(dt: number) {
        if (this.vect.x * this.vect.x + this.vect.y * this.vect.y > 0) {
            this.head.x += this.vect.x * Snake.SNAKE_SPEED * dt;
            this.head.y += this.vect.y * Snake.SNAKE_SPEED * dt;
            this.posList.unshift(new egret.Point(this.head.x, this.head.y));
            this.updateSnakeBodyPos();
            this.posList.pop();
        }
    }

	public update(dt: number) 
	{
        this.now += dt / 1000;
        while (this.now >= Snake.CELL_TIME) {
            this.fixUpdate(Snake.CELL_TIME);
            this.now -= Snake.CELL_TIME;
        }
    }
}
}