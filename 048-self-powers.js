/*
The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.
Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 10001000.
*/

// 1, 5, 32, 288, 3413, ...
// since only care about last 10 digits, can probably mod by 10^10

var base = Math.pow(10,10);
var limit = 1000;
var sum = 0;
for (var i=1; i<=limit; i++) {
  sum += power(i, i);
}
console.log("The last digits are: " + sum);

function power(a,b) {
  var product = 1;
  for (var i=0; i<b; i++) {
    product = (product * a) % base;
  }
  return product;
}


