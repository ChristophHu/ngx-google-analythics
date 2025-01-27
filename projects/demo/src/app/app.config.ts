import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideMarkdown } from 'ngx-markdown'
import { provideGoogleAnalytics, provideGoogleAnalyticsRouter } from '../../../ngx-google-analytics/src/public-api'

export const appConfig: ApplicationConfig = {
  providers: [
    provideGoogleAnalytics('G-M48C5CD7DN'),
    provideGoogleAnalyticsRouter({ include: ['/overview', '/readme', '/overview/*'] }),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideMarkdown()
  ]
}
