var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/6.
 */
var TestArrayUtil = (function () {
    function TestArrayUtil() {
        var arr = ["kanon", "tang", "1109", "aaaa"];
        console.log("findElementIndex: " + utils.ArrayUtil.findElementIndex(arr, "1109"));
        var arr2 = [2, 5, 8, 1, 4, 6, 9, 21, 3, 35, 8, 64, 3];
        console.log("getMaxElementIndex: " + utils.ArrayUtil.getMaxElementIndex(arr2));
        console.log("getMinElementIndex: " + utils.ArrayUtil.getMinElementIndex(arr2));
        console.log("getUniqueAry: " + utils.ArrayUtil.getUniqueAry([6, 3, 1, 10, 2, 2, 3, 7, 4]));
        var arr3 = [1, 1, 2, 3, 3, 4, 5, 6, 6, 7];
        var arr4 = [3, 23, 12, 3, 3, 14, 5, 16, 6, 7];
        //23,16,14,12,4,2,1
        console.log("getDifferAry: " + utils.ArrayUtil.getDifferAry(arr3, arr4));
        var arr5 = utils.ArrayUtil.cloneList(arr3);
        utils.ArrayUtil.clearList(arr3);
        console.log("clearList arr3: " + arr3);
        console.log("cloneList arr5: " + arr5);
        utils.ArrayUtil.swap(arr5, 0, arr5.length - 1);
        console.log("swap arr5: " + arr5);
        console.log("equals " + utils.ArrayUtil.equals([1, 2, 3], [1, 2, 3]));
        utils.ArrayUtil.insert(arr5, 1, 100);
        console.log("insert arr5:" + arr5);
        var arr6 = utils.ArrayUtil.cloneList(arr5);
        utils.ArrayUtil.bubbleSort(arr5);
        console.log("bubbleSort arr5:" + arr5);
        utils.ArrayUtil.insertionSort(arr6);
        console.log("insertionSort arr6:" + arr6);
        console.log("binarySearch :" + utils.ArrayUtil.binarySearch(arr6, 100));
    }
    return TestArrayUtil;
}());
__reflect(TestArrayUtil.prototype, "TestArrayUtil");
//# sourceMappingURL=TestArrayUtil.js.map