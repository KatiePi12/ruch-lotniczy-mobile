import {Component, OnInit} from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-table',
  templateUrl: './ratings-table.component.html',
  // styleUrls: ['./ratings-table.component.css']
})
export class RatingsTableComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratings = JSON.parse(localStorage.getItem('ratings'));
  itemResource = new DataTableResource(this.ratings);
  items = [];
  itemCount = 0;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsTableComponent.updateUserStatus.subscribe(
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

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

}
