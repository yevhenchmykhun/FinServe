import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { APP_CONFIG } from '../model/app-config';
import { AuthToken } from '../model/auth-token';
import { Report } from 'src/app/features/home/model/report';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly appConfig = inject(APP_CONFIG);

  private readonly http = inject(HttpClient);

  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);

  private readonly handleError = this.httpErrorHandlerService.createHandleError('DataService');

  exchangeToken(): Observable<AuthToken | null> {
    return this.http.get<AuthToken>(this.appConfig.auth.api)
      .pipe(
        catchError(this.handleError('getAuthToken', null))
      );
  }

  getBusinessDates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.appConfig.api}/business-dates`)
      .pipe(
        catchError(this.handleError('getBusinessDates', []))
      );
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.appConfig.api}/reports`)
      .pipe(
        catchError(this.handleError('getReports', []))
      );
  }

}
