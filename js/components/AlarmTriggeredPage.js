import React from 'react'
import { convertKelvinToCelsius, convertKelvinToFahrenheit, setTwoDigit } from '../helpers.js'
import AlarmSlider from './AlarmSlider.js'

var AlarmTriggeredPage = React.createClass({
  _onStop: function() {
    this.props._closeAlarmTriggeredPage();
  },
  _renderTime: function() {
    return this.props.settings.militarytime
      ? <div className="currentTime">{setTwoDigit(this.props.currentTime.src.hour) + ':' + setTwoDigit(this.props.currentTime.src.minute)}</div>
      : <div className="currentTime">{setTwoDigit(this.props.currentTime.formatted.hour) + ':' + setTwoDigit(this.props.currentTime.formatted.minute) + ' ' + this.props.currentTime.formatted.period}</div>;
  },
  //temporary table mapping darkSky api's icon key to the available backgrounds
  iconTable: {
    'clear-day': 'clear-day',
    'clear-night': 'clear-day',
    'partly-cloudy-day': 'partly-cloudy',
    'partly-cloudy-night': 'partly-cloudy',
    'cloudy': 'cloudy',
    'rain': 'rain',
    'sleet': 'rain',
    'snow': 'snow',
    'wind': 'partly-cloudy',
    'fog': 'cloudy'
  },
  _renderWeather: function() {
    var weatherImage = {
      background: 'url("./images/' + this.iconTable[this.props.weather.currently.icon] + '.svg") no-repeat center center',
      backgroundSize: 'cover'
    };
    return <div style={weatherImage} className="weatherBackground"></div>;
  },
  _renderAudio: function() {
    var audioSrc = './audio/' + this.iconTable[this.props.weather.currently.icon] + '.mp3';
    return <audio id="weatherTrack" src={audioSrc} autoPlay loop></audio>;
  },
  _renderTemperature: function() {
    var temperature = this.props.settings.temperature == 'c'
      ? fahToCel(this.props.weather.currently.temperature)
      : Math.round(this.props.weather.currently.temperature);
    return <div className="temperature">{temperature}&deg;</div>
  },
  render: function() {
    return (
      <div className="AlarmTriggeredPage">
        <div className="topHalf">
          {this._renderWeather()}
          {this._renderTemperature()}
        </div>
        <div className="bottomHalf">
          {this._renderTime()}
          <div className="snoozeDescription">Tap to snooze</div>
          <AlarmSlider _onStop={this._onStop} />
        </div>
        {this._renderAudio()}
      </div>
    )
  }
});

export default AlarmTriggeredPage
