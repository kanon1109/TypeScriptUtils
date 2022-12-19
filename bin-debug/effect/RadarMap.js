var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 雷达图
 */
var effect;
(function (effect) {
    var RadarMap = (function () {
        function RadarMap(fillCanvas, lineCanvas) {
            //是否显示过渡动画
            this.isShowAnim = true;
            //数据填充颜色
            this.fillColor = 0xFF0000;
            //数据线段颜色
            this.lineColor = 0xFF0000;
            //图形线段颜色
            this.graphLineColor = 0xFFFFFF;
            //数据点的半径
            this.dataPointRadius = 3;
            this._count = 6;
            this._radius = 100;
            this.maxValue = 100;
            this._duration = 200;
            this.fillCanvas = fillCanvas;
            this.lineCanvas = lineCanvas;
            this.initGraphDataPoint();
        }
        /**
         * 初始化数据点
         */
        RadarMap.prototype.initGraphDataPoint = function () {
            this.pointList = [];
            this.pointDataList = [];
            var angle = 360 / this._count;
            var curAngle = 90;
            var sp = new egret.Point();
            this.pointList.push(sp);
            for (var i = 0; i < this._count; i++) {
                var p = new egret.Point();
                var rds = utils.MathUtil.dgs2rds(curAngle);
                p.x = Math.cos(rds) * this._radius;
                p.y = Math.sin(rds) * this._radius;
                curAngle -= angle;
                this.pointList.push(p);
                this.pointDataList.push(new egret.Point());
            }
        };
        /**
         * 绘制外形线条
         * @param	lineColor	线段颜色
         * @param	lineWidth	线段宽度
         */
        RadarMap.prototype.drawGraphLine = function (lineColor, lineWidth) {
            if (lineColor === void 0) { lineColor = 0xFFFFFF; }
            if (lineWidth === void 0) { lineWidth = 1; }
            if (!this._showDraw)
                return;
            if (!this.lineCanvas)
                return;
            this.lineCanvas.graphics.clear();
            var length = this.pointList.length;
            var sp = this.pointList[0];
            var np;
            this.lineCanvas.graphics.lineStyle(lineWidth, lineColor);
            for (var i = 1; i < length; i++) {
                var p = this.pointList[i];
                if (i < length - 1)
                    np = this.pointList[i + 1];
                else
                    np = this.pointList[1];
                this.lineCanvas.graphics.moveTo(sp.x, sp.y);
                this.lineCanvas.graphics.lineTo(p.x, p.y);
                this.lineCanvas.graphics.moveTo(p.x, p.y);
                this.lineCanvas.graphics.lineTo(np.x, np.y);
            }
        };
        /**
         * 绘制图形
         * @param	dataList	数量列表 [0 到 maxValue, 0 到 maxValue ]
         */
        RadarMap.prototype.drawGraph = function (dataList) {
            if (!dataList || dataList.length == 0)
                return;
            var length = this.pointDataList.length;
            var angle = 360 / this.count;
            var curAngle = -90;
            for (var i = 0; i < length; i++) {
                var value = 0;
                if (i < dataList.length)
                    value = dataList[i];
                if (value < 0)
                    value = 0;
                else if (value > this.maxValue)
                    value = this.maxValue;
                var rds = utils.MathUtil.dgs2rds(curAngle);
                var r = this._radius * (value / this.maxValue);
                var x = Math.cos(rds) * r;
                var y = Math.sin(rds) * r;
                var point = this.pointDataList[i];
                curAngle += angle;
                if (this.isShowAnim) {
                    // egret.Ticker.getInstance().register(this.loopHandler, this);
                    if (i == length - 1)
                        egret.Tween.get(point, { onChange: this.loopHandler, onChangeObj: this }).to({ x: x, y: y }, this._duration, egret.Ease.sineOut).call(this.completeHandler, this);
                    else
                        egret.Tween.get(point).to({ x: x, y: y }, this._duration, egret.Ease.sineOut);
                }
                else {
                    point.x = x;
                    point.y = y;
                }
            }
            if (!this.isShowAnim)
                this.loopHandler();
        };
        RadarMap.prototype.completeHandler = function () {
            // egret.Ticker.getInstance().unregister(this.loopHandler, this);
            this.loopHandler();
        };
        RadarMap.prototype.loopHandler = function () {
            this.fillCanvas.graphics.clear();
            this.fillCanvas.graphics.lineStyle(1, this.lineColor);
            var length = this.pointDataList.length;
            this.fillCanvas.graphics.beginFill(this.fillColor);
            for (var i = 0; i < length; i++) {
                var point = this.pointDataList[i];
                if (i == 0)
                    this.fillCanvas.graphics.moveTo(point.x, point.y);
                else
                    this.fillCanvas.graphics.lineTo(point.x, point.y);
            }
            this.fillCanvas.graphics.lineTo(this.pointDataList[0].x, this.pointDataList[0].y);
            this.fillCanvas.graphics.endFill();
        };
        Object.defineProperty(RadarMap.prototype, "showDraw", {
            /**
             * 是否绘制图形
             */
            get: function () { return this._showDraw; },
            set: function (value) {
                this._showDraw = value;
                this.drawGraphLine(this.graphLineColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadarMap.prototype, "count", {
            /**
             * 角数
             */
            get: function () { return this._count; },
            set: function (value) {
                this._count = value;
                if (this._count < RadarMap.MIN_COUNT)
                    this._count = RadarMap.MIN_COUNT;
                this.initGraphDataPoint();
                this.drawGraphLine(this.graphLineColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadarMap.prototype, "radius", {
            /**
             * 半径
             */
            get: function () { return this._radius; },
            set: function (value) {
                this._radius = value;
                this.initGraphDataPoint();
                this.drawGraphLine(this.graphLineColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadarMap.prototype, "duration", {
            /**
             * 过渡动画的时间间隔
             */
            get: function () { return this._duration; },
            set: function (value) {
                if (value < 0)
                    value = 0;
                if (value == 0)
                    this.isShowAnim = false;
                else
                    this.isShowAnim = true;
                this._duration = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 销毁
         */
        RadarMap.prototype.destroySelf = function () {
            // egret.Ticker.getInstance().unregister(this.loopHandler, this);
            var length = this.pointDataList.length;
            for (var i = 0; i < length; i++) {
                var point = this.pointDataList[i];
                egret.Tween.removeTweens(point);
            }
            this.pointList = null;
            this.pointDataList = null;
            if (this.fillCanvas) {
                this.fillCanvas.graphics.clear();
                if (this.fillCanvas.parent)
                    this.fillCanvas.parent.removeChild(this.fillCanvas);
                this.fillCanvas = null;
            }
            if (this.lineCanvas) {
                this.lineCanvas.graphics.clear();
                if (this.lineCanvas.parent)
                    this.lineCanvas.parent.removeChild(this.lineCanvas);
                this.lineCanvas = null;
            }
        };
        //最少角数不小于3个
        RadarMap.MIN_COUNT = 3;
        return RadarMap;
    }());
    effect.RadarMap = RadarMap;
    __reflect(RadarMap.prototype, "effect.RadarMap");
})(effect || (effect = {}));
//# sourceMappingURL=RadarMap.js.map