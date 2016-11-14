function Alarm(time, days, snooze, vibrate) {
  this.time = time;
  this.days = days;
  this.snooze = snooze;
  this.vibrate = vibrate;
}

var JSONdata = '[{"time":{"hour":7,"minute":30},"days":{"sun":false,"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":false},"snooze":true,"vibrate":false},{"time":{"hour":10,"minute":0},"days":{"sun":true,"mon":false,"tue":false,"wed":false,"thu":false,"fri":false,"sat":true},"snooze":true,"vibrate":false}]';

var data = JSON.parse(JSONdata);
