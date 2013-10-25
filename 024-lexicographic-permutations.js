/*
A permutation is an ordered arrangement of objects. 
For example, 3124 is one possible permutation of the digits 
1, 2, 3 and 4. If all of the permutations are listed numerically 
or alphabetically, we call it lexicographic order. 
The lexicographic permutations of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the digits 
0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
*/
var memoize = require('./lib/helper').memoize;

var clone = function(array) {
  return array.slice(0, array.length);
}
// remove thing from the array
var remove = function(array, thing) {
  array.splice(array.indexOf(thing), 1);
  return array;
}

var hash = {};
var permute = memoize(function(string) {
  if (string.length == 0) {
    return [''];
  }

  var permutations = [];
  var things = string.split("");
  things.forEach(function(thing) {
    var subset = remove(clone(things), thing).join("");
    permute(subset).forEach(function(permutation) {
      permutation = thing.toString() + permutation;
      permutations.push(permutation);
    });
  });
  return permutations;
});
console.log('The millionth term is: ' + permute("0123456789")[999999]);
