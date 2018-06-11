import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-table',
  templateUrl: './ratings-table.component.html',
  // styleUrls: ['./ratings-table.component.css']
})
export class RatingsTableComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratings = JSON.parse(localStorage.getItem('ratings'));
  itemResource = this.ratings;

  constructor() {
    RatingsTableComponent.updateUserStatus.subscribe(
      res => {
        this.ratings = JSON.parse(localStorage.getItem('ratings'));
        this.itemResource = this.ratings;
      }
    );
  }

  ngOnInit(): void {
  }
}
