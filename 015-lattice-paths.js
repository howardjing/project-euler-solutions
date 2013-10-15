/*
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, 
there are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?
*/

var hash = {};
var countRoutes = function(m,n) {
  var key = [m,n].sort();
  if (hash[key]) {
    return hash[key];
  }

  if (m <= 0 || n <= 0) {
    return 1;
  }
  var answer = countRoutes(m-1,n) + countRoutes(m,n-1)
  hash[key] = answer;
  return answer;
}

var n = 20;
console.log("There are " + countRoutes(n,n) + " paths in a " + n + "x" + n + " grid");

/*
closed form solution: (n+n) choose n

Explanation (via kenny): 
It takes (n+n) steps in total to go from the top left to the bottom right corner
of the matrix. However, you are only free to choose n steps down/right. Once you have 
chosen the n steps to go downwards, the other n steps are necessarily to the right.

So you are free to choose (n+n) choose n steps in total.
*/