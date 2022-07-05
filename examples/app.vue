<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { pinyin, validator} from '../src/index.js'

function onGetPinyin() {
  alert(pinyin.getFullUppercase('杭州市',' '))
  alert(pinyin.getFullLowercase('杭州市',' '))
  alert(pinyin.getFullCamelCase('杭州市'))
}

function idCardRule() {
  alert(JSON.stringify(validator.getRule('idcard', ({code, pattern, message, name}) => ({
    code,
    rule: pattern,
    message,
    label: name
  }))))
}

</script>
<template>
  <div class="demo-item"><button v-on:click="onGetPinyin">获取拼音: 杭州市</button></div>
  <div class="demo-item"><button v-on:click="idCardRule">获取身份证校验数据</button></div>
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
#app .demo-item {
  margin-bottom: 20px;
}
</style>
