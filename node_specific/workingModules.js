//Working with modules in nodejs 
//Using the exports 

const sum = (num1, num2) => num1 + num2; 
const PI = 3.14;

class MyClass {
    constructor (name){
        console.log(name + " " + sum(PI, PI));
    }
}

function sayHello(userName){
    console.log(`Hello, ${userName}`);
}

//show to the out world :D
module.exports = {sum:sum, PI:PI, MyClass:MyClass, sayHello:sayHello};

//another way to do it ,,, one by one 
module.exports.sayHello = sayHello;


//To use the functions in this file, a require is needed

/* 
const hello = require("./fileName") 
hello.sayHello("Mohamed");

*/