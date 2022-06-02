const rules = [
  {
    code: 'idcard',
    pattern: /^(?:[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}|[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx])$/,
    message: '身份证格式不正确',
    name: '身份证号'
  }
]

export default {
  getRule(code, parse = (item) => item) {
    for (let i = 0; i < rules.length; i++) {
      const ruleElement = rules[i];
      if(code === ruleElement.code) {
        return parse(ruleElement)
      } else {
        return {}
      }
    }
  }
}
