import { Component, OnInit } from '@angular/core';
import {UserAuthResponse} from '../../models/user-auth-response';
import {NavController} from "ionic-angular";
import {LoginComponent} from "../login/login.component";
import {TabsPageDW} from "../tab-dw/tabs-dw";
import {TabsPageKont} from "../tab-kont/tabs-kont";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    console.log("home compo");
    if (this.isUserLogged()) {
      const user: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
      // DEVELOPMENT ENVIRONMENT ONLY
      //console.log(user.token);
      if (user.systemRole === 'SZEF_LOSRL') {
        this.navCtrl.setRoot(TabsPageDW);
      } else if (user.systemRole === 'KONTROLER') {
        this.navCtrl.setRoot(TabsPageKont);
      }
    }
  }

  isUserLogged() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.navCtrl.setRoot(LoginComponent);
    return false;
  }
}
