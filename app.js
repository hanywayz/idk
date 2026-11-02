const countElement = document.getElementById('count');
const targetElement = document.getElementById('target');
const statusElement = document.getElementById('status');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const timerElement = document.getElementById('timer');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const resetButton = document.getElementById('reset');
const newTargetButton = document.getElementById('new-target');

let count = 0;
let target = 0;
let wins = 0;
let streak = 0;
let timeLeft = 10;
let timerId = null;

function randomTarget() {
  return Math.floor(Math.random() * 21) - 10;
}

function render() {
  countElement.textContent = count;
  targetElement.textContent = target;
  scoreElement.textContent = `Wins: ${wins}`;
  streakElement.textContent = `Streak: ${streak}`;
  timerElement.textContent = `Time: ${timeLeft}`;
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  stopTimer();
  timeLeft = 10;
  timerId = setInterval(() => {
    timeLeft -= 1;
    render();

    if (timeLeft <= 0) {
      stopTimer();
      streak = 0;
      render();
      statusElement.textContent = 'Time up! Start a new round.';
      statusElement.style.color = '#dc2626';
    }
  }, 1000);
}

function checkWin() {
  if (count === target) {
    wins += 1;
    streak += 1;
    stopTimer();
    statusElement.textContent = 'You win! Great job!';
    statusElement.style.color = '#16a34a';
    render();
    return true;
  }

  statusElement.textContent = 'Reach the target number!';
  statusElement.style.color = '#374151';
  return false;
}

function newRound() {
  count = 0;
  target = randomTarget();
  render();
  statusElement.textContent = 'Reach the target number!';
  statusElement.style.color = '#374151';
  startTimer();
}

increaseButton.addEventListener('click', () => {
  if (timeLeft <= 0) {
    return;
  }

  count += 1;
  render();
  checkWin();
});

decreaseButton.addEventListener('click', () => {
  if (timeLeft <= 0) {
    return;
  }

  count -= 1;
  render();
  checkWin();
});

resetButton.addEventListener('click', () => {
  newRound();
});

newTargetButton.addEventListener('click', () => {
  newRound();
});

newRound();
