import React from 'react'
import { convertSrcTimeToTwelveHour, convertFormattedToSrcTime, capitalize, setTwoDigit } from '../helpers.js'

// Xscroll objects
var hourScroll, minuteScroll, periodScroll;

// MutationObservers to detect changes to scroller
var hourObserver, minuteObserver, periodObserver;

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
  _changeHour: function(hour) {
    var newTime = JSON.parse(JSON.stringify(this.state.time));
    if (this.props.settings.militarytime) {
      newTime.src.hour = Math.round(hour);
      newTime.formatted = convertSrcTimeToTwelveHour(newTime.src.hour, newTime.src.minute, 0);
    } else {
      newTime.formatted.hour = Math.round(hour);
      newTime.src = convertFormattedToSrcTime(newTime.formatted.hour, newTime.formatted.minute, 0, newTime.formatted.period);
    }
    this.setState({
      time: newTime
    });
  },
  _changeMinute: function(minute) {
    var newTime = JSON.parse(JSON.stringify(this.state.time));
    newTime.formatted.minute = Math.round(minute);
    newTime.src.minute = newTime.formatted.minute;
    this.setState({
      time: newTime
    });
  },
  _changePeriod: function(period) {
    var newTime = JSON.parse(JSON.stringify(this.state.time));
    newTime.formatted.period = period;
    newTime.src = convertFormattedToSrcTime(newTime.formatted.hour, newTime.formatted.minute, 0, period);
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
  componentDidMount: function() {
    var self = this;
    var hourScrollPosition = self.props.settings.militarytime
      ? self.state.time.src.hour * 70
      : self.state.time.formatted.hour * 70 - 70;

    var periodScrollPosition = self.state.time.formatted.period === 'AM' ? 0 : 1;

    //initialize scroller objects
    seajs.config({
      base: "./node_modules/xscroll/build/cmd"
    });

    seajs.use(["simulate-scroll", "plugins/snap", "plugins/infinite"], function(XScroll, Snap, Infinite) {
      // poll for elements existence before creating XScroll objects with said elements
      (function scrollerElementsExist() {
        if (document.querySelector('.scroll-time-hour') && document.querySelector('.scroll-time-minute') && document.querySelector('.scroll-time-period')) {
          hourScroll = new XScroll({
            renderTo: ".scroll-time-hour",
            scrollbarY: false
          })
          var cellHeight = document.querySelector(".scroll-time-hour li").offsetHeight;
          hourScroll.plug(new Snap({
            snapHeight: cellHeight,
            autoStep: true,
            snapRowsNum: document.querySelectorAll(".scroll-time-hour li").length
          }));
          hourScroll.render();
          hourScroll.scrollTop(hourScrollPosition, 500, 'ease');

          minuteScroll = new XScroll({
            renderTo: ".scroll-time-minute",
            scrollbarY: false
          })
          var cellHeight = document.querySelector(".scroll-time-minute li").offsetHeight;
          minuteScroll.plug(new Snap({
            snapHeight: cellHeight,
            autoStep: true,
            snapRowsNum: document.querySelectorAll(".scroll-time-minute li").length
          }));
          minuteScroll.render();
          minuteScroll.scrollTop(self.state.time.formatted.minute * 70, 600, 'ease');

          if (!self.props.settings.militarytime) {
            periodScroll = new XScroll({
              renderTo: ".scroll-time-period",
              scrollbarY: false
            })
            var cellHeight = document.querySelector(".scroll-time-period li").offsetHeight;
            periodScroll.plug(new Snap({
              snapHeight: cellHeight,
              autoStep: true,
              snapRowsNum: document.querySelectorAll(".scroll-time-period li").length
            }));
            periodScroll.render();
            periodScroll.scrollTop(periodScrollPosition * 70, 1000, 'ease');
          }

          var hourObsTarget = document.querySelector(".scroll-time-hour .xs-container");
          hourObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              self._changeHour(self._getHourInput(70, hourScroll.getScrollTop()));
            });
          });
          var config = { attributes: true, childList: true, characterData: true };
          hourObserver.observe(hourObsTarget, config);

          var minuteObsTarget = document.querySelector(".scroll-time-minute .xs-container");
          minuteObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              self._changeMinute(self._getMinuteInput(70, minuteScroll.getScrollTop()));
            });
          });
          minuteObserver.observe(minuteObsTarget, config);

          var periodObsTarget = document.querySelector(".scroll-time-period .xs-container");
          periodObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              self._changePeriod(self._getPeriodInput(70, periodScroll.getScrollTop()));
            });
          });
          periodObserver.observe(periodObsTarget, config);
        } else {
          setTimeout(scrollerElementsExist, 5);
        }
      })();
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
  _getHourInput: function(cellHeight, scrollTop) {
    return !this.props.settings.militarytime
      ? (scrollTop + cellHeight) / cellHeight
      : scrollTop / cellHeight;
  },
  _getMinuteInput: function(cellHeight, scrollTop) {
    return scrollTop / cellHeight;
  },
  _getPeriodInput: function (cellHeight, scrollTop) {
    return scrollTop / cellHeight === 0 ? 'AM' : 'PM';
  },
  _renderTime: function() {
    var minHour = this.props.settings.militarytime ? 0 : 1;
    var maxHour = this.props.settings.militarytime ? 23 : 12;
    var hourOptions = [];
    var minuteOptions = [];
    var periodOptions = ['AM', 'PM'];
    for (var i = minHour; i <= maxHour; i++) {
      hourOptions.push(setTwoDigit(i));
    }
    for (var i = 0; i < 60; i++) {
      minuteOptions.push(setTwoDigit(i));
    }

    if (!this.props.settings.militarytime) {
      var periodScroller = (
        <div className="item scroll-time-period">
          <div className="glass-top"></div>
          <div className="glass-bottom"></div>
          <div className="filter"></div>
          <div className="scroller">
          <div className="xs-container">
            <ul className="xs-content">
              {periodOptions.map(function(period, index) {
                return <li key={index}>{period}</li>
              })}
            </ul>
          </div>
          </div>
        </div>
      );
    }
    return (
      <div className="scroll-time-container">
        <div className="item scroll-time-hour">
          <div className="glass-top"></div>
          <div className="glass-bottom"></div>
          <div className="filter"></div>
          <div className="scroller">
          <div className="xs-container">
            <ul className="xs-content">
              {hourOptions.map(function(hour) {
                return <li key={hour}>{hour}</li>;
              })}
            </ul>
          </div>
          </div>
        </div>
        <div className="semicolon">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="item scroll-time-minute">
          <div className="glass-top"></div>
          <div className="glass-bottom"></div>
          <div className="filter"></div>
          <div className="scroller">
          <div className="xs-container">
            <ul className="xs-content">
              {minuteOptions.map(function(minute) {
                return <li key={minute}>{minute}</li>
              })}
            </ul>
          </div>
          </div>
        </div>
        {periodScroller}
      </div>
    );
  },
  render: function() {
    if (this.props.showAddAlarmPage) {
      return (
        <paper-header-panel className="AddAlarmPage flex">
          <paper-toolbar>
            <paper-icon-button icon="chevron-left" onClick={this.props._closeAddAlarmPage}></paper-icon-button>
            <div className="title">New Alarm</div>
            <span className="flex"></span>
          </paper-toolbar>
          <div className="content">
            {this._renderTime()}
            <div className="toggle-block first-toggle-block">
              <div className="toggle-block-body">
                <div>Repeat</div>
              </div>
              <paper-toggle-button checked={this.state.repeat} onClick={this._onClickRepeat}></paper-toggle-button>
            </div>
            {this._renderDays()}
            <div className="toggle-block">
              <div className="toggle-block-body">
                <div>Snooze</div>
              </div>
              <paper-toggle-button data-input="snooze" checked={this.state.snooze} onClick={this._switchToggle}></paper-toggle-button>
            </div>
            <div className="toggle-block">
              <div className="toggle-block-body">
                <div>Vibrate</div>
              </div>
              <paper-toggle-button data-input="vibrate" checked={this.state.vibrate} onClick={this._switchToggle}></paper-toggle-button>
            </div>
            <button className="save-button shadow-4dp" onClick={this._onSave}>Save</button>
          </div>
        </paper-header-panel>
      )
    } else {
      return null;
    }
  }
});

export default AddAlarmPage
