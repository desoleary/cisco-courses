var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    // Declaring instance methods
    Car.prototype.start = function () {
        console.log('Engine started' + this.engine);
    };
    Car.prototype.stop = function () {
        console.log('Engine stopped' + this.engine);
    };
    return Car;
})();
var car = new Car('V8');
car.start();
car.stop();
//# sourceMappingURL=hello_world_typescript.js.js.map