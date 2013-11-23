/*
The prime 41, can be written as the sum of six consecutive primes:
41 = 2 + 3 + 5 + 7 + 11 + 13

This is the longest sum of consecutive primes that adds to a prime 
below one-hundred. The longest sum of consecutive primes below 
one-thousand that adds to a prime, contains 21 terms, 
and is equal to 953.

Which prime, below one-million, can be written as the sum of 
the most consecutive primes?
*/

function range(start, stop) {
  var array = [];
  for (var i=start; i<=stop; i++) {
    array.push(i);
  }
  return array;
}

function sieve(limit) {
  var primes = [];
  var candidates = range(2, limit);
  candidates.forEach(function(candidate, i) {
    if (candidate) {
      primes.push(candidate);
      for (var j=i; j<candidates.length; j+=candidate) {
        candidates[j] = null;
      }
    }
  });
  return primes;
}

// return the length of longest sum of consecutive primes
function consecutives(n) {
  // console.log('computing ' + n)
  var sum = 0;
  var counter = 0;
  var nextPrimeIndex = 0;
  for (var start=nextPrimeIndex; primes[start] <= Math.ceil(n/2); start++) {
    while(sum < n) {
      // console.log("adding " + primes[nextPrimeIndex] + " to " + sum + " yields " + (sum + primes[nextPrimeIndex]));
      // console.log('(starting from ' + primes[start] + ')')
      sum += primes[nextPrimeIndex];
      counter += 1;
      nextPrimeIndex += 1;
    }

    if (sum == n) {
      // console.log('since ' + sum + ' == ' + n + ', returning result of ' + counter);
      // console.log('this was a result of starting the summation from ' + primes[start] + ' until ' + primes[nextPrimeIndex - 1]);
      return counter;
    }
    
    // at this point, sum > n
    // must clean up for next iteration:
    nextPrimeIndex -= 1;
    sum -= primes[start] + primes[nextPrimeIndex];
    counter -= 2;
    // console.log('backtracking! ' + 'the next prime to add will be ' + primes[nextPrimeIndex]);
  }
  return -1;
}

var primes = sieve(1000000);
console.log("There are " + primes.length + " primes under 1,000,000");

var max = -1;
var answer = -1;
primes.forEach(function(prime, i) {
  var count = consecutives(prime);
  if (count > max) {
    max = count;
    answer = prime;
  }
});
console.log("The longest sum of consecutive primes is " + answer + " with a count of " + max);