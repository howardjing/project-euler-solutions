/*
The arithmetic sequence, 1487, 4817, 8147, in which each of the terms
increases by 3330, is unusual in two ways: 

(i) each of the three terms are prime, and, 
(ii) each of the 4-digit numbers are permutations of one another.

There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, 
exhibiting this property, but there is one other 4-digit increasing sequence.

What 12-digit number do you form by concatenating the three terms in this sequence?
*/

// given a number, return a string representing a permutation of n
function baseComponent(n) {
  return n.toString().split("").sort().join("");
}

function range(start, end) {
  var array = [];
  for (var i=start; i<=end; i++) {
    array.push(i);
  }
  return array;
}

function sieve(limit) {
  var primes = [];
  candidates = range(2, limit);
  for (var i=0; i<candidates.length; i++) {
    var prime = candidates[i];
    if (prime) {
      primes.push(prime);
      for (var j=i; j<=limit; j+=prime) {
        candidates[j] = null;
      }
    }
  }
  return primes;
}

// given a sorted array, return all sequences of length = 3
function findSequences(numbers) {
  // console.log(numbers)
  var sequences = [];
  if (numbers.length < 3) {
    return sequences;
  }

  for (var i=0; i<=numbers.length-3; i++) {
    for (var j=i+1; j<=numbers.length-2; j++) {
      var increment = numbers[j] - numbers[i];
      for (var k=j+1; k<=numbers.length-1; k++) {
        if (numbers[k] - numbers[j] == increment) {
          sequences.push([numbers[i], numbers[j], numbers[k]]);
          break;
        }
      }
    }
  }
  return sequences
}

var primes = sieve(10000);
var permutations = {};
primes.forEach(function(prime) {
  var key = baseComponent(prime);
  if (!permutations[key]) {
    permutations[key] = [];
  }
  permutations[key].push(prime);
});

for (var key in permutations) {
  var sequences = findSequences(permutations[key].sort());
  sequences.forEach(function(sequence) {
    console.log(sequence);
  });
}
