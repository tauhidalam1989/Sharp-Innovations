import { Component, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('start', style({ transform: 'translateX(0)' })),
      state('end', style({ transform: 'translateX(-50%)' })),
      transition('start => end', animate('20s linear')),
      transition('end => start', animate('20s linear')),
    ]),
  ],
})
export class ClientsPageComponent implements OnDestroy {
  logos: string[] = [
    'assets/clients/logo_01_1.png',
    'assets/clients/logo_03_1.png',
    'assets/clients/logo_04_1_sahat.png',
    'assets/clients/logo_05_1.png',
    'assets/clients/logo_06_1.png',
    'assets/clients/logo_10_1_prince.png',
    'assets/clients/logo_11_1_solution.png',
    'assets/clients/logo_12_1_office.png',
    'assets/clients/logo_initial.png',
    'assets/clients/logo_kingfaisal.png',
    'assets/clients/logo_nat_housing.png',
    'assets/clients/logo_national_guard.png',
  ];

  animationState = 'start';
  private intervalId: any;

  constructor() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.animationState = this.animationState === 'start' ? 'end' : 'start';
    }, 20000);
  }

  slide(direction: 'prev' | 'next') {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.animationState = direction === 'next' ? 'end' : 'start';
    this.startAutoSlide();
  }
}