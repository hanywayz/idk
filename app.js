const guessInputs = Array.from(document.querySelectorAll('.guess-input'));
const enterButton = document.getElementById('enter-button');
const resetButton = document.getElementById('reset-button');
const ticketOutput = document.getElementById('ticket-output');
const resultOutput = document.getElementById('result-output');
const statusText = document.getElementById('status');

const winningNumbers = [-1, 0, 1];

function getGuessValues() {
  return guessInputs.map((input) => input.value.trim());
}

function updateTicketOutput() {
  const values = getGuessValues();

  if (values.some((value) => value === '')) {
    ticketOutput.value = 'Waiting for your 3 numbers...';
    return;
  }

  ticketOutput.value = values.join(' | ');
}

function validateGuesses() {
  const rawValues = getGuessValues();

  if (rawValues.some((value) => value === '')) {
    statusText.textContent = 'Please enter all 3 numbers.';
    return null;
  }

  const guesses = rawValues.map((value) => Number(value));

  if (guesses.some((value) => Number.isNaN(value) || value < -9 || value > 9)) {
    statusText.textContent = 'Each number must be between -9 and 9.';
    return null;
  }

  return guesses;
}

function compareNumbers(guesses) {
  const exactMatches = guesses.filter((value, index) => value === winningNumbers[index]);
  const matchingPositions = guesses
    .map((value, index) => (value === winningNumbers[index] ? index + 1 : null))
    .filter((value) => value !== null);

  return {
    exactMatches,
    matchingPositions,
    count: exactMatches.length,
  };
}

function revealResult(guesses) {
  const comparison = compareNumbers(guesses);

  const resultLines = [
    `Winning numbers: ${winningNumbers.join(' | ')}`,
    `Your numbers: ${guesses.join(' | ')}`,
    comparison.count === 3
      ? 'Congratulations! You matched all 3 winning numbers!'
      : comparison.count > 0
        ? `You matched ${comparison.count} number(s).`
        : 'No exact matches this round.',
    comparison.matchingPositions.length > 0
      ? `Matching positions: ${comparison.matchingPositions.join(', ')}`
      : 'No matching positions.'
  ];

  resultOutput.value = resultLines.join('\n');

  if (comparison.count === 3) {
    statusText.textContent = 'Congratulations! You won!';
  } else if (comparison.count > 0) {
    statusText.textContent = 'Nice try. The draw is revealed.';
  } else {
    statusText.textContent = 'No matches this time. Try again.';
  }
}

function handleEnter() {
  const guesses = validateGuesses();

  if (!guesses) {
    return;
  }

  revealResult(guesses);
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
  resultOutput.value = 'Reveal will appear after you hit Enter.';
  statusText.textContent = 'The winning numbers are fixed at -1, 0, 1. Pick 3 numbers and hit Enter.';
});

updateTicketOutput();
