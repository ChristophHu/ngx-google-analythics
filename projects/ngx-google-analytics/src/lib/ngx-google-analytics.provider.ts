import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core'
import { NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER } from './ngx-google-analytics-initializer.provider'
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from './tokens/ngx-google-analytics-settings-token'

export function provideGoogleAnalytics(tag: string): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
            useValue: {
                tag
            }
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER
    ])
}
