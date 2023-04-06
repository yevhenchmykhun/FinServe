import { Injectable, inject } from '@angular/core';
import { Observable, Subject, catchError, delay, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserRole } from '../model/user-role.enum';
import { DataService } from './data.service';
import { AuthToken } from '../model/auth-token';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly dataService = inject(DataService);

  private readonly appService = inject(AppService);

  private readonly localStorageKey = 'auth-token';

  private tokenRefreshing = false;

  readonly tokenRefreshed$ = new Subject<void>();

  get isTokenRefreshing(): boolean {
    return this.tokenRefreshing;
  }

  get token(): AuthToken {
    const token = localStorage.getItem(this.localStorageKey);
    return token === null ? null : JSON.parse(token);
  }

  set token(token: AuthToken) {
    if (token) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(token));
    }
  }

  isTokenExpired(): boolean {
    return this.token?.expiresAt ? this.token.expiresAt <= Date.now() : true;
  }

  exchangeToken(): Observable<AuthToken> {
    this.tokenRefreshing = true;
    this.appService.showSplashScreen();
    return this.dataService.exchangeToken()
      .pipe(
        delay(2000),
        tap(newToken => {
          this.token = newToken;
          this.appService.hideSplashScreen();
          this.tokenRefreshed$.next();
          this.tokenRefreshing = false;
        }),
        catchError(error => {
          this.tokenRefreshing = false;
          return throwError(() => error);
        })
      );
  }

  hasRoles(roles: UserRole[]): Observable<boolean> {

    if (!this.isTokenExpired()) {
      return of(this.hasRolesInternal(this.token, roles));
    }

    if (this.tokenRefreshing) {
      return this.tokenRefreshed$
        .pipe(
          take(1),
          switchMap(() => of(this.hasRolesInternal(this.token, roles)))
        );
    } else {
      return this.exchangeToken()
        .pipe(
          switchMap(() => of(this.hasRolesInternal(this.token, roles)))
        );
    }
  }

  private hasRolesInternal(token: AuthToken, roles: UserRole[]): boolean {
    return token?.roles ? roles.every(role => this.token.roles?.includes(role)) : false;
  }

}
