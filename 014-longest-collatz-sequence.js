/*
The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. 
Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers 
finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.
*/

// returns the count of the collatz chain
var hash = {};
var collatz = function(number) {
  if (hash[number]) {
    return hash[number];
  }
  if (number == 1) {
    return 1;
  }

  var previous;
  if (number % 2 == 0) {
    previous = collatz(number / 2);
  } else {
    previous = collatz(3 * number + 1);
  }

  var answer = previous + 1;
  hash[number] = answer;
  return answer;
}

var limit = 1000000;
var number = 1;
var max = 1;
for (var i=1; i < limit; i++) {
  var count = collatz(i);
  if (count > max) {
    number = i;
    max = count;
  }
}
console.log("The number " + number + " produces a chain of " + max);