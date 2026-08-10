function divide(a, b) {
    // Check if inputs are numbers
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
    }
    // Check for division by zero
    if (b === 0) {
        throw new RangeError('Cannot divide by zero');
    }
    return a / b;
}

function safeDivide(a, b) {
    try {
        return divide(a, b);
    } catch (error) {
        console.error('Error occurred:', error.message);
        return null; // Return null on error
    }
}

console.log(safeDivide(10, 2)); // 5
console.log(safeDivide(10, 0)); // Error logged, returns null
console.log(safeDivide('10', 2)); // Error logged, returns null
console.log(safeDivide(10, 'a')); // Error logged, returns null
