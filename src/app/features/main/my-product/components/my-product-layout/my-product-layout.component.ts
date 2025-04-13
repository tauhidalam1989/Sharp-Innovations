import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-product-layout',
  templateUrl: './my-product-layout.component.html',
  styleUrls: ['./my-product-layout.component.scss']
})
export class MyProductLayoutComponent implements OnInit,AfterViewInit {
  selectedProduct: any;
  productsService: any[] = [];
  @ViewChild('submenuContainer') submenuContainer!: ElementRef;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private translate: TranslateService // Inject TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.get('products_service').subscribe((data: any) => {
      this.productsService = data;
    });

    // Check if a product or submenu is selected based on the URL
    this.route.params.subscribe(params => {
      const productKey = params['key'];
      const submenuKey = params['submenuKey'];

      if (productKey) {
        this.selectedProduct = this.getProductByKey(productKey);
      }

      if (submenuKey && this.selectedProduct) {
        this.selectSubmenu(submenuKey);
        this.scrollToActiveItem();
      }
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.router.navigate([`/product/${product.key.toLowerCase()}`]);
  }

  getProductByKey(key: string): any {
    return this.productsService.find(product => product.key === key);
  }

  // Check if the submenu item is the active one
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
  ngAfterViewInit() {
    this.scrollToActiveItem();
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
    }, 150); // slight delay for DOM render
  }
  
}
