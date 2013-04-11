'use strict';


$(document).ready(function() {
    
    var TIMER = function () {};
    TIMER.tickHandle;
    TIMER.isRunning = false;
    TIMER.snapshots = [];
    
    // Language settings
    TIMER.lang = {
        en: {
            toggleButtonStart: 'Start',
            toggleButtonStop: 'Stop'   
        }
    }

    TIMER.langID = 'en';

    TIMER.time = 0;
    
    TIMER.tick = function () {
        TIMER.time = parseFloat(TIMER.time) + 0.1;
        TIMER.time = parseFloat(TIMER.time).toFixed(1);
        TIMER.updateDisplay();
        //console.log(TIMER.time);
    }
    
    TIMER.startTimer = function() {
        TIMER.isRunning = true;
        TIMER.tickHandle = window.setInterval(TIMER.tick, 100);
    };

    TIMER.stopTimer = function () {
        TIMER.isRunning = false;
        window.clearInterval(TIMER.tickHandle);
        TIMER.snapshots.push(TIMER.time);
    }

    TIMER.resetTimer = function () {
        TIMER.stopTimer();
        TIMER.time = 0;
        TIMER.updateDisplay();
    }

    TIMER.updateDisplay = function () {
        var totalSecondsElapsed = TIMER.time;
        var microSeconds = totalSecondsElapsed % 1;
        microSeconds = parseFloat(microSeconds).toFixed(1) * 10;
        var minutes = Math.floor(totalSecondsElapsed / 60);
        var seconds = totalSecondsElapsed - minutes * 60;
        seconds = Math.round(seconds);
        
        if (minutes.toString().length === 1) {
            minutes = '0' + minutes;
        }
    
       if (seconds.toString().length === 1) {
            seconds = '0' + seconds;
        }
    
        if (microSeconds.toString().length === 1) {
            microSeconds = '0' + microSeconds;
        }
    
        
        var displayTime = minutes + ':' + seconds + ':' + microSeconds;
        $('#timer-display').html(displayTime);
    }

    $('#toggle-btn').click(function () {
        if (TIMER.isRunning === false) {
            TIMER.startTimer();
            $(this).text(TIMER.lang[TIMER.langID].toggleButtonStop);
            $(this).removeClass('green')
                   .addClass('red');
        } else {
            TIMER.stopTimer();
            $(this).text(TIMER.lang[TIMER.langID].toggleButtonStart);
            $(this).removeClass('red')
                   .addClass('green');
        }
    });

    $('#reset-timer').click(function () {
        TIMER.resetTimer();
        $('#toggle-btn').removeClass('red')
               .addClass('green');
    });
});