'use strict';

var $ = document.querySelector.bind(document),
    $on = document.addEventListener.bind(document);

// --------------------------------------------------------------------------
// POINTER

var Xmouse, Ymouse;

$on('mousemove', function (e) {
    Xmouse = e.clientX || e.pageX;
    Ymouse = e.clientY || e.pageY;
});

var ball = $("#ball"),
    x = void 0,
    y = void 0,
    dx = void 0,
    dy = void 0,
    tx = 0,
    ty = 0,
    key = -1;

var followMouse = function followMouse () {
    key = requestAnimationFrame(followMouse);

    if (!x || !y) {
        x = Xmouse;
        y = Ymouse;
    } else {
        dx = (Xmouse - x) * 0.125;
        dy = (Ymouse - y) * 0.125;

        if (Math.abs(dx) + Math.abs(dy) < 0.1) {
            x = Xmouse;
            y = Ymouse;
        } else {
            x += dx;
            y += dy;
        }
    }
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
};


// --------------------------------------------------------------------------
// TIMER

function startTimer() {
    
    var endTime = 60 * 1;
    var duration = 0;
    var display = $('#time');
    var timer = duration, minutes, seconds;

    var gameClock = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.innerHTML = minutes + ':' + seconds;

        if (++timer >= endTime) {
            clearInterval(gameClock);
            timer = duration;
        }
    }, 1000);
}

// --------------------------------------------------------------------------
// INITIALIZE 

$on('DOMContentLoaded', function () {
    followMouse();
    startTimer();
});