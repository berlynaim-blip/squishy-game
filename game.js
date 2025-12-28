const startBtn = document.getElementById('startBtn');
const gameArea = document.getElementById('gameArea');
const result = document.getElementById('result');
const lightIndicator = document.getElementById('lightIndicator');
const moveBtn = document.getElementById('moveBtn');
const player = document.getElementById('player');
const timerDisplay = document.getElementById('timer');

let distance = 0;        // player distance
let lightState = 'red';  // red or green
let gameInterval;
let lightInterval;
let timeLeft = 30;
let gameRunning = false;

function startGame() {
    startBtn.classList.add('hidden');
    gameArea.classList.remove('hidden');
    result.classList.add('hidden');

    distance = 0;
    timeLeft = 30;
    player.style.left = '0px';
    timerDisplay.textContent = `Time: ${timeLeft}`;
    gameRunning = true;

    // Timer countdown
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endGame(false, "Time's up! You lose!");
        }
    }, 1000);

    // Change lights randomly
    lightInterval = setInterval(() => {
        lightState = Math.random() > 0.5 ? 'green' : 'red';
        lightIndicator.textContent = lightState.toUpperCase();
        lightIndicator.style.color = lightState === 'green' ? '#00FF00' : '#FF0000';
    }, 2000);
}

moveBtn.addEventListener('click', () => {
    if (!gameRunning) return;

    if (lightState === 'red') {
        endGame(false, 'You moved on Red! Game Over!');
    } else {
        distance++;
        const trackWidth = document.getElementById('track').offsetWidth;
        const playerWidth = player.offsetWidth;
        const newLeft = Math.min((distance / 10) * (trackWidth - playerWidth), trackWidth - playerWidth);
        player.style.left = `${newLeft}px`;

        if (distance >= 10) {
            endGame(true, 'You reached the goal! You Win!');
        }
    }
});

function endGame(win, message) {
    clearInterval(gameInterval);
    clearInterval(lightInterval);
    gameRunning = false;
    gameArea.classList.add('hidden');
    result.classList.remove('hidden');
    result.textContent = message;

    // Send score to PHP
    fetch('score.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'score=' + distance
    });
}

startBtn.addEventListener('click', startGame);
