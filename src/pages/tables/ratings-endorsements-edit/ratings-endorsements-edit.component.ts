import {Component, OnInit} from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {RatingsEndorsementsComponent} from '../ratings-endorsements/ratings-endorsements.component';
import {Subject} from 'rxjs/Subject';
import {RatingEndorsement} from '../../../models/rating-endorsement';

@Component({
  selector: 'app-ratings-endorsements-edit',
  templateUrl: './ratings-endorsements-edit.component.html',
  styleUrls: ['./ratings-endorsements-edit.component.css']
})
export class RatingsEndorsementsEditComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingNames = ['AIR', 'GMC', 'GMS', 'TWR', 'RAD', 'PAR', 'SRA'];
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

  reloadData() {
    this.itemResource = new DataTableResource(this.ratingsEndorsements);
    this.itemResource.count().then(count => this.itemCount = count);
    this.reloadItems({});
  }

  deleteAction(item: RatingEndorsement) {
    const index: number = this.ratingsEndorsements.indexOf(item);
    if (index !== -1) {
      this.ratingsEndorsements.splice(index, 1);
    }
    this.reloadData();
  }

  addRowAction() {
    const newRow = new RatingEndorsement();
    newRow.userId = JSON.parse(localStorage.getItem('selectedUserData')).id;
    this.ratingsEndorsements.push(newRow);
    this.reloadData();
  }

  public giveActualData() {
    return this.items;
  }
}
