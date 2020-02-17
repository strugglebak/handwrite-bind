if (!Function.prototype.bind) {
  // polyfill
  Function.prototype.bind = bind
}

function bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function(...args2) {
    return fn.call(asThis, ...args, ...args2) // 返回这个函数
  }
}

export default bind