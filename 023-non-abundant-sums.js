/*
A perfect number is a number for which the sum of its proper divisors 
is exactly equal to the number. For example, the sum of the 
proper divisors of 28 would be 
1 + 2 + 4 + 7 + 14 = 28, 
which means that 28 is a perfect number.

A number n is called deficient if the sum of its proper divisors is 
less than n and it is called abundant if this sum exceeds n.

As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, 
the smallest number that can be written as the sum of two abundant numbers 
is 24. By mathematical analysis, it can be shown that all integers greater than 
28123 can be written as the sum of two abundant numbers. 

However, this upper limit cannot be reduced any further by analysis even though 
it is known that the greatest number that cannot be expressed as the sum of two
abundant numbers is less than this limit.

Find the sum of all the positive integers which cannot be written as the sum of
two abundant numbers.
*/

var divisors = require('./lib/helper').divisors;

// determine whether or not a number is abundant
var isAbundant = function(n) {
  return divisors(n).reduce(function(a,b) {
    return a + b;
  }, 0) > n;
};
console.log('Is 12 abundant: ' + isAbundant(12));
console.log('Is 11 abundant: ' + isAbundant(11));

// determine whether or not a strictly positive number can be summed
// from a dictionary of strictly positive candidates
var isSummable = function(n, dictionary) {
  for (var number in dictionary) {
    if (number >= n) {
      return false;
    }

    var b = n - number;
    if (dictionary[b] !== undefined) {
      return true;
    }
  }
  return false;
}
console.log('Can 5 be summed from { 2, 3 }: ' + 
  isSummable(5, { 2: true, 3: true}));
console.log('Can 5 b summed from { 2 }: ' + 
  isSummable(5, { 2: true }));
var limit = 28123;
// find all abundant numbers <= 28123 and test whether or not they are
// summable
var abundant = {};
var unsummable = [];
for (var i=1; i<= limit; i++) {
  if (isAbundant(i)) {
    abundant[i] = true;
  }
  if (!isSummable(i, abundant)) {
    unsummable.push(i);
  }
} 
console.log('sum of unsummable numbers <= ' + limit + ':');
console.log(unsummable.reduce(function(a,b) {
  return a + b;
}));

// NOTE: this solution runs relatively slowly, around 11 seconds so can be optimized
