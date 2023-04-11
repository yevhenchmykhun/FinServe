import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRolesDirective } from './directives/has-roles.directive';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HasRolesDirective,
    ElapsedTimePipe
  ],
  exports: [
    CommonModule,
    HasRolesDirective,
    ElapsedTimePipe
  ]
})
export class SharedModule { }
