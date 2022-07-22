const rules = [
  {
    code: 'idCard',
    pattern: /^(?:[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}|[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx])$/,
    message: '身份证格式不正确',
    name: '身份证号'
  },
  {
    code:'mobile',
    pattern:/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    message:'手机号格式不正确',
    name:'手机号'
  },
  {
    code:'tel',
    pattern:/^(\d{7,8}|\d{3,4}-\d{7,8})$/,
    message:'固定电话格式错误',
    name:'固定电话'
  },
  {
    code:'email',
    pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    message:'邮箱格式不正确',
    name:'邮箱'
  },
  {
    code:'password',
    pattern:/(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^_+$)^\w{6,20}$/,
    message:"6~20字，字母、数字、下划线，包含任意两种（区分大小写）",
    name:'密码校验'
  },
  {
    code:'require',
    required: true, 
    message: '必填项不能为空', 
    trigger: 'blur'
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




