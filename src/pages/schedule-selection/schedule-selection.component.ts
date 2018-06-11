import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataTableResource} from 'angular-4-data-table-bootstrap-4';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-schedule-selection',
  templateUrl: './schedule-selection.component.html',
  // styleUrls: ['./schedule-selection.component.css']
})
export class ScheduleSelectionComponent implements OnInit {

  isEditable: boolean;
  @Output() scheduleSelectionEvent = new EventEmitter();
  schedules;
  itemResource;
  items = [];
  itemCount = 0;
  selectedSchedule;

  constructor(private scheduleService: ScheduleService) {
    scheduleService.getAllSchedules().subscribe(success => {
      this.schedules = success;
      this.itemResource = new DataTableResource(this.schedules);
      this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems({});
    });
  }

  ngOnInit() {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (currentUser.systemRole === 'SZEF_LOSRL') {
    //   this.isEditable = true;
    // } else {
    //   this.isEditable = false;
    // }
    this.isEditable = false;
  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  reloadData() {
    this.scheduleService.getAllSchedules().subscribe(success => {
      this.schedules = success;
      this.itemResource = new DataTableResource(this.schedules);
      this.itemResource.count().then(count => this.itemCount = count);
      this.reloadItems({});
    });
  }

  deleteAction(item) {
    console.log('item to delete');
    console.log(item);
    const id: number = item.id;
    this.scheduleService.deleteSchedule(id).subscribe(success => {
      this.reloadData();
    }, error2 => {
      console.log(error2);
    });
  }

  selectAction(item) {
    this.selectedSchedule = item;
    this.scheduleSelectionEvent.emit({schedule: item});
  }

}
