/*
We shall say that an n-digit number is pandigital if it makes 
use of all the digits 1 to n exactly once; for example, the 5-digit number, 
15234, is 1 through 5 pandigital.

The product 7254 is unusual, as the identity, 39 × 186 = 7254, 
containing multiplicand, multiplier, and product is 1 through 9 pandigital.

Find the sum of all products whose multiplicand/multiplier/product 
identity can be written as a 1 through 9 pandigital.
HINT: Some products can be obtained in more than one way so be sure to 
only include it once in your sum.
*/

var permute = function(string) {
  if (string.length == 1) {
    return [string];
  }

  var head = string.substring(0,1);
  var rest = string.substring(1, string.length);
  var permutations = [];
  permute(rest).forEach(function(permutation) {
    for (var i=0; i<=permutation.length; i++) {
      var first = permutation.substring(0,i);
      var middle = head;
      var last = permutation.substring(i,permutation.length);
      permutations.push(first + middle + last);
    }
  });

  return permutations;
}

var permutations = permute("123456789");

var toInt = function(string) {
  return parseInt(string, 10);
}

// a permutation of 123456789 (hardcoded to have 9 digits)
var findPandigitalProducts = function(sequence) {
  var limit = 6;
  var products = [];
  for (var i=1; i<limit; i++) {
    for (var j=i+1; j<=limit; j++) {
      var multiplicand = toInt(sequence.substring(0,i));
      var multiplier = toInt(sequence.substring(i, j));
      var product = toInt(sequence.substring(j, sequence.length));
      // console.log(multiplicand + " x " + multiplier + " = " + product);
      if (multiplier * multiplicand == product) {
        products.push(product);
      }
    }
  }
  return products;
}
console.log(findPandigitalProducts("391867254"))

var products = {};
permutations.forEach(function(permutation) {
  findPandigitalProducts(permutation).forEach(function(product) {
    products[product] = true;
  });
});
console.log(products);
var sum = Object.keys(products).reduce(function(a, b) {
  return a + toInt(b);
}, 0);
console.log("The sum of pandigital products is: " + sum);

