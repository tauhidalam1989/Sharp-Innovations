import { Component, Input } from '@angular/core';
import { RoutingService } from '../../../services/routing.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public pathService: RoutingService,
    private languageService: LanguageService
  ){}
  @Input() isOpen = false;
  imageSrc: "../../../../../../assets/img/d1.png" | any;
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
  isservicing = false;
  isProduct = false;
  currentLang = 'en';
  selectedCategory: any = null; // Track selected category
  selectedProductCategory :any =null
  closeSidebar() {
    this.isOpen = false;
  }
  selectCategory(category: any) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }
  selectProductCategory(category:any){
    this.selectedProductCategory = this.selectedProductCategory === category ? null : category;
  }
  toggleDropdown(menu: string) {
    if (menu === 'isservicing') {
      this.isservicing = !this.isservicing;
      this.isProduct = false; // Close other menu
    } else if (menu === 'isProduct') {
      this.isProduct = !this.isProduct;
      this.isservicing = false; // Close other menu
    }
  }

  switchLanguage(lang: string): void {
    this.languageService.switchLanguage(lang);
    this.currentLang = lang;
    console.log(this.currentLang);
    
    this.imageSrc =  this.currentLang === 'en' ? '../../../../../../assets/img/d1.png' : '../../../../../../assets/img/d2.png';
    
     
  }
}
