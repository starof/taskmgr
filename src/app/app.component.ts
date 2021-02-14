import { animate, state, style, transition, trigger } from '@angular/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square', [
      state('green', style({ 'background-color': 'green','height':'100px','transform':'translateY(-100%)'  })),
      state('red', style({ 'background-color': 'red','height':'100px' ,'transform':'translateY(100%)'})),
      transition('green=>red', animate('.8s ease-in')),
      transition('red=>green', animate('.8s ease-out')),
    ])
  ]
})
export class AppComponent {
  squareState: string = '';
  darkTheme = false;
  constructor(private oc: OverlayContainer) {
  }

  switchTheme($event: any) {
    this.darkTheme = $event;
    const themeClass = this.darkTheme ? 'myapp-dark-theme' : '';
    this.oc.getContainerElement().classList.add(themeClass);
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }
}
