// タブの切り替え
const tabs = document.querySelectorAll('.nav button');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        tabContents[index].classList.add('active');
    });
});
document.getElementById('stopwatch-tab').click();  // デフォルトでストップウォッチを表示

// ストップウォッチ機能
let stopwatchInterval;
let stopwatchTime = 0; // 秒
let stopwatchMilliseconds = 0; // ミリ秒
const stopwatchTimeDisplay = document.getElementById('stopwatch-time');
const toggleStopwatchButton = document.getElementById('toggle-stopwatch');
const resetStopwatchButton = document.getElementById('reset-stopwatch');

// アイコン設定
toggleStopwatchButton.innerHTML = '<i class="fas fa-play"></i>'; // 初期は「開始」のアイコン
resetStopwatchButton.innerHTML = '<i class="fas fa-redo"></i>'; // リセットのアイコン

toggleStopwatchButton.addEventListener('click', () => {
    if (toggleStopwatchButton.innerHTML.includes('fa-play')) {
        startStopwatch();
        toggleStopwatchButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else if (toggleStopwatchButton.innerHTML.includes('fa-pause')) {
        stopStopwatch();
        toggleStopwatchButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        stopwatchMilliseconds++;
        if (stopwatchMilliseconds >= 100) {
            stopwatchMilliseconds = 0;
            stopwatchTime++;
        }
        const timeString = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
        const millisecondsString = String(stopwatchMilliseconds).padStart(3, '0');
        stopwatchTimeDisplay.textContent = `${timeString}.${millisecondsString}`;
    }, 10); // 10ミリ秒ごとに更新
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

resetStopwatchButton.addEventListener('click', () => {
    stopStopwatch();
    stopwatchTime = 0;
    stopwatchMilliseconds = 0;
    stopwatchTimeDisplay.textContent = "00:00:00.000";
    toggleStopwatchButton.innerHTML = '<i class="fas fa-play"></i>';
});

// タイマー機能
let timerInterval;
let timerTime = 0; // 秒
let timerMilliseconds = 0; // ミリ秒
const timerDisplay = document.getElementById('timer-display');
const toggleTimerButton = document.getElementById('toggle-timer');
const resetTimerButton = document.getElementById('reset-timer');

// アイコン設定
toggleTimerButton.innerHTML = '<i class="fas fa-play"></i>'; // 初期は「開始」のアイコン
resetTimerButton.innerHTML = '<i class="fas fa-redo"></i>'; // リセットのアイコン

// 時間表示を更新する関数
function updateTimerDisplay() {
    const hours = Math.floor(timerTime / 3600);
    const minutes = Math.floor((timerTime % 3600) / 60);
    const seconds = timerTime % 60;
    const millisecondsString = String(timerMilliseconds).padStart(3, '0');
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${millisecondsString}`;
}

toggleTimerButton.addEventListener('click', () => {
    if (toggleTimerButton.innerHTML.includes('fa-play')) {
        startTimer();
        toggleTimerButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else if (toggleTimerButton.innerHTML.includes('fa-pause')) {
        stopTimer();
        toggleTimerButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timerTime > 0 || timerMilliseconds > 0) {
            timerMilliseconds--;
            if (timerMilliseconds < 0) {
                timerMilliseconds = 99;
                timerTime--;
            }
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            playAlarm();
            // alert('タイマー終了');
            resetTimer();
        }
    }, 10); // 10ミリ秒ごとに更新
}

function playAlarm() {
    const timerAudio = new Audio('../ReSources/Audios/Timer-Alarm.mp3'); // 音声ファイルを指定
    timerAudio.play(); // 音を再生

    setTimeout(() => {
        timerAudio.pause();
        timerAudio.currentTime = 0; // 再生位置をリセット
    }, 5000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    const initialTime = getTotalTimeInSeconds();
    timerTime = initialTime;
    timerMilliseconds = 0;
    updateTimerDisplay();
    toggleTimerButton.innerHTML = '<i class="fas fa-play"></i>';
}

resetTimerButton.addEventListener('click', () => {
    resetTimer();
});

// タイマーの入力フォームとスライダーの同期
const hoursInput = document.getElementById('hours-input');
const hoursSlider = document.getElementById('hours-slider');
const minutesInput = document.getElementById('minutes-input');
const minutesSlider = document.getElementById('minutes-slider');
const secondsInput = document.getElementById('seconds-input');
const secondsSlider = document.getElementById('seconds-slider');

// 数値のバリデーションと同期のヘルパー関数
function validateInput(inputElement, defaultValue) {
    const value = parseInt(inputElement.value, 10);
    if (isNaN(value) || value < 0) {
        inputElement.value = defaultValue;
        return defaultValue;
    } else {
        return value;
    }
}

// タイマーの設定
function getTotalTimeInSeconds() {
    const hours = validateInput(hoursInput, 0);
    const minutes = validateInput(minutesInput, 0);
    const seconds = validateInput(secondsInput, 0);
    return hours * 3600 + minutes * 60 + seconds;
}

// 入力フォームとスライダーの同期処理
hoursInput.addEventListener('input', () => {
    hoursSlider.value = validateInput(hoursInput, 0);
    timerTime = getTotalTimeInSeconds();
    updateTimerDisplay();
});

hoursSlider.addEventListener('input', () => {
    hoursInput.value = hoursSlider.value;
    timerTime = getTotalTimeInSeconds();
    updateTimerDisplay();
});

minutesInput.addEventListener('input', () => {
    minutesSlider.value = validateInput(minutesInput, 0);
    timerTime = getTotalTimeInSeconds();
    updateTimerDisplay();
});

minutesSlider.addEventListener('input', () => {
    minutesInput.value = minutesSlider.value;
    timerTime = getTotalTimeInSeconds();
    updateTimerDisplay();
});

secondsInput.addEventListener('input', () => {
    secondsSlider.value = validateInput(secondsInput, 0);
    timerTime = getTotalTimeInSeconds();
    updateTimerDisplay();
});

secondsSlider.addEventListener('input', () => {
    secondsInput.value = secondsSlider.value;
    timerTime = getTotalTimeInSeconds();
    updateTimerDisplay();
});

// 時計と日付表示機能
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').textContent = timeString;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const dayOfWeek = dayNames[now.getDay()];
    const dateString = `${year}/${month}/${day} (${dayOfWeek})`;
    document.getElementById('current-date').textContent = dateString;
}

// 時計を1秒ごとに更新
setInterval(updateClock, 1000);

// ページ読み込み時に一度だけ時計を即時更新
updateClock();
