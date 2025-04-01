import { Component, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],

})
export class ClientsPageComponent implements OnDestroy {
  animationStateClients = 'start';  // For clients (moves left)
  animationStatePartners = 'start'; // For partners (moves right)
  private intervalIdClients: any;
  private intervalIdPartners: any;

  constructor() {
    this.startAutoSlideClients();
    this.startAutoSlidePartners();
  }
  clientLogos: string[] = [
    'assets/clients/2.jpg',
    'assets/clients/3.png',
    'assets/clients/4.jpg',
    'assets/clients/5.png',
    'assets/clients/6.jpg',
    'assets/clients/7.png',
    'assets/clients/8.png',
    'assets/clients/9.png',
    'assets/clients/10.png',
    'assets/clients/11.png',
    'assets/clients/12.jpeg',
    'assets/clients/13.png',
  ];
  partnerLogos: string[] = [
    'assets/partner/Cisco.png',
    'assets/partner/Dell.png',
    'assets/partner/HP.svg',
    'assets/partner/odoo_logo.png',
    'assets/partner/T.png',
    'assets/partner/O.png',
    'assets/partner/Cisco.png',
    'assets/partner/Dell.png',
    'assets/partner/HP.svg',
    'assets/partner/odoo_logo.png',
    'assets/partner/T.png',
    'assets/partner/O.png',
    

  ];
  

  ngOnDestroy() {
    if (this.intervalIdClients) {
      clearInterval(this.intervalIdClients);
    }
    if (this.intervalIdPartners) {
      clearInterval(this.intervalIdPartners);
    }
  }

  private startAutoSlideClients() {
    this.intervalIdClients = setInterval(() => {
      this.animationStateClients = this.animationStateClients === 'start' ? 'end' : 'start';
    }, 20000);
  }

  private startAutoSlidePartners() {
    this.intervalIdPartners = setInterval(() => {
      this.animationStatePartners = this.animationStatePartners === 'start' ? 'end' : 'start';
    }, 20000);
  }
}
