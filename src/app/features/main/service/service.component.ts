import { Component, Input } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
   @Input() isHome: boolean = false;
  servicesList = [
    {
      icon: 'fa fa-robot fa-2x',
      title: 'SERVICE.ROBOTIC_AUTOMATION',
      description: 'SERVICE.ROBOTIC_AUTOMATION_DESC',
      delay: '0.1s',
    },
    {
      icon: 'fa fa-brain fa-2x',
      title: 'SERVICE.MACHINE_LEARNING',
      description: 'SERVICE.MACHINE_LEARNING_DESC',
      delay: '0.5s',
    },
    {
      icon: 'fa fa-book fa-2x',
      title: 'SERVICE.EDUCATION_SCIENCE',
      description: 'SERVICE.EDUCATION_SCIENCE_DESC',
      delay: '0.3s',
    },
    {
      icon: 'fa fa-chart-line fa-2x',
      title: 'SERVICE.PREDICTIVE_ANALYSIS',
      description: 'SERVICE.PREDICTIVE_ANALYSIS_DESC',
      delay: '0.7s',
    },
  ];
  constructor(private router:Router){}
  routeTo(path:any){
    this.router.navigate(['/product/'+path]);
  }
}
