/*
Let d(n) be defined as the sum of proper divisors of n 
(numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and 
each of a and b are called amicable numbers.

For example, the proper divisors of 220 are 
1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; 
therefore d(220) = 284. The proper divisors of 284 are 
1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.
*/

var helper = require('./lib/helper');
var memoize = helper.memoize;
var primeFactorization = helper.primeFactorization;

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

// kind of like finding a powerset
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

var d = function(n) {
  return divisors(n).
    reduce(function(a,b) {
      return a + b;
    }, 0);
}

var isAmicable = function(a) {
  var b = d(a);
  return d(b) == a && a != b;
}

var test = 220;
console.log("Divisors of " + test + ": " + divisors(test));
console.log("d(" + test + "): " + d(test));
console.log("d(" + d(test) + "): " + d(d(test)));
console.log("is it amicable? " + isAmicable(test));

console.log("Calculating sum of all amicable numbers < 10000...");
var sum = 0;
for (var i=2; i<10000; i++) {
  if (isAmicable(i)) {
    // console.log(i + " is amicable!")
    sum += i;
  }
}
console.log("total sum: " + sum);
