import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/features/shared/services/seo.service';

@Component({
  selector: 'app-ai-consulting',
  templateUrl: './ai-consulting.component.html',
  styleUrls: ['./ai-consulting.component.scss']
})
export class AiConsultingComponent {
  constructor(
    private seoService: SeoService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.get([
      'SEO.SERVICES.AI_CONSULTING.TITLE',
      'SEO.SERVICES.AI_CONSULTING.DESCRIPTION',
      'SEO.SERVICES.AI_CONSULTING.KEYWORDS'
    ]).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.SERVICES.AI_CONSULTING.TITLE'],
        description: translations['SEO.SERVICES.AI_CONSULTING.DESCRIPTION'],
        keywords: translations['SEO.SERVICES.AI_CONSULTING.KEYWORDS'],
        url: 'https://sharpinvotech.com/services/ai-consulting',
        page: 'AI_CONSULTING',
        schemaType: 'AI_CONSULTINGPage'
      });
    });
    
}
}
