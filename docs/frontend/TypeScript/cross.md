---
title: 交叉类型
autoPrev: joint
---   

# 交叉类型  

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 **&** 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。   

```ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
```  

## 同名基础类型属性的合并  

如果在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，例如下述例子，会发生什么情况呢？    

```ts
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string
}

type XY = X & Y;
```  

从上面可以看出，接口X和Y都有一个相同的属性c，但它俩类型不一样，此时c的类型会不会是 `string` 或 `number` 呢？我们一起来看一下：  

```ts
let p:XY = {
      c:6,        //不能将类型“number”分配给类型“never”
      d:'d',
      e:'e'
    }

let q:XY = {
      c:'c',     //不能将类型“string”分配给类型“never”
      d:'d',
      e:'e'
    }
```  

哦吼，属性c的类型竟然变成了 `never`,我们来分析以下为什么。交叉后属性c的类型为 `string & number`,即属性c的类型既可以是 `string` 又可以是 `number`，很明显这种类型不存在，因此交叉后c的类型为 `never`。  

## 同名非基础类型属性的合并  

上述示例中，刚好接口 **X** 和接口 **Y** 中内部成员c的类型都是基本数据类型，那么如果是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：  

```ts
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);
```  

我们看一下打印结果：

![ok](/assets/ts/logabc.png)  

由此可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并的。