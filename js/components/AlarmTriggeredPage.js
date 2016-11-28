import React from 'react'

var AlarmTriggeredPage = React.createClass({
  //weather conditions
  // < 600 is rain
  // 600 < x < 700 is snow
  // 800 is clear_day
  // 801 partly_cloudy
  // 802 <= x <= 804 overcast
  _onStop: function() {
    this.props._closeAlarmTriggeredPage();
  },
  _renderTime: function() {
    if (this.props.settings.militarytime) {
      return <div className="currentTime">{this.props.currentTime.src.hour}:{this.props.currentTime.src.minute}</div>
    } else {
      return <div className="currentTime">{this.props.currentTime.formatted.hour}:{this.props.currentTime.formatted.minute + ' ' + this.props.currentTime.formatted.period}</div>
    }
  },
  _renderWeather: function() {
    var weatherImage;
    var weatherConditionId = this.props.weather.weather[0].id;
    if (this.props.weather) {
      if (weatherConditionId < 600) {
        weatherImage = <img src="./images/rain.png" />
      } else if (weatherConditionId < 700) {
        weatherImage = <img src="./images/snow.png" />
      } else if (weatherConditionId === 800) {
        weatherImage = <img src="./images/clear_day.png" />
      } else if (weatherConditionId === 801) {
        weatherImage = <img src="./images/partly_cloudy.png" />
      } else if (weatherConditionId < 805) {
        weatherImage = <img src="./images/overcast.png" />
      } else {
        weatherImage = <span>weather id is invalid, check the API docs: http://openweathermap.org/weather-conditions weatherConditionId: {weatherConditionId}</span>;
      }
    } else {
      console.log('geolocation or weather data was not received when alarm triggered, will not display weather information.');
    }
    return <div className="weatherImage">{weatherImage}</div>;
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
        <h1>Alarm Triggered Page</h1>
        {this._renderWeather()}
        {this._renderTemperature()}
        {this._renderTime()}
        {this._renderAudio()}
        <div className="triggerPageDescription">Tap to snooze</div>
        <button onClick={this._onStop}>Stop</button>
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

export default AlarmTriggeredPage
