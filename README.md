## @lishi/utils

### 概述

* 用于存放一些公共的方法和工具

### 组件安装

```javascript
npm --registry=http://101.68.79.42:4873/ install @lishi/utils --save
```

### 使用示例

```javascript
import { pinyin, validator } from '@lishi/utils'
```

### 接口文档

#### 1. pinyin 模块

##### 方法

| 名称   |   参数   |  说明 |
| -------- | :------: | :------ |
| getFullUpperCase | source:string,separator:string | 输入中文字符串, 返回首字母大写的全拼，并根据分隔符拼接 |
| getFullLowerCase | source:string,separator:string | 输入中文字符串, 返回全部小写的全拼，并根据分隔符拼接 |
| getFullCamelCase | source:string,separator:string | 输入中文字符串, 返回驼峰形式的全拼，并根据分隔符拼接 |
| getCamelChars | source:string |  输入中文字符串, 返回大写的简拼  |

##### 示例

```javascript
pinyin.getFullChars('首字母大写',' ') //Shou Zi Mu Da Xie
pinyin.getFullChars('全小写',' ') //quan xiao xie
pinyin.getFullChars('驼峰输出') // tuoFengShuChu
pinyin.getCamelChars('杭州市') // HZS
```

#### 2. validator校验器

##### 内置的规则列表  

* idcard 身份证
* mobile 手机号码

##### 方法

| 名称   |   参数   |  说明 |
| -------- | ------ | ------ |
| getRule | code, parse | 获取一个具体的校验格式信息, 返回解析后数据。 parse为解析器, 默认返回原数据结构 |

```javascript

validator.getRule('idcard', ({code, pattern, message, name}) => ({
  code,
  rule: pattern,
  message,
  label: name
}))

// 以上代码返回数据
// {
// "code": "idcard",
// "rule":/^(?:[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}|[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx])$/,
// "message":"身份证格式不正确",
// "label":"身份证号"
// }

```

#### 原数据格式

```javascript
{
  code: 'idcard',
  pattern: /^(?:[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}|[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx])$/,
  message: '身份证格式不正确',
  name: '身份证号'
}
```


### 开发与调试

* 运行 `npm install --registry=http://101.68.79.42:4873/` 安装依赖
* 运行 `npm start`

### 目录结构

```
.
├── index.js ----------------------  npm入口文件，新增组件时需要在这里添加
├── lib ---------------------------  打包代码
├── examples ----------------------  示例代码
    ├── assets --------------------  静态资源目录
    ├── main.ts -------------------  示例入口
    ├── App.vue -------------------  示例实现
├── public ------------------------  html上引用的公共资源
└── src ---------------------------  源码目录
├── index.hml ---------------------  页面入口
```

### 打包

* 运行 `npm run build` 来打包
* bundle的入口在vite.build.config.ts的entry字段中配置
* 打包以后生成lib/bundle.es.js和lib/bundle.umd.js

### 发布

* 通过npm来发布
* `npm login --registry=http://101.68.79.42:4873/`  登录npm系统
* `npm publish --registry=http://101.68.79.42:4873/` 发布到npm上
* 在浏览器中输入 <http://101.68.79.42:4873/> 查看发布的包
* 参考资料： <https://hu379y.yuque.com/docs/share/ad90b7ff-e70d-4b46-bd5a-34db014884e0>

