import React from 'react';
import EditAlarmPage from './EditAlarmPage.js';
import AddAlarmPage from './AddAlarmPage.js';
import SettingsPage from './SettingsPage.js';
import AlarmTriggeredPage from './AlarmTriggeredPage.js';
import AlarmList from './AlarmList.js';

var AlarmPage = React.createClass({
  getDefaultProps: function() {
    return {
      showEditAlarmPage: false,
      showAddAlarmPage: false,
      showSettingsPage: false,
      showAlarmTriggeredPage: false
    };
  },
  getInitialState: function() {
    return {
      showEditAlarmPage: this.props.showEditAlarmPage,
      showAddAlarmPage: this.props.showAddAlarmPage,
      showSettingsPage: this.props.showSettingsPage,
      showAlarmTriggeredPage: this.props.showAlarmTriggeredPage,
      alarmBeingEdited: {}
    };
  },
  _openEditAlarmPage: function(event) {
    var alarm = this.props.alarms.filter(function(alarm) {
      return alarm.id === parseInt(event.currentTarget.dataset.alarmid);
    })[0];
    this.setState({
      showEditAlarmPage: true,
      alarmBeingEdited: alarm
    });
  },
  _openAddAlarmPage: function() {
    this.setState({
      showAddAlarmPage: true
    });
  },
  _openSettingsPage: function() {
    this.setState({
      showSettingsPage: true
    });
  },
  _closeEditAlarmPage: function() {
    this.setState({
      showEditAlarmPage: false
    });
  },
  _closeAddAlarmPage: function() {
    this.setState({
      showAddAlarmPage: false
    });
  },
  _closeSettingsPage: function() {
    this.setState({
      showSettingsPage: false
    });
  },
  _closeAlarmTriggeredPage: function() {
    this.setState({
      showAlarmTriggeredPage: false
    });
  },
  componentWillReceiveProps: function(nextProps) {
    //trigger alarm when time's up
    this.props.alarms.forEach(function(alarm) {
      if (alarm.activated &&
        (alarm.time.src.hour === this.props.currentTime.src.hour) &&
        (alarm.time.src.minute === this.props.currentTime.src.minute) &&
        (alarm.time.src.second === this.props.currentTime.src.second) &&
        ((alarm.repeat === false) || (alarm.repeat === true && alarm.days[convertIndextoDay(this.props.currentTime.src.day)]))) {
        if (!alarm.repeat) {
          this.props._toggleAlarm(alarm.id);
        }
        this.setState({
          showEditAlarmPage: false,
          showAddAlarmPage: false,
          showSettingsPage: false,
          showAlarmTriggeredPage: true
        });
      }
    }, this);
  },
  render: function() {
    if (this.state.showEditAlarmPage) {
      return <EditAlarmPage settings={this.props.settings} alarmBeingEdited={this.state.alarmBeingEdited} _updateAlarm={this.props._updateAlarm} _deleteAlarm={this.props._deleteAlarm} _closeEditAlarmPage={this._closeEditAlarmPage} />
    }
    if (this.state.showAddAlarmPage) {
      return <AddAlarmPage settings={this.props.settings} currentTime={this.props.currentTime} _getAlarmCount={this.props._getAlarmCount} _addAlarm={this.props._addAlarm} showAddAlarmPage={this.state.showAddAlarmPage} _closeAddAlarmPage={this._closeAddAlarmPage} />
    }
    if (this.state.showSettingsPage) {
      return <SettingsPage settings={this.props.settings} _setTemperatureSetting={this.props._setTemperatureSetting} _setMilitaryTime={this.props._setMilitaryTime} _closeSettingsPage={this._closeSettingsPage}/>
    }
    if (this.state.showAlarmTriggeredPage) {
      return <AlarmTriggeredPage weather={this.props.weather} currentTime={this.props.currentTime} settings={this.props.settings} _closeAlarmTriggeredPage={this._closeAlarmTriggeredPage} />
    }
    return (
      <div className="AlarmPage">
        <h1>Wakey</h1>
        <AlarmList alarms={this.props.alarms} settings={this.props.settings} _getAlarmId={this._getAlarmId} _toggleAlarm={this.props._toggleAlarm} _closeEditAlarmPage={this._closeEditAlarmPage} _openEditAlarmPage={this._openEditAlarmPage} />
        <button onClick={this._openSettingsPage}>Settings</button>
        <button onClick={this._openAddAlarmPage}>&#43;</button>
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

export default AlarmPage
