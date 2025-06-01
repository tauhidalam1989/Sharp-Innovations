import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = false;
  isMobile = window.innerWidth <= 768;

  constructor() {}

  ngOnInit() {
    // Check window size on init
    this.checkWindowSize();
    // Listen for window resize
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private checkWindowSize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
