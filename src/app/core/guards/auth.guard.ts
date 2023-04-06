import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (route.data?.['roles']) {
      return this.authService.hasRoles(route.data['roles'])
        .pipe(
          tap(value => {
            if (!value) {
              this.error('Access denied');
            }
          })
        );
    }

    return true;
  }

  private error(message: string): void {
    this.router.navigate(['/error'], {
      skipLocationChange: true,
      state: {
        message
      }
    });
  }

}
