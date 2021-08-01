---
title: TypeScript
---

第一章 类型安全
===  

## TypeScript的类型安全

类型安全，即借助类型避免程序做**无效**的事情（在不同的静态类型语言中，无效可以指运行时程序崩溃，也可以指未崩溃，但做的事情毫无意义）

举几个无效例子：  
- 一个数字乘以一个列表  

- 调用接受一组对象的函数却传入一串字符串  

- 在对象上调用不存在的方法  

这些问题在编程时时常发生。编程语言在发现你做无效的事情时会尝试判断你的真正意图，以JavaScript为例：

```js
3 + []        //结果为“3”

const obj = {}
obj.test      //结果为undefined

function x(a) {
    return a/2
}
a('y')        //结果为NaN
```  

显而易见，遇到无效操作时JavaScript并未报错，而是自行推断结果，这会给后期的更新和维护带来巨大的麻烦  

而TypeScript的作用就是在输入代码的过程中，文本编辑器会报出错误信息。下面展示一下上面例子的报错信息：  

```js
3 + []        //运算符“+”不能应用于类型“number”和“never[]”

const obj = {}
obj.test      //类型“{}”上不存在属性“test”

function x(a) {
    return a/2
}
a('y')        //'y'不是数字类型
```  

第二章 类型
===  

## 类型  


### 1.any  

any是类型的教父。在TypeScript中，编译时一切都要有类型，但除非迫不得已，千万不要用any，如果你和TS无法确定类型，默认为any。这是兜底类型，尽量避免使用。  

any类型的值就像常规的js一样，类型检查器完全不能发挥作用。  

any类型使用示例：  

```ts
let a:any = 666        //any
let b:any = 'yyds'     //any
let c:any = a + b      //any
```  

正常情况下第三个语句会报错，但实际上没有，因为我们告诉ts相加的两个值都是any类型。如果要使用any，一定要显式注解。  

### 2.unknown  

少数情况下，如果你确实无法预知一个值的类型，不要使用any，应该使用unknown。与any类似，unknown也表示任何值，但是TS会要求你再做检查，细化类型。  

unknown类型的值可以比较（使用 ==、===、||、&&和?）、可以否定（!）、可以使用js的`typeof`和`instanceof`运算符细化，以下为unknown类型使用示例：  

```ts
let a:unknown = 30      //unknown
let b = a === 123       //boolean
let c = a + 10          //对象的类型为 "unknown"
if(typeof a === 'number') {
    let d = a + 10      //number
}
```  

总结：  

1.TS不会把任何值推导为unknown类型，必须显示注解（上述a为例）  

2.unknown类型的值可以比较（b）  

3.执行操作时不能假定unknown类型的值为某种特定类型（c），必须先向TS证明一个值确实是某种类型（d）  

### 3.boolean  

boolean类型有两个值：true和false。该类型的值可以比较（使用 ==、===、||、&&和?）、可以否定(!)，以下为boolean类型使用示例：  

```ts
let a = true            //boolean
var b = false           //boolean
const c = true          //true
let d:boolean = true    //boolean
let e:true = true       //true
let f:true = false      //不能将类型“false”分配给类型“true”
```  

以上示例表明我们可以通过多种方法告知TS一个值的类型为boolean:  

1.可以让TS推到出值得类型为boolean（a和b）  

2.可以让TS推导出值为某个具体得布尔值（c）  

3.可以明确告知TS值的类型为boolean（d）  

4.可以明确告知TS值为某个具体的布尔值（e和f）  

**e不是普通的boolean类型**，而是只为true的boolean类型。把类型设为某个值，就限制了e和f在所有布尔值中只能取指定的那个值。这个特性称为**类型字面量**（仅表示一个值的类型）  

### 4.number  

number包括所有数字：整数、浮点数、正数、负数、Infinity、NaN等。当然，数字也可以进行算数运算：加（+）、减（-）、乘（*）、除（/）、求模（%）、比较（<、>）等。以下为number类型使用示例：  

```ts
let a = 123                 //number
var b = Infinity*0.10       //number
const c = 666               //666
let d = a < b               //boolean
let e:number = 100          //number
let f:3.1415926 = 3.1415926 //3.1415926
let g:3.14 = 666            //不能将类型‘666’分配给类型‘3.14’
```  

与boolean类型相似，把值声明为number类型也有四种方法:

1.可以让TS推导出值的类型为number（a和b） 

2.使用const,使TS推导出值为某个具体的数字（c）  

3.可以明确告知TS值的类型为number（e）  

4.可以明确告知TS值为某个具体数字（f和g）
