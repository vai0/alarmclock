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

export default SettingsPage
