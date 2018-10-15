'use strict';

var $ = document.querySelector.bind(document),
    $on = document.addEventListener.bind(document);

// --------------------------------------------------------------------------
// HELPER FUNCTIONS

function $removeById(id) {
    document.getElementById(id).remove();
}

// --------------------------------------------------------------------------
// CONTROLS

function restart() {
    window.location.reload();
}

// --------------------------------------------------------------------------
// SCORE VARS

var score = '0000',
    minVal = 10,
    medVal = 20,
    maxVal = 30;

function initScore() {
    $("#points").innerHTML = score;
}

// --------------------------------------------------------------------------
// LOADER

var loader = null;

function loadNow(opacity) {

    if (loader === null) {
        loader = $('#loader');
    }

    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        setTimeout(function () {
            loadNow(opacity - 0.05);
        }, 100);
    }
}

function displayContent() {
    loader.style.display = 'none';
    $('#gameWorld').style.display = 'block';
    ball.style.display = 'block';
    followMouse();
}

// --------------------------------------------------------------------------
// SONG

function playSong() {

    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
        $removeById('song');
    } else {

        $removeById('iframeAudio');

        var promise = document.getElementById('song').play();

        if (promise !== undefined) {
            promise.then(_ => {
                console.log(_);
            }).catch(error => {
                console.warn(error);
            });
        }
    }
}

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

function endGame() {
    $('#options').style.display = 'block';
    ball.remove();
}

// --------------------------------------------------------------------------
// INITIALIZE 

$on('DOMContentLoaded', function () {
    initScore();
    startTimer();
    playSong();
    loadNow(1);

    setTimeout(function () {
        endGame();
    }, 10000);
});
