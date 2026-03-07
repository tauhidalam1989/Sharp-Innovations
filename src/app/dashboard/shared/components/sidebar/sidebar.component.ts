import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface MenuItem {
  path: string;
  icon: string;
  label: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  menuItems: MenuItem[] = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/dashboard/products', icon: 'cogs', label: 'Products' },
    { path: '/dashboard/product-categories', icon: 'tags', label: 'Product Categories' },
    { path: '/dashboard/products/new', icon: 'plus-circle', label: 'Add Product' },
    { path: '/dashboard/services', icon: 'concierge-bell', label: 'Services' },
    { path: '/dashboard/service-categories', icon: 'tags', label: 'Service Categories' },
    { path: '/dashboard/services/add', icon: 'plus-circle', label: 'Add Service' },
    { path: '/blog', icon: 'blog', label: 'Blog Posts' },
    { path: '/blog/new', icon: 'plus-circle', label: 'Add Blog' },
    // { path: '/dashboard/contact', icon: 'fas fa-envelope', label: 'Inquiries' },
    { path: '/dashboard/client-partner', icon: 'handshake', label: 'Clients & Partners' },
    { path: '/dashboard/users', icon: 'users-cog', label: 'User Management', roles: ['super_admin'] },
    { path: '/settings', icon: 'cog', label: 'Settings' }
  ];

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  getIconClass(icon: string): string {
    const icons: { [key: string]: string } = {
      'dashboard': 'fa-tachometer-alt',
      'cogs': 'fa-cogs',
      'blog': 'fa-blog',
      'plus-circle': 'fa-plus-circle',
      'tags': 'fa-tags',
      'images': 'fa-images',
      'cog': 'fa-cog',
      'concierge-bell': 'fa-concierge-bell',
      'handshake': 'fa-handshake',
      'users-cog': 'fa-users-cog'
    };
    return icons[icon] || 'fa-circle';
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  logout(): void {
    this.authService.logout();
  }
}