/*
Using names.txt (right click and 'Save Link/Target As...'), 
a 46K text file containing over five-thousand first names, 
begin by sorting it into alphabetical order. 
Then working out the alphabetical value for each name, 
multiply this value by its alphabetical position in the list 
to obtain a name score.

For example, when the list is sorted into alphabetical order, 
COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, 
is the 938th name in the list. 
So, COLIN would obtain a score of 938 × 53 = 49714.

What is the total of all the name scores in the file?
*/
fs = require('fs');

var alphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
var score = {};
alphabet.forEach(function(letter, i) {
  score[letter] = i + 1;
});

var test = '"BOB","CARL","ADAM"';
// hardcoded to split names.txt appropriately
var toArray = function(string) {
  return string.split(",")
    .map(function(nameWithQuotes) {
      return nameWithQuotes.substring(1, nameWithQuotes.length - 1);
    });
};
console.log(toArray(test));
var alphabeticalValue = function(name) {
  return name.split("")
    .reduce(function(cumulative, letter) {
      return cumulative + score[letter];
    }, 0)
} 
console.log("alphabetical value of COLIN: " + alphabeticalValue("COLIN"));
var nameScore = function(position, name) {
  return position * alphabeticalValue(name);
}
console.log("name score of COLIN, given that it is in position 938: " + nameScore(938, "COLIN"));
fs.readFile('data/names.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var names = toArray(data);
  var cumulativeScore = names.sort().reduce(function(cumulative, name, i) {
    return cumulative + nameScore(i+1, name);
  }, 0);
  console.log("The cumulative name score is: " + cumulativeScore);
});
