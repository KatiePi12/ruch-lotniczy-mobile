import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from "../../models/user";
import {SimpleUser} from "../../models/simple-user";
import {UserService} from "../../services/user.service";
import {RatingsTableComponent} from "../tables/ratings-table/ratings-table.component";
import {RatingsWExpireComponent} from "../tables/ratings-wexpire/ratings-wexpire.component";
import {RatingsEndorsementsComponent} from "../tables/ratings-endorsements/ratings-endorsements.component";
import {RatingsLanguageComponent} from "../tables/ratings-language/ratings-language.component";

interface OnInit {
  ngOnInit(): void
}

@Component({
  selector: 'app-home-dw',
  templateUrl: './home-dw.component.html',
  //check why dont see styles
  // styleUrls: ['./home-dw.component.scss']
})

export class HomePageDW implements OnInit {
  public  NOW_PLUS_THREE_MONTHS = new Date(Date.now() + 7889231490);
  public  CURRENT_TIME: Date = new Date(Date.now());
  private _userData: User;
  private _allUsersList: SimpleUser[];

  constructor(private userService: UserService, public navCtrl: NavController) { }

  //to mock data
  // ngOnInit() {
  //   console.log("Works");
  //   //musi byc new user bo nie dziala
  //   this._userData = new User();
  //   this._userData.id="testtest";
  //   this._userData.firstName="test";
  //   this._userData.lastName="test";
  //   this._userData.password="test";
  //   this._userData.systemRole="test";
  //   this._userData.role="test";
  //   this._userData.birthDate="test";
  //   this._userData.birthPlace="test";
  //   this._userData.available="test";
  //   this._userData.licenceId="test";
  //   this._userData.licenceType="test";
  //   this._userData.licenceComments="test";
  //   this._userData.militaryRank="test";
  //   this._userData.pesel="test";
  //   this._userData.fathersName="test";
  //   this._userData.entryDate="test";
  //   this._userData.milBaseNr="test";
  //   this._userData.milBaseName="test";
  //   this._userData.nis="test";
  //   this._userData.licenceExpireDate= new Date(2018, 11, 24, 10, 33, 30, 0);
  //   this._userData.medicalExpireDate= new Date(2017, 11, 24, 10, 33, 30, 0);
  // }

  ngOnInit() {
    // this.userService.getUserById(this.userService.getCurrentUserId())
    this.userService.getUserById("0015")
      .subscribe(
        (success) => {
          this._userData = success;
          localStorage.setItem('selectedUserData', JSON.stringify(this._userData));
          localStorage.setItem('ratings', JSON.stringify(this._userData.atc_ratings));
          localStorage.setItem('ratingsEndorsements', JSON.stringify(this._userData.atc_rating_endorsements));
          localStorage.setItem('ratingsWExpires', JSON.stringify(this._userData.atc_ratings_w_expires));
          localStorage.setItem('ratingsLanguage', JSON.stringify(this._userData.atc_ratings_languages));
        },
        (error) => {
          console.log(error);
        }
      );

    this.userService.getSimpleUsers().subscribe(
      (success) => {
        this._allUsersList = success;
        localStorage.setItem('simpleUsersList', JSON.stringify(success));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getSelectedUserData() {
    this.userService.getUserById(localStorage.getItem('selectedUserID'))
      .subscribe(
        (success) => {
          this._userData = success;
          localStorage.setItem('selectedUserData', JSON.stringify(this._userData));
          localStorage.setItem('ratings', JSON.stringify(this._userData.atc_ratings));
          localStorage.setItem('ratingsEndorsements', JSON.stringify(this._userData.atc_rating_endorsements));
          localStorage.setItem('ratingsWExpires', JSON.stringify(this._userData.atc_ratings_w_expires));
          localStorage.setItem('ratingsLanguage', JSON.stringify(this._userData.atc_ratings_languages));
          RatingsTableComponent.updateUserStatus.next(false);
          RatingsEndorsementsComponent.updateUserStatus.next(false);
          RatingsWExpireComponent.updateUserStatus.next(false);
          RatingsLanguageComponent.updateUserStatus.next(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getMinValueOfExpireDate(): Date {
    let minValue;
    for (const rating of this.userData.atc_ratings_w_expires) {
      if (rating.expireDate != null) {
        if (minValue == null) {
          minValue = rating.expireDate;
        } else if (rating.expireDate < minValue) {
          minValue = rating.expireDate;
        }
      }
    }
    return new Date(minValue);
  }

  getMinValueOfLanguage(): Date {
    let minValue;
    for (const rating of this.userData.atc_ratings_languages) {
      if (rating.expireDate != null) {
        if (minValue == null) {
          minValue = rating.expireDate;
        } else if (rating.expireDate < minValue) {
          minValue = rating.expireDate;
        }
      }
    }
    return new Date(minValue);
  }

  getMinValueOfOtp(): Date {
    let minValue;
    for (const rating of this.userData.atc_ratings_w_expires) {
      if (rating.otp != null) {
        if (minValue == null) {
          minValue = rating.otp;
        } else if (rating.otp < minValue) {
          minValue = rating.otp;
        }
      }
    }
    return new Date(minValue);
  }

  get userData(): User {
    return this._userData;
  }

  set userData(value: User) {
    this._userData = value;
  }

  get allUsersList(): SimpleUser[] {
    return this._allUsersList;
  }

  set allUsersList(value: SimpleUser[]) {
    this._allUsersList = value;
  }


}

