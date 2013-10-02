# A palindromic number reads the same both ways. 
# The largest palindrome made from the product of two 2-digit numbers is 
# 9009 = 91 × 99.

# Find the largest palindrome made from the product of two 3-digit numbers.
def palindrome?(thing)
  forwards = thing.to_s
  backwards = forwards.reverse
  return backwards == forwards
end
puts "Is 9009 a palindrome? #{palindrome?(9009)}"
puts "Is 9001 a palindrome? #{palindrome?(9001)}"


# not sure of an efficient way of guaranteeing that palindrome is the largest
def largest_palindrome(candidate)
  largest_palindrome = 0
  candidate.downto(1) do |i|
    candidate.downto(1) do |j|
      product = i * j
      if palindrome?(product) && product > largest_palindrome
        largest_palindrome = product
      end
    end
  end

  largest_palindrome
end

puts "The largest palindrome of 2-digit numbers is: #{largest_palindrome(99)}"
puts "The largest palindrome of 3-digit numbers is: #{largest_palindrome(999)}"