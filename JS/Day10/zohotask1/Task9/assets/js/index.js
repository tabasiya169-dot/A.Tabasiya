const numbers = [10, 25, 30, 45, 50, 65];


// Find numbers greater than 30
const greaterThan30 = numbers.filter(number => number > 30);

console.log(greaterThan30);


// Find first number greater than 40
const firstGreaterThan40 = numbers.find(number => number > 40);

console.log(firstGreaterThan40);


// Check whether 50 exists
const has50 = numbers.includes(50);

console.log(has50);


// Create new array with doubled values
const doubledValues = numbers.map(number => number * 2);

console.log(doubledValues);