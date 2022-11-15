var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/10.
 */
var effect;
(function (effect) {
    /**
     * 血液飞溅效果
     * @author Kanon
     */
    var BloodSplatter = (function () {
        /**
         * @param	container		效果外部容器
         * @param	assest			飞溅资源
         * @param	width			舞台宽度
         * @param	height			舞台高度
         * @param	num				飞溅数量
         * @param	dis				飞溅距离
         * @param	intensity		飞溅强度
         * @param	size			飞溅大小
         */
        function BloodSplatter(container, assest, num, dis, intensity, size) {
            if (num === void 0) { num = 12; }
            if (dis === void 0) { dis = 65; }
            if (intensity === void 0) { intensity = .8; }
            if (size === void 0) { size = 1.6; }
            this.num = num;
            this.dis = dis;
            this.intensity = intensity;
            this.size = size;
            this.assest = assest;
            this.container = container;
            this.bloodTextrue = RES.getRes(assest);
            this.bloodList = [];
        }
        /**
         * 根据位置绘制血迹
         * @param	targetX		x坐标
         * @param	targetY		y坐标
         */
        BloodSplatter.prototype.doSplatter = function (targetX, targetY) {
            for (var i = 0; i < this.num; i += 1) {
                //创建血迹
                var blood = new egret.Bitmap(this.bloodTextrue);
                //设置位置
                blood.x = targetX + Math.random() * (this.dis + 1) - (this.dis / 2);
                blood.y = targetY + Math.random() * (this.dis + 1) - (this.dis / 2);
                //trace(Math.random() * (this.dis + 1) - (this.dis / 2));
                //设置缩放
                blood.scaleX = Math.random() * this.size + this.size / 4;
                blood.scaleY = Math.random() * this.size + this.size / 4;
                //角度
                blood.rotation = Math.random() * 360;
                //透明度
                blood.alpha = Math.random() * this.intensity + this.intensity / 4;
                this.container.addChild(blood);
                this.bloodList.push(blood);
            }
        };
        /**
         * 清除画布
         */
        BloodSplatter.prototype.clear = function () {
            var count = this.bloodList.length;
            for (var i = count - 1; i >= 0; --i) {
                var blood = this.bloodList[i];
                if (blood &&
                    blood.parent)
                    blood.parent.removeChild(blood);
                this.bloodList.splice(i, 1);
            }
        };
        /**
         * 销毁
         */
        BloodSplatter.prototype.destroy = function () {
            this.clear();
            this.bloodList = null;
            this.bloodTextrue.dispose();
        };
        return BloodSplatter;
    }());
    effect.BloodSplatter = BloodSplatter;
    __reflect(BloodSplatter.prototype, "effect.BloodSplatter");
})(effect || (effect = {}));
//# sourceMappingURL=BloodSplatter.js.map