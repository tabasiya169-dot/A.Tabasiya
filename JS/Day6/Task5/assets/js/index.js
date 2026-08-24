let evenSum = 0;

for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
        evenSum = evenSum + i;
    }
}

console.log(evenSum);