import {Component, OnInit} from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {UserWOvertime} from '../../../models/user-w-overtime';
import {SimpleUser} from '../../../models/simple-user';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.css']
})
export class OvertimeComponent implements OnInit {
  public static setUserListWOvertimeToLocalStorage: Subject<boolean> = new Subject();
  items = [];
  itemCount = 0;
  userList: SimpleUser[] = JSON.parse(localStorage.getItem('simpleUsersList'));
  userListWOvertime: UserWOvertime[] = UserWOvertime.convertSimpleUserListToUserWOvertimeList(this.userList);
  itemResource = new DataTableResource(this.userListWOvertime);

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    OvertimeComponent.setUserListWOvertimeToLocalStorage.subscribe(res => {
      localStorage.setItem('userListWOvertime', JSON.stringify(this.userListWOvertime));
    });
  }

  ngOnInit() {
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }
}
