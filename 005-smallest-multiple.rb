# 2520 is the smallest number that can be divided by each of the numbers 
# from 1 to 10 without any remainder.

# What is the smallest positive number that is evenly divisible 
# by all of the numbers from 1 to 20?


# copy pasting some code from 003-largest-prime-factor
def prime?(number)
  (2..(number-1)).each do |possible_factor|
    return false if number % possible_factor == 0
  end
  true
end

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
# end of copy paste

def smallest_number(limit)
  prime_factorization = {}
  1.upto(limit).each do |i|
    factors = prime_factors(i)
    factors.each do |factor|
      times_repeated = factors.find_all { |f| f == factor }.count
      if !prime_factorization[factor] || prime_factorization[factor] < times_repeated
        prime_factorization[factor] = times_repeated
      end
    end
  end

  prime_factorization.map { |k,v| k ** v }.reduce(:*)
end

puts "Smallest number divisible by 1..10: #{smallest_number(10)}"
puts "Smallest number divisible by 1..20: #{smallest_number(20)}"

