import React from 'react'
import { convertKelvinToCelsius, convertKelvinToFahrenheit, setTwoDigit } from '../helpers.js'
import AlarmSlider from './AlarmSlider.js'

var AlarmTriggeredPage = React.createClass({
  componentDidMount: function() {
    var numberOfDroplets = 60;
    var numberOfSnowflakes = 30;
    if (this.props.weather.currently.icon === 'rain') {
      for (var i = 0; i < numberOfDroplets; i++) {
        var left = parseInt(Math.random() * 100);
        var delay = Math.random().toFixed(3) * 3;
        var opacity = Math.random().toFixed(2) * 0.5;
        createDroplet({
          left: left,
          delay: delay,
          opacity: opacity
        });
      }
    } else if (this.props.weather.currently.icon === 'snow') {
      for (var i = 0; i < numberOfSnowflakes; i++) {
        var left = parseInt(Math.random() * 100);
        var size = Math.floor(Math.random() * 11 + 5);
        var delay = Math.random().toFixed(3) * 10;
        var snowFallDuration = Math.floor(Math.random() * 5 + 10);
        var snowDriftDuration = Math.floor(Math.random() * 4 + 4);
        var opacity = Math.random().toFixed(2) * 0.7;
        createSnowflake({
          left: left,
          size: size,
          delay: delay,
          snowFallDuration: snowFallDuration,
          snowDriftDuration: snowDriftDuration,
          opacity: opacity
        });
      }
    }
    function createDroplet(input) {
      var dropletContainer = document.querySelector('.droplet-container');
      dropletContainer.insertAdjacentHTML('afterbegin', '<div class="droplet"></div>');
      var droplet = dropletContainer.firstChild;
      droplet.style.left = input.left + '%';
      droplet.style['animation-delay'] = input.delay + 's';
      droplet.style.opacity = input.opacity;
    }
    function createSnowflake(input) {
      var snowflakeContainer = document.querySelector('.snowflake-container');
      snowflakeContainer.insertAdjacentHTML('afterbegin', '<div class="snowflake"></div>');
      var snowflake = snowflakeContainer.firstChild;
      snowflake.style.left = input.left + '%';
      snowflake.style.width = input.size + 'px';
      snowflake.style.height = input.size + 'px';
      snowflake.style['animation-delay'] = input.delay + 's';
      snowflake.style['animation-duration'] = input.snowFallDuration + 's, ' + input.snowDriftDuration + 's';
      snowflake.style.opacity = input.opacity;
    }
  },
  _onStop: function() {
    this.props._closeAlarmTriggeredPage();
    this._stopVibrate();
  },
  _renderTime: function() {
    return this.props.settings.militarytime
      ? <div className="currentTime">{setTwoDigit(this.props.currentTime.src.hour) + ':' + setTwoDigit(this.props.currentTime.src.minute)}</div>
      : <div className="currentTime">{setTwoDigit(this.props.currentTime.formatted.hour) + ':' + setTwoDigit(this.props.currentTime.formatted.minute) + ' ' + this.props.currentTime.formatted.period}</div>;
  },
  // table mapping darkSky api's icon key to the available backgrounds
  // temporary until I can design more weather backgrounds
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
    var weather = this.iconTable[this.props.weather.currently.icon];
    var weatherContainer;
    if (weather === 'clear-day') {
      weatherContainer = (
        <div className="weather-container clear-day">
          <div className="sun" />
          <div className="sun-ray r-one" />
          <div className="sun-ray r-two" />
          <div className="sun-ray r-three" />
          <div className="sun-ray r-four" />
          <div className="cloud">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
        </div>
      );
    } else if (weather === 'partly-cloudy') {
      weatherContainer = (
        <div className="weather-container partly-cloudy">
          <div className="cloudleft">
            <div className="circle c-one" />
            <div className="circle c-two" />
          </div>
          <div className="cloudbottom">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
            <div className="circle c-four" />
          </div>
          <div className="cloudright">
            <div className="circle c-one" />
          </div>
        </div>
      );
    } else if (weather === 'cloudy') {
      weatherContainer = (
        <div className="weather-container cloudy">
          <div className="cloud-one">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-two">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-three">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-four">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-five">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-six">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-seven">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-eight">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-nine">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-ten">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-eleven">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-twelve">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
        </div>
      );
    } else if (weather === 'rain') {
      weatherContainer = (
        <div className="weather-container rain">
          <div className="cloud-one">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
            <div className="circle c-four" />
          </div>
          <div className="cloud-two">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="cloud-three">
            <div className="circle c-one" />
            <div className="circle c-two" />
          </div>
          <div className="droplet-container" />
        </div>
      );
    } else if (weather === 'snow') {
      weatherContainer = (
        <div className="weather-container snow">
          <div className="cloud-one">
            <div className="circle c-one" />
            <div className="circle c-two" />
            <div className="circle c-three" />
          </div>
          <div className="snowflake-container" />
        </div>
      );
    }
    return weatherContainer;
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
  _vibrateInterval: null,
  _startVibrate: function() {
    if (window.navigator && window.navigator.vibrate) {
      this._vibrateInterval = setInterval(function() {
        navigator.vibrate(1620);
      }, 2700);
    } else {
      console.log('vibration API not supported in this browser')
    }
  },
  _stopVibrate: function() {
    if (this._vibrateInterval) clearInterval(this._vibrateInterval);
    navigator.vibrate(0);
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
          <AlarmSlider _onStop={this._onStop} _startVibrate={this._startVibrate} />
        </div>
        {this._renderAudio()}
      </div>
    )
  }
});

export default AlarmTriggeredPage
