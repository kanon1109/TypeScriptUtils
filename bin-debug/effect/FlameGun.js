var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by kanon on 2015/7/11.
 */
var effect;
(function (effect) {
    /**
     * 火焰枪效果
     * @author Kanon
     */
    var FlameGun = (function () {
        function FlameGun(parent, startX, startY, speed, rotation, maxScale, minAlpha, distance, floating, scaleSpeed, alphaSpeed, angleOffset) {
            if (startX === void 0) { startX = 0; }
            if (startY === void 0) { startY = 0; }
            if (speed === void 0) { speed = 5; }
            if (rotation === void 0) { rotation = 0; }
            if (maxScale === void 0) { maxScale = 3; }
            if (minAlpha === void 0) { minAlpha = .1; }
            if (distance === void 0) { distance = 500; }
            if (floating === void 0) { floating = 10; }
            if (scaleSpeed === void 0) { scaleSpeed = .2; }
            if (alphaSpeed === void 0) { alphaSpeed = .05; }
            if (angleOffset === void 0) { angleOffset = .5; }
            this.parent = parent;
            this.speed = speed;
            this.rotation = rotation;
            this.maxScale = maxScale;
            this.minAlpha = minAlpha;
            this.distance = distance;
            this.move(startX, startY);
            this.flameList = [];
            this.floating = floating;
            this.scaleSpeed = scaleSpeed;
            this.alphaSpeed = alphaSpeed;
            this.angleOffset = angleOffset;
            this.frameTexture = RES.getRes("f1_png");
        }
        /**
         * 移动
         * @param    x    发射位置x坐标
         * @param    y    发射位置y坐标
         */
        FlameGun.prototype.move = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._startX = x;
            this._startY = y;
        };
        /**
         * 发射
         */
        FlameGun.prototype.fire = function () {
            var rot = this.rotation + this.randnum(-this.floating, this.floating) + this.angleOffset;
            var rad = rot / 180 * Math.PI;
            var vx = Math.cos(rad) * this.speed;
            var vy = Math.sin(rad) * this.speed;
            var flame = new Flame(vx, vy, this.startX, this.startY, this.maxScale, this.minAlpha, this.distance, this.scaleSpeed, this.alphaSpeed);
            var flameImg = new egret.Bitmap(this.frameTexture);
            flameImg.anchorOffsetX = flameImg.width / 2;
            flameImg.anchorOffsetY = flameImg.height / 2;
            flameImg.rotation = this.rotation;
            flame.img = flameImg;
            this.flameList.push(flame);
            this.parent.addChild(flameImg);
        };
        /**
         * 渲染
         */
        FlameGun.prototype.update = function () {
            switch (this._status) {
                case FlameGun.FIRE:
                    this.fire();
                    break;
            }
            //更新火焰弹数据
            var length = this.flameList.length;
            for (var i = length - 1; i >= 0; i -= 1) {
                var flame = this.flameList[i];
                flame.update();
                if (flame.isOutRange()) {
                    flame.destroy();
                    this.flameList.splice(i, 1);
                }
            }
        };
        Object.defineProperty(FlameGun.prototype, "status", {
            /**
             * 获取状态
             */
            get: function () {
                return this._status;
            },
            /**
             * 设置状态
             */
            set: function (value) {
                this._status = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlameGun.prototype, "rotation", {
            /**
             * 获取角度
             */
            get: function () {
                return this._rotation;
            },
            /**
             * 设置角度
             */
            set: function (value) {
                this._rotation = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlameGun.prototype, "startX", {
            /**
             * 获取起始x位置
             */
            get: function () {
                return this._startX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlameGun.prototype, "startY", {
            /**
             * 获取起始y位置
             */
            get: function () {
                return this._startY;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 返回 a - b之间的随机数，不包括  Math.max(a, b)
         * @param a
         * @param b
         * @return 假设 a < b, [a, b)
         */
        FlameGun.prototype.randnum = function (a, b) {
            return Math.random() * (b - a) + a;
        };
        //开火状态
        FlameGun.FIRE = 1;
        //停止状态
        FlameGun.STOP = 0;
        return FlameGun;
    }());
    effect.FlameGun = FlameGun;
    __reflect(FlameGun.prototype, "effect.FlameGun");
    var Flame = (function () {
        function Flame(vx, vy, startX, startY, maxScale, minAlpha, distance, scaleSpeed, alphaSpeed) {
            //x坐标
            this.x = 0;
            //y坐标
            this.y = 0;
            this.sx = startX;
            this.sy = startY;
            this.vx = vx;
            this.vy = vy;
            this.x = startX;
            this.y = startY;
            this.alpha = 1;
            this.scaleX = .2;
            this.scaleY = this.scaleY;
            this.maxScale = maxScale;
            this.minAlpha = minAlpha;
            this.maxDis = distance;
            this.curDis = 0;
            this.texIndex = 1;
            this.scaleSpeed = scaleSpeed;
            this.alphaSpeed = alphaSpeed;
        }
        /**
         * 更新速度
         */
        Flame.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            this.scaleX += this.scaleSpeed;
            this.scaleY = this.scaleX;
            this.curDis = utils.MathUtil.distance(this.x, this.y, this.sx, this.sy);
            if (this.scaleX > this.maxScale)
                this.scaleX = this.maxScale;
            if (this.curDis >= this.maxDis * .5)
                this.alpha -= this.alphaSpeed;
            if (this.alpha < this.minAlpha)
                this.alpha = this.minAlpha;
            if (this.img) {
                this.img.x = this.x;
                this.img.y = this.y;
                this.img.scaleX = this.scaleX;
                this.img.scaleY = this.scaleY;
                this.img.alpha = this.alpha;
            }
            if (this.texIndex < this.texIndex + 1 && this.texIndex < 3) {
                if (this.curDis >= this.maxDis / (3 - this.texIndex + 1) + utils.Random.randnum(-30, 80)) {
                    this.texIndex++;
                    this.img.texture = RES.getRes("f" + this.texIndex + "_png");
                    this.img.anchorOffsetX = this.img.width / 2;
                    this.img.anchorOffsetY = this.img.height / 2;
                }
            }
        };
        /**
         * 是否超过射程
         * @return
         */
        Flame.prototype.isOutRange = function () {
            return this.mathDistance(this.x, this.y, this.sx, this.sy) >= this.maxDis;
        };
        /**
         * 计算距离
         * @param    x1    点1的x坐标
         * @param    y1    点1的y坐标
         * @param    x2    点2的x坐标
         * @param    y2    点2的y坐标
         * @return    2点之间的距离
         */
        Flame.prototype.mathDistance = function (x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        };
        /**
         * 销毁
         */
        Flame.prototype.destroy = function () {
            if (this.img.parent)
                this.img.parent.removeChild(this.img);
            this.img = null;
        };
        return Flame;
    }());
    effect.Flame = Flame;
    __reflect(Flame.prototype, "effect.Flame");
})(effect || (effect = {}));
//# sourceMappingURL=FlameGun.js.map