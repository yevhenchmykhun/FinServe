import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ErrorComponent } from './features/error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './core/model/user-role.enum';

const routes: Routes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [UserRole.user]
    },
    loadChildren: () => import('./features/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    title: 'Error',
    path: 'error',
    component: ErrorComponent,
    loadChildren: () => import('./features/error/error.module')
      .then(m => m.ErrorModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
