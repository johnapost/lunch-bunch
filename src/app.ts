// TypeScript definitions
/// <reference path='../typings/tsd.d.ts' />
/// <reference path='../node_modules/angular2/typings/browser.d.ts'/>

// Import Angular 2 core
import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from 'angular2/http'
import {Component, enableProdMode} from 'angular2/core'
import {CardStack} from './components/card-stack/card-stack'

var $ = jQuery
var module: any
let document = window.document

@Component({
  directives: [
    CardStack
  ],
  providers: [HTTP_PROVIDERS],
  selector: 'app',
  template: (<HTMLElement>document.getElementsByTagName('app')[0]).innerHTML
})
class App {
}

enableProdMode()
bootstrap(App)
