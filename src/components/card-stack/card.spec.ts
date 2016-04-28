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

      expect(card.yay).toHaveBeenCalledWith(ev)
    })

    it('should call nay if the user dislikes this place', () => {
      spyOn(card, 'nay')
      let ev = {deltaX: -window.innerWidth / 3}

      card.releaseCard(ev)

      expect(card.nay).toHaveBeenCalledWith(ev)
    })
  })

  describe('removeCard', () => {
    var calcScale

    beforeEach(() => {
      calcScale = faker.random.number()
      spyOn(card, 'calcScale').and.returnValue(calcScale)
    })

    it('should animate out', () => {
      let ev = {velocityX: faker.random.number()}
      let endpoint = window.innerWidth * ev.velocityX
      let rotation = 30 * ev.velocityX

      card.removeCard(ev)

      expect(card.element.style.transform).toEqual(
        `translate3d(${endpoint}px, 0, 0)` +
        `rotate(${rotation}deg)` +
        `${calcScale}`
      )
    })

    it('should animate to the window edge at minimum', () => {
      let ev = {velocityX: 1 / faker.random.number()}
      let endpoint = window.innerWidth
      let rotation = 30 * ev.velocityX

      card.removeCard(ev)

      expect(card.element.style.transform).toEqual(
        `translate3d(${endpoint}px, 0, 0)` +
        `rotate(${rotation}deg)` +
        `${calcScale}`
      )
    })

    afterEach(() => {
      expect(card.element.style.transition).toEqual('all 0.3s ease-out')
      expect(card.element.style.opacity).toEqual('0')
    })
  })

  describe('yay', () => {
    beforeEach(() => {
      spyOn(card, 'removeCard')
    })

    it('should call removeCard with ev', () => {
      let ev = faker.random.objectElement()

      card.yay(ev)

      expect(card.removeCard).toHaveBeenCalledWith(ev)
    })
  })

  describe('nay', () => {
    beforeEach(() => {
      spyOn(card, 'removeCard')
    })

    it('should call removeCard with ev', () => {
      let ev = faker.random.objectElement()

      card.nay(ev)

      expect(card.removeCard).toHaveBeenCalledWith(ev)
    })
  })

  it('calcScale should calculate the 3d scale based on index', () => {
    let index = faker.random.number()
    card.index = index.toString()
    let val = 1 - index * .04

    expect(card.calcScale()).toEqual(`scale(${val})`)
  })
})
