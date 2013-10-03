# A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
# a2 + b2 = c2

# For example, 32 + 42 = 9 + 16 = 25 = 52.

# There exists exactly one Pythagorean triplet for which a + b + c = 1000.
# Find the product abc.

# ================
# Strategy: iterate through i and j to find all values a,b,c s.t. 
# sum(a,b,c) = 1000 where a < b < c
# test each one to see if it is a pythagorean triplet

def triplet?(triplet)
  # make sure unequal
  return false if triplet.uniq.count != 3

  sorted = triplet.sort
  sorted[0] ** 2 + sorted[1] ** 2 == sorted[2] ** 2
end
puts "Is (1,1,1) a triplet? #{triplet? [1,1,1]}"
puts "Is (1,2,3) a triplet? #{triplet? [1,2,3]}"
puts "Is (3,4,5) a triplet? #{triplet? [3,4,5]}, #{triplet? [4,3,5]}"

sum = 1000

catch :done do
  # since a < b < c, 1 + 2 + 997 is the most extreme valid case
  1.upto(sum - 1 - 2) do |i|
    1.upto(sum - i - 1) do |j|
      k = sum - i - j
      if triplet? [i,j,k]
        puts "The pythagorean triplet with sum 1000 is #{[i,j,k].sort}"
        puts "Their product is: #{[i,j,k].reduce(:*)}"
        throw :done
      end
    end
  end
end