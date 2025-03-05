import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    // Set default language (fallback)
    const defaultLang = localStorage.getItem('language') || 'en';
    this.setLanguage(defaultLang);
  }

  switchLanguage(lang: string): void {
    this.setLanguage(lang); // Set the language and layout direction
    localStorage.setItem('language', lang); // Save the language preference
  }

  private setLanguage(lang: string): void {
    this.translate.use(lang); // Change the language
    document.documentElement.lang = lang; // Update the HTML lang attribute
    const isArabic = lang === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'; // Update direction
    if (isArabic) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  getLanguage(): string {
    return localStorage.getItem('language') || 'en'; // Retrieve the saved language
  }
}
