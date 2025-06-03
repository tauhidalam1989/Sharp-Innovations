import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private currentPage: string = 'DEFAULT';
  private currentConfig: any = {};

  constructor(
    private meta: Meta,
    private title: Title,
    private translateService: TranslateService
  ) {
    // Subscribe to language changes
    this.translateService.onLangChange.subscribe(() => {
      // Re-apply meta tags when language changes
      this.updateMetaTagsForCurrentPage();
    });
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    page?: string;
  }) {
    this.currentConfig = config;
    this.currentPage = config.page || 'DEFAULT';

    if (config.title) {
      this.title.setTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.meta.updateTag({ rel: 'canonical', href: config.url });
    }

    // Set language meta tags
    this.meta.updateTag({ property: 'og:locale', content: this.translateService.currentLang });
    if (this.translateService.currentLang === 'ar') {
      this.meta.updateTag({ name: 'language', content: 'Arabic' });
      this.meta.updateTag({ httpEquiv: 'Content-Language', content: 'ar' });
    } else {
      this.meta.updateTag({ name: 'language', content: 'English' });
      this.meta.updateTag({ httpEquiv: 'Content-Language', content: 'en' });
    }

    // Default meta tags
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
  }

  private updateMetaTagsForCurrentPage() {
    const translationKeys = [
      `SEO.${this.currentPage}.TITLE`,
      `SEO.${this.currentPage}.DESCRIPTION`,
      `SEO.${this.currentPage}.KEYWORDS`
    ];

    this.translateService.get(translationKeys).subscribe(translations => {
      this.updateMetaTags({
        ...this.currentConfig,
        title: translations[`SEO.${this.currentPage}.TITLE`],
        description: translations[`SEO.${this.currentPage}.DESCRIPTION`],
        keywords: translations[`SEO.${this.currentPage}.KEYWORDS`]
      });
    });
  }

  setDefaultMetaTags() {
    this.translateService.get(['SEO.DEFAULT_TITLE', 'SEO.DEFAULT_DESCRIPTION', 'SEO.DEFAULT_KEYWORDS']).subscribe(translations => {
      this.updateMetaTags({
        title: translations['SEO.DEFAULT_TITLE'],
        description: translations['SEO.DEFAULT_DESCRIPTION'],
        keywords: translations['SEO.DEFAULT_KEYWORDS'],
        image: 'assets/img/logo.png',
        url: 'https://sharpinvotech.com',
        page: 'DEFAULT'
      });
    });
  }
} 