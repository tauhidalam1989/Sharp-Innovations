import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-services-layout',
  templateUrl: './my-services-layout.component.html',
  styleUrls: ['./my-services-layout.component.scss'],
})
export class MyServicesLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contentArea') contentArea!: ElementRef;

  selectedProduct: any;
  productsService: any[] = [];
  submenuVisibilityMap: { [key: string]: boolean } = {};
  langChangeSub!: Subscription;
  @ViewChild('submenuContainer') submenuContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadTranslations();

    this.langChangeSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadTranslations();
    });

    this.route.params.subscribe(params => {
      const productKey = params['key'];
      const submenuKey = params['submenuKey'];

      if (productKey) {
        this.selectedProduct = this.getProductByKey(productKey);
        this.submenuVisibilityMap[productKey] = true;
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

  loadTranslations(): void {
    this.translate.get('servicing').subscribe((data: any) => {
      this.productsService = data;

      data.forEach((product: { key: string | number; items: any[] }) => {
        this.submenuVisibilityMap[product.key] = false;
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
  }

  ngAfterViewInit(): void {
    this.scrollToActiveItem();
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.submenuVisibilityMap[product.key] = true;
    this.router.navigate([`${product.key}`]);
  }

  getProductByKey(key: string): any {
    return this.productsService.find(product => product.key === key);
  }

  isActiveSubmenu(item: any): boolean {
    const currentRoute = this.router.url.split('/')[2];
    return currentRoute === item.path;
  }

  selectSubmenu(submenuKey: string): void {
    const submenu = this.selectedProduct.items.find((item: { path: string }) => item.path === submenuKey);
    if (submenu) {
      this.router.navigate([`${this.selectedProduct.key}/${submenu.path}`]);
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
          behavior: 'smooth',
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
  onResize(): void {
    if (!this.isMobileView()) {
      Object.keys(this.submenuVisibilityMap).forEach(key => {
        this.submenuVisibilityMap[key] = true;
      });
    }
  }
  scrollTO(): void {
    setTimeout(() => {
      const content = this.contentArea?.nativeElement;
      if (content) {
        content.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
