/*
The number 3797 has an interesting property. Being prime itself, 
it is possible to continuously remove digits from left to right, 
and remain prime at each stage: 

3797, 797, 97, and 7. 

Similarly we can work from right to left: 

3797, 379, 37, and 3.

Find the sum of the only eleven primes that are both truncatable 
from left to right and right to left.

NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
*/

// The following five are known:
// 3797, 797, 97, 379, 37

var sieve = require('./lib/primes').sieve;
var primes = sieve(2000000);

var hash = {};
primes.forEach(function(prime) {
  hash[prime] = true;
});
var isPrime = function(n) {
  return !!hash[n];
}

var truncateBack = function(n) {
  var string = n.toString();
  var truncations = [];
  for (var i=1; i<=string.length; i++) {
    truncations.push(parseInt(string.substring(0,i), 10));
  }
  return truncations;
}

var truncateFront = function(n) {
  var string = n.toString();
  var truncations = [];
  for (var i=string.length-1; i>=0; i--) {
    truncations.push(parseInt(string.substring(i,string.length), 10));
  }
  return truncations;
}

var truncations = function(n) {
  return truncateBack(n).concat(truncateFront(n));
}

var isTruncatable = function(n) {
  if (n < 10) {
    return false;
  }

  return truncations(n).every(function(truncation) {
    return isPrime(truncation);
  });
}

var truncatable = primes.filter(function(p) {
  return isTruncatable(p);
});
console.log("Truncatable primes length: " + truncatable.length);
console.log(truncatable);
var sum = truncatable.reduce(function(a,b) { return a + b; });
console.log("The total sum is: " + sum);