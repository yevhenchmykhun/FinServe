import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { AppService } from './app.service';
import { AuthToken } from '../model/auth-token';
import { VirtualTimeScheduler, of, scheduled, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { UserRole } from '../model/user-role.enum';

describe('AuthService', () => {
  let authService: AuthService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let appServiceSpy: jasmine.SpyObj<AppService>;
  let storageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: DataService,
          useValue: jasmine.createSpyObj('DataService', ['exchangeToken'])
        },
        {
          provide: AppService,
          useValue: jasmine.createSpyObj('AppService', ['showSplashScreen', 'hideSplashScreen'])
        },
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj('LocalStorageService', ['getObject', 'setObject'])
        }
      ]
    });

    authService = TestBed.inject(AuthService);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    appServiceSpy = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    storageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('handleWithToken', () => {

    it('should return token when token is present and is not expired', () => {
      const testToken: AuthToken = { name: 'test-name', expiresAt: Date.now() + 10000 };
      storageServiceSpy.getObject.and.returnValue(testToken);

      authService.getToken().subscribe(token => {
        expect(token).toEqual(testToken);
      });
    });

    it('should refresh token when token is not present and not currently being refreshed', () => {
      const newToken: AuthToken = { name: 'test-name-new', expiresAt: Date.now() + 10000 };

      const scheduler = new VirtualTimeScheduler();
      dataServiceSpy.exchangeToken.and.returnValue(scheduled([newToken], scheduler));
      storageServiceSpy.getObject.and.returnValue(null);

      authService.getToken().subscribe(token => {
        expect(token).toEqual(newToken);
      });

      expect(appServiceSpy.showSplashScreen).toHaveBeenCalledTimes(1);
      scheduler.flush();
      expect(dataServiceSpy.exchangeToken).toHaveBeenCalledTimes(1);
      expect(storageServiceSpy.setObject).toHaveBeenCalledTimes(1);
      expect(appServiceSpy.hideSplashScreen).toHaveBeenCalledTimes(1);
    });

    it('should refresh token when token is expired and not currently being refreshed', () => {
      const expiredToken: AuthToken = { name: 'test-name-expired', expiresAt: Date.now() - 10000 };
      const newToken: AuthToken = { name: 'test-name-new', expiresAt: Date.now() + 10000 };

      const scheduler = new VirtualTimeScheduler();
      dataServiceSpy.exchangeToken.and.returnValue(scheduled([newToken], scheduler));
      storageServiceSpy.getObject.and.returnValue(expiredToken);

      authService.getToken().subscribe(token => {
        expect(token).toEqual(newToken);
      });

      expect(appServiceSpy.showSplashScreen).toHaveBeenCalledTimes(1);
      scheduler.flush();
      expect(dataServiceSpy.exchangeToken).toHaveBeenCalledTimes(1);
      expect(storageServiceSpy.setObject).toHaveBeenCalledTimes(1);
      expect(appServiceSpy.hideSplashScreen).toHaveBeenCalledTimes(1);
    });

    it('should refresh token once when multiple calls are made while token is being refreshed', () => {
      const expiredToken: AuthToken = { name: 'test-name-expired', expiresAt: Date.now() - 10000 };
      const newToken: AuthToken = { name: 'test-name-new', expiresAt: Date.now() + 10000 };

      const scheduler = new VirtualTimeScheduler();
      dataServiceSpy.exchangeToken.and.returnValue(scheduled([newToken], scheduler));
      storageServiceSpy.getObject.and.returnValue(expiredToken);

      authService.getToken().subscribe(token => {
        expect(token).toEqual(newToken);
      });
      authService.getToken().subscribe(token => {
        expect(token).toEqual(newToken);
      });

      expect(appServiceSpy.showSplashScreen).toHaveBeenCalledTimes(1);
      scheduler.flush();
      expect(dataServiceSpy.exchangeToken).toHaveBeenCalledTimes(1);
      expect(appServiceSpy.hideSplashScreen).toHaveBeenCalledTimes(1);
    });

    it('should handle token exchange error', () => {
      const testError = new Error('Token exchange failed');
      const scheduler = new VirtualTimeScheduler();
      dataServiceSpy.exchangeToken.and.returnValue(scheduled(throwError(() => testError), scheduler));
      storageServiceSpy.getObject.and.returnValue(null);

      authService.getToken().subscribe({
        error: (error) => {
          expect(error).toBe(testError);
        }
      });

      expect(appServiceSpy.showSplashScreen).toHaveBeenCalledTimes(1);
      scheduler.flush();
      expect(dataServiceSpy.exchangeToken).toHaveBeenCalledTimes(1);
      expect(appServiceSpy.hideSplashScreen).toHaveBeenCalledTimes(1);
    });

  });

  describe('hasRoles', () => {

    beforeEach(() => {
      const testToken: AuthToken = {
        name: 'test-name',
        expiresAt: Date.now() + 10000,
        roles: [UserRole.user, UserRole.administrator]
      };
      storageServiceSpy.getObject.and.returnValue(testToken);
    });


    it('should return true for a user with a single role', () => {
      authService.hasRoles([UserRole.user]).subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return false for a user without a required role', () => {
      authService.hasRoles(['Support' as UserRole]).subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return true for a user with all required roles', () => {
      authService.hasRoles([UserRole.user, UserRole.administrator]).subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should return false for a user missing some of the required roles', () => {
      authService.hasRoles([UserRole.user, 'Support' as UserRole]).subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return false for a user with no roles', () => {
      const testToken: AuthToken = {
        name: 'test-name',
        expiresAt: Date.now() + 10000,
        roles: []
      };
      storageServiceSpy.getObject.and.returnValue(testToken);

      authService.hasRoles([UserRole.user]).subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return false for a user with undefined roles', () => {
      const testToken: AuthToken = {
        name: 'test-name',
        expiresAt: Date.now() + 10000
      };
      storageServiceSpy.getObject.and.returnValue(testToken);

      authService.hasRoles([UserRole.user]).subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return false when token is null', () => {
      spyOn(authService, 'getToken').and.returnValue(of(null));
      authService.hasRoles([UserRole.user]).subscribe(result => {
        expect(result).toBe(false);
      });
    });

  });

});
