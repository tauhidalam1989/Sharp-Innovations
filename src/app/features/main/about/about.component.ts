import { Component, Input } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
 constructor(public pathService:RoutingService) {}
 @Input() isHome: boolean = false;
}
