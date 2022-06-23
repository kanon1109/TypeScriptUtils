/**
 * Created by tangben on 2015/7/6.
 */
module utils
{
export class ArrayUtil
{

    /**
     * 执行冒泡排序
     * @param	ary
     * 算法参考 -- http://www.hiahia.org/datastructure/paixu/paixu8.3.1.1-1.htm
     */
    public static bubbleSort(ary:number[]):void
    {
        var isExchange:Boolean = false;
        for (var i:number = 0; i < ary.length; i++)
        {
            isExchange = false;
            for (var j:number = ary.length - 1; j > i; j--)
            {
                if (ary[j] < ary[j - 1])
                {
                    var temp:number = ary[j];
                    ary[j] = ary[j - 1];
                    ary[j - 1] = temp;
                    isExchange = true;
                }
            }
            if(!isExchange)
                break;
        }
    }


    /**
     * 执行插入排序
     * @param	ary
     */
    public static insertionSort(ary:number[]):void
    {
        var len:number = ary.length;
        for(var i:number = 1; i<len; i++)
        {
            var val:number = ary[i];
            for(var j:number = i; j > 0 && ary[j - 1] > val; j--)
            {
                ary[j] = ary[j - 1];
            }
            ary[j] = val;
        }
    }

    /**
     * 执行二分搜索
     * @param	ary		搜索的数组（必须排序过）
     * @param	value	需要搜索的值
     * @return  返回匹配结果的数组索引
     */
    public static binarySearch(ary:number[], value:number):number
    {
        var startIndex:number = 0;
        var endIndex:number = ary.length;
        var sub:number = (startIndex + endIndex) >> 1;
        while(startIndex < endIndex)
        {
            if(value <= ary[sub]) endIndex = sub;
            else if(value >= ary[sub]) startIndex = sub + 1;
            sub = (startIndex + endIndex) >> 1;
        }
        if(ary[startIndex] == value) return startIndex;
        return -1;
    }


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
        var ary:number[] = aryA.concat(aryB);
        var uObj:Object = new Object ();
        var newAry:number[] = [];
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
        for (var i in uObj)
        {
            if(uObj[i].count != 2)
            {
                newAry.unshift(uObj[i].key);
            }
        }
        return newAry;
    }

    /**
     * 交换数组元素
     * @param	array	目标数组
     * @param	index1	交换后的索引
     * @param	index2	交换前的索引
     */
    public static swap(array:any[], index1:number, index2:number):void
    {
        var temp:any = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }


    /**
     * 清除列表
     * @param	ary 列表
     */
    public static clearList(ary:any[]):void
    {
        if (!ary) return;
        var length:number = ary.length;
        for (var i:number = length - 1; i >= 0; i -= 1)
        {
            ary.splice(i, 1);
        }
    }

    /**
     * 克隆一个数组
     * @param	ary 需要克隆的数组
     * @return  克隆的数组
     */
    public static cloneList(ary:any[]):any[]
    {
        if (!ary) return null;
        return ary.slice(0, ary.length);
    }


    /**
     * 判断2个数组是否相同
     * @param	ary1	数组1
     * @param	ary2	数组2
     * @return	是否相同
     */
    public static equals(ary1:number[], ary2:number[]):Boolean
    {
        if (ary1 == ary2) return true;
        var length:number = ary1.length;
        if (length != ary2.length) return false;
        while (length--)
        {
            if (ary1[length] != ary2[length])
                return false;
        }
        return true;
    }


    /**
     * 根据索引插入元素，索引和索引后的元素都向后移动一位
     * @param	index   插入索引
     * @param	value   插入的元素
     * @return  插入的元素 未插入则返回空
     */
    public static insert(ary:any[], index:number, value:any):any
    {
        if (!ary) return null;
        var length:number = ary.length;
        if (index > length) index = length;
        if (index < 0) index = 0;
        if (index == length) ary.push(value); //插入最后
        else if (index == 0) ary.unshift(value); //插入头
        else
        {
            for (var i:number = length - 1; i >= index; i -= 1)
            {
                ary[i + 1] = ary[i];
            }
            ary[index] = value;
        }
        return value;
    }

    /**
	 * 逆时针旋转 90 度
	 * 列 = 行
	 * 行 = n - 1 - 列(j);  n表示总行数
	 */
	public static rotate90(matrix:any[][]):any[][] 
	{
		let temp:any[][] = [];
		let len:number = matrix.length;
		for(let i:number = 0; i < len; i++){
			for(let j:number = 0; j < len; j++){
				let k:number = len - 1 -j;
				if(!temp[k]){
					temp[k] = [];
				}
				temp[k][i] = matrix[i][j];
			}
		}
		return temp;
	}

	//逆时针旋转 180 度
    //行 = h - 1 - 行(i);  h表示总行数
    //列 = n - 1 - 列(j);  n表示总列数
	public static rotate180(matrix:any[][]):any[][] 
	{
		let temp:any[][] = [];
		let len:number = matrix.length;
		for(let i:number = 0; i < len; i++) {
			for(let j:number = 0; j < len; j++) {
				let k:number = len - 1 - i;
				if(!temp[k]) {
					temp[k] = [];
				}
				temp[k][len-1-j] = matrix[i][j];
			}
		}
	
		return temp;
	}

	//逆时针旋转 270 度
	//行 = 列
	//列 = n - 1 - 行(i);  n表示总列数
	public static rotate270(matrix:any[][]):any[][] 
	{
		let temp:any[][] = [];
		let len:number = matrix.length;
		for(let i:number = 0; i < len; i++) {
			for(let j:number = 0; j < len; j++) {
				let k:number = len - 1 - i;
				if(!temp[j]){
					temp[j] = [];
				}
				temp[j][k] = matrix[i][j];
			}
		}
		return temp;
	};
}
}