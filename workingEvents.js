//working with events in nodejs

const eventEmitter = require("events");

const event = new eventEmitter();

class Person extends eventEmitter{
    constructor (name, age){
        super();
        this.name = name;
        this.age = age;
    }
   
    showInfo() {
        console.log("Your name is " + this.name + " and your age is " + this.age);
    }
}

let mohamed = new Person("Mohamed", 39);

event.on("loaded", ()=>{
   mohamed.showInfo(); 
});

event.emit("loaded");