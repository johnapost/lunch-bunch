import {Component} from 'angular2/core'
import {NgFor} from 'angular2/common'
import {Card} from './card'

// Handles top level navigation
@Component({
  directives: [NgFor, Card],
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
