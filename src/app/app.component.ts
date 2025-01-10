import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AnalythicsService } from './core/services/analythics/analythics.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IconsComponent } from './shared/components/icons/icons.component';
import { GithubService } from './core/services/github/github.service';
import { Observable } from 'rxjs';

declare const gtag: Function

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    CommonModule,
    IconsComponent,
    RouterModule
  ],
  providers: [
    AnalythicsService,
    GithubService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {

  constructor(public router: Router, private _analythicsService: AnalythicsService, private _githubService: GithubService) {
    this.repos$ = this._githubService.repos$
    this.this_repo$ = this._githubService.this_repo$
    this.user$ = this._githubService.user$

    this.name = this._githubService.getThisRepo()
    this.version = this._githubService.getVersion()

    this.router.events.subscribe((event) => {
      console.log('routerevent', event)
      if (event instanceof NavigationEnd) {
        gtag('config', 'MEASUREMENT-ID', { 'page_path': event.urlAfterRedirects });
      }      
    })
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
