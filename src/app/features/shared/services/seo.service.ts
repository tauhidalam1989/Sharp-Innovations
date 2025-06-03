import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private currentPage: string = 'DEFAULT';
  private currentConfig: any = {};
  private readonly baseUrl: string = 'https://sharpinvotech.com';
  private readonly defaultImage: string = 'assets/img/logo.png';
  private isBrowser: boolean;

  constructor(
    private meta: Meta,
    private title: Title,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Subscribe to language changes
    this.translateService.onLangChange.subscribe(() => {
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
    schemaType?: string;
  }) {
    this.currentConfig = config;
    this.currentPage = config.page || 'DEFAULT';

    // Ensure image is an absolute URL
    const imageUrl = config.image 
      ? this.getAbsoluteUrl(config.image)
      : this.getAbsoluteUrl(this.defaultImage);

    // Basic Meta Tags
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

    // Enhanced Image Meta Tags
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    
    // Add image dimensions if available (recommended for Open Graph)
    if (this.isBrowser) {
      const img = new Image();
      img.onload = () => {
        this.meta.updateTag({ property: 'og:image:width', content: img.width.toString() });
        this.meta.updateTag({ property: 'og:image:height', content: img.height.toString() });
      };
      img.src = imageUrl;
    }

    // URL Meta Tags
    const pageUrl = config.url || `${this.baseUrl}${config.page?.toLowerCase()}`;
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ rel: 'canonical', href: pageUrl });

    // Language and Direction Meta Tags
    this.meta.updateTag({ property: 'og:locale', content: this.translateService.currentLang });
    const isArabic = this.translateService.currentLang === 'ar';
    this.meta.updateTag({ name: 'language', content: isArabic ? 'Arabic' : 'English' });
    this.meta.updateTag({ httpEquiv: 'Content-Language', content: isArabic ? 'ar' : 'en' });
    this.meta.updateTag({ name: 'dir', content: isArabic ? 'rtl' : 'ltr' });

    // Social Media Meta Tags
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@SharpInnvo1351' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Sharp Innovations' });

    // Add Schema.org markup
    this.addSchemaMarkup(config.page || 'DEFAULT', config.schemaType);

    // Add region-specific meta tags
    this.translateService.get('SEO.REGION').subscribe(region => {
      this.meta.updateTag({ name: 'geo.region', content: region.COUNTRY });
      this.meta.updateTag({ name: 'geo.placename', content: region.CITY });
    });

    // Additional Meta Tags for SEO
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ name: 'author', content: 'Sharp Innovations' });
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

  private getAbsoluteUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.baseUrl}/${path.replace(/^\//, '')}`;
  }

  private addSchemaMarkup(page: string, schemaType?: string) {
    if (!this.isBrowser) return; // Skip during SSR

    this.translateService.get(['SEO.ORGANIZATION_SCHEMA', `SEO.${page}`]).subscribe(translations => {
      const org = translations['SEO.ORGANIZATION_SCHEMA'];
      const schema: any = {
        '@context': 'https://schema.org',
        '@type': schemaType || 'Organization',
        name: org.NAME,
        description: org.DESCRIPTION,
        url: 'https://sharpinvotech.com',
        logo: 'https://sharpinvotech.com/assets/img/logo.png',
        foundingDate: org.FOUNDING_DATE,
        founder: org.FOUNDER,
        address: {
          '@type': 'PostalAddress',
          streetAddress: org.ADDRESS,
          addressLocality: 'Riyadh',
          addressRegion: 'Riyadh Province',
          addressCountry: 'SA'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: org.TELEPHONE,
          contactType: 'customer service'
        }
      };

      // Remove any existing schema tags
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Add new schema tag
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }

  private updateMetaTagsForCurrentPage() {
    const translationKeys = [
      `SEO.${this.currentPage}.TITLE`,
      `SEO.${this.currentPage}.DESCRIPTION`,
      `SEO.${this.currentPage}.KEYWORDS`,
      `SEO.${this.currentPage}.SCHEMA_TYPE`
    ];

    this.translateService.get(translationKeys).subscribe(translations => {
      this.updateMetaTags({
        ...this.currentConfig,
        title: translations[`SEO.${this.currentPage}.TITLE`],
        description: translations[`SEO.${this.currentPage}.DESCRIPTION`],
        keywords: translations[`SEO.${this.currentPage}.KEYWORDS`],
        schemaType: translations[`SEO.${this.currentPage}.SCHEMA_TYPE`]
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