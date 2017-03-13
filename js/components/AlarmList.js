import React from 'react'
import AlarmElement from './AlarmElement.js'

var AlarmList = React.createClass({
  render: function() {
    return (
      <div className="AlarmList stretch">
        {this.props.alarms.map(function(alarm, index) {
          return (
            <AlarmElement alarm={alarm} settings={this.props.settings} data-alarmid={alarm.id} key={index} _getAlarmId={this.props._getAlarmId} _toggleAlarm={this.props._toggleAlarm} _closeEditAlarmPage={this.props._closeEditAlarmPage} _openEditAlarmPage={this.props._openEditAlarmPage}></AlarmElement>
          )
        }, this)}
      </div>
    )
  }
});

export default AlarmList
