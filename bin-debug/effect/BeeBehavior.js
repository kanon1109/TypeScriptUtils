var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by tangben on 2015/7/10.
 */
var effect;
(function (effect) {
    /**
     * 蜜蜂行为
     * @author Kanon
     */
    var BeeBehavior = (function () {
        function BeeBehavior(rangeX, rangeY) {
            //摩擦力
            this.friction = .95;
            this.rangeX = rangeX;
            this.rangeY = rangeY;
            this.beeList = [];
        }
        /**
         * 添加蜜蜂
         * @param	bee 蜜蜂对象
         */
        BeeBehavior.prototype.addBee = function (bee) {
            if (this.beeList.indexOf(bee) == -1)
                this.beeList.push(bee);
        };
        /**
         * 去除一个蜜蜂
         * @param	bee	蜜蜂对象
         */
        BeeBehavior.prototype.removeBee = function (bee) {
            if (!bee)
                return;
            if (!this.beeList)
                return;
            var index = this.beeList.indexOf(bee);
            if (index == -1)
                return;
            this.beeList.splice(index, 1);
            if (bee.parent)
                bee.parent.removeChild(bee);
        };
        //主循环
        BeeBehavior.prototype.update = function () {
            if (!this.beeList)
                return;
            var count = this.beeList.length;
            for (var i = 0; i < count; ++i) {
                var bee = this.beeList[i];
                if (bee) {
                    bee.vx += Math.random() * this.rangeX - this.rangeX * .5;
                    bee.vy += Math.random() * this.rangeY - this.rangeY * .5;
                    bee.x += bee.vx;
                    bee.y += bee.vy;
                    bee.vx *= this.friction;
                    bee.vy *= this.friction;
                }
            }
        };
        /**
         * 销毁
         */
        BeeBehavior.prototype.destroy = function () {
            if (!this.beeList)
                return;
            var count = this.beeList.length;
            for (var i = count - 1; i >= 0; --i) {
                var bee = this.beeList[i];
                if (bee && bee.parent)
                    bee.parent.removeChild(bee);
                this.beeList.splice(i, 1);
            }
            this.beeList = null;
        };
        return BeeBehavior;
    }());
    effect.BeeBehavior = BeeBehavior;
    __reflect(BeeBehavior.prototype, "effect.BeeBehavior");
    var Bee = (function (_super) {
        __extends(Bee, _super);
        function Bee(dObj) {
            var _this = _super.call(this) || this;
            _this.vx = 0;
            _this.vy = 0;
            if (_this._dObj && _this._dObj.parent)
                _this._dObj.parent.removeChild(_this._dObj);
            _this._dObj = dObj;
            _this.addChild(dObj);
            return _this;
        }
        return Bee;
    }(egret.Sprite));
    effect.Bee = Bee;
    __reflect(Bee.prototype, "effect.Bee");
})(effect || (effect = {}));
//# sourceMappingURL=BeeBehavior.js.map