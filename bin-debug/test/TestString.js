var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/6.
 */
var TestString = (function () {
    function TestString() {
        console.log("trim():" + utils.StringUtil.trim("   kanon tan g   "));
        //console.log("showUnicodeStr():" + utils.StringUtil.showUnicodeStr("k"));
        console.log("matchChineseWord():" + utils.StringUtil.matchChineseWord("k卡能tang"));
        var str = "kanon is aaa";
        console.log("matchChineseWord():" + utils.StringUtil.replaceMatch(str, "aaa", "good", true));
        str = "<title>HelloWorld</title>";
        console.log("htmlSpecialChars():" + utils.StringUtil.htmlSpecialChars(str));
        console.log("zfill():" + utils.StringUtil.zfill('16', 5));
        console.log("reverse():" + utils.StringUtil.reverse("kanon"));
        console.log("cutOff():" + utils.StringUtil.cutOff("kanon is a good man", 5, 9));
    }
    return TestString;
}());
__reflect(TestString.prototype, "TestString");
//# sourceMappingURL=TestString.js.map