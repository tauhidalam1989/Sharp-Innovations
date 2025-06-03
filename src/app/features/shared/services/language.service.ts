import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Set default language (fallback)
    const defaultLang = this.getStoredLanguage() || 'en';
    this.setLanguage(defaultLang);
  }

  switchLanguage(lang: string): void {
    this.setLanguage(lang); // Set the language and layout direction
    if (this.isBrowser) {
      localStorage.setItem('language', lang); // Save the language preference only in browser
    }
  }

  private setLanguage(lang: string): void {
    this.translate.use(lang); // Change the language
    if (this.isBrowser) {
      document.documentElement.lang = lang; // Update the HTML lang attribute
      const isArabic = lang === 'ar';
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr'; // Update direction
      if (isArabic) {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }

  getLanguage(): string {
    return this.getStoredLanguage() || 'en'; // Retrieve the saved language
  }

  private getStoredLanguage(): string | null {
    return this.isBrowser ? localStorage.getItem('language') : null;
  }
}
