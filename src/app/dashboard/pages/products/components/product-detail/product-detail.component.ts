// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProductService } from '../../products/product.service';
// import { Product, Feature } from '../../../products/products/product.model';

// @Component({
//   selector: 'app-product-detail',
//   templateUrl: './product-detail.component.html',
//   styleUrls: ['./product-detail.component.scss']
// })
// export class ProductDetailComponent implements OnInit {
//   product: Product | null = null;
//   loading = false;
//   error = '';
//   productId: number | null = null;
//   activeFaq: number | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productProduct: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       if (params['id']) {
//         this.productId = +params['id'];
//         this.loadProductData(this.productId);
//       }
//     });
//   }

//   loadProductData(id: number): void {
//     this.loading = true;
//     this.error = '';

//     this.productProduct.getProductById(id).subscribe({
//       next: (response) => {
//         console.log('Product detail response:', response);

//         if (response?.success) {
//           const productData = response.result || response.data;

//           if (productData) {
//             // Check if productData is an array or a single object
//             if (Array.isArray(productData)) {
//               // If it's an array, take the first item (assuming it's the one we want)
//               console.log('Product data is an array, taking first item');
//               this.product = productData[0] || null;
//             } else {
//               // If it's a single object, assign it directly
//               this.product = productData as Product;
//             }

//             console.log('Product loaded:', this.product);
//           } else {
//             this.error = 'Product data is empty';
//           }
//         } else {
//           this.error = response?.message || 'Failed to load product';
//         }

//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading product:', error);
//         this.error = error.error?.message || error.message || 'Failed to load product details';
//         this.loading = false;
//       }
//     });
//   }

//   // Helper method to safely get product properties
//   getProductProperty<K extends keyof Product>(property: K): Product[K] | null {
//     return this.product ? this.product[property] : null;
//   }

//   // Check if product has features
//   hasFeatures(): boolean {
//     return !!(this.product?.features && this.product.features.length > 0);
//   }

//   // Get features safely
//   getFeatures(): Feature[] {
//     return this.product?.features || [];
//   }

//   // Get gallery safely
//   getGallery(): string[] {
//     return this.product?.gallery || [];
//   }

//   // Get meta keywords as array
//   getMetaKeywordsArray(): string[] {
//     if (!this.product?.metaKeywords) return [];
//     return this.product.metaKeywords.split(',').map(k => k.trim());
//   }

//   editProduct(): void {
//     if (this.product) {
//       this.router.navigate(['/products/edit', this.product.id]);
//     }
//   }

//   deleteProduct(): void {
//     if (this.product && confirm('Are you sure you want to delete this product?')) {
//       this.productProduct.deleteProduct(this.product.id).subscribe({
//         next: (response) => {
//           if (response?.success) {
//             this.router.navigate(['/products']);
//           }
//         },
//         error: (error) => {
//           console.error('Error deleting product:', error);
//           this.error = error.error?.message || error.message || 'Failed to delete product';
//         }
//       });
//     }
//   }

//   togglePublish(): void {
//     if (!this.product) return;

//     const action = this.product.isPublished ? 'unpublish' : 'publish';
//     const request = this.product.isPublished 
//       ? this.productProduct.unpublishProduct(this.product.id)
//       : this.productProduct.publishProduct(this.product.id);

//     request.subscribe({
//       next: (response) => {
//         if (response?.success) {
//           this.product!.isPublished = !this.product!.isPublished;
//         }
//       },
//       error: (error) => {
//         console.error(`Error ${action}ing product:`, error);
//         this.error = `Failed to ${action} product`;
//       }
//     });
//   }

//   goBack(): void {
//     this.router.navigate(['/products']);
//   }

//   formatDate(date: Date | undefined): string {
//     if (!date) return '';
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   }

//   getFeatureIcon(feature: Feature): string {
//     return feature.icon || 'fa-check-circle';
//   }

//   toggleFaq(index: number): void {
//     this.activeFaq = this.activeFaq === index ? null : index;
//   }

//   // Helper to split features into two columns if needed
//   getFeatureColumns(): Feature[][] {
//     const features = this.getFeatures();
//     if (features.length === 0) return [];

//     const midPoint = Math.ceil(features.length / 2);
//     return [
//       features.slice(0, midPoint),
//       features.slice(midPoint)
//     ];
//   }
// }













import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../products/product.service';
import { Product, HowItWorkItem, BenefitItem, VisionItem, FAQItem, KeyFeatureItem } from '../../products/product.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = false;
  error = '';
  productId: number | null = null;
  activeFaq: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productProduct: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        // If slug is provided, use it
        this.loadProductBySlug(params['slug']);
      } else if (params['id']) {
        // If ID is provided, use it
        this.productId = +params['id'];
        this.loadProductData(this.productId);
      }
    });
  }

  loadProductData(id: number): void {
    this.loading = true;
    this.error = '';

    this.productProduct.getProductById(id).subscribe({
      next: (response) => {
        console.log('Product detail response:', response);

        if (response?.success) {
          const productData = response.result || response.data;

          if (Array.isArray(productData)) {
            this.product = productData[0] || null;
          } else {
            this.product = productData as Product;
          }

          console.log('Product loaded:', this.product);
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

  loadProductBySlug(slug: string): void {
    this.loading = true;
    this.error = '';

    this.productProduct.getProductBySlug(slug).subscribe({
      next: (response) => {
        console.log('Product by slug response:', response);

        if (response?.success) {
          const productData = response.result || response.data;

          if (Array.isArray(productData)) {
            this.product = productData[0] || null;
          } else {
            this.product = productData as Product;
          }

          console.log('Product loaded:', this.product);
        } else {
          this.error = response?.message || 'Failed to load product';
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product by slug:', error);
        this.error = error.error?.message || error.message || 'Failed to load product details';
        this.loading = false;
      }
    });
  }

  // Helper methods for template
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
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  goBack(): void {
    this.router.navigate(['/dashboard/products']);
  }

  getImageUrl(path: string | null | undefined): string {
    if (!path) return '';

    // If it's already an absolute URL but points to localhost, we might need to fix the port
    // if the backend port changed (e.g. from 8094 to 8093).
    const apiBaseUrl = environment.apiUrl.replace(/\/v1\/?$/, '');

    if (path.startsWith('http')) {
      // If deployed or properly matched, just use it, but if it has localhost:XXXX we replace the base
      try {
        const urlObj = new URL(path);
        if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
          return `${apiBaseUrl}${urlObj.pathname}`;
        }
      } catch (e) {
        // Fallback if URL parsing fails
      }
      return path;
    }

    // Relative path
    const separator = path.startsWith('/') ? '' : '/';
    return `${apiBaseUrl}${separator}${path}`;
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