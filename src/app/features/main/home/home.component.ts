import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  activeSlideIndex = 0;
  changeSlide(index: number): void {
    this.activeSlideIndex = index;
  }
  isHome: boolean = true;
  constructor(public pathService:RoutingService) {}
  slides = [

    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE0',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE0',
      image: '../../../../assets/img/Banner.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE1',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE1',
      image: '../../../../assets/img/Banner.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE2',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE2',
      image: '../../../../assets/img/Banner2.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE3',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE3',
      image: '../../../../assets/img/Banner3.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE4',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE4',
      image: '../../../../assets/img/Banner.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE5',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE5',
      image: '../../../../assets/img/Banner.png'
    }
  ]


  ngAfterViewInit(): void {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
      carousel.addEventListener('slide.bs.carousel', (event: any) => {
        this.activeSlideIndex = event.to; // Sync activeIndex with carousel
      });
    }
  }
}
