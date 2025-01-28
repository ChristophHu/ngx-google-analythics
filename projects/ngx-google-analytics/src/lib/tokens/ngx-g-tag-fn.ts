import { inject, InjectionToken } from "@angular/core"
import { GtagFn } from "../models/g-tag-fn"
import { GaWindow } from "../models/ga-window"
import { DataLayer } from "../models/data-layer"
import { NGX_WINDOW } from "./ngx-window"
import { NGX_DATA_LAYER } from "./ngx-data-layer"

export const NGX_GTAG_FN = new InjectionToken<GtagFn>('ngx-gtag-fn', {
    providedIn: 'root',
    factory: () => getGtagFn(inject(NGX_WINDOW), inject(NGX_DATA_LAYER))
})

export function getGtagFn(window: GaWindow, dataLayer: DataLayer): GtagFn {
    return (window) ? window['gtag'] = window['gtag'] || function () {
        dataLayer.push(arguments as any)
    } : null
}