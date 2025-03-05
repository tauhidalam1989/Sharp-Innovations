import { Component, Input, Renderer2 } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';
declare var $: any;
@Component({
  selector: 'testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {
   @Input() isHome: boolean = false;
constructor(public pathService:RoutingService,private renderer: Renderer2) {}
ngAfterViewInit(): void {
  $('.testimonial-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
}

testimonials = [
  {
    feedback: 'TESTIMONIAL.FEEDBACK_1',
    clientName: 'TESTIMONIAL.CLIENT_NAME_1',
    profession: 'TESTIMONIAL.PROFESSION_1',
    image: '../../../../assets/img/testimonial-1.jpg',
  },
  {
    feedback: 'TESTIMONIAL.FEEDBACK_2',
    clientName: 'TESTIMONIAL.CLIENT_NAME_2',
    profession: 'TESTIMONIAL.PROFESSION_2',
    image: '../../../../assets/img/testimonial-2.jpg',
  },
  {
    feedback: 'TESTIMONIAL.FEEDBACK_3',
    clientName: 'TESTIMONIAL.CLIENT_NAME_3',
    profession: 'TESTIMONIAL.PROFESSION_3',
    image: '../../../../assets/img/testimonial-3.jpg',
  },
];
}
