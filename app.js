const guessInputs = Array.from(document.querySelectorAll('.guess-input'));
const enterButton = document.getElementById('enter-button');
const resetButton = document.getElementById('reset-button');
const ticketOutput = document.getElementById('ticket-output');
const resultOutput = document.getElementById('result-output');
const statusText = document.getElementById('status');

function randomNumber() {
  return Math.floor(Math.random() * 19) - 9;
}

function getGuessValues() {
  return guessInputs.map((input) => Number(input.value));
}

function updateTicketOutput() {
  const values = getGuessValues();

  if (values.some((value) => Number.isNaN(value))) {
    ticketOutput.value = 'Waiting for your 3 numbers...';
    return;
  }

  const cleanValues = values.map((value) => Number(value));
  ticketOutput.value = cleanValues.join(' | ');
}

function validateGuesses() {
  const guesses = getGuessValues();

  if (guesses.some((value) => Number.isNaN(value))) {
    statusText.textContent = 'Please enter all 3 numbers.';
    return null;
  }

  if (guesses.some((value) => value < -9 || value > 9)) {
    statusText.textContent = 'Each number must be between -9 and 9.';
    return null;
  }

  return guesses;
}

function generateWinningNumbers() {
  return Array.from({ length: 3 }, randomNumber);
}

function compareNumbers(guesses, winningNumbers) {
  const matches = guesses.filter((value, index) => value === winningNumbers[index]);
  const positions = guesses
    .map((value, index) => (value === winningNumbers[index] ? index + 1 : null))
    .filter((value) => value !== null);

  return {
    matches,
    positions,
    count: matches.length,
  };
}

function handleEnter() {
  const guesses = validateGuesses();

  if (!guesses) {
    return;
  }

  const winningNumbers = generateWinningNumbers();
  const comparison = compareNumbers(guesses, winningNumbers);

  const matchLine =
    comparison.count > 0
      ? `Matched numbers: ${comparison.count} / 3`
      : 'No exact matches this round.';

  const positionLine =
    comparison.positions.length > 0
      ? `Matched positions: ${comparison.positions.join(', ')}`
      : 'No matching positions.';

  resultOutput.value = `Winning numbers: ${winningNumbers.join(' | ')}\nYour numbers: ${guesses.join(' | ')}\n${matchLine}\n${positionLine}`;
  statusText.textContent = 'Lotto draw complete!';
}

guessInputs.forEach((input) => {
  input.addEventListener('input', () => {
    updateTicketOutput();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEnter();
    }
  });
});

enterButton.addEventListener('click', handleEnter);

resetButton.addEventListener('click', () => {
  guessInputs.forEach((input) => {
    input.value = '';
  });
  ticketOutput.value = 'Waiting for your 3 numbers...';
  resultOutput.value = 'Results will appear here...';
  statusText.textContent = 'Pick 3 numbers between -9 and 9.';
});

updateTicketOutput();
