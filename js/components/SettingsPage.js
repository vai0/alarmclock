import React from 'react'

var SettingsPage = React.createClass({
  _setTemperatureSettingEvent: function(event) {
    this.props._setTemperatureSetting(event);
  },
  _renderTemperatureButton: function() {
    if (this.props.settings.temperature === 'c') {
      return (
        <span>
          <button data-temp="c" className="temperatureButton temp-on" onClick={this._setTemperatureSettingEvent}>&deg;C</button>
          <button data-temp="f" className="temperatureButton" onClick={this._setTemperatureSettingEvent}>&deg;F</button>
        </span>
      )
    } else if (this.props.settings.temperature === 'f') {
      return (
        <span>
          <button data-temp="c" className="temperatureButton" onClick={this._setTemperatureSettingEvent}>&deg;C</button>
          <button data-temp="f" className="temperatureButton temp-on" onClick={this._setTemperatureSettingEvent}>&deg;F</button>
        </span>
      )
    }
  },
  _setMilitaryTimeEvent: function(event) {
    this.props._setMilitaryTime(event);
  },
  render: function() {
    return (
      <div className="SettingsPage">
        <button onClick={this.props._closeSettingsPage}>&#60;</button>
        <h1>Settings</h1>
        <div className="militarytime">24-Hour Time<input type="checkbox" defaultChecked={this.props.settings.militarytime} onClick={this._setMilitaryTimeEvent}/></div>
        <div className="temperatureFormat">
          Temperature: {this._renderTemperatureButton()}
        </div>
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

export default SettingsPage
