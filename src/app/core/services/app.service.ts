import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly showSplashScreen$ = new Subject<boolean>();

  showSplashScreen(): void {
    this.showSplashScreen$.next(true);
  }

  hideSplashScreen(): void {
    this.showSplashScreen$.next(false);
  }

}
