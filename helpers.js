// helpers.js - Autoclicker input validation helpers
function validateInput(input) {
  if (typeof input !== 'object' || input === null) {
    return { isValid: false, message: 'Input must be a non-null object' };
  }
  if (typeof input.x !== 'number' || isNaN(input.x) || input.x < 0) {
    return { isValid: false, message: 'x coordinate must be a non-negative number' };
  }
  if (typeof input.y !== 'number' || isNaN(input.y) || input.y < 0) {
    return { isValid: false, message: 'y coordinate must be a non-negative number' };
  }
  if (input.delay !== undefined) {
    if (typeof input.delay !== 'number' || isNaN(input.delay) || input.delay < 0) {
      return { isValid: false, message: 'delay must be a non-negative number if provided' };
    }
  }
  if (input.clicks !== undefined) {
    if (typeof input.clicks !== 'number' || isNaN(input.clicks) || input.clicks <= 0) {
      return { isValid: false, message: 'clicks must be a positive number if provided' };
    }
  }
  return { isValid: true };
}

function processMainLoop(inputs) {
  // Main processing loop for autoclicker
  if (!Array.isArray(inputs) || inputs.length === 0) {
    console.error('Invalid inputs: must provide non-empty array');
    return;
  }
  let currentIndex = 0;
  function loop() {
    if (currentIndex >= inputs.length) {
      console.log('Autoclicker sequence completed successfully');
      return;
    }
    const currentInput = inputs[currentIndex];
    // input validation in the main processing loop
    const validationResult = validateInput(currentInput);
    if (!validationResult.isValid) {
      console.error(`Validation failed for input ${currentIndex}: ${validationResult.message}`);
      currentIndex++;
      setTimeout(loop, 0);
      return;
    }
    console.log(`Processing click at position (${currentInput.x}, ${currentInput.y})`);
    const delay = currentInput.delay || 1000;
    const clicks = currentInput.clicks || 1;
    for (let i = 0; i < clicks; i++) {
      console.log(`  Simulated click ${i + 1} of ${clicks}`);
    }
    currentIndex++;
    setTimeout(loop, delay);
  }
  loop();
}

module.exports = {
  validateInput,
  processMainLoop
};