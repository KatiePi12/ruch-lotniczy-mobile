import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-language',
  templateUrl: './ratings-language.component.html',
  // styleUrls: ['./ratings-language.component.css']
})
export class RatingsLanguageComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingsLanguage = JSON.parse(localStorage.getItem('ratingsLanguage'));
  itemResource = this.ratingsLanguage;

  constructor() {
    RatingsLanguageComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsLanguage = JSON.parse(localStorage.getItem('ratingsLanguage'));
        this.itemResource = this.ratingsLanguage;
      }
    );
  }

  ngOnInit(): void {
  }
}
