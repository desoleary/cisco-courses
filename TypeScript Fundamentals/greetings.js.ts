class Greeter {
    greeting:string;

    constructor(message:string) {
        this.greeting = message
    }

    // mismatched types
    //constructor(message:number) {
    //    this.greeting = message
    //}

    greet() {
        // Simple syntax error
        //return "Hello, " this.greeting;
        return "Hello, " + this.greeting;
    }
}

new Greeter("Desmond");