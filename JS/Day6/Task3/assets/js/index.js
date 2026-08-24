let oddNumbers = "";

for (let i = 1; i <= 50; i++) {
    if (i % 2 !== 0) {
        oddNumbers = oddNumbers + i + " ";
    }
}

console.log(oddNumbers);