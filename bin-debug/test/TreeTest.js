var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by tangben on 2015/7/10.
 */
var Tree = effect.Tree;
var TreeTest = (function (_super) {
    __extends(TreeTest, _super);
    function TreeTest() {
        var _this = _super.call(this) || this;
        Tree.draw(_this.graphics, 275, 600, 60, -Math.PI / 2, 12, 8);
        return _this;
    }
    return TreeTest;
}(egret.Sprite));
__reflect(TreeTest.prototype, "TreeTest");
//# sourceMappingURL=TreeTest.js.map