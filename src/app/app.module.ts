import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LocalStorageService } from './core/services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    HttpClientModule,

    // App modules
    RoutingModule,
    CoreModule,

    // PrimeNG modules
    MessageModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LocalStorageService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
