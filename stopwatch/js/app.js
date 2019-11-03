let secToWork;
let secToRest;
let rest = false;
let sec = 0;
let timer;
let timerElement = document.getElementById('timer');
let currentCycleElement = document.getElementById('current-cycle');
let currentCycle = 1;
let bigRestSeconds;
let totalCycles;
let isBigRest;
let minutes;
let seconds;
let isStart = false;

function callTimer() {
    sec++;

    if (!isBigRest) {
         if (sec === secToWork && !rest) {
             sec = 0;

            if (currentCycle === totalCycles) {
                isBigRest = true;
                timerElement.style.color = '#33d470';
                currentCycleElement.innerHTML = 'REST';
            } else {
                rest = true;
                timerElement.style.color = '#d64141';
            }

        } else if (sec === secToRest && rest) {
            sec = 0;
            rest = false;
            currentCycle++;
            timerElement.style.color = '#000';
            currentCycleElement.innerHTML = currentCycle;
        }
    } else {
        if (sec === bigRestSeconds) {
            isBigRest = false;
            currentCycle = 1;
            sec = 0;
            minutes = 0;
            seconds = 0;
            timerElement.style.color = '#000';
            currentCycleElement.innerHTML = currentCycle;
        }
    }

    if (sec > 60) {
        minutes = Math.floor(sec / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = sec - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.innerHTML = minutes + ':' + seconds;
    } else {
        timerElement.innerHTML = sec;
    }
}


function start() {
    sleep.prevent();
    setTimeout(function() {
        document.getElementById('start').disabled = true;
        isStart = true;
        secToWork = parseInt(document.getElementById('sec-to-work').value) + 1;
        secToRest = parseInt(document.getElementById('sec-to-rest').value) + 1;
        bigRestSeconds = parseInt(document.getElementById('big-rest').value) + 1;
        totalCycles = parseInt(document.getElementById('cycles').value);
        currentCycleElement.innerHTML = currentCycle;
        timer = setInterval(callTimer, 1000);
    }, 1000);
}

function stop() {
    sleep.allow();
    isStart = false;
    document.getElementById('start').disabled = false;
    clearInterval(timer);
}

function reset() {
    stop();
    sec = 0;
    rest = false;
    isBigRest = false;
    currentCycle = 1;
    minutes = 0;
    seconds = 0;
    currentCycleElement.innerHTML = 0;
    timerElement.style.color = '#000';
    timerElement.innerHTML = sec;
}

document.onkeyup=function(e){
  if(e.which === 32) {
    if (isStart) {
        stop()
    } else {
        start();
    }
  }
}