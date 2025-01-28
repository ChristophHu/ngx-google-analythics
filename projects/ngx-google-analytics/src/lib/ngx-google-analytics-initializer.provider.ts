import { EnvironmentProviders, inject, InjectionToken, isDevMode, makeEnvironmentProviders, provideAppInitializer, Provider } from "@angular/core";
import { DOCUMENT } from '@angular/common'
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from "./ngx-google-analytics.provider";

// export const NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER: Provider = {
//   provide: APP_INITIALIZER,
//   multi: true,
//   useFactory: GoogleAnalyticsInitializer,
//   deps: [
//     NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
//     NGX_GTAG_FN,
//     DOCUMENT
//   ]
// };

// export const provideAnalyticsInitializer = (): EnvironmentProviders => {
//     const providers: (Provider | EnvironmentProviders)[] = [
//         NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
//         NGX_GTAG_FN,
//         DOCUMENT,
//         {
//             provide: APP_INITIALIZER,
//             deps: [
//                 NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
//                 NGX_GTAG_FN,
//                 DOCUMENT
//             ],
//             useFactory: GoogleAnalyticsInitializer,
//             multi: true
//         },
//     ];
  
//     return makeEnvironmentProviders(providers)
// };

// providers: [
//     { 
//         provide: APP_INITIALIZER, 
//         useFactory: initializeApp1, 
//         deps: [AuthService], 
//         multi: true 
//     },
// ]
// providers: [
//     provideAppInitializer(initializeApp1(inject(AuthService)))
// ]
// provideAppInitializer(() => intializeApp1(inject(AuthService)))

// types and interfaces
export type GaWindow = Window & {
    gtag?: any;
    dataLayer?: any;
}
export type DataLayer = Array<(string | { [param: string]: string })>
export type GtagFn = (...args: (string | { [param: string]: string })[]) => {}

export interface IGoogleAnalyticsSettings {
    /** Is mandatory to provide a tracking code folks... */
    tag: string;
    /** You can inject custom initialization commands like UserId or other e-commerce features. */
    initCommands?: Array<IGoogleAnalyticsCommand>;
    /** If Google changes the uri and I die, you can survive! */
    uri?: string;
    /** If true, trace GA tracking errors in production mode */
    enableTracing?: boolean;
    /** If has a value, nonce will be added to script tag **/
    nonce?: string;
}
export interface IGoogleAnalyticsCommand {
    command: string;
    values: Array<any>;
}

export const NGX_GTAG_FN = new InjectionToken<GtagFn>('ngx-gtag-fn', {
    providedIn: 'root',
    factory: () => getGtagFn(inject(NGX_WINDOW), inject(NGX_DATA_LAYER))
})
export const NGX_WINDOW = new InjectionToken<GaWindow>('ngx-window', {
    providedIn: 'root',
    factory: () => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
        throw new Error('Window is not available');
    }

    return defaultView;
    },
})
export const NGX_DATA_LAYER = new InjectionToken<DataLayer>('ngx-data-layer', {
    providedIn: 'root',
    factory: () => getDataLayerFn(inject(NGX_WINDOW))
});

export function getDataLayerFn(window: GaWindow): DataLayer {
    return (window)
      ? window['dataLayer'] = window['dataLayer'] || []
      : null;  
}
export function getGtagFn(window: GaWindow, dataLayer: DataLayer): GtagFn {
    return (window)
    ? window['gtag'] = window['gtag'] || function () {
        dataLayer.push(arguments as any);
        }
    : null;
}

export const NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER: Provider = [
  provideAppInitializer(() => GoogleAnalyticsInitializer(inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN), inject(NGX_GTAG_FN), inject(DOCUMENT))),
]

// export const provideAnalyticsInitializer = (): EnvironmentProviders => {
//     const providers: (Provider | EnvironmentProviders)[] = [
//         // NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
//         // NGX_GTAG_FN,
//         // DOCUMENT,
//         provideAppInitializer(() => GoogleAnalyticsInitializer(inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN), inject(NGX_GTAG_FN), inject(DOCUMENT))),
//         // {
//         //     provide: APP_INITIALIZER,
//         //     deps: [
//         //         NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
//         //         NGX_GTAG_FN,
//         //         DOCUMENT
//         //     ],
//         //     useFactory: GoogleAnalyticsInitializer,
//         //     multi: true
//         // },
//     ];
  
//     return makeEnvironmentProviders(providers)
// };

export function GoogleAnalyticsInitializer(settings: IGoogleAnalyticsSettings, gtag: GtagFn, document: Document): Promise<void> {
  console.warn('GoogleAnalyticsInitializer', settings, gtag, document)
  return new Promise<void>((resolve) => {
    console.log('settings.tag', settings.tag);
    if (!settings.tag) {
      if (!isDevMode()) {
        console.error('Empty tracking code for Google Analytics. Make sure to provide one when initializing NgxGoogleAnalyticsModule.');
      }

      return;
    }

    if (!gtag) {
      if (!isDevMode()) {
        console.error('Was not possible create or read gtag() fn. Make sure this module is running on a Browser w/ access to Window interface.');
      }

      return;
    }

    if (!document) {
      if (!isDevMode()) {
        console.error('Was not possible to access Document interface. Make sure this module is running on a Browser w/ access do Document interface.');
      }
    }

    // Set default ga.js uri
    settings.uri = settings.uri || `https://www.googletagmanager.com/gtag/js?id=${settings.tag}`;

    // these commands should run first!
    settings.initCommands = settings?.initCommands ?? [];

    // assert config command
    if (!settings.initCommands.find(x => x.command === 'config')) {
      settings.initCommands.unshift({ command: 'config', values: [ settings.tag ] });
    }

    // assert js command
    if (!settings.initCommands.find(x => x.command === 'js')) {
      settings.initCommands.unshift({ command: 'js', values: [ new Date() ] });
    }

    for (const command of settings.initCommands) {
      gtag(command.command, ...command.values);
    }

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    s.src = settings.uri;

    if (settings.nonce) {
      s.setAttribute('nonce', settings.nonce);
    }

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
    resolve();
  });
}