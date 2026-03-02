import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ServicePage, ServiceResponse, ServiceFilters, ServiceCategoryResponse } from './service.model';
import { AuthService } from '../../../../core/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ServicePageService {
    private apiUrl = `${environment.apiUrl}/services`;
    private categoryApiUrl = `${environment.apiUrl}/service-categories`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'x-api-key': environment.apiKey,
            'accesstoken': `Bearer ${token}`
        });
    }

    // Public methods
    getServices(filters?: ServiceFilters): Observable<ServiceResponse> {
        let params: any = {};
        if (filters) {
            if (filters.page) params.page = filters.page;
            if (filters.limit) params.limit = filters.limit;
            if (filters.search) params.search = filters.search;
            if (filters.status) params.status = filters.status;
            if (filters.sortBy) params.sortBy = filters.sortBy;
            if (filters.sortOrder) params.sortOrder = filters.sortOrder;
        }
        // Dashboard typically needs auth, but standard get route might be public.
        // However for admin table, we should send headers just in case.
        return this.http.get<ServiceResponse>(this.apiUrl, { params, headers: this.getHeaders() });
    }

    getServiceById(id: number): Observable<ServiceResponse> {
        return this.http.get<ServiceResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    getServiceBySlug(slug: string): Observable<ServiceResponse> {
        return this.http.get<ServiceResponse>(`${this.apiUrl}/slug/${slug}`);
    }

    getPublishedServices(): Observable<ServiceResponse> {
        return this.http.get<ServiceResponse>(`${this.apiUrl}/published`);
    }

    getServiceStats(): Observable<ServiceResponse> {
        return this.http.get<ServiceResponse>(`${this.apiUrl}/stats`, { headers: this.getHeaders() });
    }

    // Categories
    getCategories(): Observable<ServiceCategoryResponse> {
        return this.http.get<ServiceCategoryResponse>(this.categoryApiUrl, {
            headers: this.getHeaders()
        });
    }

    getCategoryById(id: number): Observable<ServiceCategoryResponse> {
        return this.http.get<ServiceCategoryResponse>(`${this.categoryApiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }

    createCategory(data: any): Observable<ServiceCategoryResponse> {
        return this.http.post<ServiceCategoryResponse>(this.categoryApiUrl, data, {
            headers: this.getHeaders()
        });
    }

    updateCategory(id: number, data: any): Observable<ServiceCategoryResponse> {
        return this.http.put<ServiceCategoryResponse>(`${this.categoryApiUrl}/${id}`, data, {
            headers: this.getHeaders()
        });
    }

    deleteCategory(id: number): Observable<ServiceCategoryResponse> {
        return this.http.delete<ServiceCategoryResponse>(`${this.categoryApiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }

    // Protected admin methods
    createService(formData: FormData): Observable<ServiceResponse> {
        return this.http.post<ServiceResponse>(this.apiUrl, formData, {
            headers: this.getHeaders()
        });
    }

    updateService(id: number, formData: FormData): Observable<ServiceResponse> {
        return this.http.put<ServiceResponse>(`${this.apiUrl}/${id}`, formData, {
            headers: this.getHeaders()
        });
    }

    deleteService(id: number): Observable<ServiceResponse> {
        return this.http.delete<ServiceResponse>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders()
        });
    }

    publishService(id: number): Observable<ServiceResponse> {
        return this.http.patch<ServiceResponse>(`${this.apiUrl}/${id}/publish`, {}, {
            headers: this.getHeaders()
        });
    }

    unpublishService(id: number): Observable<ServiceResponse> {
        return this.http.patch<ServiceResponse>(`${this.apiUrl}/${id}/unpublish`, {}, {
            headers: this.getHeaders()
        });
    }
}
