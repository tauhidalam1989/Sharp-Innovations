import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  showConsent = true;
  visitorCount = 0;

  constructor(private translate: TranslateService) {
    // Initialize showConsent in constructor
    const cookieConsent = localStorage.getItem('cookieConsent');
    this.showConsent = cookieConsent !== 'accepted';
  }

  ngOnInit() {
    // Initialize visitor count
    this.initializeVisitorCount();
  }

  private initializeVisitorCount() {
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

    // Simulate real-time updates (optional)
    this.simulateVisitorUpdates();
  }

  private simulateVisitorUpdates() {
    // Randomly increment visitor count every 30-120 seconds
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to increment
        this.visitorCount++;
        localStorage.setItem('visitorCount', this.visitorCount.toString());
      }
    }, Math.random() * 90000 + 30000); // Random interval between 30-120 seconds
  }

  acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showConsent = false;
  }

  viewPolicy() {
    // Navigate to cookie policy page or open in new tab
    window.open('/privacy', '_blank');
  }
} 