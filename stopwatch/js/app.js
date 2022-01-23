let secToWork;
let secToRest;
let rest = false;
let sec = 0;
let timer;
let timerElement = document.getElementById('timer');
let currentSetElement = document.getElementById('current-set');
let currentRoundElement = document.getElementById('current-round');
let currentSet = 1;
let currentRound = 1;
let bigRestSeconds;
let totalSets;
let isBigRest;
let minutes;
let seconds;
let isStart = false;
const localStorage = window.localStorage;
const inputsWrapper = document.getElementById('inputs');
const inputs = inputsWrapper.querySelectorAll('input');
const workElement = document.getElementById('sec-to-work');
const setsElement = document.getElementById('sets');
const restElement = document.getElementById('sec-to-rest');
const bigRestElement = document.getElementById('big-rest');
const startElement = document.getElementById('start');

const SPACE_KEY = 32;

function callTimer() {
    sec++;

    if (!isBigRest) {
         if (sec === secToWork && !rest) {
             sec = 0;

            if (currentSet === totalSets) {
                isBigRest = true;
                timerElement.style.color = '#33d470';
                currentSetElement.innerHTML = 'REST';
            } else {
                rest = true;
                timerElement.style.color = '#d64141';
            }

        } else if (sec === secToRest && rest) {
            sec = 0;
            rest = false;
            currentSet++;
            timerElement.style.color = '#000';
            currentSetElement.innerHTML = currentSet;
        }
    } else if (sec === bigRestSeconds) {
        isBigRest = false;
        currentSet = 1;
        sec = 0;
        minutes = 0;
        seconds = 0;
        currentRoundElement.innerHTML = currentRound;
        timerElement.style.color = '#000';
        currentSetElement.innerHTML = currentSet;
    }

    if (sec > 59) {
        minutes = Math.floor(sec / 60).toString().padStart(2, '0');
        seconds = (sec - minutes * 60).toString().padStart(2, '0');
        timerElement.innerHTML = minutes + ':' + seconds;
    } else {
        timerElement.innerHTML = sec;
    }
}


function start() {
    if (isStart) {
        return;
    }

    startElement.disabled = true;
    isStart = true;
    currentSetElement.innerHTML = currentSet;
    currentRoundElement.innerHTML = currentRound;
    totalSets = parseInt(setsElement.value);
    sleep.prevent();
    setTimeout(function() {
        secToWork = parseInt(workElement.value) + 1;
        secToRest = parseInt(restElement.value) + 1;
        bigRestSeconds = parseInt(bigRestElement.value) + 1;
        timer = setInterval(callTimer, 1000);
    }, 1000);
}

function stop() {
    if (!isStart) {
        return;
    }
    clearInterval(timer);
    isStart = false;
    startElement.disabled = false;
    sleep.allow();
}

function reset() {
    stop();
    sec = 0;
    rest = false;
    isBigRest = false;
    currentSet = 1;
    currentRound = 1;
    minutes = 0;
    seconds = 0;
    currentSetElement.innerHTML = 0;
    currentRoundElement.innerHTML = 0;
    timerElement.style.color = '#000';
    timerElement.innerHTML = sec;
}

function toDefault() {
    localStorage.clear();
    inputs.forEach(input => input.value = input.getAttribute('default-value'));
}

document.onkeyup=function(e){
  if(e.which === SPACE_KEY) {
    if (isStart) {
        stop()
    } else {
        start();
    }
  }
}

inputs.forEach(input => {
    input.value = localStorage.getItem(input.id) || input.value;
});


inputsWrapper.addEventListener('change', function(event){
    element = event.target;

    localStorage.setItem(element.id, element.value);
});
