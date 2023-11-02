/*jshint esversion: 6 */

function timer() {
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds');

    const deadline = new Date('2020-12-31').getTime();  

    function remainingTime(deadline) {
        const day =  Math.floor((deadline - new Date().getTime()) / 1000 / 60 / 60 / 24);
        const hour = Math.floor((deadline - new Date().getTime()) / (1000 * 60 * 60) % 24);
        const minute = Math.floor((deadline - new Date().getTime()) / (1000 * 60) % 60);
        const second = Math.floor((deadline - new Date().getTime()) / 1000 % 60);

        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };       
    }

    function getZero(time) {
        if (time < 10) {
            return `0${time}`;
        } else {
            return time;
        }
    }

    function setTimer() {
        const t = remainingTime(deadline);

        days.innerHTML = getZero(t.day);
        hours.innerHTML = getZero(t.hour);
        minutes.innerHTML = getZero(t.minute);
        seconds.innerHTML = getZero(t.second);

        if (t < 0) {
            clearInterval(interval);
        }
    }

    const interval = setInterval(setTimer, 1000);
}

export default timer;