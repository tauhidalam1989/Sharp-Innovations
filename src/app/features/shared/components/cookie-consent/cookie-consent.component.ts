import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  showConsent = true;
  visitorCount = 0;
  private isBrowser: boolean;
  private updateInterval: any;

  constructor(
    private translate: TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      const cookieConsent = localStorage.getItem('cookieConsent');
      this.showConsent = cookieConsent !== 'accepted';
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initializeVisitorCount();
    }
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private initializeVisitorCount() {
    if (!this.isBrowser) return;

    const count = parseInt(localStorage.getItem('visitorCount') || '0', 10);
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toDateString();
    
    if (lastVisit !== now) {
      const newCount = count + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisit', now);
      this.visitorCount = newCount;
    } else {
      this.visitorCount = count;
    }

    this.simulateVisitorUpdates();
  }

  private simulateVisitorUpdates() {
    if (!this.isBrowser) return;

    // Randomly increment visitor count every 30-120 seconds
    this.updateInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to increment
        this.visitorCount++;
        localStorage.setItem('visitorCount', this.visitorCount.toString());
      }
    }, Math.random() * 90000 + 30000); // Random interval between 30-120 seconds
  }

  acceptCookies() {
    if (this.isBrowser) {
      localStorage.setItem('cookieConsent', 'accepted');
    }
    this.showConsent = false;
  }

  viewPolicy() {
    this.acceptCookies();
    this.router.navigate(['/privacy']);
  }
} 