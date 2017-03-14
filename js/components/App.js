import React from 'react';
import AlarmPage from './AlarmPage.js';
import LocalStorageMixin from 'react-localstorage'
import { convertSrcTimeToTwelveHour } from '../helpers.js'

var App = React.createClass({
  mixins: [LocalStorageMixin],
  getInitialState: function() {
    var time = new Date();
    var day = time.getDay();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    return {
      alarms: this.props.alarms,
      settings: this.props.settings,
      currentTime: {
        src: {
          day: day,
          hour: hour,
          minute: minute,
          second: second
        },
        formatted: convertSrcTimeToTwelveHour(hour, minute, second)
      },
      location: null,
      weather: null
    };
  },
  componentWillMount: function() {
    var self = this;
    this.timerID = setInterval(function() {
      self._tick();
    }, 1000);
    this._getLocation();
  },
  componentWillUnmount: function() {
    clearInterval(this.timerID);
  },
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return nextState !== this.state;
  // },
  _tick: function() {
    var time = new Date();
    var day = time.getDay();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    this.setState({
      currentTime: {
        src: {
          day: day,
          hour: hour,
          minute: minute,
          second: second
        },
        formatted: convertSrcTimeToTwelveHour(hour, minute, second)
      }
    });
    console.log(day+':'+hour+':'+minute+':'+second);
    // setTimeout(this._startClock, 1000);
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
      console.warn('ERROR(' + err.code + '): ' + err.message + '...falling back on default location value: San Francisco');
      this.setState({
        location: {
          longitude: '37.7749',
          latitude: '122.4194'
        }
      });
      this._getWeather(this.state.location.longitude, this.state.location.latitude);
    }
    navigator.geolocation.getCurrentPosition(success.bind(this), error.bind(this));
  },
  _getWeather: function(longitude, latitude) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=11063795b43e3d923147da4c5f10100b', true);
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
  render: function() {
    return (
      <AlarmPage alarms={this.state.alarms} weather={this.state.weather} settings={this.state.settings} _toggleAlarm={this._toggleAlarm} currentTime={this.state.currentTime} _updateAlarm={this._updateAlarm} _deleteAlarm={this._deleteAlarm} _toggleAlarm={this._toggleAlarm} _getAlarmCount={this._getAlarmCount} _addAlarm={this._addAlarm} _setTemperatureSetting={this._setTemperatureSetting} _setMilitaryTime={this._setMilitaryTime} />
    )
  }
});

export default App
