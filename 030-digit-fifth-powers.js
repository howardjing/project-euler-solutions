var start = 2;
var stop  = 999999; // (9 ^ 5) * 10 has six digits, so that seems like a reasonable stopping point
var power = 5;

var digits = function(number) {
  return number.toString().split("").map(function(digit) {
    return parseInt(digit, 10);
  })
};

var sum = function(a, b) {
  return a + b;
}

var answers = [];
for (var i=start; i<=stop; i++) {
  var sumOfPowers = digits(i).map(function(digit) {
    return Math.pow(digit, power);
  }).reduce(sum);

  if (i == sumOfPowers) {
    answers.push(i);
  }
}
console.log("Numbers: " + answers);
console.log("Sum: " + answers.reduce(sum));
