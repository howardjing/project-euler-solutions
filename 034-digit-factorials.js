/*
145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

Find the sum of all numbers which are equal to the sum of 
the factorial of their digits.

Note: as 1! = 1 and 2! = 2 are not sums they are not included.
*/

// 9! * 8 only has 7 digits, so 9,999,999 seems like a good upper bound
var limit = 9999999;

var memoize = require('./lib/helper').memoize;
var factorial = memoize(function(n) {
  if (n == 0) {
    return 1;
  }
  return n * factorial(n-1);
});

var digits = function(n) {
  return n.toString().split("").map(function(a) {
    return parseInt(a, 10);
  });
}

var curious = [];
for (var i=10; i<=limit; i++) {
  var sumOfFactorialDigits = digits(i).reduce(function(a,b) {
    return a + factorial(b);
  }, 0);

  if (sumOfFactorialDigits == i) {
    console.log("Found curious number: " + i);
    curious.push(i);
  }
}

var sum = curious.reduce(function(a,b) {
  return a + b;
});
console.log("The sum of curious numbers is: " + sum);