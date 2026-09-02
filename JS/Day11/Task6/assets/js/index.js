const fruits = ["Apple", "Mango", "Orange"];
const vegetables = ["Carrot", "Potato"];

fruits.push("Banana");

fruits.pop();

fruits.unshift("Grapes");

fruits.shift();

console.log(fruits.length);

const result = fruits.concat(vegetables);

console.log(result);