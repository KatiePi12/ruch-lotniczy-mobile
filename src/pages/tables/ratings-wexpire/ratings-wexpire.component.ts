import { Component, OnInit } from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-wexpire',
  templateUrl: './ratings-wexpire.component.html',
  // styleUrls: ['./ratings-wexpire.component.css']
})
export class RatingsWExpireComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingsWExpires = JSON.parse(localStorage.getItem('ratingsWExpires'));
  itemResource = new DataTableResource(this.ratingsWExpires);
  items = [];
  itemCount = 0;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsWExpireComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsWExpires = JSON.parse(localStorage.getItem('ratingsWExpires'));
        this.itemResource = new DataTableResource(this.ratingsWExpires);
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
