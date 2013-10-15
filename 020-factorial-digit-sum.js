/*
n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!
*/

// copied from 016-power-digit-sum.js
var add = function(array1, array2) {
  array1 = array1.slice(0, array1.length).reverse();
  array2 = array2.slice(0, array2.length).reverse();
  var numDigits = Math.max(array1.length, array2.length);

  var carry = 0;
  var sum = [];
  for (var i=0; i<numDigits; i++) {
    var digit = (array1[i] || 0) + (array2[i] || 0) + carry
    if (digit > 9) {
      carry = 1;
    } else {
      carry = 0;
    }
    digit = digit % 10;
    sum.push(digit);
  }
  if (carry > 0) {
    sum.push(carry);
  }
  return sum.reverse();
}

var toNum = function(array) {
  return parseInt(array.join(""));
}

var toArray = function(num) {
  return num.toString().split("");
}

// defining multiplication in terms of addition
// only optimization is to (roughly) minimize the looping done
var mult = function(array1, array2) {
  var smaller;
  var larger;
  if (array1.length < array2.length) {
    smaller = array1;
    larger = array2;
  } else {
    smaller = array2;
    larger = array1;
  }

  var numTimes = toNum(smaller);
  var cumulative = [0];
  for (var i=0; i<numTimes; i++) { 
    cumulative = add(larger, cumulative);
  }
  return cumulative;
}

var factorial = function(n) {
  var answer = [1];
  for (var factor = n; factor >= 1; factor--) {
    answer = mult(answer, toArray(factor));
  }
  return answer;
}

var product = factorial(100);
var sum = product.reduce(function(a, b) { return a + b; });
console.log("100 factorial is: " + product + " which sums to: " + sum);

