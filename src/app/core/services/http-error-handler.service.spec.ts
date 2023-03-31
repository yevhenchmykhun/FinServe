import { TestBed } from '@angular/core/testing';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from 'primeng/api';

describe('Service: HttpErrorHandler', () => {

  let service: HttpErrorHandlerService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorHandlerService,
        {
          provide: MessageService,
          useValue: jasmine.createSpyObj('MessageService', ['add'])
        }
      ]
    });

    service = TestBed.inject(HttpErrorHandlerService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should init', () => {
    expect(service).toBeTruthy();
  });
});
