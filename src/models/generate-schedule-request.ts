export class GenerateScheduleRequest {
  public userListWOvertime;
  public workingHours;
  public absences;

  constructor(userListWOvertime, workingHours, absences) {
    this.userListWOvertime = userListWOvertime;
    this.workingHours = workingHours;
    this.absences = absences;
  }
}
