import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { LanguageService } from './features/shared/services/language.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

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
    // if (!currentUrl || currentUrl === '/') {
    //   this.router.navigate(['/home']);
    // }

    // Set dynamic titles based on the route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url.split('/')[1]; // Get the first segment of the URL
        this.setPageTitle(currentRoute);
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
