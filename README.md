#Wakey Alarm Clock

An alarm clock app with weather forecasts meant to be used on your phone. This project was designed by [Xiaotong Yuchi](http://www.xiaotongyuchi.com/wakeyalarm).

The design was intended to be built on the iOS or Android platform. However, I wanted to challenge myself by building a dynamic web application that relies entirely on managing all logic, data, and the view locally.

####Goals for this project:
- Performant. Must feel like a native app.
- Responsive. UI shouldn't break on mobile devices

####To-Do:
- fix AlarmTriggeredPage not firing on mobile
- separate time-wheel into its own component, eliminating duplication across EditAlarmPage and AddAlarmPage
- find new weather api that supports https
- split up scss file
- setup react router
- look into progressive web app

- create splash screen
- highlight time-wheel to pink on tap
- add on-hover effects to buttons
- add transitions between pages
- add animation to open/close days container
- align Wakey title

<br>

Working __[demo](https://justinchi.me/alarmclock)__

__Libraries:__ React, Polymer, [react-polymer](https://www.npmjs.com/package/react-polymer), [react-localstorage](https://github.com/STRML/react-localstorage), [XScroll](http://xscroll.github.io/), [Prefixfree](https://leaverou.github.io/prefixfree/), [Dragdealer](https://skidding.github.io/dragdealer/)

__Tools:__ webpack, bower, npm
