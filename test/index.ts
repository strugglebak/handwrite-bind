import * as chai from 'chai'
import { describe, it } from 'mocha'
import bind from '../src/bind'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

(Function.prototype as any).bind2 = bind
const assert = chai.assert
chai.use(sinonChai)

describe('bind', () => {
  it('测试 bind2 !== undefined', () => {
    assert((Function.prototype as any).bind2 !== undefined)
  })
  it('测试函数 bind2 传第一个参数 asThis', () => {
    const fn = function(){
      return this
    }
    const newFn = (fn as any).bind2({name: 'xxx'})
    assert(newFn().name === 'xxx')
  })
  it('测试函数 bind2 传两个参数 p1, p2', () => {
    const fn = function(p1, p2){
      return [this, p1, p2]
    }
    const newFn = (fn as any).bind2({name: 'xxx'}, 123, 456)
    assert(newFn()[0].name === 'xxx')
    assert(newFn()[1] === 123)
    assert(newFn()[2] === 456)
  })
})
