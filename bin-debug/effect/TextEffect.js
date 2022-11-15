var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by kanon on 2015/7/11.
 */
var effect;
(function (effect) {
    /**
     * 字符串文本工具
     * @author Kanon
     */
    var TextEffect = (function () {
        function TextEffect() {
        }
        /**
         * 逐行显示
         * @param	text  	文本
         * @param	str   	字符串
         * @param	delay   显示的间隔毫秒数
         */
        TextEffect.prototype.progressShow = function (text, str, delay) {
            this.text = text;
            this.str = str;
            this.addTimer(delay);
        };
        /**
         * 创建计时器
         * @param	delay  间隔毫秒数
         */
        TextEffect.prototype.addTimer = function (delay) {
            this.removeTimer();
            this.index = 0;
            this.timer = new egret.Timer(delay);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            this.timer.start();
        };
        TextEffect.prototype.timerHandler = function (event) {
            var subStr = this.str.charAt(this.index);
            this.text.appendText(subStr);
            this.index++;
            if (this.index == this.str.length) {
                if (this.completeFun && this.thisObj)
                    this.completeFun.call(this.thisObj);
                this.removeTimer();
            }
        };
        /**
         * 销毁计时器
         */
        TextEffect.prototype.removeTimer = function () {
            if (this.timer) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
                this.timer.stop();
                this.timer = null;
            }
        };
        /**
         * 销毁
         */
        TextEffect.prototype.destroy = function () {
            this.text = null;
            this.removeTimer();
        };
        /**
         * 设置回调方法
         */
        TextEffect.prototype.setCallBackFunction = function (fun, thisObj) {
            this.completeFun = fun;
            this.thisObj = thisObj;
        };
        return TextEffect;
    }());
    effect.TextEffect = TextEffect;
    __reflect(TextEffect.prototype, "effect.TextEffect");
})(effect || (effect = {}));
//# sourceMappingURL=TextEffect.js.map