import { IGoogleAnalyticsCommand } from "./google-analytics-command";

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