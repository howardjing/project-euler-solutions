/*
If the numbers 1 to 5 are written out in words: 
one, two, three, four, five, 
then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) 
inclusive were written out in words, how many letters would be used?

NOTE: Do not count spaces or hyphens. 
For example, 342 (three hundred and forty-two) 
contains 23 letters and 115 (one hundred and fifteen) 
contains 20 letters. The use of "and" when writing out numbers 
is in compliance with British usage.
*/

var handleOnesAndTeens = function(n) {
  switch(n) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    case 10:
      return "ten";
    case 11:
      return "eleven";
    case 12:
      return "twelve";
    case 13:
      return "thirteen";
    case 14:
      return "fourteen";
    case 15:
      return "fifteen";
    case 16:
      return "sixteen";
    case 17:
      return "seventeen";
    case 18:
      return "eighteen";
    case 19:
      return "nineteen";
    default:
      return "";
  }
}

var handleTens = function(n) {
  switch(n) {
    case 20:
      return "twenty";
    case 30:
      return "thirty";
    case 40:
      return "forty";
    case 50:
      return "fifty";
    case 60:
      return "sixty";
    case 70:
      return "seventy";
    case 80:
      return "eighty";
    case 90:
      return "ninety";
    default:
      return "";
  }
}

// only works on integers in interval [1,1000]
var wordify = function(n) {
  if (n < 20) {
    return handleOnesAndTeens(n);
  } 

  if (n < 100) {
    if (n % 10 == 0) {
      return handleTens(n);
    } else {
      return handleTens(n - (n % 10)) + "-" + wordify(n % 10);
    }
  }

  if (n < 1000) {
    var hundred = "hundred";
    var prefix = (n - (n % 100)) / 100;
    if (n % 100 == 0) {
      return wordify(prefix) + " " + "hundred"
    } else {
      return wordify(prefix) + " " + "hundred" + " and " + wordify(n % 100);
    }
  }

  if (n == 1000) {
    return "one thousand";
  }
}

// strip out spaces and hyphens in a word
var sanitize = function(word) {
  return word.replace(/ /g, "").replace(/-/g, "");
}

var words = [];
for (var i=1; i<=1000; i++) {
  words.push(wordify(i));
}

var letters = words.map(function(number) {
  return sanitize(number).length;
}).reduce(function(a,b) {
  return a + b;
});

console.log("number letters used to write one to one thousand: " + letters);
