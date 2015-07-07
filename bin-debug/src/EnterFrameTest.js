/**
 * Created by tangben on 2015/7/7.
 */
var EnterFrameTest = (function () {
    function EnterFrameTest() {
        this.index = 0;
        cn.geckos.utils.EnterFrame.init();
        console.log("2 this.test :" + this.test);
        cn.geckos.utils.EnterFrame.push(this.test, this);
        cn.geckos.utils.EnterFrame.push(this.test2, this);
    }
    var __egretProto__ = EnterFrameTest.prototype;
    __egretProto__.test = function () {
        console.log("test fun");
    };
    __egretProto__.test2 = function () {
        this.index++;
        console.log("this.index: " + this.index);
        if (this.index == 100) {
            console.log("indexOf :" + cn.geckos.utils.EnterFrame.indexOf(this.test));
            cn.geckos.utils.EnterFrame.pop(this.test);
        }
        if (this.index == 200) {
            cn.geckos.utils.EnterFrame.destroy();
        }
    };
    return EnterFrameTest;
})();
EnterFrameTest.prototype.__class__ = "EnterFrameTest";
