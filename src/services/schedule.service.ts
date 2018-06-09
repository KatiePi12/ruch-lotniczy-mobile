import {Injectable} from '@angular/core';
import {GenerateScheduleRequest} from '../models/generate-schedule-request';
import {Headers, Http} from '@angular/http';
import {UserAuthResponse} from '../models/user-auth-response';

@Injectable()
export class ScheduleService {
  BASE_URL = 'http://localhost:8080/schedule';
  //BASE_URL = 'https://ruchlotniczy-app.unicloud.pl/schedule';

  constructor(private http: Http) {
  }

  public generateSchedule() {
    let generateSchedulerRequest: GenerateScheduleRequest;

    const userListWOvertime = JSON.parse(localStorage.getItem('userListWOvertime'));
    const workingHours = JSON.parse(localStorage.getItem('workingHours'));
    const absences = JSON.parse(localStorage.getItem('absences'));
    generateSchedulerRequest = new GenerateScheduleRequest(userListWOvertime, workingHours, absences);

    // console.log(JSON.parse(JSON.stringify(generateSchedulerRequest)));

    const url = this.BASE_URL + '/generate';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('Bearer', currentUser.token);
    return this.http.post(url, generateSchedulerRequest, {headers: headers})
      .map(response => response.json());
  }

  public getScheduleById(id: number) {
    const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/' + id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Bearer', currentUser.token);
    return this.http.get(url, {headers: headers})
      .map(response => response.json());
  }

  public getAllSchedules() {
    const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/all';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Bearer', currentUser.token);
    return this.http.get(url, {headers: headers})
      .map(response => response.json());
  }

  public deleteSchedule(id: number) {
    const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/delete/' + id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Bearer', currentUser.token);
    return this.http.post(url, null, {headers: headers})
      .map(response => response.json());
  }

  public editSchedule(body) {
    const currentUser: UserAuthResponse = JSON.parse(localStorage.getItem('currentUser'));
    const url = this.BASE_URL + '/edit';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Bearer', currentUser.token);
    return this.http.post(url, body, {headers: headers})
      .map(response => response.json());
  }

}
