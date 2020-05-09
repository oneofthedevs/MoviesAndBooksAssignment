import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components',
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class ComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
