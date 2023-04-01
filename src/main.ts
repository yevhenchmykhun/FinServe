import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/core/app-config';
import { Provider } from '@angular/core';


fetch('./config/app.conf.json')
  .then(response => response.json())
  .then(config => {

    const appConfigProvider: Provider = {
      provide: APP_CONFIG,
      useValue: config
    }

    platformBrowserDynamic([appConfigProvider])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
