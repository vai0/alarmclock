import React from 'react'
import { convertKelvinToCelsius, convertKelvinToFahrenheit, setTwoDigit } from '../helpers.js'
import AlarmSlider from './AlarmSlider.js'

var AlarmTriggeredPage = React.createClass({
  //weather conditions
  // < 600 is rain
  // 600 < x < 700 is snow
  // 800 is clear_day
  // 801 partly_cloudy
  // 802 <= x <= 804 overcast
  componentDidMount: function () {

  },
  _onStop: function() {
    this.props._closeAlarmTriggeredPage();
  },
  _renderTime: function() {
    if (this.props.settings.militarytime) {
      return <div className="currentTime">{setTwoDigit(this.props.currentTime.src.hour) + ':' + setTwoDigit(this.props.currentTime.src.minute)}</div>
    } else {
      return <div className="currentTime">{setTwoDigit(this.props.currentTime.formatted.hour) + ':' + setTwoDigit(this.props.currentTime.formatted.minute) + ' ' + this.props.currentTime.formatted.period}</div>
    }
  },
  _renderWeather: function() {
    var weatherImage = {
      background: 'url("./images/rain.png") no-repeat center center fixed',
      WebkitBackgroundSize: 'cover',
      MozBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      backgroundSize: 'cover'
    };
    var weatherConditionId = this.props.weather.weather[0].id;
    if (this.props.weather) {
      if (weatherConditionId < 600) {
        weatherImage.background = 'url("./images/rain.png") no-repeat center center';
      } else if (weatherConditionId < 700) {
        weatherImage.background = 'url("./images/snow.png") no-repeat center center';
      } else if (weatherConditionId === 800) {
        weatherImage.background = 'url("./images/clear_day.png") no-repeat center center';
      } else if (weatherConditionId === 801) {
        weatherImage.background = 'url("./images/partly_cloudy.png") no-repeat center center';
      } else if (weatherConditionId < 805) {
        weatherImage.background = 'url("./images/overcast.png") no-repeat center center';
      } else {
        console.log('weather id is invalid, check the API docs: http://openweathermap.org/weather-conditions weatherConditionId: ' + weatherConditionId);
      }
    } else {
      console.log('geolocation or weather data was not received when alarm triggered, will not display weather information.');
    }
    return <div style={weatherImage} className="weatherBackground"></div>;
  },
  _renderAudio: function() {
    var weatherConditionId = this.props.weather.weather[0].id;
    var audioPath = './audio/';
    var audioSrc;
    if (this.props.weather) {
      if (weatherConditionId < 600) {
        audioSrc = audioPath + "1.mp3";
      } else if (weatherConditionId < 700) {
        audioSrc = audioPath + "2.mp3";
      } else if (weatherConditionId === 800) {
        audioSrc = audioPath + "3.mp3";
      } else if (weatherConditionId === 801) {
        audioSrc = audioPath + "4.mp3";
      } else if (weatherConditionId < 805) {
        audioSrc = audioPath + "5.mp3";
      } else {
        console.log("weather id is invalid, check the API docs: http://openweathermap.org/weather-conditions weatherConditionId: ", weatherConditionId);
      }
    } else {
      console.log('will not display weather information. geolocation or weather data was not received when alarm triggered.');
    }
    return <audio id="weatherTrack" src={audioSrc} autoPlay loop></audio>;
  },
  _renderTemperature: function() {
    var temperature;
    if (this.props.settings.temperature === "c") {
      temperature = convertKelvinToCelsius(this.props.weather.main.temp);
    } else if (this.props.settings.temperature === "f") {
      temperature = convertKelvinToFahrenheit(this.props.weather.main.temp);
    } else {
      temperature = "something's not right...check this.props.settings.temperature";
    }
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
          <button onClick={this._onStop}>Stop</button>
          <AlarmSlider />
        </div>
        {this._renderAudio()}
      </div>
    )
  }
});

export default AlarmTriggeredPage
