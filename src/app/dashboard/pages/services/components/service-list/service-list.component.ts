import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePageService } from '../../services/service.service';
import { ServicePage, ServiceFilters } from '../../services/service.model';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
    services: ServicePage[] = [];
    loading = false;
    totalItems = 0;
    currentPage = 1;
    pageSize = 10;
    searchTerm = '';
    statusFilter: 'all' | 'published' | 'draft' = 'all';
    sortBy = 'order';
    sortOrder: 'ASC' | 'DESC' = 'ASC';

    constructor(
        private servicePageService: ServicePageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadServices();
    }

    loadServices(): void {
        this.loading = true;

        const filters: ServiceFilters = {
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

        this.servicePageService.getServices(filters).subscribe({
            next: (response: any) => {
                console.log('Services response:', response);
                if (response?.success) {
                    const servicesData = response.data || response.result?.data || response.result;
                    if (Array.isArray(servicesData)) {
                        this.services = servicesData;
                    } else if (servicesData) {
                        this.services = [servicesData];
                    }
                    this.totalItems = response.pagination?.total || response.result?.pagination?.total || 0;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading services:', error);
                this.loading = false;
            }
        });
    }

    onSearch(): void {
        this.currentPage = 1;
        this.loadServices();
    }

    onStatusFilterChange(): void {
        this.currentPage = 1;
        this.loadServices();
    }

    onSortChange(column: string): void {
        if (this.sortBy === column) {
            this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
        } else {
            this.sortBy = column;
            this.sortOrder = 'ASC';
        }
        this.loadServices();
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadServices();
    }

    createNew(): void {
        this.router.navigate(['/dashboard/services/add']);
    }

    editService(id: number): void {
        this.router.navigate([`/dashboard/services/edit/${id}`]);
    }

    viewService(service: ServicePage): void {
        this.router.navigate(['/dashboard/services/detail', service.id]);
    }

    deleteService(id: number): void {
        if (confirm('Are you sure you want to delete this service?')) {
            this.servicePageService.deleteService(id).subscribe({
                next: (response) => {
                    if (response?.success) {
                        this.loadServices();
                    }
                },
                error: (error) => {
                    console.error('Error deleting service:', error);
                }
            });
        }
    }

    togglePublish(service: ServicePage): void {
        const action = service.isPublished ? 'unpublish' : 'publish';
        if (confirm(`Are you sure you want to ${action} this service?`)) {
            const request = service.isPublished
                ? this.servicePageService.unpublishService(service.id)
                : this.servicePageService.publishService(service.id);

            request.subscribe({
                next: (response) => {
                    if (response?.success) {
                        service.isPublished = !service.isPublished;
                    }
                },
                error: (error) => {
                    console.error(`Error ${action}ing service:`, error);
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
