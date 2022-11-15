var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/10.
 */
var effect;
(function (effect) {
    /**
     * 油画效果
     * @author Kanon
     */
    var OilPainting = (function () {
        function OilPainting(graphics, color) {
            if (color === void 0) { color = 0; }
            this.graphics = graphics;
            this.color = color;
        }
        /**
         * 移动笔触
         * @param	posX    当前绘制的x坐标
         * @param	posY    当前绘制的y坐标
         */
        OilPainting.prototype.paintMove = function (posX, posY) {
            //求出一次移动时2个坐标的距离
            var distance = Math.sqrt(Math.pow(this.prevX - this.startPosX, 2) +
                Math.pow(this.prevY - this.startPosY, 2));
            //飞溅出的墨汁点的位置增量
            var a = distance * 10 * (Math.pow(Math.random(), 2) - 0.5); //根据移动距离大小计算墨汁点起始位置的增量
            var r = Math.random() - 0.5; //随机一个增量墨点结束位置的增量
            //let r:number = 0;
            //根据距离移动速度显示笔触大小
            var size = Math.random() * 15 / distance;
            //贝塞尔曲线的控制点的坐标
            var disX = (this.prevX - this.startPosX) * Math.sin(0.5) + this.startPosX;
            var disY = (this.prevY - this.startPosY) * Math.cos(0.5) + this.startPosY;
            this.startPosX = this.prevX;
            this.startPosY = this.prevY;
            this.prevX = posX;
            this.prevY = posY;
            //绘制出带贝塞尔曲线的线条
            this.graphics.moveTo(this.startPosX, this.startPosY);
            this.graphics.curveTo(disX, disY, this.prevX, this.prevY);
            /*this.graphics.lineStyle(((Math.random() + 20 / 10 - 0.5) * size +
             (1 - Math.random() + 30 / 20 - 0.5) * size),
             this.color, 1, false, LineScaleMode.NONE, CapsStyle.ROUND);*/
            this.graphics.lineStyle(((Math.random() + 20 / 10 - 0.5) * size +
                (1 - Math.random() + 30 / 20 - 0.5) * size), this.color, 1, false);
            //增加周围墨点
            this.graphics.moveTo(this.startPosX + a, this.startPosY + a);
            this.graphics.lineTo(this.startPosX + r + a, this.startPosY + r + a);
            this.graphics.endFill();
        };
        /**
         * 清除
         */
        OilPainting.prototype.clear = function () {
            this.graphics.clear();
        };
        Object.defineProperty(OilPainting.prototype, "color", {
            /**
             * 线条颜色
             */
            get: function () { return this._color; },
            set: function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        return OilPainting;
    }());
    effect.OilPainting = OilPainting;
    __reflect(OilPainting.prototype, "effect.OilPainting");
})(effect || (effect = {}));
//# sourceMappingURL=OilPainting.js.map