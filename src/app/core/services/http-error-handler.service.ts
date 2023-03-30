import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';

/**
 * Defines the signature of a function that handles HTTP errors.
 * @typeparam T - The type of the result that the error handler returns.
 */
export type HandleError = <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  private readonly messageService = inject(MessageService);

  /**
 * Creates a function that handles HTTP errors for a specific service.
 * @param serviceName - The name of the service to handle errors for.
 * @returns A function that handles HTTP errors.
 */
  createHandleError(serviceName = 'service'): HandleError {
    return <T>(operation: string = 'operation', result: T = {} as T) => this.handleError(serviceName, operation, result);
  }

  /**
 * Returns a function that handles an HTTP error, displays an error message, and return the default result.
 * @param serviceName - The name of the service that the error occurred in.
 * @param operation - The name of the operation that was being performed when the error occurred.
 * @param result - The default result to return when error happend.
 * @typeparam T - The type of the result that the error handler returns.
 * @returns A function that handles an HTTP error and returns an Observable.
 */
  private handleError<T>(serviceName: string, operation: string, result: T): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {

      // Determine the error message to display based on the error object.
      const message = (error.error instanceof ErrorEvent) ? error.error.message :
        `Server returned code ${error.status} with body [${error.error}]`;

      // Display the error message using the MessageService from PrimeNG.
      this.messageService.add({
        severity: 'error',
        summary: `${serviceName}: ${operation} failed`,
        detail: message
      });

      // Return the default result object wrapped in an Observable.
      return of(result);
    };
  }

}
