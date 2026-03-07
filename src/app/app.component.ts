import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { LanguageService } from './features/shared/services/language.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from './features/shared/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sharpinvotech';
  private isBrowser: boolean;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private titleService: Title,
    private translateService: TranslateService,
    private renderer: Renderer2,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoading = false; // Simulating a delay
      }, 3000);
    } else {
      this.isLoading = false;
    }
  }
  isLoading = true;

  ngOnInit(): void {
    // Check the current route and navigate to home if no route is provided
    const currentUrl = this.router.url;

    // Listen to route changes for SEO updates
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlSegments = this.router.url.split('/');
        const firstSegment = urlSegments[1]; // Get the first segment of the URL

        // Only update if it's a known global route and NOT a detail page
        // Detail pages will call SeoService themselves
        const globalRoutes = ['home', 'about', 'contact', 'services', 'service-pages', 'products', 'blogs', 'faq', 'team', 'testimonial', 'feature', 'careers'];

        // Map route segments to page keys (handle hyphenated routes)
        const routeToPageKey: { [key: string]: string } = {
          'service-pages': 'SERVICES',
          'services': 'SERVICES'
        };

        if (globalRoutes.includes(firstSegment.toLowerCase()) && urlSegments.length <= 2) {
          const pageKey = routeToPageKey[firstSegment.toLowerCase()] || firstSegment.toUpperCase();
          this.seoService.updateMetaTags({ page: pageKey });
        } else if (!firstSegment) {
          this.seoService.updateMetaTags({ page: 'HOME' });
        } else if (firstSegment.toLowerCase() === 'dashboard') {
          this.titleService.setTitle('Admin Dashboard - Sharp Innovations');
        } else if (firstSegment.toLowerCase() === 'login') {
          this.titleService.setTitle('Admin Login - Sharp Innovations');
        }
      });

    if (this.isBrowser) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.scrollToTop();
        }
      });
    }
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private setPageTitle(route: string): void {
    const titles: { [key: string]: string } = {
      home: 'PAGE_TITLES.HOME',
      about: 'PAGE_TITLES.ABOUT',
      contact: 'PAGE_TITLES.CONTACT',
      service: 'PAGE_TITLES.SERVICES',
      project: 'PAGE_TITLES.PROJECTS',
      faq: 'PAGE_TITLES.FAQ',
      feature: 'PAGE_TITLES.FEATURES',
      team: 'PAGE_TITLES.TEAM',
      testimonial: 'PAGE_TITLES.TESTIMONIAL',
      careers: "PAGE_TITLES.CAREERS",
      services: 'PAGE_TITLES.SERVICES',
    };

    const titleKey = titles[route] || 'PAGE_TITLES.DEFAULT';
    this.translateService.get(titleKey).subscribe((translatedTitle) => {
      this.titleService.setTitle(translatedTitle);
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const elements = document.querySelectorAll('.wow');
      elements.forEach((el) => {
        this.renderer.removeClass(el, 'wow');
        this.renderer.removeClass(el, 'animated');
        this.renderer.setStyle(el, 'visibility', 'visible');
      });
    }
  }
}
