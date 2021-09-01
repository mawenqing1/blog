---
title: 断言
autoPrev: class
---  

# TypeScript断言  

## 类型断言  

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。  

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。  

类型断言有两种形式：   

### 1.“尖括号”语法  

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```  

### 2.as语法  

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```  

## 非空断言  

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 **!** 可以用于断言操作对象是非 null 和非 undefined 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined** 。例子如下：  

### 1.忽略null和undefine类型  

```ts
function myFunc(maybeString: string | undefined | null) {
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```  

### 2.调用函数时忽略undefine类型  

```ts
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```  

## 确定赋值断言  

在 TypeScript 2.7 版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 **!** 号，从而告诉 TypeScript 该属性会被明确地赋值。为了更好地理解它的作用，我们来看个具体的例子：  

```ts
let x: number;
initialize();
// Variable 'x' is used before being assigned.(2454) 
//无法重新声明块范围变量“x”
console.log(2 * x); // Error

function initialize() {
  x = 10;
}
```  

很明显该异常信息是说变量 x 在赋值前被使用了，要解决该问题，我们可以使用确定赋值断言：  

```ts
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```  

通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。
