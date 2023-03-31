import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { HttpErrorHandlerService } from './http-error-handler.service';

describe('Service: Data', () => {

  let service: DataService;
  let httpTestingController: HttpTestingController;
  let httpErrorHandlerServiceSpy: jasmine.SpyObj<HttpErrorHandlerService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        {
          provide: HttpErrorHandlerService,
          useValue: jasmine.createSpyObj('HttpErrorHandlerService', ['createHandleError'])
        }
      ]
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpErrorHandlerServiceSpy = TestBed.inject(HttpErrorHandlerService) as jasmine.SpyObj<HttpErrorHandlerService>;
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });
});
