---
title: 接口
autoPrev: function
---   

# 接口  

## 接口简介  

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。与类型别名相似，接口是一种命名类型的方式，这样就无需在行内定义。  

## 接口与类型别名的区别

1. 两者都可以用来描述对象或函数的类型，但是语法不同 

```ts
type mwq = {
    name:string,
    age:number,
    alive:boolean
}
```  

此类型别名可以重写为下述接口：  

```ts
interface mwq {
    name:string,
    age:number,
    alive:boolean
}
```  

2. 两者都可以扩展，但是语法又有所不同。此外，请注意接口和类型别名不是互斥的。接口可以扩展类型别名，反之亦然   

**interface extends interface**  

```ts
interface PartialPointX { x: number }
interface Point extends PartialPointX { y: number }
```  

**type alias extends type alias**  

```ts
type PartialPointX = { x: number }
type Point = PartialPointX & { y: number }
```  

**interface extends type alias**  

```ts
type PartialPointX = { x: number }
interface Point extends PartialPointX { y: number }
```  

**type alias extends interface**  

```ts
interface PartialPointX { x: number }
type Point = PartialPointX & { y: number }
```



3. 类型别名更通用，右边可以是任何类型，包括类型表达式（类型，外加&或|等类型运算符）；而在接口声明中，右边必须为结构。下述例子便不可用接口重写：  

```ts
type A = number
type B = A | string
```  

4. 扩展接口时，TS将检查扩展的接口是否可赋值给被扩展的接口。例如：  

```ts
interface A {
    good(x:number):string
    bad(x:number):string
}

interface B extends A {
    good(x:number):string
    bad(x:string):string    //接口“B”错误扩展接口“A”。
                            //属性“bad”的类型不兼容。
                            //不能将类型“(x: string) => string”分配给类型“(x: number) => string”。
                            //参数“x”和“x” 的类型不兼容。
                            //不能将类型“number”分配给类型“string”
}                              
```  

5. 同一作用域中的多个同名接口将自动合并；同一作用域中的多个同名类型别名将导致编译错误。  

```ts
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```

## 对象类型  

TypeScript 中的接口是一个非常灵活的概念，也常用于对对象进行描述：  

```ts
interface Person {
  name: string;
  age: number;
}

let mwq: Person = {
  name: "mwq",
  age: 23,
};
```  

## 只读与可选属性  

### 只读属性  

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性：  

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, 
                  y: 20 
                };

p1.x = 5; // error!
```

设置只读属性时，什么时候用`const`，什么时候用`readonly`?

### 可选属性 

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。  

```ts
interface Person {
    name:string;
    age?:number;
}
```  

