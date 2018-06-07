import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {Rating} from '../../../models/rating';

@Component({
  selector: 'app-ratings-table-edit',
  templateUrl: './ratings-table-edit.component.html',
  styleUrls: ['./ratings-table-edit.component.css']
})
export class RatingsTableEditComponent implements OnInit {

  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingNames = ['ADV', 'ADI', 'APS', 'APP', 'CCA', 'OJTI', 'STDI'];
  ratings = JSON.parse(localStorage.getItem('ratings'));
  itemResource = new DataTableResource(this.ratings);
  items = [];
  itemCount = 0;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsTableEditComponent.updateUserStatus.subscribe(
      res => {
        this.ratings = JSON.parse(localStorage.getItem('ratings'));
        this.itemResource = new DataTableResource(this.ratings);
        this.itemResource.count().then(count => this.itemCount = count);
        this.reloadItems({});
      }
    );
  }

  ngOnInit(): void {
  }

  reloadItems(params?) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  reloadData() {
    this.itemResource = new DataTableResource(this.ratings);
    this.itemResource.count().then(count => this.itemCount = count);
    this.reloadItems({});
  }

  deleteAction(item: Rating) {
    const index: number = this.ratings.indexOf(item);
    if (index !== -1) {
      this.ratings.splice(index, 1);
    }
    this.reloadData();
  }

  addRowAction() {
    const newRow = new Rating();
    newRow.userId = JSON.parse(localStorage.getItem('selectedUserData')).id;
    this.ratings.push(newRow);
    this.reloadData();
  }

  public giveActualData() {
    return this.items;
  }

}

