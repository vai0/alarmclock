import React from 'react'
import Dragdealer from 'dragdealer'

var AlarmSlider = React.createClass({
  componentDidMount: function() {
    this._createSlider();
  },
  _createSlider: function() {
    var handle = document.querySelector('.handle');
    var handleContainer = document.querySelector('.handle-container');
    var ringer = document.querySelector('.ringer-icon');
    var path = document.querySelector('.path');
    var pathContainer = document.querySelector('.path-container');
    var self = this;

    var handlePosition;
    var slider = new Dragdealer('slider', {
      steps: 2,
      speed: .3,
      animationCallback: function(x, y) {
        handlePosition = x;
        path.style.left = x * (pathContainer.offsetWidth - handle.offsetWidth) + 'px';
        if (x < 1) {
          this.setValue(0, 0);
        }
      },
      dragStartCallback: function(x, y) {
        handleContainer.classList.remove('scale');
        handle.classList.add('press');
        handle.classList.remove('raise');
        innerRipple.classList.remove('ripple-out-in');
        innerRipple.style.display = 'none';
        outerRipple.classList.remove('ripple-out');
        outerRipple.style.display = 'none';
      },
      dragStopCallback: function(x, y) {
        if (handlePosition < 1) {
          handle.classList.remove('press');
          ringer.classList.remove('shake');
          void ringer.offsetWidth;
          ringer.classList.add('shake');
          handle.classList.add('raise');
          handleContainer.classList.add('scale');
          innerRipple.classList.add('ripple-out-in');
          innerRipple.style.display = 'block';
          outerRipple.style.display = 'block';
          outerRipple.classList.add('ripple-out');
        } else if (handlePosition === 1) {
          ringer.classList.remove('shake');
        }
      }
    });
  },
  render: function() {
    return (
      <div className="AlarmSlider">
        <div id="slider">
          <div className="path-container"><span className="path"></span></div>
          <div className="end-well">
            <span className="x"></span>
          </div>
          <div className="handle-container scale">
            <span className="outer-ripple ripple-out"></span>
            <div className="handle raise">
              <span className="inner-ripple ripple-out-in"></span>
              <span className="clock-icon"></span>
              <span className="ringer-icon shake"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default AlarmSlider
