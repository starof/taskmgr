import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;
  constructor(private oc: OverlayContainer) {
  }

  switchTheme($event: any) {
    this.darkTheme = $event;
    const themeClass = this.darkTheme ? 'myapp-dark-theme' : '';
    this.oc.getContainerElement().classList.add(themeClass);
  }
}
