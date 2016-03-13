// TypeScript definitions
/// <reference path='../typings/jquery/jquery.d.ts' />
/// <reference path='../typings/velocity-animate/velocity-animate.d.ts' />
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

// Import Angular 2 core
import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'

@Component({
  selector: 'app',
  template: '<h1>App booted!</h1>'
})
class App {
}

bootstrap(App)
