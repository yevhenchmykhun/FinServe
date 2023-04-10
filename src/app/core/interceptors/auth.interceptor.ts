import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { APP_CONFIG } from '../model/app-config';
import { AuthToken } from '../model/auth-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly appConfig = inject(APP_CONFIG);

  private readonly authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === this.appConfig.auth.api) {
      return next.handle(request);
    } else {
      return this.authService.getToken()
        .pipe(
          switchMap(token => next.handle(this.addAuthHeader(request, token)))
        );
    }
  }

  private addAuthHeader(request: HttpRequest<unknown>, token: AuthToken | null): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + JSON.stringify(token)
      }
    });
  }

}
