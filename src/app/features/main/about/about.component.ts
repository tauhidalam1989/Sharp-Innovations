import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  imageSrc: string = 'assets/img/English.png'; // Default path

  constructor(
    public pathService: RoutingService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Function to update image based on language
    const updateImage = () => {
      this.imageSrc = this.translate.currentLang === 'en'
        ? `assets/img/English.png?timestamp=${new Date().getTime()}`
        : `assets/img/Arabic.png?timestamp=${new Date().getTime()}`;
      
      this.cdRef.detectChanges(); // Ensure change detection
    };

    // Listen to language change
    this.translate.onLangChange.subscribe(() => {
      updateImage();
    });

    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        updateImage();
      }
    });

    // Initial image update
    updateImage();

    this.translateService.get(['SEO.ABOUT.TITLE', 'SEO.ABOUT.DESCRIPTION', 'SEO.ABOUT.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.ABOUT.TITLE'],
        description: translations['SEO.ABOUT.DESCRIPTION'],
        keywords: translations['SEO.ABOUT.KEYWORDS'],
        url: 'https://sharpinvotech.com/about',
        page: 'ABOUT',
        schemaType: 'AboutPage'
      });
    });
  }

  @Input() isHome: boolean = false;
}
