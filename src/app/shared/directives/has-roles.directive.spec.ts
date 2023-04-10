import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasRolesDirective } from './has-roles.directive';
import { Component, DebugNode } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { By } from '@angular/platform-browser';
import { UserRole } from 'src/app/core/model/user-role.enum';
import { of } from 'rxjs';

@Component({
  template: `
    <div *appHasRoles="roles1">Visible to admins only</div>
    <div *appHasRoles="roles2">Visible to users only</div>
    <div *appHasRoles="roles3">Visible to admins and users</div>
  `
})
class TestComponent {
  roles1 = [UserRole.administrator];
  roles2 = [UserRole.user];
  roles3 = [UserRole.administrator, UserRole.user];
 }

describe('HasRolesDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugNodes: DebugNode[];
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HasRolesDirective,
        TestComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['hasRoles'])
        }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.hasRoles.and.returnValue(of(true));

    fixture.detectChanges();
    debugNodes = fixture.debugElement.queryAllNodes(By.directive(HasRolesDirective));
  });

  it('should create an instance', () => {
    expect(debugNodes.length).toBe(3);
  });

  it('should check roles with AuthService', () => {
    expect(authServiceSpy.hasRoles).toHaveBeenCalledWith([UserRole.administrator]);
    expect(authServiceSpy.hasRoles).toHaveBeenCalledWith([UserRole.user]);
    expect(authServiceSpy.hasRoles).toHaveBeenCalledWith([UserRole.administrator, UserRole.user]);
    expect(authServiceSpy.hasRoles).toHaveBeenCalledTimes(3);
  });

});
