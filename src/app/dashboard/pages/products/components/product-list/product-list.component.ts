// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProductService } from '../../products/product.service';
// import { Product, ProductFilters } from '../../products/product.model';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.scss']
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   loading = false;
//   totalItems = 0;
//   currentPage = 1;
//   pageSize = 10;
//   searchTerm = '';
//   statusFilter: 'all' | 'published' | 'draft' = 'all';
//   sortBy = 'order';
//   sortOrder: 'ASC' | 'DESC' = 'ASC';

//   constructor(
//     private productProduct: ProductService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.loading = true;

//     const filters: ProductFilters = {
//       page: this.currentPage,
//       limit: this.pageSize,
//       sortBy: this.sortBy,
//       sortOrder: this.sortOrder
//     };

//     if (this.searchTerm) {
//       filters.search = this.searchTerm;
//     }

//     if (this.statusFilter !== 'all') {
//       filters.status = this.statusFilter;
//     }

//     this.productProduct.getProducts(filters).subscribe({
//       next: (response) => {
//         if (response.success) {
//           this.products = response.data as Product[];
//           this.totalItems = response.pagination?.total || 0;
//         }
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading products:', error);
//         this.loading = false;
//       }
//     });
//   }

//   onSearch(): void {
//     this.currentPage = 1;
//     this.loadProducts();
//   }

//   onStatusFilterChange(): void {
//     this.currentPage = 1;
//     this.loadProducts();
//   }

//   onSortChange(column: string): void {
//     if (this.sortBy === column) {
//       this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
//     } else {
//       this.sortBy = column;
//       this.sortOrder = 'ASC';
//     }
//     this.loadProducts();
//   }

//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.loadProducts();
//   }

//   createNew(): void {
//     this.router.navigate(['/products/new']);
//   }

//   editProduct(id: number): void {
//     this.router.navigate([`/products/edit/${id}`]);
//   }

//   viewProduct(id: number): void {
//     this.router.navigate([`/products/${id}`]);
//   }

//   deleteProduct(id: number): void {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.productProduct.deleteProduct(id).subscribe({
//         next: (response) => {
//           if (response.success) {
//             this.loadProducts();
//           }
//         },
//         error: (error) => {
//           console.error('Error deleting product:', error);
//         }
//       });
//     }
//   }

//   togglePublish(product: Product): void {
//     const action = product.isPublished ? 'unpublish' : 'publish';
//     if (confirm(`Are you sure you want to ${action} this product?`)) {
//       const request = product.isPublished 
//         ? this.productProduct.unpublishProduct(product.id)
//         : this.productProduct.publishProduct(product.id);

//       request.subscribe({
//         next: (response) => {
//           if (response.success) {
//             product.isPublished = !product.isPublished;
//           }
//         },
//         error: (error) => {
//           console.error(`Error ${action}ing product:`, error);
//         }
//       });
//     }
//   }

//   getSortIcon(column: string): string {
//     if (this.sortBy !== column) {
//       return 'fa-sort';
//     }
//     return this.sortOrder === 'ASC' ? 'fa-sort-up' : 'fa-sort-down';
//   }
// }

















import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../products/product.service';
import { Product, ProductFilters } from '../../products/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  statusFilter: 'all' | 'published' | 'draft' = 'all';
  sortBy = 'order';
  sortOrder: 'ASC' | 'DESC' = 'ASC';

  constructor(
    private productProduct: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;

    const filters: ProductFilters = {
      page: this.currentPage,
      limit: this.pageSize,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder
    };

    if (this.searchTerm) {
      filters.search = this.searchTerm;
    }

    if (this.statusFilter !== 'all') {
      filters.status = this.statusFilter;
    }

    this.productProduct.getProducts(filters).subscribe({
      next: (response) => {
        console.log('Products response:', response);
        if (response?.success) {
          const productsData = response.result || response.data;
          if (Array.isArray(productsData)) {
            this.products = productsData;
          } else if (productsData) {
            this.products = [productsData];
          }
          this.totalItems = response.pagination?.total || 0;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onStatusFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(column: string): void {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = column;
      this.sortOrder = 'ASC';
    }
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  createNew(): void {
    this.router.navigate(['/dashboard/products/new']);
  }

  editProduct(id: number): void {
    this.router.navigate([`/dashboard/products/edit/${id}`]);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/dashboard/products', product.id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productProduct.deleteProduct(id).subscribe({
        next: (response) => {
          if (response?.success) {
            this.loadProducts();
          }
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  togglePublish(product: Product): void {
    const action = product.isPublished ? 'unpublish' : 'publish';
    if (confirm(`Are you sure you want to ${action} this product?`)) {
      const request = product.isPublished
        ? this.productProduct.unpublishProduct(product.id)
        : this.productProduct.publishProduct(product.id);

      request.subscribe({
        next: (response) => {
          if (response?.success) {
            product.isPublished = !product.isPublished;
          }
        },
        error: (error) => {
          console.error(`Error ${action}ing product:`, error);
        }
      });
    }
  }

  getSortIcon(column: string): string {
    if (this.sortBy !== column) {
      return 'fa-sort';
    }
    return this.sortOrder === 'ASC' ? 'fa-sort-up' : 'fa-sort-down';
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}