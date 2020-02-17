const bind = require('../src/bind')

Function.prototype.bind2 = bind
const assert = console.assert

describe('bind', () => {
  it('测试 bind2 !== undefined', () => {
    assert((Function.prototype).bind2 !== undefined)
  })
  it('测试 fn.bind(asThis)', () => {
    const fn = function(){
      return this
    }
    const newFn = (fn).bind2({name: 'xxx'})
    assert(newFn().name === 'xxx')
  })
  it('测试 fn.bind(asThis, p1, p2)', () => {
    const fn = function(p1, p2){
      return [this, p1, p2]
    }
    const newFn = (fn).bind2({name: 'xxx'}, 123, 456)
    assert(newFn()[0].name === 'xxx')
    assert(newFn()[1] === 123)
    assert(newFn()[2] === 456)
  })
  it('测试 fn.bind(asThis)(p1)', () => {
    const fn = function(p1, p2){
      return [this, p1, p2]
    }
    const newFn = (fn).bind2({name: 'xxx'})
    assert(newFn(123, 456)[0].name === 'xxx')
    assert(newFn(123, 456)[1] === 123)
    assert(newFn(123, 456)[2] === 456)
  })
  it('测试 fn.bind(asThis, p1)(p2)', () => {
    const fn = function(p1, p2){
      return [this, p1, p2]
    }
    const newFn = (fn).bind2({name: 'xxx'}, 123)
    assert(newFn(456)[0].name === 'xxx')
    assert(newFn(456)[1] === 123)
    assert(newFn(456)[2] === 456)
  })
  it('测试 new 下的 fn.bind', () => {
    const fn = function(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    const fn2 = fn.bind2(undefined, 123, 456)
    const object = new fn2()
    assert(object.p1 === 123)
    assert(object.p2 === 456)
  })
  it('测试 new 下的 fn.bind 后的 prototype', () => {
    const fn = function(p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    fn.prototype.sayHi = function(){}
    const fn2 = fn.bind2(undefined, 123, 456)
    const object = new fn2()
    assert(object.p1 === 123)
    assert(object.p2 === 456)
    assert(object.__proto__ === fn.prototype)
    assert(typeof object.sayHi === 'function')
  })
})

function describe(name, cb) {
  console.log(name)
  cb()
}
function it(name, cb) {
  console.log(name)
  cb()
}
