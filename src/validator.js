const rules = [
  {
    code: 'idCard',
    pattern: /^(?:[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}|[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx])$/,
    message: '身份证格式不正确',
    name: '身份证号',
    export:['']
  },
  {
    code:'mobile',
    pattern:/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    message:'手机号格式不正确',
    name:'手机号',
    examples:['13488888888','14688888888']
  },
  {
    code:'tel',
    pattern:/^(\d{7,8}|\d{3,4}-\d{7,8})$/,
    message:'固定电话格式错误',
    name:'固定电话',
    examples:['1234567','0577-1234567']
  },
  {
    code:'email',
    pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message:'邮箱格式不正确',
    name:'邮箱(支持中文邮箱)',
    examples:['XXX@abc.com']
  },
  {
    code:'password',
    pattern:/(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^_+$)^\w{6,20}$/,
    message:"6~20字，字母、数字、下划线，包含任意两种（区分大小写）",
    name:'密码校验',
    examples:['Ls_123456']
  },
  {
    code:'trainNumber',
    pattern:/^[GCDZTSPKXLY1-9]\d{1,4}$/,
    message:"车次编号不正确",
    name:'车次编号',
    examples: ['G888', 'D2345']
  },
  {
    code:'postalCode',
    pattern: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
    message:'邮政编码格式不正确',
    title: '邮政编码(中国)',
    examples: ['734500', '100101']
  },
  {
    code:'require',
    required: true, 
    message: '必填项不能为空', 
    trigger: 'blur'
  },
  {
    code:'licensePlateGreen',
    title: '车牌号(新能源)',
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/,
    message:'非新能源车牌号',
    examples: ['京AD92035', '甘G23459F', '京AA92035']
  },
  {
    code:'licensePlateNoGreen',
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/,
    title: '车牌号(非新能源)',
    message:'车牌号（非新能源）格式不对',
    examples: ['京A00599', '黑D23908']
  },
  {
    code:'licensePlate',
    pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,
    title: '车牌号(新能源+非新能源)',
    message:'车牌号格式不对',
    examples: ['京A12345D', '京A00599', '京AD92035', '甘G23459F', '京AA92035'],
    counterExamples: ['宁AD1234555555', '浙苏H6F681']
  },
]
 
const needParameters=[
  {

  }
]


//用户认证密码，手机，邮箱


export default {
  /**
   * 返回单个输入框的校验规则
   * @param {*} code string | string[] 
   * @param {*} parse function
   * @returns object | array
   */
  getRule(code, parse = (item) => item) {
    const isMultiple= Array.isArray(code)
    if(isMultiple){
      let result=[]
      result=rules.filter(rule=>{
        return code.indexOf(rule.code)>-1
      })
      return parse(result)
    }else{
      for (let i = 0; i < rules.length; i++) {
        const ruleElement = rules[i];
        if(code === ruleElement.code){
          console.log(ruleElement)
          return parse(ruleElement)
        } else {
          return parse({})
        }
      }
    }
  },
  /**
   * 异或处理
   * @param {*} codes string[]
   * @returns function(rule, value, callback)
   */
  getValidatorXOR(codes){
    let rules = this.getRule(codes)
    console.log(rules)
    return function (rule, value, callback){
      let result=false
      for(let i=0;i<rules.length;i++){
        const {
          pattern
        }=rules[i]
        const reg=new RegExp(pattern)
        console.log(value.match(reg),value)
        if(value.match(reg)){
          result=true
          break;
        }
      }
      if(result){
        callback()
      }else{
        callback(new Error(rules.map(({message})=>message)))
      }
    }
  },
  /**
   * 
   */
  getRules(){

  }
}




