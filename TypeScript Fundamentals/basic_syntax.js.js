/* *
 * Grammer: Type inference
 * */
var num = 2; // underlying type inferenced based on given initial value
//num = '3'; // mismatch type error
/* *
 * Grammer: Type annotations
 * */
var num = 3;
//or
var num;
/* *
 * Annotations and Inferences
 * */
var any1; // Type could be any type
var num1; // Type annotation
num1 = 5;
var num2 = 2; // Type Annotation Setting the value
var num3 = 3; // Type Inference (number)
var num4 = num3 + 100; // Type Inference (number)
var str1 = num1 + 'some.string'; // Type Inference (string)
//var nothappy: number = num1 + 'some.string';  // Error!
/* *
 * Method with no declared types
 * */
//function addNumbers(n1, n2, n3) {
//    var result = n1 + n2 + n3;
//    console.log('Sum is = ' + result)
//}
//
//addNumbers(num1, num2, 'some.string');
/* *
 * Method with declared types
 * */
//function addNumbers(n1: number, n2: number, n3: number) {
//    var result = n1 + n2 + n3;
//    console.log('Sum is = ' + result)
//}
//addNumbers(num1, num2, 'some.string'); // Error!
//addNumbers(num1, num2, num3);
/**
 * Primitive Types
 **/
var score = 98.25;
var hashData = true;
var firstName = 'John';
var names = ['John', 'Henry'];
/**
 * Object Types
 **/
// Object literals
var square = { h: 10, w: 20 };
var points = { x: 10, y: 20 };
// functions
var multiply = function (x) {
    return x * x;
};
var squareIt = function (
    // w is optional
    rect) {
    if (rect.w === undefined) {
        return rect.h * rect.h;
    }
    return rect.h * rect.w;
};
var sq1 = squareIt({ h: 10 });
console.log('rectangle h and w of 10 = ' + sq1);
var sq2 = squareIt({ h: 10, w: 40 });
console.log('rectangle h of 10 and w of 40 = ' + sq2);
// Fat arrow functions
var greetMe;
greetMe = function (msg) {
    console.log(msg);
};
//# sourceMappingURL=basic_syntax.js.js.map