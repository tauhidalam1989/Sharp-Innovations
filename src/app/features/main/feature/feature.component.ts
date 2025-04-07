import { Component, Input } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';

@Component({
  selector: 'feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
   @Input() isHome: boolean = false;
constructor(public pathService:RoutingService) {}
featuresList: string[] = [
  'FEATURESS.FEATURE_ONE',
  'FEATURESS.FEATURE_TWO',
];
}
