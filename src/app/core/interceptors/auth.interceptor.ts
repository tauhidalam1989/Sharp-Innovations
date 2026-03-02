import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/login') || req.url.includes('/auth/verify-token') || req.url.includes('/auth/logout')) {
      let rawReq = req.clone({
        setHeaders: { 'x-api-key': environment.apiKey }
      });
      const t = this.authService.getToken();
      if (t && !req.url.includes('/auth/login')) {
        rawReq = rawReq.clone({ setHeaders: { 'accesstoken': `Bearer ${t}` } });
      }
      return next.handle(rawReq);
    }

    // Clone the request and add headers
    let apiReq = req.clone({
      setHeaders: {
        'x-api-key': environment.apiKey
      }
    });

    // Add token if available
    const token = this.authService.getToken();
    if (token) {
      apiReq = apiReq.clone({
        setHeaders: {
          'accesstoken': `Bearer ${token}`
        }
      });
    }

    return next.handle(apiReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(apiReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.verifyToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.data);

          // Retry the request with new token
          const token = this.authService.getToken();
          const newRequest = request.clone({
            setHeaders: {
              'accesstoken': `Bearer ${token}`
            }
          });
          return next.handle(newRequest);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => {
          const token = this.authService.getToken();
          const newRequest = request.clone({
            setHeaders: {
              'accesstoken': `Bearer ${token}`
            }
          });
          return next.handle(newRequest);
        })
      );
    }
  }
}