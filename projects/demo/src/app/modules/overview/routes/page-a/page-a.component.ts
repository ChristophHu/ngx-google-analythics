import { Component } from '@angular/core';

@Component({
  selector: 'app-page-a',
  imports: [],
  templateUrl: './page-a.component.html',
  styleUrl: './page-a.component.sass'
})
export class PageAComponent {
  constructor() {
    console.log('PageAComponent')
  }
}
