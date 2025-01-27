import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN} from './tokens/ngx-google-analytics-settings-token';
import { NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER } from './initializer/analytics.initializer';

export function provideGoogleAnalytics(
    tag: string
): EnvironmentProviders {
    console.log('provideGoogleAnalytics', tag);
    return makeEnvironmentProviders([
        {
            provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
            useValue: {
                tag
            }
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER
    ]);
}
