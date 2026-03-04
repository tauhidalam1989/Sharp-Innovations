import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../../dashboard/pages/products/products/product.service';
import { Product } from '../../../../../dashboard/pages/products/products/product.model';
import { environment } from '../../../../../../environments/environment';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SeoService } from '../../../../shared/services/seo.service';

@Component({
    selector: 'app-products-listing',
    templateUrl: './products-listing.component.html',
    styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {
    products: Product[] = [];
    productsByCategory: { [category: string]: Product[] } = {};
    categories: string[] = [];
    loading = false;
    error = '';
    currentLang: string = 'en';
    private langSubscription?: Subscription;
    private isBrowser: boolean;
    private isServer: boolean;

    constructor(
        @Inject(ProductService) private productProduct: ProductService,
        private router: Router,
        private languageService: LanguageService,
        private translateService: TranslateService,
        private seoService: SeoService,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.isServer = isPlatformServer(platformId);
        // Set meta tags synchronously for SSR
        this.seoService.setServerSideMetaTags('PRODUCTS');
    }

    ngOnInit(): void {
        this.currentLang = this.languageService.getLanguage();
        this.langSubscription = this.translateService.onLangChange.subscribe((event) => {
            this.currentLang = event.lang;
            if (this.products && this.products.length > 0) {
                this.groupProducts();
            }
        });

        // Set translated meta tags (browser-only to avoid overwriting SSR defaults with raw keys)
        if (this.isBrowser) {
            this.translateService.get(['SEO.PRODUCTS.TITLE', 'SEO.PRODUCTS.DESCRIPTION', 'SEO.PRODUCTS.KEYWORDS']).subscribe(translations => {
                this.seoService.updateMetaTags({
                    title: translations['SEO.PRODUCTS.TITLE'],
                    description: translations['SEO.PRODUCTS.DESCRIPTION'],
                    keywords: translations['SEO.PRODUCTS.KEYWORDS'],
                    url: 'https://sharpinvotech.com/products',
                    page: 'PRODUCTS'
                });
            });
        }

        this.loadProducts();
    }

    ngOnDestroy(): void {
        if (this.langSubscription) {
            this.langSubscription.unsubscribe();
        }
    }

    loadProducts(): void {
        this.loading = true;
        this.error = '';

        this.productProduct.getPublishedProducts().subscribe({
            next: (response) => {
                if (response?.success) {
                    const data = response.result || response.data;
                    if (Array.isArray(data)) {
                        this.products = data;
                    } else if (data) {
                        this.products = [data as Product];
                    }
                    if (this.isServer) {
                        console.log(`[SSR-ProductsListing] Loaded ${this.products.length} products. Lang: ${this.currentLang}`);
                    }
                    this.groupProducts();
                } else {
                    this.error = response?.message || 'Failed to load products';
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.error = error.error?.message || error.message || 'Failed to load products';
                this.loading = false;
            }
        });
    }

    navigateToProduct(product: Product): void {
        this.router.navigate(['/products', product.slug]);
    }

    isIconClass(icon: string | null | undefined): boolean {
        if (!icon) return false;
        return icon.startsWith('fa-') || icon.startsWith('fas ') || icon.startsWith('fab ') || icon.startsWith('far ') || (!icon.includes('.') && !icon.includes('/'));
    }

    getImageUrl(path: string | null | undefined): string {
        if (!path) return '';
        const apiBaseUrl = environment.apiUrl.replace(/\/v1\/?$/, '');

        if (path.startsWith('http')) {
            try {
                const urlObj = new URL(path);
                if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
                    return `${apiBaseUrl}${urlObj.pathname}`;
                }
            } catch (e) { }
            return path;
        }

        const separator = path.startsWith('/') ? '' : '/';
        return `${apiBaseUrl}${separator}${path}`;
    }

    private groupProducts(): void {
        this.productsByCategory = {};
        const cats = new Set<string>();

        this.products.forEach(product => {
            const catName = this.currentLang === 'ar' && product.category?.nameAr ? product.category.nameAr : product.category?.name;
            const cat = catName && catName.trim() !== '' ? catName : 'Other Solutions';
            cats.add(cat);
            if (!this.productsByCategory[cat]) {
                this.productsByCategory[cat] = [];
            }
            this.productsByCategory[cat].push(product);
        });

        // Convert set to array and sort. Put "Other Solutions" at the end.
        this.categories = Array.from(cats).sort((a, b) => {
            if (a === 'Other Solutions') return 1;
            if (b === 'Other Solutions') return -1;
            return a.localeCompare(b);
        });
    }
}
