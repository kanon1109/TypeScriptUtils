var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var effect;
(function (effect) {
    var WaterWave = (function () {
        function WaterWave(shape, width, height, waterY) {
            this.shape = shape;
            this.width = width;
            this.height = height;
            this.waterY = waterY;
            this.init();
        }
        WaterWave.prototype.init = function () {
            this.n = 20; // 细分数
            this.nodeArray = []; // 装载水面上的点
            this.nodeEnergy = []; // 每个点的能量
            // 赋予初始值
            for (var i = 0; i < this.n; i++) {
                this.nodeEnergy[i] = 0;
            }
            for (var i = 0; i < this.n; i++) {
                var node = { x: 0, y: 0 };
                node.x = (i + 1) * this.width / this.n;
                node.y = this.waterY;
                this.nodeArray[i] = node;
            }
            // 最右侧点缓动
            var obj = this.nodeArray[this.n - 1];
            var time = 500;
            egret.Tween.get(obj, { loop: true }).to({ y: 40 + this.waterY }, time, egret.Ease.sineOut)
                .to({ y: 0 + this.waterY }, time, egret.Ease.sineIn)
                .to({ y: -40 + this.waterY }, time, egret.Ease.sineOut)
                .to({ y: 0 + this.waterY }, time, egret.Ease.sineIn);
        };
        WaterWave.prototype.showWater = function () {
            var draw = this.shape.graphics;
            draw.clear();
            draw.lineStyle(1, 0xFF0000);
            draw.beginFill(0xff0000);
            draw.moveTo(0, this.waterY);
            for (var i = 0; i < this.n; i += 2) {
                // 贝塞尔
                draw.curveTo(this.nodeArray[i].x, this.nodeArray[i].y, this.nodeArray[i + 1].x, this.nodeArray[i + 1].y);
            }
            // 封闭区域
            draw.lineTo(this.width, this.height);
            draw.lineTo(0, this.height);
            draw.lineTo(0, this.waterY);
            draw.endFill();
        };
        WaterWave.prototype.update = function (dt) {
            // 左右点互相影响 2 次, 决定波的传播快慢
            for (var k = 0; k < 2; k++) {
                for (var i = 0; i < this.n; i++) {
                    if (i > 0) {
                        // 0.02 的传播损失
                        // 向左传
                        this.nodeEnergy[i - 1] += 0.98 * (this.nodeArray[i].y - this.nodeArray[i - 1].y);
                    }
                    if (i < this.n - 1) {
                        // 向右传
                        this.nodeEnergy[i + 1] += 0.98 * (this.nodeArray[i].y - this.nodeArray[i + 1].y);
                    }
                }
            }
            // 最右侧的跳过
            for (var i = 0; i < this.n - 1; i++) {
                // 0.02 速度损失
                this.nodeEnergy[i] *= 0.98;
                // 改变位置
                this.nodeArray[i].y += this.nodeEnergy[i] * dt / 1000;
            }
            this.showWater();
        };
        return WaterWave;
    }());
    effect.WaterWave = WaterWave;
    __reflect(WaterWave.prototype, "effect.WaterWave");
})(effect || (effect = {}));
//# sourceMappingURL=WaterWave.js.map