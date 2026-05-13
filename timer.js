let timeLeft = 0;
let initialTime = 0;
let timerId = null;
let isRunning = false;

const fortunes = [
  'is it break time yet? (｡- ω -)',
  'you are doing such a good job focusing!!',
  'u-um... are you... feeling cozy right now? (〃ー〃)',
  'don’t forget to stretch your little arms! (≧∀≦)ゞ',
  'HI',
  'u-um... are you working hard? i’m cheering for you!',
  'take a deep breath... in and out... (´ω｀*)',
  'is the keyboard sound... clicky and nice? ( ・∀・)',
  'is this for some? (〃ー〃)',
  'the chicken says: "tick-tock, keep up the good work!"',
  'almost there!! stay sparkly! ',
  'maybe a tiny snack break soon...? (｡- ω -)',
  'i-i’m staying right here... don’t mind me... (｡>﹏<)',
  'don’t forget to blink!! (O_O;)',
  'counting down the seconds with you... ( • ⩊ • )',
  'remember to drink some water, okay? ',
  'wow!! you are so productive!! (≧∀≦)ゞ',
  'keep going!! i believe in you!!',
  'is it time to rest yet? (´ω｀*)',
  'u-um... you’re doing so well... i’m proud of you... ',
  'what are we using the timer for today? (｡- ω -)',
];

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const presetBtns = document.querySelectorAll('.presets button');
const fortuneDisplay = document.getElementById('fortune-display');

const customH = document.getElementById('custom-h');
const customM = document.getElementById('custom-m');
const customS = document.getElementById('custom-s');
const setCustomBtn = document.getElementById('set-custom-btn');

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s]
        .map(v => v < 10 ? "0" + v : v)
        .join(":");
}

function updateDisplay() {
    display.textContent = formatTime(timeLeft);
    document.title = `${formatTime(timeLeft)} - o(>ω<)o`;
}

function displayFortune() {
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    fortuneDisplay.textContent = fortune;
}

function startTimer() {
    if (isRunning || timeLeft <= 0) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            alert('Time is up!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    pauseTimer();
    timeLeft = initialTime;
    updateDisplay();
    displayFortune();
}

function setTime(seconds) {
    pauseTimer();
    timeLeft = seconds;
    initialTime = seconds;
    updateDisplay();
}

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const seconds = parseInt(btn.getAttribute('data-seconds'));
        setTime(seconds);
    });
});

setCustomBtn.addEventListener('click', () => {
    const h = parseInt(customH.value) || 0;
    const m = parseInt(customM.value) || 0;
    const s = parseInt(customS.value) || 0;
    
    const totalSeconds = (h * 3600) + (m * 60) + s;
    if (totalSeconds > 0) {
        setTime(totalSeconds);
    }
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Sky Toggle Logic
const sky = document.querySelector('.sky');
const skyMsg = document.getElementById('sky-msg');
const toggleSkyBtn = document.getElementById('toggle-sky-btn');

function updateSkyVisibility(disabled) {
    if (disabled) {
        sky.style.display = 'none';
        skyMsg.style.display = 'none';
    } else {
        sky.style.display = 'block';
        skyMsg.style.display = 'block';
    }
}

// Check for saved preference
const skyDisabled = localStorage.getItem('skyDisabled') === 'true';
updateSkyVisibility(skyDisabled);

toggleSkyBtn.addEventListener('click', () => {
    const currentlyDisabled = localStorage.getItem('skyDisabled') === 'true';
    const newState = !currentlyDisabled;
    localStorage.setItem('skyDisabled', newState);
    updateSkyVisibility(newState);
});

// Initialize
updateDisplay();
displayFortune();
pauseBtn.disabled = true;
