import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../../dashboard/pages/products/products/product.service';
import { Product } from '../../../../../dashboard/pages/products/products/product.model';
import { environment } from '../../../../../../environments/environment';
import { LanguageService } from '../../../../shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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

    constructor(
        @Inject(ProductService) private productProduct: ProductService,
        private router: Router,
        private languageService: LanguageService,
        private translateService: TranslateService
    ) { }

    ngOnInit(): void {
        this.currentLang = this.languageService.getLanguage();
        this.langSubscription = this.translateService.onLangChange.subscribe((event) => {
            this.currentLang = event.lang;
            if (this.products && this.products.length > 0) {
                this.groupProducts();
            }
        });
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
