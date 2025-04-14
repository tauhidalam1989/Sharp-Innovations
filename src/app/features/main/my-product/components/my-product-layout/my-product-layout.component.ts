import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-my-product-layout',
  templateUrl: './my-product-layout.component.html',
  styleUrls: ['./my-product-layout.component.scss']
})
export class MyProductLayoutComponent implements OnInit, AfterViewInit {
  selectedProduct: any;
  productsService: any[] = [];
  submenuVisibilityMap: { [key: string]: boolean } = {};
  @ViewChild('submenuContainer') submenuContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.get('products_service').subscribe((data: any) => {
      this.productsService = data;
  
      // Initialize submenu visibility for each product
      data.forEach((product: { key: string | number; items: any[]; }) => {
        this.submenuVisibilityMap[product.key] = false;
  
        // Auto-expand if current route matches any of the submenu items
        const currentUrl = this.router.url;
        const hasActiveSubmenu = product.items?.some((item: any) =>
          currentUrl.includes(item.path)
        );
  
        if (hasActiveSubmenu) {
          this.submenuVisibilityMap[product.key] = true;
          this.selectedProduct = product;
        }
      });
    });
  
    this.route.params.subscribe(params => {
      const productKey = params['key'];
      const submenuKey = params['submenuKey'];
  
      if (productKey) {
        this.selectedProduct = this.getProductByKey(productKey);
        this.submenuVisibilityMap[productKey] = true; // Force show when route hits main product
      }
  
      if (submenuKey && this.selectedProduct) {
        this.selectSubmenu(submenuKey);
        this.scrollToActiveItem();
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.scrollToActiveItem();
    });
  }
  

  ngAfterViewInit() {
    this.scrollToActiveItem();
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.submenuVisibilityMap[product.key] = true;  // Show submenu when a product is selected
    this.router.navigate([`/product/${product.key.toLowerCase()}`]);
  }

  getProductByKey(key: string): any {
    return this.productsService.find(product => product.key === key);
  }

  isActiveSubmenu(item: any): boolean {
    const currentRoute = this.router.url.split('/')[2];
    return currentRoute === item.path;
  }

  selectSubmenu(submenuKey: string): void {
    const submenu = this.selectedProduct.items.find((item: { path: string; }) => item.path === submenuKey);
    if (submenu) {
      this.router.navigate([`/product/${this.selectedProduct.key.toLowerCase()}/${submenu.path}`]);
      this.scrollToActiveItem();
    }
  }

  scrollToActiveItem(): void {
    setTimeout(() => {
      const container = this.submenuContainer?.nativeElement as HTMLElement;
      if (!container) return;

      const active = container.querySelector('.submenu-item.active') as HTMLElement;
      if (active) {
        const containerTop = container.getBoundingClientRect().top;
        const itemTop = active.getBoundingClientRect().top;
        const offset = itemTop - containerTop - container.clientHeight / 2 + active.clientHeight / 2;

        container.scrollBy({
          top: offset,
          behavior: 'smooth'
        });
      }
    }, 150);
  }

  toggleSubmenu(productKey: string): void {
    if (!this.isMobileView()) return;
    this.submenuVisibilityMap[productKey] = !this.submenuVisibilityMap[productKey];
  }

  isMobileView(): boolean {
    return window.innerWidth <= 1024;
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.isMobileView()) {
      Object.keys(this.submenuVisibilityMap).forEach(key => {
        this.submenuVisibilityMap[key] = true;
      });
    }
  }
}
