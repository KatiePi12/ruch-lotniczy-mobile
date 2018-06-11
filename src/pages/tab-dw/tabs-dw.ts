import { Component } from '@angular/core';

import { Calendar } from '../calendar/calendar';
import { HomePageDW } from '../home-dw/home-dw.component';
import {NavController} from "ionic-angular";
import {HomeComponent} from "../home/home.component";

@Component({
  templateUrl: 'tabs-dw.html'
})
export class TabsPageDW {

  home = HomePageDW;
  calendar = Calendar;

  constructor(public navCtrl: NavController) {}

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ratings');
    localStorage.removeItem('ratingsEndorsements');
    localStorage.removeItem('ratingsWExpires');
    localStorage.removeItem('ratingsLanguage');
    localStorage.removeItem('simpleUsersList');
    localStorage.removeItem('selectedUserID');
    localStorage.removeItem('selectedUserData');
    localStorage.removeItem('workingHours');
    localStorage.removeItem('absences');
    localStorage.removeItem('userListWOvertime');
    this.navCtrl.setRoot(HomeComponent);
  }
}
