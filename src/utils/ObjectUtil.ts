module utils
{
export class ObjectUtil 
{
	/** 
	 * 对象深度拷贝
	 * @param p any 源对象
	 * @param c any 目标对象, 不传则返回新对象, 传则合并属性, 相同名字的属性则会覆盖
	 */
	public static clone<T>(p: any, c: T = null):T 
	{
		var c = c || <T>{};
		for (var i in p) 
		{
			if (typeof p[i] === 'object') 
			{
				c[i] = p[i] instanceof Array ? [] : {};
				ObjectUtil.clone(p[i], c[i]);
			} 
			else 
			{
				c[i] = p[i];
			}
		}
		return c;
	}
	
	/**
	 * 获取对象长度
	 * @param	o
	 * @return
	 */
	/**
	 * 获取对象长度
	 * @param	o
	 * @return
	 */
	public static getLength(o:Object):number
	{
		if(!o) return 0;
		let count:number = 0;
		for (var key in o)
		{
			count++;
		}
		return count;
	}
	
	/**
	 * 转换为数组
	 * @param	obj	需要转换的对象
	 * @return	转换后的数组
	 */
	public static toArray(obj:Object):any[]
	{
		if (!obj) return null;
		let newArr:any[] = [];
		for (var key in obj) 
		{
			if (obj.hasOwnProperty(key)) 
			{
				var element = obj[key];
				newArr.push(obj[key]);
			}
		}
		return newArr;
	}
}
}