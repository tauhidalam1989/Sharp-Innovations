import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://sharpinnovation-api.sharpinnvotech.com/v1/mail/send-mail'; // Replace with your API endpoint
  private apiUrlnews = 'https://sharpinnovation-api.sharpinnvotech.com/v1/mail/send-resume';
  
  constructor(private http: HttpClient) {}

  sendContactForm(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
  sendResume(data: FormData): Observable<any> {
    return this.http.post(this.apiUrlnews, data);
  }
}
