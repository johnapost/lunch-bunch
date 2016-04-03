import {Directive, Input, ElementRef} from 'angular2/core'

// Container for touch interactions and positional styles
@Directive({
  selector: '[card]'
})
export class Card {
  element: HTMLElement

  @Input('index') index: string

  constructor(element: ElementRef) {
    this.element = element.nativeElement
  }

  ngOnInit() {

    // Add hammer listener to host element
    var mc = new Hammer(this.element)

    mc.on('swiperight', (ev) => this.yay())
    mc.on('swipeleft', (ev) => this.nay())

    if (this.index) {
      this.setPos()
    }
  }

  setPos() {
    this.element.style.zIndex = `-${this.index}`
    this.element.style.bottom = calcBottom(this.index)
    this.element.style.transform = calcScale(this.index)

    function calcBottom(index: string) {
      var bottom = 10 * parseInt(index, 10) + 16
      return `${bottom}px`
    }

    function calcScale(index: string) {
      var val = 1 - parseInt(index, 10) * .04
      return `scale(${val})`
    }
  }

  yay() {
    console.log('swiped right')
  }

  nay() {
    console.log('swiped left')
  }
}
