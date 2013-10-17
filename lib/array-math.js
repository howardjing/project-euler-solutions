// copied from 016-power-digit-sum.js
var add = function(array1, array2) {
  array1 = array1.slice(0, array1.length).reverse();
  array2 = array2.slice(0, array2.length).reverse();
  var numDigits = Math.max(array1.length, array2.length);

  var carry = 0;
  var sum = [];
  for (var i=0; i<numDigits; i++) {
    var digit = (array1[i] || 0) + (array2[i] || 0) + carry
    if (digit > 9) {
      carry = 1;
    } else {
      carry = 0;
    }
    digit = digit % 10;
    sum.push(digit);
  }
  if (carry > 0) {
    sum.push(carry);
  }
  return sum.reverse();
}

exports.add = add;