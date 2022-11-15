var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author Kanon
 *
 */
var KeyboardManagerTest = (function () {
    function KeyboardManagerTest() {
        this.index = 0;
        utils.KeyboardManager.init();
        utils.KeyboardManager.registerKey(utils.KeyboardManager.SPACE, this.test, this, utils.KeyboardManager.TYPE_KEY_UP);
    }
    KeyboardManagerTest.prototype.test = function () {
        this.index++;
        console.log("index:" + this.index);
        if (this.index == 2) {
            utils.KeyboardManager.unregisterKey(utils.KeyboardManager.SPACE, utils.KeyboardManager.TYPE_KEY_UP);
            utils.KeyboardManager.registerKey("S", this.test2, this);
        }
    };
    KeyboardManagerTest.prototype.test2 = function () {
        this.index++;
        console.log("test2 index:" + this.index);
        if (this.index == 10) {
            utils.KeyboardManager.destroy();
        }
    };
    return KeyboardManagerTest;
}());
__reflect(KeyboardManagerTest.prototype, "KeyboardManagerTest");
//# sourceMappingURL=KeyboardManagerTest.js.map