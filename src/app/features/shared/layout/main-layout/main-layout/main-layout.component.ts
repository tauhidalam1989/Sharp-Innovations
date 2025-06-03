import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = false;
  isMobile = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Check window size on init
      this.checkWindowSize();
      // Listen for window resize
      window.addEventListener('resize', () => this.checkWindowSize());
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private checkWindowSize() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 768;
    }
  }
}
