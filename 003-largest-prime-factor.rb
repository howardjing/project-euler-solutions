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