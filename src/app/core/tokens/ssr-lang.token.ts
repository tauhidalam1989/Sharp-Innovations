import { InjectionToken } from '@angular/core';

/**
 * Injection token for passing the detected language from Express SSR to Angular.
 * On the server, this is set from query param / cookie.
 * On the browser, this is not provided (falls back to localStorage).
 */
export const SSR_LANG = new InjectionToken<string>('SSR_LANG');
