#!/bin/bash

# Base directory for services
SERVICES_DIR="src/app/features/main/services"

# Function to convert path to SEO key
path_to_seo_key() {
    local path=$1
    # Convert kebab-case to SNAKE_CASE
    echo "$path" | tr '-' '_' | tr '[:lower:]' '[:upper:]'
}

# Find all component.ts files
find "$SERVICES_DIR" -name "*component.ts" | while read -r file; do
    # Get the service name from the directory
    service_dir=$(basename $(dirname "$file"))
    
    # Convert service name to SEO key
    seo_key=$(path_to_seo_key "$service_dir")
    
    # Update the component file
    cat > "$file" << EOL
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../shared/services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-${service_dir}',
  templateUrl: './${service_dir}.component.html',
  styleUrls: ['./${service_dir}.component.scss']
})
export class ${service_dir^}Component implements OnInit {
  constructor(
    private seoService: SeoService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.translateService.get(['SEO.SERVICES.${seo_key}.TITLE', 'SEO.SERVICES.${seo_key}.DESCRIPTION', 'SEO.SERVICES.${seo_key}.KEYWORDS']).subscribe(translations => {
      this.seoService.updateMetaTags({
        title: translations['SEO.SERVICES.${seo_key}.TITLE'],
        description: translations['SEO.SERVICES.${seo_key}.DESCRIPTION'],
        keywords: translations['SEO.SERVICES.${seo_key}.KEYWORDS'],
        url: 'https://sharpinvotech.com/services/${service_dir}',
        page: 'SERVICES.${seo_key}',
        schemaType: 'Service'
      });
    });
  }
}
EOL

    echo "Updated SEO for ${service_dir}"
done 