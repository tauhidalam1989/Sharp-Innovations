import { ChangeDetectorRef, Component } from '@angular/core';
import { RoutingService } from '../../../services/routing.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {
  imageSrc: string = 'assets/img/d1.png';
  currentYear: number | any;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
   constructor(
      public pathService: RoutingService,
      private translate: TranslateService,
      private cdRef: ChangeDetectorRef,
      private router: Router

    ) {}
    ngOnInit() {
      this.currentYear=new Date().getFullYear() ;
      // Function to update image based on language
      const updateImage = () => {
        this.imageSrc = this.translate.currentLang === 'en'
          ? `assets/img/d1.png?timestamp=${new Date().getTime()}`
          : `assets/img/d2.png?timestamp=${new Date().getTime()}`;
        
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
    }
  
}
