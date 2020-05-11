import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-components',
  template: `
    <p>
      components works!
    </p>
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
