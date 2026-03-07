import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../../../../dashboard/pages/services/services/service.service';
import { ServicePage, ProcessItem, CapabilityItem, BenefitItem, WhyChooseUsItem, FAQItem, AboutPillarItem, IndustryItem, CriticalCardItem } from '../../../../../dashboard/pages/services/services/service.model';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { SeoService } from '../../../../shared/services/seo.service';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-user-service-detail',
    templateUrl: './user-service-detail.component.html',
    styleUrls: ['./user-service-detail.component.scss']
})
export class UserServiceDetailComponent implements OnInit, OnDestroy {
    service: ServicePage | null = null;
    loading = false;
    error = '';
    activeFaqIndex: number | null = null;
    currentLang: string = 'en';
    private langSubscription?: Subscription;
    isServer: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private servicePageService: ServicePageService,
        private languageService: LanguageService,
        private translateService: TranslateService,
        private seoService: SeoService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isServer = isPlatformServer(this.platformId);
        // Set default meta tags synchronously for SSR
        this.seoService.setServerSideMetaTags('SERVICES');
    }

    ngOnInit(): void {
        this.currentLang = this.languageService.getLanguage();
        this.langSubscription = this.translateService.onLangChange.subscribe((event) => {
            this.currentLang = event.lang;
            if (this.service) {
                this.updateSeoTags();
            }
        });

        this.route.paramMap.subscribe(params => {
            const slug = params.get('slug');
            if (slug) {
                this.loadService(slug);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.langSubscription) {
            this.langSubscription.unsubscribe();
        }
    }

    loadService(slug: string): void {
        this.loading = true;
        this.error = '';

        this.servicePageService.getServiceBySlug(slug).subscribe({
            next: (response: any) => {
                if (response?.success) {
                    const serviceData = response.data || response.result?.data || response.result;
                    let parsed: any;
                    if (Array.isArray(serviceData)) {
                        parsed = serviceData[0] || null;
                    } else {
                        parsed = serviceData;
                    }
                    this.service = this.parseJsonFields(parsed) as ServicePage;
                    if (this.isServer && this.service) {
                        console.log(`[SSR-ServiceDetail] Lang: ${this.currentLang} | Title: ${this.service.heroTitle} | TitleAr: ${this.service.heroTitleAr ? 'YES' : 'NO'}`);
                    }
                    this.updateSeoTags();
                } else {
                    this.error = response?.message || 'Failed to load service';
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading service:', error);
                this.error = error.error?.message || error.message || 'Failed to load service details';
                this.loading = false;
            }
        });
    }

    updateSeoTags(): void {
        if (this.service) {
            const title = this.currentLang === 'ar'
                ? (this.service.metaTitleAr || this.service.heroTitleAr || this.service.heroTitle)
                : (this.service.metaTitle || this.service.heroTitle);

            const description = this.currentLang === 'ar'
                ? (this.service.metaDescriptionAr || this.service.heroIntroductionAr || this.service.heroIntroduction || '')
                : (this.service.metaDescription || this.service.heroIntroduction || '');

            this.seoService.updateMetaTags({
                title: title,
                description: description,
                image: this.getImageUrl(this.service.heroImage || this.service.heroIcon),
                page: 'SERVICES'
            });
        }
    }

    private parseJsonFields(service: any): any {
        if (!service) return service;
        const arrayFields = ['process', 'capabilities', 'benefits', 'whyChooseUs', 'faqs', 'aboutPillars', 'industries', 'criticalCards'];
        arrayFields.forEach(field => {
            if (service[field] && typeof service[field] === 'string') {
                try {
                    service[field] = JSON.parse(service[field]);
                } catch (e) {
                    console.error(`Failed to parse ${field}:`, e);
                    service[field] = [];
                }
            }
        });
        return service;
    }

    getProcessItems(): ProcessItem[] {
        return this.service?.process || [];
    }

    getCapabilities(): CapabilityItem[] {
        return this.service?.capabilities || [];
    }

    getBenefits(): BenefitItem[] {
        return this.service?.benefits || [];
    }

    getTechnologies(): any[] {
        return [];
    }

    getWhyChooseUs(): WhyChooseUsItem[] {
        return this.service?.whyChooseUs || [];
    }

    getFAQs(): FAQItem[] {
        return this.service?.faqs || [];
    }

    getAboutPillars(): AboutPillarItem[] {
        return this.service?.aboutPillars || [];
    }

    getIndustries(): IndustryItem[] {
        return this.service?.industries || [];
    }

    getCriticalCards(): CriticalCardItem[] {
        return this.service?.criticalCards || [];
    }

    toggleFaq(index: number): void {
        this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
    }

    goBack(): void {
        this.router.navigate(['/service-pages']);
    }

    getImageUrl(path: string | null | undefined): string {
        if (!path) return '';
        // Handle full URLs (case-insensitive)
        if (path.toLowerCase().startsWith('http')) return path;

        // Clean path: Normalize backslashes (Windows) to forward slashes and remove leading slash
        const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '');

        const baseUrl = environment.apiUrl.replace('/v1', '');
        return `${baseUrl}/${cleanPath}`;
    }
}
