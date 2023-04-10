import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { UserRole } from '../model/user-role.enum';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['hasRoles'])
        }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when no roles are specified', () => {
    const route = new ActivatedRouteSnapshot();
    authGuard.canActivate(route).subscribe(result => {
      expect(result).toBe(true);
    });

    expect(authService.hasRoles).not.toHaveBeenCalled();
  });

  it('should allow access when user has the required roles', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: [UserRole.user, UserRole.administrator] };
    authService.hasRoles.and.returnValue(of(true));

    authGuard.canActivate(route).subscribe(result => {
      expect(result).toBe(true);
    });

    expect(authService.hasRoles).toHaveBeenCalledWith([UserRole.user, UserRole.administrator]);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to error page when user does not have the required roles', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: [UserRole.user, UserRole.administrator] };
    authService.hasRoles.and.returnValue(of(false));

    authGuard.canActivate(route).subscribe(result => {
      expect(result).toBe(false);
    });

    expect(authService.hasRoles).toHaveBeenCalledWith([UserRole.user, UserRole.administrator]);
    expect(router.navigate).toHaveBeenCalledWith(['/error'], {
      skipLocationChange: true,
      state: {
        message: 'Access denied'
      }
    });
  });

  it('should handle error when checking user roles and navigate to error page', () => {
    const route = new ActivatedRouteSnapshot();
    route.data = { roles: [UserRole.user, UserRole.administrator] };
    authService.hasRoles.and.returnValue(throwError(() => new Error('Test error')));

    authGuard.canActivate(route).subscribe(result => {
      expect(result).toBe(false);
    });

    expect(authService.hasRoles).toHaveBeenCalledWith([UserRole.user, UserRole.administrator]);
    expect(router.navigate).toHaveBeenCalledWith(['/error'], {
      skipLocationChange: true,
      state: {
        message: 'Failed to check user roles'
      }
    });
  });

});
