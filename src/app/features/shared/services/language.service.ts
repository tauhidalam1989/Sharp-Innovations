import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
// import { REQUEST } from '@nguniversal/express-engine/tokens'; // Removed in favor of explicit 'SSR_LANG' string injection

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private isBrowser: boolean;
  private isServer: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document,
    @Optional() @Inject('SSR_LANG') private ssrLang: string | null
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);

    // Determine default language
    let defaultLang: string;
    if (this.isServer) {
      // On server: use the explicit 'SSR_LANG' provided in server.ts
      defaultLang = this.ssrLang || 'en';
      console.log(`[LanguageService-SSR] Injected SSR_LANG: ${this.ssrLang}`);
      console.log(`[LanguageService-SSR] Setting language to: ${defaultLang}`);

      // On server: set language state immediately
      this.translate.setDefaultLang(defaultLang);
      this.translate.use(defaultLang);
    } else {
      // On browser: use stored preference or default to 'en'
      defaultLang = this.getStoredLanguage() || 'en';
      this.translate.setDefaultLang('en');
    }

    this.setLanguage(defaultLang);
  }

  switchLanguage(lang: string): void {
    this.setLanguage(lang); // Set the language and layout direction
    if (this.isBrowser) {
      localStorage.setItem('language', lang); // Save the language preference only in browser
      // Set cookie for SSR (expires in 1 year)
      document.cookie = `lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    }
  }

  private setLanguage(lang: string): void {
    this.translate.use(lang); // Change the language

    // Update HTML attributes on both server and browser
    const isArabic = lang === 'ar';

    if (this.isBrowser) {
      document.documentElement.lang = lang;
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      if (isArabic) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    } else if (this.isServer) {
      // On server: set lang and dir on the document element
      try {
        const htmlEl = this.doc.documentElement;
        if (htmlEl) {
          htmlEl.setAttribute('lang', lang);
          htmlEl.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
        }
      } catch (e) {
        // Ignore errors on server DOM manipulation
      }
    }
  }

  getLanguage(): string {
    if (this.isServer) {
      return this.ssrLang || 'en';
    }
    return this.getStoredLanguage() || 'en'; // Retrieve the saved language
  }

  private getStoredLanguage(): string | null {
    return this.isBrowser ? localStorage.getItem('language') : null;
  }
}
