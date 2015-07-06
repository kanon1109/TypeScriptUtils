/**
 * Created by tangben on 2015/7/6.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var utils;
        (function (utils) {
            var Random = (function () {
                function Random() {
                }
                var __egretProto__ = Random.prototype;
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
                 * 对列表中的元素进行随机采æ ?
                 * <pre>
                 * Random.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
                 * [4, 1, 5]
                 * </pre>
                 * @param sequence
                 * @param num
                 * @return
                 *
                 */
                Random.sample = function (sequence, num) {
                    var len = sequence.length;
                    if (num <= 0 || len < num)
                        throw new Error("采样数量不够");
                    var selected = [];
                    var indices = [];
                    for (var i = 0; i < num; i++) {
                        var index = Math.floor(Random.random() * len);
                        while (indices.indexOf(index) >= 0)
                            index = Math.floor(Random.random() * len);
                        selected.push(sequence[index]);
                        indices.push(index);
                    }
                    return selected;
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
                return Random;
            })();
            utils.Random = Random;
            Random.prototype.__class__ = "cn.geckos.utils.Random";
        })(utils = geckos.utils || (geckos.utils = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=Random.js.map