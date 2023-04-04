import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { SidebarMenuItemComponent } from '../sidebar-menu-item/sidebar-menu-item.component';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar-menu-item',
  template: ''
})
class MockSidebarMenuItemComponent implements Partial<SidebarMenuItemComponent> {
  item!: MenuItem;
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        
      ],
      declarations: [
        SidebarComponent,
        MockSidebarMenuItemComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
