import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PLATFORM_ID, Inject, Optional } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
// import { REQUEST } from '@nguniversal/express-engine/tokens'; // Removed in favor of explicit 'SSR_LANG' string injection

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private currentPage: string = 'DEFAULT';
  private currentConfig: any = {};
  private readonly baseUrl: string = 'https://sharpinvotech.com';
  private readonly defaultImage: string = 'assets/img/logo.png';
  private isBrowser: boolean;
  private isServer: boolean;
  private doc: Document;
  private currentLang: string = 'en';

  private readonly defaultMetaValues: { [lang: string]: { [key: string]: { title: string; description: string; keywords: string } } } = {
    en: {
      'SERVICES': {
        title: 'IT Services & Solutions in Saudi Arabia - Sharp Innovations',
        description: 'Comprehensive IT services including cybersecurity, AI, cloud computing, web and mobile development. Expert technology solutions for businesses in KSA.',
        keywords: 'IT services Saudi Arabia, managed services Riyadh, cybersecurity services, AI solutions, cloud computing KSA'
      },
      'PRODUCTS': {
        title: 'Our Products & Solutions | Sharp Innovations',
        description: 'Browse our latest technology products and innovative IT solutions. Sharp Innovations offers cutting-edge software and hardware solutions for businesses in Saudi Arabia.',
        keywords: 'IT products Saudi Arabia, technology solutions, software products, Sharp Innovations products, business solutions KSA'
      },
      'BLOGS': {
        title: 'Blog & Insights | Sharp Innovations',
        description: 'Stay updated with the latest insights, news, and articles about technology, cybersecurity, and digital innovation from Sharp Innovations.',
        keywords: 'technology blog, IT insights, cybersecurity news, Sharp Innovations blog'
      },
      'ABOUT': {
        title: 'About Sharp Innovations - Leading IT Company in Saudi Arabia',
        description: 'Learn about Sharp Innovations journey as a premier IT solutions provider in KSA.',
        keywords: 'IT company Saudi Arabia, technology company Riyadh, Sharp Innovations KSA'
      },
      'CONTACT': {
        title: 'Contact Sharp Innovations - IT Solutions Provider in Saudi Arabia',
        description: 'Get in touch with Sharp Innovations for expert IT solutions and services in Saudi Arabia.',
        keywords: 'contact IT company Saudi Arabia, IT consultation Riyadh, technology support KSA'
      },
      'FAQ': {
        title: 'Frequently Asked Questions - Sharp Innovations IT Solutions',
        description: 'Find answers to common questions about our IT services, web development, and cybersecurity solutions.',
        keywords: 'IT FAQ, technology questions, Sharp Innovations help'
      },
      'TEAM': {
        title: 'Our Expert Team - Sharp Innovations Technology Leaders',
        description: 'Meet our team of IT experts, developers, and cybersecurity specialists at Sharp Innovations.',
        keywords: 'IT experts Saudi Arabia, technology team Riyadh, Sharp Innovations professionals'
      },
      'CAREERS': {
        title: 'Careers at Sharp Innovations - Join Our IT Team',
        description: 'Join Sharp Innovations and be part of a dynamic team delivering innovative IT solutions.',
        keywords: 'IT jobs Saudi Arabia, technology careers Riyadh, Sharp Innovations employment'
      },
      'HOME': {
        title: 'Sharp Innovations - Managed IT Solutions in Saudi Arabia',
        description: 'Sharp Innovations is a premier IT solutions provider in KSA offering cybersecurity, AI, cloud computing, web and mobile development services.',
        keywords: 'IT solutions Saudi Arabia, managed IT services, cybersecurity, AI solutions, cloud computing, Sharp Innovations'
      },
      'DEFAULT': {
        title: 'Sharp Innovations - Managed IT Solutions',
        description: 'Sharp Innovations provides innovative IT solutions and services.',
        keywords: 'IT solutions, managed IT services, Sharp Innovations'
      }
    },
    ar: {
      'SERVICES': {
        title: 'خدمات وحلول تكنولوجيا المعلومات في السعودية - شارب للابتكارات',
        description: 'خدمات تكنولوجيا المعلومات الشاملة بما في ذلك الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية وتطوير الويب والتطبيقات. حلول تقنية متخصصة للشركات في السعودية.',
        keywords: 'خدمات تكنولوجيا المعلومات السعودية, خدمات مُدارة الرياض, خدمات الأمن السيبراني, حلول الذكاء الاصطناعي, الحوسبة السحابية'
      },
      'PRODUCTS': {
        title: 'منتجاتنا وحلولنا | شارب للابتكارات',
        description: 'تصفح أحدث منتجات التكنولوجيا وحلول تكنولوجيا المعلومات المبتكرة. تقدم شارب للابتكارات حلولاً برمجية ومعدات متطورة للشركات في المملكة العربية السعودية.',
        keywords: 'منتجات تكنولوجيا المعلومات السعودية, حلول التكنولوجيا, منتجات البرمجيات, منتجات شارب للابتكارات, حلول الأعمال'
      },
      'BLOGS': {
        title: 'المدونة والرؤى | شارب للابتكارات',
        description: 'ابق على اطلاع بأحدث الرؤى والأخبار والمقالات حول التكنولوجيا والأمن السيبراني والابتكار الرقمي من شارب للابتكارات.',
        keywords: 'مدونة التكنولوجيا, رؤى تكنولوجيا المعلومات, أخبار الأمن السيبراني, مدونة شارب للابتكارات'
      },
      'ABOUT': {
        title: 'عن شارب للابتكارات - شركة تكنولوجيا المعلومات الرائدة في السعودية',
        description: 'تعرف على رحلة شارب للابتكارات كمزود رئيسي لحلول تكنولوجيا المعلومات في المملكة العربية السعودية.',
        keywords: 'شركة تكنولوجيا المعلومات السعودية, شركة التكنولوجيا الرياض, شارب للابتكارات'
      },
      'CONTACT': {
        title: 'تواصل مع شارب للابتكارات - مزود حلول تكنولوجيا المعلومات في السعودية',
        description: 'تواصل مع شارب للابتكارات للحصول على حلول وخدمات تكنولوجيا المعلومات المتخصصة في المملكة العربية السعودية.',
        keywords: 'تواصل مع شركة تكنولوجيا المعلومات السعودية, استشارات تكنولوجيا المعلومات الرياض, الدعم التقني'
      },
      'FAQ': {
        title: 'الأسئلة الشائعة - حلول تكنولوجيا المعلومات من شارب للابتكارات',
        description: 'اعثر على إجابات للأسئلة الشائعة حول خدمات تكنولوجيا المعلومات وتطوير الويب وحلول الأمن السيبراني.',
        keywords: 'الأسئلة الشائعة حول تكنولوجيا المعلومات, أسئلة التكنولوجيا, مساعدة شارب للابتكارات'
      },
      'TEAM': {
        title: 'فريقنا المتخصص - قادة التكنولوجيا في شارب للابتكارات',
        description: 'تعرف على فريقنا من خبراء تكنولوجيا المعلومات والمطورين ومتخصصي الأمن السيبراني في شارب للابتكارات.',
        keywords: 'خبراء تكنولوجيا المعلومات السعودية, فريق التكنولوجيا الرياض, متخصصو شارب للابتكارات'
      },
      'CAREERS': {
        title: 'وظائف في شارب للابتكارات - انضم إلى فريقنا التقني',
        description: 'انضم إلى شارب للابتكارات وكن جزءاً من فريق ديناميكي يقدم حلول تكنولوجيا المعلومات المبتكرة.',
        keywords: 'وظائف تكنولوجيا المعلومات السعودية, وظائف التكنولوجيا الرياض, التوظيف في شارب للابتكارات'
      },
      'HOME': {
        title: 'شارب للابتكارات - حلول تكنولوجيا المعلومات المُدارة في السعودية',
        description: 'شارب للابتكارات هي شركة رائدة في تقديم حلول تكنولوجيا المعلومات في المملكة العربية السعودية تقدم خدمات الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية وتطوير الويب والتطبيقات.',
        keywords: 'حلول تكنولوجيا المعلومات السعودية, خدمات تكنولوجيا المعلومات المُدارة, الأمن السيبراني, حلول الذكاء الاصطناعي, الحوسبة السحابية, شارب للابتكارات'
      },
      'DEFAULT': {
        title: 'شارب للابتكارات - حلول تكنولوجيا المعلومات المُدارة',
        description: 'تقدم شارب للابتكارات حلول وخدمات تكنولوجيا المعلومات المبتكرة.',
        keywords: 'حلول تكنولوجيا المعلومات, خدمات تكنولوجيا المعلومات المُدارة, شارب للابتكارات'
      }
    }
  };

  constructor(
    private meta: Meta,
    private title: Title,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) document: Document,
    @Optional() @Inject('SSR_LANG') private ssrLang: string | null
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
    this.doc = document;

    // Determine current language
    if (this.isServer) {
      this.currentLang = this.ssrLang || 'en';
    } else if (this.isBrowser) {
      this.currentLang = this.translateService.currentLang || 'en';
    }

    if (this.isBrowser) {
      this.translateService.onLangChange.subscribe((event) => {
        this.currentLang = event.lang;
        this.updateMetaTagsForCurrentPage();
      });
    }
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

    const langDefaults = this.defaultMetaValues[this.currentLang] || this.defaultMetaValues['en'];
    const defaults = langDefaults[this.currentPage] || langDefaults['DEFAULT'];
    const finalTitle = config.title || defaults.title;
    const finalDescription = config.description || defaults.description;
    const finalKeywords = config.keywords || defaults.keywords;

    const imageUrl = config.image
      ? this.getAbsoluteUrl(config.image)
      : this.getAbsoluteUrl(this.defaultImage);

    if (this.isServer) {
      this.setServerMeta(finalTitle, finalDescription, finalKeywords, imageUrl, config.url);
    } else {
      this.setBrowserMeta(finalTitle, finalDescription, finalKeywords, imageUrl, config.url);
    }
  }

  private setServerMeta(title: string, description: string, keywords: string, imageUrl: string, url?: string) {
    // Set title directly on DOM
    const titleEl = this.doc.querySelector('title');
    if (titleEl) {
      titleEl.textContent = title;
    }

    // Set/create meta tags via direct DOM manipulation
    this.setOrCreateMetaTag('name', 'description', description);
    this.setOrCreateMetaTag('name', 'keywords', keywords);
    this.setOrCreateMetaTag('property', 'og:title', title);
    this.setOrCreateMetaTag('property', 'og:description', description);
    this.setOrCreateMetaTag('property', 'og:image', imageUrl);
    this.setOrCreateMetaTag('property', 'og:image:secure_url', imageUrl);
    this.setOrCreateMetaTag('name', 'twitter:title', title);
    this.setOrCreateMetaTag('name', 'twitter:description', description);
    this.setOrCreateMetaTag('name', 'twitter:image', imageUrl);
    this.setOrCreateMetaTag('property', 'og:type', 'website');
    this.setOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setOrCreateMetaTag('name', 'robots', 'index,follow');
    this.setOrCreateMetaTag('name', 'author', 'Sharp Innovations');

    // Set og:locale based on current language
    const ogLocale = this.currentLang === 'ar' ? 'ar_SA' : 'en_US';
    const ogLocaleAlt = this.currentLang === 'ar' ? 'en_US' : 'ar_SA';
    this.setOrCreateMetaTag('property', 'og:locale', ogLocale);
    this.setOrCreateMetaTag('property', 'og:locale:alternate', ogLocaleAlt);

    if (url) {
      this.setOrCreateMetaTag('property', 'og:url', url);
    }

    console.log('[SSR-SEO] Set meta for:', this.currentPage, '| lang:', this.currentLang, '| title:', title);
  }

  private setOrCreateMetaTag(attr: 'name' | 'property', key: string, content: string) {
    let tag = this.doc.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = this.doc.createElement('meta') as HTMLMetaElement;
      tag.setAttribute(attr, key);
      tag.setAttribute('content', content);
      this.doc.head.appendChild(tag);
    }
  }

  private setBrowserMeta(title: string, description: string, keywords: string, imageUrl: string, url?: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    if (url) {
      this.meta.updateTag({ property: 'og:url', content: url });
    }

    // Schema markup in browser only
    this.addSchemaMarkup(this.currentPage);
  }

  private getAbsoluteUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.baseUrl}/${path.replace(/^\//, '')}`;
  }

  private addSchemaMarkup(page: string) {
    if (this.isServer) return;

    this.translateService.get(['SEO.ORGANIZATION_SCHEMA', `SEO.${page}`]).subscribe(translations => {
      const org = translations['SEO.ORGANIZATION_SCHEMA'];
      if (!org) return;

      const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: org.NAME || 'Sharp Innovations',
        description: org.DESCRIPTION || 'IT Solutions Provider',
        url: 'https://sharpinvotech.com',
        logo: 'https://sharpinvotech.com/assets/img/logo.png'
      };

      const existingSchema = this.doc.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      this.doc.head.appendChild(script);
    });
  }

  private updateMetaTagsForCurrentPage() {
    // Use hardcoded defaults directly instead of translation keys
    // This avoids showing raw translation keys like "SEO.DEFAULT.TITLE" in the browser tab
    const langDefaults = this.defaultMetaValues[this.currentLang] || this.defaultMetaValues['en'];
    const defaults = langDefaults[this.currentPage] || langDefaults['DEFAULT'];

    this.updateMetaTags({
      ...this.currentConfig,
      title: defaults.title,
      description: defaults.description,
      keywords: defaults.keywords,
    });
  }

  setDefaultMetaTags() {
    const langDefaults = this.defaultMetaValues[this.currentLang] || this.defaultMetaValues['en'];
    const defaults = langDefaults['DEFAULT'];

    this.updateMetaTags({
      title: defaults.title,
      description: defaults.description,
      keywords: defaults.keywords,
      image: 'assets/img/logo.png',
      url: 'https://sharpinvotech.com',
      page: 'DEFAULT'
    });
  }

  setServerSideMetaTags(page: string): void {
    const langDefaults = this.defaultMetaValues[this.currentLang] || this.defaultMetaValues['en'];
    const defaults = langDefaults[page] || langDefaults['DEFAULT'];
    this.updateMetaTags({
      title: defaults.title,
      description: defaults.description,
      keywords: defaults.keywords,
      page: page,
      url: `${this.baseUrl}/${page.toLowerCase()}`
    });
  }
}