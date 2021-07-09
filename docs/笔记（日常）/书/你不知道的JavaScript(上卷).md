---
title: JavaScript你可能不知道的事(小黄书) - 上册
date: 2021-07-06
sidebar: auto
categories:
  - javascript
tags:
  - 前端
---

## JavaScript 你可能不知道的事(小黄书) - 上册

> 小黄书是公司带我的姐姐推荐给给我看的，她跟我说 JS 好才是王道，有空把三本都看了，于是我在摸鱼的时候看完了小黄书上册......

> 小黄书涉及到的知识点还是非常的精细的，这里记录的是对于我来说让我眼前一亮的知识点，换句话就是我之前都不是很理解或者说是没有涉猎到的知识点。也不是代表除了这些别的我都懂了。总之读书是真的很重要。以后会一直记录下去。

#### 函数作用域

```javascript
function test(a) {
  b = a * 5; // 报错 b没有被定义
  let b;
  console.log(b);
}

------------------------------------------------------------------------function test(
  a
) {
  b = a * 5;
  var b; // 正常运行 var会变量提升
  console.log(b);
};
console.log(b); // 报错 找不到b

------------------------------------------------------------------------function test(
  a
) {
  b = a * 5;
  // 正常运行 函数作用域找不到b 就会去外层找
  console.log(b);
};
var b;
```

总结：

- 如果函数内部找不到 就会往外层找 直到到最外层的 Global 中
- 在函数中 就算使用 var 定义的变量 也不会被提升到全局的 Global 中，但是还是会变量提升
- 最好的建议还是使用 let 和 const 因为这里的两个是不会变量提升的，不容易出错

#### 闭包不污染全局变量

```javascript
function test1() {
  var a = 1;
}
test1(); // 正常运行

--------------------------------------------------------------------------(function test2() {})();
test2(); // 报错 找不到 test2这个函数
```

总结：

- 正常使用函数确实是可以让函数里面的成员变量私有化，但是函数自己本身是被定义和赋值到全局对象中了，这个或多或少也是一种污染
- 使用闭包可以解决这个问题，函数变量名被隐藏在自身中意味着不会非必要地污染外部作用域
- 当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。

#### 块作用域

```javascript
if(true){
    var a = 5;
}
console.log(a); // 5

--------------------------------------------------------------------------

if (true) {
  let b = 5;
}
console.log(b); // ReferenceError: b is not defined
```

总结：

- 在过去 JS 是没有块级作用域这个概念的，只有函数作用域，因为使用 var 定义的变量都会被提升到最上面（如果 var 定义在函数里面也会被提升到函数的最上面）

- 但是好在 ES6 推出了 let 和 const 关键字，让 JS 也拥有了块级作用域

#### 变量提升的细节

```javascript
a = 2;
var a;
console.log( a );
// 编译后的代码
var a;
a = 2;
console.log( a ); // 答案是2
-------------------------------------------------------------------------
console.log( a );
var a = 2;//浏览器解析到这里 编译器会将这段代码编译成 var a; a = 2; var a会被提到最前面
// 最终经过编译的最终代码是
var a
console.log( a );  // undefined 因为 a只是定义还没有赋值  所以是 undefined
a = 2
-------------------------------------------------------------------------
foo(); // 不是 ReferenceError, 而是 TypeError!
var foo = function bar() { // ... }; // 这里不是函数声明 而是函数表达式
// 编译器处理后
var foo
foo()  // TypeError 类型错误 还没声明 foo是函数就使用函数的调用方法
foo = function bar(){}
-------------------------------------------------------------------------
foo(); // 1
var foo;
function foo() { console.log( 1 ); } // 函数会被提升到最前面，换句话说，函数最先提升
foo = function() { console.log( 2 ); };
```

总结：

- 只有声明本身会被提升，赋值和其他的逻辑会留在原地
- var 和 函数声明都会提升
- 函数声明会被提升，但是函数表达式却不会被提升
- 函数会首先被提升，然后才是变量

#### 闭包

```javascript
function setupBot(name, selector) {
  $(selector).click(function activator() {
    console.log("Activating: " + name);
  });
}
setupBot("Closure Bot 1", "#bot_1");
setupBot("Closure Bot 2", "#bot_2");
// 以上的函数就是一个闭包
-------------------------------------------------------------------------function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
};
var baz = foo();
baz(); // 2 —— 朋友，这就是闭包的效果。
```

总结：

- 函数是在它本身的词法作用域以外执行。

- 只要使用了回调函数，实际上就是在使用闭包！

#### 循环和闭包

```javascript
for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
// 结果： 输出5次6
// 因为setTimeout()是一个异步的函数，for循环结束了才会执行setTimeout，而for循环结束的时候 i是等于6的 所以最终会输出5次6
// 因为我们试图在每次循环的时候都能保存下一个i的副本，但是实际上因为作用域，每次都是同一个i，最终i被赋值成了6，所以输出了5次6

解决方案：
for (var i=1; i<=5; i++) {
    (function(j) {
        setTimeout( function timer() {
            console.log( j );
        }, j*1000 );
    })( i );
}
// 这样就可以解决了， 每次运行的时候都将i存进一个立即执行函数里面,立即执行函数又作用域又可以防治变量污染，就可以解决这个问题了

最优方案：
for (let i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log( i );
    }, i*1000 );
}
// let 声明，可以用来劫 持块作用域，并且在这个块作用域中声明一个变量
```

