import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isBrowser = isPlatformBrowser(this.platformId);

    if (this.authService.isAuthenticated()) {
      // Check if route requires specific roles
      const requiredRoles = route.data['roles'] as Array<string>;
      if (requiredRoles) {
        const hasRole = this.authService.hasRole(requiredRoles);
        if (!hasRole) {
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      return true;
    }

    // Not logged in, redirect to login page
    if (isBrowser) {
      console.log('AuthGuard: Not authenticated, redirecting to login from browser');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    } else {
      console.log('AuthGuard: Not authenticated during SSR, preventing redirect');
    }
    return false;
  }
}