const countElement = document.getElementById('count');
const targetElement = document.getElementById('target');
const statusElement = document.getElementById('status');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const resetButton = document.getElementById('reset');

let count = 0;
let target = 0;

function randomTarget() {
  return Math.floor(Math.random() * 21) - 10;
}

function render() {
  countElement.textContent = count;
  targetElement.textContent = target;
}

function checkWin() {
  if (count === target) {
    statusElement.textContent = 'You win! Great job!';
    statusElement.style.color = '#16a34a';
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
}

increaseButton.addEventListener('click', () => {
  count += 1;
  render();
  checkWin();
});

decreaseButton.addEventListener('click', () => {
  count -= 1;
  render();
  checkWin();
});

resetButton.addEventListener('click', () => {
  newRound();
});

newRound();
