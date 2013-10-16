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

// === copy pasted from 021-amicable-numbers start ===
var clone = function(array) {
  return array.slice(0, array.length);
}

var candidates = function(factorization) {
  var answer = [];
  for (var key in factorization) {
    var base = parseInt(key);
    var maxExp = factorization[key];
    answer.push([]);
    for (var i=0; i<=maxExp; i++) {
      answer[answer.length-1].push(Math.pow(base, i));
    }
  }
  return answer;
}

// will return something like:
// [[1,2,3], [3,4,5]]
var factorization = function(candidates) {
  if (candidates.length == 0) {
    return [[]];
  }
  var answer = [];
  var head = candidates[0];
  factorization(candidates.slice(1, candidates.length))
  .forEach(function(subcandidate) {
    head.forEach(function(factor) {
      var candidate = clone(subcandidate);
      candidate.unshift(factor);
      answer.push(candidate);
    });
  });
  return answer;
}

// proper divisors of n
var divisors = function(n) {
  return factorization(candidates(primeFactorization(n)))
    .map(function(factors) {
      return factors.reduce(function(a,b) {
        return a * b;
      }, 1);
    })
    .filter(function(factor) {
      return factor < n;
    });
}
// === copy pasted from 021-amicable-numbers end ===

// for memoizing functions (pretty much same as underscore memoize)
exports.memoize = memoize;

// for finding prime factorization of n
exports.primeFactorization = memoize(primeFactorization);

exports.divisors = divisors;