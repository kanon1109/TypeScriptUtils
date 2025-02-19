var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/6.
 */
var utils;
(function (utils) {
    var Random = (function () {
        function Random() {
        }
        /**
         * 在 start 与 stop之间取一个随机整数，可以用step指定间隔， 但不包括较大的端点（start与stop较大的一个）
         * 如
         * Random.randrange(1, 10, 3)
         * 则返回的可能是   1 或  4 或  7  , 注意 这里面不会返回10，因为是10是大端点
         *
         * @param start
         * @param stop
         * @param step
         * @return 假设 start < stop,  [start, stop) 区间内的随机整数
         *
         */
        Random.randrange = function (start, stop, step) {
            if (step === void 0) { step = 1; }
            if (step == 0)
                throw new Error('step 不能为 0');
            var width = stop - start;
            if (width == 0)
                throw new Error('没有可用的范围(' + start + ',' + stop + ')');
            if (width < 0)
                width = start - stop;
            var n = Math.floor((width + step - 1) / step);
            return Math.floor(Random.random() * n) * step + Math.min(start, stop);
        };
        /**
         * 返回a 到 b直间的随机整数，包括 a 和 b
         * @param a
         * @param b
         * @return [a, b] 直接的随机整数
         *
         */
        Random.randint = function (a, b) {
            a = Math.floor(a);
            b = Math.floor(b);
            if (a > b)
                a++;
            else
                b++;
            return Random.randrange(a, b);
        };
        /**
         * 返回a 到 b直间的随机整数，包括 a 和 b
         * @param a
         * @param b
         * @param exclude 需要排除的数字
         * @return [a, b] 直接的随机整数
         *
         */
        Random.randint2 = function (a, b, exclude) {
            a = Math.floor(a);
            b = Math.floor(b);
            if (a > b)
                a++;
            else
                b++;
            var result;
            do {
                result = Random.randrange(a, b);
            } while (result === exclude);
            return result;
        };
        /**
        * 返回 a - b之间的随机数，不包括  Math.max(a, b)
        * @param a
        * @param b
        * @return 假设 a < b, [a, b)
        */
        Random.randnum = function (a, b) {
            return Random.random() * (b - a) + a;
        };
        /**
        * 打乱数组
        * @param array
        * @return
        */
        Random.shuffle = function (array) {
            array.sort(Random._randomCompare);
            return array;
        };
        Random._randomCompare = function (a, b) {
            return (Random.random() > .5) ? 1 : -1;
        };
        /**
        * 从序列中随机取一个元素
        * @param sequence 可以是 数组、 vector，等只要是有length属性，并且可以用数字索引获取元素的对象，
        *                 另外，字符串也是允许的。
        * @return 序列中的某一个元素
        *
        */
        Random.choice = function (sequence) {
            if (!sequence.hasOwnProperty("length"))
                throw new Error('无法对此对象执行此操作');
            var index = Math.floor(Random.random() * sequence.length);
            if (sequence instanceof String)
                return String(sequence).charAt(index);
            else
                return sequence[index];
        };
        /**
       * 从序列中随机取一个元素
       * @param sequence 可以是 数组、 vector，等只要是有length属性，并且可以用数字索引获取元素的对象，
       *                 另外，字符串也是允许的。
       * @param exclude  需要排除的数据
       * @return 序列中的某一个元素
       *
       */
        Random.choice2 = function (sequence, exclude) {
            if (!sequence.hasOwnProperty("length"))
                throw new Error('无法对此对象执行此操作');
            var index = Math.floor(Random.random() * sequence.length);
            if (sequence instanceof String) {
                var str = String(sequence).charAt(index);
                if (str == exclude)
                    return this.choice2(sequence, exclude);
                return str;
            }
            else {
                var data = sequence[index];
                if (data == exclude)
                    return this.choice2(sequence, exclude);
                return data;
            }
        };
        /**
         * 对列表中的元素进行随机采?
         * <pre>
         * Random.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
         * [4, 1, 5]
         * </pre>
         * @param sequence
         * @param num
         * @return
         *
         */
        Random.sample = function (sequence, num, exclude) {
            if (exclude === void 0) { exclude = -1; }
            var len = sequence.length;
            if (num <= 0 || len < num)
                throw new Error("采样数量不够");
            var selected = [];
            var indices = [];
            for (var i = 0; i < num; i++) {
                var index = Math.floor(Random.random() * len);
                while (indices.indexOf(index) >= 0 || (index == exclude && num < sequence.length))
                    index = Math.floor(Random.random() * len);
                selected.push(sequence[index]);
                indices.push(index);
            }
            return selected;
        };
        /**
         * 对列表中的元素进行随机采?
         * <pre>
         * Random.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
         * [4, 1, 5]
         * </pre>
         * @param sequence
         * @param num
         * @return
         *
         */
        Random.sampleIndex = function (sequence, num, exclude) {
            if (exclude === void 0) { exclude = -1; }
            var len = sequence.length;
            if (num <= 0 || len < num)
                throw new Error("采样数量不够");
            var indices = [];
            for (var i = 0; i < num; i++) {
                var index = Math.floor(Random.random() * len);
                while (indices.indexOf(index) >= 0 || (index == exclude && num < sequence.length))
                    index = Math.floor(Random.random() * len);
                indices.push(index);
            }
            return indices;
        };
        /**
         * 返回 0.0 - 1.0 之间的随机数，等同于 Math.random()
         * @return Math.random()
         *
         */
        Random.random = function () {
            return Math.random();
        };
        /**
         * 计算概率
         * @param	chance 概率
         * @return
         */
        Random.boolean = function (chance) {
            if (chance === void 0) { chance = .5; }
            return (Random.random() < chance) ? true : false;
        };
        Random.UUID = function (prefix) {
            return (prefix || '') + new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
        };
        Random.getRandomColor = function () {
            var letters = '0123456789ABCDEF';
            var color = '0x';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return parseInt(color);
        };
        /**
         * 获取随机不重复整数
         */
        Random.getRandomIntegers = function (n, min, max) {
            if (n > (max - min + 1)) {
                throw new Error("The range is too small to get " + n + " unique numbers");
            }
            var numbers = [];
            for (var i = min; i <= max; i++) {
                numbers.push(i);
            }
            // 返回前n个元素
            return Random.sample(numbers, n);
        };
        return Random;
    }());
    utils.Random = Random;
    __reflect(Random.prototype, "utils.Random");
})(utils || (utils = {}));
//# sourceMappingURL=Random.js.map