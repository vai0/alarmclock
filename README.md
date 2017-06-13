# Wakey Alarm Clock

An alarm clock app with weather forecasts meant to be used on your phone. This project was designed by [Xiaotong Yuchi](http://www.xiaotongyuchi.com/wakeyalarm).

The design was intended to be built on the iOS or Android platform. However, I wanted to challenge myself by building a dynamic web application that relies entirely on managing all logic, data, and the view locally.

#### Goals for this project:
- Performant. Must feel like a native app.
- Responsive. UI shouldn't break on mobile devices

#### To-Do:
- separate time-wheel into its own component, eliminating duplication across EditAlarmPage and AddAlarmPage
- split up scss file
- setup react router
- look into creating a [progressive web app](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)
- create splash screen
- highlight time-wheel to pink on tap
- add on-hover effects to buttons
- add transitions between pages
- add animation to open/close days container
- align Wakey title


#### To build:
1. Compile with webpack
2. Install [vulcanize](https://www.npmjs.com/package/vulcanize)
3. Run 
```
vulcanize indexsource.html > index.html
```
#### Known Issues:
- Audio will not autoplay when the alarm is triggered on mobile. No workaround. Reason is autoplay attribute is disabled on mobile browsers. [Link](http://stackoverflow.com/questions/26066062/autoplay-html5-audio-player-on-mobile-browsers). Wish I'd known this before I started the project :(

<br>

__[Live Demo](https://justinchi.me/alarmclock)__

__Libraries:__ React, Polymer, [react-polymer](https://www.npmjs.com/package/react-polymer), [react-localstorage](https://github.com/STRML/react-localstorage), [XScroll](http://xscroll.github.io/), [Prefixfree](https://leaverou.github.io/prefixfree/), [Dragdealer](https://skidding.github.io/dragdealer/)

__Tools:__ webpack, bower, npm, vulcanize
