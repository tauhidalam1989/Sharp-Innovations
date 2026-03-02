import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePageService } from '../../services/service.service';
import { ServicePage, ProcessItem, CapabilityItem, BenefitItem, WhyChooseUsItem, FAQItem, AboutPillarItem, IndustryItem, CriticalCardItem } from '../../services/service.model';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
    service: ServicePage | null = null;
    loading = false;
    error = '';
    serviceId: number | null = null;
    activeFaq: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private servicePageService: ServicePageService,
        public translate: TranslateService
    ) { }

    get currentLang(): string {
        return this.translate.currentLang || 'en';
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['slug']) {
                this.loadServiceBySlug(params['slug']);
            } else if (params['id']) {
                this.serviceId = +params['id'];
                this.loadServiceData(this.serviceId);
            }
        });
    }

    loadServiceData(id: number): void {
        this.loading = true;
        this.error = '';

        this.servicePageService.getServiceById(id).subscribe({
            next: (response: any) => {
                if (response?.success) {
                    const serviceData = response.data || response.result?.data || response.result;
                    if (Array.isArray(serviceData)) {
                        this.service = this.parseJsonFields(serviceData[0]) || null;
                    } else {
                        this.service = this.parseJsonFields(serviceData) as ServicePage;
                    }
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

    loadServiceBySlug(slug: string): void {
        this.loading = true;
        this.error = '';

        this.servicePageService.getServiceBySlug(slug).subscribe({
            next: (response: any) => {
                if (response?.success) {
                    const serviceData = response.data || response.result?.data || response.result;
                    if (Array.isArray(serviceData)) {
                        this.service = this.parseJsonFields(serviceData[0]) || null;
                    } else {
                        this.service = this.parseJsonFields(serviceData) as ServicePage;
                    }
                } else {
                    this.error = response?.message || 'Failed to load service';
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading service by slug:', error);
                this.error = error.error?.message || error.message || 'Failed to load service details';
                this.loading = false;
            }
        });
    }

    // Ensure array properties are safely parsed
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

    // Helper methods for template
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
        this.activeFaq = this.activeFaq === index ? null : index;
    }

    goBack(): void {
        this.router.navigate(['/dashboard/services']);
    }

    getImageUrl(path: string | null | undefined): string {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const baseUrl = environment.apiUrl.replace('/v1', '');
        const separator = path.startsWith('/') ? '' : '/';
        return `${baseUrl}${separator}${path}`;
    }

    formatDate(date: Date | undefined): string {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
