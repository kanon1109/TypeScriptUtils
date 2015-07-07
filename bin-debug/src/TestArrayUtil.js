/**
 * Created by tangben on 2015/7/6.
 */
var TestArrayUtil = (function () {
    function TestArrayUtil() {
        var arr = ["kanon", "tang", "1109", "aaaa"];
        console.log("findElementIndex: " + cn.geckos.utils.ArrayUtil.findElementIndex(arr, "1109"));
        var arr2 = [2, 5, 8, 1, 4, 6, 9, 21, 3, 35, 8, 64, 3];
        console.log("getMaxElementIndex: " + cn.geckos.utils.ArrayUtil.getMaxElementIndex(arr2));
        console.log("getMinElementIndex: " + cn.geckos.utils.ArrayUtil.getMinElementIndex(arr2));
        console.log("getUniqueAry: " + cn.geckos.utils.ArrayUtil.getUniqueAry([6, 3, 1, 10, 2, 2, 3, 7, 4]));
        var arr3 = [1, 1, 2, 3, 3, 4, 5, 6, 6, 7];
        var arr4 = [3, 23, 12, 3, 3, 14, 5, 16, 6, 7];
        //23,16,14,12,4,2,1
        console.log("getDifferAry: " + cn.geckos.utils.ArrayUtil.getDifferAry(arr3, arr4));
        var arr5 = cn.geckos.utils.ArrayUtil.cloneList(arr3);
        cn.geckos.utils.ArrayUtil.clearList(arr3);
        console.log("clearList arr3: " + arr3);
        console.log("cloneList arr5: " + arr5);
        cn.geckos.utils.ArrayUtil.swap(arr5, 0, arr5.length - 1);
        console.log("swap arr5: " + arr5);
        console.log("equals " + cn.geckos.utils.ArrayUtil.equals([1, 2, 3], [1, 2, 3]));
        cn.geckos.utils.ArrayUtil.insert(arr5, 1, 100);
        console.log("insert arr5:" + arr5);
        var arr6 = cn.geckos.utils.ArrayUtil.cloneList(arr5);
        cn.geckos.utils.ArrayUtil.bubbleSort(arr5);
        console.log("bubbleSort arr5:" + arr5);
        cn.geckos.utils.ArrayUtil.insertionSort(arr6);
        console.log("insertionSort arr6:" + arr6);
        console.log("binarySearch :" + cn.geckos.utils.ArrayUtil.binarySearch(arr6, 100));
    }
    var __egretProto__ = TestArrayUtil.prototype;
    return TestArrayUtil;
})();
TestArrayUtil.prototype.__class__ = "TestArrayUtil";
