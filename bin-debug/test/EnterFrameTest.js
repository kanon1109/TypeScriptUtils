var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/7.
 */
var EnterFrameTest = (function () {
    function EnterFrameTest() {
        this.index = 0;
        utils.EnterFrame.init();
        console.log("2 this.test :" + this.test);
        utils.EnterFrame.push(this.test, this);
        utils.EnterFrame.push(this.test2, this);
    }
    EnterFrameTest.prototype.test = function () {
        console.log("test fun");
    };
    EnterFrameTest.prototype.test2 = function () {
        this.index++;
        console.log("this.index: " + this.index);
        if (this.index == 100) {
            console.log("indexOf :" + utils.EnterFrame.indexOf(this.test));
            utils.EnterFrame.pop(this.test);
        }
        if (this.index == 200) {
            utils.EnterFrame.destroy();
        }
    };
    return EnterFrameTest;
}());
__reflect(EnterFrameTest.prototype, "EnterFrameTest");
//# sourceMappingURL=EnterFrameTest.js.map