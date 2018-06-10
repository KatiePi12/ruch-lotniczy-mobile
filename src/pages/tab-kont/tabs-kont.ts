import { Component } from '@angular/core';
import { HomePageDW } from '../home-dw/home-dw.component';
import {NavController} from "ionic-angular";
import {HomeComponent} from "../home/home.component";

@Component({
  templateUrl: 'tabs-kont.html'
})
export class TabsPageKont {

  home = HomePageDW;

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
