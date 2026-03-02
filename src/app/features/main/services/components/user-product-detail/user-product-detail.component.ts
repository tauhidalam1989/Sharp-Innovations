import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../dashboard/pages/products/products/product.service';
import { Product, HowItWorkItem, BenefitItem, VisionItem, FAQItem, KeyFeatureItem } from '../../../../../dashboard/pages/products/products/product.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-user-product-detail',
    templateUrl: './user-product-detail.component.html',
    styleUrls: ['./user-product-detail.component.scss']
})
export class UserProductDetailComponent implements OnInit, OnDestroy {
    product: Product | null = null;
    loading = false;
    error = '';
    activeFaqIndex: number | null = null;
    currentLang: string = 'en';
    private langSubscription?: Subscription;
    activeFaq: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService, // Renamed from productProduct for clarity and removed @Inject
        private sanitizer: DomSanitizer,
        private languageService: LanguageService,
        private translateService: TranslateService
    ) { }

    ngOnInit(): void {
        this.currentLang = this.languageService.getLanguage();
        this.langSubscription = this.translateService.onLangChange.subscribe((event) => {
            this.currentLang = event.lang;
        });

        this.route.paramMap.subscribe(params => {
            const slug = params.get('slug');
            if (slug) {
                this.loadProduct(slug);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.langSubscription) {
            this.langSubscription.unsubscribe();
        }
    }

    loadProduct(slug: string): void { // Renamed from loadProductBySlug
        this.loading = true;
        this.error = '';

        this.productService.getProductBySlug(slug).subscribe({ // Changed to productService
            next: (response) => {
                if (response?.success) {
                    const productData = response.result || response.data;
                    if (Array.isArray(productData)) {
                        this.product = productData[0] || null;
                    } else {
                        this.product = productData as Product;
                    }
                } else {
                    this.error = response?.message || 'Failed to load product';
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading product:', error);
                this.error = error.error?.message || error.message || 'Failed to load product details';
                this.loading = false;
            }
        });
    }

    getHowItWorks(): HowItWorkItem[] {
        return this.product?.howItWorks || [];
    }

    getBenefits(): BenefitItem[] {
        return this.product?.benefits || [];
    }

    getVisionItems(): VisionItem[] {
        return this.product?.visionItems || [];
    }

    getFAQs(): FAQItem[] {
        return this.product?.faqs || [];
    }

    getKeyFeaturesImages(): string[] {
        return this.product?.keyFeaturesImages || [];
    }

    getKeyFeaturesList(): (string | KeyFeatureItem)[] {
        return this.product?.keyFeaturesList || [];
    }

    getFeatureIcon(feature: any): string {
        if (typeof feature === 'object' && feature !== null && feature.icon) {
            return feature.icon;
        }
        return 'fas fa-check-circle';
    }

    getFeatureText(feature: any): string {
        if (typeof feature === 'object' && feature !== null && feature.text) {
            return feature.text;
        }
        return feature;
    }

    getGallery(): string[] {
        return this.product?.gallery || [];
    }

    toggleFaq(index: number): void {
        this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
    }

    goBack(): void {
        this.router.navigate(['/products']);
    }

    getImageUrl(path: string | null | undefined): string {
        if (!path) return '';
        const apiBaseUrl = environment.apiUrl.replace(/\/v1\/?$/, '');

        if (path.startsWith('http')) {
            try {
                const urlObj = new URL(path);
                if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                    return `${apiBaseUrl}${urlObj.pathname} `;
                }
            } catch (e) { }
            return path;
        }

        const separator = path.startsWith('/') ? '' : '/';
        return `${apiBaseUrl}${separator}${path} `;
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
