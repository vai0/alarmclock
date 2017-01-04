import React from 'react'

var SettingsPage = React.createClass({
  _setTemperatureSettingEvent: function(event) {
    this.props._setTemperatureSetting(event);
  },
  _renderTemperatureButton: function() {
    if (this.props.settings.temperature === 'c') {
      return (
        <div className="toggle-block">
          <div className="toggle-block-body">
            <div>Temperature</div>
          </div>
          <button data-temp="c" className="temp-button temp-button-on" onClick={this._setTemperatureSettingEvent}>&deg;C</button>
          <button data-temp="f" className="temp-button" onClick={this._setTemperatureSettingEvent}>&deg;F</button>
        </div>
      );
    } else if (this.props.settings.temperature === 'f') {
      return (
        <div className="toggle-block">
          <div className="toggle-block-body">
            <div>Temperature</div>
          </div>
          <button data-temp="c" className="temp-button" onClick={this._setTemperatureSettingEvent}>&deg;C</button>
          <button data-temp="f" className="temp-button temp-button-on" onClick={this._setTemperatureSettingEvent}>&deg;F</button>
        </div>
      );
    }
  },
  _setMilitaryTimeEvent: function(event) {
    this.props._setMilitaryTime(event);
  },
  render: function() {
    return (
      <paper-header-panel className="SettingsPage flex">
        <paper-toolbar>
          <paper-icon-button icon="chevron-left" onClick={this.props._closeSettingsPage}></paper-icon-button>
          <div className="title">Settings</div>
          <span className="flex"></span>
        </paper-toolbar>
        <div className="content">
          <div className="toggle-block first-toggle-block">
            <div className="toggle-block-body">
              <div>24-Hour Time</div>
            </div>
            <paper-toggle-button checked={this.props.settings.militarytime} onClick={this._setMilitaryTimeEvent}></paper-toggle-button>
          </div>
          <div className="toggle-block">
            <div className="toggle-block-body">
              <div>Location Service</div>
            </div>
            <paper-toggle-button></paper-toggle-button>
          </div>
          {this._renderTemperatureButton()}
          <div className="toggle-block">
            <div className="toggle-block-body">
              <div>Terms and Conditions</div>
            </div>
          </div>
        </div>
      </paper-header-panel>
    )
  }
});

export default SettingsPage

// <div className="SettingsPage">
//   <button onClick={this.props._closeSettingsPage}>&#60;</button>
//   <h1>Settings</h1>
//   <div className="militarytime">24-Hour Time<input type="checkbox" defaultChecked={this.props.settings.militarytime} onClick={this._setMilitaryTimeEvent}/></div>
//   <div className="temperatureFormat">
//     Temperature: {this._renderTemperatureButton()}
//   </div>
// </div>
