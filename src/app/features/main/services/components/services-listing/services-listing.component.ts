import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePageService } from '../../../../../dashboard/pages/services/services/service.service';
import { ServicePage } from '../../../../../dashboard/pages/services/services/service.model';
import { environment } from '../../../../../../environments/environment';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-services-listing',
    templateUrl: './services-listing.component.html',
    styleUrls: ['./services-listing.component.scss']
})
export class ServicesListingComponent implements OnInit, OnDestroy {
    services: ServicePage[] = [];
    servicesByCategory: { [category: string]: ServicePage[] } = {};
    categories: string[] = [];
    loading = false;
    error = '';
    currentLang: string = 'en';
    private langSubscription?: Subscription;

    constructor(
        private servicePageService: ServicePageService,
        private router: Router,
        private languageService: LanguageService,
        private translateService: TranslateService
    ) { }

    ngOnInit(): void {
        this.currentLang = this.languageService.getLanguage();
        this.langSubscription = this.translateService.onLangChange.subscribe((event) => {
            this.currentLang = event.lang;
            if (this.services && this.services.length > 0) {
                this.groupServices();
            }
        });
        this.loadServices();
    }

    ngOnDestroy(): void {
        if (this.langSubscription) {
            this.langSubscription.unsubscribe();
        }
    }

    loadServices(): void {
        this.loading = true;
        this.error = '';

        this.servicePageService.getPublishedServices().subscribe({
            next: (response: any) => {
                if (response?.success) {
                    const data = response.result?.data || response.result || response.data;
                    if (Array.isArray(data)) {
                        this.services = data;
                    } else if (data) {
                        this.services = [data as ServicePage];
                    }
                    this.groupServices();
                } else {
                    this.error = response?.message || 'Failed to load services';
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading services:', error);
                this.error = error.error?.message || error.message || 'Failed to load services';
                this.loading = false;
            }
        });
    }

    navigateToService(service: ServicePage): void {
        this.router.navigate(['/service-pages', service.slug]);
    }

    getImageUrl(path: string | null | undefined): string {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const baseUrl = environment.apiUrl.replace('/v1', '');
        const separator = path.startsWith('/') ? '' : '/';
        return `${baseUrl}${separator}${path}`;
    }

    private groupServices(): void {
        this.servicesByCategory = {};
        const cats = new Set<string>();

        this.services.forEach(service => {
            const catName = this.currentLang === 'ar' && (service as any).category?.nameAr
                ? (service as any).category.nameAr
                : (service as any).category?.name;
            const cat = catName && catName.trim() !== '' ? catName : (this.currentLang === 'ar' ? 'خدمات أخرى' : 'Other Services');
            cats.add(cat);
            if (!this.servicesByCategory[cat]) {
                this.servicesByCategory[cat] = [];
            }
            this.servicesByCategory[cat].push(service);
        });

        this.categories = Array.from(cats).sort((a, b) => {
            if (a === 'Other Services' || a === 'خدمات أخرى') return 1;
            if (b === 'Other Services' || b === 'خدمات أخرى') return -1;
            return a.localeCompare(b);
        });
    }
}
