/**
 * Created by tangben on 2015/7/6.
 */
module utils
{
export class StringUtil
{

    /**
     * 匹配中文字符
     * @param    str	需要匹配的字符串
     * @return
     */
    public static matchChineseWord(str:string):string[]
    {
        //中文字符的unicode值[\u4E00-\u9FA5]
        var patternA:RegExp = /[\u4E00-\u9FA5]+/gim;
        return str.match(patternA);
    }

    /**
     * 去除字符串左端的空白字符
     * @param    target		目标字符串
     * @return
     */
    public static lTrim(target:string):string
    {
        var startIndex:number = 0;
        while (StringUtil.isWhiteSpace(target.charAt(startIndex)))
        {
            startIndex++;
        }
        return target.slice(startIndex, target.length);
    }

    /**
     * 去除字符串右端的空白字符
     * @param    target		目标字符串
     * @return
     */
    public static rTrim(target:string):string
    {
        var endIndex:number = target.length - 1;
        while (StringUtil.isWhiteSpace(target.charAt(endIndex)))
        {
            endIndex --;
        }
        return target.slice(0, endIndex + 1);
    }


    /**
     * 返回一个去除2段空白字符的字符串
     * @param    target
     * @return  返回一个去除2段空白字符的字符串
     */
    public static trim(target:string):string
    {
        if (target == null)
        {
            return null;
        }
        return StringUtil.rTrim(StringUtil.lTrim(target));
    }

    /**
     * 返回该字符是否为空白字符
     * @param    str
     * @return  返回该字符是否为空白字符
     */
    public static isWhiteSpace(str:string):boolean
    {
        if (str == " " || str == "\t" || str == "\r" || str == "\n")
            return true;
        return false;
    }

    /**
     * 返回执行替换后的字符串
     * @param    mainStr   待查找字符串
     * @param    targetStr 目标字符串
     * @param    replaceStr 替换字符串
     * @param    caseMark  是否忽略大小写
     * @return  返回执行替换后的字符串
     */
    public static replaceMatch(mainStr:string, targetStr:string,
                               replaceStr:string, caseMark:boolean = false):string
    {
        var len:number = mainStr.length;
        var tempStr:string = "";
        var isMatch:boolean = false;
        var tempTarget:string = caseMark == true ? targetStr.toLowerCase() : targetStr;
        for (var i:number = 0; i < len; i++)
        {
            isMatch = false;
            if (mainStr.charAt(i) == tempTarget.charAt(0))
            {
                if (mainStr.substr(i, tempTarget.length) == tempTarget)
                {
                    isMatch = true;
                }
            }
            if (isMatch)
            {
                tempStr += replaceStr;
                i = i + tempTarget.length - 1;
            }
            else
            {
                tempStr += mainStr.charAt(i);
            }
        }
        return tempStr;
    }


    /**
     * 特殊符号字符串
     */
    private static specialSigns:string[] = [
        '&', '&amp;',
        '<', '&lt;',
        '>', '&gt;',
        '"', '&quot;',
        "'", '&apos;',
        '®', '&reg;',
        '©', '&copy;',
        '™', '&trade;',
    ];


    /**
     * 用html实体换掉字符窜中的特殊字符
     * @param 	str		        需要替换的字符串
     * @param 	reversion		是否翻转替换：将转义符号替换为正常的符号
     * @return 	换掉特殊字符后的字符串
     */
    public static htmlSpecialChars(str:string, reversion:boolean = false):string
    {
        var len:number = StringUtil.specialSigns.length;
        for (var i:number = 0; i < len; i+=2)
        {
            var from:string;
            var to:string;
            from = StringUtil.specialSigns[i];
            to = StringUtil.specialSigns[i + 1];
            if (reversion)
            {
                var temp:string = from;
                from = to;
                to = temp;
            }
            str = StringUtil.replaceMatch(str, from, to);
        }
        return str;
    }
    
    
    /**
    * 给数字字符前面添 "0"
    * 
    * <pre> 
    * 
    * trace( StringFormat.zfill('1') );
    * // 01
    * 
    * trace( StringFormat.zfill('16', 5) );
    * // 00016
    * 
    * trace( StringFormat.zfill('-3', 3) );
    * // -03
    * 
    * </pre>
    * 
    * @param str 要进行处理的字符串
    * @param width 处理后字符串的长度，
    *              如果str.length >= width，将不做任何处理直接返回原始的str。
    * @return 
    * 
    */
    public static zfill(str:string, width:number = 2):string
    {
        if( !str ) {
            return str;
        }
        width = Math.floor(width);
        var slen:number = str.length;
        if( slen >= width ) {
            return str;
        }
        
        var negative:boolean = false;
        if( str.substr(0, 1) == '-' ) {
            negative = true;
            str = str.substr(1);
        }
        
        var len:number = width - slen;
        for( var i:number = 0; i < len; i++ )
        {
            str = '0' + str;
        }
        
        if( negative ) {
            str = '-' + str;
        }
        
        return str;
    }


    /**
     * 翻转字符串
     * @param	str 字符串
     * @return  翻转后的字符串
     */
    public static reverse(str:string):string
    {
        if (str.length > 1)
            return StringUtil.reverse(str.substring(1)) + str.substring(0, 1);
        else
            return str;
    }


