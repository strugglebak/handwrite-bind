if (!Function.prototype.bind) {
  // polyfill
  Function.prototype.bind = bind
}

function bind(asThis, p1?, p2?) {
  // this 就是函数
  const fn = this
  return function() {
    return fn.call(asThis) // 返回这个函数
  }
}

export default bind