import {Component} from 'angular2/core'
import {NgFor, NgStyle} from 'angular2/common'
import {Response} from 'angular2/http'
import {Subscription} from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import {MD_CARD_DIRECTIVES} from '@angular2-material/card'

import {Card} from './card'
import {YelpSvc} from '../../services/yelp.svc'

// Container for the stack of cards that showcase the Yelp businesses
@Component({
  directives: [NgFor, Card, MD_CARD_DIRECTIVES],
  providers: [YelpSvc],
  selector: 'card-stack',
  styleUrls: ['../components/card-stack/card-stack.css'],
  templateUrl: '../components/card-stack/card-stack.html'
})
export class CardStack {
  subscription: Subscription
  cards: Array<any>
  height: String

  constructor(private yelpSvc: YelpSvc) {

    // Subscribe to Yelp data
    this.subscription = this.yelpSvc.getSample().subscribe(
      val => this.cards = val.businesses,
      (err: Response) => this.handleError(err)
    )
  }

  // Display information about backend issues
  handleError(err: Response) {
    if (err.status === 404) {
      console.error('Resource unreachable')
      console.error(err)
    } else if (err.status === 500) {
      console.error('Internal server error')
      console.error(err)
    }
    alert('Our server is having internal issues, please try again later.')
  }

  calcHeight() {
    return window.innerHeight - 128
  }

  ngOnInit() {
    this.height = `${this.calcHeight()}px`
  }
}
