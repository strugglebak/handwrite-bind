# handwrite-bind
手写 bind

对于 `new` 来说，它做了 4 步操作

比如如下的代码

```js
var fn = function(a) {
  this.a = a
}

new fn('x')
```

- 声明一个临时对象

  ```js
  var temp = {}
  ```

- 在临时对象上改变它的原型链

  ```js
  temp.__proto__ = fn.prototype
  ```

- 把临时对象作为 `this` 传给 `fn.call`

  ```js
  fn.call(temp, 'x')
  ```

- 把 `fn` 的 `this` 作为返回值给 `return` 出来

  ```js
  return this
  ```
