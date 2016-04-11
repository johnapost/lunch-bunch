// TypeScript definitions
/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../node_modules/angular2/typings/browser.d.ts'/>

import {CardStack} from './card-stack'
import faker = require('faker')
var cardStack = CardStack.prototype

describe('CardStack', () => {
  it('constructor should subscribe to Yelp data', () => {
    spyOn(cardStack, 'handleError')
    var val = {businesses: [faker.lorem.words(1)]}
    var err = faker.lorem.words(1)

    let yelpSvc = {
      getSample() {
        return {
          subscribe(fn1: any, fn2: any) {
            fn1(val)
            fn2(err)
          }
        }
      }
    }

    cardStack.constructor(yelpSvc)

    expect(cardStack.cards).toEqual(val.businesses)
    expect(cardStack.handleError).toHaveBeenCalledWith(err)
  })

  describe('handleError', () => {
    var alerted = false

    beforeEach(() => {
      spyOn(window, 'alert').and.callFake(() => {alerted = true})
      spyOn(console, 'error')
    })

    it('should handle 404 errors', () => {
      let err: any = {status: 404}

      cardStack.handleError(err)

      expect(console.error).toHaveBeenCalledWith('Resource unreachable')
      expect(console.error).toHaveBeenCalledWith(err)
    })

    it('should handle 500 errors', () => {
      let err: any = {status: 500}

      cardStack.handleError(err)

      expect(console.error).toHaveBeenCalledWith('Internal server error')
      expect(console.error).toHaveBeenCalledWith(err)
    })

    afterEach(() => {expect(alerted).toEqual(true)})
  })

  it('calcHeight should return innerHeight - 128', () => {
    innerHeight = window.innerHeight

    expect(cardStack.calcHeight()).toEqual(innerHeight - 128)
  })

  it('ngOnInit should return a height', () => {
    spyOn(cardStack, 'calcHeight').and.returnValue(0)

    cardStack.ngOnInit()

    expect(cardStack.height).toEqual('0px')
  })
})
