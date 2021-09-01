---
title: 泛型
autoPrev: kind
---   

# 泛型  

泛型就像一个占位符一个变量，在使用的时候我们可以将定义好的类型像参数一样传入，原封不动的输出  

## 泛型语法  

先看下面例子：  

```ts
function getValue(params: number):number {
    return params
}
```  

上述例子中我想返回一个值，这里我类型写死是number,但在实际中就未必是number了，我们可以通过泛型来解决这个问题，看下面的示例：  

```ts
function getValue<T>(params: T): T {
    return params
}
```  

其中T相当于一个占位符，在方法（变量、接口等）后面添加`<T>`  

如果我们需要传入多个参数，看如下示例：  

```ts
function getValue<T,U>(params: T, message:U): T {
    console.log(message)
    return params
}

getValue<number, string>(1,'1')
```

## 泛型接口  

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}
```

## 泛型类

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```