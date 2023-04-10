import { Injectable, inject } from '@angular/core';
import { Observable, Subject, finalize, map, of, take } from 'rxjs';
import { UserRole } from '../model/user-role.enum';
import { DataService } from './data.service';
import { AuthToken } from '../model/auth-token';
import { AppService } from './app.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'auth-token';

  private readonly storageService = inject(LocalStorageService);

  private readonly dataService = inject(DataService);

  private readonly appService = inject(AppService);

  private readonly tokenRefreshed$ = new Subject<AuthToken | null>();

  private tokenRefreshing = false;

  getToken(): Observable<AuthToken | null> {

    const token = this.storageService.getObject<AuthToken>(this.STORAGE_KEY);
    if (token !== null && !this.isTokenExpired(token)) {
      return of(token);
    }

    if (this.tokenRefreshing) {
      return this.tokenRefreshed$.pipe(take(1));
    } else {
      return this.exchangeToken();
    }
  }

  hasRoles(roles: UserRole[]): Observable<boolean> {
    return this.getToken()
      .pipe(
        map(token => roles.every(role => token?.roles?.includes(role)))
      );
  }

  private isTokenExpired(token: AuthToken): boolean {
    return token.expiresAt <= Date.now();
  }

  private exchangeToken(): Observable<AuthToken | null> {
    this.tokenRefreshing = true;
    this.appService.showSplashScreen();
    return this.dataService.exchangeToken()
      .pipe(
        finalize(() => {
          this.tokenRefreshing = false;
          this.appService.hideSplashScreen();
        }),
        map(newToken => {
          this.storageService.setObject(this.STORAGE_KEY, newToken);
          this.tokenRefreshed$.next(newToken);
          return newToken;
        })
      );
  }

}
