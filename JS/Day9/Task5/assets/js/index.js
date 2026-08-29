console.log(myVar);

var myVar = 10;

try{
    console.log(myLet);
} catch (error) {
    console.log("let cannot be accessed before declaration");
}

let myLet = 20;

try {
    console.log(myConst);
} catch (error) {
    console.log("const cannot be accessed before declaration");
}

const myConst = 30;

sayHello();

function sayHello() {
    console.log("Hello from function");
}
