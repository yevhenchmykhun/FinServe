import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { UserRole } from '../../model/user-role.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  hovered = false;

  locked = false;

  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/home',
      icon: PrimeIcons.HOME,
      state: {
        roles: [UserRole.user]
      }
    },
    {
      label: 'Admin',
      routerLink: '/admin',
      state: {
        roles: [UserRole.administrator]
      },
      items: [
        {
          label: 'ATS',
          routerLink: '/admin/ats',
          icon: 'pi pi-fw pi-cog',
          state: {
            roles: [UserRole.administrator]
          },
        }
      ]
    }
  ]

  onLockChange(): void {
    this.locked = !this.locked;
  }

}
