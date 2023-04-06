import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarMenuItemComponent } from './components/sidebar-menu-item/sidebar-menu-item.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarMenuItemComponent,
    SplashScreenComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SplashScreenComponent
  ]
})
export class CoreModule { }
