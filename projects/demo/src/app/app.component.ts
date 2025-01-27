import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsComponent } from './shared/components/icons/icons.component';
import { Observable } from 'rxjs';
import { GithubService } from './core/services/github.service';
import { AnalyticsService } from '../../../ngx-google-analytics/src/public-api';

declare const gtag: Function

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    CommonModule,
    IconsComponent,
    // JsonPipe,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  constructor(private _githubService: GithubService, private _analythicsService: AnalyticsService) {
    this.repos$ = this._githubService.repos$
    this.this_repo$ = this._githubService.this_repo$
    this.user$ = this._githubService.user$

    this.name = this._githubService.getThisRepo()
    this.version = this._githubService.getVersion()

    // this.router.events.subscribe((event) => {
    //   console.log('routerevent', event)
    //   if (event instanceof NavigationEnd) {
    //     gtag('config', 'MEASUREMENT-ID', { 'page_path': event.urlAfterRedirects });
    //   }      
    // })
  }

  ngOnInit(): void {
    this._analythicsService.trackEvent('component_loaded', 'Component loaded into view', 'initializing');
  }

  // github-service
  repos$: Observable<any>
  this_repo$: Observable<any>
  user$: Observable<any>

  show_settings: boolean = false
  name: string = ''
  version: string = '0.0.1'
  
  toggleSettings() {
    this.show_settings = !this.show_settings
  }
  toggleTheme() {
    this.toggleSettings()
  }
}
