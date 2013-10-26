/*
Take the number 192 and multiply it by each of 1, 2, and 3:

    192 × 1 = 192
    192 × 2 = 384
    192 × 3 = 576

By concatenating each product we get the 1 to 9 pandigital, 192384576. 
We will call 192384576 the concatenated product of 192 and (1,2,3)

The same can be achieved by starting with 9 and multiplying by 
1, 2, 3, 4, and 5, giving the pandigital, 918273645, 
which is the concatenated product of 9 and (1,2,3,4,5).

What is the largest 1 to 9 pandigital 9-digit number that can be formed 
as the concatenated product of an integer with (1,2, ... , n) where n > 1?
*/

var hasRepeats = function(n) {
  var string = n.toString();
  var hash = {};
  for (var i=0; i<string.length; i++) {
    if (hash[string[i]]) {
      return true;
    }
    hash[string[i]] = true;
  }
  return false;
}

var isPandigital = function(string) {
  if (string.length != 9) {
    return false;
  }

  var hash = {};
  for (var i=0; i<string.length; i++) {
    if (string[i] === "0") {
      return false;
    }

    if (hash[string[i]]) {
      return false
    }

    hash[string[i]] = true;
  }

  return true;
}

var constructPandigital = function(n) {
  var multiplier = 1;
  var string = "";
  
  while (!hasRepeats(string) && string.length < 9) {
    string += n * multiplier;
    multiplier += 1;
  }

  if (isPandigital(string)) {
    return parseInt(string, 10); 
  }  else {
    return 0;
  }
}


// pandigital is 9 digits long so products in the form of xxxx + yyyyy 
// is the only way to make a concatenated product of base and (1,2)
// therefore a base with 4 digits is a good upper bound
var limit = 9999; 
var max = 0;
for (var i=1; i<=limit; i++) {
  var pandigital = constructPandigital(i);
  if (pandigital > max) {
    max = pandigital;
  }
}
console.log("The largest pandigital is: " + max);