/**
 *
 * @author Kanon
 *
 */
var KeyboardManagerTest = (function () {
    function KeyboardManagerTest() {
        this.index = 0;
        cn.geckos.utils.KeyboardManager.init();
        cn.geckos.utils.KeyboardManager.registerKey("A", this.test, this, cn.geckos.utils.KeyboardManager.TYPE_KEY_UP);
    }
    var __egretProto__ = KeyboardManagerTest.prototype;
    __egretProto__.test = function () {
        this.index++;
        console.log("index:" + this.index);
        if (this.index == 2) {
            cn.geckos.utils.KeyboardManager.unregisterKey("A", cn.geckos.utils.KeyboardManager.TYPE_KEY_UP);
            cn.geckos.utils.KeyboardManager.registerKey("S", this.test2, this);
        }
    };
    __egretProto__.test2 = function () {
        this.index++;
        console.log("test2 index:" + this.index);
        if (this.index == 10) {
            cn.geckos.utils.KeyboardManager.destroy();
        }
    };
    return KeyboardManagerTest;
})();
KeyboardManagerTest.prototype.__class__ = "KeyboardManagerTest";
//# sourceMappingURL=KeyboardManagerTest.js.map