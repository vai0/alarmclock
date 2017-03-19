import reactPolymer from 'react-polymer'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import alarms from '../initial_data/alarms.json'
import settings from '../initial_data/settings.json'
import '../css/main.scss'
import prefixfree from 'prefixfree'
import 'webcomponentsjs/lite'

ReactDOM.render(
  <App alarms={alarms} settings={settings} />,
  document.getElementById('app')
);