    /**
     * 截断某段字符串
     * @param	str		目标字符串
     * @param	start	需要截断的起始索引
     * @param	len		截断长度
     * @param	order	顺序，true从字符串头部开始计算，false从字符串尾巴开始结算。
     * @return	截断后的字符串
     */
    public static cutOff(str:string, start:number,
                         len:number, order:boolean = true):string
    {
        start = Math.floor(start);
        len = Math.floor(len);
        var length:number = str.length;
        if (start > length) start = length;
        var s:number = start;
        var e:number = start + len;
        var newStr:string;
        if (order)
        {
            newStr = str.substring(0, s) + str.substr(e, length);
        }
        else
        {
            s = length - 1 - start - len;
            e = s + len;
            newStr = str.substring(0, s + 1) + str.substr(e + 1 , length);
        }
        return newStr;
    }
	
	/**{0} 字符替换   */
	public static strReplace(str: string, rStr: string[]): string 
	{
		var i: number = 0, len: number = rStr.length;
		for (; i < len; i++) 
		{
			if (rStr[i] == null || rStr[i] == "") 
			{
				rStr[i] = "无";
				console.log("not word ", str)
			}
			str = str.replace("{" + i + "}", rStr[i]);
		}
		return str
	}

    /**
     * 移除json字符串中egret类信息
     */
    public static cleanClassDesc(json: string): string {
        //var s = "\"wh\":21,\"__class__\":\"vo.GuestVo\",\"__types__\":[\"vo.GuestVo\"]}"
        let idx = json.indexOf(',"__class__');
        while (idx > 0) {
            let end = json.indexOf(']', idx);
            json = json.substr(0, idx) + json.substr(end + 1);
            idx = json.indexOf(',"__class__');
        }
        return json;
    }

    /**
     * 排序中文字符串
     */
    public static sortChinese(arr:string[]):string[]
    {
        let resultArray:string[] = arr.sort((p1:string, p2:string)=>{
            return p1.localeCompare(p2,"zh");
        })
        return resultArray;
    }

    /**
     * 根据数字生产26进制的字母
     */
    public static createCellPos(n:number):string
    {
        var ordA = 'A'.charCodeAt(0);
        var ordZ = 'Z'.charCodeAt(0);
        var len = ordZ - ordA + 1;
        var s = "";
        while( n >= 0 ) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;
    }

    // 字符串转ArrayBuffer
	private stringToArrayBuffer(s:string):ArrayBuffer 
	{
		let buf:ArrayBuffer = new ArrayBuffer(s.length);
		let view:Uint8Array = new Uint8Array(buf);
		for (let i:number=0; i < s.length; ++i)
		{
			view[i] = s.charCodeAt(i) & 0xFF;
		} 
		return buf;
	}

    /**
     * 头部填充num
     * @param	str    	    目标字符串
     * @param	length    	填充完的长度
	 * @param	num         填充的数值
     */
    public static padStart(str:string, length:number, num:number):string
    {
        str = str != null ? str : "";
        if(str.length >= length) return str;
        length = length - str.length;
        for(let i:number = 0; i < length; i++)
        {
            str = num + "" + str;
        }
        return str;
    }

    /**
     * 头部填充num
     * @param	str    	    目标字符串
     * @param	length    	填充完的长度
	 * @param	num         填充的数值
     */
    public static padEnd(str:string, length:number, num:number):string
    {
        str = str != null ? str : "";
        if(str.length >= length) return str;
        length = length - str.length;
        for(let i:number = 0; i < length; i++)
        {
            str += num + "";
        }
        return str;
    }

    /**
	 * 大整型相加
	 * @param	a    	大整型a
	 * @param	b       大整型b
	 * @return  大整型
	 */
    public static sumInteger(a:string, b:string):string
    {
        let length:number = Math.max(a.length, b.length);
        a = StringUtil.padStart(a, length, 0);
        b = StringUtil.padStart(b, length, 0);
        let result:string = "";
        let carry:number = 0;
        for(let i:number = length - 1; i >= 0; i--)
        {
            let sum:number = parseInt(a[i]) + parseInt(b[i]) + carry;
            result = (sum % 10) + result;
            carry = Math.floor(sum / 10);
        }
        if(carry) result = carry + result;
        return result;
    }

     /**
	 * 编码base64
	 */
	public static base64(s:string):string
    {
		var b:egret.ByteArray = new egret.ByteArray();
		b.writeUTFBytes(s);
		return egret.Base64Util.encode(b.buffer);
	}
	/**
	 * 解码base64
	 */
	public static decode64(s:string):string
    {
		var b:egret.ByteArray = new egret.ByteArray(egret.Base64Util.decode(s));
		return b.readUTFBytes(b.bytesAvailable);
	}

    /**
     * 判断是否是手机号
     */
    public static checkPhone(tel:string):boolean
    {
        return /^1[3456789]\d{9}$/.test(tel);
    }

    /**
     * 数字转换汉子
     */
    public static numToStr(getNum): string 
    {
        if (getNum == null || getNum == "") return "0";
        let n = Number(Number(getNum).toFixed(1));
        let h;
        let t = "";
        let result: string;
        if (n < 10000) {
            h = n;
            t = "";
        } else if (n >= 10000 && n < 100000000) {
            h = n;
            t = "";
            // h = (n / 1000);
            // t = "万";
        } else if (n >= 100000000 && n < 1000000000000) {
            h = (n / 10000000);
            t = "亿";
        } else if (n >= 1000000000000 && n < 10000000000000) {
            h = (n / 100000000000);
            t = "万亿";
        } else if (n >= 10000000000000) {
            h = (n / 10000000000000);
            t = "亿亿";
        }
        if (n >= 10000) {
            h = Math.floor(h) / 10;
        }
        result = h + t;
        return result;
    }

    /**
	 * 随机唯一字符串
	 */
	public static unid(n:number=32, gap:string=""):string
    {
		let a = [];
		for(let i:number = 0; i< (n / 4); i++) {
			a.push((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
		}
		return a.join(gap);
	}
}
}