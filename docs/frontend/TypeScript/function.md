---
title: TypeScript函数
autoPrev: guard
---   

# TypeScript函数   



## 声明和调用函数

我们先根据下图来看一下TS与JS函数的区别：  

![](/assets/ts/tsVSjs.png)  

在JS中对函数可执行的操作有很多：可以作为参数传给其他函数；可以作为函数的返回值；可以赋值给对象和原型；可以赋予属性；可以读取属性等。而TS通过丰富的类型系统延续了这一传统。  

通常，我们会显示注解函数的参数。TS能推导出函数体中的类型，但多数情况下无法推导出参数的类型。返回类型能推导出来，不过也可以显示注解：  

```ts
function add(a: number, b: number): number {
    return a + b
}
```  

上述例子声明函数使用的是具名函数句法，不过JS和TS至少还支持五种声明函数的方式：  

```ts
//具名函数
function greet(name: string) {
    return 'hello' + name
}

//函数表达式
let greet2 = function(name: string) {
    return 'hello' + name
}

//箭头函数表达式
let greet3 = (name: string) => {
    return 'hello' + name
}

//箭头函数表达式简写形式
let greet4 = (name: string) => 
    return 'hello' + name

//函数构造方法
let greet5 = new Function('name', 'return "hello" + name')
```

除了函数构造方法，其他几种句法在TS中都可以放心使用，都能确保类型安全。  

为什么函数构造方法不安全呢？在编辑器中输入该例子你会发现其类型为Function（如下图）。这是一种可调用的对象（即可以在后面加上（）），而且具有Function.prototype的所有原型方法。但是这里没有体现参数和返回值的类型，因此可以使用任何参数调用函数。

![](/assets/ts/greet5.png)   

在TS中调用函数时，直接传入实参即可，TS将检查实参是否与函数形参的类型兼容。  

```ts
add(1, 2)       //3
greet('mwq')    //'hello mwq'
```    

## 函数类型  

ts中也有函数类型，用于描述一个函数,这种句法也称调用签名或类型签名：  

```ts
type FnType = (x: number, y: number) => number
```

完整的函数写法：  

```ts
let myAdd: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y
}

// 使用 FnType 类型
let myAdd: FnType = function(x: number, y: number): number {
  return x + y
}

// ts 自动推导参数类型
let myAdd: FnType = function(x, y) {
  return x + y
}
```


## 可选和默认参数  

### 可选参数

与对象和元组一样，可以使用？把参数标记为可选。声明函数的参数时，必选的放在可选的前面：  

```ts
function log(message: string, userId?: string) {
    let time = new Date().toLocaleTimeString()
    console.log(time, message, userId || 'Not signed in')
}

log('eat')              //下午2:38:19 eat Not signed in
log('game', 'mwq')      //下午2:38:19 game mwq
```    

### 默认参数   

与JS一样，可以为可选参数提供默认值。这样在调用时无需传入参数的值。  

```ts
function log(message: string, userId = 'Not signed in') {
    let time = new Date().toLocaleTimeString()
    console.log(time, message, userId)
}

log('eat')              //下午2:38:19 eat Not signed in
log('game', 'mwq')      //下午2:38:19 game mwq
```

## 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用`arguments`来访问所有传入的参数。在TypeScript里，你可以把所有参数收集到一个变量里：  

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```  

剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。

## 注解this的类型  

现在有一个格式化日期的实用函数，如下所示：  

```ts
function fancyDate(this:Date) {
    console.log(`${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`);
}

fancyDate.call(new Date)       //1/8/2021
```  

如果函数使用this，需要在函数的第一个参数中声明this的类型。如果未声明，编辑器将会报错：  

```ts
function fancyDate(this:Date) {
    console.log(`${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`);
    //"this" 隐式具有类型 "any"，因为它没有类型注释
}
```  

## 函数重载  

在多数编程语言中，声明函数时一旦指定了特定的参数和返回类型，就只能使用相应的参数调用函数，而且返回值的类型始终如一。而JS是一门动态语言，势必需要多种方式调用一个函数的方法。不仅如此，有时输出的类型取决于输入的参数类型。

TS为了保证类型安全，支持了动态**重载函数**（有多个调用签名的函数）声明。如下示例：  

```ts
// 重载签名（函数类型定义）
function toString(x: string): string;
function toString(x: number): string;

// 实现签名（函数体具体实现）
function toString(x: string | number) {
  return String(x)
}

let a = toString('hello') // ok
let b = toString(2) // ok
let c = toString(true) // error
```  

函数实现签名并不是重载的一部分，当至少具有一个函数重载的签名时，只有重载是可见的。最后一个实现签名对签名的形状并没有贡献，因此，要获得所需的行为，你需要添加额外的重载：  

```ts
function toString(x: string): string;

function toString(x: number): string {
  return String(x)
}

toString(2) // error
```