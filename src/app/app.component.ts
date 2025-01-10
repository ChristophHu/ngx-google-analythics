import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalythicsService } from './core/services/analythics/analythics.service';
import { CommonModule } from '@angular/common';

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

  constructor(private _analythicsService: AnalythicsService) {}

  ngOnInit(): void {
    this._analythicsService.trackEvent('component_loaded', 'Component loaded into view', 'initializing');
  }
}
