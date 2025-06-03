import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-application-security',
  templateUrl: './application-security.component.html',
  styleUrls: ['./application-security.component.scss']
})
export class ApplicationSecurityComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.get(['SEO.SERVICES.APPLICATION_SECURITY.TITLE', 'SEO.SERVICES.APPLICATION_SECURITY.DESCRIPTION', 'SEO.SERVICES.APPLICATION_SECURITY.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.SERVICES.APPLICATION_SECURITY.TITLE'],
        description: translations['SEO.SERVICES.APPLICATION_SECURITY.DESCRIPTION'],
        keywords: translations['SEO.SERVICES.APPLICATION_SECURITY.KEYWORDS'],
        url: 'https://sharpinvotech.com/services/application-security',
        page: 'SERVICES.APPLICATION_SECURITY',
        schemaType: 'Service'
      });
    });
  }
}
