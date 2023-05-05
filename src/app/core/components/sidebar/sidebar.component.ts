import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { UserRole } from '../../model/user-role.enum';
import { Store } from '@ngrx/store';
import { changeSidebarLocked, getSidebarLocked } from '../../state/core.reducer';
import { take } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  hovered = false;

  locked = false;

  private readonly store = inject(Store);

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
      label: 'Tableau Workbooks',
      routerLink: '/tableau-workbooks',
      icon: PrimeIcons.FILE,
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

  ngOnInit(): void {
    this.store.select(getSidebarLocked)
      .pipe(take(1))
      .subscribe(value => this.locked = value);
  }

  onLockChange(): void {
    this.locked = !this.locked;
    this.store.dispatch(changeSidebarLocked({ sidebarLocked: this.locked }));
  }

}
