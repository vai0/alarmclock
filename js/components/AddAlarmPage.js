import React from 'react'
import { convertSrcTimeToTwelveHour, convertFormattedToSrcTime, capitalize } from '../helpers.js'

var AddAlarmPage = React.createClass({
  getInitialState: function() {
    var currentHour = this.props.currentTime.src.hour;
    var currentMinute = this.props.currentTime.src.minute;
    var twelveHourTime = convertSrcTimeToTwelveHour(currentHour, currentMinute, 0);
    return {
      id: this.props._getAlarmCount(),
      time: {
        src: {
          hour: currentHour,
          minute: currentMinute,
          second: 0
        },
        formatted: twelveHourTime
      },
      days: {
        'sun': true,
        'mon': true,
        'tue': true,
        'wed': true,
        'thu': true,
        'fri': true,
        'sat': true
      },
      repeat: false,
      snooze: true,
      vibrate: false,
      activated: true
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
    this.props._addAlarm(this.state);
    this.props._closeAddAlarmPage();
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
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      id: nextProps._getAlarmCount()
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
    if (this.props.showAddAlarmPage) {
      return (
          <div className="AddAlarmPage">
            <button onClick={this.props._closeAddAlarmPage}>&#60;</button>
            <h1>New Alarm</h1>
            {this._renderTime()}
            Repeat: <input type="checkbox" defaultChecked={this.state.repeat} onClick={this._onClickRepeat} />
            {this._renderDays()}
            <div className="snooze">Snooze<input type="checkbox" data-input="snooze" defaultChecked={this.state.snooze} onChange={this._switchToggle}/></div>
            <div className="vibrate">Vibrate<input type="checkbox" data-input="vibrate" defaultChecked={this.state.vibrate} onChange={this._switchToggle}/></div>
            <button onClick={this._onSave}>Save</button>
          </div>
      )
    } else {
      return null;
    }
  }
});

export default AddAlarmPage
