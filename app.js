const countElement = document.getElementById('count');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const resetButton = document.getElementById('reset');

let count = 0;

function renderCount() {
  countElement.textContent = count;
}

increaseButton.addEventListener('click', () => {
  count += 1;
  renderCount();
});

decreaseButton.addEventListener('click', () => {
  count -= 1;
  renderCount();
});

resetButton.addEventListener('click', () => {
  count = 0;
  renderCount();
});

renderCount();
