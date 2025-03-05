import { Component, Input } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
   @Input() isHome: boolean = false;
  teamMembers = [
    {
      image: '../../../../assets/img/team-1.jpg',
      name: 'TEAM.BORIS_JOHNSON',
      position: 'TEAM.FOUNDER_CEO',
      delay: '0.1s',
      socials: [
        { icon: 'fab fa-facebook-f', link: '#' },
        { icon: 'fab fa-twitter', link: '#' },
        { icon: 'fab fa-instagram', link: '#' },
        { icon: 'fab fa-linkedin-in', link: '#' },
      ],
    },
    {
      image: '../../../../assets/img/team-2.jpg',
      name: 'TEAM.ADAM_CREW',
      position: 'TEAM.EXECUTIVE_MANAGER',
      delay: '0.5s',
      socials: [
        { icon: 'fab fa-facebook-f', link: '#' },
        { icon: 'fab fa-twitter', link: '#' },
        { icon: 'fab fa-instagram', link: '#' },
        { icon: 'fab fa-linkedin-in', link: '#' },
      ],
    },
    {
      image: '../../../../assets/img/team-3.jpg',
      name: 'TEAM.KATE_WINSLET',
      position: 'TEAM.CO_FOUNDER',
      delay: '0.3s',
      socials: [
        { icon: 'fab fa-facebook-f', link: '#' },
        { icon: 'fab fa-twitter', link: '#' },
        { icon: 'fab fa-instagram', link: '#' },
        { icon: 'fab fa-linkedin-in', link: '#' },
      ],
    },
    {
      image: '../../../../assets/img/team-4.jpg',
      name: 'TEAM.CODY_GARDNER',
      position: 'TEAM.PROJECT_MANAGER',
      delay: '0.7s',
      socials: [
        { icon: 'fab fa-facebook-f', link: '#' },
        { icon: 'fab fa-twitter', link: '#' },
        { icon: 'fab fa-instagram', link: '#' },
        { icon: 'fab fa-linkedin-in', link: '#' },
      ],
    },
  ];
}
