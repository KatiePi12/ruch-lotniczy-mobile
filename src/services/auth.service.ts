import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {UserLoginCredentials} from '../models/user-login-credentials';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  public loginAction(userCredentials: UserLoginCredentials) {
    // const url = 'http://localhost:8080/auth';
    const url = 'https://ruchlotniczy-app.unicloud.pl/auth';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const loginData = {
      'login': userCredentials.login,
      'password': userCredentials.password
    };
    const body = JSON.stringify(loginData);
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json());
  }
}
