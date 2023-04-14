import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_CONFIG } from '../model/app-config';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {

  private readonly title = inject(Title);

  private readonly appConfig = inject(APP_CONFIG);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      this.title.setTitle(`${this.appConfig.name}: ${title}`);
    }
  }

}
