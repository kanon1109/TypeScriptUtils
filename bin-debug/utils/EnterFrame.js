var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    /**
     * enterFrame工具
     * @author Kanon
     */
    var EnterFrame = (function () {
        function EnterFrame() {
        }
        /**
         * 初始化
         * @param	fps	enterFrame执行的帧频
         */
        EnterFrame.init = function (fps) {
            if (fps === void 0) { fps = 24; }
            EnterFrame.funList = [];
            EnterFrame.thisObjList = [];
            EnterFrame.timer = new egret.Timer(Math.floor(1000 / fps));
            EnterFrame.timer.addEventListener(egret.TimerEvent.TIMER, EnterFrame.timerHandler, this);
            EnterFrame.isInit = true;
            EnterFrame.timer.start();
        };
        /**
         * 实时执行函数
         * @param	event
         */
        EnterFrame.timerHandler = function (event) {
            var length = EnterFrame.funList.length;
            for (var i = 0; i < length; i += 1) {
                var thisObj = EnterFrame.thisObjList[i];
                EnterFrame.funList[i].call(thisObj);
            }
        };
        /**
         * 添加一个需要实时执行的方法
         * @param	fun		方法对象
         * @param	thisObj	this指向
         */
        EnterFrame.push = function (fun, thisObj) {
            if (!EnterFrame.isInit)
                return;
            if (EnterFrame.funList.indexOf(fun) == -1) {
                EnterFrame.funList.push(fun);
                EnterFrame.thisObjList.push(thisObj);
            }
        };
        /**
         * 删除一个方法
         * @param	fun	方法对象
         */
        EnterFrame.pop = function (fun) {
            if (!EnterFrame.isInit)
                return;
            var index = EnterFrame.funList.indexOf(fun);
            if (index == -1)
                return;
            EnterFrame.thisObjList.splice(index, 1);
            EnterFrame.funList.splice(index, 1);
        };
        /**
         * 暂停
         */
        EnterFrame.pause = function () {
            if (!EnterFrame.isInit)
                return;
            if (EnterFrame.timer.running)
                EnterFrame.timer.stop();
        };
        /**
         * 播放
         */
        EnterFrame.unPause = function () {
            if (!EnterFrame.isInit)
                return;
            if (!EnterFrame.timer.running)
                EnterFrame.timer.start();
        };
        /**
         * 查找存放的方法的索引	如果不存在则返回-1。
         * @param	fun		查找的方法
         * @return	索引
         */
        EnterFrame.indexOf = function (fun) {
            return EnterFrame.funList.indexOf(fun);
        };
        /**
         * 销毁enterFrame
         */
        EnterFrame.destroy = function () {
            if (EnterFrame.funList) {
                var length = EnterFrame.funList.length;
                for (var i = length - 1; i >= 0; i -= 1) {
                    EnterFrame.funList.splice(i, 1);
                }
                EnterFrame.funList = null;
            }
            if (EnterFrame.thisObjList) {
                var length = EnterFrame.thisObjList.length;
                for (var i = length - 1; i >= 0; i -= 1) {
                    EnterFrame.thisObjList.splice(i, 1);
                }
                EnterFrame.thisObjList = null;
            }
            if (EnterFrame.timer) {
                EnterFrame.timer.removeEventListener(egret.TimerEvent.TIMER, EnterFrame.timerHandler, this);
                EnterFrame.timer.stop();
                EnterFrame.timer = null;
            }
            EnterFrame.isInit = false;
        };
        return EnterFrame;
    }());
    utils.EnterFrame = EnterFrame;
    __reflect(EnterFrame.prototype, "utils.EnterFrame");
})(utils || (utils = {}));
//# sourceMappingURL=EnterFrame.js.map