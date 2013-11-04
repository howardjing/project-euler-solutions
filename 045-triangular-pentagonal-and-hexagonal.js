/*
Triangle, pentagonal, and hexagonal numbers are generated 
by the following formulae:

Triangle      T_n=n(n+1)/2       1, 3, 6, 10, 15, ...
Pentagonal      P_n=n(3n−1)/2      1, 5, 12, 22, 35, ...
Hexagonal       H_n=n(2n−1)      1, 6, 15, 28, 45, ...

It can be verified that T_285 = P_165 = H_143 = 40755.

Find the next triangle number that is also pentagonal and hexagonal.
*/

// translated from 042-coded-triangle-numbers.rb
var discriminant = function(a,b,c) {
  return (b * b) - (4*a*c);
}

var isInt = function(n, epsilon) {
  epsilon = epsilon || 0;
  return  n % 1 <= epsilon;
}
var isOdd = function(n, epsilon) {
  epsilon = epsilon || 0;
  return (n % 2) - 1 <= epsilon;
}

var isTriangle = function(number, epsilon) {
  x = Math.sqrt(discriminant(1,1, -2 * number))
  return isInt(x) && isOdd(x);
}

// copied from 044-pentagon-numbers.js
var isPentagonal = function(p, epsilon) {
  epsilon = epsilon || 0
  return (Math.sqrt(1 + 24 * p) - 5) % 6 <= epsilon;
}

// logic is same as from 044-pentagon-numbers.js
var isHexagonal = function(n, epsilon) {
  epsilon = epsilon || 0;
  return (Math.sqrt(discriminant(2,-1,-1 * n)) - 3) % 4 <= epsilon;
}

var isSpecial = function(n) {
  return isTriangle(n) && isPentagonal(n) && isHexagonal(n);
}

var hexagonal = function(n) {
  return n * (2*n - 1);
}
var n = 144;
var term;
while (true) {
  if (isSpecial(hexagonal(n))) {
    term = n;
    console.log("The nth hexagonal term is: " + n);
    break;
  }
  n++;
}
console.log("The special number is: " + hexagonal(term));