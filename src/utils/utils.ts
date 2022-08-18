export const convertArrayToObject = (array: any[], key: string) => {
  const initialValue = {};

  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const addMinutes = (numOfMinutes: number, date = new Date()) => {
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
};

export const calculateRemainingFlightTimeInSeconds = (startDate: Date, endDate: Date) => {
  const remainingFlightTimeInMs = endDate.getTime() - new Date().getTime();

  return Math.floor(remainingFlightTimeInMs / 1000);
};

export const fancyTimeFormat = (duration: number) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};
