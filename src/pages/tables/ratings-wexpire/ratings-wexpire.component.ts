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
  itemResource = this.ratingsWExpires;

  constructor() {
    RatingsWExpireComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsWExpires = JSON.parse(localStorage.getItem('ratingsWExpires'));
        this.itemResource = this.ratingsWExpires;
      }
    );
  }

  ngOnInit(): void {
  }
}
