import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserLoginCredentials} from '../../models/user-login-credentials';
import {NavController} from "ionic-angular";
import {HomeComponent} from "../home/home.component";
// import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _userCredentials: UserLoginCredentials;
  private userData: any;
  private _loginErrorMessage;

  // constructor(private authService: AuthService, private router: Router) { }
  constructor(private authService: AuthService, public navCtrl: NavController) { }

  ngOnInit() {
    this.userCredentials = new UserLoginCredentials();
  }

  submit() {
    this.authService.loginAction(this._userCredentials)
      .subscribe(
        (success) => {
          this._loginErrorMessage = null;
            this.userData = success;
            localStorage.setItem('currentUser', JSON.stringify(this.userData));
            this._loginErrorMessage = null;
          this.loginErrorMessage = null;
          this.navCtrl.setRoot(HomeComponent);
        },
        (error) => {
          localStorage.removeItem('currentUser');
          this.loginErrorMessage = null;
          this._loginErrorMessage = 'Nieprawidłowy login/hasło';
        }
      );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submit();
    }
  }


  get userCredentials(): UserLoginCredentials {
    return this._userCredentials;
  }

  set userCredentials(value: UserLoginCredentials) {
    this._userCredentials = value;
  }

  get loginErrorMessage() {
    return this._loginErrorMessage;
  }

  set loginErrorMessage(value) {
    this._loginErrorMessage = value;
  }
}
