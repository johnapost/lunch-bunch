import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'

// Exposes Yelp API
@Injectable()
export class YelpSvc {
  path: string

  constructor(private http: Http) {

    // Correct API endpoint for development
    if (window.location.host.indexOf(':') > -1) {
      this.path = `${window.location.origin.split(':4000')[0]}:3000`
    } else {
      this.path = ''
    }

    this.path = `${this.path}/yelp/sample`
  }

  // Returns a sample of Jacksonville businesses
  getSample() {
    return this.http.get(this.path)
      .map(res => res.json())
  }
}
