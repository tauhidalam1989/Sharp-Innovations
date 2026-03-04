import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { ServicePageService } from '../services/services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    publishedProducts: 0,
    draftProducts: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalServices: 0,
    publishedServices: 0,
    draftServices: 0,
    totalViews: 0,
    totalLikes: 0
  };

  recentProducts: any[] = [];
  recentBlogs: any[] = [];
  recentServices: any[] = [];
  loading = true;
  sidebarCollapsed = false;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private apiService: ApiService,
    private servicePageService: ServicePageService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Admin Dashboard - Sharp Innovations');
    this.loadDashboardData();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', this.sidebarCollapsed.toString());
  }

  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';
    this.stats.totalViews = 0;

    // Get products stats
    this.apiService.getProductStats().subscribe({
      next: (response) => {
        console.log('Products stats response:', response);
        if (response?.success) {
          const statsData = response.result || response.data || {};
          this.stats.totalProducts = statsData.total || 0;
          this.stats.publishedProducts = statsData.published || 0;
          this.stats.draftProducts = statsData.draft || 0;
          this.stats.totalViews += statsData.totalViews || 0;
        }
      },
      error: (error) => {
        console.error('Error loading product stats:', error);
      }
    });

    // Get blog stats
    this.apiService.getBlogStats().subscribe({
      next: (response) => {
        console.log('Blog stats response:', response);
        if (response?.success) {
          const statsData = response.result || response.data || {};
          this.stats.totalBlogs = statsData.total || 0;
          this.stats.publishedBlogs = statsData.published || 0;
          this.stats.draftBlogs = statsData.draft || 0;
          this.stats.totalLikes = statsData.totalLikes || 0;
          this.stats.totalViews += statsData.totalViews || 0;
        }
      },
      error: (error) => {
        console.error('Error loading blog stats:', error);
      }
    });

    // Get recent products
    this.apiService.getProducts({ limit: 4 }).subscribe({
      next: (response) => {
        console.log('Recent products response:', response);
        if (response?.success) {
          if (response.result && Array.isArray(response.result)) {
            this.recentProducts = response.result.slice(0, 4);
            console.log('Recent products loaded:', this.recentProducts.length);
          } else if (response.data && Array.isArray(response.data)) {
            this.recentProducts = response.data.slice(0, 4);
          }
        }
      },
      error: (error) => {
        console.error('Error loading recent products:', error);
      }
    });

    // Get services stats
    this.servicePageService.getServiceStats().subscribe({
      next: (response) => {
        console.log('Services stats response:', response);
        if (response?.success) {
          const statsData = (response as any).data || (response as any).result?.data || (response as any).result || {};
          this.stats.totalServices = statsData.total || 0;
          this.stats.publishedServices = statsData.published || 0;
          this.stats.draftServices = statsData.draft || 0;
          this.stats.totalViews += statsData.totalViews || 0;
        }
      },
      error: (error) => {
        console.error('Error loading service stats:', error);
      }
    });

    // Get recent services
    this.servicePageService.getServices({ limit: 4 }).subscribe({
      next: (response) => {
        console.log('Recent services response:', response);
        if (response?.success) {
          const servicesData = (response as any).data || (response as any).result?.data || (response as any).result;
          if (Array.isArray(servicesData)) {
            this.recentServices = servicesData.slice(0, 4);
          } else if (servicesData) {
            this.recentServices = [servicesData];
          }

          // Fallback update for totalServices if stats API is missing/failing
          const totalFromList = (response as any).pagination?.total || (response as any).result?.pagination?.total;
          if (!this.stats.totalServices && totalFromList) {
            this.stats.totalServices = totalFromList;
          }
        }
      },
      error: (error) => {
        console.error('Error loading recent services:', error);
      }
    });

    // Get recent blogs
    this.apiService.getBlogs({ limit: 4 }).subscribe({
      next: (response) => {
        console.log('Recent blogs response:', response);
        if (response?.success) {
          if (response.result && Array.isArray(response.result)) {
            this.recentBlogs = response.result.slice(0, 4);
            console.log('Recent blogs loaded:', this.recentBlogs.length);
          } else if (response.data && Array.isArray(response.data)) {
            this.recentBlogs = response.data.slice(0, 4);
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recent blogs:', error);
        this.loading = false;
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
  }
}