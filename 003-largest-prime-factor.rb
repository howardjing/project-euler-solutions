# The prime factors of 13195 are 5, 7, 13 and 29.

# What is the largest prime factor of the number 600851475143 ?


# =====================
# approach 1: http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
# too slow, 600851475143 is too large

# approach 2: define function prime?(number), iterate downwards until find
# an answer that is both a factor and prime
# too slow, 600851475143 is too large

# approach 3: define a function to find prime factors of a number
# works nicely even without using a lookup table
# =====================

# =====================
# UPDATE: approach 2 can be optimized with the following observation:
#
# Given a and b, a pair of factors of n, (ie a * b = n)
# at least one of a or b must be <= sqrt(n)
#
# Proof: 
# Assume there exists a pair of factors a and b of n such that 
# a > sqrt(n) and b > sqrt(n).  
# => a * b > sqrt(n) * sqrt(n)
# => a * b > n
# but since a and b are factors of n, a * b = n
# => n > n, a contradiction

# So by using sqrt(600851475143) as an upper bound to find factors of 
# 600851475143, and iterating upwards, approach 2 will probably work
# =====================

def prime?(number)
  (2..(number-1)).each do |possible_factor|
    return false if number % possible_factor == 0
  end
  true
end
puts "Prime numbers <= 11: #{(1..11).find_all { |i| prime?(i) }}"

def prime_factors(number)
  if prime?(number)
    return [number]
  else
    2.upto(number-1) do |possible_factor|
      if number % possible_factor == 0
        return prime_factors(possible_factor) + prime_factors(number / possible_factor)
      end
    end
  end
end

puts "The prime factors of 13195 are #{prime_factors(13195).join(", ")}"
puts "The prime factors of 600851475143 are #{prime_factors(600851475143).join(", ")}"