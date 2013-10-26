/*
The decimal number, 585 = 10010010012 (binary), is palindromic in both bases.
Find the sum of all numbers, less than one million, which are 
palindromic in base 10 and base 2.

(Please note that the palindromic number, in either base, may not include 
leading zeros.)
*/

var reverse = function(string) {
  return string.split("").reverse().join("");
}

var isPalindrome = function(thing) {
  var forwards = thing.toString();
  var backwards = reverse(forwards);
  return forwards == backwards;
}

var isSuperPalindrome = function(thing) {
  return isPalindrome(thing) && isPalindrome(thing.toString(2));
}

var limit = 1000000;
var palindromes = [];
for (var i=1; i<limit; i++) {
  if (isSuperPalindrome(i)) {
    palindromes.push(i);
  }
}

console.log("There are " + palindromes.length + " super palindromes under " + limit);
console.log(palindromes);
var sum = palindromes.reduce(function(a,b) { return a + b;});
console.log("These super palindromes sum up to: " + sum);