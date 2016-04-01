import {Component} from 'angular2/core'
import {NgFor} from 'angular2/common'
import {Card} from './card'
import {MD_CARD_DIRECTIVES} from '@angular2-material/card'

// Handles top level navigation
@Component({
  directives: [NgFor, Card, MD_CARD_DIRECTIVES],
  selector: 'card-stack',
  styleUrls: ['../components/card-stack/card-stack.css'],
  templateUrl: '../components/card-stack/card-stack.html'
})
export class CardStack {
  cards = [
    {id: 1},
    {id: 2}
  ]
}
