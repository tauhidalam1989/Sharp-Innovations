import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-core-service',
  templateUrl: './core-service.component.html',
  styleUrls: ['./core-service.component.scss']
})
export class CoreServiceComponent {
  
  
  selectedService: any = null;
i: any;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    // Set default selected service
   
  }
}
