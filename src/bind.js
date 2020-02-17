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
  return function() {
    // 这里 args2 取全部的参数
    var args2 = slice.call(arguments, 0)
    // 参数拼接(这里不能用 call 了只能用 apply，因为 ... 没有了)
    return fn.apply(asThis, args.concat(args2))
  }
}

// es6 新语法代码
function _bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function resultFn(...args2) {
    return fn.call(
      // 支持 new 操作符
      this.__proto__ === resultFn.prototype ? this : asThis, 
      ...args, 
      ...args2
    ) // 返回这个函数
  }
}

module.exports = _bind

if (!Function.prototype.bind) {
  // polyfill
  Function.prototype.bind = _bind
}