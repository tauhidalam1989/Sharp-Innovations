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
    'assets/clients/logo_01_1.png',
    'assets/clients/logo_03_1.png',
    'assets/clients/logo_04_1_sahat.png',
    'assets/clients/logo_05_1.png',
    'assets/clients/logo_06_1.png',
    'assets/clients/logo_10_1_prince.png',
  ];
  partnerLogos: string[] = [
    'assets/partner/Cisco.png',
    'assets/partner/Dell.png',
    'assets/partner/HP.svg',
    'assets/partner/odoo_logo.png',
    'assets/partner/T.png',
    

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
