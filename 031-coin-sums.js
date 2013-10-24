/*
In England the currency is made up of pound, £, and pence, p, 
and there are eight coins in general circulation:

    1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

    1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

How many different ways can £2 be made using any number of coins?
*/

// primes in this context means one of the coins (maybe should have called it generator?)
var primes = [1,2,5,10,20,50,100,200];
var memoize = require('./lib/helper').memoize;

var getKey = function(factorization) {
  var key = "";
  var comma = "";
  var factors = Object.keys(factorization);
  factors.sort().forEach(function(factor) {
    key += comma + factor + "^" + factorization[factor];
    comma = ", ";
  })
  return key;
}

var merge = function(factors1, factors2) {
  var f = {};
  for (var base in factors1) {
    f[base] = factors1[base];
  }

  for (var base in factors2) {
    f[base] = (f[base] || 0) + factors2[base];
  }
  return f;
}

// method is super slow for 200 (gonna take an alternate approach)
var _combos = function(n) {
  var answer = {};
  var factorizations = [];

  // there is a base coin
  if (primes.indexOf(n) != -1) {
    f = {};
    f[n] = 1;
    factorizations.push(f);
  }

  var bases = primes.filter(function(prime) {
    return prime < n;
  });

  bases.forEach(function(base) {
    var i = base;
    var j = n - base;

    combos(i).forEach(function(combo1) {
      combos(j).forEach(function(combo2) {
        var factorization = merge(combo1, combo2);
        var key = getKey(factorization);
        if (!answer[key]) {
          factorizations.push(factorization);
        }
        answer[key] = true;
      });
    });
  });

  return factorizations;
}

var combos = memoize(_combos);

//  ============= Faster way =============
// how many ways to make n in change
// using only coins <= choice?
var _count = memoize(function(choice, n) {
  var relevantPrimes = primes.filter(function(prime) {
    return prime <= choice;
  });

  if (n < 0) {
    return 0;
  }

  if (n == 0) {
    return 1;
  }

  var sum = 0;
  relevantPrimes.forEach(function(prime) {
    // given that we have chosen to use prime,
    // sum up the remaining ways 
    sum += _count(prime, n - prime);
  });
  return sum;
}, function(choice, n) {
  return choice + "," + n;
});

var count = function(n) {
  return _count(n,n);
}

for (var i=1; i<=30; i++) {
  console.log("---");
  console.log("there are " + combos(i).length + " ways to get " + i);
  console.log("another way: " + count(i));
}
console.log("There are " + count(200) + " ways to get to 200");

