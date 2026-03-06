// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, BehaviorSubject, throwError } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';
// import { LoginRequest, LoginResponse, User, VerifyTokenResponse } from '../models/auth.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = `${environment.apiUrl}/auth`;
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();
//   private tokenKey = 'auth_token';
//   private userKey = 'current_user';
//   private tokenExpiryKey = 'token_expiry';

//   constructor(
//     private http: HttpClient,
//     private router: Router
//   ) {
//     this.loadStoredUser();
//   }

//   private loadStoredUser(): void {
//     const token = this.getToken();
//     const user = this.getStoredUser();
//     const expiry = this.getTokenExpiry();

//     if (token && user && expiry && expiry > Date.now()) {
//       this.currentUserSubject.next(user);
//     } else {
//       this.clearStorage();
//     }
//   }

//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'x-api-key': environment.apiKey
//       })
//     }).pipe(
//       tap(response => {
//         console.log('Login response:', response);
//         if (response?.success && response.result) {
//           const res = response.result as any;
//           const token = res.token || res.accessToken || res.access_token || res.accesstoken;
//           const user = res.user || res; // Fallback to entire result if no specific user object

//           if (token) {
//             this.setSession({
//               user: user as User,
//               token: token,
//               expiresIn: res.expiresIn || '24h'
//             });
//           }
//         }
//       }),
//       catchError(this.handleError)
//     );
//   }

//   logout(): void {
//     const token = this.getToken();

//     if (token) {
//       this.http.post(`${this.apiUrl}/logout`, {})
//         .subscribe({
//           next: (response) => {
//             console.log('Logout successful:', response);
//             this.clearSession();
//           },
//           error: (error) => {
//             console.error('Logout error:', error);
//             this.clearSession();
//           }
//         });
//     } else {
//       this.clearSession();
//     }
//   }

//   verifyToken(): Observable<VerifyTokenResponse> {
//     return this.http.post<VerifyTokenResponse>(`${this.apiUrl}/verify-token`, {}).pipe(
//       tap(response => {
//         if (!response?.success) {
//           this.clearSession();
//         }
//       }),
//       catchError(error => {
//         this.clearSession();
//         return throwError(() => error);
//       })
//     );
//   }

//   getProfile(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/profile`);
//   }

//   changePassword(data: { currentPassword: string; newPassword: string; confirmPassword: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/change-password`, data);
//   }

