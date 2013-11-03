/*
The number, 1406357289, is a 0 to 9 pandigital number because it is made 
up of each of the digits 0 to 9 in some order, but it also has a rather 
interesting sub-string divisibility property.

Let d1 be the 1st digit, d2 be the 2nd digit, and so on. 
In this way, we note the following:

    d2d3d4=406 is divisible by 2
    d3d4d5=063 is divisible by 3
    d4d5d6=635 is divisible by 5
    d5d6d7=357 is divisible by 7
    d6d7d8=572 is divisible by 11
    d7d8d9=728 is divisible by 13
    d8d9d10=289 is divisible by 17

Find the sum of all 0 to 9 pandigital numbers with this property.
*/

var permute = function(digits) {
  if (digits.length === 0) {
    return [[]];
  }

  var permutations = [];
  digits.forEach(function(head, i) {
    var subproblem = digits.slice(0,i).concat(digits.slice(i+1, digits.length));
    permute(subproblem).forEach(function(permutation) {
      permutation.unshift(head);
      permutations.push(permutation);
    });
  });
  return permutations;
}

var range = function(start, stop) {
  var a = [];
  for (var i=start; i<=stop; i++) {
    a.push(i);
  }
  return a;
}

var toInt = function(digits) {
  return parseInt(digits.join(""), 10);
}

var pandigitals = function(n) {
  var digits = range(0,n);
  return permute(digits);
}

// pandigital must be an array of integers with length 10
var subdivide = function(pandigital) {
  var slices = [];
  for (var i=1; i<=pandigital.length - 3; i++) {
    slices.push(pandigital.slice(i, i+3));
  }
  return slices;
}

var primes = [2,3,5,7,11,13,17];
var isSubdividable = function(pandigital) {
  return subdivide(pandigital).every(function(slice, i) {
    return toInt(slice) % primes[i] == 0;
  });
}

var subdividable = pandigitals(9).filter(function(pandigital) {
  return isSubdividable(pandigital);
});

var sum = subdividable.reduce(function(total, pandigital) {
  return total + toInt(pandigital);
}, 0);

console.log("Subdividable pandigitals: ");
console.log(subdividable);
console.log("The total sum: " + sum);

