# The sum of the squares of the first ten natural numbers is,
# 1^2 + 2^2 + ... + 10^2 = 385

# The square of the sum of the first ten natural numbers is,
# (1 + 2 + ... + 10)^2 = 55^2 = 3025

# Hence the difference between the sum of the squares of the first 
# ten natural numbers and the square of the sum is 3025 − 385 = 2640.

# Find the difference between the sum of the squares of the first 
# one hundred natural numbers and the square of the sum.

def sum_squares(range)
  range.map{ |r| r ** 2 }.reduce(:+)
end
puts "Sum of squares of 1..10 is: #{sum_squares 1..10}"

def square_sum(range)
  range.reduce(:+) ** 2
end
puts "Square of sum of 1..10 is: #{square_sum 1..10}"

def diff(range)
  (sum_squares(range) - square_sum(range)).abs
end
puts "Difference between sum of squares and square of sum of 1..10 is: #{diff 1..10}"
puts "Difference of 1..100 is: #{diff 1..100}"