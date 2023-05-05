import { Component, inject } from '@angular/core';
import { AppService } from './core/services/app.service';
import { delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { getSidebarLocked } from './core/state/core.reducer';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private readonly appService = inject(AppService);

  private readonly store = inject(Store);

  private readonly filterService = inject(FilterService);

  showSplashScreen$ = this.appService.showSplashScreen$.pipe(delay(0));

  sidebarLocked$ = this.store.select(getSidebarLocked).pipe(delay(0));

  constructor() {
    this.filterService.register('epochIs', this.comparator((value, filter) => value === filter));
    this.filterService.register('epochIsNot', this.comparator((value, filter) => value !== filter));
    this.filterService.register('epochBefore', this.comparator((value, filter) => value < filter));
    this.filterService.register('epochAfter', this.comparator((value, filter) => value > filter));
  }

  private comparator(fn: (value: number, filter: number) => boolean): Function {
    return (value: number, filter: Date) => {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return fn(Math.floor(value / 1000), Math.floor(filter.getTime() / 1000));
    }
  }

}
