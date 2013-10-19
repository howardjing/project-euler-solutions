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

// === copied from 020-factorial-digit-sum.js start ===
var toNum = function(array) {
  return parseInt(array.join(""));
}

var toArray = function(num) {
  return num.toString().split("").map(function(i) {
    return parseInt(i, 10);
  });
}

var mult = function(array1, array2) {
  var smaller;
  var larger;
  if (array1.length < array2.length) {
    smaller = array1;
    larger = array2;
  } else {
    smaller = array2;
    larger = array1;
  }

  var numTimes = toNum(smaller);
  var cumulative = [0];
  for (var i=0; i<numTimes; i++) { 
    cumulative = add(larger, cumulative);
  }
  return cumulative;
}
// === copied from 020-factorial-digit-sum.js start ===

var power = function(array1, array2) {
  var times = parseInt(array2.join(""), 10);
  var answer = [1];
  for (var i=0; i<times; i++) {
    answer = mult(answer, array1);
  }
  return answer;
}
exports.toArray = toArray;
exports.add = add;
exports.power = power;