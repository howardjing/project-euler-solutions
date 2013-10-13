/*
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
What is the sum of the digits of the number 2^1000?
*/

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

var hash = {};
// an array of 2^n
var power = function(n) {
  if (hash[n]) {
    return hash[n];
  }

  if (n == 1) {
    return [2];
  }
  var answer = add(power(n-1), power(n-1));
  hash[n] = answer;
  return answer;
}

var sumDigits = function(array) {
  return array.reduce(function(a,b) {
    return a + b;
  });
}

console.log("The sum of the digits of 2^15 is:   " + sumDigits(power(15)));
console.log("The sum of the digits of 2^1000 is: " + sumDigits(power(1000)));

