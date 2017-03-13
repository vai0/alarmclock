import reactPolymer from 'react-polymer'
import React from 'react'
import { capitalize, setTwoDigit } from '../helpers.js'

reactPolymer.registerAttribute('secondary');

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
      var dayString = '';
      Object.keys(this.props.alarm.days).forEach(function(key, index) {
        if (this.props.alarm.days[key]) {
          dayString += capitalize(key) + ', ';
        }
      }, this);
      return dayString.slice(0, dayString.length - 2);
    } else {
      return null;
    }
  },
  _renderTime: function() {
    return (this.props.settings.militarytime) ?
      setTwoDigit(this.props.alarm.time.src.hour) + ':' + setTwoDigit(this.props.alarm.time.src.minute) :
      setTwoDigit(this.props.alarm.time.formatted.hour) + ':' + setTwoDigit(this.props.alarm.time.formatted.minute) + ' ' + this.props.alarm.time.formatted.period;
  },
  render: function() {
    var activated = (this.props.alarm.activated) ? 'toggleOn' : 'toggleOff';
    return (
      <div className="AlarmElement stretch">
        <paper-item>
          <paper-item-body two-line data-alarmid={this.props.alarm.id} onClick={this.props._openEditAlarmPage}>
            <div>{this._renderTime()}</div>
            <div secondary>{this._renderDays()}</div>
          </paper-item-body>
          <paper-toggle-button checked={this.props.alarm.activated} id={this.props.alarm.id} onClick={this._toggleAlarmActivated}></paper-toggle-button>
        </paper-item>
        <paper-ripple></paper-ripple>
      </div>
    )
  }
});

export default AlarmElement
