import {Airport} from './airport';
import {SimpleUser} from './simple-user';

export class SchedulePerioid {
  public airport: Airport;
  public startDate: Date;
  public endDate: Date;
  public simpleuserList: SimpleUser[];

  constructor() {
  }
}
