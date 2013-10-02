# If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. 
# The sum of these multiples is 23.

# Find the sum of all the multiples of 3 or 5 below 1000.

def sum_stuff(limit)
  (1..(limit-1)).find_all { |i| 
    i % 3 == 0 || i % 5 == 0
  }.reduce(:+)
end

puts "Sum of guys below 10: #{sum_stuff(10)}"
puts "Sum of guys below 1000: #{sum_stuff(1000)}"