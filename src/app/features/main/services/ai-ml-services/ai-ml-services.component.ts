import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ai-ml-services',
  templateUrl: './ai-ml-services.component.html',
  styleUrls: ['./ai-ml-services.component.scss']
})
export class AiMlServicesComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.get(['SEO.SERVICES.AI_ML_SERVICES.TITLE', 'SEO.SERVICES.AI_ML_SERVICES.DESCRIPTION', 'SEO.SERVICES.AI_ML_SERVICES.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.SERVICES.AI_ML_SERVICES.TITLE'],
        description: translations['SEO.SERVICES.AI_ML_SERVICES.DESCRIPTION'],
        keywords: translations['SEO.SERVICES.AI_ML_SERVICES.KEYWORDS'],
        url: 'https://sharpinvotech.com/services/ai-ml-services',
        page: 'SERVICES.AI_ML_SERVICES',
        schemaType: 'Service'
      });
    });
  }
}
