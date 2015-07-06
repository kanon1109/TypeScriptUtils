/**
 * Created by tangben on 2015/7/6.
 */
module cn.geckos.utils
{
export class Random
{


    /**
    * 从序列中随机取一个元素
    * @param sequence 可以是 数组、 vector，等只要是有length属性，并且可以用数字索引获取元素的对象，
    *                 另外，字符串也是允许的。
    * @return 序列中的某一个元素
    *
    */
    public static choice(sequence:any):any
    {
        if(!sequence.hasOwnProperty("length"))
            throw new Error('无法对此对象执行此操作');
        var index:number = Math.floor(Random.random() * sequence.length);
        if (sequence instanceof String)
            return String(sequence).charAt(index);
        else
            return sequence[index];
    }
    
    
    /**
     * 对列表中的元素进行随机采æ ?
     * <pre>
     * Random.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
     * [4, 1, 5]
     * </pre>
     * @param sequence
     * @param num
     * @return
     *
     */
    public static sample(sequence:Array<any>, num:number):Array<any>
    {
        var len:number = sequence.length;
        if (num <= 0 || len < num)
            throw new Error("采样数量不够");

        var selected:Array<any> = [];
        var indices:Array<any> = [];
        for (var i:number = 0; i < num; i++)
        {
            var index:number = Math.floor(Random.random() * len);
            while (indices.indexOf(index) >= 0)
                index = Math.floor(Random.random() * len);

            selected.push(sequence[index]);
            indices.push(index);
        }

        return selected;
    }

    /**
     * 返回 0.0 - 1.0 之间的随机数，等同于 Math.random()
     * @return Math.random()
     *
     */
    public static random():number
    {
        return Math.random();
    }

    /**
     * 计算概率
     * @param	chance 概率
     * @return
     */
    public static boolean(chance:number = .5):boolean
    {
        return (Random.random() < chance) ?  true : false;
    }
}
}