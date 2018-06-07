import { Component, OnInit } from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-endorsements',
  templateUrl: './ratings-endorsements.component.html',
  // styleUrls: ['./ratings-endorsements.component.css']
})
export class RatingsEndorsementsComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingsEndorsements = JSON.parse(localStorage.getItem('ratingsEndorsements'));
  itemResource = new DataTableResource(this.ratingsEndorsements);
  items = [];
  itemCount = 0;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsEndorsementsComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsEndorsements = JSON.parse(localStorage.getItem('ratingsEndorsements'));
        this.itemResource = new DataTableResource(this.ratingsEndorsements);
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
