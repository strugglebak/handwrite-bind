// es3 兼容性更强的语法
var slice = Array.prototype.slice
function bind(asThis) {
  // 取到除了第一个 args 后剩下的参数, 等效于 ...args
  var args = slice.call(arguments, 1)
  // this 就是函数
  var fn = this
  if (typeof fn !== 'function') {// 出错判断
    throw new Error('必须是函数才能调用 bind')
  }
  function resultFn() {
    // 这里 args2 取全部的参数
    var args2 = slice.call(arguments, 0)
    // 参数拼接(这里不能用 call 了只能用 apply，因为 ... 没有了)
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis, 
      args.concat(args2)
    )
  }

  resultFn.prototype = fn.prototype
  return resultFn
}

// es6 新语法代码
function _bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  function resultFn(...args2) {
    return fn.call(
      // 支持 new 操作符
      // 不推荐(因为浏览器的各种 __proto__ 是他们自己加上去的，不是 es 标准里面的)
      // this.__proto__ === resultFn.prototype ? this : asThis, 
      // 使用官方推荐的写法
      this instanceof resultFn ? this : asThis,
      ...args, 
      ...args2
    ) // 返回这个函数
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

module.exports = _bind

if (!Function.prototype.bind) {
  // polyfill
  Function.prototype.bind = _bind
}