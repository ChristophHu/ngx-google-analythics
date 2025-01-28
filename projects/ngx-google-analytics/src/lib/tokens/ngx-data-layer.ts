import { inject, InjectionToken } from "@angular/core";
import { DataLayer } from "../models/data-layer";
import { NGX_WINDOW } from "./ngx-window";
import { GaWindow } from "../models/ga-window";

export const NGX_DATA_LAYER = new InjectionToken<DataLayer>('ngx-data-layer', {
    providedIn: 'root',
    factory: () => getDataLayerFn(inject(NGX_WINDOW))
});

export function getDataLayerFn(window: GaWindow): DataLayer {
    return (window)
      ? window['dataLayer'] = window['dataLayer'] || []
      : null;  
}