import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Calendar } from '../pages/calendar/calendar';
import { HomePageDW } from '../pages/home-dw/home-dw.component';
import { TabsPageDW } from '../pages/tab-dw/tabs-dw';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthService} from "../services/auth.service";
import {ScheduleService} from "../services/schedule.service";
import {UserService} from "../services/user.service";
import {HttpModule} from "@angular/http";
import {UserSelectionTableComponent} from "../pages/tables/user-selection-table/user-selection-table.component";
// import {DataTableResource} from "angular-4-data-table-bootstrap-4";
import {DataTableModule} from 'angular5-data-table';
import {RatingsTableComponent} from "../pages/tables/ratings-table/ratings-table.component";
import {RatingsEndorsementsComponent} from "../pages/tables/ratings-endorsements/ratings-endorsements.component";
import {RatingsWExpireComponent} from "../pages/tables/ratings-wexpire/ratings-wexpire.component";
import {RatingsLanguageComponent} from "../pages/tables/ratings-language/ratings-language.component";
import {LoginComponent} from "../pages/login/login.component";
import {HomeComponent} from "../pages/home/home.component";
import {TabsPageKont} from "../pages/tab-kont/tabs-kont";

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    Calendar,
    HomePageDW,
    TabsPageDW,
    TabsPageKont,
    UserSelectionTableComponent,
    RatingsTableComponent,
    RatingsEndorsementsComponent,
    RatingsWExpireComponent,
    RatingsLanguageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    DataTableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Calendar,
    LoginComponent,
    HomeComponent,
    HomePageDW,
    TabsPageDW,
    TabsPageKont
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ScheduleService,
    UserService
  ]
})
export class AppModule {}
