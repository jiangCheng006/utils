import full_dict from './data/dict_full'
import polyphone from './data/dict_polyphone'
import char_dict from './data/dict_char'
 
 /**
* 解析字符串获取拼音
* @param {*} str 待解析字符串
* @returns string[]
*/
export function parseFullChar(str){
 let result = [];
 let name
 const reg = new RegExp('[a-zA-Z0-9\- ]')
 for (let i = 0, len = str.length; i < len; i++) {
   const ch = str.substr(i, 1);
   const unicode = ch.charCodeAt(0)
   if (unicode > 40869 || unicode < 19968) {
     result.push(ch)
   } else {
     name = getFullChar(ch)
     if (name !== false) {
       result.push(name)
     }
   }
 }
 return result
}


/**
 * 提取拼音
 * @param {*} str 带处理数据
 * @returns string | false
 */
export function getFullChar(str) {
    for (const key in full_dict) {
      if (full_dict[key].indexOf(str) !== -1) {
        return key;
        break
      }
    }
    return false
}

/**
 * 首字母大写转换
 * @param {*} str 待处理字符串
 * @returns 
 */
export function capitalize (str) {
    if (str.length > 0) {
      const first = str.substr(0, 1).toUpperCase()
      const spare = str.substr(1, str.length)
      return first + spare
    }
}


export function getChar (ch,options) {
    const unicode = ch.charCodeAt(0)
    // 如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
    if (unicode > 40869 || unicode < 19968) {
      return ch
    } // dealWithOthers(ch);
    // 检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
    if (!options.checkPolyphone) {
      return char_dict.charAt(unicode - 19968)
    }
    return polyphone[unicode] ? polyphone[unicode] : char_dict.charAt(unicode - 19968)
}


export function getResult (chars,options) {
    if (!options.checkPolyphone) {
      return chars.join('')
    }
    let result = ['']
    for (let i = 0, len = chars.length; i < len; i++) {
      const str = chars[i];
      const strlen = str.length
      if (strlen == 1) {
        for (var j = 0; j < result.length; j++) {
          result[k] += str
        }
      } else {
        const swap1 = result.slice(0)
        result = []
        for (var j = 0; j < strlen; j++) {
          // 复制一个相同的arrRslt
          const swap2 = swap1.slice(0)
          // 把当前字符str[k]添加到每个元素末尾
          for (var k = 0; k < swap2.length; k++) {
            swap2[k] += str.charAt(j)
          }
          // 把复制并修改后的数组连接到arrRslt上
          result = result.concat(swap2)
        }
      }
    }
    return result
  }