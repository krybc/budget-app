import { Component } from '@angular/core';
import {Settings} from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
    Settings.defaultZoneName = 'UTC';
  }
}
