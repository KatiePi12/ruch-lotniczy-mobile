import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataTable, DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {RatingWExpires} from '../../../models/rating-w-expires';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ratings-wexpire-edit',
  templateUrl: './ratings-wexpire-edit.component.html',
  styleUrls: ['./ratings-wexpire-edit.component.css']
})
export class RatingsWexpireEditComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
  airportICAOs = ['EPCE', 'EPDA', 'EPDE', 'EPIR', 'EPKS', 'EPLY', 'EPLK', 'EPMB', 'EPMM', 'EPMI', 'EPPW',
    'EPOK', 'EPPR', 'EPRA', 'EPTM', 'EPSN'];
  ratingNames = ['PAR', 'CCA', 'ADI/TWR', 'ADI/AIR', 'ADI/GMC', 'ADI/RAD', 'APP', 'APS', 'APS/PAR', 'CCA', 'OJTI', 'STDI', 'TWR'];
  ratingsWExpires: RatingWExpires[] = JSON.parse(localStorage.getItem('ratingsWExpires'));
  itemResource = new DataTableResource(this.ratingsWExpires);
  items = [];
  itemCount = 0;

  @ViewChild(DataTable) ratingsWExpireTable: DataTable;
  private _expireDateModel: NgbDateStruct;
  private _otpDateModel: NgbDateStruct;

  constructor() {
    this.itemResource.count().then(count => this.itemCount = count);
    RatingsWexpireEditComponent.updateUserStatus.subscribe(
      res => {
        this.ratingsWExpires = JSON.parse(localStorage.getItem('ratingsWExpires'));
        this.itemResource = new DataTableResource(this.ratingsWExpires);
        this.itemResource.count().then(count => this.itemCount = count);
        this.reloadItems({});
      }
    );
  }


  get expireDateModel(): NgbDateStruct {
    return this._expireDateModel;
  }

  set expireDateModel(value: NgbDateStruct) {
    this._expireDateModel = value;
  }


  get otpDateModel(): NgbDateStruct {
    return this._otpDateModel;
  }

  set otpDateModel(value: NgbDateStruct) {
    this._otpDateModel = value;
  }

  ngOnInit(): void {
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  reloadData() {
    this.itemResource = new DataTableResource(this.ratingsWExpires);
    this.itemResource.count().then(count => this.itemCount = count);
    this.reloadItems({});
  }

  deleteAction(item: RatingWExpires) {
    const index: number = this.ratingsWExpires.indexOf(item);
    if (index !== -1) {
      this.ratingsWExpires.splice(index, 1);
    }
    this.reloadData();
  }

  addRowAction() {
    const newRow = new RatingWExpires();
    newRow.userId = JSON.parse(localStorage.getItem('selectedUserData')).id;
    this.ratingsWExpires.push(newRow);
    this.reloadData();
  }

  expireDateChanged(newObj: NgbDateStruct) {
    const dateString = newObj.year + '/' + newObj.month + '/' + newObj.day;
    const date: Date = new Date(Date.parse(dateString));

    this.ratingsWExpireTable.selectedRows.forEach(row => {
      row.item.expireDate = date;
    });
  }

  otpDateChanged(newObj: NgbDateStruct) {
    const dateString = newObj.year + '/' + newObj.month + '/' + newObj.day;
    const date: Date = new Date(Date.parse(dateString));

    this.ratingsWExpireTable.selectedRows.forEach(row => {
      row.item.otp = date;
    });
  }

  public giveActualData() {
    return this.items;
  }

}
