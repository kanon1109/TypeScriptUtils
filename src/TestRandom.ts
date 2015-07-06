/**
 * Created by tangben on 2015/7/6.
 */
class TestRandom
{
    public constructor() {
        //super();
        console.log("random():" + cn.geckos.utils.Random.random());
        console.log("boolean():" + cn.geckos.utils.Random.boolean());
        for(var i: number = 0;i < 10; ++i)
        {
            console.log("sample():" + cn.geckos.utils.Random.sample([1,2,3,4,5],3));
            console.log("sample():" + cn.geckos.utils.Random.sample(["tang","kanon","ben","1109"],2));
            
        }

        var a = 1;
        //console.log("choice():" + cn.geckos.utils.Random.choice(a));
        for(var i: number = 0;i < 10; ++i) {
            console.log("choice():" + cn.geckos.utils.Random.choice("kanontang"));
        }
    }
}