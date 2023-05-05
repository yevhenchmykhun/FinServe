import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  templateUrl: './auto-trigger-setup.component.html'
})
export class AutoTriggerSetupComponent {

  items: MenuItem[] = [
    {
      label: 'Tasks',
      routerLink: 'tasks'
    },
    {
      label: 'Conditions',
      routerLink: 'conditions'
    },
    {
      label: 'Triggers',
      routerLink: 'triggers'
    }
  ];

}
