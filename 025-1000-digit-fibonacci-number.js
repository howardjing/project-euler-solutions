/*
The Fibonacci sequence is defined by the recurrence relation:

    Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

Hence the first 12 terms will be:

    F1 = 1
    F2 = 1
    F3 = 2
    F4 = 3
    F5 = 5
    F6 = 8
    F7 = 13
    F8 = 21
    F9 = 34
    F10 = 55
    F11 = 89
    F12 = 144

The 12th term, F12, is the first term to contain three digits.

What is the first term in the Fibonacci sequence to contain 1000 digits?
*/

var add = require('./lib/array-math').add;

var fib1 = [1];
var fib2 = [1];
var fib3 = [2];
var counter = 3;
var length = 1000;
while (fib3.length < length) {
    fib1 = fib2;
    fib2 = fib3;
    fib3 = add(fib1, fib2);
    counter++;
}
console.log("The first term in the fib sequence to contain " + length + " digits is: " + counter);
console.log("The value itself is: " + fib3.join(""));

