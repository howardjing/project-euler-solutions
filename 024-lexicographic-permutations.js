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
