import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideMarkdown } from 'ngx-markdown'
import { provideGoogleAnalytics, provideGoogleAnalyticsRouter } from '../../../ngx-google-analytics/src/public-api'


export const appConfig: ApplicationConfig = {
  providers: [
    provideGoogleAnalytics('G-ZNMB8Y0607'),
    provideGoogleAnalyticsRouter({include: ['/overview', '/readme']}),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideMarkdown()
  ]
}
