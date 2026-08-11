// Function to merge two objects
function mergeObjects(obj1, obj2) {
    return {...obj1, ...obj2};
}

// Function to deep clone an object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Function to check if a value is an array
function isArray(value) {
    return Array.isArray(value);
}

// Function to check if a value is a function
function isFunction(value) {
    return typeof value === 'function';
}

// Function to get a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to throttle another function
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Exporting functions for use in other modules
module.exports = { mergeObjects, deepClone, isArray, isFunction, getRandomInt, throttle };