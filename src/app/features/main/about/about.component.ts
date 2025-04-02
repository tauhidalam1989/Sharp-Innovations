import { Component, Input } from '@angular/core';
import { RoutingService } from '../../shared/services/routing.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
 imageSrc: '../../../../assets/img/English.png' | any;
 constructor(public pathService:RoutingService,private translate: TranslateService) {
  this.translate.onLangChange.subscribe((event) => {
    console.log(event.lang);
    
    this.imageSrc = event.lang === 'en' ? '../../../../assets/img/English.png' : '../../../../assets/img/Arabic.png';
  });
 }
 @Input() isHome: boolean = false;
}
