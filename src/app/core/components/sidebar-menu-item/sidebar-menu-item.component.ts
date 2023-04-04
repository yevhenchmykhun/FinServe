import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.css'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ height: '0' }),
        animate('0.2s', style({ height: '*' }))
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate('0.2s', style({ height: '0' }))
      ])
    ])
  ]
})
export class SidebarMenuItemComponent implements OnInit {

  @Input()
  item!: MenuItem;

  expanded = false;

  private readonly router = inject(Router);

  get hasChildren(): boolean {
    return !!this.item.items;
  }

  ngOnInit(): void {
    if (this.hasChildren) {
      this.updateExpandedFromRoute();
    }
  }

  onClick(): void {
    this.expanded = !this.expanded;
  }

  private updateExpandedFromRoute(): void {
    this.expanded = this.router.isActive(this.item.routerLink, {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored'
    });
  }

}
