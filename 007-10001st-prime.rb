# By listing the first six prime numbers: 
# 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

# What is the 10 001st prime number?

# http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
def primes_upto(limit)
  primes = []
  candidates = (2..limit).to_a
  candidates.each do |candidate|
    return primes if candidates.empty?
    prime = candidates.shift
    primes << prime

    # Not sure which is faster between find_all vs modifying in place
    # candidates = candidates.find_all { |c| c % prime != 0 }
    
    candidates.each_with_index do |candidate, i|
      if candidate % prime == 0
        candidates.delete_at(i)
      end
    end
  end
  primes + candidates
end
puts "First six prime numbers: #{primes_upto 13}"
puts "Sixth prime: #{primes_upto(13)[5]}"

puts "10,001st prime: #{primes_upto(150000)[10000]}"
