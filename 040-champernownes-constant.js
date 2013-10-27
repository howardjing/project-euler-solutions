/*
An irrational decimal fraction is created by concatenating the positive integers:

0.123456789101112131415161718192021...

It can be seen that the 12th digit of the fractional part is 1.

If dn represents the nth digit of the fractional part, 
find the value of the following expression.

d_1 × d_10 × d_100 × d_1000 × d_10000 × d_100000 × d_1000000
*/

var counter = 1;
var champ = "";
while (champ.length < 1000000) {
  champ += counter;
  counter += 1;
}

var digits = [1,10,100,1000,10000,100000,1000000];
var values = [];
digits.forEach(function(i) {
  values.push(parseInt(champ[i-1], 10));
});

// console.log(champ);
console.log("The twelvth digit: " + champ[11]);

console.log("The values are: ");
console.log(values);

var product = values.reduce(function(a,b) { return a * b; });
console.log("The product is: " + product);