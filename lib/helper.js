var identity = function(x) {
  return x;
}

// so don't have to do memoize stuff over and over
var memoize = function(fn, hash) {
  var lookup = {};
  hash = hash || identity;
  return function() {
    var key = hash.apply(this, arguments);
    if (lookup[key] === undefined) {
      lookup[key] = fn.apply(this, arguments);
    }
    return lookup[key];
  }
}

// based on 012-highly-divisible-triangular-number
// Find the prime factors in the form of
// { base1: exponent1, base2: exponent2 }
// => base1^exponent1 * base2^exponent2
var primeFactorization = function(number) {
  if (number == 1) {
    return {};
  }
  
  var factors = {};
  var potentialFactor = 2;
  while (potentialFactor < number) {
    if (number % potentialFactor == 0) {
      var factors1 = primeFactorization(potentialFactor);
      var factors2 = primeFactorization(number / potentialFactor);

      for (var factor in factors1) {
        factors[factor] = factors1[factor];
      }

      for (var factor in factors2) {
        factors[factor] = (factors[factor] || 0) + factors2[factor];
      }

      return factors;
    }
    potentialFactor += 1;
  }

  // the number must be prime
  factors[number] = 1;
  return factors;
}

// for memoizing functions (pretty much same as underscore memoize)
exports.memoize = memoize;

// for finding prime factorization of n
exports.primeFactorization = memoize(primeFactorization);