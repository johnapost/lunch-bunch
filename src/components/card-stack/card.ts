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
    var hammer = new Hammer(this.element)

    // The different touch events that are supported
    hammer.on('panright panleft', this.dragCard)
    hammer.on('panend', this.releaseCard)

    // Wrapped in this if because index is not initially set sometimes
    if (this.index) {
      this.setPos()
    }
  }

  // Sets this card's initial position in the card stack
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

  // Card is dragged
  dragCard(ev: HammerInput) {
    var offset = ev.deltaX - ev.target.offsetLeft
    ev.target.style.transition = 'none'
    ev.target.style.transform = `translate3d(${offset}px, 0, 0)`
  }

  // Card is released
  releaseCard(ev: HammerInput) {
    ev.target.style.transition = 'all 1s'
    ev.target.style.transform = 'translate3d(0px, 0, 0)'
  }
}
