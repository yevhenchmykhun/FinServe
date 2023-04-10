import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { APP_CONFIG, AppConfig } from '../model/app-config';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthToken } from '../model/auth-token';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let appConfig: AppConfig;
  let http: HttpClient;
  let controller: HttpTestingController;

  const testToken: AuthToken = { name: 'test-name', expiresAt: Date.now() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthInterceptor,
        {
          provide: APP_CONFIG,
          useValue: { auth: { api: 'test-api' } }
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['getToken'])
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    appConfig = TestBed.inject(APP_CONFIG);
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should add Authorization header', () => {
    authServiceSpy.getToken.and.returnValue(of(testToken));

    http.get('test-url').subscribe();

    const testRequest = controller.expectOne('test-url');
    expect(testRequest.request.headers.get('Authorization')).toBe(
      'Bearer ' + JSON.stringify(testToken)
    );

    testRequest.flush(null);

    expect(authServiceSpy.getToken).toHaveBeenCalledTimes(1);
  });

  it('should not add Authorization header when request is auth request', () => {
    http.get(appConfig.auth.api).subscribe();

    const testRequest = controller.expectOne(appConfig.auth.api);
    expect(testRequest.request.headers.has('Authorization')).toBe(
      false
    );

    testRequest.flush(null);

    expect(authServiceSpy.getToken).not.toHaveBeenCalled();
  });

});
