/*
A unit fraction contains 1 in the numerator. The decimal representation of 
the unit fractions with denominators 2 to 10 are given:

    1/2 =   0.5
    1/3 =   0.(3)
    1/4 =   0.25
    1/5 =   0.2
    1/6 =   0.1(6)
    1/7 =   0.(142857)
    1/8 =   0.125
    1/9 =   0.(1)
    1/10  =   0.1

Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. 
It can be seen that 1/7 has a 6-digit recurring cycle.

Find the value of d < 1000 for which 1/d contains the longest recurring 
cycle in its decimal fraction part.
*/

// divide(7, 1) = 1 / 7
// returns an array of decimals and whether or not there was a cycle
// divide(7, 1) => [ [ 0, 1, 4, 2, 8, 5, 7, 1 ], true ]
var divide = function(denominator, numerator) {
  var seen = {}; // the set of numbers we've already seen
  var remainder = numerator;
  var answer = [];
  var lag;
  // find all digits and one extra
  while (remainder != 0 && (seen[lag] || 0) <= 1) {
    lag = remainder;
    var closest = Math.floor(remainder / denominator);
    var remainder =  (remainder - (denominator * closest)) * 10; 
    answer.push(closest);
    seen[lag] = (seen[lag] || 0) + 1;
  }

  return [answer, remainder != 0];
}

// only works for the output of divide
var cycleLength = function(data) {
  var hasCycle = data[1];
  if (!hasCycle) {
    return 0;
  }

  var cycle = data[0];
  var startOfCycle = cycle[cycle.length - 1];
  return (cycle.length - 1) - cycle.indexOf(startOfCycle) 
}

var d = 0;
var max = 0;
var limit = 1000;
for (var i=2; i<limit; i++ ) {
  var length = cycleLength(divide(i, 1));
  if (length > max) {
    max = length;
    d = i;
  }
}
console.log("d = " + d + " provides the longest recurring cycle, with a length of: " + max);
