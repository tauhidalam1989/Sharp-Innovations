// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BlogService {

//   constructor() { }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Blog, BlogResponse, BlogFilters, BlogStats, BlogArchive } from '../models/blog.model';
import { AuthService } from '../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blog`;

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

  // Get all blogs with filters
  getBlogs(filters?: BlogFilters): Observable<BlogResponse> {
    let params: any = {};
    if (filters) {
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.tag) params.tag = filters.tag;
      if (filters.status) params.status = filters.status;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;
    }
    return this.http.get<BlogResponse>(this.apiUrl, { params });
  }

  // Get blog by ID
  getBlogById(id: number): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/${id}`);
  }

  // Get blog by slug
  getBlogBySlug(slug: string): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/slug/${slug}`);
  }

  // Get blog archives
  getBlogArchives(): Observable<{ success: boolean; data: BlogArchive[] }> {
    return this.http.get<{ success: boolean; data: BlogArchive[] }>(`${this.apiUrl}/archives`);
  }

  // Get popular blogs
  getPopularBlogs(limit: number = 5): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/popular`, { params: { limit: limit.toString() } });
  }

  // Get blog stats
  getBlogStats(): Observable<{ success: boolean; data: BlogStats }> {
    return this.http.get<{ success: boolean; data: BlogStats }>(`${this.apiUrl}/stats`);
  }

  // Get related posts
  getRelatedPosts(id: number, limit: number = 3): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/${id}/related`, { params: { limit: limit.toString() } });
  }

  // Create new blog
  createBlog(blog: Partial<Blog> | FormData): Observable<BlogResponse> {
    return this.http.post<BlogResponse>(this.apiUrl, blog, { headers: this.getHeaders() });
  }

  // Update blog
  updateBlog(id: number, blog: Partial<Blog> | FormData): Observable<BlogResponse> {
    return this.http.put<BlogResponse>(`${this.apiUrl}/${id}`, blog, { headers: this.getHeaders() });
  }

  // Delete blog
  deleteBlog(id: number): Observable<BlogResponse> {
    return this.http.delete<BlogResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Publish blog
  publishBlog(id: number): Observable<BlogResponse> {
    return this.http.patch<BlogResponse>(`${this.apiUrl}/${id}/publish`, {}, { headers: this.getHeaders() });
  }

  // Unpublish blog
  unpublishBlog(id: number): Observable<BlogResponse> {
    return this.http.patch<BlogResponse>(`${this.apiUrl}/${id}/unpublish`, {}, { headers: this.getHeaders() });
  }

  // Like blog
  likeBlog(id: number): Observable<BlogResponse> {
    return this.http.post<BlogResponse>(`${this.apiUrl}/${id}/like`, {}, { headers: this.getHeaders() });
  }

  // Share blog
  shareBlog(id: number): Observable<BlogResponse> {
    return this.http.post<BlogResponse>(`${this.apiUrl}/${id}/share`, {}, { headers: this.getHeaders() });
  }
}