import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://88.222.244.10:8092/v1/mail/send-mail'; // Replace with your API endpoint
  private apiUrlnews = 'http://localhost:8091/v1/mail/newsletter';
  
  constructor(private http: HttpClient) {}

  sendContactForm(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
  newsletter(data: { email: string }): Observable<any> {
    return this.http.post(this.apiUrlnews, data);
  }
}
