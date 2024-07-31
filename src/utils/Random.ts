/**
 * Created by tangben on 2015/7/6.
 */
module utils
{
export class Random
{

    /**
     * 在 start 与 stop之间取一个随机整数，可以用step指定间隔， 但不包括较大的端点（start与stop较大的一个）
     * 如
     * Random.randrange(1, 10, 3)
     * 则返回的可能是   1 或  4 或  7  , 注意 这里面不会返回10，因为是10是大端点
     *
     * @param start
     * @param stop
     * @param step
     * @return 假设 start < stop,  [start, stop) 区间内的随机整数
     *
     */
    public static randrange(start:number, stop:number, step:number=1):number
    {
        if (step == 0)
            throw new Error('step 不能为 0');

        var width:number = stop - start;
        if (width == 0)
            throw new Error('没有可用的范围('+ start + ',' + stop+')');
        if (width < 0)
            width = start - stop;

        var n:number = Math.floor((width + step - 1) / step);
        return Math.floor(Random.random() * n) * step + Math.min(start, stop);
    }

    /**
     * 返回a 到 b直间的随机整数，包括 a 和 b
     * @param a
     * @param b
     * @return [a, b] 直接的随机整数
     *
     */
    public static randint(a:number, b:number):number
    {
        a = Math.floor(a);
        b = Math.floor(b);
        if (a > b)
            a++;
        else
            b++;
        return Random.randrange(a, b);
    }

    /**
    * 返回 a - b之间的随机数，不包括  Math.max(a, b)
    * @param a
    * @param b
    * @return 假设 a < b, [a, b)
    */
    public static randnum(a:number, b:number):number
    {
        return Random.random() * (b - a) + a;
    }
    
    /**
    * 打乱数组
    * @param array
    * @return
    */
    public static shuffle(array:any[]):any[]
    {
        array.sort(Random._randomCompare);
        return array;
    }
    
    private static _randomCompare(a:Object, b:Object):number
    {
        return (Random.random() > .5) ? 1 : -1;
    }

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
     * @param sequence  数组
     * @param num       采样数量
     * @param exclude   排除的对象索引
     * @return 采样后的数组
     */
    public static sample(sequence:any[], num:number, exclude:number=-1):any[]
    {
        var len:number = sequence.length;
        if (num <= 0 || len < num)
            throw new Error("采样数量不够");

        var selected:any[] = [];
        var indices:any[] = [];
        for (var i:number = 0; i < num; i++)
        {
            var index:number = Math.floor(Random.random() * len);
            while (indices.indexOf(index) >= 0 || (index == exclude && num < sequence.length))
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