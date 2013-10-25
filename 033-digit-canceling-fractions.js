/*
The fraction 49/98 is a curious fraction, as an inexperienced mathematician 
in attempting to simplify it may incorrectly believe that 49/98 = 4/8, 
which is correct, is obtained by cancelling the 9s.

We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
There are exactly four non-trivial examples of this type of fraction, 
less than one in value, and containing two digits in the numerator and 
denominator.

If the product of these four fractions is given in its lowest common terms, 
find the value of the denominator.
*/

var fractions = [];
var start = 11;
var stop = 99;
for (var numerator=start; numerator<stop; numerator++) {
  for (var denominator=numerator+1; denominator<=stop; denominator++) {
    if (numerator % 10 != 0 && denominator % 10 != 0) {
      fractions.push({numerator: numerator, denominator: denominator});
    }
  }
}

// Euclid's algorithm
var gcd = function(a,b) {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

// reduce a fraction into lowest common term
var lowestCommonTerm = function(fraction) {
  var divisor = gcd(fraction.numerator, fraction.denominator);
  return { 
    numerator: fraction.numerator / divisor, 
    denominator: fraction.denominator / divisor
  };
}

var isEqual = function(fraction1, fraction2) {
  var a = lowestCommonTerm(fraction1);
  var b = lowestCommonTerm(fraction2);
  return a.numerator == b.numerator && a.denominator == b.denominator;
}

// returns 12 as [1,2]
var distinctDigits = function(number) {
  return number.toString().split("").map(function(a) {
    return parseInt(a, 10);
  })
}

var isCurious = function(fraction) {
  var numDigits = distinctDigits(fraction.numerator);
  var denomDigits = distinctDigits(fraction.denominator);

  var hash = {};
  numDigits.forEach(function(digit, i) {
    // lazy way to store the other digit
    hash[digit] = numDigits[(i + 1) % 2]; 
  });


  return denomDigits.some(function(digit, i) {
    if (hash[digit] !== undefined) {
      var simplified = {
        numerator: hash[digit],
        denominator: denomDigits[(i + 1) % 2]
      }

      if (isEqual(fraction, simplified)) {
        return true;
      }
    }
    return false;
  });

}
var curious = fractions.filter(function(fraction) {
  return isCurious(fraction);
})

console.log("Curious fractions are")
console.log(curious)

var product = lowestCommonTerm(curious.reduce(function(a,b) {
  return {
    numerator: a.numerator * b.numerator,
    denominator: a.denominator * b.denominator
  };
}));
console.log("The product is: ");
console.log(product)