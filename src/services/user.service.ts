import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {UserAuthResponse} from '../models/user-auth-response';
import {User} from '../models/user';

@Injectable()
export class UserService {
  BASE_URL = 'https://ruchlotniczy-app.unicloud.pl/';

  constructor(private http: Http) {
  }

  public getSimpleUsers() {
    // const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/users';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Bearer', currentUser.token);
    headers.append('Bearer',     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6Ymlnbmlldy5zYWwifQ.oRJe_nCHd7GVgYcyQkAHYRJin5rmbjOoxCZ6cgM5T7SFnnPfy6aDWE6ExCg__9kZmapXjl6fiVBGNl3rVKhAFQ")
    return this.http.get(url, {headers: headers})
      .map(response => response.json());
  }

  public getUserById(userId: string) {
    // const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/users/' + userId;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Bearer', currentUser.token);
    headers.append('Bearer',     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6Ymlnbmlldy5zYWwifQ.oRJe_nCHd7GVgYcyQkAHYRJin5rmbjOoxCZ6cgM5T7SFnnPfy6aDWE6ExCg__9kZmapXjl6fiVBGNl3rVKhAFQ"
    );
    return this.http.get(url, {headers: headers})
      .map(response => response.json());
  }

  public getCurrentUserId(): string {
    const user: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    return user.id;
  }

  public editUser(newUserData: User) {
    const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/users/edit';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Bearer', currentUser.token);
    return this.http.post(url, newUserData, {headers: headers})
      .map(response => response.json());
  }
}
