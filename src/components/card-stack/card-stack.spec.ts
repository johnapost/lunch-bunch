// TypeScript definitions
/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../node_modules/angular2/typings/browser.d.ts'/>

import {CardStack} from './card-stack'

describe('CardStack', () => {
  it('calcHeight should return innerHeight - 128', () => {
    innerHeight = window.innerHeight

    expect(CardStack.prototype.calcHeight()).toEqual(innerHeight - 128)
  })

  it('ngOnInit should return a height', () => {
    spyOn(CardStack.prototype, 'calcHeight').and.returnValue(0)

    CardStack.prototype.ngOnInit()

    expect(CardStack.prototype.height).toEqual('0px')
  })
})
