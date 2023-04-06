import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { UserRole } from 'src/app/core/model/user-role.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective {

  private readonly templateRef = inject(TemplateRef);

  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly authService = inject(AuthService);

  @Input()
  set appHasRoles(roles: UserRole[]) {
    this.authService.hasRoles(roles)
      .subscribe(hasRoles => {
        this.viewContainerRef.clear();
        if (hasRoles) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }

}
