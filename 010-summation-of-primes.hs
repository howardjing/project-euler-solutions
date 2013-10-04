{-
 The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
 Find the sum of all the primes below two million.

 Translating this to haskell since it is slow at limit ~100,000
 Could have just modified the array in place but don't feel like it

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
-}

-- naive implementation
primes' = sieve [2..] 
  where sieve (p:xs) = p : sieve [x|x <- xs, x `mod` p /= 0]


-- http://en.literateprograms.org/Sieve_of_Eratosthenes_%28Haskell%29

-- take 10 (merge [2,4..] [3,6..])
-- [2,3,4,6,8,9,10,12,14,15]
-- Merge two ordered lists but ignore duplicates
merge xs@(x:xt) ys@(y:yt)
  | x < y  = x : merge xt ys
  | x > y  = y : merge xs yt
  | x == y = y : merge xt yt

-- take 10 (diff [1..] [2,4..])
-- [1,3,5,7,9,11,13,15,17,19]
-- Given two ordered lists, 
-- remove elements found in second list from first list
diff xs@(x:xt) ys@(y:yt)
  | x < y  = x : diff xt ys
  | x > y  = diff xs yt
  | x == y = diff xt yt 

-- fast implementation
primes    = [2, 3, 5] ++ (diff [7,9..] nonprimes)


-- nonprime without even numbers
nonprimes = foldr1 f $ map g $ tail primes
  where
    f (x:xt) ys = x : merge xt ys
    -- g :: Integer -> [Integer]
    g p         = [n*p | n <- [p, p+2 ..]]

-- sum (takeWhile (<2000000) primes)



