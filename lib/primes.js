
// based on 010-summation-of-primes.rb
var sieve = function(limit) {
  var numbers = [];
  for (var i=2; i<=limit; i++) {
    numbers.push(i);
  }
  numbers.forEach(function(prime) {
    if (prime) {
      var nonprime = prime + prime;
      while (nonprime <= limit) {
        numbers[nonprime - 2] = null;
        nonprime += prime
      }
    }
  });
  return numbers.filter(function(number) {
    return number != null;
  });
}

exports.sieve = sieve;

