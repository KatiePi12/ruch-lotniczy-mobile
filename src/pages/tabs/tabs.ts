import { Component } from '@angular/core';

import { Calendar } from '../calendar/calendar';
import { HomePage } from '../home/home-dw.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home = HomePage;
  calendar = Calendar;

  constructor() {

  }
}
