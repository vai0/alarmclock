import React from 'react'
import { convertSrcTimeToTwelveHour, convertFormattedToSrcTime, capitalize } from '../helpers.js'

var EditAlarmPage = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.alarmBeingEdited.id,
      time: {
        src: {
          hour: this.props.alarmBeingEdited.time.src.hour,
          minute: this.props.alarmBeingEdited.time.src.minute,
          second: this.props.alarmBeingEdited.time.src.second
        },
        formatted: {
          hour: this.props.alarmBeingEdited.time.formatted.hour,
          minute: this.props.alarmBeingEdited.time.formatted.minute,
          second: this.props.alarmBeingEdited.time.formatted.second,
          period: this.props.alarmBeingEdited.time.formatted.period
        }
      },
      days: {
        'sun': this.props.alarmBeingEdited.days['sun'],
        'mon': this.props.alarmBeingEdited.days['mon'],
        'tue': this.props.alarmBeingEdited.days['tue'],
        'wed': this.props.alarmBeingEdited.days['wed'],
        'thu': this.props.alarmBeingEdited.days['thu'],
        'fri': this.props.alarmBeingEdited.days['fri'],
        'sat': this.props.alarmBeingEdited.days['sat']
      },
      repeat: this.props.alarmBeingEdited.repeat,
      snooze: this.props.alarmBeingEdited.snooze,
      vibrate: this.props.alarmBeingEdited.vibrate,
      activated: this.props.alarmBeingEdited.activated
    }
  },
  _switchToggle: function(event) {
    var newState = {};
    var key = event.target.dataset.input;
    newState[key] = !this.state[key];
    this.setState(newState);
  },
  _selectDay: function(event) {
    var newDays = JSON.parse(JSON.stringify(this.state.days));
    var key = event.target.dataset.day;
    newDays[key] = !this.state.days[key];
    this.setState({
      days: newDays
    });
  },
  _onSave: function() {
    this.props._updateAlarm(this.state);
    this.props._closeEditAlarmPage();
  },
  _onDelete: function() {
    this.props._deleteAlarm(this.state.id);
    this.props._closeEditAlarmPage();
  },
  _changeHour: function(event) {
    var newTime = JSON.parse(JSON.stringify(this.state.time));
    if (this.props.settings.militarytime) {
      newTime.src.hour = parseInt(event.target.value);
      newTime.formatted = convertSrcTimeToTwelveHour(newTime.src.hour, newTime.src.minute, 0);
    } else {
      newTime.formatted.hour = parseInt(event.target.value);
      newTime.src = convertFormattedToSrcTime(newTime.formatted.hour, newTime.formatted.minute, 0, newTime.formatted.period);
    }
    this.setState({
      time: newTime
    });
  },
  _changeMinute: function(event) {
    var newTime = JSON.parse(JSON.stringify(this.state.time));
    newTime.formatted.minute = parseInt(event.target.value);
    newTime.src.minute = newTime.formatted.minute;
    this.setState({
      time: newTime
    });
  },
  _changePeriod: function(event) {
    var newTime = JSON.parse(JSON.stringify(this.state.time));
    newTime.formatted.period = event.target.value;
    newTime.src = convertFormattedToSrcTime(newTime.formatted.hour, newTime.formatted.minute, 0, event.target.value);
    this.setState({
      time: newTime
    });
  },
  _onClickRepeat: function() {
    this.setState({
      repeat: !this.state.repeat
    });
  },
  _renderDays: function() {
    if (this.state.repeat) {
      return (
        <div className="days">
          {Object.keys(this.state.days).map(function(key, index) {
            var dayClass = 'day';
            if (this.state.days[key]) dayClass += ' day-on';
            return <button data-day={key} className={dayClass} key={index} onClick={this._selectDay}>{capitalize(key)}</button>;
          }, this)}
        </div>
      )
    } else {
      return null;
    }
  },
  _renderTime: function() {
    if (this.props.settings.militarytime) {
      return (
        <div className="time">
          <input type="text" defaultValue={this.state.time.src.hour} onChange={this._changeHour}/>
          :<input type="text" defaultValue={this.state.time.src.minute} onChange={this._changeMinute}/>
        </div>
      );
    } else {
      return (
        <div className="time">
          <input type="text" defaultValue={this.state.time.formatted.hour} onChange={this._changeHour}/>
          :<input type="text" defaultValue={this.state.time.formatted.minute} onChange={this._changeMinute}/>
          <div className="period">
           <input type="radio" name="period" value="AM" checked={this.state.time.formatted.period === 'AM'} onChange={this._changePeriod} />AM
           <input type="radio" name="period" value="PM" checked={this.state.time.formatted.period === 'PM'} onChange={this._changePeriod} />PM
         </div>
        </div>
      );
    }
  },
  render: function() {
    return (
      <div className="EditAlarmPage">
        <button onClick={this.props._closeEditAlarmPage}>&#60;</button>
        <button onClick={this._onDelete}>Delete</button>
        <h1>Edit</h1>
        {this._renderTime()}
        Repeat: <input type="checkbox" defaultChecked={this.state.repeat} onClick={this._onClickRepeat} />
        {this._renderDays()}
        <div className="snooze">Snooze<input type="checkbox" data-input="snooze" defaultChecked={this.state.snooze} onChange={this._switchToggle}/></div>
        <div className="vibrate">Vibrate<input type="checkbox" data-input="vibrate" defaultChecked={this.state.vibrate} onChange={this._switchToggle}/></div>
        <button onClick={this._onSave}>Save</button>
      </div>
    )
  }
});

export default EditAlarmPage
