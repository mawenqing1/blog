---
title: 类
autoPrev: interface
---   

# 类  

## 类  

如下示例：  

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```  

我们声明一个 Greeter类。这个类有3个成员：一个叫做 `greeting` 的属性，一个构造函数和一个 `greet` 方法。

你会注意到，我们在引用任何一个类成员的时候都用了 `this。` 它表示我们访问的是类的成员。

最后一行，我们使用 `new` 构造了 `Greeter` 类的一个实例。 它会调用之前定义的构造函数，创建一个 `Greeter` 类型的新对象，并执行构造函数初始化它。  

## 继承  

在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。  

```ts
class Person {
  public love: string;
  constructor(love: string) {
    this.love = love;
  }
  public sayLove() {
    console.log(`my love is ${this.love}`)
  }
}

class SuperPerson extends Person {
  public name: string;
  constructor(love: string, name: string) {
    super(love);
    this.name = name;
  }
  public sayName(){
    console.log(`my name is ${this.name}`)
  }
}

let me = new SuperPerson('HTML', 'mwq');
me.sayLove()
me.sayName()
```  

在构造函数里访问 `this` 的属性之前，我们 一定要调用 `super()`。 这个是TypeScript强制执行的一条重要规则。  

## 公共、私有与受保护的修饰符  

### `public`  

修饰的属性或方法是共有的，在任何地方都能访问，在TypeScript里，成员都默认为 `public`。  

```ts
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```  

### `private`   

当成员被标记成 `private` 时，它就不能在声明它的类的外部访问，只有在**本类**才能被访问。

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

### `protected`  

修饰的属性或方法是受保护的在 **本类** 和 **子类** 中能够访问。  

```ts
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误

```  

## 静态属性 `static`

使用 `static` 修饰的属性是通过类去访问，是每个实例共有的，同样 `static` 可以修饰方法，用 `static` 修饰的方法称为类方法，可以使用类直接调用

```ts
class Parent {
    static species: string = 'human'
    public name: string
    private money: number
    constructor(name: string) {
        this.name = name 
    }
    eat() {
        console.log(`${this.name}在吃饭`)
    }
}
console.log(Parent.species)     //'human'
```

## `readonly`修饰符  

我们给属性添加上 `readonly` 就能保证该属性只读，不能修改，如果存在 `static` 修饰符，写在其后  

```ts
class Parent {
    static readonly species: string = 'human'
    public name: string
    private money: number
    constructor(name: string) {
        this.name = name 
    }
    eat() {
        console.log(`${this.name}在吃饭`)
    }
}
Parent.species = 'dog'  //无法分配到 "species" ，因为它是只读属性
```  

## 抽象类 `abstract`  

使用 `abstract` 关键字声明的类，我们称之为抽象类。抽象类不能被实例化，因为它里面包含一个或多个抽象方法。所谓的抽象方法，是指不包含具体实现的方法  

```ts
abstract class Person {
  constructor(public name: string){}

  abstract say(words: string) :void;
}

const lolo = new Person();    //无法创建抽象类的实例
```  

抽象类不能被直接实例化，我们只能实例化实现了所有抽象方法的子类。具体如下所示：  

```ts
abstract class Person {
  constructor(public name: string){}

  // 抽象方法
  abstract say(words: string) :void;
}

class Developer extends Person {
  constructor(name: string) {
    super(name);
  }
  
  say(words: string): void {
    console.log(`${this.name} says ${words}`);
  }
}

const lolo = new Developer("mwq");
lolo.say("I love ts!");     // mwq says I love ts!
```  

## 类方法重载  

在前面的章节，我们已经介绍了函数重载。对于类的方法来说，它也支持重载。如下示例：  

```ts
class ProductService {
    getProducts(): void;
    getProducts(id: number): void;
    getProducts(id?: number) {
      if(typeof id === 'number') {
          console.log(`获取id为 ${id} 的产品信息`);
      } else {
          console.log(`获取所有的产品信息`);
      }  
    }
}

const productService = new ProductService();
productService.getProducts(666); // 获取id为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息
```