var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tangben on 2015/7/6.
 */
var TestRandom = (function () {
    function TestRandom() {
        //super();
        // console.log("random():" + utils.Random.random());
        // console.log("boolean():" + utils.Random.boolean());
        // for(var i: number = 0; i < 10; ++i)
        // {
        //     console.log("sample():" + utils.Random.sample([1,2,3,4,5],3));
        //     console.log("sample():" + utils.Random.sample(["tang","kanon","ben","1109"],2));
        // }
        // //var a = 1;
        // //console.log("choice():" + utils.Random.choice(a));
        // for(var i: number = 0; i < 10; ++i)
        // {
        //     console.log("choice():" + utils.Random.choice("kanontang"));
        // }
        // for(var i: number = 0; i < 10; ++i) 
        // {
        //     console.log("shuffle():" + utils.Random.shuffle([1, 2, 3, 4, 5]));
        //     console.log("randnum():" + utils.Random.randnum(10, 100));
        //     console.log("randint():" + utils.Random.randint(1, 10));
        //     console.log("randrange():" + utils.Random.randrange(1, 10, 2));
        // }
        for (var i = 0; i < 100; ++i) {
            console.log("randint2():" + utils.Random.randint2(1, 10, 1));
        }
    }
    return TestRandom;
}());
__reflect(TestRandom.prototype, "TestRandom");
//# sourceMappingURL=TestRandom.js.map