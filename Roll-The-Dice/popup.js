document.addEventListener('DOMContentLoaded', () => {
  const rollButton = document.getElementById('roll-button');
  const resultsContainer = document.getElementById('results-container');
  const copyButton = document.getElementById('copy-button');
  const diceCountInput = document.getElementById('dice-count');
  const diceFacesInput = document.getElementById('dice-faces');
  const diceFaceButtons = document.querySelectorAll('.dice-face-button');

  let lastResultString = '';

  // Populate the dice-faces input when common dice buttons are clicked
  diceFaceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const faces = btn.getAttribute('data-faces');
      diceFacesInput.value = faces;
    });
  });

  rollButton.addEventListener('click', () => {
    const diceCount = parseInt(diceCountInput.value, 10);
    const diceFaces = parseInt(diceFacesInput.value, 10);

    // Validate inputs
    if (isNaN(diceCount) || diceCount < 1 || diceCount > 999) {
      alert("Please enter a dice count between 1 and 999.");
      return;
    }
    if (isNaN(diceFaces) || diceFaces < 2 || diceFaces > 999) {
      alert("Please enter a number of faces between 2 and 999.");
      return;
    }

    // Roll dice
    const results = [];
    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * diceFaces) + 1;
      results.push(roll);
    }

    const resultString = `Rolled ${diceCount} d${diceFaces} dice with results: ${results.join(', ')}`;
    lastResultString = resultString;

    resultsContainer.innerHTML = '';
    copyButton.disabled = false;

    const textResult = document.createElement('div');
    textResult.textContent = resultString;
    resultsContainer.appendChild(textResult);
  });

  copyButton.addEventListener('click', () => {
    if (lastResultString) {
      navigator.clipboard.writeText(lastResultString).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy Results';
        }, 2000);
      });
    }
  });
});