import {
  parseFullChar,
  capitalize,
  getChar,
  getResult
} from './handle'

const pinyin = (function () {
  const Pinyin = function (ops) {
    this.initialize(ops)
  }

  const options = {
    checkPolyphone: false,
    charcase: 'default'
  }

  Pinyin.fn = Pinyin.prototype = {
    init: function (ops) {
      this.options = extend(options, ops)
    },

    initialize: function (ops) {
      this.init(ops)
    },

    /**
     * 提取拼音, 返回首字母大写形式
     * @param {*} str 待转换的字符串 
     * @param {*} separator 分隔符 默认为空
     * @returns 
     */
     getFullUpperCase: function (str,separator='') {
      const tempArray= parseFullChar(str)
      const resultArray =tempArray.map(str=>{
        return capitalize(str)
      })
      return resultArray.join(separator)
    },
    /**
     * 提取拼音, 返回首字母小写形式
     * @param {*} str 待转换的字符串
     * @param {*} separator 分隔符 默认为空
     * @returns 
     */
    getFullLowerCase:function(str,separator=''){
      const resultArray= parseFullChar(str)
      return resultArray.join(separator)
    },
    /**
     * 提取拼音，返回驼峰形式
     * @param {*} str 待转换的字符串
     * @param {*} separator 分隔符 默认为空
     */
     getFullCamelCase(str,separator=''){
      const tempArray=parseFullChar(str)
      const resultArray =tempArray.map((string,index)=>{
        return index===0?string:capitalize(string)
      })
      return resultArray.join(separator)
    },
    // 提取首字母，返回大写形式
    getCamelChars: function (str) {
      if (typeof (str) !== 'string') {
        throw new Error(-1, '函数getFisrt需要字符串类型参数!')
      }
      const chars = [] // 保存中间结果的数组
      for (let i = 0, len = str.length; i < len; i++) {
        // 获得unicode码
        const ch = str.charAt(i)
        // 检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
        chars.push(getChar(ch,this.options))
      }
      // 处理arrResult,返回所有可能的拼音首字母串数组
      return getResult(chars,this.options)
    }
  }

  var extend = function (dst, src) {
    for (const property in src) {
      dst[property] = src[property]
    }
    return dst
  }

  return new Pinyin(arguments)
})()

export default pinyin

