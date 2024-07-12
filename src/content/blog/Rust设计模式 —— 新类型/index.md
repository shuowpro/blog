---
banner: ./rust-logo.png
category: 编程语言
title: Rust设计模式 —— 新类型
excerpt: 绕过孤儿规则，给标准库和第三方库的类型增加新成员函数
date: '2021-10-22'
banner_y: 0.48438
---

类似于Swift，Rust的类型系统允许我们在不触碰源码的情况下给其他crate的类型增加新的trait。这是一个极为方便的功能，可是，为了防止这种功能破坏了类型的一致性，Rust设定了孤儿规则，也就是孤儿规则。简单来说，孤儿规则允许我们为一个外部crate的类型拓展自定义的trait，或者为某个我们自定义的类型拓展某个外部crate的trait。这两者只能二选一，而不能同时满足。但是有时候，这种需求是真实存在的。此时，我们只能够采取一种方法绕过这一个规则，也就是所谓的新类型模式

### 新类型模式

新类型模式总体来说还是比较简单的，他的总体思路是将某个外部类型用某个自定义的类型包起来，通常是一个tuple，由于Rust的编译器的优化，事实上这一层抽象并没有引入额外的内存空间。

我们可以这样引入一个新类型：

```rust
pub struct MyCollection(pub Vec<i32>);
```

这样，我们就可以实现一些类型，例如：

```rust
impl FromStr for MyCollection {}
```

当然，我们也可以实现泛型化的新类型：

```rust
pub struct MyCollection<T>(pub Vec<T>);
```

这样，我们就可以通过类似于访问tuple内部元素的方法去访问这个类型

```rust
let my_collection: MyCollection = MyCollection(vec![1, 2, 3]);
println!("{:#?}", my_collection.0)
```

### Deref

有些文章说我们应该为新类型实现deref来让系统自动解引用以省去这奇怪的`.0`。但是，根据从Rust社区的反馈来看，这一行为更多的是被认为是一种反模式。相比之下，用模式匹配作解构是更加被推荐的一种方式

```rust
let MyCollection(arr) = my_collection; // arr 就是内部包含的类型
```
