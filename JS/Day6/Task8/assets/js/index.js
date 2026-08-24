let number = 12345;
let reverse = 0;

for (; number > 0; number = Math.floor(number / 10)) {
    let digit = number % 10;

    reverse = reverse * 10 + digit;
}

console.log(reverse);