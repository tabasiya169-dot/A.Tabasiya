const numbers = [10, 20, 30];

const newArray = [];

for (let i = 0; i < numbers.length; i++) {
    newArray[i] = numbers[i];
}

newArray[numbers.length] = 40;

console.log(newArray);