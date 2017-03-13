export function setTwoDigit(number) {
  return (number < 10) ? '0' + number.toString() : number.toString();
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function convertDayToIndex(day) {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(day);
}

export function convertIndextoDay(index) {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][index];
}

export function convertKelvinToFahrenheit(k) {
  return Math.round(9/5 * (k - 273) + 32);
}

export function convertKelvinToCelsius(k) {
  return Math.round(k - 273);
}

export function convertFormattedToSrcTime(hour, minute, second, period) {
  var militaryHour = hour;
  if (period === 'PM') {
    militaryHour = (hour === 12) ? 12 : hour + 12;
  } else if (period === 'AM') {
    militaryHour = (hour === 12) ? 0 : hour;
  }
  return {
    hour: militaryHour,
    minute: minute,
    second: second
  }
}

export function convertSrcTimeToTwelveHour(hour, minute, second) {
  var newHour = hour;
  var period = 'AM';
  if (hour === 0) {
    newHour = 12;
  }
  if (hour > 12) {
    newHour = hour - 12;
    period = 'PM';
  }
  return {
    hour: newHour,
    minute: minute,
    second: second,
    period: period
  }
}
