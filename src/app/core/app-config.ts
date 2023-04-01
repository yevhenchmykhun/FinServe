import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export interface AppConfig {
    name: string;
    env: string;
    api: string;
}