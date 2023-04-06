import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRolesDirective } from './directives/has-roles.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HasRolesDirective
  ],
  exports: [
    CommonModule,
    HasRolesDirective
  ]
})
export class SharedModule { }
