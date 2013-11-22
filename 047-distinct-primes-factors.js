/*
The first two consecutive numbers to have two distinct prime factors are:

14 = 2 × 7
15 = 3 × 5

The first three consecutive numbers to have three distinct prime factors are:

644 = 2² × 7 × 23
645 = 3 × 5 × 43
646 = 2 × 17 × 19.

Find the first four consecutive integers to have four distinct prime factors. 
What is the first of these numbers?
*/

// a mapping of n -> { x1: y1, x2: y2, ... xm: ym } 
// where x_i is a prime factor and y_i is the corresponding exponent
factors = {};

function distinctFactorsCount(primeFactorization) {
  return Object.keys(primeFactorization).length
}

// will blow up if n <= 1 (I don't care though)
function isPrime(n) {
  primeFactors = primeFactorization(n);
  if (distinctFactorsCount(primeFactors) == 1) {
    for (var factor in primeFactors) {
      if (primeFactors[factor] == 1) {
        return true
      }
    }
  }
  return false;
}

// will blow up if n <= 1
function primeFactorization(n) {
  var limit = Math.min(Math.ceil(Math.sqrt(n)), n-1);
  for (var i=2; i<=limit; i++) {
    if (n % i == 0) {
      var a = i; // factor 1
      var b = n / a; // factor 2
      factors[n] = merge(primeFactorization(a), primeFactorization(b));
      return factors[n];
    }
  }

  // n must be prime
  var factorization = {};
  factorization[n] = 1;
  factors[n] = factorization;
  return factors[n];
}

function merge(as, bs) {
  var factorization = {};
  for (var factor in as) {
    factorization[factor] = as[factor];
  }
  for (var factor in bs) {
    factorization[factor] = (factorization[factor] || 0) + bs[factor];
  }
  return factorization;
}

var consecutive = 4;
var ns = [];
var i = 2;
while (ns.length != consecutive) {
  if (distinctFactorsCount(primeFactorization(i)) == consecutive) {
    ns.push(i);
  } else {
    ns = [];
  }

  i+=1;
}
console.log(ns);
