import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-core-service',
  templateUrl: './core-service.component.html',
  styleUrls: ['./core-service.component.scss']
})
export class CoreServiceComponent {
  selectedService: any = null;
  services: any[] = [];
  private isBrowser: boolean;

  @ViewChild('detailSection') detailSection!: ElementRef;

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SeoService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Set SEO meta tags for the services page
    this.translateService.get(['SEO.SERVICES.TITLE', 'SEO.SERVICES.DESCRIPTION', 'SEO.SERVICES.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.SERVICES.TITLE'],
        description: translations['SEO.SERVICES.DESCRIPTION'],
        keywords: translations['SEO.SERVICES.KEYWORDS'],
        url: 'https://sharpinvotech.com/services',
        page: 'SERVICES'
      });
    });

    // Load services from translation
    this.translateService.get('core_services').subscribe((services: any[]) => {
      this.services = services;
      if (this.services && this.services.length > 0) {
        this.selectedService = this.services[0];
      }
    });
  }

  selectService(service: any) {
    this.selectedService = service;
  
    if (this.isBrowser && window.innerWidth <= 768) {
      setTimeout(() => {
        this.detailSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}
