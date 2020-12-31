var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by kanon on 2015/7/11.
 */
var effect;
(function (effect) {
    /**
     * 僚机的跟随效果
     * @author Kanon
     */
    var WingmanMotion = (function () {
        function WingmanMotion(wingMc) {
            this.wingMc = wingMc;
            this.vx = 0;
            this.vy = 0;
        }
        /**
         * 跟随
         * @param	targetX		目标位置x
         * @param	targetY		目标位置y
         */
        WingmanMotion.prototype.follow = function (targetX, targetY) {
            if (!this.wingMc)
                return;
            //缓动系数
            var ease = .002;
            //衰减系数
            var decay = .98;
            //阻力
            var resistance = .05;
            //加速度
            var ax = -(this.wingMc.x - targetX) * ease;
            var ay = -(this.wingMc.y - targetY) * ease;
            if (ax > 0)
                ax -= resistance;
            else
                ax += resistance;
            if (ay > 0)
                ay -= resistance;
            else
                ay += resistance;
            this.vx += ax;
            this.vy += ay;
            //衰减
            this.vx *= decay;
            this.vy *= decay;
            this.wingMc.x += this.vx;
            this.wingMc.y += this.vy;
        };
        return WingmanMotion;
    }());
    effect.WingmanMotion = WingmanMotion;
    __reflect(WingmanMotion.prototype, "effect.WingmanMotion");
})(effect || (effect = {}));
//# sourceMappingURL=WingmanMotion.js.map