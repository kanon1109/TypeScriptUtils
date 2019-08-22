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
        cn.geckos.utils.KeyboardManager.init();
        cn.geckos.utils.KeyboardManager.registerKey(cn.geckos.utils.KeyboardManager.SPACE, this.test, this, cn.geckos.utils.KeyboardManager.TYPE_KEY_UP);
    }
    KeyboardManagerTest.prototype.test = function () {
        this.index++;
        console.log("index:" + this.index);
        if (this.index == 2) {
            cn.geckos.utils.KeyboardManager.unregisterKey(cn.geckos.utils.KeyboardManager.SPACE, cn.geckos.utils.KeyboardManager.TYPE_KEY_UP);
            cn.geckos.utils.KeyboardManager.registerKey("S", this.test2, this);
        }
    };
    KeyboardManagerTest.prototype.test2 = function () {
        this.index++;
        console.log("test2 index:" + this.index);
        if (this.index == 10) {
            cn.geckos.utils.KeyboardManager.destroy();
        }
    };
    return KeyboardManagerTest;
}());
__reflect(KeyboardManagerTest.prototype, "KeyboardManagerTest");
//# sourceMappingURL=KeyboardManagerTest.js.map