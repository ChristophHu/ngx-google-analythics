import { inject, isDevMode, provideAppInitializer, Provider } from "@angular/core";
import { DOCUMENT } from '@angular/common'
import { NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN } from "./tokens/ngx-google-analytics-settings-token";
import { DataLayer } from "./initializer/analytics.initializer";
import { GtagFn } from "./models/g-tag-fn";
import { IGoogleAnalyticsSettings } from "./models/google-analytics-settings";
import { NGX_GTAG_FN } from "./tokens/ngx-g-tag-fn";

export const NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER: Provider = [
  provideAppInitializer(() => GoogleAnalyticsInitializer(inject(NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN), inject(NGX_GTAG_FN), inject(DOCUMENT)))
]

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