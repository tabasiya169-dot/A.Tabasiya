 

const printEvenNumbers = () => {
    let numbers = [10, 15, 20, 25, 30, 35, 40, 45, 50];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            console.log(numbers[i]);
        }
    }
};

printEvenNumbers();