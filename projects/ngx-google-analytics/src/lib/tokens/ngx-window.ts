import { DOCUMENT } from "@angular/common"
import { inject, InjectionToken } from "@angular/core"
import { GaWindow } from "../models/ga-window"

export const NGX_WINDOW = new InjectionToken<GaWindow>('ngx-window', {
    providedIn: 'root',
    factory: () => {
        const { defaultView } = inject(DOCUMENT)

        if (!defaultView) {
            throw new Error('Window is not available')
        }

        return defaultView
    }
})