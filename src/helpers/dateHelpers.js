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
    console.log(date, 'makeSureTimestamp');
    return date;
  }
};

export const dateWithoutTime = (inputDate, offset = 0) => {
  const date = makeSureDate(inputDate);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset, 0, 0, 0);
};

export const dateWithTimeAndOffsetFromToday = (hours, minutes, offset) => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset, hours, minutes);
};

export const today = (offset = 0, withTime = false) => {
  if (withTime) {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1);
  }
  return dateWithoutTime(new Date(), offset);
};

export const dateIsBeforeOrToday = (inputDate) => {
  const date = dateWithoutTime(makeSureDate(inputDate));
  return Date.parse(date) <= Date.parse(today());
};

export const timeIsAfterNow = (inputDate) => {
  const date = makeSureDate(inputDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours > new Date().getHours()) return true;
  if (hours < new Date().getHours()) return false;
  if (minutes <= new Date().getMinutes()) return false;
  return true;
};

export const isToday = (inputDate) => {
  const date = dateWithoutTime(makeSureDate(inputDate));
  return Date.parse(date) === Date.parse(today());
};

export const datesAreEqual = (date1, date2) => {
  date1 = dateWithoutTime(makeSureDate(date1));
  date2 = dateWithoutTime(makeSureDate(date2));
  return Date.parse(date1) === Date.parse(date2);
};

export const firstDateIsBeforeSecondDate = (date1, date2) => {
  date1 = dateWithoutTime(makeSureDate(date1));
  date2 = dateWithoutTime(makeSureDate(date2));
  return Date.parse(date1) < Date.parse(date2);
};

export const msInDays = (timestamp) => timestamp / 1000 / 60 / 60 / 24;

export const differenceOfDays = (date1, date2) => {
  date1 = msInDays(Date.parse(dateWithoutTime(makeSureDate(date1))));
  date2 = msInDays(Date.parse(dateWithoutTime(makeSureDate(date2))));
  return date1 > date2 ? date1 - date2 : date2 - date1;
};

export const getTimestamp = (inputDate) => {
  const date = dateWithoutTime(makeSureDate(inputDate));
  return Date.parse(date);
};
