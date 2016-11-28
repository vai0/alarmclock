import React from 'react'

var AlarmElement = React.createClass({
  getInitialState: function() {
    return {
      editable: false
    }
  },
  _toggleAlarmActivated: function() {
    this.props._toggleAlarm(this.props.alarm.id);
  },
  _renderDays: function() {
    if (this.props.alarm.repeat) {
      return (
        <div className="days">
          {Object.keys(this.props.alarm.days).map(function(key, index) {
            if (this.props.alarm.days[key]) {
              return <span className="day" key={index}>{capitalize(key)}</span>;
            }
          }, this)}
        </div>
      )
    } else {
      return null;
    }
  },
  _renderTime: function() {
    return (this.props.settings.militarytime) ?
      <div className="time">{this.props.alarm.time.src.hour + ':' + setTwoDigit(this.props.alarm.time.src.minute)}</div> :
      <div className="time">{this.props.alarm.time.formatted.hour + ':' + setTwoDigit(this.props.alarm.time.formatted.minute) + ' ' + this.props.alarm.time.formatted.period}</div>;
  },
  render: function() {
    var activated = (this.props.alarm.activated) ? 'toggleOn' : 'toggleOff';
    return (
      <div className="AlarmElement">
        <div data-alarmid={this.props.alarm.id} onClick={this.props._openEditAlarmPage}>
          {this._renderTime()}
          {this._renderDays()}
        </div>
        <input type="checkbox" id={this.props.alarm.id} defaultChecked={this.props.alarm.activated} onClick={this._toggleAlarmActivated} />
      </div>
    )
  }
});

// Helpers
function setTwoDigit(number) {
  return (number < 10) ? '0' + number.toString() : number.toString();
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function convertDayToIndex(day) {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(day);
}

function convertIndextoDay(index) {
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][index];
}

function convertKelvinToFahrenheit(k) {
  return Math.round(9/5 * (k - 273) + 32);
}

function convertKelvinToCelsius(k) {
  return Math.round(k - 273);
}

function convertFormattedToSrcTime(hour, minute, second, period) {
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

function convertSrcTimeToTwelveHour(hour, minute, second) {
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

export default AlarmElement
