var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    // mismatched types
    //constructor(message:number) {
    //    this.greeting = message
    //}
    Greeter.prototype.greet = function () {
        // Simple syntax error
        //return "Hello, " this.greeting;
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
new Greeter("Desmond");
//# sourceMappingURL=greetings.js.js.map