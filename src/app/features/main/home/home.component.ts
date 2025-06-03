import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../../shared/services/routing.service';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  activeSlideIndex = 0;
  changeSlide(index: number): void {
    this.activeSlideIndex = index;
  }
  isLoading = true;
  private loadStartTime: number = 0;
  private isBrowser: boolean;

  constructor(
    public pathService: RoutingService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService,
    private translateService: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Set SEO meta tags for the home page
    this.translateService.get(['SEO.HOME.TITLE', 'SEO.HOME.DESCRIPTION', 'SEO.HOME.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.HOME.TITLE'],
        description: translations['SEO.HOME.DESCRIPTION'],
        keywords: translations['SEO.HOME.KEYWORDS'],
        url: 'https://sharpinvotech.com',
        page: 'HOME'
      });
    });

    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoading = false;
        const loadEndTime = performance.now();
        const loadDuration = loadEndTime - this.loadStartTime;
        console.log('Page finished loading at:', loadEndTime);
        console.log(`Page load duration: ${loadDuration.toFixed(2)} ms`);
      }, 100);
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    } else {
      this.isLoading = false;
    }
  }

  isHome: boolean = true;

  slides = [
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE0',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE0',
      image: '../../../../assets/img/Slider/slider.png',
      path: "/services/cybersecurity-consulting"
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE1',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE1',
      image: '../../../../assets/img/Slider/2.png',
      path: "/services/it-server-admin"
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE2',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE2',
      image: '../../../../assets/img/Slider/3.png',
      path: "/services/NOC"
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE3',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE3',
      image: '../../../../assets/img/Slider/ERP_Solutions_Services.png',
      path: "/services/web-app-development"
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE4',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE4',
      image: '../../../../assets/img/Slider/Managed_IT.png',
      path: "/services/mobile-app-development"
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE5',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE5',
      image: '../../../../assets/img/Slider/Mobile_App_Development.png'
    }
  ];

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const carousel = document.getElementById('heroCarousel');
      if (carousel) {
        carousel.addEventListener('slide.bs.carousel', (event: any) => {
          this.activeSlideIndex = event.to;
        });
      }
    }
  }
}
