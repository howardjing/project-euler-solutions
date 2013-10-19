/*
Starting with the number 1 and moving to the right in a clockwise direction 
a 5 by 5 spiral is formed as follows:

21 22 23 24 25
20  7  8  9 10
19  6  1  2 11
18  5  4  3 12
17 16 15 14 13

It can be verified that the sum of the numbers on the diagonals is 101.

What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral 
formed in the same way?
*/

var clone = function(list) {
  return list.slice(0, list.length);
}

// the diagonals of an nxn spiral;
var diagonals = function(n) {
  if (n % 2 == 0) {
    console.log("only odd spirals work");
    return [];
  }

  if (n == 1) {
    return [1];
  }

  var smaller = clone(diagonals(n-2));
  var increment = n - 1;
  var last = smaller[smaller.length-1];
  for (var i=1; i<= 4; i++) {
    smaller.push(last + i*increment);
  }

  return smaller;
}

var sum = diagonals(1001).reduce(function(a,b) {
  return a + b;
});
console.log("The sum of numbers on the diagonals of a 1001x1001 spiral is: " + sum);