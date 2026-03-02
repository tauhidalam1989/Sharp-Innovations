import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Product, ProductResponse, ProductFilters, ProductCategoryResponse } from './product.model';
import { AuthService } from '../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private categoryApiUrl = `${environment.apiUrl}/product-categories`;

  constructor(
    private http: HttpClient,
    private authProduct: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authProduct.getToken();
    return new HttpHeaders({
      'x-api-key': environment.apiKey,
      'accesstoken': `Bearer ${token}`
    });
  }

  // Public methods
  getProducts(filters?: ProductFilters): Observable<ProductResponse> {
    let params: any = {};
    if (filters) {
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;
    }
    return this.http.get<ProductResponse>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<ProductResponse> {
    console.log('Fetching product by ID:', id);
    console.log('Using headers:', this.getHeaders());
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  getProductBySlug(slug: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/slug/${slug}`);
  }

  getPublishedProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/published`);
  }

  getProductStats(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/stats`);
  }

  getCategories(): Observable<ProductCategoryResponse> {
    return this.http.get<ProductCategoryResponse>(this.categoryApiUrl, {
      headers: this.getHeaders()
    });
  }

  getCategoryById(id: number): Observable<ProductCategoryResponse> {
    return this.http.get<ProductCategoryResponse>(`${this.categoryApiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createCategory(data: any): Observable<ProductCategoryResponse> {
    return this.http.post<ProductCategoryResponse>(this.categoryApiUrl, data, {
      headers: this.getHeaders()
    });
  }

  updateCategory(id: number, data: any): Observable<ProductCategoryResponse> {
    return this.http.put<ProductCategoryResponse>(`${this.categoryApiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  deleteCategory(id: number): Observable<ProductCategoryResponse> {
    return this.http.delete<ProductCategoryResponse>(`${this.categoryApiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Protected methods
  createProduct(formData: FormData): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, formData, {
      headers: this.getHeaders()
    });
  }

  updateProduct(id: number, formData: FormData): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, formData, {
      headers: this.getHeaders()
    });
  }

  deleteProduct(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  updateProductOrder(id: number, order: number): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(`${this.apiUrl}/${id}/order`, { order }, {
      headers: this.getHeaders()
    });
  }

  publishProduct(id: number): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(`${this.apiUrl}/${id}/publish`, {}, {
      headers: this.getHeaders()
    });
  }

  unpublishProduct(id: number): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(`${this.apiUrl}/${id}/unpublish`, {}, {
      headers: this.getHeaders()
    });
  }
}