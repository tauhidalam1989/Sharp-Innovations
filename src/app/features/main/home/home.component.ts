import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isHome: boolean = true;
  constructor(public pathService:RoutingService) {}
  slides = [
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE1',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE1',
      image: '../../../../assets/img/hero-img.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE2',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE2',
      image: '../../../../assets/img/hero-img.png'
    },
    {
      tagline: 'HOMEs.HERO_TAGLINE',
      title: 'HOMEs.HERO_TITLE_SLIDE3',
      description: 'HOMEs.HERO_DESCRIPTION_SLIDE3',
      image: '../../../../assets/img/hero-img.png'
    }
  ]
  
}
