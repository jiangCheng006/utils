<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { pinyin, validator} from '../src/index.js'
import {reactive, ref} from 'vue'
function onGetPinyin() {
  alert(pinyin.getFullUpperCase('杭州市',' '))
  alert(pinyin.getFullLowerCase('杭州市',' '))
  alert(pinyin.getFullCamelCase('杭州市'))
}
let uppercase=ref('首字母大写')
let separator1=ref('')
let resultUppercase=ref('--')
function getFullUpperCase(){
  resultUppercase.value=pinyin.getFullUpperCase(uppercase.value,separator1.value)
}

let lowerCase=ref('全小写')
let separator2=ref('')
let resultLowerCase=ref('--')
function getFullLowerCase(){
  resultLowerCase.value=pinyin.getFullLowerCase(lowerCase.value,separator2.value)
}


let camelCase=ref('驼峰输出')
let separator3=ref('')
let resultCamelCase=ref('--')
function getFullCamelCase(){
  resultCamelCase.value=pinyin.getFullCamelCase(camelCase.value,separator3.value)
}
let ruleStr=reactive({
  code:"",
  pattern:'',
  message:'',
  name:''
})
function idCardRule() {
   validator.getRule('idCard', ({code, pattern, message, name}) => {
    ruleStr.code=code
    ruleStr.pattern=pattern
    ruleStr.message=message
    ruleStr.name=name
  })
}

let phoneNumber=ref('')
let XORResult=ref('')
function XORHandle(){
  validator.getValidatorXOR(['mobile','tel'])('',phoneNumber.value,(error)=>{
    if(error){
      console.log(error)
      XORResult.value=error
    }else{
      XORResult.value='校验成功'
    }
  })
} 

</script>
<template>
  <div class="demo-item">
    <p class="title">中文转拼音：</p>
    <p>
      <input v-model="uppercase">：
      <input style="width:80px" v-model="separator1" placeholder="分隔符">：
      <button v-on:click="getFullUpperCase">
        获取拼音
      </button>（首字母大写）：{{resultUppercase}}</p>
    <p>
      <input v-model="lowerCase">：
      <input style="width:80px" v-model="separator2" placeholder="分隔符">：
      <button v-on:click="getFullLowerCase">
        获取拼音
      </button>（全部小写）：{{resultLowerCase}}</p>
    <p>
      <input v-model="camelCase">：
      <input style="width:80px" v-model="separator3" placeholder="分隔符">：
      <button v-on:click="getFullCamelCase">
        获取拼音
      </button>（驼峰）：{{resultCamelCase}}</p>
  </div>
  
  <div class="demo-item">
    <button v-on:click="idCardRule">获取身份证校验数据</button>
    <p>{{ruleStr}}</p>
  </div>
  <div class="demo-item">
    <input v-model="phoneNumber">：<button v-on:click="XORHandle">校验手机或电话号码</button>
    {{XORResult}}
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
#app .title{
  font-size: 18px;
  font-weight: 600;
}
#app .demo-item {
  text-align: center;
  margin-bottom: 20px;
}
</style>
