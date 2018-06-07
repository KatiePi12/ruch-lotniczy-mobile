import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ratings-language-edit',
  templateUrl: './ratings-language-edit.component.html',
  styleUrls: ['./ratings-language-edit.component.css']
})
export class RatingsLanguageEditComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  levelNames = ['3', '4', '5', '6', 'X'];
  ratingsLanguage = JSON.parse(localStorage.getItem('ratingsLanguage'));
  itemResource = new DataTableResource(this.ratingsLanguage);
  items = [];
  itemCount = 0;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsLanguageEditComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsLanguage = JSON.parse(localStorage.getItem('ratingsLanguage'));
        this.itemResource = new DataTableResource(this.ratingsLanguage);
        this.itemResource.count().then(count => this.itemCount = count);
        this.reloadItems({});
      }
    );
  }

  private _expireDateModel: NgbDateStruct;

  get expireDateModel(): NgbDateStruct {
    return this._expireDateModel;
  }

  set expireDateModel(value: NgbDateStruct) {
    this._expireDateModel = value;
  }

  ngOnInit(): void {
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  expireDateChanged(newObj: NgbDateStruct) {
    const dateString = newObj.year + '/' + newObj.month + '/' + newObj.day;
    const date: Date = new Date(Date.parse(dateString));

    if (this.items.length >= 1) {
      const element = this.items[0];
      if (element.language === 'J.ANGIELSKI') {
        element.expireDate = date;
      }
    }
  }

  public giveActualData() {
    return this.items;
  }
}
