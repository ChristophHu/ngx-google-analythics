import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';
import { provideGoogleAnalytics } from '../../../ngx-google-analytics/src/public-api';
import { provideGoogleAnalyticsRouter } from '../../../ngx-google-analytics/src/lib/ngx-google-analytics-router.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideGoogleAnalytics('UA-123456789-1'),
    provideGoogleAnalyticsRouter({include: ['/page-*']}),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideMarkdown()
  ]
};
