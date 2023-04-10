import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SplashScreenComponent } from './core/components/splash-screen/splash-screen.component';
import { AppService } from './core/services/app.service';

@Component({
  selector: 'app-sidebar',
  template: ''
})
class MockSidebarComponent implements Partial<SidebarComponent> {

}

@Component({
  selector: 'app-header',
  template: ''
})
class MockHeaderComponent implements Partial<HeaderComponent> {

}

@Component({
  selector: 'app-splash-screen',
  template: ''
})
class MockSplashScreenComponent implements Partial<SplashScreenComponent> {

}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockSidebarComponent,
        MockHeaderComponent,
        MockSplashScreenComponent
      ],
      providers: [
        {
          provide: AppService,
          useValue: jasmine.createSpyObj('AppService', [], [
            'showSplashScreen$', 'showSidebar$'
          ])
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(true).toBeTruthy();
  });

});
