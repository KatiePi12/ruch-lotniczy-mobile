import {Component, Input, OnInit} from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';

@Component({
  selector: 'app-summary-overtime',
  templateUrl: './summary-overtime.component.html',
  styleUrls: ['./summary-overtime.component.css']
})
export class SummaryOvertimeComponent implements OnInit {

  @Input() schedule;
  @Input() currentEvents;
  itemResource;
  items = [];
  itemCount = 0;
  editedSchedule;

  constructor() {
  }

  ngOnInit() {
    console.log('summary');
    console.log(this.schedule);
    console.log('currentEvents');
    console.log(this.currentEvents);
    this.editedSchedule = JSON.parse(JSON.stringify(this.schedule));
    this.getRealWorkingHours(this.editedSchedule.userWOvertimeList);
    console.log(this.schedule.userWOvertimeList);
    this.itemResource = new DataTableResource(this.editedSchedule.userWOvertimeList);
    this.itemResource.count().then(count => this.itemCount = count);
  }

  getRealWorkingHours(userList) {
    userList.forEach(user => {
      user.realWorkingHours = 0;
      user.originalRealWorkingHours = 0;
      user.absencesHours = 0;
    });
    this.currentEvents.forEach(event => {
      const eventDuration = this.getEventDurationInHours(event);
      userList.forEach(user => {
        if (event.meta.userId === user.id) {
          user.realWorkingHours += eventDuration;
        }
      });
    });
    this.schedule.events.forEach(event => {
      const eventDuration = this.getEventDurationInHours(event);
      userList.forEach(user => {
        if (event.userId === user.id) {
          user.originalRealWorkingHours += eventDuration;
        }
      });
    });
    userList.forEach(user => {
      user.absencesHours = (user.originalRealWorkingHours - user.overtimeHours - 160) * (-1);
      user.overtimeHours = user.realWorkingHours - 160 + user.absencesHours;
    });
  }

  getEventDurationInHours(event) {
    const diff = new Date(event.end).getTime() - new Date(event.start).getTime();
    const diffInHours = Math.round(diff / 3600000);
    return diffInHours;
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

}
