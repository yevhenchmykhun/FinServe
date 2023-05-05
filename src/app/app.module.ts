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
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from './core/services/custom-title-strategy';
import { StoreModule } from '@ngrx/store';

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
    ToastModule,

    StoreModule.forRoot({}, {})
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'yyyy-MM-dd HH:mm:ss'
      }
    },
    LocalStorageService,
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
