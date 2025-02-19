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
     * 返回a 到 b直间的随机整数，包括 a 和 b
     * @param a
     * @param b
     * @param exclude 需要排除的数字
     * @return [a, b] 直接的随机整数
     *
     */
    public static randint2(a:number, b:number, exclude: number):number
    {
        a = Math.floor(a);
        b = Math.floor(b);
        if (a > b)
            a++;
        else
            b++;
        let result:number;
        do
        {
            result = Random.randrange(a, b);
        }
        while(result === exclude);
        return result;
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
    * 从序列中随机取一个元素
    * @param sequence 可以是 数组、 vector，等只要是有length属性，并且可以用数字索引获取元素的对象，
    *                 另外，字符串也是允许的。
    * @param exclude  需要排除的数据
    * @return 序列中的某一个元素
    *
    */
    public static choice2(sequence:any, exclude:any):any
    {
        if(!sequence.hasOwnProperty("length"))
            throw new Error('无法对此对象执行此操作');
        var index:number = Math.floor(Random.random() * sequence.length);
        if (sequence instanceof String)
        {
            let str:string = String(sequence).charAt(index);
            if(str == exclude) return this.choice2(sequence, exclude);
            return str
        }
        else
        {
            let data:any = sequence[index];
            if(data == exclude) return this.choice2(sequence, exclude);
            return data;
        }
    }
    
    /**
     * 对列表中的元素进行随机采?
     * <pre>
     * Random.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
     * [4, 1, 5]
     * </pre>
     * @param sequence
     * @param num
     * @return
     *
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
     * 对列表中的元素进行随机采?
     * <pre>
     * Random.sample([1, 2, 3, 4, 5],  3)  // Choose 3 elements
     * [4, 1, 5]
     * </pre>
     * @param sequence
     * @param num
     * @return
     *
     */
    public static sampleIndex(sequence:any[], num:number, exclude:number=-1):any[]
    {
        var len:number = sequence.length;
        if (num <= 0 || len < num)
            throw new Error("采样数量不够");

        var indices:any[] = [];
        for (var i:number = 0; i < num; i++)
        {
            var index:number = Math.floor(Random.random() * len);
            while (indices.indexOf(index) >= 0 || (index == exclude && num < sequence.length))
                index = Math.floor(Random.random() * len);

            indices.push(index);
        }

        return indices;
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

    public static UUID(prefix):string
    {
        return (prefix || '') + new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    }

     public static getRandomColor():number
     {
        let letters:string = '0123456789ABCDEF';
        let color:string = '0x';
        for (let i:number = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return parseInt(color);
    }

    /**
     * 获取随机不重复整数
     */
    public static getRandomIntegers(n:number, min:number, max:number):number[]
    {
        if (n > (max - min + 1)) {
            throw new Error("The range is too small to get " + n + " unique numbers");
        }
        let numbers:number[] = [];
        for(let i:number = min; i <= max; i++)
        {
            numbers.push(i);
        }
        // 返回前n个元素
        return Random.sample(numbers, n);
    }
}
}