var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 蛇形移动
 */
var effect;
(function (effect) {
    var Snake = (function () {
        function Snake(parent, headTex, bodyTex, x, y) {
            // 蛇移动方向
            this.vect = new egret.Point();
            this.now = 0;
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
        Snake.prototype.initBody = function () {
            for (var i = 0; i < Snake.SNAKE_BODY_COUNT; i++) {
                var body = new egret.Bitmap(this.bodyTex);
                body.anchorOffsetX = body.width / 2;
                body.anchorOffsetY = body.height / 2;
                this.parent.addChild(body);
                this.parent.setChildIndex(body, Snake.SNAKE_BODY_COUNT - i);
                this.bodyList.push(body);
            }
            this.head.zIndex = Snake.SNAKE_BODY_COUNT + 1;
            // 蛇总长度
            var snakeLength = Snake.SNAKE_CELL_SIZE * this.bodyList.length;
            // 每次移动的距离
            var snakeMoveDelta = Snake.SNAKE_SPEED * Snake.CELL_TIME;
            // 总共点数
            var snakePosCount = Math.ceil(snakeLength / snakeMoveDelta) + 1;
            this.posList = [];
            // 初始化位置信息，按照蛇头的位置往下排
            for (var i = 0; i < snakePosCount; i++) {
                this.posList.push(new egret.Point(this.head.x, this.head.y + i * snakeMoveDelta));
            }
            this.updateSnakeBodyPos();
            this.posList.pop();
        };
        /** 摇杆触发回调 */
        Snake.prototype.snakeMoving = function (vector, angle) {
            this.vect = vector;
            if (angle) {
                this.head.rotation = angle - 90;
            }
        };
        // 更新蛇身体的位置
        Snake.prototype.updateSnakeBodyPos = function () {
            var _this = this;
            var moveDelta = Snake.SNAKE_SPEED * Snake.CELL_TIME;
            this.bodyList.forEach(function (s, i) {
                // 计算当前身体在位置中的索引
                var posIndex = Math.floor((i + 1) * Snake.SNAKE_CELL_SIZE / moveDelta);
                var pos = _this.posList[posIndex];
                if (pos) {
                    s.x = pos.x;
                    s.y = pos.y;
                }
                else {
                    console.log("!pos", i, posIndex, _this.posList.length);
                }
            });
        };
        Snake.prototype.fixUpdate = function (dt) {
            if (this.vect.x * this.vect.x + this.vect.y * this.vect.y > 0) {
                this.head.x += this.vect.x * Snake.SNAKE_SPEED * dt;
                this.head.y += this.vect.y * Snake.SNAKE_SPEED * dt;
                this.posList.unshift(new egret.Point(this.head.x, this.head.y));
                this.updateSnakeBodyPos();
                this.posList.pop();
            }
        };
        Snake.prototype.update = function (dt) {
            this.now += dt / 1000;
            while (this.now >= Snake.CELL_TIME) {
                this.fixUpdate(Snake.CELL_TIME);
                this.now -= Snake.CELL_TIME;
            }
        };
        Snake.CELL_TIME = 0.01;
        // 蛇身大小
        Snake.SNAKE_CELL_SIZE = 30;
        // 蛇身数量
        Snake.SNAKE_BODY_COUNT = 50;
        // 速度
        Snake.SNAKE_SPEED = 300;
        return Snake;
    }());
    effect.Snake = Snake;
    __reflect(Snake.prototype, "effect.Snake");
})(effect || (effect = {}));
//# sourceMappingURL=Snake.js.map