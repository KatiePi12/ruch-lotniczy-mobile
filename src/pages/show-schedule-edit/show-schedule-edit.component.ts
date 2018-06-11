import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  DAYS_OF_WEEK
} from 'angular-calendar';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {Subject} from 'rxjs/Subject';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {colors} from '../calendar-utils/colors';
import {PerioidFunctions} from '../calendar-utils/PerioidFunctions';
import {UserService} from '../../services/user.service';
import {SimpleUser} from '../../models/simple-user';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-show-schedule-edit',
  templateUrl: './show-schedule-edit.component.html',
  // styleUrls: ['./show-schedule-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ShowScheduleEditComponent implements OnInit {

  isEditable: boolean;
  @Input() selectedSchedule;

  schedule;
  editedSchedule;
  overtimeList;

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal: TemplateRef<any>;
  @ViewChild('summaryModal') summaryModal: TemplateRef<any>;
  view: any = 'month';

  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEditEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {

        this.handleDeleteEvent('Deleted', event);
      }
    }
  ];
  viewDate: Date = new Date();
  // locale = 'pl';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  refresh: Subject<any> = new Subject();
  minDate: Date;
  maxDate: Date;
  prevBtnDisabled = false;
  nextBtnDisabled = false;
  activeDayIsOpen = false;
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  currModal: NgbModalRef;
  usersList: SimpleUser[] = [];
  selectedUser: SimpleUser;
  dateToAddNewEvent;
  userToAddNewEvent;

  constructor(private modal: NgbModal, private userService: UserService, private scheduleService: ScheduleService) {
    this.dateOrViewChanged();
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.systemRole === 'SZEF_LOSRL') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
    this.schedule = this.selectedSchedule.schedule;
    if (this.isEditable) {
      this.events = this.convertToCalendarEvents(this.schedule.events);
    } else {
      this.events = this.convertToCalendarEventsNonEditable(this.schedule.events);
    }
    console.log(this.schedule);
    this.overtimeList = this.schedule.userWOvertimeList;
    this.minDate = new Date(this.schedule.startDate);
    this.maxDate = addDays(this.schedule.startDate, 27);

    this.userService.getSimpleUsers().subscribe(success => {
      this.usersList = success;
    });
    this.today();
  }


  increment(): void {
    this.changeDate(PerioidFunctions.addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(PerioidFunctions.subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  getHoursMinutesFromDate(startDate: Date, endDate: Date): string {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    let newStartDateMinutes: string = newStartDate.getMinutes().toString();
    if (newStartDateMinutes.length === 1) {
      newStartDateMinutes = '0' + newStartDateMinutes;
    }
    let newEndDateMinutes: string = newEndDate.getMinutes().toString();
    if (newEndDateMinutes.length === 1) {
      newEndDateMinutes = '0' + newEndDateMinutes;
    }

    const result = newStartDate.getHours() + ':' + newStartDateMinutes + '-' + newEndDate.getHours() + ':' + newEndDateMinutes;
    return result;
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    this.dateToAddNewEvent = date;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    event.title = this.getHoursMinutesFromDate(event.start, event.end) + ' ' + event.meta.userFirstName + ' ' + event.meta.userLastName;
    this.refresh.next();
  }

  handleEditEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    console.log(event);
    this.usersList.forEach(user => {
      if (event.meta.userId === user.id) {
        this.selectedUser = user;
      }
    });
    this.currModal = this.modal.open(this.modalContent, {size: 'lg'});
  }

  handleDeleteEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.currModal = this.modal.open(this.deleteConfirmationModal, {size: 'sm'});
  }


  showOvertimeSummary() {
    this.currModal = this.modal.open(this.summaryModal, {size: 'lg'});
  }

  deleteEvent(event) {
    this.events = this.events.filter(iEvent => iEvent !== event);
    this.currModal.close();
  }

  editEvent() {
    console.log(this.selectedUser);
    const selectedEvent = this.modalData.event;
    this.events.forEach(event => {
      if (event === selectedEvent) {
        event.meta = {
          userId: this.selectedUser.id,
          userFirstName: this.selectedUser.firstName,
          userLastName: this.selectedUser.lastName,
        };
        event.title = this.getHoursMinutesFromDate(event.start, event.end) + ' ' + event.meta.userFirstName + ' ' + event.meta.userLastName;
      }
    });
    this.currModal.close();
  }

  saveEditedSchedule() {
    console.log('schedule UserList przed zmianą');
    console.log(this.schedule.userWOvertimeList);

    this.editedSchedule = JSON.parse(JSON.stringify(this.schedule));
    console.log('this.editedSchedule');
    console.log(this.editedSchedule);
    this.getRealWorkingHours(this.editedSchedule.userWOvertimeList);


    this.editedSchedule.events = this.events;
    this.editedSchedule.events.forEach(event => {
      event.scheduleId = this.schedule.id;
      event.userId = event.meta.userId;
      event.userFirstName = event.meta.userFirstName;
      event.userLastName = event.meta.userLastName;
    });

    this.scheduleService.editSchedule(this.editedSchedule).subscribe(succ => {
        alert('Poprawnie zapisano zmiany');
        console.log(succ);
      },
      err => {
        alert('Wystąpił błąd');
        console.log(err);
      }
    );
  }

  getRealWorkingHours(userList) {
    userList.forEach(user => {
      user.realWorkingHours = 0;
      user.originalRealWorkingHours = 0;
      user.absencesHours = 0;
    });
    this.events.forEach(event => {
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

  addEvent(): void {
    if (this.userToAddNewEvent === null || this.dateToAddNewEvent === null) {
      return;
    }
    this.events.push({
      title: this.getHoursMinutesFromDate(startOfDay(this.dateToAddNewEvent), endOfDay(this.dateToAddNewEvent)) +
      ' ' + this.userToAddNewEvent.firstName + ' ' + this.userToAddNewEvent.lastName,
      start: startOfDay(this.dateToAddNewEvent),
      end: endOfDay(this.dateToAddNewEvent),
      actions: this.actions,
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      meta: {
        userId: this.userToAddNewEvent.id,
        userFirstName: this.userToAddNewEvent.firstName,
        userLastName: this.userToAddNewEvent.lastName,
      }
    });
    this.refresh.next();
  }

  dateIsValid(date: Date): boolean {
    return date >= startOfDay(this.minDate) && date <= endOfDay(this.maxDate);
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      PerioidFunctions.endOfPeriod(this.view, PerioidFunctions.subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      PerioidFunctions.startOfPeriod(this.view, PerioidFunctions.addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({body}: { body: CalendarMonthViewDay[] }): void {
    // disable days
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  private convertToCalendarEventsNonEditable(events): CalendarEvent[] {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    const result: CalendarEvent[] = [];
    events.forEach(event => {
      let selectedColor = colors.urlopColor;
      if (event.userId === currentUser.id) {
        selectedColor = colors.opiekaColor;
      }
      result.push({
        title: this.getHoursMinutesFromDate(event.start, event.end) + ' ' + event.userFirstName + ' ' + event.userLastName,
        start: event.start,
        end: event.end,
        actions: null,
        color: selectedColor,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false
        },
        meta: {
          userId: event.userId,
          userFirstName: event.userFirstName,
          userLastName: event.userLastName,
        }
      });
    });
    return result;
  }

  private convertToCalendarEvents(events): CalendarEvent[] {
    const result: CalendarEvent[] = [];
    events.forEach(event => {
      let selectedColor = colors.urlopColor;
      if (this.getHoursMinutesFromDate(event.start, event.end) === '6:00-6:00') {
        selectedColor = colors.opiekaColor;
      }
      result.push({
        title: this.getHoursMinutesFromDate(event.start, event.end) + ' ' + event.userFirstName + ' ' + event.userLastName,
        start: event.start,
        end: event.end,
        actions: this.actions,
        color: selectedColor,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        meta: {
          userId: event.userId,
          userFirstName: event.userFirstName,
          userLastName: event.userLastName,
        }
      });
    });
    return result;
  }

}
