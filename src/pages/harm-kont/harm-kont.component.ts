import {Component, OnInit} from '@angular/core';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';

@Component({
  selector: 'app-harm-kont',
  templateUrl: './harm-kont.component.html',
  // styleUrls: ['./harm-kont.component.css']
})
export class HarmKontComponent implements OnInit {
  step = 1;
  selectedSchedule;

  constructor() {
  }

  ngOnInit() {
  }

  getSelectedScheduleData($event) {
    this.selectedSchedule = $event;
    this.step = 2;
  }

  goBackToSelection() {
    this.step = 1;
  }
}
