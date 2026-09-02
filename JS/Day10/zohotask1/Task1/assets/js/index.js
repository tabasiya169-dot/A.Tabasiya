// var - Function Scope
var name = "Ravi";
var name = "Kumar";       // Redeclaration allowed
name = "Arun";            // Reassignment allowed

console.log(name);


// let - Block Scope
let age = 25;
// let age = 30;          // Redeclaration not allowed
age = 30;                 // Reassignment allowed

console.log(age);


// const - Block Scope
const city = "Chennai";
// const city = "Madurai"; // Redeclaration not allowed
// city = "Coimbatore";    // Reassignment not allowed

console.log(city);


// Hoisting
console.log(x);           // undefined
var x = 10;


// let and const have TDZ
// console.log(y);        // ReferenceError
let y = 20;

// console.log(z);        // ReferenceError
const z = 30;