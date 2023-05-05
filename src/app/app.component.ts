import { Component, inject } from '@angular/core';
import { AppService } from './core/services/app.service';
import { delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { getSidebarLocked } from './core/state/core.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private readonly appService = inject(AppService);

  private readonly store = inject(Store);

  showSplashScreen$ = this.appService.showSplashScreen$.pipe(delay(0));

  sidebarLocked$ = this.store.select(getSidebarLocked).pipe(delay(0));

}
