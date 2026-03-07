import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/auth.model';

export interface UserResponse {
    success: boolean;
    message: string;
    data?: User | User[];
    result?: User | User[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    getUsers(page: number = 1, limit: number = 10): Observable<UserResponse> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<UserResponse>(this.apiUrl, { params });
    }

    getUserById(id: number): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
    }

    createUser(userData: any): Observable<UserResponse> {
        return this.http.post<UserResponse>(this.apiUrl, userData);
    }

    updateUser(id: number, userData: any): Observable<UserResponse> {
        return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, userData);
    }

    deleteUser(id: number): Observable<UserResponse> {
        return this.http.delete<UserResponse>(`${this.apiUrl}/${id}`);
    }

    toggleStatus(id: number, isActive: boolean): Observable<UserResponse> {
        return this.http.patch<UserResponse>(`${this.apiUrl}/${id}/status`, { isActive });
    }
}
