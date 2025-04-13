import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RoutingService } from '../../../services/routing.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent implements OnInit {
  currentLang: string = 'en';
  isServicesHovered = false;

// Add this property to your component class
selectedCategory: any = null;
selectedproduct: any = null;
  imageSrc: "../../../../../../assets/img/d1.png" | any;
  constructor(
    private router: Router,
    public pathService: RoutingService,
    private languageService: LanguageService
  ) {
   
  }

  ngOnInit(): void {
    this.currentLang = this.languageService.getLanguage();
    this.languageService.switchLanguage(this.currentLang);
    this.imageSrc =  this.currentLang === 'en' ? '../../../../../../assets/img/d1.png' : '../../../../../../assets/img/d2.png';
    
    // Listen for navigation events
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.collapseNavbar(); // Collapse the navbar on navigation
    //   }
    // });
  }

  // ngAfterViewInit(): void {
  //   // Initialize Bootstrap Collapse
  //   this.navbarCollapse = new Collapse(this.navbarCollapseRef.nativeElement, {
  //     toggle: false,
  //   });
  // }

  // Switch language
  switchLanguage(lang: string): void {
    this.languageService.switchLanguage(lang);
    this.currentLang = lang;
    this.imageSrc =  this.currentLang === 'en' ? '../../../../../../assets/img/d1.png' : '../../../../../../assets/img/d2.png';
    
     
  }

isIotHovered = false;
isProductsHovered = false;
isservicing=false
isProduct=false
toggleDropdown(menu: string, state: boolean) {  
  console.log(`Toggling ${menu} to ${state}`);
  switch (menu) {
    case 'isservicing':
      this.isservicing = state;
      break;
    case 'isProduct':
      this.isProduct = state;
      break;
    case 'products':
      this.isProductsHovered = state;
      break;
  }
}
closeAllDropdowns(): void {  
  this.isservicing = false;
  this.isProduct = false;
  this.isProductsHovered = false;  
}
@Output() toggleSidebar = new EventEmitter<void>();
}