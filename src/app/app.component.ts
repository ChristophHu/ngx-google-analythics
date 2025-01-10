import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AnalythicsService } from './core/services/analythics/analythics.service';
import { CommonModule } from '@angular/common';

declare const gtag: Function

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  providers: [
    AnalythicsService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'ngx-google-analythics';

  constructor(public router: Router, private _analythicsService: AnalythicsService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'MEASUREMENT-ID', { 'page_path': event.urlAfterRedirects });
      }      
    })
  }

  ngOnInit(): void {
    this._analythicsService.trackEvent('component_loaded', 'Component loaded into view', 'initializing');
  }
}
