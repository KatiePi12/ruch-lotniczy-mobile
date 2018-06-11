import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks
} from 'date-fns';

type CalendarPeriodType = 'day ' | 'week' | 'month';

export class PerioidFunctions {
  constructor() {
  }

  public static addPeriod(period: CalendarPeriodType, date: Date, amount: number): Date {
    return {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[period](date, amount);
  }

  public static subPeriod(period: CalendarPeriodType, date: Date, amount: number): Date {
    return {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[period](date, amount);
  }

  public static startOfPeriod(period: CalendarPeriodType, date: Date): Date {
    return {
      day: startOfDay,
      week: startOfWeek,
      month: startOfMonth
    }[period](date);
  }

  public static endOfPeriod(period: CalendarPeriodType, date: Date): Date {
    return {
      day: endOfDay,
      week: endOfWeek,
      month: endOfMonth
    }[period](date);
  }
}
