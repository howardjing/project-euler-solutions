# The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
# Find the sum of all the primes below two million.

# faster version of finding primes, based on the haskell version
def primes_upto(limit)
  numbers = (2..limit).to_a
  numbers.each do |prime|
    if prime
      nonprime = prime + prime
      while nonprime <= limit
        numbers[nonprime - 2] = nil
        nonprime += prime
      end
    end
  end
  numbers.compact
end
puts "Sum of primes under 10: #{primes_upto(10).reduce(:+)}"
puts "Sum of primes under 2,000,000: #{primes_upto(2000000).reduce(:+)}"