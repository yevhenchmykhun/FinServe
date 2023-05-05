import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTriggerSetupComponent } from './auto-trigger-setup.component';

describe('AutoTriggerSetupComponent', () => {
  let component: AutoTriggerSetupComponent;
  let fixture: ComponentFixture<AutoTriggerSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoTriggerSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoTriggerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
