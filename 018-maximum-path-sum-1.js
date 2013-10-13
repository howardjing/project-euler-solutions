/*
By starting at the top of the triangle below and moving to adjacent numbers on the row below, 
the maximum total from top to bottom is 23.

   3
  7 4
 2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:
*/

// var triangle = [
// [3],
// [7,4],
// [2,4,6],
// [8,5,9,3]
// ]

var triangle = [
                            [75],
                          [95, 64],
                        [17, 47, 82],
                      [18, 35, 87, 10],
                    [20, 04, 82, 47, 65],
                  [19, 01, 23, 75, 03, 34],
                [88, 02, 77, 73, 07, 63, 67],
              [99, 65, 04, 28, 06, 16, 70, 92],
            [41, 41, 26, 56, 83, 40, 80, 70, 33],
          [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
        [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
      [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
  [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
[04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23]
];

// given {x: a, y: b} coordinate, find the value in the triangle
var value = function(coord) {
  return triangle[coord.x][coord.y];
}

var isRoot = function(coord) {
  return coord.x == 0 && coord.y == 0;
}
var isEdge = function(coord) {
  var row = coord.x;
  var col = coord.y;
  return col == 0 || col == triangle[row].length - 1;
}

// return [x,y] coordinates of the parent of this node
var parents = function(coord) {
  var row = coord.x;
  var col = coord.y;
  
  // root element
  if (isRoot(coord)) {
    return [];
  }

  // edge element
  if (isEdge(coord)) {
    // left edge
    if (col == 0) {
      return [{ x: row-1, y: col }];
    // right edge
    } else {
      return [{ x: row-1, y: col-1 }];
    }
  }

  // middle element
  return [{ x: row-1, y: col-1 }, { x: row-1, y: col }];
}

var hash = {};
var maxSum = function(coord) {
  var key = coord.x + "," + coord.y;
  if (hash[key]) {
    return hash[key];
  }

  if (isRoot(coord)) {
    return value(coord);
  }

  var answer = value(coord) + Math.max.apply(null, parents(coord).map(function(parent) {
    return maxSum(parent);
  }));
  hash[key] = answer;
  return answer;
}

var row = triangle.length -1;
var max = -Infinity;
for (var col=0; col < triangle[row].length; col++) {
  var sum = maxSum({ x: row, y: col });
  if (max < sum) {
    max = sum;
  }
}
console.log("The max sum is: " + max);

/* Alternate pseudocode by ziyue: (top down approach rather than bottom up)
var maxSum = function(root) {
  if (root == null) {
    return 0;
  }
  return root.value + Math.max(maxSum(root.left), maxSum(root.right));
}
*/