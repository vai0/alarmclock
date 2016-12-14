import React from 'react';
import AlarmPage from './AlarmPage.js';
import LocalStorageMixin from 'react-localstorage'

var App = React.createClass({
  mixins: [LocalStorageMixin],
  getInitialState: function() {
    return {
      alarms: this.props.alarms,
      settings: this.props.settings,
      currentTime: null,
      location: null,
      weather: null
    };
  },
  _startClock: function() {
    var time = new Date();
    var day = time.getDay();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var twelveHourTime = convertSrcTimeToTwelveHour(hour, minute, second);
    this.setState({
      currentTime: {
        src: {
          day: day,
          hour: hour,
          minute: minute,
          second: second
        },
        formatted: twelveHourTime
      }
    });
    console.log(day+':'+hour+':'+minute+':'+second);
    setTimeout(this._startClock, 1000);
  },
  _getLocation: function() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser, maybe use a pop-up and ask user for zipcode?');
    }
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.setState({
        location: {
          longitude: longitude,
          latitude: latitude
        }
      });
      this._getWeather(this.state.location.longitude, this.state.location.latitude);
    }
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message + '...falling back on default location value');
      this.setState({
        location: {
          longitude: '-121.876590',
          latitude: '37.383573'
        }
      });
      this._getWeather(this.state.location.longitude, this.state.location.latitude);
    }
    navigator.geolocation.getCurrentPosition(success.bind(this), error.bind(this));
  },
  _getWeather: function(longitude, latitude) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=11063795b43e3d923147da4c5f10100b', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) { //success
        this.setState({
          weather: JSON.parse(request.responseText)
        });
      } else { //reach server, but receive an error
        console.log('openweathermap API reached, but received status error: ', request.status);
      }
    }.bind(this);
    request.onerror = function() {
      console.log('openweathermap request - some sort of connection error occurred');
    };
    request.send();
  },
  _toggleAlarm: function(alarmid) {
    var newAlarms = this.state.alarms.map(function(alarm) {
      if (alarmid === alarm.id) alarm.activated = !alarm.activated;
      return alarm;
    });
    this.setState({
      alarms: newAlarms
    });
  },
  _addAlarm: function(newAlarm) {
    var newAlarms = this.state.alarms.slice();
    newAlarms.push(newAlarm);
    this.setState({
      alarms: newAlarms
    });
  },
  _updateAlarm: function(updatedalarm) {
    var newAlarms = this.state.alarms.map(function(alarm) {
      if (alarm.id === updatedalarm.id) {
        return updatedalarm;
      }
      return alarm;
    });
    this.setState({
      alarms: newAlarms
    });
  },
  _deleteAlarm: function(alarmid) {
    var newAlarms = this.state.alarms.filter(function(alarm) {
      return alarm.id !== alarmid;
    });
    this.setState({
      alarms: newAlarms
    });
  },
  _setTemperatureSetting: function(event) {
    var newSettings = JSON.parse(JSON.stringify(this.state.settings));
    var temp = event.target.dataset.temp;
    newSettings['temperature'] = temp;
    this.setState({
      settings: newSettings
    });
  },
  _setMilitaryTime: function(event) {
    var newSettings = JSON.parse(JSON.stringify(this.state.settings));
    newSettings['militarytime'] = !this.state.settings.militarytime;
    this.setState({
      settings: newSettings
    });
  },
  _getAlarmCount: function() {
    return this.state.alarms.length;
  },
  componentWillMount: function() {
    this._startClock();
    this._getLocation();
  },
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return nextState !== this.state;
  // },
  render: function() {
    return (
      <paper-material className="container" elevation="5">
        <AlarmPage alarms={this.state.alarms} weather={this.state.weather} settings={this.state.settings} _toggleAlarm={this._toggleAlarm} currentTime={this.state.currentTime} _updateAlarm={this._updateAlarm} _deleteAlarm={this._deleteAlarm} _toggleAlarm={this._toggleAlarm} _getAlarmCount={this._getAlarmCount} _addAlarm={this._addAlarm} _setTemperatureSetting={this._setTemperatureSetting} _setMilitaryTime={this._setMilitaryTime} />
      </paper-material>
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

export default App
