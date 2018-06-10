import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-endorsements',
  templateUrl: './ratings-endorsements.component.html',
  // styleUrls: ['./ratings-endorsements.component.css']
})
export class RatingsEndorsementsComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingsEndorsements = JSON.parse(localStorage.getItem('ratingsEndorsements'));
  itemResource = this.ratingsEndorsements;

  constructor() {
    RatingsEndorsementsComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsEndorsements = JSON.parse(localStorage.getItem('ratingsEndorsements'));
        this.itemResource = this.ratingsEndorsements;
      }
    );
  }

  ngOnInit(): void {
  }
}
