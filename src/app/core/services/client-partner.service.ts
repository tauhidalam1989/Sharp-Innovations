import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client, Partner, ApiResponse, Certificate } from '../models/client-partner.model';

@Injectable({
    providedIn: 'root'
})
export class ClientPartnerService {
    private apiUrl = `${environment.apiUrl}/client-partner`;

    constructor(private http: HttpClient) { }

    // Clients
    getClients(status?: string): Observable<ApiResponse<Client[]>> {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get<ApiResponse<Client[]>>(`${this.apiUrl}/clients`, { params });
    }

    getClient(id: number): Observable<ApiResponse<Client>> {
        return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/clients/${id}`);
    }

    createClient(data: FormData): Observable<ApiResponse<Client>> {
        return this.http.post<ApiResponse<Client>>(`${this.apiUrl}/clients`, data);
    }

    updateClient(id: number, data: FormData): Observable<ApiResponse<Client>> {
        return this.http.put<ApiResponse<Client>>(`${this.apiUrl}/clients/${id}`, data);
    }

    deleteClient(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/clients/${id}`);
    }

    // Partners
    getPartners(status?: string): Observable<ApiResponse<Partner[]>> {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get<ApiResponse<Partner[]>>(`${this.apiUrl}/partners`, { params });
    }

    getPartner(id: number): Observable<ApiResponse<Partner>> {
        return this.http.get<ApiResponse<Partner>>(`${this.apiUrl}/partners/${id}`);
    }

    createPartner(data: FormData): Observable<ApiResponse<Partner>> {
        return this.http.post<ApiResponse<Partner>>(`${this.apiUrl}/partners`, data);
    }

    updatePartner(id: number, data: FormData): Observable<ApiResponse<Partner>> {
        return this.http.put<ApiResponse<Partner>>(`${this.apiUrl}/partners/${id}`, data);
    }

    deletePartner(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/partners/${id}`);
    }

    // Certificates
    getCertificates(status?: string): Observable<ApiResponse<Certificate[]>> {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get<ApiResponse<Certificate[]>>(`${this.apiUrl}/certificates`, { params });
    }

    getCertificate(id: number): Observable<ApiResponse<Certificate>> {
        return this.http.get<ApiResponse<Certificate>>(`${this.apiUrl}/certificates/${id}`);
    }

    createCertificate(data: FormData): Observable<ApiResponse<Certificate>> {
        return this.http.post<ApiResponse<Certificate>>(`${this.apiUrl}/certificates`, data);
    }

    updateCertificate(id: number, data: FormData): Observable<ApiResponse<Certificate>> {
        return this.http.put<ApiResponse<Certificate>>(`${this.apiUrl}/certificates/${id}`, data);
    }

    deleteCertificate(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/certificates/${id}`);
    }
}
