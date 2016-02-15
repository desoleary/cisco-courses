class Car {
    engine: string; // declaring instance variables
    constructor (engine: string) {
        this.engine = engine;
    }

    // Declaring instance methods
    start() {
        console.log('Engine started' + this.engine);
    }

    stop() {
        console.log('Engine stopped' + this.engine);
    }
}

var car = new Car('V8');
car.start();
car.stop();
