import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = false;

  isservicing = false;
  isProduct = false;
  currentLang = 'en';
  selectedCategory: any = null; // Track selected category
  closeSidebar() {
    this.isOpen = false;
  }
  selectCategory(category: any) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
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

  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
  }
}
