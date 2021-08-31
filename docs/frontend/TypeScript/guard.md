---
title: 类型守卫
autoPrev: joint
---   

# 类型守卫  

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。目前主要有四种的方式来实现类型保护：  

## 类型判断：`typeof`  

```ts
function test(input: string | number) {
  if (typeof input === 'string') {
    // 这里 input 的类型「收紧」为 string
  } else {
    // 这里 input 的类型「收紧」为 number
  }
}
```  

`typeof`类型保护只支持两种形式：`typeof v` === `"typename"` 和 `typeof v` !== `typename`，`"typename"` 必须是 `"number"`， `"string"`， `"boolean"` 或 `"symbol"`。


## 实例判断：`instanceof`  

```ts
class Foo {}
class Keep {}

function test(input: Foo | Keep) {
  if (input instanceof Foo) {
    // 这里 input 的类型「收紧」为 Foo
  } else {
    // 这里 input 的类型「收紧」为 Keep
  }
}
```  


## 属性判断：`in`  

```ts
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```  

## 自定义守卫  

自定义守卫的语法结构为： {形参} is {类型} ，由于自定义守卫的本质是一种「类型断言」，因而在自定义守卫函数中，你可以通过任何逻辑来实现对类型的判断。  

```ts
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```