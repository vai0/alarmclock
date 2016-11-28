import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'

//INITIAL DATA
var alarmsdata = '[{ "id": 0, "time": { "src": { "hour": 7, "minute": 30, "second": 0 }, "formatted": { "hour": 7, "minute": 30, "period": "AM", "second": 0 } }, "days": { "sun": false, "mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": false }, "repeat": true, "snooze": true, "vibrate": false, "activated": true }, { "id": 1, "time": { "src": { "hour": 22, "minute": 30, "second": 0 }, "formatted": { "hour": 10, "minute": 30, "period": "PM", "second": 0 } }, "days": { "sun": true, "mon": false, "tue": false, "wed": false, "thu": false, "fri": false, "sat": true }, "repeat": true, "snooze": true, "vibrate": false, "activated": false }]';
var settingsdata = '{"militarytime": false, "temperature": "f", "locationservice": true}';

ReactDOM.render(
  <App alarms={JSON.parse(alarmsdata)} settings={JSON.parse(settingsdata)} />,
  document.getElementById('app')
);
