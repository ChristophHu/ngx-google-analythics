import {InjectionToken} from '@angular/core'

/**
 * Provide an Injection Token for global settings.
 */
export const NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN = new InjectionToken<{ tag: string }>('ngx-google-analytics-settings', {
    factory: () => ({ tag: '' })
})
