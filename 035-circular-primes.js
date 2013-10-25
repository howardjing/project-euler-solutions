/*
The number, 197, is called a circular prime because all rotations of the digits: 
197, 971, and 719, are themselves prime.

There are thirteen such primes below 100: 
2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

How many circular primes are there below one million?
*/

var sieve = require('./lib/primes').sieve;
var toDigits = function(n) {
  return n.toString().split("").map(function(a) {
    return parseInt(a, 10);
  });
};

var toInt = function(array) {
  return parseInt(array.join(""), 10);
};

var rotate = function(n) {
  var rotations = [];
  var elements = toDigits(n);
  for (var i=0; i<elements.length; i++) {
    rotations.push(toInt(elements));
    elements.push(elements.shift());
  }
  return rotations;
};

var primes = sieve(1000000);
var hash = {};
primes.forEach(function(prime) {
  hash[prime] = true;
});
var isPrime = function(n) {
  return !!hash[n];
}
var circular = primes.filter(function(prime) {
  return rotate(prime).every(function(rotation) {
    return isPrime(rotation);
  });
});

console.log("Circular primes");
console.log(circular);
console.log("Length: " + circular.length);
