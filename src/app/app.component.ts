import { Component, inject } from '@angular/core';
import { AppService } from './core/services/app.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private readonly appService = inject(AppService);

  showSplashScreen$ = this.appService.showSplashScreen$.pipe(delay(0));

}
