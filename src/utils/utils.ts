import type{ DateRange } from "../types";


export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const isDateInRange = (date: Date, tempDates: DateRange): boolean => {
  if (!tempDates.start) return false;
  if (!tempDates.end) return date.getTime() === tempDates.start.getTime();
  
  const start = tempDates.start < tempDates.end ? tempDates.start : tempDates.end;
  const end = tempDates.start > tempDates.end ? tempDates.start : tempDates.end;
  
  return date >= start && date <= end;
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};
