/*
If p is the perimeter of a right angle triangle with integral length sides, 
{a,b,c}, there are exactly three solutions for p = 120.

{20,48,52}, {24,45,51}, {30,40,50}

For which value of p ≤ 1000, is the number of solutions maximised?
*/

var isInt = function(n) {
  return n % 1 === 0;
}

var findPerimeter = function(a,b) {
  var c = Math.sqrt(Math.pow(a,2) + Math.pow(b, 2));
  if (isInt(c)) {
    return a + b + c;
  }
  return 0;
}

var perims = {};
var limit = 500;
for (var i=1; i<limit; i++) {
  for (var j=i; j<limit; j++) {
    var perim = findPerimeter(i,j);
    if (perim > 0 && perim <=1000) {
      perims[perim] = (perims[perim] || 0) + 1;
    }
  }
}

var max = 0;
var perim;
for (var perimeter in perims) {
  if (perims[perimeter] > max) {
    max = perims[perimeter];
    perim = perimeter;
  }
}

console.log("A perimeter of " + perim + " maximizes the solution.");