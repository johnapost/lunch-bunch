import {Directive, Input, ElementRef} from 'angular2/core'

// Handles touch interactions and logic
@Directive({
  selector: '[card]'
})
export class Card {
  element: HTMLElement

  constructor(element: ElementRef) {
    this.element = element.nativeElement
  }

  ngOnInit() {

    // Add hammer listener to host element
    var mc = new Hammer(this.element)

    mc.on('swiperight', (ev) => this.yay())
    mc.on('swipeleft', (ev) => this.nay())
  }

  yay() {
    console.log('swiped right')
  }

  nay() {
    console.log('swiped left')
  }
}