#### 函数的 this 绑定

> this 绑定如果分类的话可以分为四类：默认绑定、显示绑定、隐式绑定、new 绑定

- 默认绑定

  ```javascript
  function demo() {
    cconsole.log(this.a);
  }
  var a = 2;
  demo(); // 2
  // demo 等于是自己运行自己，这里相当于是 window.demo() this指向的window，所以最终指向了全局的那个等于2的a
  // 注意 如果是严格模式下这个 this指向的就是 undefined 因为 严格模式下的是不能将变量挂载在全局的
  ```

- 隐式绑定

  ```javascript
  function foo() {
    console.log(this.a);
  }
  var obj = { a: 2, foo: foo };
  obj.foo(); // 2
  // 饮食绑定的简单理解就是 谁调用的函数，this就指向的是谁
  // 这是是 obj.foo() obj就是调用者 所以 this指向的是 obj
  ```

- 显示绑定

  ```javascript
  function foo() {
    console.log(this.a);
  }
  var obj = { a: 2 };
  foo.call(obj); // 2// 显示绑定很明显，就是使用call或者apply显而意见的告诉绑定的this是谁
  ```

- new 绑定

  ```javascript
  function foo(a) {
    this.a = a;
  }
  var bar = new foo(2);
  console.log(bar.a); // 2//使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。new 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。
  ```

#### 对象和字面量的细节

```javascript
var strPrimitive = "I am a string";
typeof strPrimitive; // "string" strPrimitive instanceof String; // false// instanceof 判断一个对象是由那个构造函数所new出来的/*	字面量并不是真正的对象，如这里的字符串字面量，它并不是通过 String()这个构造函数所new出来的，	那为什么可以使用 .length chatAt() 等这些Stinrg对象的方法呢？		我们可以理解为内部借助了 Object中的toString()方法，*/var strObject = new String( "I am a string" );typeof strObject; // "object" strObject instanceof String; // true/*	幸好，在必要时语言会自动把字符串字面量转换成一个 String 对象，也就是说你并不需要 显式创建一个对象。*/42.359.toFixed(2) // 也是解析器将42.359这个字面量转成 Number对象，所以可以使用Number对象的一些方法
```

#### 深拷贝和浅拷贝

> 首先这个概念针对的是引用类型的数据，如数组和对象，顾名思义，深拷贝就是深层次的拷贝，拷贝到要拷贝数据的引用地址去了，而浅拷贝只是简单的把数据的值给拷贝出来

##### 对象浅拷贝方法

- `const obj = Object.assign({},a)`
  - assign(对象 1，对象 2，对象 3)
  - 整个的逻辑其实是将对象 2，对象 3...（源对象）身上可枚举的属性复制到 对象 1（目标对象） 最终返回
- `const obj = {...a}`

##### 数组的浅拷贝方法

- `const arr = Array.from(brr)`
- `const arr = [...brr]`

#### 对象的细节

- 属性不一定包含值——它们可能是具备 getter/setter 的“访问描述符”。此外，属性可以是可枚举或者不可枚举的，这决定了它们是否会出现在 for..in 循环中。

#### Object.create()的用处

> 使用 Object.create(params1)可以非常轻松的让我们实现继承（原型链指向）。

##### 例子

```javascript
let father = {    name:'i am father'}let son = Object.create(father)console.log(son.name) // i am father--------------------------------------------------------son.prototye.name = 'i am father'
```

- 好处显而易见，当我们要为一个对象的原型上添加多个数据的时候，可以不用一条条的写繁琐的代码，可以直接定义一对象，再通过 Object.create(对象)的方式来创建一个对象，这个对象的原型上自动会有目标对象的所有属性

#### call apply bind 的区别

> call 和 apply 是同一类的东西，可以放在一起观察，bind 可以和 call 和 apply 一起观察

- call 和 apply 都是可以用来修改函数的上下文的指向，方法传递的第一个参数就是要修改的上下文，

- call 和 apply 都是只应用服务于函数，只有函数才可以使用 call 和 apply 方法

- call 如果需要传递多个参数就只能是在第二个参数开始依次的传递，apply 第二个参数是一个数组。且最多只能有两个参数

- bind() 方法创建一个新的函数，在调用时设置 this 关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

  ```javascript
  function add(a, b) {
    return a + b;
  }
  function sub(a, b) {
    return a - b;
  }
  add.bind(sub, 5, 3); // 这时，并不会返回 8add.bind(sub, 5, 3)(); // 调用后，返回 8-----------------------------------------------/*	bind是会返回一个新的函数，同时这个函数是已经修改过上下文，并且需要什么参数都已经准备好的函数，只需要执行一下就可以*/
  ```

## 总结

当自己陷入一个瓶颈的时候，可以选择看书，书本上涉及到的知识点，看完之后会发现自己对一门语言了解的只是冰山一角。花钱买书和读书是对自己投资最小和收益最大的事情
