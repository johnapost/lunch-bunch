// Import Angular 2 core
import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'

@Component({
  selector: 'app',
  template: '<h1>App booted!</h1>'
})
class App {
  ngOnInit() {
    console.log('yay')
  }
}

bootstrap(App)
