/*
Euler discovered the remarkable quadratic formula:

n² + n + 41

It turns out that the formula will produce 40 primes for the 
consecutive values n = 0 to 39. 
However, when n = 40, 40^2 + 40 + 41 = 40(40 + 1) + 41 is divisible by 41, 
and certainly when n = 41, 41² + 41 + 41 is clearly divisible by 41.

The incredible formula  n² − 79n + 1601 was discovered, 
which produces 80 primes for the consecutive values n = 0 to 79. 
The product of the coefficients, −79 and 1601, is −126479.

Considering quadratics of the form:

    n² + an + b, where |a| < 1000 and |b| < 1000

    where |n| is the modulus/absolute value of n
    e.g. |11| = 11 and |−4| = 4

Find the product of the coefficients, a and b, for the quadratic expression 
that produces the maximum number of primes for consecutive values of n, 
starting with n = 0.
*/

var primeLimit = 200000
var sieve = require('./lib/primes').sieve;
var primes = {}
sieve(primeLimit).forEach(function(prime) {
  primes[prime] = true;
})

var isPrime = function(n) {
  if (n > primeLimit) {
    console.log("ERROR: recalculate sieve: " + n + " is greater than " + primeLimit);
    return false;
  }

  return !!primes[n];
}

var quadratic = function(n,a,b) {
  return (n*n + a*n + b);
}

var consecutives = 0;
var a, b;
var start = -999;
var stop = 1000;
for (var i=start; i<stop; i++) {
  for (var j=start; j<stop; j++) {
    var n = 0;
    while (isPrime(quadratic(n,i,j))) {
      n += 1;
    }    
    if (n > consecutives) {
      consecutives = n;
      a = i;
      b = j;
    }
  }
}

// for (var i=0; i<=consecutives; i++) {
//   var prime = quadratic(i,a,b);
//   console.log("quadratic(" + i + "," + a + "," + b + ")")
//   console.log("number " + prime + " is prime: " + isPrime(prime));
// }
console.log("There are " + consecutives + " in a row using (a,b) (" + a + "," + b + ")");
console.log("The product is: " + a * b);