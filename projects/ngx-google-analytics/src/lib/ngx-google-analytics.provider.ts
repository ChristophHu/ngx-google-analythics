import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from '@angular/core';
import { NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER } from './ngx-google-analytics-initializer.provider';

export const NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN = new InjectionToken<{ tag: string }>('ngx-google-analytics-settings', {
    factory: () => ({ tag: '' })
})

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
