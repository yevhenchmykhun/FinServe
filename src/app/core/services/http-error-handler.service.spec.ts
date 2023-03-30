import { TestBed } from '@angular/core/testing';
import { HttpErrorHandlerService } from './http-error-handler.service';

describe('Service: HttpErrorHandler', () => {

  let service: HttpErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorHandlerService]
    });

    service = TestBed.inject(HttpErrorHandlerService);
  });

  it('should init', () => {
    expect(service).toBeTruthy();
  });
});
