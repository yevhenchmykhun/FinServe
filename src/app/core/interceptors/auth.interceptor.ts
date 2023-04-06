import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { APP_CONFIG } from '../model/app-config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly appConfig = inject(APP_CONFIG);

  private readonly authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === this.appConfig.auth.api) {

      return next.handle(request);
    } else {

      if (!this.authService.isTokenExpired()) {
        return next.handle(this.addAuthHeader(request));
      }

      if (this.authService.isTokenRefreshing) {
        return this.authService.tokenRefreshed$
          .pipe(
            take(1),
            switchMap(() => next.handle(this.addAuthHeader(request)))
          );
      } else {
        return this.authService.exchangeToken()
          .pipe(
            switchMap(() => next.handle(this.addAuthHeader(request)))
          );
      }
    }

  }

  private addAuthHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + JSON.stringify(this.authService.token)
      }
    });
  }

}
