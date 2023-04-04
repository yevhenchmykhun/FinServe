import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

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
      icon: PrimeIcons.HOME
      
    },
    // {
    //   label: 'Admin',
    //   routerLink: '/admin',
    //   items: [
    //     {
    //       label: 'ATS',
    //       routerLink: '/admin/ats',
    //       icon: 'pi pi-fw pi-cog'
    //     }
    //   ]
    // }
  ]

  onLockChange(): void {
    this.locked = !this.locked;
  }

}
