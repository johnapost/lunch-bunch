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

    // Register hammer touch events
    hammer.on('panright panleft', (ev: HammerInput) => this.dragCard(ev))
    hammer.on('panend', (ev) => this.releaseCard(ev))

    // Wrapped in this if because index is not initially set sometimes
    if (this.index) {
      this.setPos()
    }
  }

  // Sets this card's initial position in the card stack
  setPos() {
    this.element.style.zIndex = `-${this.index}`
    this.element.style.bottom = calcBottom(this.index)
    this.element.style.transform = this.calcScale()

    // Calculate the bottom position based on index
    function calcBottom(index: string) {
      var bottom = 10 * parseInt(index, 10) + 16
      return `${bottom}px`
    }
  }

  // Card is dragged
  dragCard(ev: HammerInput) {
    var offset = ev.deltaX - this.element.offsetLeft
    this.element.style.transition = 'none'
    this.element.style.transform = `
      translate3d(${offset}px, 0, 0)
      ${this.calcScale()}
    `
  }

  // Card is released
  releaseCard(ev: HammerInput) {
    this.element.style.transition = 'all 1s'
    this.element.style.transform = `translate3d(0px, 0, 0) ${this.calcScale()}`

    // Use delta to decide if card is yay'd or nay'd
    if (ev.deltaX >= window.innerWidth / 3) {
      this.yay()
    } else if (ev.deltaX <= -window.innerWidth / 3) {
      this.nay()
    }
  }

  // The user likes this place
  yay() {
    console.log('yay')
  }

  // The user dislikes this place
  nay() {
    console.log('nay')
  }

  // Calculate the 3d scale based on index
  calcScale() {
    var val = 1 - parseInt(this.index, 10) * .04
    return `scale(${val})`
  }
}
