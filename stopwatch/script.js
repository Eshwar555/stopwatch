let startTime;
let updatedTime;
let difference = 0;
let timerId;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const clock = document.getElementById('clock');

startStopButton.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerId = setInterval(updateDisplay, 1000);
        running = true;
        startStopButton.textContent = 'Stop';
        startStopButton.style.background = 'linear-gradient(to right, #f44336, #e53935)';
    } else {
        clearInterval(timerId);
        running = false;
        startStopButton.textContent = 'Start';
        startStopButton.style.background = 'linear-gradient(to right, #4caf50, #45a049)';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    running = false;
    difference = 0;
    lapCounter = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    startStopButton.style.background = 'linear-gradient(to right, #4caf50, #45a049)';
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-time';
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function updateClock() {
    const now = new Date();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
