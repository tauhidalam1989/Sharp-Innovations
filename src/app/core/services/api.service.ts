import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Products APIs
  getProducts(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, { params: this.buildParams(params) });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/slug/${slug}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  updateProductOrder(id: number, order: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${id}/order`, { order });
  }

  publishProduct(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${id}/publish`, {});
  }

  unpublishProduct(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${id}/unpublish`, {});
  }

  getProductStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/stats`);
  }

  // Blog APIs
  getBlogs(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog`, { params: this.buildParams(params) });
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/${id}`);
  }

  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/slug/${slug}`);
  }

  createBlog(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/blog`, data);
  }

  updateBlog(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/blog/${id}`, data);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blog/${id}`);
  }

  publishBlog(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/blog/${id}/publish`, {});
  }

  unpublishBlog(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/blog/${id}/unpublish`, {});
  }

  likeBlog(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/blog/${id}/like`, {});
  }

  shareBlog(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/blog/${id}/share`, {});
  }

  getBlogStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/stats`);
  }

  getBlogArchives(): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/archives`);
  }

  getPopularBlogs(limit: number = 5): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/popular`, { params: { limit: limit.toString() } });
  }

  private buildParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return httpParams;
  }
}