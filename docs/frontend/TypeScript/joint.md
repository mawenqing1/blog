---
title: 联合类型
autoPrev: assertion
---   

# 联合类型  

## 联合类型  

联合类型表示的值可能是多种不同类型当中的某一个。比如，A | B 联合类型的某个值就可能是 A 类型，也可能是 B 类型。  

```ts
const sayHello = (name:string | null) => {
    //...
};

sayHello('mwq');
sayHello(null);
```  

此外，对于联合类型来说，可能还会遇到以下用法：  

```ts
let num: 1 | 2 = 1;
type Cap = "butt" | "round" | "square";
```  

## 可辨识联合类型  

这种类型的本质是结合联合类型和字面量类型的一种类型保护方法。如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块。**它包含3个要点：可辨识、联合类型和类型守卫**。    

1. 可辨识  

可辨识要求联合类型中的每个元素都含有一个单例类型属性：  

```ts
enum CarTransmission {
  Automatic = 200,
  Manual = 300
}

interface Motorcycle {
  vType: "motorcycle"; 
  make: number; // year
}

interface Car {
  vType: "car"; 
  transmission: CarTransmission
}

interface Truck {
  vType: "truck"; 
  capacity: number; // tons
}
```  

在上述代码中，我们分别定义了`Motorcycle`、`Car`和`Truck`三个接口，在这些接口中都包含一个`vType`属性，该属性被称为可辨识的属性，而其它的属性只跟特性的接口相关。  

2. 联合类型  

基于前面定义了三个接口，我们可以创建一个`Vehicle`联合类型：  

```ts
type Vehicle = Motorcycle | Car | Truck;
```  

现在我们就可以开始使用`Vehicle`联合类型，对于`Vehicle`类型的变量，它可以表示不同类型的车辆。

3. 类型守卫  

下面我们来定义一个`evaluatePrice`方法，该方法用于根据车辆的类型、容量和评估因子来计算价格，具体实现如下：  

```ts
const EVALUATION_FACTOR = Math.PI; 

function evaluatePrice(vehicle: Vehicle) {
  return vehicle.capacity * EVALUATION_FACTOR;
}

const myTruck: Truck = { vType: "truck", capacity: 9.5 };
evaluatePrice(myTruck);
```  

对于以上代码，TypeScript 编译器将会提示以下错误信息：  

```ts
Property 'capacity' does not exist on type 'Vehicle'.
Property 'capacity' does not exist on type 'Motorcycle'.
```  

原因是在`Motorcycle`接口中，并不存在`capacity`属性，而对于`Car`接口来说，它也不存在`capacity`属性。那么，现在我们应该如何解决以上问题呢？这时，我们可以使用类型守卫。下面我们来重构一下前面定义的`evaluatePrice`方法，重构后的代码如下：  

```ts
function evaluatePrice(vehicle: Vehicle) {
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
```  

在以上代码中，我们使用`switch`和`case`运算符来实现类型守卫，从而确保在`evaluatePrice`方法中，我们可以安全地访问`vehicle`对象中的所包含的属性，来正确的计算该车辆类型所对应的价格。