import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
// import { SSR_LANG } from './src/app/core/tokens/ssr-lang.token'; // Removed due to bundle mismatch

// Helper: parse cookies from request header (no cookie-parser dependency needed)
function parseCookies(cookieHeader: string | undefined): { [key: string]: string } {
  const cookies: { [key: string]: string } = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(pair => {
    const [name, ...rest] = pair.trim().split('=');
    if (name) cookies[name.trim()] = decodeURIComponent(rest.join('=').trim());
  });
  return cookies;
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/sharpinvotech/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // Bilingual SEO meta tag definitions per route
  const SEO_META: { [key: string]: { en: { title: string; description: string; keywords: string }; ar: { title: string; description: string; keywords: string } } } = {
    '/products': {
      en: {
        title: 'Our Products & Solutions | Sharp Innovations',
        description: 'Browse our latest technology products and innovative IT solutions. Sharp Innovations offers cutting-edge software and hardware solutions for businesses in Saudi Arabia.',
        keywords: 'IT products Saudi Arabia, technology solutions, software products, Sharp Innovations products, business solutions KSA'
      },
      ar: {
        title: 'منتجاتنا وحلولنا | شارب للابتكارات',
        description: 'تصفح أحدث منتجات التكنولوجيا وحلول تكنولوجيا المعلومات المبتكرة. تقدم شارب للابتكارات حلولاً برمجية ومعدات متطورة للشركات في المملكة العربية السعودية.',
        keywords: 'منتجات تكنولوجيا المعلومات السعودية, حلول التكنولوجيا, منتجات البرمجيات, منتجات شارب للابتكارات, حلول الأعمال'
      }
    },
    '/service-pages': {
      en: {
        title: 'IT Services & Solutions in Saudi Arabia - Sharp Innovations',
        description: 'Comprehensive IT services including cybersecurity, AI, cloud computing, web and mobile development. Expert technology solutions for businesses in KSA.',
        keywords: 'IT services Saudi Arabia, managed services Riyadh, cybersecurity services, AI solutions, cloud computing KSA'
      },
      ar: {
        title: 'خدمات وحلول تكنولوجيا المعلومات في السعودية - شارب للابتكارات',
        description: 'خدمات تكنولوجيا المعلومات الشاملة بما في ذلك الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية وتطوير الويب والتطبيقات. حلول تقنية متخصصة للشركات في السعودية.',
        keywords: 'خدمات تكنولوجيا المعلومات السعودية, خدمات مُدارة الرياض, خدمات الأمن السيبراني, حلول الذكاء الاصطناعي, الحوسبة السحابية'
      }
    },
    '/services': {
      en: {
        title: 'IT Services & Solutions in Saudi Arabia - Sharp Innovations',
        description: 'Comprehensive IT services including cybersecurity, AI, cloud computing, web and mobile development. Expert technology solutions for businesses in KSA.',
        keywords: 'IT services Saudi Arabia, managed services Riyadh, cybersecurity services, AI solutions, cloud computing KSA'
      },
      ar: {
        title: 'خدمات وحلول تكنولوجيا المعلومات في السعودية - شارب للابتكارات',
        description: 'خدمات تكنولوجيا المعلومات الشاملة بما في ذلك الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية وتطوير الويب والتطبيقات. حلول تقنية متخصصة للشركات في السعودية.',
        keywords: 'خدمات تكنولوجيا المعلومات السعودية, خدمات مُدارة الرياض, خدمات الأمن السيبراني, حلول الذكاء الاصطناعي, الحوسبة السحابية'
      }
    },
    '/blogs': {
      en: {
        title: 'Blog & Insights - Sharp Innovations Technology Articles',
        description: 'Stay updated with the latest insights, news, and articles about technology, cybersecurity, and digital innovation from Sharp Innovations.',
        keywords: 'technology blog, IT insights, cybersecurity news, Sharp Innovations blog, tech articles KSA'
      },
      ar: {
        title: 'المدونة والرؤى - مقالات شارب للابتكارات التقنية',
        description: 'ابق على اطلاع بأحدث الرؤى والأخبار والمقالات حول التكنولوجيا والأمن السيبراني والابتكار الرقمي من شارب للابتكارات.',
        keywords: 'مدونة التكنولوجيا, رؤى تكنولوجيا المعلومات, أخبار الأمن السيبراني, مدونة شارب للابتكارات'
      }
    },
    '/home': {
      en: {
        title: 'Sharp Innovations - Managed IT Solutions in Saudi Arabia',
        description: 'Sharp Innovations is a premier IT solutions provider in KSA offering cybersecurity, AI, cloud computing, web and mobile development services.',
        keywords: 'IT solutions Saudi Arabia, managed IT services, cybersecurity, AI solutions, cloud computing, Sharp Innovations'
      },
      ar: {
        title: 'شارب للابتكارات - حلول تكنولوجيا المعلومات المُدارة في السعودية',
        description: 'شارب للابتكارات هي شركة رائدة في تقديم حلول تكنولوجيا المعلومات في المملكة العربية السعودية تقدم خدمات الأمن السيبراني والذكاء الاصطناعي والحوسبة السحابية وتطوير الويب والتطبيقات.',
        keywords: 'حلول تكنولوجيا المعلومات السعودية, خدمات تكنولوجيا المعلومات المُدارة, الأمن السيبراني, حلول الذكاء الاصطناعي, الحوسبة السحابية, شارب للابتكارات'
      }
    },
    '/about': {
      en: {
        title: 'About Sharp Innovations - Leading IT Company in Saudi Arabia',
        description: 'Learn about Sharp Innovations journey as a premier IT solutions provider in KSA, our mission to deliver innovative IT solutions.',
        keywords: 'IT company Saudi Arabia, technology company Riyadh, Sharp Innovations KSA, IT solutions provider'
      },
      ar: {
        title: 'عن شارب للابتكارات - شركة تكنولوجيا المعلومات الرائدة في السعودية',
        description: 'تعرف على رحلة شارب للابتكارات كمزود رئيسي لحلول تكنولوجيا المعلومات في المملكة العربية السعودية ومهمتنا في تقديم حلول تقنية مبتكرة.',
        keywords: 'شركة تكنولوجيا المعلومات السعودية, شركة التكنولوجيا الرياض, شارب للابتكارات, مزود حلول تكنولوجيا المعلومات'
      }
    },
    '/contact': {
      en: {
        title: 'Contact Sharp Innovations - IT Solutions Provider in Saudi Arabia',
        description: 'Get in touch with Sharp Innovations for expert IT solutions and services in Saudi Arabia.',
        keywords: 'contact IT company Saudi Arabia, IT consultation Riyadh, technology support KSA'
      },
      ar: {
        title: 'تواصل مع شارب للابتكارات - مزود حلول تكنولوجيا المعلومات في السعودية',
        description: 'تواصل مع شارب للابتكارات للحصول على حلول وخدمات تكنولوجيا المعلومات المتخصصة في المملكة العربية السعودية.',
        keywords: 'تواصل مع شركة تكنولوجيا المعلومات السعودية, استشارات تكنولوجيا المعلومات الرياض, الدعم التقني'
      }
    },
    '/team': {
      en: {
        title: 'Our Expert Team - Sharp Innovations Technology Leaders',
        description: 'Meet our team of IT experts, developers, and cybersecurity specialists at Sharp Innovations.',
        keywords: 'IT experts Saudi Arabia, technology team Riyadh, Sharp Innovations professionals'
      },
      ar: {
        title: 'فريقنا المتخصص - قادة التكنولوجيا في شارب للابتكارات',
        description: 'تعرف على فريقنا من خبراء تكنولوجيا المعلومات والمطورين ومتخصصي الأمن السيبراني في شارب للابتكارات.',
        keywords: 'خبراء تكنولوجيا المعلومات السعودية, فريق التكنولوجيا الرياض, متخصصو شارب للابتكارات'
      }
    },
    '/careers': {
      en: {
        title: 'Careers at Sharp Innovations - Join Our IT Team',
        description: 'Join Sharp Innovations and be part of a dynamic team delivering innovative IT solutions.',
        keywords: 'IT jobs Saudi Arabia, technology careers Riyadh, Sharp Innovations employment'
      },
      ar: {
        title: 'وظائف في شارب للابتكارات - انضم إلى فريقنا التقني',
        description: 'انضم إلى شارب للابتكارات وكن جزءاً من فريق ديناميكي يقدم حلول تكنولوجيا المعلومات المبتكرة.',
        keywords: 'وظائف تكنولوجيا المعلومات السعودية, وظائف التكنولوجيا الرياض, التوظيف في شارب للابتكارات'
      }
    },
    '/faq': {
      en: {
        title: 'Frequently Asked Questions - Sharp Innovations IT Solutions',
        description: 'Find answers to common questions about our IT services, web development, and cybersecurity solutions.',
        keywords: 'IT FAQ, technology questions, Sharp Innovations help'
      },
      ar: {
        title: 'الأسئلة الشائعة - حلول تكنولوجيا المعلومات من شارب للابتكارات',
        description: 'اعثر على إجابات للأسئلة الشائعة حول خدمات تكنولوجيا المعلومات وتطوير الويب وحلول الأمن السيبراني.',
        keywords: 'الأسئلة الشائعة حول تكنولوجيا المعلومات, أسئلة التكنولوجيا, مساعدة شارب للابتكارات'
      }
    }
  };

  /**
   * Detect language from: ?lang= query param > lang cookie > default 'en'
   */
  function detectLanguage(req: express.Request): string {
    // 1. Query parameter takes highest priority
    const queryLang = req.query['lang'] as string;
    if (queryLang === 'ar' || queryLang === 'en') {
      return queryLang;
    }

    // 2. Check cookie
    const cookies = parseCookies(req.headers.cookie);
    if (cookies['lang'] === 'ar' || cookies['lang'] === 'en') {
      return cookies['lang'];
    }

    // 3. Check Accept-Language header for Arabic
    const acceptLang = req.headers['accept-language'] || '';
    if (acceptLang.startsWith('ar')) {
      return 'ar';
    }

    // 4. Default to English
    return 'en';
  }

  /**
   * Post-process rendered HTML to ensure meta tags and html attributes are correct.
   * This runs AFTER Angular Universal renders the page.
   */
  function injectMetaTags(html: string, url: string, lang: string): string {
    const isArabic = lang === 'ar';

    // 1. Fix <html> tag lang and dir attributes
    html = html.replace(
      /<html[^>]*>/i,
      `<html lang="${lang}" dir="${isArabic ? 'rtl' : 'ltr'}">`
    );

    // 2. Determine the route path (first segment)
    const pathSegments = url.split('?')[0].split('/').filter(Boolean);
    const routePath = '/' + (pathSegments[0] || 'home');
    const seoEntry = SEO_META[routePath];

    if (seoEntry) {
      const seoData = seoEntry[lang as 'en' | 'ar'] || seoEntry['en'];

      // Check if description meta tag is empty or missing
      const descRegex = /<meta\s+name="description"\s+content="([^"]*)"/i;
      const descMatch = html.match(descRegex);

      if (descMatch && descMatch[1] === '') {
        html = html.replace(descRegex, `<meta name="description" content="${seoData.description}"`);
      } else if (!descMatch) {
        html = html.replace('</head>', `<meta name="description" content="${seoData.description}">\n</head>`);
      }

      // Check keywords
      const kwRegex = /<meta\s+name="keywords"\s+content="([^"]*)"/i;
      const kwMatch = html.match(kwRegex);

      if (kwMatch && kwMatch[1] === '') {
        html = html.replace(kwRegex, `<meta name="keywords" content="${seoData.keywords}"`);
      } else if (!kwMatch) {
        html = html.replace('</head>', `<meta name="keywords" content="${seoData.keywords}">\n</head>`);
      }

      // Check title
      const titleRegex = /<title>([^<]*)<\/title>/i;
      const titleMatch = html.match(titleRegex);

      if (titleMatch && (titleMatch[1] === 'Sharpinvotech' || titleMatch[1] === '')) {
        html = html.replace(titleRegex, `<title>${seoData.title}</title>`);
      }

      // Check og:title
      if (!html.includes('og:title')) {
        html = html.replace('</head>', `<meta property="og:title" content="${seoData.title}">\n</head>`);
      }

      // Check og:description
      if (!html.includes('og:description')) {
        html = html.replace('</head>', `<meta property="og:description" content="${seoData.description}">\n</head>`);
      }
    }

    // 3. Add og:locale meta tags
    const ogLocale = isArabic ? 'ar_SA' : 'en_US';
    const ogLocaleAlt = isArabic ? 'en_US' : 'ar_SA';
    if (!html.includes('og:locale"')) {
      html = html.replace('</head>', `<meta property="og:locale" content="${ogLocale}">\n<meta property="og:locale:alternate" content="${ogLocaleAlt}">\n</head>`);
    }

    // 4. Add hreflang alternate links for both languages
    const cleanUrl = url.split('?')[0]; // remove query params
    const baseUrl = 'https://sharpinvotech.com';
    if (!html.includes('hreflang')) {
      const hreflangTags = [
        `<link rel="alternate" hreflang="en" href="${baseUrl}${cleanUrl}?lang=en">`,
        `<link rel="alternate" hreflang="ar" href="${baseUrl}${cleanUrl}?lang=ar">`,
        `<link rel="alternate" hreflang="x-default" href="${baseUrl}${cleanUrl}">`
      ].join('\n');
      html = html.replace('</head>', `${hreflangTags}\n</head>`);
    }

    return html;
  }

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const lang = detectLanguage(req);
    (req as any).lang = lang;
    console.log(`[SSR] Request: ${req.url} | Detected Language: ${lang}`);

    // Set lang cookie for persistence (1 year)
    res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false, sameSite: 'lax' });

    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: 'SSR_LANG', useValue: lang }
      ]
    }, (err: Error | null, html: string) => {
      if (err) {
        console.error('SSR rendering error:', err);
        res.status(500).send('Server error');
        return;
      }

      const containsArabic = /[\u0600-\u06FF]/.test(html);
      console.log(`[SSR] Rendered HTML length: ${html.length} | Contains Arabic: ${containsArabic}`);

      // Post-process to ensure meta tags and html attributes are correct
      html = injectMetaTags(html, req.originalUrl, lang);
      res.send(html);
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4100;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
