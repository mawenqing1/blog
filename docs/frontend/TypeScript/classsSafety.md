---
title: TypeScript
---

# 第一章 类型安全


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

# 第二章 类型
 

## 类型介绍 


### any  

any是类型的教父。在TypeScript中，编译时一切都要有类型，但除非迫不得已，千万不要用any，如果你和TS无法确定类型，默认为any。这是兜底类型，尽量避免使用。  

any类型的值就像常规的js一样，类型检查器完全不能发挥作用。  

![举个例子](http://5b0988e595225.cdn.sohucs.com/images/20190409/4c483619573e4000ae1ac86bc75dc835.jpeg)  

```ts
let a:any = 666        //any
let b:any = 'yyds'     //any
let c:any = a + b      //any
```  

正常情况下第三个语句会报错，但实际上没有，因为我们告诉ts相加的两个值都是any类型。如果要使用any，一定要显式注解。  

### unknown  

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

### boolean  

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

### number  

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

### bigint  

bigint是JS和TS新引入的类型，在处理较大的整数时，不必再担心舍入误差。number类型表示的最大整数为2^53^，而bigint能表示的数比这大的多。bigint类型包含所有BigInt数，支持加减乘除和比较。以下为bigint类型使用示例：  

```ts
let a = 12345n               //bigint
const b = 56789n             //56789n
var c = a + b                //bigint
let d = a < 123              //boolean
let e = 66.6n                //bigint 文本必须是整数
let f:bigint = 100n          //bigint
let g:100n = 100n            //100n
let h:bigint = 100           //不能将类型‘100’分配给类型‘bigint’
```

声明bigint类型与boolean及number类似，就不一一赘述了。  

### string  

string包含所有字符串，以及可以对字符串执行的操作，例如拼接字符串（+）、切片（.slice）等。以下为string类型使用示例：  

```ts
let a = 'hello mwq'            //string
var b = 'mwqYYDS'              //string
const c = '?'                  //'?'
let d = a + '' + b + c         //string
let e:string = 'zoom'          //string
let f:'mwq' = 'mwq'            //'mwq'
let g:'mwq' = 'qwm'            //不能将类型'qwm'分配给类型'mwq'
```  

声明string类型与boolean及number类似，这里也就不一一赘述了。

### symbol  

symbol经常用于代替对象和映射的字符串键，确保使用正确的已知键，以防键被意外设置。  

```ts
let a = Symbol('a')          //symbol
let b:symbol = Symbol('b')   //symbol
var c = a === b              //boolean
let b = a + 'x'              //“+”运算符不能应用于类型 "symbol"
```    
Symbol('a')使用指定的名称新建一个符号，这个符号是唯一的，不与其他任何符号相等(使用==或===比较)

同样，符号也可以显示声明为unique symbol类型：

```ts
const e = Symbol('e')                      //typeof e
const f:unique symbol = Symbol('f')        //typeof f
let g:unique symbol = Symbol('f')          //类型为 "unique symbol" 的变量必须为 "const"
let h = e === e                            //boolean
```   

### 数组

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：

```ts
let arr: number[] = [1, 2, 3]             //number[]
```    

第二种方式是使用数组泛型，Array<元素类型>：

```ts
let list: Array<number> = [1, 2, 3]       //number[]
```  

```ts
const a = [2,'a']                         // (string|number)[]
let b = []                                //any[]
b.push(1)                                 //number[]
b.push('red')                             //(string|number)[]
let c:number[] = []                       //number[]
c.push(1)                                 //number[]
c.push('red')                             //类型“string”的参数不能赋给类型“number”的参数
```   

由上a可看出，使用const声明数组不会导致TS推导出范围更窄的类型。  

思考一下b为什么不会报错？  

接着再看一个例子,你就会明白  

```ts
const buildArray = () => {
    let a =[]                       //any[]
    a.push(1)                       //number[]
    a.push('a')                     //(string|number)[]
    return a 
}

let myArray = buildArray()          //(string|number)[]
myArray.push(true)                  //类型“boolean”的参数不能赋给类型“string | number”的参数
```  

初始化空数组时，TS不知道数组中元素的类型，因此推导出的类型为any。向数组中添加元素后，TS开始拼凑数组的类型。当数组离开定义时所在的作用域后，TS将最终确定一个类型，不在扩张。  

### 元组   

元组是Array的子类型，是定义数组的一种特殊方式，长度固定，各索引位上的值具有固定的已知类型。声明元组时必须显示注解类型，因为创建元组使用的句法与数组相同（都是用方括号[]），而TS遇到方括号，推导出来的是数组的类型。  

```ts
let a: [string, number]
a = ['hello', 10]                   // OK
a = [10, 'hello']                   // Error
```   

元组也支持可选元素：  

```ts
let b:[number, number?][] = [
    [2333],
    [23, 33]
]
```   

元组也支持剩余元素，即为元组定义最小长度：  

```ts
let name:[string, ...string[]] = ['mwq', 'qwm', 'wqm', 'mqw']      //字符串列表，至少有一个元素
let list:[number, boolean, ...string[]] = [1, false, 'a', 'b']     //元素类型不同的列表
```   

#### 声明只读数组  

TS原生支持只读数组类型，用于创建不可变的数组。若想创建只读数组，要显示注解类型；若想更改只读数组，使用非变形方法，例如.concat及.slice，不能使用可变型方法，例如.push及.splice。  

声明只读数组和元组方法如下：  

```ts
type A = readonly string[]           //readonly string[]
type B = ReadonlyArray<string>       //readonly string[]
type C = Readonly<string[]>          //readonly string[]

type D = readonly [number, string]   //readonly [number, string]
type E = Readonly<[number, string]>  //readonly [number, string]
```  

### 枚举  

枚举类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。  

枚举分为两种：字符串到字符串之间的映射和字符串到数字之间的映射。如下所示：  

```ts
enum Language {
    English,
    Spanish,
    Russian
}
``` 

TS可以自动为枚举中的各个成员推导对应的数字，当然你也可以自己手动设置。如下所示：

```ts
enum Language {
    English = 2,
    Spanish = 5,
    Russian = 8
}
```  

按约定，枚举名称为大写的单数形式。枚举中的键也为大写  

枚举中的值使用点号或方括号表示法访问  

```ts
let myFirstLanguage = Language.Russian
let mySecondLanguage = Language['English']
```  

一个枚举可以分成几次声明，TS将自动将其合并。**注意**，如果分开声明枚举，TS只能推导出其中一部分的值，因此最好为枚举的每个成员显示赋值  

```ts
enum Language {
    English = 0,
    Spanish = 1,
}

enum Language {
    Russian = 2
}
```  

成员的值可以经计算得出，而且不必为所有成员都赋值（TS会自动推导出其值）：  

```ts
enum Language {
    English = 2,
    Spanish = 200+20,
    Russian            //221
}
```    

枚举的值也可以为字符串，甚至混用字符串和数字：  

```ts
enum Color {
    Red = '#c10000',
    Blue = '#007ac1',
    Pink = 0xc10050,     //十六进制字面量
    White = 255          //十进制字面量
}

let red = Color.Red      //'#c10000'
let white = Color[255]   //White
```  

由上可以看出，TS即允许同过值访问枚举，也允许通过键访问枚举  

### void  

某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有显示返回任何值（例如console.log）时，你通常会见到其返回值类型是 void：  

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```  

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：  

```ts
let unusable: void = undefined
```

### null和undefined  

TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：  

```ts
let a: undefined = undefined;
let b: null = null
```   

默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。

### never  

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。  

```ts
const a:never = () => {
    throw TypeError('I always error')
}

const b:never = () => {
    while(true) {
        doSomething()
    }
}
```   

如果说unknown是其他每个类型的父类型，那么never就是其他每个类型的子类型。我们可以把never理解为“兜底类型”。这意味着我们可以把never类型赋值给其他任意类型。 

### 对象  

在TS中使用类型描述对象有好几种方式，下面我将一一介绍。

#### 对象字面量句法  

```ts
let a:{b:number} = {
    b:2333
}                          //{b:number}


const a:{b:number} = {
    b:2333
}                          //{b:number}
```  

值得一提的是，使用const声明对象并不会缩窄推导的类型  

小试牛刀：  

看一下哪些类型可以赋值给a?

```ts
let a:{
    b:number,
    c?:string,
    [key:number]:boolean
}

a = {b: 1}
a = {b: 1, c: undefined}
a = {b: 1, c: 'd'}
a = {b: 1, 10: true}
a = {b: 1, 10: true, 20: false}
```  

##### 索引签名  

[key:T]:U句法称为索引签名，我们通过这种方式告诉TS指定的对象可能有更多的键。句法的意思是，“在这个对象中，类型为T的键对应的值为U类型。”  

注意： 

1.键的类型（T）必须可以赋值给number或string 

2.索引签名中键的名称可以是任何词，不一定非得用key


#### object

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

使用object类型，就可以更好的表示像Object.create这样的API。例如：  

```ts
interface ObjectConstructor {
  create(o: object | null): any;
}

const proto = {};

Object.create(proto);     // OK
Object.create(null);      // OK
Object.create(undefined); // Error
Object.create(1337);      // Error
Object.create(true);      // Error
Object.create("oops");    // Error
```  

#### 空对象类型{}  

除null和undefined之外的任何类型都可以赋值给空对象类型，使用起来比较复杂，应尽量避免使用  

```ts
let danger:{}
danger = {}                
danger = {x:1}
danger = []
danger = 2
```  

#### Object  

与{}作用基本一样，最好也避免使用，这里就不再做介绍
