import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  pageTitle: string = '';
  breadcrumbs: { label: string; url: string }[] = [];
  showHero: boolean = false;
  heroImageSrc: string = ''; // Property for hero image source

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Listen to navigation events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageDetails();
      });

    // Initial setup
    this.updatePageDetails();
  }

  private updatePageDetails(): void {
    const currentRoute = this.router.url;
    this.showHero = !currentRoute.includes('home');
    this.updatePageTitleAndBreadcrumbs();
  }

  private updatePageTitleAndBreadcrumbs(): void {
    const urlSegments = this.router.url.split('/').filter((segment) => segment);

    // Set page title
    const lastSegment = urlSegments[urlSegments.length - 1];
    this.pageTitle = this.getCustomLabel(lastSegment) || this.capitalize(lastSegment);
    const cleanPageTitle = this.pageTitle.replace('PAGE_TITLE.', '').toLowerCase();

    // Update hero image source based on the cleaned page title
    this.heroImageSrc = `../../../../assets/img/${cleanPageTitle}.png`;
    let accumulatedUrl = '';
    this.breadcrumbs = urlSegments.map((segment) => {
      accumulatedUrl += `/${segment}`;
      return {
        label: this.getCustomLabel(segment) || this.capitalize(segment),
        url: accumulatedUrl,
      };
    });
  }

  private getCustomLabel(routeSegment: string): string | null {
    const customLabels: { [key: string]: string } = {
      project: 'PAGE_TITLE.PROJECTS',
      about: 'PAGE_TITLE.ABOUT',
      service: 'PAGE_TITLE.SERVICES',
      contact: 'PAGE_TITLE.CONTACT',
      feature: 'PAGE_TITLE.FEATURES',
      team: 'PAGE_TITLE.OUR_TEAM',
      faq: 'PAGE_TITLE.FAQS',
      testimonial: 'PAGE_TITLE.TESTIMONIALS',
      services: 'PAGE_TITLE.services',
      'mobile-app-development': 'PAGE_TITLE.MobileDevelopment',
      'web-app-development': 'PAGE_TITLE.webDevelopment',
      'cloud-development': 'PAGE_TITLE.cloudDevelopment',
      'chatbot-development': 'PAGE_TITLE.chatbotDevelopment',
      'digital-marketing-services': 'PAGE_TITLE.digitalMarketingServices',
      'ui-development': 'PAGE_TITLE.uiDevelopment',
    };
    return customLabels[routeSegment] || null;
  }

  private capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  replaceHyphen(label: string): string {
    return label ? label.replace(/-/g, ' ') : label;
  }
  
}