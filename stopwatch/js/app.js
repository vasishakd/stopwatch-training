let secToWork;
let secToRest;
let rest = false;
let sec = 0;
let timer;
let timerElement = document.getElementById('timer');
let cyclesPassedElement = document.getElementById('cycles-passed');
let cycles = 0;
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
             cycles++;

            if (cycles === totalCycles) {
                isBigRest = true;
                timerElement.style.color = '#33d470';
            } else {
                rest = true;
                timerElement.style.color = '#d64141';
            }

            cyclesPassedElement.innerHTML = cycles;
        } else if (sec === secToRest && rest) {
            sec = 0;
            rest = false;
            timerElement.style.color = '#000';
        }
    } else {
        if (sec === bigRestSeconds) {
            isBigRest = false;
            cycles = 0;
            sec = 0;
            minutes = 0;
            seconds = 0;
            timerElement.style.color = '#000';
            cyclesPassedElement.innerHTML = cycles;
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
    cycles = 0;
    minutes = 0;
    seconds = 0;
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