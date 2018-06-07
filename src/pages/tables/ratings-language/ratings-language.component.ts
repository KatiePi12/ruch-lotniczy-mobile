import { Component, OnInit } from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-ratings-language',
  templateUrl: './ratings-language.component.html',
  // styleUrls: ['./ratings-language.component.css']
})
export class RatingsLanguageComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  ratingsLanguage = JSON.parse(localStorage.getItem('ratingsLanguage'));
  itemResource = new DataTableResource(this.ratingsLanguage);
  items = [];
  itemCount = 0;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsLanguageComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsLanguage = JSON.parse(localStorage.getItem('ratingsLanguage'));
        this.itemResource = new DataTableResource(this.ratingsLanguage);
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
