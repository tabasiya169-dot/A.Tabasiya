// Rest Parameter
function addNumbers(...numbers) {
    let sum = 0;

    for (let number of numbers) {
        sum += number;
    }

    return sum;
}

console.log(addNumbers(10, 20, 30, 40));


// Spread Syntax
const numbers = [10, 20, 30];

const newNumbers = [...numbers, 40, 50];

console.log(newNumbers);