// TypeScript definitions
/// <reference path='../../../typings/tsd.d.ts' />
/// <reference path='../../../node_modules/angular2/typings/browser.d.ts'/>

import {Card} from './card'
import faker = require('faker')
var card

describe('Card', () => {
  beforeEach(() => {
    let nativeElement = {
      addEventListener() {return},
      style: {transition: '', transform: ''}
    }
    let element = {nativeElement: nativeElement}
    card = new Card(element)
  })

  it('constructor should set element to the native element', () => {
    let nativeElement = faker.lorem.words(1)
    let element = {nativeElement: nativeElement}

    card.constructor(element)

    expect(card.element).toEqual(nativeElement)
  })

  describe('ngOnInit', () => {
    it('should register hammer touch events', () => {
      let strParam = []
      let index = 0
      let ev = faker.lorem.words(1)
      let hammer = {
        on: (a, b) => {
          strParam[index] = a
          b(ev)
          index += 1
        }
      }
      spyOn(window, 'Hammer').and.returnValue(hammer)
      spyOn(card, 'dragCard')
      spyOn(card, 'releaseCard')

      card.ngOnInit()

      expect(strParam[0]).toEqual('panright panleft')
      expect(card.dragCard).toHaveBeenCalled()
      expect(strParam[1]).toEqual('panend')
      expect(card.releaseCard).toHaveBeenCalled()
    })

    it('should call setPos if index is defined', () => {
      spyOn(card, 'setPos')
      card.index = faker.lorem.words(1)[0]

      card.ngOnInit()

      expect(card.setPos).toHaveBeenCalled()
    })

    it('should not call setPos if index is not defined', () => {
      spyOn(card, 'setPos')
      card.index = ''

      card.ngOnInit()

      expect(card.setPos).not.toHaveBeenCalled()
    })
  })

  it('setPos should set the initial position in the card stack', () => {
    let index = faker.random.number()
    let calcBottom = `${10 * index + 16}px`
    let calcScale = faker.random.number()
    card.index = index.toString()
    let element = {
      nativeElement: {style: {zIndex: '', bottom: '', transform: ''}}
    }
    spyOn(card, 'calcScale').and.returnValue(calcScale)

    card.constructor(element)
    card.setPos()

    expect(card.element.style.zIndex).toEqual(`-${index}`)
    expect(card.element.style.bottom).toEqual(calcBottom)
    expect(card.element.style.transform).toEqual(calcScale)
  })

  it('dragCard should set element style properties', () => {
    let deltaX = faker.random.number()
    let offsetLeft = faker.random.number()
    let offset = deltaX - offsetLeft
    let calcScale = faker.random.number()
    let ev: any = {deltaX: deltaX}
    let element = {
      nativeElement: {
        offsetLeft: offsetLeft, style: {transition: '', transform: ''}
      }
    }
    spyOn(card, 'calcScale').and.returnValue(calcScale)

    card.constructor(element)
    card.dragCard(ev)

    expect(card.element.style.transition).toEqual('none')
    expect(card.element.style.transform).toEqual(`
      translate3d(${offset}px, 0, 0)
      ${calcScale}
    `)
  })

  describe('releaseCard', () => {
    it('should set element style properties', () => {
      let calcScale = faker.random.number()
      let ev = {deltaX: 0}
      spyOn(card, 'calcScale').and.returnValue(calcScale)

      card.releaseCard(ev)

      expect(card.element.style.transition).toEqual('all 1s')
      expect(card.element.style.transform).toEqual(
        `translate3d(0px, 0, 0) ${calcScale}`
      )
    })

    it('should call yay if the user likes this place', () => {
      spyOn(card, 'yay')
      let ev = {deltaX: window.innerWidth / 3}

      card.releaseCard(ev)

      expect(card.yay).toHaveBeenCalled()
    })

    it('should call nay if the user dislikes this place', () => {
      spyOn(card, 'nay')
      let ev = {deltaX: -window.innerWidth / 3}

      card.releaseCard(ev)

      expect(card.nay).toHaveBeenCalled()
    })
  })

  it('calcScale should calculate the 3d scale based on index', () => {
    let index = faker.random.number()
    card.index = index.toString()
    let val = 1 - index * .04

    expect(card.calcScale()).toEqual(`scale(${val})`)
  })
})
