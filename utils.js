/**
 * Autoclicker core utility for event simulation
 * Handles coordinate validation and input constraints
 */

const validateCoordinates = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('coordinates must be numeric values');
  }
  if (x < 0 || y < 0) {
    throw new RangeError('coordinates cannot be negative');
  }
  return { x, y };
};

const performClick = (x, y, delay = 0) => {
  try {
    const coords = validateCoordinates(x, y);
    
    // Simulate native click event with safety timeout
    setTimeout(() => {
      console.log(`Clicking at: ${coords.x}, ${coords.y}`);
      // Implementation logic for robotjs or internal driver
    }, delay);

  } catch (error) {
    if (error instanceof TypeError || error instanceof RangeError) {
      console.error(`Input error: ${error.message}`);
    } else {
      console.error('Unexpected automation failure', error);
    }
  }
};

module.exports = { performClick };