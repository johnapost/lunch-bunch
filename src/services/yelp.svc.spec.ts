// TypeScript definitions
/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='../../node_modules/angular2/typings/browser.d.ts' />

import {YelpSvc} from './yelp.svc'
import faker = require('faker')
var yelpSvc

describe('YelpSvc', () => {
  beforeEach(() => {
    let http: any
    yelpSvc = new YelpSvc(http)
  })

  describe('constructor', () => {
    it('should use the correct API endpoint for development', () => {
      yelpSvc.constructor()

      expect(yelpSvc.path).toEqual('http://localhost:3000/yelp/sample')
    })
  })

  it('getSample', () => {
    var businesses = faker.company.companyName()
    var res = {json() {return 1}}
    let http: any = {get() {
      return {map(func: Function) {
        return businesses
      }}
    }}
    yelpSvc = new YelpSvc(http)

    expect(yelpSvc.getSample()).toEqual(businesses)
  })
})
