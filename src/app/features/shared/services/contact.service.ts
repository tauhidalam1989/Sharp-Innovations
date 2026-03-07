import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/mail/send-mail`;
  private apiUrlnews = `${environment.apiUrl}/mail/send-resume`;

  constructor(private http: HttpClient) { }

  sendContactForm(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
  sendResume(data: FormData): Observable<any> {
    return this.http.post(this.apiUrlnews, data);
  }
}
