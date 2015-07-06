/**
 * Created by tangben on 2015/7/6.
 */
module cn.geckos.utils
{
export class ArrayUtil
{



    /**
     * 返回匹配项的索引
     * @param	ary
     * @param	num
     * @return  返回匹配项的索引
     */
    public static findElementIndex(ary:any[], num:any):any
    {
        var len:number = ary.length;
        for(var i:number = 0; i < len; ++i)
        {
            if(ary[i] == num)
                return i;
        }
        return null;
    }

    /**
     * 返回数组中最大值的索引
     * @param	ary
     * @return  返回数组中最大值的索引
     */
    public static getMaxElementIndex(ary:number[]):number
    {
        var matchIndex:number = 0;
        var len:number = ary.length;
        for(var j:number = 1; j < len; j++)
        {
            if(ary[j] > ary[matchIndex])
                matchIndex = j;
        }
        return matchIndex;
    }
    
    /**
    * 返回数组中最小值的索引
    * @param	ary
    * @return  返回数组中最小值的索引
    */
    public static getMinElementIndex(ary:number[]):number
    {
        var matchIndex:number = 0;
        var len:number = ary.length;
        for(var j:number = 1; j < len; j++)
        {
            if(ary[j] < ary[matchIndex])
                matchIndex = j;
        }
        return matchIndex;	
    }

    /**
     * 返回一个"唯一性"数组
     * @param	ary		需要唯一性的数组
     * @return	唯一性的数组
     * 比如: [1, 2, 2, 3, 4]
     * 返回: [1, 2, 3, 4]
     */
    public static getUniqueAry(ary:number[]):number[]
    {
        var uAry:number[] = [];
        var newAry:number[] = [];
        var count = ary.length;
        for(var i:number = 0; i < count; ++i)
        {
            var value:number = ary[i];
            if (uAry.indexOf(value) == -1) uAry.push(value);
        }
        
        count = uAry.length;
        for(var i:number = count - 1; i >= 0; --i)
        {
            newAry.unshift(uAry[i]);
        }
        return newAry;
    }


    /**
     * 返回2个数组中不同的部分
     * 比如数组A = [1, 2, 3, 4, 6]
     *    数组B = [0, 2, 1, 3, 4]
     * 返回[6, 0]
     * @param	aryA
     * @param	aryB
     * @return
     */
    public static getDifferAry(aryA:number[], aryB:number[]):number[]
    {
        aryA = ArrayUtil.getUniqueAry(aryA);
        aryB = ArrayUtil.getUniqueAry(aryB);
        var ary:Array = aryA.concat(aryB);
        var uObj:Object = new Object ();
        var newAry:Array = new Array ();
        var count:number = ary.length;
        for (var j:number = 0; j < count; ++j)
        {
            if (!uObj[ary[j]])
            {
                uObj[ary[j]] = new Object();
                uObj[ary[j]].count = 0;
                uObj[ary[j]].key = ary[j];
                uObj[ary[j]].count++;
            }
            else
            {
                if(uObj[ary[j]] instanceof Object)
                {
                    uObj[ary[j]].count++;
                }
            }
        }
        for (var i:String in uObj)
        {
            if(uObj[i].count != 2)
            {
                newAry.unshift(uObj[i].key);
            }
        }
        return newAry;
    }
}
}