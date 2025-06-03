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
    this.translateService.get(['SEO.AI_CONSULTING.TITLE', 'SEO.FAQ.DESCRIPTION', 'SEO.FAQ.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.AI_CONSULTING.TITLE'],
        description: translations['SEO.AI_CONSULTING.DESCRIPTION'],
        keywords: translations['SEO.AI_CONSULTING.KEYWORDS'],
        url: 'https://sharpinvotech.com/services/ai-consulting',
        page: 'AI_CONSULTING',
        schemaType: 'AI_CONSULTINGPage'
      });
    });
  }
}
