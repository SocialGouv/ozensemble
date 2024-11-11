import dayjs from "dayjs";

export const makeSureDate = (date) => {
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
};

export const makeSureTimestamp = (date) => {
  if (date instanceof Date) {
    return Date.parse(date);
  }
  try {
    return Date.parse(new Date(date));
  } catch (e) {
    console.log(e);
    console.log(date, "makeSureTimestamp");
    return date;
  }
};

export const dateWithoutTime = (inputDate, offset = 0) => {
  const date = makeSureDate(inputDate);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset, 0, 0, 0);
};

export const today = (offset = 0, withTime = false) => {
  if (withTime) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1);
  }
  return dateWithoutTime(new Date(), offset);
};

export const isToday = (inputDate) => {
  const date = dateWithoutTime(makeSureDate(inputDate));
  return Date.parse(date) === Date.parse(today());
};

export const differenceOfDays = (date1, date2) => {
  // Convert dates to start of day in local timezone to avoid DST issues
  const d1 = dayjs(date1).startOf('day');
  const d2 = dayjs(date2).startOf('day');
  return Math.abs(d1.diff(d2, 'day'));
};