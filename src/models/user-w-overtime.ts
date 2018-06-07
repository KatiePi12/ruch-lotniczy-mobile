import {SimpleUser} from './simple-user';

export class UserWOvertime {
  public id: string;
  public firstName: string;
  public lastName: string;
  public militaryRank: string;
  public role: string;
  public airportIcao: string;
  public overtimeHours: number;


  constructor(simpleUser: SimpleUser) {
    this.id = simpleUser.id;
    this.firstName = simpleUser.firstName;
    this.lastName = simpleUser.lastName;
    this.militaryRank = simpleUser.militaryRank;
    this.role = simpleUser.role;
    this.airportIcao = simpleUser.airport.airportICAO;
    this.overtimeHours = 0;
  }

  public static convertSimpleUserListToUserWOvertimeList(simpleUserList: SimpleUser[]): UserWOvertime[] {
    const userWOvertimeList: UserWOvertime[] = [];
    simpleUserList.forEach(simpleUser => {
      userWOvertimeList.push(new UserWOvertime(simpleUser));
    });
    return userWOvertimeList;
  }
}
