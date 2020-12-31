var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var effect;
(function (effect) {
    /**
     * ...老虎机 苹果机
     * 总结：
     * 无论起始索引是几，如何判断一个循环滚动是否结束。
     *
     * if (this.timer.currentCount >= this.loop * this.maxIndex)
     * 这个判断滚动次数是否大于快速滚动次数，才做慢速滚动判断，
     *
     * 否则如果碰到目标和起始索引相同的情况会出现一次也不滚的情况。
     *
     * 通过改变timer.sdelay来实现慢速缓缓结束。
     * 外部通过一个 funList 来实现 显示和数据的分离。
     *
     * @author Kanon
     */
    var Slots = (function () {
        /**
         * 老虎机效果
         * @param	curIndex	初始化的位置索引。
         * @param	maxIndex	总的索引数量。
         * @param	loop		快速模式的滚动次数。
         * 						在快速滚动次数达到后会有一次慢速滚动。一般滚动次数是loop + 1;
         * @param	delay		运行间隔 毫秒
         * @param	gapIndex	在到达从目标索引前，提前gapIndex个索引触发慢速滚动。
         */
        function Slots(curIndex, maxIndex, loop, delay, gapIndex) {
            if (loop === void 0) { loop = 1; }
            if (delay === void 0) { delay = 50; }
            if (gapIndex === void 0) { gapIndex = 5; }
            //触发的间隔时间变长的增量
            this._delayAdd = 300;
            curIndex = Math.floor(curIndex);
            if (curIndex < 1)
                curIndex = 1;
            if (maxIndex < 1)
                maxIndex = 1;
            if (curIndex > maxIndex)
                curIndex = maxIndex;
            if (loop < 1)
                loop = 1;
            if (delay <= 0)
                delay = 10;
            //初始化赋值
            this._curIndex = curIndex;
            this._randomIndex = curIndex;
            this.maxIndex = maxIndex;
            this.gapIndex = Math.abs(gapIndex);
            this.delay = delay;
            this.loop = loop;
            this.funList = [];
            this.thisList = [];
            this.addTimer(delay);
        }
        /**
         * 添加计时器
         * @param	delay	运行间隔
         */
        Slots.prototype.addTimer = function (delay) {
            if (!this.timer) {
                this.timer = new egret.Timer(delay);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            }
        };
        /**
         * 计时器暂停
         */
        Slots.prototype.stop = function () {
            if (!this.timer)
                return;
            if (this.timer.running) {
                this.timer.stop();
                this.timer.reset();
            }
        };
        /**
         * 计时器开始
         */
        Slots.prototype.start = function () {
            if (!this.timer)
                return;
            this.stop();
            this.timer.start();
        };
        /**
         * 显示获得
         * @param	targetIndex	获得索引
         * @param	reverse		是否逆运行
         */
        Slots.prototype.show = function (targetIndex, reverse) {
            if (reverse === void 0) { reverse = false; }
            if (!this.funList)
                return;
            if (!this.timer)
                return;
            targetIndex = Math.floor(targetIndex);
            if (targetIndex < 1)
                targetIndex = 1;
            else if (targetIndex > this.maxIndex)
                targetIndex = this.maxIndex;
            this.slowing = false;
            this.timer.delay = this.delay;
            this.targetIndex = targetIndex;
            //设置间隔后的索引
            if (!reverse)
                this.slowIndex = this.fixNumber(this.targetIndex - this.gapIndex, 1, this.maxIndex);
            else
                this.slowIndex = this.fixNumber(this.targetIndex + this.gapIndex, 1, this.maxIndex);
            this.reverse = reverse;
            this.start();
        };
        Slots.prototype.timerHandler = function (event) {
            if (!this.funList)
                return;
            //索引轮回
            if (!this.reverse) {
                this._curIndex++;
                if (this._curIndex > this.maxIndex)
                    this._curIndex = 1;
            }
            else {
                this._curIndex--;
                if (this._curIndex < 1)
                    this._curIndex = this.maxIndex;
            }
            this._randomIndex = Math.floor(Math.random() * this.maxIndex + 1);
            //一个循环结束
            if (this.timer.currentCount >= this.loop * this.maxIndex) {
                //是否进入了慢速模式
                if (this._curIndex == this.slowIndex) {
                    this.slowing = true;
                    this.timer.delay += this._delayAdd;
                }
            }
            if (this.slowing && this._curIndex == this.targetIndex) {
                this._randomIndex = this.targetIndex;
                this.stop();
            }
            var length = this.funList.length;
            for (var i = 0; i < length; i += 1) {
                var thisObj = this.thisList[i];
                this.funList[i].call(thisObj);
            }
        };
        /**
         * 修正数字 在一个范围内
         * @param	num     需要修正的数字
         * @param	min     最小的范围
         * @param	range   最大范围
         * @return  修正后的数字
         */
        Slots.prototype.fixNumber = function (num, min, range) {
            num %= range;
            if (num < min)
                return num + range;
            return num;
        };
        /**
         * 将方法放入列表中
         * @param	fun		方法引用
         */
        Slots.prototype.push = function (fun, thisObj) {
            if (!this.funList)
                return;
            if (this.funList.indexOf(fun) == -1) {
                this.funList.push(fun);
                this.thisList.push(thisObj);
            }
        };
        /**
         * 将列表中的方法删除
         * @param	fun		方法引用
         */
        Slots.prototype.splice = function (fun) {
            if (!this.funList)
                return;
            var index = this.funList.indexOf(fun);
            if (index != -1) {
                this.funList.splice(index, 1);
                this.thisList.splice(index, 1);
            }
        };
        /**
         * 销毁
         */
        Slots.prototype.destroy = function () {
            if (this.timer) {
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
                this.timer.stop();
                this.timer = null;
            }
            if (this.funList) {
                var length_1 = this.funList.length;
                for (var i = length_1 - 1; i >= 0; i -= 1) {
                    this.funList.splice(i, 1);
                }
                this.funList = null;
            }
            if (this.thisList) {
                var length_2 = this.thisList.length;
                for (var i = length_2 - 1; i >= 0; i -= 1) {
                    this.thisList.splice(i, 1);
                }
                this.thisList = null;
            }
        };
        Object.defineProperty(Slots.prototype, "curIndex", {
            /**
             * 当前索引
             */
            get: function () { return this._curIndex; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Slots.prototype, "delayAdd", {
            /**
             * timer延迟的增量 用于慢速滚动模式中的速度
             */
            get: function () { return this._delayAdd; },
            set: function (value) {
                this._delayAdd = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Slots.prototype, "randomIndex", {
            /**
             * 随机索引
             */
            get: function () { return this._randomIndex; },
            enumerable: true,
            configurable: true
        });
        return Slots;
    }());
    effect.Slots = Slots;
    __reflect(Slots.prototype, "effect.Slots");
})(effect || (effect = {}));
//# sourceMappingURL=Slots.js.map