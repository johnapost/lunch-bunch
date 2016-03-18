// TypeScript definitions
/// <reference path='../typings/tsd.d.ts' />

// Import Angular 2 core
import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {CardStack} from './components/card-stack/card-stack'

var $ = jQuery
var module: any

@Component({
  directives: [
    CardStack
  ],
  selector: 'app',
  template: document.getElementsByTagName('app')[0].innerHTML
})
class App {
}

bootstrap(App)
