/*
Surprisingly there are only three numbers that can be written as the 
sum of fourth powers of their digits:

    1634 = 1^4 + 6^4 + 3^4 + 4^4
    8208 = 8^4 + 2^4 + 0^4 + 8^4
    9474 = 9^4 + 4^4 + 7^4 + 4^4

As 1 = 1^4 is not a sum it is not included.

The sum of these numbers is 1634 + 8208 + 9474 = 19316.

Find the sum of all the numbers that can be written as the sum of 
fifth powers of their digits.
*/

var start = 2;
var stop  = 999999; // (9 ^ 5) * 10 has six digits, so that seems like a reasonable stopping point
var power = 5;

var digits = function(number) {
  return number.toString().split("").map(function(digit) {
    return parseInt(digit, 10);
  })
};

var sum = function(a, b) {
  return a + b;
}

var answers = [];
for (var i=start; i<=stop; i++) {
  var sumOfPowers = digits(i).map(function(digit) {
    return Math.pow(digit, power);
  }).reduce(sum);

  if (i == sumOfPowers) {
    answers.push(i);
  }
}
console.log("Numbers: " + answers);
console.log("Sum: " + answers.reduce(sum));
