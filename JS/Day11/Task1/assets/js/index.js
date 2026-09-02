function processNumber(number, callback) {
    let result = number * 2;
    callback(result);
}

processNumber(10, function(result) {
    console.log(result);
});