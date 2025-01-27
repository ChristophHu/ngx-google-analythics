import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideMarkdown } from 'ngx-markdown'
import { provideGoogleAnalytics } from '../../../ngx-google-analytics/src/public-api'

export const appConfig: ApplicationConfig = {
  providers: [
    provideGoogleAnalytics('G-M48C5CD7DN'),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideMarkdown()
  ]
}
