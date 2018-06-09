import {Component, EventEmitter, OnInit, Output} from '@angular/core';
//import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {DataTableResource} from "angular5-data-table";
import {User} from '../../../models/user';
import {RatingsTableComponent} from '../ratings-table/ratings-table.component';
import {RatingsEndorsementsComponent} from '../ratings-endorsements/ratings-endorsements.component';
import {RatingsWExpireComponent} from '../ratings-wexpire/ratings-wexpire.component';
import {RatingsLanguageComponent} from '../ratings-language/ratings-language.component';

@Component({
  selector: 'app-user-selection-table',
  templateUrl: './user-selection-table.component.html',
  // styleUrls: ['./user-selection-table.component.css']
})
export class UserSelectionTableComponent implements OnInit {
  @Output() userSelectionEvent = new EventEmitter();
  currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
  simpleUsersList = JSON.parse(localStorage.getItem('simpleUsersList'));
  itemResource = new DataTableResource(this.simpleUsersList);
  itemResource1 = this.simpleUsersList;
  items = [];
  itemCount = 0;

  constructor() {
    // this.rowColors = this.rowColors.bind(this);

    this.itemResource.count().then(count => this.itemCount = count);
  }

  ngOnInit(): void {
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  rowClick(itemId) {
    // localStorage.setItem('selectedUserID', event.row.item.id);
    localStorage.setItem('selectedUserID', itemId);

    RatingsTableComponent.updateUserStatus.next(true);
    RatingsEndorsementsComponent.updateUserStatus.next(true);
    RatingsWExpireComponent.updateUserStatus.next(true);
    RatingsLanguageComponent.updateUserStatus.next(true);
    this.userSelectionEvent.emit(null);
  }

  // rowColors(user) {
  //   if (user.id == this.yearLimit) return 'rgb(255, 255, 197)';
  // }

}
