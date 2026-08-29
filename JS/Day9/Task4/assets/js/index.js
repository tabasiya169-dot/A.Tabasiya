// Global Scope
var globalName = "Tabasiya";

console.log("Global Scope:", globalName);

function myFunction() {

    // Function Scope
    var userName = "Sameera";

    console.log("Inside Function:", globalName);
    console.log("Function Scope:",userName );

    // Block Scope
    if (true) {
        let userAge = 21;
        const cityName = "Chennai";

        console.log("Block Scope - let:", userAge);
        console.log("Block Scope - const:", cityName);
    }
}

myFunction();

console.log("Global Scope Outside Function:", globalName);