//   isAuthenticated(): boolean {
//     const token = this.getToken();
//     const expiry = this.getTokenExpiry();
//     return !!(token && expiry && expiry > Date.now());
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   hasRole(roles: string[]): boolean {
//     const user = this.getCurrentUser();
//     return user ? roles.includes(user.role) : false;
//   }

//   private setSession(authData: { user: User; token: string; expiresIn: string }): void {
//     const token = authData.token;
//     const user = authData.user;

//     const expiresIn = authData.expiresIn || '24h';
//     const expiryMs = this.parseExpiry(expiresIn);
//     const expiryTime = Date.now() + expiryMs;

//     localStorage.setItem(this.tokenKey, token);
//     localStorage.setItem(this.userKey, JSON.stringify(user));
//     localStorage.setItem(this.tokenExpiryKey, expiryTime.toString());

//     this.currentUserSubject.next(user);

//     console.log('Session set successfully');
//   }

//   private parseExpiry(expiresIn: string): number {
//     const unit = expiresIn.slice(-1);
//     const value = parseInt(expiresIn.slice(0, -1));

//     switch (unit) {
//       case 'h': return value * 60 * 60 * 1000;
//       case 'd': return value * 24 * 60 * 60 * 1000;
//       case 'm': return value * 60 * 1000;
//       default: return 24 * 60 * 60 * 1000;
//     }
//   }

//   private getStoredUser(): User | null {
//     const userStr = localStorage.getItem(this.userKey);
//     return userStr ? JSON.parse(userStr) : null;
//   }

//   private getTokenExpiry(): number | null {
//     const expiry = localStorage.getItem(this.tokenExpiryKey);
//     return expiry ? parseInt(expiry) : null;
//   }

//   private clearSession(): void {
//     this.clearStorage();
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   private clearStorage(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.userKey);
//     localStorage.removeItem(this.tokenExpiryKey);
//   }

//   private handleError(error: any): Observable<never> {
//     console.error('Auth service error:', error);
//     let errorMessage = 'An error occurred';

//     if (error.error?.message) {
//       errorMessage = error.error.message;
//     } else if (error.message) {
//       errorMessage = error.message;
//     }

//     return throwError(() => new Error(errorMessage));
//   }
// }









import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, User, VerifyTokenResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  private tokenExpiryKey = 'token_expiry';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('AuthService initialized, isBrowser:', this.isBrowser);

    // Only load stored user in browser
    if (this.isBrowser) {
      this.loadStoredUser();
    }
  }

  private loadStoredUser(): void {
    // This method should only be called from constructor after isBrowser check
    const token = this.getToken();
    const user = this.getStoredUser();
    const expiry = this.getTokenExpiry();

    if (token && user && expiry && expiry > Date.now()) {
      this.currentUserSubject.next(user);
    } else {
      this.clearStorage();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': environment.apiKey
      })
    }).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response?.success && response.result) {
          const res = response.result as any;
          const token = res.token || res.accessToken || res.access_token || res.accesstoken;
          const user = res.user || res;

          if (token) {
            this.setSession({
              user: user as User,
              token: token,
              expiresIn: res.expiresIn || '24h'
            });
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (this.isBrowser) {
      console.log('[AuthService] Logout initiated');
    }
    const token = this.getToken();

    if (token && this.isBrowser) {
      this.http.post(`${this.apiUrl}/logout`, {})
        .subscribe({
          next: (response) => {
            console.log('[AuthService] Logout API success:', response);
            this.clearSession();
          },
          error: (error) => {
            console.error('[AuthService] Logout API error:', error);
            this.clearSession();
          }
        });
    } else {
      this.clearSession();
    }
  }

  verifyToken(): Observable<VerifyTokenResponse> {
    return this.http.post<VerifyTokenResponse>(`${this.apiUrl}/verify-token`, {}).pipe(
      tap(response => {
        if (!response?.success && this.isBrowser) {
          this.clearSession();
        }
      }),
      catchError(error => {
        if (this.isBrowser) {
          this.clearSession();
        }
        return throwError(() => error);
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  changePassword(data: { currentPassword: string; newPassword: string; confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) {
      // During SSR, always return false for authentication
      return false;
    }

    const token = this.getToken();
    const expiry = this.getTokenExpiry();
    return !!(token && expiry && expiry > Date.now());
  }

  getToken(): string | null {
    // CRITICAL FIX: Only access localStorage in browser
    if (!this.isBrowser) {
      console.log('SSR: Returning null for getToken()');
      return null;
    }

    try {
      return localStorage.getItem(this.tokenKey);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return null;
    }
  }

  getCurrentUser(): User | null {
    if (!this.isBrowser) {
      // During SSR, return null for current user
      return null;
    }
    return this.currentUserSubject.value;
  }

  hasRole(roles: string[]): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  private setSession(authData: { user: User; token: string; expiresIn: string }): void {
    // Only set session in browser
    if (!this.isBrowser) {
      console.log('SSR: Skipping session setup');
      return;
    }

    const token = authData.token;
    const user = authData.user;

    const expiresIn = authData.expiresIn || '24h';
    const expiryMs = this.parseExpiry(expiresIn);
    const expiryTime = Date.now() + expiryMs;

    try {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      localStorage.setItem(this.tokenExpiryKey, expiryTime.toString());

      this.currentUserSubject.next(user);
      console.log('Session set successfully');
    } catch (e) {
      console.error('Error setting session:', e);
    }
  }

  private parseExpiry(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      case 'm': return value * 60 * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Error getting stored user:', e);
      return null;
    }
  }

  private getTokenExpiry(): number | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const expiry = localStorage.getItem(this.tokenExpiryKey);
      return expiry ? parseInt(expiry) : null;
    } catch (e) {
      console.error('Error getting token expiry:', e);
      return null;
    }
  }

  private clearSession(): void {
    if (this.isBrowser) {
      console.log('[AuthService] Clearing session/storage in browser');
    }
    this.clearStorage();
    this.currentUserSubject.next(null);

    if (this.isBrowser) {
      console.log('[AuthService] Navigation to /login triggered from clearSession');
      this.router.navigate(['/login']);
    }
  }

  private clearStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.tokenExpiryKey);
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth service error:', error);
    let errorMessage = 'An error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}