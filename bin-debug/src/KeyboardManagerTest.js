/**
 *
 * @author
 *
 */
var KeyboardManagerTest = (function () {
    function KeyboardManagerTest() {
        this.index = 0;
        cn.geckos.utils.KeyboardManager.init();
        cn.geckos.utils.KeyboardManager.registerKey("a", this.test, this);
        console.log("String.fromCharCode(charCode);" + String.fromCharCode(65));
    }
    var __egretProto__ = KeyboardManagerTest.prototype;
    __egretProto__.test = function () {
        this.index++;
        console.log("index:" + this.index);
    };
    return KeyboardManagerTest;
})();
KeyboardManagerTest.prototype.__class__ = "KeyboardManagerTest";
//# sourceMappingURL=KeyboardManagerTest.js.map